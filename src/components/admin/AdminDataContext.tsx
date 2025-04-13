
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { 
  PortfolioService, 
  PortfolioProject, 
  PortfolioSkill, 
  PortfolioEducation,
  PortfolioEducationCourse 
} from '@/types/portfolio-types';
import { supabase } from '@/integrations/supabase/client';

// Types for our data - using our custom types that match Supabase schema
export type Service = PortfolioService;
export type Project = PortfolioProject;
export type Skill = PortfolioSkill;
export type Education = PortfolioEducation;
export type EducationCourse = PortfolioEducationCourse;

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
  isLoading: boolean;
  error: string | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Sample data for development (will be used as fallback in case Supabase connection fails)
const initialServices: Service[] = [
  {
    id: 1,
    title: "Machine Learning Development",
    description: "Custom machine learning solutions for your business needs",
    icon: "BrainCircuit",
    features: ["Algorithm Development", "Model Training", "Performance Tuning"]
  },
  {
    id: 2,
    title: "Data Analysis & Visualization",
    description: "Transform your data into actionable insights",
    icon: "BarChart",
    features: ["Exploratory Analysis", "Interactive Dashboards", "Statistical Modeling"]
  },
  {
    id: 3,
    title: "Full-Stack Web Development",
    description: "End-to-end web solutions with modern technologies",
    icon: "Code",
    features: ["Frontend Development", "Backend APIs", "Database Design"]
  }
];

const initialProjects: Project[] = [
  {
    id: 1,
    title: "Sentiment Analysis Tool",
    description: "A machine learning model for analyzing customer sentiment from product reviews",
    image: "/placeholder.svg",
    demo_link: "https://example.com/demo",
    github_link: "https://github.com/example/sentiment",
    tech: ["Python", "TensorFlow", "NLTK", "Flask"]
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and TypeScript",
    image: "/placeholder.svg",
    demo_link: "https://example.com",
    github_link: "https://github.com/example/portfolio",
    tech: ["React", "TypeScript", "Tailwind CSS"]
  }
];

const initialSkills: Skill[] = [
  {
    id: 1,
    name: "Python",
    icon: "/placeholder.svg",
    level: 95,
    category: "programming"
  },
  {
    id: 2,
    name: "TensorFlow",
    icon: "/placeholder.svg",
    level: 85,
    category: "ml"
  },
  {
    id: 3,
    name: "React",
    icon: "/placeholder.svg",
    level: 90,
    category: "webdev"
  }
];

