import React, { useRef, useState, useLayoutEffect } from 'react';
import type { ResumeData, StyleConfig } from '../types';
import Icon from './common/Icon';

interface ResumePreviewProps {
  data: ResumeData;
  style: StyleConfig;
}

const RESUME_FIXED_WIDTH = 816; // A4 paper width at 96 DPI
const RESUME_ASPECT_RATIO = 1.414; // A4 aspect ratio (sqrt(2))


const ResumePreview: React.FC<ResumePreviewProps> = ({ data, style }) => {
    const { personal, summary, experience, education, skills, customSections } = data;
    const { templateId, color, fontFamily, fontSize } = style;

    const baseFontSize = 16 * fontSize;

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    
    useLayoutEffect(() => {
        const calculateScale = () => {
            if (wrapperRef.current) {
                const containerWidth = wrapperRef.current.offsetWidth;
                if (containerWidth < RESUME_FIXED_WIDTH) {
                    setScale(containerWidth / RESUME_FIXED_WIDTH);
                } else {
                    setScale(1);
                }
            }
        };

        // Use ResizeObserver for better performance and accuracy
        const observer = new ResizeObserver(calculateScale);
        const currentRef = wrapperRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        calculateScale(); // Initial scale calculation

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const wrapperHeight = scale < 1 ? `${RESUME_FIXED_WIDTH * RESUME_ASPECT_RATIO * scale}px` : 'auto';

    const renderHeader = () => {
        const headerColorClass = templateId === 1 || templateId === 3 ? `${color} text-white` : 'bg-transparent text-gray-800';
        
        switch (templateId) {
            case 1: // Modern with Photo Sidebar
                return (
                    <div className={`p-8 ${headerColorClass} text-center`}>
                        {personal.profilePhoto && <img src={personal.profilePhoto} alt={personal.fullName} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover" />}
                        <h1 className="text-3xl font-bold">{personal.fullName}</h1>
                        <p className="text-xl mt-1">{personal.jobTitle}</p>
                    </div>
                );
            case 2: // Classic No Photo
                return (
                    <div className="p-8 text-center border-b-2 border-gray-300">
                        <h1 className={`text-4xl font-bold ${color.replace('bg-', 'text-')}`}>{personal.fullName}</h1>
                        <p className="text-xl mt-2 text-gray-600">{personal.jobTitle}</p>
                    </div>
                );
            case 3: // Creative with Photo Header
                 return (
                    <div className={`p-8 ${headerColorClass} flex flex-row items-center text-left gap-6`}>
                         {personal.profilePhoto && <img src={personal.profilePhoto} alt={personal.fullName} className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover" />}
                         <div>
                            <h1 className="text-3xl font-bold">{personal.fullName}</h1>
                            <p className="text-lg mt-1">{personal.jobTitle}</p>
                         </div>
                    </div>
                );
            case 4: // Minimalist No Photo
                 return (
                    <div className="p-8 text-left">
                        <h1 className="text-4xl font-bold text-gray-900">{personal.fullName}</h1>
                        <p className={`text-xl mt-2 font-semibold ${color.replace('bg-', 'text-')}`}>{personal.jobTitle}</p>
                    </div>
                );
            default: return null;
        }
    };
    
    const renderContactInfo = () => {
        const iconClasses = templateId === 1 ? 'w-5 h-5 mr-2 text-white' : `w-5 h-5 mr-2 ${color.replace('bg-', 'text-')}`;
        const containerClasses = templateId === 1 ? 'text-white' : 'text-gray-600';
        const linkClasses = templateId === 1 ? 'hover:underline' : 'hover:text-primary';
        const itemContainerClasses = templateId === 1 ? '' : 'justify-center'; // Removed justify-start for sidebar to allow natural flow

        return (
            <div className={`flex flex-col flex-wrap ${itemContainerClasses} gap-y-2 text-sm ${containerClasses} p-8 break-all`}>
                {personal.email && <a href={`mailto:${personal.email}`} className={`flex items-center ${linkClasses}`}><Icon name="email" className={iconClasses} />{personal.email}</a>}
                {personal.phone && <a href={`tel:${personal.phone}`} className={`flex items-center ${linkClasses}`}><Icon name="phone" className={iconClasses} />{personal.phone}</a>}
                {personal.address && <span className="flex items-center"><Icon name="location" className={iconClasses} />{personal.address}</span>}
                {personal.linkedin && <a href={`https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className={`flex items-center ${linkClasses}`}><Icon name="linkedin" className={iconClasses} />{personal.linkedin}</a>}
                {personal.github && <a href={`https://${personal.github}`} target="_blank" rel="noopener noreferrer" className={`flex items-center ${linkClasses}`}><Icon name="github" className={iconClasses} />{personal.github}</a>}
            </div>
        );
    }
    
    const Section: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => {
        const titleColorClass = color.replace('bg-', 'text-');
        const borderClass = (templateId === 2 || templateId === 4) ? `border-b-2 ${color.replace('bg-','border-')}` : ``;
        return (
            <div className="mb-6">
                <h2 className={`text-xl font-bold ${titleColorClass} mb-3 pb-1 ${borderClass}`}>{title}</h2>
                <div className="text-gray-700 space-y-4">{children}</div>
            </div>
        );
    };
    
    const SidebarSections = () => (
        <div className="p-8">
             <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-3 pb-1">Education</h2>
                <div className="text-white/95 space-y-4">
                    {education.map(edu => (
                       <div key={edu.id}>
                           <div className="flex flex-row justify-between items-baseline">
                              <h3 className="font-bold text-md">{edu.degree}</h3>
                              <p className="text-sm font-light text-white/80">{edu.date}</p>
                           </div>
                           <p className="text-sm italic">{edu.institution}</p>
                           <p className="text-sm mt-2 whitespace-pre-wrap">{edu.description}</p>
                       </div>
                   ))}
                </div>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-3 pb-1">Skills</h2>
                <div className="flex flex-wrap -mr-2 -mb-2">
                    {skills.map(skill => (
                        <span key={skill.id} className="bg-white/20 text-white text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">{skill.name}</span>
                    ))}
                </div>
            </div>
        </div>
    );

    const ResumeContent = () => (
        <div className="p-8">
            <Section title="Summary">
                <p className="whitespace-pre-wrap">{summary}</p>
            </Section>
            <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id}>
                        <div className="flex flex-row justify-between items-baseline">
                           <h3 className="font-bold text-md">{exp.role}</h3>
                           <p className="text-sm font-light text-gray-500">{exp.date}</p>
                        </div>
                        <p className="text-sm italic text-gray-600">{exp.company}</p>
                        <p className="text-sm mt-2 whitespace-pre-wrap">{exp.description}</p>
                    </div>
                ))}
            </Section>
            {templateId !== 1 && (
                <Section title="Education">
                     {education.map(edu => (
                        <div key={edu.id}>
                            <div className="flex flex-row justify-between items-baseline">
                               <h3 className="font-bold text-md">{edu.degree}</h3>
                               <p className="text-sm font-light text-gray-500">{edu.date}</p>
                            </div>
                            <p className="text-sm italic text-gray-600">{edu.institution}</p>
                            <p className="text-sm mt-2 whitespace-pre-wrap">{edu.description}</p>
                        </div>
                    ))}
                </Section>
            )}
             {templateId !== 1 && (
                <Section title="Skills">
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                            <span key={skill.id} className={'bg-gray-200 text-gray-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full'}>{skill.name}</span>
                        ))}
                    </div>
                </Section>
            )}
            {customSections.map(section => (
                <Section key={section.id} title={section.title}>
                    <p className="whitespace-pre-wrap">{section.content}</p>
                </Section>
            ))}
        </div>
    );
    
    return (
        <div ref={wrapperRef} style={{ height: wrapperHeight }} className="overflow-hidden">
            <div 
                id="resume-preview-content"
                className="bg-white shadow-2xl rounded-lg overflow-hidden origin-top-left"
                style={{ 
                    width: `${RESUME_FIXED_WIDTH}px`,
                    transform: `scale(${scale})`,
                    fontSize: `${baseFontSize}px`,
                }}
            >
                <div className={`${fontFamily}`}>
                    {templateId === 1 && (
                        <div className="flex flex-row">
                            <div className={`w-1/3 ${color}`}>
                                {renderHeader()}
                                <div className="border-y border-white/20">
                                    {renderContactInfo()}
                                </div>
                                <SidebarSections />
                            </div>
                            <div className="w-2/3 bg-white">
                                <ResumeContent />
                            </div>
                        </div>
                    )}
                    {(templateId === 2 || templateId === 4) && (
                        <div>
                            {renderHeader()}
                            <div className="bg-gray-100">{renderContactInfo()}</div>
                            <ResumeContent />
                        </div>
                    )}
                    {templateId === 3 && (
                        <div>
                            {renderHeader()}
                            <div className="bg-gray-100">{renderContactInfo()}</div>
                            <ResumeContent />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;