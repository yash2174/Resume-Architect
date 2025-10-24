const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Check for essential environment variables on startup
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error("FATAL ERROR: MONGO_URI and JWT_SECRET must be defined in the .env file.");
    process.exit(1); // Exit the process with an error code
}

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase payload limit for images in resume

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Mongoose Schemas ---
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
});

const ResumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    data: { type: Object, required: true },
    style: { type: Object, required: true },
});

const User = mongoose.model('User', UserSchema);
const Resume = mongoose.model('Resume', ResumeSchema);

// --- JWT Auth Middleware ---
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <TOKEN>

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user payload to request object
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


// --- API Routes ---

// 1. Authentication Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '3d' });

        res.status(201).json({
            token,
            user: { id: newUser._id, email: newUser.email }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error during registration.', error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '3d' });

        res.json({
            token,
            user: { id: user._id, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error during login.', error: error.message });
    }
});

app.get('/api/auth/verify', authMiddleware, async (req, res) => {
    try {
        // The token is valid if authMiddleware passes
        // We find the user to ensure they still exist in the DB
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found."});
        }
        res.json({ user: { id: user._id, email: user.email }});
    } catch (error) {
        res.status(500).json({ message: "Server error during token verification."});
    }
});


// 2. Resume Routes (Protected)
app.get('/api/resume', authMiddleware, async (req, res) => {
    try {
        const resume = await Resume.findOne({ userId: req.user.id });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found for this user.' });
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching resume.', error: error.message });
    }
});

app.post('/api/resume', authMiddleware, async (req, res) => {
    try {
        const { data, style } = req.body;
        const userId = req.user.id;

        const resume = await Resume.findOneAndUpdate(
            { userId },
            { data, style, userId },
            { new: true, upsert: true } // `upsert: true` creates the document if it doesn't exist
        );

        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Server error saving resume.', error: error.message });
    }
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});