const initialEducation: Education[] = [
  {
    id: 1,
    provider: "Coursera",
    courses: [
      { id: 1, education_id: 1, name: "Machine Learning by Stanford", link: "https://coursera.org/verify/ML12345" },
      { id: 2, education_id: 1, name: "Deep Learning Specialization", link: "https://coursera.org/verify/DL67890" }
    ]
  },
  {
    id: 2,
    provider: "Udemy",
    courses: [
      { id: 3, education_id: 2, name: "Modern React with Redux", link: "https://udemy.com/certificate/12345" },
      { id: 4, education_id: 2, name: "Complete Python Developer", link: "https://udemy.com/certificate/67890" }
    ]
  }
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch services from Supabase
        const { data: servicesData, error: servicesError } = await supabase
          .from('kiel_portfolio_services')
          .select('*');

        if (servicesError) throw new Error(`Services error: ${servicesError.message}`);
        
        // Fetch projects from Supabase
        const { data: projectsData, error: projectsError } = await supabase
          .from('kiel_portfolio_projects')
          .select('*');

        if (projectsError) throw new Error(`Projects error: ${projectsError.message}`);
        
        // Fetch skills from Supabase
        const { data: skillsData, error: skillsError } = await supabase
          .from('kiel_portfolio_skills')
          .select('*');

        if (skillsError) throw new Error(`Skills error: ${skillsError.message}`);
        
        // Fetch education from Supabase with related courses
        const { data: educationData, error: educationError } = await supabase
          .from('kiel_portfolio_education')
          .select('*');

        if (educationError) throw new Error(`Education error: ${educationError.message}`);
        
        // For each education, we need to fetch its courses
        const educationWithCourses = await Promise.all(
          educationData.map(async (edu) => {
            const { data: coursesData, error: coursesError } = await supabase
              .from('kiel_portfolio_education_courses')
              .select('*')
              .eq('education_id', edu.id);

            if (coursesError) {
              console.error(`Error fetching courses for education ${edu.id}:`, coursesError);
              return { ...edu, courses: [] };
            }

            return { ...edu, courses: coursesData };
          })
        );

        // Set the data
        setServices(servicesData);
        setProjects(projectsData);
        setSkills(skillsData);
        setEducation(educationWithCourses);
        
      } catch (error) {
        console.error('Error loading data from Supabase:', error);
        setError('Failed to load data from database. Using local data as fallback.');
        
        // Fallback to localStorage or initial data
        const savedServices = localStorage.getItem('adminServices');
        const savedProjects = localStorage.getItem('adminProjects');
        const savedSkills = localStorage.getItem('adminSkills');
        const savedEducation = localStorage.getItem('adminEducation');
        
        setServices(savedServices ? JSON.parse(savedServices) : initialServices);
        setProjects(savedProjects ? JSON.parse(savedProjects) : initialProjects);
        setSkills(savedSkills ? JSON.parse(savedSkills) : initialSkills);
        setEducation(savedEducation ? JSON.parse(savedEducation) : initialEducation);
        
        // Show toast with error
        toast({
          title: "Database Connection Failed",
          description: "Using local data as fallback. Changes won't be saved to database.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Save to localStorage whenever data changes as backup
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
  const updateService = async (updatedService: Service) => {
    try {
      // Update in Supabase
      const { error: updateError } = await supabase
        .from('kiel_portfolio_services')
        .update(updatedService)
        .eq('id', updatedService.id);
      
      if (updateError) throw new Error(updateError.message);
      
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
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update service. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteService = async (id: number) => {
    try {
      // Delete from Supabase
      const { error: deleteError } = await supabase
        .from('kiel_portfolio_services')
        .delete()
        .eq('id', id);
      
      if (deleteError) throw new Error(deleteError.message);
      
      // Update local state
      setServices(prevServices => prevServices.filter(service => service.id !== id));
      
      toast({
        title: "Service Deleted",
        description: "Service has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete service. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addService = async (newService: Omit<Service, 'id'>) => {
    try {
      // Add to Supabase
      const { data: insertedData, error: insertError } = await supabase
        .from('kiel_portfolio_services')
        .insert(newService)
        .select();
      
      if (insertError) throw new Error(insertError.message);
      if (!insertedData || insertedData.length === 0) throw new Error("No data returned after insert");
      
      // Add to local state
      const serviceToAdd = insertedData[0] as Service;
      setServices(prevServices => [...prevServices, serviceToAdd]);
      
      toast({
        title: "Service Added",
        description: `"${newService.title}" has been added successfully.`,
      });
    } catch (error) {
      console.error('Error adding service:', error);
      toast({
        title: "Add Failed",
        description: "Failed to add service. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Project operations
  const updateProject = async (updatedProject: Project) => {
    try {
      // Update in Supabase
      const { error: updateError } = await supabase
        .from('kiel_portfolio_projects')
        .update(updatedProject)
        .eq('id', updatedProject.id);
      
      if (updateError) throw new Error(updateError.message);
      
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
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteProject = async (id: number) => {
    try {
      // Delete from Supabase
      const { error: deleteError } = await supabase
        .from('kiel_portfolio_projects')
        .delete()
        .eq('id', id);
      
      if (deleteError) throw new Error(deleteError.message);
      
      // Update local state
      setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
      
      toast({
        title: "Project Deleted",
        description: "Project has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addProject = async (newProject: Omit<Project, 'id'>) => {
    try {
      // Add to Supabase
      const { data: insertedData, error: insertError } = await supabase
        .from('kiel_portfolio_projects')
        .insert(newProject)
        .select();
      
      if (insertError) throw new Error(insertError.message);
      if (!insertedData || insertedData.length === 0) throw new Error("No data returned after insert");
      
      // Add to local state
      const projectToAdd = insertedData[0] as Project;
      setProjects(prevProjects => [...prevProjects, projectToAdd]);
      
      toast({
        title: "Project Added",
        description: `"${newProject.title}" has been added successfully.`,
      });
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Add Failed",
        description: "Failed to add project. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Skill operations
  const updateSkill = async (updatedSkill: Skill) => {
    try {
      // Update in Supabase
      const { error: updateError } = await supabase
        .from('kiel_portfolio_skills')
        .update(updatedSkill)
        .eq('id', updatedSkill.id);
      
      if (updateError) throw new Error(updateError.message);
      
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
    } catch (error) {
      console.error('Error updating skill:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteSkill = async (id: number) => {
    try {
      // Delete from Supabase
      const { error: deleteError } = await supabase
        .from('kiel_portfolio_skills')
        .delete()
        .eq('id', id);
      
      if (deleteError) throw new Error(deleteError.message);
      
      // Update local state
      setSkills(prevSkills => prevSkills.filter(skill => skill.id !== id));
      
      toast({
        title: "Skill Deleted",
        description: "Skill has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addSkill = async (newSkill: Omit<Skill, 'id'>) => {
    try {
      // Add to Supabase
      const { data: insertedData, error: insertError } = await supabase
        .from('kiel_portfolio_skills')
        .insert(newSkill)
        .select();
      
      if (insertError) throw new Error(insertError.message);
      if (!insertedData || insertedData.length === 0) throw new Error("No data returned after insert");
      
      // Add to local state
      const skillToAdd = insertedData[0] as Skill;
      setSkills(prevSkills => [...prevSkills, skillToAdd]);
      
      toast({
        title: "Skill Added",
        description: `"${newSkill.name}" has been added successfully.`,
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Add Failed",
        description: "Failed to add skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Education operations
  const updateEducation = async (updatedEducation: Education) => {
    try {
      // First update the education provider
      const { error: updateError } = await supabase
        .from('kiel_portfolio_education')
        .update({ provider: updatedEducation.provider })
        .eq('id', updatedEducation.id);
      
      if (updateError) throw new Error(updateError.message);
      
      // For each course, update, insert, or delete
      const existingCoursesResponse = await supabase
        .from('kiel_portfolio_education_courses')
        .select('*')
        .eq('education_id', updatedEducation.id);
      
      if (existingCoursesResponse.error) throw new Error(existingCoursesResponse.error.message);
      
      // Get existing courses
      const existingCourses = existingCoursesResponse.data || [];
      
      // Update existing courses and add new ones
      for (const course of updatedEducation.courses) {
        if (course.id) {
          // Update existing course
          const { error } = await supabase
            .from('kiel_portfolio_education_courses')
            .update({ 
              name: course.name,
              link: course.link
            })
            .eq('id', course.id);
          
          if (error) throw new Error(`Error updating course: ${error.message}`);
        } else {
          // Add new course
          const { error } = await supabase
            .from('kiel_portfolio_education_courses')
            .insert({
              education_id: updatedEducation.id,
              name: course.name,
              link: course.link
            });
          
          if (error) throw new Error(`Error adding course: ${error.message}`);
        }
      }
      
      // Delete removed courses
      const updatedCourseIds = updatedEducation.courses
        .filter(c => c.id !== undefined)
        .map(c => c.id);
      
      const coursesToDelete = existingCourses
        .filter(c => !updatedCourseIds.includes(c.id))
        .map(c => c.id);
      
      if (coursesToDelete.length > 0) {
        const { error } = await supabase
          .from('kiel_portfolio_education_courses')
          .delete()
          .in('id', coursesToDelete);
        
        if (error) throw new Error(`Error deleting courses: ${error.message}`);
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
    } catch (error) {
      console.error('Error updating education:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update education. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteEducation = async (id: number) => {
    try {
      // Due to CASCADE constraint in Supabase, we only need to delete education
      // and related courses will be automatically deleted
      const { error: deleteError } = await supabase
        .from('kiel_portfolio_education')
        .delete()
        .eq('id', id);
      
      if (deleteError) throw new Error(deleteError.message);
      
      // Update local state
      setEducation(prevEducation => prevEducation.filter(edu => edu.id !== id));
      
      toast({
        title: "Education Provider Deleted",
        description: "Education provider has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting education:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete education. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addEducation = async (newEducation: Omit<Education, 'id'>) => {
    try {
      // First create the education provider
      const { data: insertedEducation, error: insertError } = await supabase
        .from('kiel_portfolio_education')
        .insert({ provider: newEducation.provider })
        .select();
      
      if (insertError) throw new Error(insertError.message);
      if (!insertedEducation || insertedEducation.length === 0) {
        throw new Error("No data returned after insert");
      }
      
      const educationId = insertedEducation[0].id;
      
      // Then create all courses for this education
      if (newEducation.courses.length > 0) {
        const coursesToInsert = newEducation.courses.map(course => ({
          education_id: educationId,
          name: course.name,
          link: course.link
        }));
        
        const { error: coursesError } = await supabase
          .from('kiel_portfolio_education_courses')
          .insert(coursesToInsert);
        
        if (coursesError) throw new Error(coursesError.message);
      }
      
      // Fetch the newly created education with courses
      const { data: newEduWithCourses, error: fetchError } = await supabase
        .from('kiel_portfolio_education')
        .select('*')
        .eq('id', educationId)
        .single();
      
      if (fetchError) throw new Error(fetchError.message);
      
      // Fetch related courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('kiel_portfolio_education_courses')
        .select('*')
        .eq('education_id', educationId);
      
      if (coursesError) throw new Error(coursesError.message);
      
      // Add to local state
      const completeEducation = { 
        ...newEduWithCourses, 
        courses: coursesData || [] 
      } as Education;
      
      setEducation(prev => [...prev, completeEducation]);
      
      toast({
        title: "Education Provider Added",
        description: `"${newEducation.provider}" has been added successfully.`,
      });
    } catch (error) {
      console.error('Error adding education:', error);
      toast({
        title: "Add Failed",
        description: "Failed to add education provider. Please try again.",
        variant: "destructive",
      });
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
