
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { useAdminData } from "./admin/AdminDataContext";

const Projects = () => {
  const { projects } = useAdminData();
  
  const [visibleProjects, setVisibleProjects] = useState(4);
  const showMoreProjects = () => {
    setVisibleProjects(prevVisible => Math.min(prevVisible + 2, projects.length));
  };

  return (
    <section id="projects" className="py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-secondary text-secondary-foreground mb-3">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Key Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills in machine learning, data science, and web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              demoLink={project.demoLink}
              githubLink={project.githubLink}
              tech={project.tech}
              index={index}
            />
          ))}
        </div>

        {visibleProjects < projects.length && (
          <div className="text-center mt-12">
            <Button 
              onClick={showMoreProjects} 
              variant="outline" 
              className="rounded-full px-6" 
              size="lg"
            >
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
