
import { ResumeData } from './types';

export const BLANK_RESUME_DATA: ResumeData = {
    personal: {
        fullName: "Your Name",
        jobTitle: "Your Job Title",
        email: "youremail@example.com",
        phone: "(555) 123-4567",
        address: "City, State",
        linkedin: "",
        github: "",
        profilePhoto: "",
    },
    summary: "A brief professional summary about yourself.",
    experience: [],
    education: [],
    skills: [],
    customSections: []
};

export const DUMMY_RESUME_DATA: ResumeData[] = [
    // Template 1 (with photo) - Product Manager
    {
        personal: {
            fullName: "Alexandra Chen",
            jobTitle: "Senior Product Manager",
            email: "alex.chen@example.com",
            phone: "+1 (555) 123-4567",
            address: "San Francisco, CA",
            linkedin: "linkedin.com/in/alexandrachen",
            github: "github.com/alexchen",
            profilePhoto: "https://picsum.photos/id/1/200/200",
        },
        summary: "Dynamic and results-oriented Senior Product Manager with over 8 years of experience driving product strategy from conception to launch. Proven ability to lead cross-functional teams, define product roadmaps, and deliver innovative solutions that meet user needs and drive business growth in fast-paced tech environments.",
        experience: [
            { id: 'exp1', company: "Innovate Inc.", role: "Senior Product Manager", date: "2018 - Present", description: "• Led the development and launch of a new B2B SaaS platform, resulting in a 40% increase in user engagement and a 25% growth in annual recurring revenue.\n• Defined the product vision and roadmap for 3 major product lines, conducted A/B tests, and analyzed user data to prioritize features, leading to a 15% improvement in customer satisfaction.\n• Managed a team of 5 product managers and collaborated with a 20-person engineering team, design, and marketing to deliver on a quarterly release cycle." },
            { id: 'exp2', company: "Tech Solutions", role: "Product Manager", date: "2015 - 2018", description: "• Oversaw the product lifecycle of a mobile application with over 1 million downloads, improving app store ratings from 4.2 to 4.8.\n• Conducted extensive market research and user analysis to identify and validate new feature opportunities, leading to a 15% reduction in user churn." },
        ],
        education: [
            { id: 'edu1', institution: "Stanford University", degree: "M.S. in Computer Science", date: "2013 - 2015", description: "Specialization in Human-Computer Interaction. Published a paper on user engagement metrics." },
            { id: 'edu2', institution: "University of California, Berkeley", degree: "B.S. in Business Administration", date: "2009 - 2013", description: "Graduated with Honors. President of the Entrepreneurship Club." },
        ],
        skills: [{ id: 's1', name: "Product Strategy & Roadmap" }, { id: 's2', name: "Agile & Scrum Methodologies" }, { id: 's3', name: "JIRA & Confluence" }, { id: 's4', name: "Market Research & Analysis" }, { id: 's5', name: "User-Centered Design" }, { id: 's6', name: "A/B Testing" }, { id: 's7', name: "Leadership & Team Management" }, { id: 's8', name: "SQL" }],
        customSections: [
            { id: 'cs1', title: 'Certifications', content: '• Certified Scrum Product Owner (CSPO)\n• Pragmatic Marketing Certified (PMC-III)' },
            { id: 'cs2', title: 'Languages', content: '• English (Native)\n• Mandarin (Conversational)'}
        ]
    },
    // Template 2 (no photo) - Software Engineer
    {
        personal: {
            fullName: "Benjamin Carter",
            jobTitle: "Lead Software Engineer",
            email: "ben.carter@example.com",
            phone: "+1 (555) 987-6543",
            address: "Austin, TX",
            linkedin: "linkedin.com/in/bencarter",
            github: "github.com/bencarter",
        },
        summary: "Highly skilled Lead Software Engineer with a decade of experience in designing, developing, and deploying scalable and resilient backend systems. Expert in microservices architecture, cloud-native technologies (AWS), and leading high-performing engineering teams to deliver robust software solutions.",
        experience: [
            { id: 'exp1', company: "CloudScape", role: "Lead Software Engineer", date: "2019 - Present", description: "• Architected and implemented a new microservices-based backend using Java, Spring Boot, and Kafka, improving system uptime to 99.99% and handling 10,000+ requests per second.\n• Mentored a team of 10 engineers, fostering a culture of code quality, CI/CD, and continuous improvement.\n• Led the migration of legacy monolith services to a Kubernetes-based infrastructure on AWS, reducing infrastructure costs by 30%." },
            { id: 'exp2', company: "Data Weavers", role: "Senior Backend Engineer", date: "2016 - 2019", description: "• Developed and maintained RESTful APIs for a high-traffic data processing platform using Python and Django.\n• Optimized database queries and implemented caching strategies with Redis, reducing average API latency by 35%." },
        ],
        education: [
            { id: 'edu1', institution: "University of Texas at Austin", degree: "B.S. in Computer Engineering", date: "2012 - 2016", description: "Graduated with High Honors. Capstone Project: Real-time data streaming pipeline." },
        ],
        skills: [{ id: 's1', name: "Java & Python" }, { id: 's2', name: "Spring Boot & Django" }, { id: 's3', name: "Microservices Architecture" }, { id: 's4', name: "AWS (EC2, S3, Lambda, EKS)" }, { id: 's5', name: "Docker & Kubernetes" }, { id: 's6', name: "SQL & NoSQL (PostgreSQL, Redis)" }, { id: 's7', name: "System Design" }, { id: 's8', name: "CI/CD (Jenkins)" }],
        customSections: [
            { id: 'cs1', title: 'Certifications', content: '• AWS Certified Solutions Architect - Professional\n• Certified Kubernetes Application Developer (CKAD)' },
            { id: 'cs2', title: 'Projects', content: '• Open Source Contributor to the Spring Boot framework, focusing on performance enhancements for web clients.'}
        ]
    },
     // Template 3 (with photo) - UX/UI Designer
    {
        personal: {
            fullName: "Chloe Davis",
            jobTitle: "UX/UI Designer",
            email: "chloe.davis@example.com",
            phone: "+1 (555) 234-5678",
            address: "New York, NY",
            linkedin: "linkedin.com/in/chloedavis",
            github: "github.com/chloedavis",
            profilePhoto: "https://picsum.photos/id/2/200/200",
        },
        summary: "Creative and detail-oriented UX/UI Designer with a passion for crafting intuitive, accessible, and beautiful user experiences. Proficient in the entire design process, from user research and wireframing to high-fidelity prototyping and collaborating on design systems.",
        experience: [
            { id: 'exp1', company: "PixelPerfect Agency", role: "Senior UX/UI Designer", date: "2017 - Present", description: "• Led the end-to-end redesign of a major e-commerce website, resulting in a 25% increase in conversion rates and a 30% improvement in user satisfaction scores.\n• Conducted user research initiatives, including interviews, journey mapping, and usability testing with over 50 users to inform and validate design decisions.\n• Developed and maintained a comprehensive design system in Figma, reducing design and development time by 20% and ensuring consistency across all digital products." },
            { id: 'exp2', company: "Creative Minds", role: "Junior Designer", date: "2015 - 2017", description: "• Assisted in creating wireframes, mockups, and interactive prototypes for various web and mobile projects.\n• Collaborated closely with developers to ensure seamless and pixel-perfect implementation of designs." },
        ],
        education: [
            { id: 'edu1', institution: "Parsons School of Design", degree: "BFA in Communication Design", date: "2011 - 2015", description: "Focus on Interaction Design and Typography. Dean's List 2014, 2015." },
        ],
        skills: [{ id: 's1', name: "Figma & Sketch" }, { id: 's2', name: "Adobe Creative Suite (XD, Illustrator, Photoshop)" }, { id: 's3', name: "User Research & Testing" }, { id: 's4', name: "Wireframing & Prototyping" }, { id: 's5', name: "Design Systems" }, { id: 's6', name: "Information Architecture" }, { id: 's7', name: "HTML/CSS" }, { id: 's8', name: "Principle" }],
        customSections: [
             { id: 'cs1', title: 'Portfolio', content: 'You can view my work at chloedavis.design' },
             { id: 'cs2', title: 'Awards', content: '• 2022 Webby Award Honoree - Best User Interface'}
        ]
    },
    // Template 4 (no photo) - Data Scientist
    {
        personal: {
            fullName: "David Rodriguez",
            jobTitle: "Data Scientist",
            email: "david.r@example.com",
            phone: "+1 (555) 876-5432",
            address: "Chicago, IL",
            linkedin: "linkedin.com/in/davidrodriguez",
            github: "github.com/davidrodriguez",
        },
        summary: "Analytically-minded Data Scientist with deep expertise in machine learning, statistical analysis, and data visualization. Proven track record of extracting actionable insights from complex datasets to drive business growth, product innovation, and operational efficiency.",
        experience: [
            { id: 'exp1', company: "Insight Analytics", role: "Data Scientist", date: "2018 - Present", description: "• Developed a customer churn prediction model using XGBoost, achieving 92% accuracy and reducing monthly churn by 15%, directly contributing to a $2M annual revenue retention.\n• Built and maintained data pipelines using Python, Airflow, and SQL for ETL processes, ensuring data integrity for modeling.\n• Created interactive dashboards in Tableau to communicate findings to C-level stakeholders, leading to a 10% increase in marketing campaign efficiency." },
            { id: 'exp2', company: "NumberCrunch Corp", role: "Data Analyst", date: "2016 - 2018", description: "• Performed statistical analysis and A/B testing to support marketing campaigns, leading to a 10% increase in campaign ROI.\n• Cleaned and preprocessed large datasets (10M+ rows) to prepare them for analysis." },
        ],
        education: [
            { id: 'edu1', institution: "University of Chicago", degree: "M.S. in Analytics", date: "2014 - 2016", description: "Coursework in Machine Learning, Predictive Modeling, and Big Data Technologies." },
            { id: 'edu2', institution: "University of Illinois Urbana-Champaign", degree: "B.S. in Statistics", date: "2010 - 2014", description: "Graduated Magna Cum Laude." },
        ],
        skills: [{ id: 's1', name: "Python (pandas, scikit-learn, TensorFlow)" }, { id: 's2', name: "R" }, { id: 's3', name: "SQL & NoSQL" }, { id: 's4', name: "Machine Learning (Classification, Regression, Clustering)" }, { id: 's5', name: "Tableau & Power BI" }, { id: 's6', name: "Statistics & A/B Testing" }, { id: 's7', name: "Airflow" }],
        customSections: [
             { id: 'cs1', title: 'Projects', content: '• GitHub Project: Stock Price Prediction using LSTM Networks. Achieved an 85% directional accuracy.' },
             { id: 'cs2', title: 'Publications', content: '• "Predictive Modeling for Retail," Journal of Data Science, 2018.'}
        ]
    },
];

