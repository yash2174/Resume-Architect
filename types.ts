
export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  profilePhoto?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  date: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  date: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface CustomSection {
    id: string;
    title: string;
    content: string;
}

export interface ResumeData {
  personal: PersonalDetails;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  customSections: CustomSection[];
}

export interface StyleConfig {
  templateId: number;
  color: string;
  fontFamily: string;
  fontSize: number;
}

export interface User {
  id: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}