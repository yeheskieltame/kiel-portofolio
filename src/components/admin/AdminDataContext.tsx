import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Types for our data
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  demoLink: string;
  githubLink: string;
  tech: string[];
}

export interface Skill {
  id: number;
  name: string;
  icon: string;
  level: number;
  category: 'programming' | 'ml' | 'webdev';
}

export interface Education {
  id: number;
  provider: string;
  imageUrl?: string;
  courses: {
    name: string;
    link: string;
  }[];
}

interface AdminContextType {
  services: Service[];
  projects: Project[];
  skills: Skill[];
  education: Education[];
  updateService: (service: Service) => Promise<void>;
  deleteService: (id: number) => Promise<void>;
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateSkill: (skill: Skill) => Promise<void>;
  deleteSkill: (id: number) => Promise<void>;
  addSkill: (skill: Omit<Skill, 'id'>) => Promise<void>;
  updateEducation: (education: Education) => Promise<void>;
  deleteEducation: (id: number) => Promise<void>;
  addEducation: (education: Omit<Education, 'id'>) => Promise<void>;
  initializeDefaultData: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Default data as fallback
const defaultServices = [
  {
    id: 1,
    title: "Blockchain Development",
    description: "Full-stack Web3 applications with smart contract integration, DeFi solutions, and decentralized systems architecture.",
    icon: "Code",
    features: ["Smart Contract Development", "Web3 Integration", "DeFi Applications", "Blockchain Analytics"],
  },
  {
    id: 2,
    title: "Machine Learning Solutions",
    description: "Data-driven ML solutions to optimize processes, predict outcomes, and unlock insights from your data.",
    icon: "BrainCircuit",
    features: ["Predictive Analytics", "Data Classification", "Pattern Recognition", "Computer Vision"],
  },
  {
    id: 3,
    title: "Full-Stack Web Development",
    description: "Modern web applications with advanced UI/UX, real-time features, and scalable backend architecture.",
    icon: "MessageSquare",
    features: ["React/TypeScript Applications", "Real-time Analytics", "Responsive Design", "API Development"],
  },
  {
    id: 4,
    title: "System Architecture & Analytics",
    description: "Complex system design with multi-role dashboards, data visualization, and performance optimization.",
    icon: "Facebook",
    features: ["Dashboard Development", "Data Visualization", "Performance Monitoring", "System Integration"],
  }
];

const defaultProjects = [
  {
    id: 1,
    title: "🏢 Report It Right Now - Blockchain Reporting System",
    description: "Revolutionary Web3 application for transparent blockchain-based reporting system with decentralized validation, multi-role dashboards, and economic incentive mechanisms. Features smart contract integration, real-time analytics, and comprehensive validation system.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
    demoLink: "https://github.com/yeheskieltame",
    githubLink: "https://github.com/yeheskieltame",
    tech: ["React", "TypeScript", "Blockchain", "Web3", "Smart Contracts", "MetaMask", "Recharts", "Shadcn/UI", "Tailwind CSS"],
  }
];

const defaultSkills = [
  {
    id: 1,
    name: "Python",
    icon: "/placeholder.svg",
    level: 90,
    category: "programming" as const,
  },
  {
    id: 2,
    name: "JavaScript",
    icon: "/placeholder.svg",
    level: 85,
    category: "programming" as const,
  },
  {
    id: 3,
    name: "Java",
    icon: "/placeholder.svg",
    level: 80,
    category: "programming" as const,
  },
  {
    id: 4,
    name: "HTML & CSS",
    icon: "/placeholder.svg",
    level: 85,
    category: "programming" as const,
  },
  {
    id: 5,
    name: "PHP",
    icon: "/placeholder.svg",
    level: 75,
    category: "programming" as const,
  },
  {
    id: 6,
    name: "SQL",
    icon: "/placeholder.svg",
    level: 80,
    category: "programming" as const,
  },
  {
    id: 7,
    name: "TensorFlow",
    icon: "/placeholder.svg",
    level: 85,
    category: "ml" as const,
  },
  {
    id: 8,
    name: "PyTorch",
    icon: "/placeholder.svg",
    level: 75,
    category: "ml" as const,
  },
  {
    id: 9,
    name: "Scikit-learn",
    icon: "/placeholder.svg",
    level: 90,
    category: "ml" as const,
  },
  {
    id: 10,
    name: "Pandas",
    icon: "/placeholder.svg",
    level: 90,
    category: "ml" as const,
  },
  {
    id: 11,
    name: "NumPy",
    icon: "/placeholder.svg",
    level: 85,
    category: "ml" as const,
  },
  {
    id: 12,
    name: "Matplotlib",
    icon: "/placeholder.svg",
    level: 80,
    category: "ml" as const,
  },
  {
    id: 13,
    name: "Laravel",
    icon: "/placeholder.svg",
    level: 75,
    category: "webdev" as const,
  },
  {
    id: 14,
    name: "Bootstrap",
    icon: "/placeholder.svg",
    level: 85,
    category: "webdev" as const,
  },
  {
    id: 15,
    name: "TailwindCSS",
    icon: "/placeholder.svg",
    level: 80,
    category: "webdev" as const,
  },
  {
    id: 16,
    name: "Flask",
    icon: "/placeholder.svg",
    level: 75,
    category: "webdev" as const,
  },
  {
    id: 17,
    name: "Git & GitHub",
    icon: "/placeholder.svg",
    level: 85,
    category: "webdev" as const,
  },
  {
    id: 18,
    name: "Google Cloud",
    icon: "/placeholder.svg",
    level: 70,
    category: "webdev" as const,
  }
];

const defaultEducation = [
  {
    id: 1,
    provider: "DeepLearning.AI",
    imageUrl: "",
    courses: [
      {
        name: "Linear Algebra for Machine Learning and Data Science",
        link: "https://www.coursera.org/account/accomplishments/verify/X1AKSP4V28QN"
      }
    ]
  },
  {
    id: 2,
    provider: "Dicoding Indonesia",
    imageUrl: "",
    courses: [
      {
        name: "Learn Data Analysis with Python",
        link: "https://www.dicoding.com/certificates/1OP84LG61ZQK"
      },
      {
        name: "Learn the Basics of Data Visualization",
        link: "https://www.dicoding.com/certificates/GRX54GKJYP0M"
      },
      {
        name: "Belajar Dasar Structured Query Language (SQL)",
        link: "https://www.dicoding.com/certificates/JMZV1234RXN9"
      },
      {
        name: "Getting Started with Programming Basics to Become a Software Developer",
        link: "https://www.dicoding.com/certificates/81P2N05WNXOY"
      },
      {
        name: "Introduction to Programming Logic (Programming Logic 101)",
        link: "https://www.dicoding.com/certificates/JLX17OVD6X72"
      },
      {
        name: "Getting Started with Python Programming",
        link: "https://www.dicoding.com/certificates/GRX54DW1YP0M"
      },
      {
        name: "Learn Git Basics with GitHub",
        link: "https://www.dicoding.com/certificates/JMZV3KO5JPN9"
      }
    ]
  },
  {
    id: 3,
    provider: "SanberCode",
    imageUrl: "",
    courses: [
      {
        name: "Laravel Web Development",
        link: "https://sanbercode.com/certificate/in/c352b903-be13-445f-9aa7-3bc77f2ba2f3"
      }
    ]
  },
  {
    id: 4,
    provider: "Coursera",
    imageUrl: "",
    courses: [
      {
        name: "Crash Course on Python",
        link: "https://www.coursera.org/account/accomplishments/verify/S6KHEU5OCWWS"
      },
      {
        name: "Using Python to Interact with the Operating System",
        link: "https://www.coursera.org/account/accomplishments/verify/5D7M81TJ3QZ2"
      }
    ]
  }
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  // State for storing fetched data
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Function to fetch education with courses
  const fetchEducationWithCourses = async () => {
    try {
      // Fetch education providers
      const { data: educationData, error: educationError } = await supabase
        .from('kiel_portfolio_education')
        .select('*');
        
      if (educationError) throw new Error(educationError.message);
      
      if (!educationData) return [];
      
      // For each education provider, fetch their courses
      const educationWithCourses = await Promise.all(
        educationData.map(async (edu: any) => {
          const { data: coursesData, error: coursesError } = await supabase
            .from('kiel_portfolio_education_courses')
            .select('*')
            .eq('education_id', edu.id);
            
          if (coursesError) throw new Error(coursesError.message);
          
          return {
            id: edu.id,
            provider: edu.provider,
            imageUrl: edu.image_url || '',
            courses: coursesData?.map((course: any) => ({
              name: course.name,
              link: course.link || ''
            })) || []
          };
        })
      );
      
      return educationWithCourses;
    } catch (err: any) {
      console.error("Error fetching education data:", err);
      throw err;
    }
  };

  // Fetch data from Supabase on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch services
        const { data: servicesData, error: servicesError } = await supabase
          .from('kiel_portfolio_services')
          .select('*');
          
        if (servicesError) throw new Error(servicesError.message);
        
        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('kiel_portfolio_projects')
          .select('*');
          
        if (projectsError) throw new Error(projectsError.message);
        
        // Fetch skills
        const { data: skillsData, error: skillsError } = await supabase
          .from('kiel_portfolio_skills')
          .select('*');
          
        if (skillsError) throw new Error(skillsError.message);
        
        // Fetch education with courses
        const educationWithCourses = await fetchEducationWithCourses();
        
        // Map Supabase data to our expected format
        if (servicesData) {
          setServices(servicesData.map((service: any) => ({
            id: service.id,
            title: service.title,
            description: service.description,
            icon: service.icon,
            features: service.features
          })));
        } else {
          setServices(defaultServices);
        }
        
        if (projectsData) {
          setProjects(projectsData.map((project: any) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            image: project.image,
            demoLink: project.demo_link,
            githubLink: project.github_link,
            tech: project.tech
          })));
        } else {
          setProjects(defaultProjects);
        }
        
        if (skillsData) {
          setSkills(skillsData.map((skill: any) => ({
            id: skill.id,
            name: skill.name,
            icon: skill.icon,
            level: skill.level,
            category: skill.category as 'programming' | 'ml' | 'webdev'
          })));
        } else {
          setSkills(defaultSkills);
        }
        
        if (educationWithCourses.length > 0) {
          setEducation(educationWithCourses);
        } else {
          setEducation(defaultEducation);
        }
        
      } catch (error: any) {
        console.error("Error fetching data from Supabase:", error);
        setError("Failed to load data from server. Using local data instead.");
        
        // Fallback to localStorage if Supabase fails
        const savedServices = localStorage.getItem('adminServices');
        const savedProjects = localStorage.getItem('adminProjects');
        const savedSkills = localStorage.getItem('adminSkills');
        const savedEducation = localStorage.getItem('adminEducation');
        
        setServices(savedServices ? JSON.parse(savedServices) : defaultServices);
        setProjects(savedProjects ? JSON.parse(savedProjects) : defaultProjects);
        setSkills(savedSkills ? JSON.parse(savedSkills) : defaultSkills);
        setEducation(savedEducation ? JSON.parse(savedEducation) : defaultEducation);
        
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Save to localStorage as backup whenever data changes
  useEffect(() => {
    if (services.length > 0) {
      localStorage.setItem('adminServices', JSON.stringify(services));
    }
  }, [services]);
  
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('adminProjects', JSON.stringify(projects));
    }
  }, [projects]);
  
  useEffect(() => {
    if (skills.length > 0) {
      localStorage.setItem('adminSkills', JSON.stringify(skills));
    }
  }, [skills]);
  
  useEffect(() => {
    if (education.length > 0) {
      localStorage.setItem('adminEducation', JSON.stringify(education));
    }
  }, [education]);

  // Service operations
  const updateService = async (updatedService: Service) => {
    try {
      const { error } = await supabase
        .from('kiel_portfolio_services')
        .update({
          title: updatedService.title,
          description: updatedService.description,
          icon: updatedService.icon,
          features: updatedService.features
        })
        .eq('id', updatedService.id);
      
      if (error) throw error;
      
      // Update local state
      setServices(prevServices => 
        prevServices.map(service => 
          service.id === updatedService.id ? updatedService : service
        )
      );
      
      toast({
        title: "Service Updated",
        description: `"${updatedService.title}" has been updated successfully.`,
      });
    } catch (error: any) {
      console.error("Error updating service:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update service. Please try again.",
        variant: "destructive"
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
      
      // Update local state
      setServices(prevServices => prevServices.filter(service => service.id !== id));
      
      toast({
        title: "Service Deleted",
        description: "Service has been deleted successfully.",
      });
    } catch (error: any) {
      console.error("Error deleting service:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete service. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addService = async (newService: Omit<Service, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('kiel_portfolio_services')
        .insert({
          title: newService.title,
          description: newService.description,
          icon: newService.icon,
          features: newService.features
        })
        .select();
        
      if (error) throw error;
      
      if (data && data[0]) {
        // Add to local state with the new ID from Supabase
        const serviceWithId = { 
          id: data[0].id, 
          ...newService 
        };
        setServices(prevServices => [...prevServices, serviceWithId]);
        
        toast({
          title: "Service Added",
          description: `"${newService.title}" has been added successfully.`,
        });
      }
    } catch (error: any) {
      console.error("Error adding service:", error);
      toast({
        title: "Add Failed",
        description: "Failed to add service. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Project operations
  const updateProject = async (updatedProject: Project) => {
    try {
      const { error } = await supabase
        .from('kiel_portfolio_projects')
        .update({
          title: updatedProject.title,
          description: updatedProject.description,
          image: updatedProject.image,
          demo_link: updatedProject.demoLink,
          github_link: updatedProject.githubLink,
          tech: updatedProject.tech
        })
        .eq('id', updatedProject.id);
        
      if (error) throw error;
      
      // Update local state
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === updatedProject.id ? updatedProject : project
        )
      );
      
      toast({
        title: "Project Updated",
        description: `"${updatedProject.title}" has been updated successfully.`,
      });
    } catch (error: any) {
      console.error("Error updating project:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update project. Please try again.",
        variant: "destructive"
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
      
      // Update local state
      setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
      
      toast({
        title: "Project Deleted",
        description: "Project has been deleted successfully.",
      });
    } catch (error: any) {
      console.error("Error deleting project:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete project. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addProject = async (newProject: Omit<Project, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('kiel_portfolio_projects')
        .insert({
          title: newProject.title,
          description: newProject.description,
          image: newProject.image,
          demo_link: newProject.demoLink,
          github_link: newProject.githubLink,
          tech: newProject.tech
        })
        .select();
        
      if (error) throw error;
      
      if (data && data[0]) {
        // Add to local state with the new ID from Supabase
        const projectWithId = { 
          id: data[0].id, 
          ...newProject 
        };
        setProjects(prevProjects => [...prevProjects, projectWithId]);
        
        toast({
          title: "Project Added",
          description: `"${newProject.title}" has been added successfully.`,
        });
      }
    } catch (error: any) {
      console.error("Error adding project:", error);
      toast({
        title: "Add Failed",
        description: "Failed to add project. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Skill operations
  const updateSkill = async (updatedSkill: Skill) => {
    try {
      const { error } = await supabase
        .from('kiel_portfolio_skills')
        .update({
          name: updatedSkill.name,
          icon: updatedSkill.icon,
          level: updatedSkill.level,
          category: updatedSkill.category
        })
        .eq('id', updatedSkill.id);
        
      if (error) throw error;
      
      // Update local state
      setSkills(prevSkills => 
        prevSkills.map(skill => 
          skill.id === updatedSkill.id ? updatedSkill : skill
        )
      );
      
      toast({
        title: "Skill Updated",
        description: `"${updatedSkill.name}" has been updated successfully.`,
      });
    } catch (error: any) {
      console.error("Error updating skill:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update skill. Please try again.",
        variant: "destructive"
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
      
      // Update local state
      setSkills(prevSkills => prevSkills.filter(skill => skill.id !== id));
      
      toast({
        title: "Skill Deleted",
        description: "Skill has been deleted successfully.",
      });
    } catch (error: any) {
      console.error("Error deleting skill:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete skill. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addSkill = async (newSkill: Omit<Skill, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('kiel_portfolio_skills')
        .insert({
          name: newSkill.name,
          icon: newSkill.icon,
          level: newSkill.level,
          category: newSkill.category
        })
        .select();
        
      if (error) throw error;
      
      if (data && data[0]) {
        // Add to local state with the new ID from Supabase
        const skillWithId = { 
          id: data[0].id, 
          ...newSkill 
        };
        setSkills(prevSkills => [...prevSkills, skillWithId]);
        
        toast({
          title: "Skill Added",
          description: `"${newSkill.name}" has been added successfully.`,
        });
      }
    } catch (error: any) {
      console.error("Error adding skill:", error);
      toast({
        title: "Add Failed",
        description: "Failed to add skill. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Education operations
  const updateEducation = async (updatedEducation: Education) => {
    try {
      // Update education provider
      const { error: providerError } = await supabase
        .from('kiel_portfolio_education')
        .update({ 
          provider: updatedEducation.provider,
          image_url: updatedEducation.imageUrl
        })
        .eq('id', updatedEducation.id);
        
      if (providerError) throw providerError;
      
      // Delete existing courses for this provider
      const { error: deleteError } = await supabase
        .from('kiel_portfolio_education_courses')
        .delete()
        .eq('education_id', updatedEducation.id);
        
      if (deleteError) throw deleteError;
      
      // Insert updated courses
      if (updatedEducation.courses.length > 0) {
        const coursesToInsert = updatedEducation.courses.map(course => ({
          education_id: updatedEducation.id,
          name: course.name,
          link: course.link
        }));
        
        const { error: insertError } = await supabase
          .from('kiel_portfolio_education_courses')
          .insert(coursesToInsert);
          
        if (insertError) throw insertError;
      }
      
      // Update local state
      setEducation(prevEducation => 
        prevEducation.map(edu => 
          edu.id === updatedEducation.id ? updatedEducation : edu
        )
      );
      
      toast({
        title: "Education Updated",
        description: `"${updatedEducation.provider}" has been updated successfully.`,
      });
    } catch (error: any) {
      console.error("Error updating education:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update education. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteEducation = async (id: number) => {
    try {
      // Cascade delete will handle removing courses
      const { error } = await supabase
        .from('kiel_portfolio_education')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setEducation(prevEducation => prevEducation.filter(edu => edu.id !== id));
      
      toast({
        title: "Education Provider Deleted",
        description: "Education provider has been deleted successfully.",
      });
    } catch (error: any) {
      console.error("Error deleting education:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete education provider. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addEducation = async (newEducation: Omit<Education, 'id'>) => {
    try {
      // First insert the education provider
      const { data, error } = await supabase
        .from('kiel_portfolio_education')
        .insert({ 
          provider: newEducation.provider,
          image_url: newEducation.imageUrl
        })
        .select();
        
      if (error) throw error;
      
      if (data && data[0]) {
        const educationId = data[0].id;
        
        // Then insert courses
        if (newEducation.courses.length > 0) {
          const coursesToInsert = newEducation.courses.map(course => ({
            education_id: educationId,
            name: course.name,
            link: course.link
          }));
          
          const { error: coursesError } = await supabase
            .from('kiel_portfolio_education_courses')
            .insert(coursesToInsert);
            
          if (coursesError) throw coursesError;
        }
        
        // Add to local state with the new ID from Supabase
        const educationWithId = { 
          id: educationId, 
          ...newEducation 
        };
        setEducation(prevEducation => [...prevEducation, educationWithId]);
        
        toast({
          title: "Education Provider Added",
          description: `"${newEducation.provider}" has been added successfully.`,
        });
      }
    } catch (error: any) {
      console.error("Error adding education:", error);
      toast({
        title: "Add Failed",
        description: "Failed to add education provider. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Initialize database with default data
  const initializeDefaultData = async () => {
    try {
      // Clear existing data first
      await supabase.from('kiel_portfolio_services').delete().neq('id', 0);
      await supabase.from('kiel_portfolio_projects').delete().neq('id', 0);
      await supabase.from('kiel_portfolio_skills').delete().neq('id', 0);
      await supabase.from('kiel_portfolio_education').delete().neq('id', 0);
      
      // Insert services
      for (const service of defaultServices) {
        // Remove the id as it will be auto-generated
        const { id, ...serviceData } = service;
        await supabase.from('kiel_portfolio_services').insert(serviceData);
      }
      
      // Insert projects
      for (const project of defaultProjects) {
        const { id, demoLink, githubLink, ...projectData } = project;
        await supabase.from('kiel_portfolio_projects').insert({
          ...projectData,
          demo_link: demoLink,
          github_link: githubLink
        });
      }
      
      // Insert skills
      for (const skill of defaultSkills) {
        const { id, ...skillData } = skill;
        await supabase.from('kiel_portfolio_skills').insert(skillData);
      }
      
      // Insert education providers and courses
      for (const edu of defaultEducation) {
        const { id, courses, ...eduData } = edu;
        
        // Insert education provider
        const { data: providerData, error: providerError } = await supabase
          .from('kiel_portfolio_education')
          .insert(eduData)
          .select();
          
        if (providerError) throw providerError;
        if (!providerData || !providerData[0]) {
          throw new Error("Failed to insert education provider");
        }
        
        const educationId = providerData[0].id;
        
        // Insert courses for this provider
        if (courses && courses.length > 0) {
          const coursesWithEducationId = courses.map(course => ({
            education_id: educationId,
            name: course.name,
            link: course.link
          }));
          
          const { error: coursesError } = await supabase
            .from('kiel_portfolio_education_courses')
            .insert(coursesWithEducationId);
            
          if (coursesError) throw coursesError;
        }
      }
      
      // Refetch data to update the UI
      const fetchData = async () => {
        const { data: servicesData } = await supabase
          .from('kiel_portfolio_services')
          .select('*');
          
        const { data: projectsData } = await supabase
          .from('kiel_portfolio_projects')
          .select('*');
          
        const { data: skillsData } = await supabase
          .from('kiel_portfolio_skills')
          .select('*');
          
        const educationWithCourses = await fetchEducationWithCourses();
        
        if (servicesData) {
          setServices(servicesData.map((service: any) => ({
            id: service.id,
            title: service.title,
            description: service.description,
            icon: service.icon,
            features: service.features
          })));
        }
        
        if (projectsData) {
          setProjects(projectsData.map((project: any) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            image: project.image,
            demoLink: project.demo_link,
            githubLink: project.github_link,
            tech: project.tech
          })));
        }
        
        if (skillsData) {
          setSkills(skillsData.map((skill: any) => ({
            id: skill.id,
            name: skill.name,
            icon: skill.icon,
            level: skill.level,
            category: skill.category as 'programming' | 'ml' | 'webdev'
          })));
        }
        
        if (educationWithCourses.length > 0) {
          setEducation(educationWithCourses);
        }
      };
      
      await fetchData();
      
      return;
    } catch (error: any) {
      console.error("Error initializing database with default data:", error);
      throw error;
    }
  };

  const value = {
    services,
    projects,
    skills,
    education,
    updateService,
    deleteService,
    addService,
    updateProject,
    deleteProject,
    addProject,
    updateSkill,
    deleteSkill,
    addSkill,
    updateEducation,
    deleteEducation,
    addEducation,
    initializeDefaultData,
    isLoading,
    error
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminData must be used within an AdminProvider');
  }
  return context;
};
