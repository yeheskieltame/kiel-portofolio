
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

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
  updateService: (service: Service) => void;
  deleteService: (id: number) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: number) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateSkill: (skill: Skill) => void;
  deleteSkill: (id: number) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateEducation: (education: Education) => void;
  deleteEducation: (id: number) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Default data from the existing components
const defaultServices = [
  {
    id: 1,
    title: "Custom Software Development",
    description: "Tailored software solutions to meet your specific business needs with scalable architecture and clean code.",
    icon: "Code",
    features: ["Web Applications", "Desktop Software", "Mobile Apps", "API Development"],
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
    title: "Chatbot Development",
    description: "Intelligent conversational agents to enhance customer support and streamline information delivery.",
    icon: "MessageSquare",
    features: ["AI-Powered Chatbots", "Customer Support Bots", "Lead Generation Bots", "Information Retrieval"],
  },
  {
    id: 4,
    title: "Meta Business Account Setup",
    description: "Professional setup and optimization of your business presence across Meta platforms (Facebook, Instagram).",
    icon: "Facebook",
    features: ["Business Page Creation", "Ad Account Setup", "Content Strategy", "Audience Targeting"],
  }
];

const defaultProjects = [
  {
    id: 1,
    title: "Bike Rental Data Analysis",
    description: "Analyzed bike rental patterns using Python libraries to identify trends and predict future demand.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284",
    demoLink: "https://zsoeyhh3bvdl7bwvenk5ma.streamlit.app",
    githubLink: "https://github.com/yeheskieltame/Project-Data-Analist.git",
    tech: ["Python", "Pandas", "Matplotlib"],
  },
  {
    id: 2,
    title: "Machine Learning Time Management System",
    description: "Developed a system that optimizes study and rest times using machine learning, predicting optimal break intervals.",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66",
    demoLink: "https://time-management-system.streamlit.app",
    githubLink: "https://github.com/yeheskieltame/Time-Management-System.git",
    tech: ["Python", "Matplotlib", "JSON", "Google Colab", "Pandas"],
  },
  {
    id: 3,
    title: "Student Route and Dispenser Recommendation",
    description: "Built a machine learning model to predict the fastest routes for students on campus, including nearest dispensers.",
    image: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f",
    demoLink: "https://github.com/yeheskieltame/rekomendasi_dispenser.git",
    githubLink: "https://github.com/yeheskieltame/rekomendasi_dispenser.git",
    tech: ["Python", "Dijkstra's Algorithm", "Matplotlib"],
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description: "Created an interactive dashboard using Streamlit for exploring large datasets with intuitive visualizations.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    demoLink: "https://zsoeyhh3bvdl7bwvenk5ma.streamlit.app/",
    githubLink: "https://github.com/yeheskieltame",
    tech: ["Python", "Streamlit", "Pandas", "Matplotlib"],
  },
  {
    id: 5,
    title: "Personal Portfolio Website",
    description: "Developed a modern and responsive portfolio website showcasing my projects.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    demoLink: "https://spend-save-analyze.lovable.app",
    githubLink: " ",
    tech: ["Typescript", "Vite"],
  },
  {
    id: 6,
    title: "Laravel Web Development Project",
    description: "Created a full-stack web application with Laravel featuring user authentication, database integration, and responsive design.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
    demoLink: "https://github.com/yeheskieltame",
    githubLink: "https://github.com/yeheskieltame",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap"],
  },
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
  // Load data from localStorage or use defaults
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('adminServices');
    return saved ? JSON.parse(saved) : defaultServices;
  });
  
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('adminProjects');
    return saved ? JSON.parse(saved) : defaultProjects;
  });
  
  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('adminSkills');
    return saved ? JSON.parse(saved) : defaultSkills;
  });
  
  const [education, setEducation] = useState<Education[]>(() => {
    const saved = localStorage.getItem('adminEducation');
    return saved ? JSON.parse(saved) : defaultEducation;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('adminServices', JSON.stringify(services));
  }, [services]);
  
  useEffect(() => {
    localStorage.setItem('adminProjects', JSON.stringify(projects));
  }, [projects]);
  
  useEffect(() => {
    localStorage.setItem('adminSkills', JSON.stringify(skills));
  }, [skills]);
  
  useEffect(() => {
    localStorage.setItem('adminEducation', JSON.stringify(education));
  }, [education]);

  // Service operations
  const updateService = (updatedService: Service) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === updatedService.id ? updatedService : service
      )
    );
    toast({
      title: "Service Updated",
      description: `"${updatedService.title}" has been updated successfully.`,
    });
  };

  const deleteService = (id: number) => {
    setServices(prevServices => prevServices.filter(service => service.id !== id));
    toast({
      title: "Service Deleted",
      description: "Service has been deleted successfully.",
    });
  };

  const addService = (newService: Omit<Service, 'id'>) => {
    const id = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
    setServices(prevServices => [...prevServices, { ...newService, id }]);
    toast({
      title: "Service Added",
      description: `"${newService.title}" has been added successfully.`,
    });
  };

  // Project operations
  const updateProject = (updatedProject: Project) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    toast({
      title: "Project Updated",
      description: `"${updatedProject.title}" has been updated successfully.`,
    });
  };

  const deleteProject = (id: number) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
    toast({
      title: "Project Deleted",
      description: "Project has been deleted successfully.",
    });
  };

  const addProject = (newProject: Omit<Project, 'id'>) => {
    const id = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setProjects(prevProjects => [...prevProjects, { ...newProject, id }]);
    toast({
      title: "Project Added",
      description: `"${newProject.title}" has been added successfully.`,
    });
  };

  // Skill operations
  const updateSkill = (updatedSkill: Skill) => {
    setSkills(prevSkills => 
      prevSkills.map(skill => 
        skill.id === updatedSkill.id ? updatedSkill : skill
      )
    );
    toast({
      title: "Skill Updated",
      description: `"${updatedSkill.name}" has been updated successfully.`,
    });
  };

  const deleteSkill = (id: number) => {
    setSkills(prevSkills => prevSkills.filter(skill => skill.id !== id));
    toast({
      title: "Skill Deleted",
      description: "Skill has been deleted successfully.",
    });
  };

  const addSkill = (newSkill: Omit<Skill, 'id'>) => {
    const id = skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1;
    setSkills(prevSkills => [...prevSkills, { ...newSkill, id }]);
    toast({
      title: "Skill Added",
      description: `"${newSkill.name}" has been added successfully.`,
    });
  };

  // Education operations
  const updateEducation = (updatedEducation: Education) => {
    setEducation(prevEducation => 
      prevEducation.map(edu => 
        edu.id === updatedEducation.id ? updatedEducation : edu
      )
    );
    toast({
      title: "Education Updated",
      description: `"${updatedEducation.provider}" has been updated successfully.`,
    });
  };

  const deleteEducation = (id: number) => {
    setEducation(prevEducation => prevEducation.filter(edu => edu.id !== id));
    toast({
      title: "Education Provider Deleted",
      description: "Education provider has been deleted successfully.",
    });
  };

  const addEducation = (newEducation: Omit<Education, 'id'>) => {
    const id = education.length > 0 ? Math.max(...education.map(e => e.id)) + 1 : 1;
    setEducation(prevEducation => [...prevEducation, { ...newEducation, id }]);
    toast({
      title: "Education Provider Added",
      description: `"${newEducation.provider}" has been added successfully.`,
    });
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
    addEducation
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
