import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EXPLORE_DOMAINS } from '../constants';
import ResumePreview from './ResumePreview';
import type { ResumeData } from '../types';

const ExploreResumes: React.FC = () => {
    const domains = Object.keys(EXPLORE_DOMAINS);
    const [activeDomain, setActiveDomain] = useState(domains[0]);

    const activeResumeData: ResumeData = EXPLORE_DOMAINS[activeDomain];

    // Use a fixed style for previewing explore resumes
    const previewStyle = {
        templateId: 2,
        color: 'bg-blue-800',
        fontFamily: 'font-sans',
        fontSize: 1,
    };

    return (
        <div className="bg-neutral min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">Explore Resumes by Domain</h1>
                    <p className="mt-4 text-lg text-gray-600">Select a role to see a professionally crafted resume, then use it as a starting point for your own.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar for domain selection */}
                    <aside className="lg:w-1/4">
                        <div className="bg-white p-4 rounded-lg shadow-md sticky top-24">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700">Select a Domain</h2>
                            <ul className="space-y-2">
                                {domains.map(domain => (
                                    <li key={domain}>
                                        <button
                                            onClick={() => setActiveDomain(domain)}
                                            className={`w-full text-left px-4 py-2 rounded-md transition duration-200 ${
                                                activeDomain === domain
                                                    ? 'bg-primary text-white shadow'
                                                    : 'text-gray-600 hover:bg-blue-50 hover:text-primary'
                                            }`}
                                        >
                                            {domain}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main content for resume preview */}
                    <main className="lg:w-3/4">
                        <div className="bg-white p-4 rounded-lg shadow-md mb-4 sticky top-24 z-10">
                             <Link
                                to="/builder"
                                state={{ resumeData: activeResumeData }}
                                className="w-full text-center bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2"
                            >
                                Edit This Resume
                            </Link>
                        </div>
                        <ResumePreview data={activeResumeData} style={previewStyle} />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ExploreResumes;