import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import resumeData from '@/data/resume.json'
import { produce } from 'immer'

interface PersonalInfo {
  name: string
  title: string
  email: string
  website: string
  bio: string
}

interface Project {
  title: string
  description: string
  githubUrl: string
  technologies: string[]
}

interface ResumeData {
  personalInfo: PersonalInfo
  skills: string[]
  projects: Project[]
}

interface ResumeStore {
  data: ResumeData
  setData: (data: ResumeData) => void
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  updateSkills: (skills: string[]) => void
  updateProjects: (projects: Project[]) => void
}

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string[];
}

interface WorkExperienceJsonItem {
  id?: string;
  position: string;
  company: string;
  period?: string;
  projects?: Array<{ name: string; technologies: string[]; period?: string; }>;
  technicalStack?: string[];
  responsibilities?: string[];
}

interface WorkExperienceStateItem extends Omit<WorkExperienceJsonItem, 'id'> {
  id: string;
  period?: string;
}

interface ResumeJsonData {
  personalInfo: typeof resumeData.personalInfo;
  profileSummary: string;
  skills: typeof resumeData.skills;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
    id?: string;
    description?: string[];
  }>;
  workExperience: typeof resumeData.workExperience;
}

interface ResumeState {
  personalInfo: ResumeJsonData['personalInfo'];
  profileSummary: ResumeJsonData['profileSummary'];
  skills: ResumeJsonData['skills'];
  education: EducationItem[];
  workExperience: WorkExperienceStateItem[];
  setResumeData: () => void;
  addEducation: (newEducation: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, updates: Partial<Omit<EducationItem, 'id'>>) => void;
  removeEducation: (id: string) => void;
  addExperience: (newExperience: Omit<WorkExperienceStateItem, 'id'>) => void;
  updateExperience: (id: string, updates: Partial<Omit<WorkExperienceStateItem, 'id'>>) => void;
  removeExperience: (id: string) => void;
}

const initialData: ResumeData = {
  personalInfo: {
    name: '',
    title: '',
    email: '',
    website: '',
    bio: '',
  },
  skills: ['AWS', 'React', 'Node.js'],
  projects: [],
}

const initializeEducation = (educationData: ResumeJsonData['education']): EducationItem[] => {
  return educationData.map((edu, index) => ({
    degree: edu.degree,
    institution: edu.institution,
    period: edu.period,
    id: edu.id || `edu-${Date.now()}-${index}`,
    description: edu.description || [],
  }));
};

const initializeWorkExperience = (workData: ResumeJsonData['workExperience']): WorkExperienceStateItem[] => {
  return (workData as Array<WorkExperienceJsonItem>).map((work, index) => {
    const { id: sourceId, ...restOfWork } = work;
    return {
      ...restOfWork,
      id: sourceId || `work-${Date.now()}-${index}`, 
    };
  });
};

export const useResumeStore = create<ResumeState>((set) => ({
  personalInfo: resumeData.personalInfo,
  profileSummary: resumeData.profileSummary,
  skills: resumeData.skills,
  education: initializeEducation(resumeData.education),
  workExperience: initializeWorkExperience(resumeData.workExperience),
  setResumeData: () => {
    set({
      personalInfo: resumeData.personalInfo,
      profileSummary: resumeData.profileSummary,
      skills: resumeData.skills,
      education: initializeEducation(resumeData.education),
      workExperience: initializeWorkExperience(resumeData.workExperience),
    });
  },
  addEducation: (newEducationData) =>
    set(
      produce((state: ResumeState) => {
        const newEducation: EducationItem = {
          ...newEducationData,
          id: `edu-${Date.now()}`,
          description: newEducationData.description || [],
        };
        state.education.push(newEducation);
      })
    ),
  updateEducation: (id, updates) =>
    set(
      produce((state: ResumeState) => {
        const index = state.education.findIndex((edu) => edu.id === id);
        if (index !== -1) {
          const currentDescription = state.education[index].description;
          state.education[index] = { 
            ...state.education[index], 
            ...updates,
            description: updates.description !== undefined ? updates.description : currentDescription 
          };
        }
      })
    ),
  removeEducation: (id) =>
    set(
      produce((state: ResumeState) => {
        state.education = state.education.filter((edu) => edu.id !== id);
      })
    ),
  addExperience: (newExperienceData) =>
    set(
      produce((state: ResumeState) => {
        const newExperience: WorkExperienceStateItem = {
          ...newExperienceData,
          id: `work-${Date.now()}`,
        };
        state.workExperience.push(newExperience);
      })
    ),
  updateExperience: (id, updates) =>
    set(
      produce((state: ResumeState) => {
        const index = state.workExperience.findIndex((work) => work.id === id);
        if (index !== -1) {
          state.workExperience[index] = { ...state.workExperience[index], ...updates };
        }
      })
    ),
  removeExperience: (id) =>
    set(
      produce((state: ResumeState) => {
        state.workExperience = state.workExperience.filter((work) => work.id !== id);
      })
    ),
})) 