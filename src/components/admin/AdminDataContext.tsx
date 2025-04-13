
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  PortfolioService, 
  PortfolioProject, 
  PortfolioSkill, 
  PortfolioEducation,
  PortfolioEducationCourse 
} from '@/types/portfolio-types';

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

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch services
        const { data: servicesData, error: servicesError } = await supabase
          .from('kiel_portfolio_services')
          .select('*');
          
        if (servicesError) throw servicesError;
        
        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('kiel_portfolio_projects')
          .select('*');
          
        if (projectsError) throw projectsError;
        
        // Fetch skills
        const { data: skillsData, error: skillsError } = await supabase
          .from('kiel_portfolio_skills')
          .select('*');
          
        if (skillsError) throw skillsError;
        
        // Fetch education with courses
        const { data: educationData, error: educationError } = await supabase
          .from('kiel_portfolio_education')
          .select('*');
          
        if (educationError) throw educationError;
        
        // Fetch courses for each education
        const educationWithCourses = await Promise.all(
          educationData.map(async (edu) => {
            const { data: coursesData, error: coursesError } = await supabase
              .from('kiel_portfolio_education_courses')
              .select('*')
              .eq('education_id', edu.id);
              
            if (coursesError) throw coursesError;
            
            return {
              ...edu,
              courses: coursesData
            };
          })
        );
        
        setServices(servicesData || []);
        setProjects(projectsData || []);
        setSkills(skillsData || []);
        setEducation(educationWithCourses);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data from database');
        // Fall back to local storage if database fails
        loadFromLocalStorage();
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Fallback to local storage if database fetch fails
  const loadFromLocalStorage = () => {
    const savedServices = localStorage.getItem('adminServices');
    if (savedServices) setServices(JSON.parse(savedServices));
    
    const savedProjects = localStorage.getItem('adminProjects');
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    
    const savedSkills = localStorage.getItem('adminSkills');
    if (savedSkills) setSkills(JSON.parse(savedSkills));
    
    const savedEducation = localStorage.getItem('adminEducation');
    if (savedEducation) setEducation(JSON.parse(savedEducation));
  };

  // Save to localStorage whenever data changes as a backup
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
      const { error } = await supabase
        .from('kiel_portfolio_services')
        .update(updatedService)
        .eq('id', updatedService.id);
        
      if (error) throw error;
      
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
      const { error } = await supabase
        .from('kiel_portfolio_services')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
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
      const { data, error } = await supabase
        .from('kiel_portfolio_services')
        .insert(newService)
        .select();
        
      if (error) throw error;
      if (!data || data.length === 0) throw new Error('No data returned');
      
      const addedService = data[0] as Service;
      setServices(prevServices => [...prevServices, addedService]);
      
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
      
      // Fallback to client-side ID generation for UI
      const id = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
      setServices(prevServices => [...prevServices, { ...newService, id } as Service]);
    }
  };

  // Project operations
  const updateProject = async (updatedProject: Project) => {
    try {
      const { error } = await supabase
        .from('kiel_portfolio_projects')
        .update(updatedProject)
        .eq('id', updatedProject.id);
        
      if (error) throw error;
      
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
      const { error } = await supabase
        .from('kiel_portfolio_projects')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
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
      const { data, error } = await supabase
        .from('kiel_portfolio_projects')
        .insert(newProject)
        .select();
        
      if (error) throw error;
      if (!data || data.length === 0) throw new Error('No data returned');
      
      const addedProject = data[0] as Project;
      setProjects(prevProjects => [...prevProjects, addedProject]);
      
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
      
      // Fallback to client-side ID generation for UI
      const id = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
      setProjects(prevProjects => [...prevProjects, { ...newProject, id } as Project]);
    }
  };

  // Skill operations
  const updateSkill = async (updatedSkill: Skill) => {
    try {
      const { error } = await supabase
        .from('kiel_portfolio_skills')
        .update(updatedSkill)
        .eq('id', updatedSkill.id);
        
      if (error) throw error;
      
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
      const { error } = await supabase
        .from('kiel_portfolio_skills')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
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
      const { data, error } = await supabase
        .from('kiel_portfolio_skills')
        .insert(newSkill)
        .select();
        
      if (error) throw error;
      if (!data || data.length === 0) throw new Error('No data returned');
      
      const addedSkill = data[0] as Skill;
      setSkills(prevSkills => [...prevSkills, addedSkill]);
      
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
      
      // Fallback to client-side ID generation for UI
      const id = skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1;
      setSkills(prevSkills => [...prevSkills, { ...newSkill, id } as Skill]);
    }
  };

  // Education operations
  const updateEducation = async (updatedEducation: Education) => {
    try {
      // First update the education provider
      const { error: eduError } = await supabase
        .from('kiel_portfolio_education')
        .update({ provider: updatedEducation.provider })
        .eq('id', updatedEducation.id);
        
      if (eduError) throw eduError;
      
      // Delete existing courses
      const { error: deleteError } = await supabase
        .from('kiel_portfolio_education_courses')
        .delete()
        .eq('education_id', updatedEducation.id);
        
      if (deleteError) throw deleteError;
      
      // Add updated courses
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
      // Delete education will cascade delete courses due to foreign key constraint
      const { error } = await supabase
        .from('kiel_portfolio_education')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
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
      // First insert education provider
      const { data: eduData, error: eduError } = await supabase
        .from('kiel_portfolio_education')
        .insert({ provider: newEducation.provider })
        .select();
        
      if (eduError) throw eduError;
      if (!eduData || eduData.length === 0) throw new Error('No education data returned');
      
      const educationId = eduData[0].id;
      
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
      
      // Add new education to state with ID
      const addedEducation = { 
        ...newEducation, 
        id: educationId 
      } as Education;
      
      setEducation(prevEducation => [...prevEducation, addedEducation]);
      
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
      
      // Fallback to client-side ID generation for UI
      const id = education.length > 0 ? Math.max(...education.map(e => e.id)) + 1 : 1;
      setEducation(prevEducation => [...prevEducation, { ...newEducation, id } as Education]);
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
