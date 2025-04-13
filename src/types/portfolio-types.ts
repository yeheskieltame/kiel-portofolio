
// Custom types for our portfolio application that work with Supabase
export interface PortfolioService {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  created_at?: string;
  updated_at?: string;
}

export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  image: string;
  demo_link: string;
  github_link: string;
  tech: string[];
  created_at?: string;
  updated_at?: string;
}

export interface PortfolioSkill {
  id: number;
  name: string;
  icon: string;
  level: number;
  category: 'programming' | 'ml' | 'webdev';
  created_at?: string;
  updated_at?: string;
}

export interface PortfolioEducation {
  id: number;
  provider: string;
  courses: PortfolioEducationCourse[];
  created_at?: string;
  updated_at?: string;
}

export interface PortfolioEducationCourse {
  id?: number;
  education_id?: number;
  name: string;
  link: string;
  created_at?: string;
  updated_at?: string;
}

export interface PortfolioAdmin {
  id: string;
  email: string;
  password_hash: string;
  created_at?: string;
  updated_at?: string;
}
