import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './common/Icon';

const LandingPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen text-gray-800">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center text-white overflow-hidden bg-primary">
                 {/* Abstract SVG Background */}
                <div className="absolute inset-0 w-full h-full opacity-20" style={{transform: 'scaleY(-1)'}}>
                    <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                        <path fill="white" d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,186.7C672,192,768,160,864,133.3C960,107,1056,85,1152,96C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>

                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
                        Build Your Future, Today.
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl drop-shadow-md">
                        Craft a standout resume with the power of AI. Get live previews, customizable templates, and ATS-friendly designs.
                    </p>
                    <div className="mt-10">
                        <Link to="/builder" className="bg-accent hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-xl">
                            Start Building for Free
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-neutral">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose AI Resume Architect?</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="text-center p-6 bg-white rounded-lg shadow-md transition transform hover:-translate-y-2">
                            <div className="bg-blue-100 text-primary p-4 rounded-full inline-block mb-4">
                                <Icon name="lightbulb" className="w-8 h-8"/>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">AI-Powered Content</h3>
                            <p className="text-gray-600">Get intelligent suggestions to enhance your resume's impact and clarity.</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-md transition transform hover:-translate-y-2">
                             <div className="bg-blue-100 text-primary p-4 rounded-full inline-block mb-4">
                                <Icon name="palette" className="w-8 h-8"/>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Live Preview & Styles</h3>
                            <p className="text-gray-600">See your changes in real-time and customize templates, colors, and fonts instantly.</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-md transition transform hover:-translate-y-2">
                             <div className="bg-blue-100 text-primary p-4 rounded-full inline-block mb-4">
                                <Icon name="check" className="w-8 h-8"/>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">ATS Score Checker</h3>
                            <p className="text-gray-600">Analyze your resume's compatibility with Applicant Tracking Systems to get past the bots.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* How It Works Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Get Your Dream Resume in 3 Simple Steps</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="text-center p-6">
                            <div className="bg-blue-100 text-primary p-4 rounded-full inline-block mb-4">
                                <Icon name="palette" className="w-10 h-10"/>
                            </div>
                            <h3 className="text-xl font-bold mb-2">1. Choose a Template</h3>
                            <p className="text-gray-600">Select from professionally designed, ATS-friendly templates that fit your style.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="bg-blue-100 text-primary p-4 rounded-full inline-block mb-4">
                                <Icon name="pencil" className="w-10 h-10"/>
                            </div>
                            <h3 className="text-xl font-bold mb-2">2. Fill with AI Assistance</h3>
                            <p className="text-gray-600">Enter your details and let our AI help you craft compelling bullet points and summaries.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="bg-blue-100 text-primary p-4 rounded-full inline-block mb-4">
                                <Icon name="check" className="w-10 h-10"/>
                            </div>
                            <h3 className="text-xl font-bold mb-2">3. Download & Apply</h3>
                            <p className="text-gray-600">Customize your design, check your ATS score, and download your new resume in seconds.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-primary text-white">
                <div className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">Stop guessing what recruiters want to see. Start building a resume that gets results.</p>
                    <Link to="/builder" className="bg-accent hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-xl">
                        Build My Resume Now
                    </Link>
                </div>
            </section>
            
            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} AI Resume Architect. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;