const devOpsResume: ResumeData = {
    personal: {
        fullName: "Eva Martinez",
        jobTitle: "DevOps Engineer",
        email: "eva.martinez@example.com",
        phone: "+1 (555) 111-2222",
        address: "Seattle, WA",
        linkedin: "linkedin.com/in/evamartinez",
        github: "github.com/evamartinez",
    },
    summary: "Experienced DevOps Engineer specializing in CI/CD, infrastructure as code, and cloud automation. Passionate about building and maintaining scalable, secure, and reliable infrastructure to support high-velocity software development teams.",
    experience: [
        { id: 'exp1', company: "ScaleUp Technologies", role: "Senior DevOps Engineer", date: "2018 - Present", description: "• Implemented and managed CI/CD pipelines using Jenkins and GitLab CI for 20+ microservices, reducing average deployment time by 60%.\n• Automated infrastructure provisioning and configuration management with Terraform and Ansible for AWS environments, saving 20+ man-hours per week.\n• Managed Kubernetes clusters on GCP with 100+ nodes, ensuring high availability and cost optimization through auto-scaling and resource management." },
        { id: 'exp2', company: "AgileSoft", role: "Systems Administrator", date: "2016 - 2018", description: "• Managed on-premise Linux servers and supported development teams with infrastructure needs.\n• Wrote Bash scripts to automate routine tasks like backups and log rotation."}
    ],
    education: [
        { id: 'edu1', institution: "University of Washington", degree: "B.S. in Informatics", date: "2014 - 2018", description: "Focus on Systems Administration." },
    ],
    skills: [{ id: 's1', name: "Docker & Kubernetes" }, { id: 's2', name: "Terraform & Ansible" }, { id: 's3', name: "AWS/GCP/Azure" }, { id: 's4', name: "CI/CD (Jenkins, GitLab)" }, { id: 's5', name: "Python/Bash Scripting" }, { id: 's6', name: "Monitoring (Prometheus, Grafana)" }, { id: 's7', name: "Linux Administration" }],
    customSections: [
        { id: 'cs1', title: 'Certifications', content: '• Certified Kubernetes Administrator (CKA)\n• AWS Certified DevOps Engineer - Professional' }
    ]
};

