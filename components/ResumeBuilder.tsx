
import React, { useReducer, useEffect, useState, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { DUMMY_RESUME_DATA, COLOR_PALETTES, FONT_FAMILIES, BLANK_RESUME_DATA } from '../constants';
import type { ResumeData, StyleConfig, PersonalDetails } from '../types';
import ResumePreview from './ResumePreview';
import ResumeForm from './ResumeForm';
import Icon from './common/Icon';
import { AuthContext } from '../context/AuthContext';
import { resumeService } from '../services/resumeService';

declare global {
    interface Window {
        jspdf: any;
        html2canvas: any;
    }
}

type Action =
    | { type: 'SET_TEMPLATE'; payload: number }
    | { type: 'SET_COLOR'; payload: string }
    | { type: 'SET_FONT_FAMILY'; payload: string }
    | { type: 'SET_FONT_SIZE'; payload: number }
    | { type: 'UPDATE_PERSONAL'; payload: Partial<PersonalDetails> }
    | { type: 'UPDATE_SUMMARY'; payload: string }
    | { type: 'UPDATE_FIELD'; payload: { section: keyof ResumeData; index: number; field: string; value: string } }
    | { type: 'ADD_ITEM'; payload: { section: 'experience' | 'education' | 'skills' | 'customSections' } }
    | { type: 'DELETE_ITEM'; payload: { section: keyof ResumeData; index: number } }
    | { type: 'LOAD_DATA'; payload: { data: ResumeData, style: StyleConfig } };

type State = { data: ResumeData, style: StyleConfig };

const getInitialState = (email?: string | null): State => {
    // FIX: Initialize with the first dummy resume data for a consistent user experience.
    // This prevents the default template from appearing empty for new users.
    const defaultData = DUMMY_RESUME_DATA[0];
    return {
        data: { 
            ...defaultData, 
            personal: { 
                ...defaultData.personal, 
                email: email || defaultData.personal.email 
            } 
        },
        style: {
            templateId: 1,
            color: COLOR_PALETTES[0].color,
            fontFamily: FONT_FAMILIES[0].value,
            fontSize: 1,
        }
    };
};


const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'LOAD_DATA':
            return { ...action.payload };
        case 'SET_TEMPLATE':
            // Note: DUMMY_RESUME_DATA is 0-indexed, templateId is 1-indexed
            const templateData = DUMMY_RESUME_DATA[action.payload - 1];
            // Preserve personal details, but use template structure/content
            return { 
                ...state, 
                style: { ...state.style, templateId: action.payload }, 
                data: {
                    ...templateData,
                    personal: state.data.personal,
                }
            };
        case 'SET_COLOR':
            return { ...state, style: { ...state.style, color: action.payload } };
        case 'SET_FONT_FAMILY':
            return { ...state, style: { ...state.style, fontFamily: action.payload } };
        case 'SET_FONT_SIZE':
            return { ...state, style: { ...state.style, fontSize: action.payload } };
        case 'UPDATE_PERSONAL':
            return { ...state, data: { ...state.data, personal: { ...state.data.personal, ...action.payload } } };
        case 'UPDATE_SUMMARY':
            return { ...state, data: { ...state.data, summary: action.payload } };
        case 'ADD_ITEM': {
            const { section } = action.payload;
            const newItem = section === 'experience' ? { id: Date.now().toString(), company: '', role: '', date: '', description: '' }
                : section === 'education' ? { id: Date.now().toString(), institution: '', degree: '', date: '', description: '' }
                : section === 'skills' ? { id: Date.now().toString(), name: '' }
                : { id: Date.now().toString(), title: 'New Section', content: '' };
            return { ...state, data: { ...state.data, [section]: [...state.data[section], newItem] } };
        }
        case 'DELETE_ITEM': {
            const { section, index } = action.payload;
            const items = [...state.data[section] as any[]];
            items.splice(index, 1);
            return { ...state, data: { ...state.data, [section]: items } };
        }
        case 'UPDATE_FIELD': {
             const { section, index, field, value } = action.payload;
             const items = [...state.data[section] as any[]];
             items[index] = { ...items[index], [field]: value };
             return { ...state, data: { ...state.data, [section]: items } };
        }
        default:
            return state;
    }
};

const TemplateThumbnail: React.FC<{id: number, hasPhoto: boolean, isActive: boolean, onClick: () => void}> = ({id, hasPhoto, isActive, onClick}) => (
     <button onClick={onClick} className={`border-2 rounded-lg p-2 transition w-full ${isActive ? 'border-primary ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-400'}`}>
        <div className="h-32 bg-gray-100 rounded flex flex-col items-center justify-center p-2 text-gray-500 text-sm">
            <div className={`w-full h-4 ${id === 1 || id === 3 ? 'bg-blue-300' : 'bg-gray-300'}`}></div>
            <div className="flex w-full mt-2 gap-2">
                {hasPhoto && <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>}
                <div className="flex-grow space-y-1">
                    <div className="w-full h-2 bg-gray-300 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-300 rounded"></div>
                </div>
            </div>
             <div className="w-full h-2 bg-gray-300 rounded mt-2"></div>
             <div className="w-full h-2 bg-gray-300 rounded mt-1"></div>
             <p className="mt-2 font-semibold">Template {id}</p>
        </div>
    </button>
);

