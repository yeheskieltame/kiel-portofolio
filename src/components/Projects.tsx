
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const allProjects = [
    {
      id: 1,
      title: "Bike Rental Data Analysis",
      description: "Analyzed bike rental patterns using Python libraries to identify trends and predict future demand.",
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284",
      demoLink: "https://github.com/yeheskieltame/Project-Data-Analist.git",
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
      description: "Developed a modern and responsive portfolio website showcasing my projects with a sleek dark RGB theme.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      demoLink: "https://github.com/yeheskieltame",
      githubLink: "https://github.com/yeheskieltame",
      tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
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
            Key Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills in machine learning, data science, and web development.
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