const cybersecurityResume: ResumeData = {
    personal: {
        fullName: "Frank Miller",
        jobTitle: "Cybersecurity Analyst",
        email: "frank.miller@example.com",
        phone: "+1 (555) 333-4444",
        address: "Washington, D.C.",
        linkedin: "linkedin.com/in/frankmillersec",
        github: "github.com/frankmillersec",
    },
    summary: "Detail-oriented Cybersecurity Analyst with a strong background in threat detection, vulnerability assessment, and incident response. Proficient in using SIEM tools and security frameworks to protect enterprise assets against emerging cyber threats.",
    experience: [
        { id: 'exp1', company: "SecureNet Solutions", role: "Cybersecurity Analyst", date: "2019 - Present", description: "• Monitored network traffic and system logs for security events using Splunk, identifying and mitigating 5 major security incidents and preventing potential data breaches.\n• Conducted regular vulnerability scans and penetration tests using Nessus, providing actionable reports that led to a 40% reduction in critical vulnerabilities.\n• Developed and updated incident response playbooks, reducing mean time to resolution (MTTR) by 25%." },
    ],
    education: [
        { id: 'edu1', institution: "Carnegie Mellon University", degree: "M.S. in Information Security", date: "2017 - 2019", description: "Recipient of the Information Security Scholarship." },
    ],
    skills: [{ id: 's1', name: "SIEM (Splunk, QRadar)" }, { id: 's2', name: "Vulnerability Scanning (Nessus, OpenVAS)" }, { id: 's3', name: "Incident Response" }, { id: 's4', name: "NIST Framework" }, { id: 's5', name: "Firewall & IDS/IPS" }, { id: 's6', name: "Wireshark" }, { id: 's7', name: "Python for Security Automation" }],
    customSections: [
        { id: 'cs1', title: 'Certifications', content: '• CompTIA Security+\n• Certified Ethical Hacker (CEH)\n• Certified Information Systems Security Professional (CISSP)' }
    ]
};

