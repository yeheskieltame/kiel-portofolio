import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  demoLink: string;
  githubLink: string;
  tech: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  icon: string;
}

export interface Education {
  id: number;
  provider: string;
  image_url?: string;
  courses: {
    id: number;
    name: string;
    link?: string;
  }[];
}

interface AdminDataContextType {
  projects: Project[];
  services: Service[];
  skills: Skill[];
  education: Education[];
  isLoading: boolean;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: number) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (service: Service) => void;
  deleteService: (id: number) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (skill: Skill) => void;
  deleteSkill: (id: number) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (education: Education) => void;
  deleteEducation: (id: number) => void;
  initializeDefaultData: () => Promise<void>;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

// Default services data focusing on Web3 and blockchain expertise
const defaultServices: Omit<Service, 'id'>[] = [
  {
    title: "Blockchain Integration",
    description: "Complete Web3 application development with smart contract integration, wallet connectivity, and decentralized features.",
    icon: "Blocks",
    features: [
      "Smart Contract Development & Integration",
      "MetaMask & Multi-Wallet Support", 
      "DeFi Protocol Integration",
      "NFT Marketplace Development",
      "Cross-chain Bridge Solutions"
    ]
  },
  {
    title: "Multi-Role Dashboard Systems",
    description: "Complex dashboard architectures supporting multiple user roles with real-time data and advanced analytics.",
    icon: "LayoutDashboard",
    features: [
      "Role-based Access Control",
      "Real-time Analytics & Charts",
      "Multi-tenant Architecture",
      "Admin Panel Development",
      "User Management Systems"
    ]
  },
  {
    title: "Real-time Analytics & Reporting",
    description: "Advanced data visualization and analytics systems with live updates and comprehensive reporting capabilities.",
    icon: "BarChart3",
    features: [
      "Interactive Charts & Graphs",
      "Real-time Data Processing",
      "Custom Report Generation",
      "Performance Monitoring",
      "Business Intelligence Tools"
    ]
  },
  {
    title: "Decentralized Validation Systems",
    description: "Build transparent and trustless validation mechanisms with economic incentives and reputation systems.",
    icon: "Shield",
    features: [
      "Consensus Mechanism Design",
      "Validator Reward Systems",
      "Reputation Management",
      "Appeal & Dispute Resolution",
      "Governance Token Integration"
    ]
  }
];

const defaultSkills: Omit<Skill, 'id'>[] = [
  { name: "React", level: 95, category: "Frontend", icon: "Code" },
  { name: "TypeScript", level: 90, category: "Frontend", icon: "FileText" },
  { name: "Blockchain", level: 85, category: "Web3", icon: "Link" },
  { name: "Smart Contracts", level: 80, category: "Web3", icon: "FileContract" },
  { name: "Web3.js/Ethers.js", level: 85, category: "Web3", icon: "Globe" },
  { name: "Solidity", level: 75, category: "Web3", icon: "Code2" },
  { name: "Node.js", level: 85, category: "Backend", icon: "Server" },
  { name: "Python", level: 80, category: "Backend", icon: "Code" },
  { name: "Machine Learning", level: 75, category: "AI/ML", icon: "Brain" },
  { name: "Data Analysis", level: 80, category: "AI/ML", icon: "BarChart" },
  { name: "PostgreSQL", level: 85, category: "Database", icon: "Database" },
  { name: "MongoDB", level: 75, category: "Database", icon: "Database" }
];

