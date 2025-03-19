
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const allProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform with product filtering, cart functionality, and payment integration",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      demoLink: "https://example.com",
      githubLink: "https://github.com",
      tech: ["React", "Redux", "Node.js", "Express", "MongoDB"],
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      demoLink: "https://example.com",
      githubLink: "https://github.com",
      tech: ["Vue.js", "Firebase", "Tailwind CSS"],
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A weather application that displays current conditions and forecasts with interactive maps",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      demoLink: "https://example.com",
      githubLink: "https://github.com",
      tech: ["JavaScript", "Weather API", "Chart.js", "HTML/CSS"],
    },
    {
      id: 4,
      title: "Real Estate Platform",
      description: "A property listing website with advanced filtering, map integration, and booking features",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      demoLink: "https://example.com",
      githubLink: "https://github.com",
      tech: ["React", "Next.js", "Prisma", "PostgreSQL"],
    },
    {
      id: 5,
      title: "Fitness Tracking App",
      description: "A mobile-responsive application for tracking workouts, nutrition, and fitness goals",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      demoLink: "https://example.com",
      githubLink: "https://github.com",
      tech: ["React Native", "Redux", "Firebase", "Expo"],
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "A developer portfolio showcasing projects, skills, and professional experience",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      demoLink: "https://example.com",
      githubLink: "https://github.com",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
    },
  ];

  const [visibleProjects, setVisibleProjects] = useState(4);
  const showMoreProjects = () => {
    setVisibleProjects(prevVisible => Math.min(prevVisible + 2, allProjects.length));
  };

  return (
    <section id="projects" className="py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-secondary text-secondary-foreground mb-3">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills and experience in building digital products that solve real-world problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {allProjects.slice(0, visibleProjects).map((project, index) => (
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

        {visibleProjects < allProjects.length && (
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
