import React, { useState, useCallback, useEffect } from 'react';
import { analyzeResume, ResumeAnalysisResult } from '../services/geminiService';
import Icon from './common/Icon';
import AtsPieChart from './common/PieChart';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]);
        };
        reader.onerror = (error) => reject(error);
    });
};

const getVerdictStyle = (verdict: string): { color: string; icon: 'check' | 'lightbulb' } => {
    switch (verdict.toLowerCase()) {
        case 'excellent': return { color: '#16A34A', icon: 'check' }; // green-600
        case 'good': return { color: '#2563EB', icon: 'check' }; // blue-600
        case 'moderate': return { color: '#F59E0B', icon: 'lightbulb' }; // amber-500
        case 'needs improvement': return { color: '#DC2626', icon: 'lightbulb' }; // red-600
        default: return { color: '#4B5563', icon: 'lightbulb' }; // gray-600
    }
};

const StatBar: React.FC<{ label: string; score: number }> = ({ label, score }) => {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => setWidth(score), 100);
        return () => clearTimeout(timer);
    }, [score]);

    return (
        <div>
            <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-medium text-gray-500">{label}</span>
                <span className="text-sm font-bold text-gray-700">{score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${width}%` }}></div>
            </div>
        </div>
    );
};

const AtsChecker: React.FC = () => {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    
    // Animation states
    const [animatedScore, setAnimatedScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    
    useEffect(() => {
        if (analysisResult) {
            // Animate score count-up
            let start = 0;
            const end = analysisResult.overallScore;
            if (start === end) return;
            const duration = 1200;
            const incrementTime = (duration / end) || 50;
            
            const timer = setInterval(() => {
                start += 1;
                setAnimatedScore(start);
                if (start === end) clearInterval(timer);
            }, incrementTime);

            // Trigger fade-in for dashboard
            const showTimer = setTimeout(() => setShowResults(true), 100);

            return () => {
                clearInterval(timer);
                clearTimeout(showTimer);
            };
        }
    }, [analysisResult]);


    const handleFileChange = (file: File | null) => {
        if (file) {
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (allowedTypes.includes(file.type)) {
                setResumeFile(file);
                setError(null);
            } else {
                setError('Invalid file type. Please upload a PDF, DOC, or DOCX file.');
                setResumeFile(null);
            }
        }
    };

    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        handleFileChange(file);
    }, []);

    const handleAnalyze = async () => {
        if (!resumeFile) {
            setError('Please upload your resume file.');
            return;
        }

        setError(null);
        setIsLoading(true);
        setAnalysisResult(null);
        setShowResults(false);
        setAnimatedScore(0);

        try {
            const base64Data = await fileToBase64(resumeFile);
            const fileData = {
                data: base64Data,
                mimeType: resumeFile.type
            };
            const result = await analyzeResume(fileData);
            setAnalysisResult(result);
        } catch (err) {
            setError('An error occurred while analyzing the resume. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleReset = () => {
        setAnalysisResult(null);
        setResumeFile(null);
        setError(null);
        setShowResults(false);
        setAnimatedScore(0);
    }

    const KeywordPill: React.FC<{ text: string }> = ({ text }) => (
        <span className="bg-blue-100 text-primary text-sm font-semibold mr-2 mb-2 px-4 py-2 rounded-full transition-transform hover:scale-105">{text}</span>
    );
    
    const insights = analysisResult?.actionableInsights.split('\n').filter(line => line.trim().startsWith('- '));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Professional Resume Analysis</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Get an instant, AI-powered review of your resume.
                    </p>
                </div>

                {!analysisResult && (
                    <div className="bg-white p-8 rounded-lg shadow-lg transition-all">
                        <label className="block text-lg font-semibold text-gray-700 mb-4">Upload Your Resume</label>
                        <div
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            className={`bg-slate-50 border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${isDragOver ? 'border-primary bg-blue-50 scale-105' : 'border-slate-200'}`}
                        >
                            <input
                                type="file"
                                id="resume-upload"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                            />
                            {!resumeFile ? (
                                <>
                                    <div className="flex justify-center items-center text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 01-3 3H6a3 3 0 01-3-3V9a3 3 0 013-3h.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H12a3 3 0 013 3z" opacity={0.3}/>
                                        </svg>
                                    </div>
                                    <label htmlFor="resume-upload" className="mt-4 text-lg text-gray-600 cursor-pointer block">
                                        <span className="font-semibold text-primary">Choose a file</span> or drag it here.
                                    </label>
                                    <p className="text-sm text-gray-500 mt-1">PDF, DOC, or DOCX formats accepted</p>
                                </>
                            ) : (
                                <div className="mt-4 text-gray-700">
                                    <div className="bg-blue-100/50 inline-flex items-center gap-3 px-4 py-2 rounded-lg text-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <p className="font-semibold text-md text-slate-700 truncate">{resumeFile.name}</p>
                                        <button onClick={() => { setResumeFile(null); (document.getElementById('resume-upload') as HTMLInputElement).value = ''; }} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100">
                                            <Icon name="delete" className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                        <div className="text-center mt-6">
                            <button
                                onClick={handleAnalyze}
                                disabled={isLoading || !resumeFile}
                                className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-secondary transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto text-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing...
                                    </>
                                ) : (
                                    'Analyze My Resume'
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {error && !isLoading && (
                    <div className="mt-8 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                         <button onClick={handleReset} className="ml-4 font-bold underline">Try Again</button>
                    </div>
                )}

                {analysisResult && (
                    <div className={`space-y-6 transition-opacity duration-1000 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-center">
                            <button onClick={handleReset} className="text-primary hover:underline font-semibold">Analyze another resume</button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Score and Verdict Card */}
                            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
                                 <div className="w-48 h-48 relative">
                                    <AtsPieChart score={analysisResult.overallScore} color={getVerdictStyle(analysisResult.resumeVerdict).color} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                         <span className="text-5xl font-bold text-gray-800 tracking-tight">{animatedScore}%</span>
                                         <span className="text-sm font-medium text-gray-500">Overall Score</span>
                                    </div>
                                 </div>
                                 <p className="text-2xl font-bold mt-4" style={{color: getVerdictStyle(analysisResult.resumeVerdict).color}}>
                                    {analysisResult.resumeVerdict}
                                </p>
                            </div>

                            {/* Resume Health Card */}
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                    <Icon name="check" className="w-6 h-6 text-primary" />
                                    Resume Health Metrics
                                </h3>
                                <div className="space-y-4">
                                    <StatBar label="Clarity" score={analysisResult.clarityScore} />
                                    <StatBar label="Impact" score={analysisResult.impactScore} />
                                    <StatBar label="Conciseness" score={analysisResult.concisenessScore} />
                                </div>
                            </div>
                        </div>

                        {/* Keyword Analysis Card */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                             <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>
                                Extracted Keywords
                            </h3>
                             <div className="flex flex-wrap">
                                {analysisResult.extractedKeywords.length > 0 ? 
                                    analysisResult.extractedKeywords.map(kw => <KeywordPill key={kw} text={kw} />) :
                                    <p className="text-gray-500">No distinct keywords were extracted.</p>
                                }
                            </div>
                        </div>

                        {/* Actionable Insights Card */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <Icon name="lightbulb" className="w-6 h-6 text-primary" />
                                Actionable Insights
                            </h3>
                            <ul className="space-y-3">
                                {insights && insights.map((insight, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-600">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                        <span>{insight.substring(2).trim()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AtsChecker;