const defaultEducation: Omit<Education, 'id'>[] = [
  {
    provider: "Google",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    courses: [
      { id: 1, name: "Google Data Analytics Professional Certificate", link: "https://www.coursera.org/professional-certificates/google-data-analytics" },
      { id: 2, name: "Google IT Support Professional Certificate", link: "https://www.coursera.org/professional-certificates/google-it-support" }
    ]
  },
  {
    provider: "Meta",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    courses: [
      { id: 3, name: "Meta Front-End Developer Professional Certificate", link: "https://www.coursera.org/professional-certificates/meta-front-end-developer" },
      { id: 4, name: "Meta Back-End Developer Professional Certificate", link: "https://www.coursera.org/professional-certificates/meta-back-end-developer" }
    ]
  }
];

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('kiel_portfolio_projects')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      const mappedProjects = data?.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image,
        demoLink: project.demo_link,
        githubLink: project.github_link,
        tech: project.tech || []
      })) || [];

      setProjects(mappedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  };

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('kiel_portfolio_services')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const mappedServices = data.map(service => ({
          id: service.id,
          title: service.title,
          description: service.description,
          icon: service.icon,
          features: service.features || []
        }));
        setServices(mappedServices);
      } else {
        // If no services in database, initialize with defaults
        await initializeDefaultServices();
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      await initializeDefaultServices();
    }
  };

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('kiel_portfolio_skills')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setSkills(data);
      } else {
        // If no skills in database, initialize with defaults
        await initializeDefaultSkills();
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      await initializeDefaultSkills();
    }
  };

  const fetchEducation = async () => {
    try {
      const { data: educationData, error: educationError } = await supabase
        .from('kiel_portfolio_education')
        .select('*')
        .order('id', { ascending: true });

      if (educationError) throw educationError;

      if (educationData && educationData.length > 0) {
        const { data: coursesData, error: coursesError } = await supabase
          .from('kiel_portfolio_education_courses')
          .select('*')
          .order('id', { ascending: true });

        if (coursesError) throw coursesError;

        const educationWithCourses = educationData.map(edu => ({
          ...edu,
          courses: coursesData?.filter(course => course.education_id === edu.id) || []
        }));

        setEducation(educationWithCourses);
      } else {
        // If no education in database, initialize with defaults
        await initializeDefaultEducation();
      }
    } catch (error) {
      console.error('Error fetching education:', error);
      await initializeDefaultEducation();
    }
  };

  const initializeDefaultServices = async () => {
    try {
      const { data, error } = await supabase
        .from('kiel_portfolio_services')
        .insert(defaultServices)
        .select();

      if (error) throw error;
      if (data) setServices(data);
    } catch (error) {
      console.error('Error initializing default services:', error);
    }
  };

  const initializeDefaultSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('kiel_portfolio_skills')
        .insert(defaultSkills)
        .select();

      if (error) throw error;
      if (data) setSkills(data);
    } catch (error) {
      console.error('Error initializing default skills:', error);
    }
  };

  const initializeDefaultEducation = async () => {
    try {
      // Insert education providers
      const { data: educationData, error: educationError } = await supabase
        .from('kiel_portfolio_education')
        .insert(defaultEducation.map(({ courses, ...edu }) => edu))
        .select();

      if (educationError) throw educationError;

      // Insert courses for each education provider
      if (educationData) {
        const coursesToInsert = defaultEducation.flatMap((edu, index) => 
          edu.courses.map(course => ({
            ...course,
            education_id: educationData[index].id
          }))
        );

        const { data: coursesData, error: coursesError } = await supabase
          .from('kiel_portfolio_education_courses')
          .insert(coursesToInsert)
          .select();

        if (coursesError) throw coursesError;

        // Combine education with courses
        const educationWithCourses = educationData.map(edu => ({
          ...edu,
          courses: coursesData?.filter(course => course.education_id === edu.id) || []
        }));

        setEducation(educationWithCourses);
      }
    } catch (error) {
      console.error('Error initializing default education:', error);
    }
  };

  const initializeDefaultData = async () => {
    try {
      await Promise.all([
        initializeDefaultServices(),
        initializeDefaultSkills(),
        initializeDefaultEducation()
      ]);
      
      toast({
        title: "Success",
        description: "Default data initialized successfully",
      });
    } catch (error) {
      console.error('Error initializing default data:', error);
      toast({
        title: "Error",
        description: "Failed to initialize default data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchProjects(),
        fetchServices(),
        fetchSkills(),
        fetchEducation()
      ]);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  const addProject = async (project: Omit<Project, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('kiel_portfolio_projects')
        .insert([{
          title: project.title,
          description: project.description,
          image: project.image,
          demo_link: project.demoLink,
          github_link: project.githubLink,
          tech: project.tech
        }])
        .select()
        .single();

      if (error) throw error;

      const newProject = {
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image,
        demoLink: data.demo_link,
        githubLink: data.github_link,
        tech: data.tech || []
      };

      setProjects(prev => [...prev, newProject]);
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    }
  };

  const updateProject = async (project: Project) => {
    try {
      const { error } = await supabase
        .from('kiel_portfolio_projects')
        .update({
          title: project.title,
          description: project.description,
          image: project.image,
          demo_link: project.demoLink,
          github_link: project.githubLink,
          tech: project.tech
        })
        .eq('id', project.id);

      if (error) throw error;

      setProjects(prev => prev.map(p => p.id === project.id ? project : p));
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    }
  };

  const deleteProject = async (id: number) => {
    try {
      const { error } = await supabase
        .from('kiel_portfolio_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('kiel_portfolio_services')
        .insert([service])
        .select()
        .single();

      if (error) throw error;

      setServices(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Service added successfully",
      });
    } catch (error) {
      console.error('Error adding service:', error);
      toast({
        title: "Error",
        description: "Failed to add service",
        variant: "destructive",
      });
    }
  };

  const updateService = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('kiel_portfolio_services')
        .update(service)
        .eq('id', service.id);

      if (error) throw error;

      setServices(prev => prev.map(s => s.id === service.id ? service : s));
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive",
      });
    }
  };

  const deleteService = async (id: number) => {
    try {
      const { error } = await supabase
        .from('kiel_portfolio_services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setServices(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  const addSkill = async (skill: Omit<Skill, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('kiel_portfolio_skills')
        .insert([skill])
        .select()
        .single();

      if (error) throw error;

      setSkills(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Skill added successfully",
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
    }
  };

  const updateSkill = async (skill: Skill) => {
    try {
      const { error } = await supabase
        .from('kiel_portfolio_skills')
        .update(skill)
        .eq('id', skill.id);

      if (error) throw error;

      setSkills(prev => prev.map(s => s.id === skill.id ? skill : s));
      toast({
        title: "Success",
        description: "Skill updated successfully",
      });
    } catch (error) {
      console.error('Error updating skill:', error);
      toast({
        title: "Error",
        description: "Failed to update skill",
        variant: "destructive",
      });
    }
  };

  const deleteSkill = async (id: number) => {
    try {
      const { error } = await supabase
        .from('kiel_portfolio_skills')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSkills(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
    }
  };

  const addEducation = async (education: Omit<Education, 'id'>) => {
    try {
      const { data: educationData, error: educationError } = await supabase
        .from('kiel_portfolio_education')
        .insert([{
          provider: education.provider,
          image_url: education.image_url
        }])
        .select()
        .single();

      if (educationError) throw educationError;

      if (education.courses && education.courses.length > 0) {
        const coursesToInsert = education.courses.map(course => ({
          name: course.name,
          link: course.link,
          education_id: educationData.id
        }));

        const { data: coursesData, error: coursesError } = await supabase
          .from('kiel_portfolio_education_courses')
          .insert(coursesToInsert)
          .select();

        if (coursesError) throw coursesError;

        const newEducation = {
          ...educationData,
          courses: coursesData || []
        };

        setEducation(prev => [...prev, newEducation]);
      } else {
        setEducation(prev => [...prev, { ...educationData, courses: [] }]);
      }

      toast({
        title: "Success",
        description: "Education added successfully",
      });
    } catch (error) {
      console.error('Error adding education:', error);
      toast({
        title: "Error",
        description: "Failed to add education",
        variant: "destructive",
      });
    }
  };

  const updateEducation = async (education: Education) => {
    try {
      const { error: educationError } = await supabase
        .from('kiel_portfolio_education')
        .update({
          provider: education.provider,
          image_url: education.image_url
        })
        .eq('id', education.id);

      if (educationError) throw educationError;

      // Delete existing courses
      const { error: deleteCoursesError } = await supabase
        .from('kiel_portfolio_education_courses')
        .delete()
        .eq('education_id', education.id);

      if (deleteCoursesError) throw deleteCoursesError;

      // Insert updated courses
      if (education.courses && education.courses.length > 0) {
        const coursesToInsert = education.courses.map(course => ({
          name: course.name,
          link: course.link,
          education_id: education.id
        }));

        const { data: coursesData, error: coursesError } = await supabase
          .from('kiel_portfolio_education_courses')
          .insert(coursesToInsert)
          .select();

        if (coursesError) throw coursesError;

        const updatedEducation = {
          ...education,
          courses: coursesData || []
        };

        setEducation(prev => prev.map(e => e.id === education.id ? updatedEducation : e));
      } else {
        setEducation(prev => prev.map(e => e.id === education.id ? { ...education, courses: [] } : e));
      }

      toast({
        title: "Success",
        description: "Education updated successfully",
      });
    } catch (error) {
      console.error('Error updating education:', error);
      toast({
        title: "Error",
        description: "Failed to update education",
        variant: "destructive",
      });
    }
  };

  const deleteEducation = async (id: number) => {
    try {
      // Delete courses first (due to foreign key constraint)
      const { error: deleteCoursesError } = await supabase
        .from('kiel_portfolio_education_courses')
        .delete()
        .eq('education_id', id);

      if (deleteCoursesError) throw deleteCoursesError;

      // Delete education
      const { error: deleteEducationError } = await supabase
        .from('kiel_portfolio_education')
        .delete()
        .eq('id', id);

      if (deleteEducationError) throw deleteEducationError;

      setEducation(prev => prev.filter(e => e.id !== id));
      toast({
        title: "Success",
        description: "Education deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting education:', error);
      toast({
        title: "Error",
        description: "Failed to delete education",
        variant: "destructive",
      });
    }
  };

  const value = {
    projects,
    services,
    skills,
    education,
    isLoading,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
    addSkill,
    updateSkill,
    deleteSkill,
    addEducation,
    updateEducation,
    deleteEducation,
    initializeDefaultData
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (context === undefined) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