const cloudArchitectResume: ResumeData = {
    personal: {
        fullName: "Grace Hopper",
        jobTitle: "Cloud Architect",
        email: "grace.hopper@example.com",
        phone: "+1 (555) 555-6666",
        address: "Reston, VA",
        linkedin: "linkedin.com/in/gracehoppercloud",
        github: "github.com/gracehoppercloud",
    },
    summary: "Certified Cloud Architect with extensive experience in designing and implementing scalable, highly available, and fault-tolerant solutions on AWS and Azure. Expert in cloud migration strategies, cost optimization, and infrastructure automation.",
    experience: [
        { id: 'exp1', company: "Nimbus Cloud Services", role: "Cloud Architect", date: "2017 - Present", description: "• Designed and deployed a multi-region, serverless architecture for a critical application, resulting in 99.999% uptime and a 40% reduction in operational costs.\n• Led the successful migration of on-premise data centers to AWS for 10+ enterprise clients with zero downtime.\n• Developed infrastructure-as-code templates using CloudFormation and Terraform, enabling automated, repeatable deployments and reducing manual setup time by 90%." },
    ],
    education: [
        { id: 'edu1', institution: "Virginia Tech", degree: "B.S. in Computer Science", date: "2013 - 2017", description: "Graduated Summa Cum Laude." },
    ],
    skills: [{ id: 's1', name: "AWS & Azure" }, { id: 's2', name: "CloudFormation & Terraform" }, { id: 's3', name: "Serverless (Lambda, Functions)" }, { id: 's4', name: "Solution Design" }, { id: 's5', name: "Cost Optimization" }, { id: 's6', name: "Cloud Security Best Practices" }, { id: 's7', name: "Kubernetes" }],
    customSections: [
         { id: 'cs1', title: 'Certifications', content: '• AWS Certified Solutions Architect - Professional\n• Microsoft Certified: Azure Solutions Architect Expert\n• Google Certified Professional Cloud Architect' }
    ]
};

export const EXPLORE_DOMAINS: { [key: string]: ResumeData } = {
    'Software Engineer': DUMMY_RESUME_DATA[1],
    'Product Manager': DUMMY_RESUME_DATA[0],
    'UX/UI Designer': DUMMY_RESUME_DATA[2],
    'Data Scientist': DUMMY_RESUME_DATA[3],
    'DevOps Engineer': devOpsResume,
    'Cybersecurity Analyst': cybersecurityResume,
    'Cloud Architect': cloudArchitectResume,
};

export const COLOR_PALETTES = [
    { name: 'Default Blue', color: 'bg-blue-800' },
    { name: 'Forest Green', color: 'bg-green-800' },
    { name: 'Slate Gray', color: 'bg-slate-800' },
    { name: 'Ruby Red', color: 'bg-red-800' },
    { name: 'Deep Purple', color: 'bg-purple-800' },
];

export const FONT_FAMILIES = [
    { name: 'Sans Serif', value: 'font-sans' },
    { name: 'Serif', value: 'font-serif' },
    { name: 'Monospace', value: 'font-mono' },
];

export const FONT_SIZES = [
    { name: 'Small', value: 0.9 },
    { name: 'Medium', value: 1.0 },
    { name: 'Large', value: 1.1 },
];