const ResumeBuilder: React.FC = () => {
    const location = useLocation();
    const { user, token } = useContext(AuthContext);
    const initialResumeDataFromExplore = location.state?.resumeData;
    
    const [state, dispatch] = useReducer(reducer, getInitialState(user?.email));
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const saveTimeoutRef = useRef<number | null>(null);

    // Effect to load data from explore page if available
    useEffect(() => {
        if(initialResumeDataFromExplore && user) {
            const templateIndex = DUMMY_RESUME_DATA.findIndex(d => d.personal.fullName === initialResumeDataFromExplore.personal.fullName);
            const templateId = templateIndex !== -1 ? templateIndex + 1 : 2;
            
            dispatch({ type: 'LOAD_DATA', payload: {
                data: initialResumeDataFromExplore,
                style: {
                    ...state.style,
                    templateId,
                }
            }});
            window.history.replaceState({}, document.title) // Clear location state
            window.scrollTo(0, 0);
            setIsDataLoaded(true); // Mark as loaded
        }
    }, [initialResumeDataFromExplore, user, state.style]);

    // Effect to fetch user's saved resume from backend
    useEffect(() => {
        const fetchResume = async () => {
            if (user && token && !initialResumeDataFromExplore) {
                try {
                    const savedResume = await resumeService.getResume(token);
                    if (savedResume) {
                        dispatch({ type: 'LOAD_DATA', payload: savedResume });
                    }
                } catch (error) {
                    console.info("No saved resume found for this user, starting fresh.");
                } finally {
                    setIsDataLoaded(true);
                }
            } else if (!user) {
                setIsDataLoaded(true); // No user, so no data to load
            }
        };
        fetchResume();
    }, [user, token, initialResumeDataFromExplore]);

    // Effect to auto-save resume data to backend with debounce
    useEffect(() => {
        if (user && token && isDataLoaded) {
            // Clear any existing timeout
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
            // Set a new timeout to save data after 1.5 seconds of inactivity
            saveTimeoutRef.current = window.setTimeout(() => {
                resumeService.saveResume(state, token)
                    .catch(err => console.error("Failed to auto-save resume:", err));
            }, 1500);
        }
        // Cleanup function to clear timeout if component unmounts
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [state, user, token, isDataLoaded]);

    const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_FONT_SIZE', payload: parseFloat(e.target.value) });
    };

    const handleDownload = async () => {
        const resumeElement = document.getElementById('resume-preview-content');
        if (!resumeElement) {
            console.error("Resume element not found!");
            return;
        }

        setIsDownloading(true);

        try {
            const { jsPDF } = window.jspdf;
            const canvas = await window.html2canvas(resumeElement, {
                scale: 2,
                useCORS: true,
                logging: false,
            });
            
            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'pt',
                format: 'a4',
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${state.data.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`);

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Sorry, there was an error generating the PDF. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };
    
    if (!isDataLoaded) {
        return (
             <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="bg-neutral">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">1. Choose a Base Template</h2>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(id => (
                            <TemplateThumbnail 
                                key={id} 
                                id={id} 
                                hasPhoto={id === 1 || id === 3}
                                isActive={state.style.templateId === id}
                                onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: id })}
                             />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                     <div className="w-full">
                        <h2 className="text-xl font-bold mb-4 text-gray-700">2. Live Preview</h2>
                        <ResumePreview data={state.data} style={state.style} />
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-700">3. Customize Style</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2"><Icon name="palette" className="w-5 h-5" /> Color Palette</label>
                                <div className="flex flex-wrap gap-2">
                                    {COLOR_PALETTES.map(({ name, color }) => (
                                        <button key={name} onClick={() => dispatch({ type: 'SET_COLOR', payload: color })} title={name} className={`w-8 h-8 rounded-full ${color} transition transform hover:scale-110 ${state.style.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}></button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2"><Icon name="font" className="w-5 h-5" /> Font Family</label>
                                <select id="fontFamily" value={state.style.fontFamily} onChange={(e) => dispatch({ type: 'SET_FONT_FAMILY', payload: e.target.value })} className="bg-white mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                                    {FONT_FAMILIES.map(({ name, value }) => (
                                        <option key={name} value={value}>{name}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="fontSize" className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2"><Icon name="fontSize" className="w-5 h-5"/> Font Size</label>
                                <input id="fontSize" type="range" min="0.8" max="1.2" step="0.05" value={state.style.fontSize} onChange={handleFontSizeChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                                <div className="text-xs text-center text-gray-500 mt-1">{Math.round(state.style.fontSize * 100)}%</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                         <h2 className="text-xl font-bold mb-4 text-gray-700">4. Edit Content</h2>
                        <ResumeForm data={state.data} dispatch={dispatch} />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-center mb-4 text-gray-700">5. Download Your Resume</h2>
                        <div className="flex justify-center">
                            <button
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className="bg-accent text-white font-bold py-3 px-8 rounded-md hover:bg-blue-500 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center text-lg"
                            >
                                {isDownloading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating PDF...
                                    </>
                                ) : (
                                    <>
                                        <Icon name="download" className="w-5 h-5 mr-2" />
                                        Download as PDF
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
