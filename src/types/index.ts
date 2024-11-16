export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'expert' | 'candidate';
  createdAt: Date;
}

export interface Expert extends User {
  specialization: string[];
  experience: number;
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  publications: string[];
  skills: string[];
  previousBoards: string[];
  relevancyScore?: number;
}

export interface Candidate extends User {
  specialization: string[];
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  experience: number;
  researchArea: string[];
}

export interface InterviewBoard {
  id: string;
  name: string;
  requiredSpecializations: string[];
  date: Date;
  candidates: string[];
  experts: string[];
  status: 'pending' | 'active' | 'completed';
}

export interface MatchingScore {
  expertId: string;
  boardId: string;
  score: number;
  breakdown: {
    specializationMatch: number;
    experienceScore: number;
    educationScore: number;
    previousPerformance: number;
  };
}