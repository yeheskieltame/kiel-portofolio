
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { useAdminData } from "./admin/AdminDataContext";
import { Sparkles, Rocket, Code, Database } from "lucide-react";

const Projects = () => {
  const { projects, isLoading } = useAdminData();
  
  const [visibleProjects, setVisibleProjects] = useState(4);
  const showMoreProjects = () => {
    setVisibleProjects(prevVisible => Math.min(prevVisible + 2, projects.length));
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-20 px-6 md:px-10 bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-32 mx-auto mb-4"></div>
            <div className="h-12 bg-gray-700 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-700 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-6 md:px-10 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 right-20 animate-float">
        <div className="p-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30">
          <Code className="w-5 h-5 text-blue-400" />
        </div>
      </div>
      <div className="absolute bottom-32 left-16 animate-float" style={{animationDelay: "1s"}}>
        <div className="p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30">
          <Database className="w-5 h-5 text-purple-400" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Rocket className="w-5 h-5 text-purple-400" />
            <span className="inline-block py-2 px-4 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-200 border border-purple-400/30 backdrop-blur-sm">
              🚀 My Portfolio
            </span>
            <Rocket className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore my latest creations in blockchain, AI, and web development. 
            Each project represents innovation, creativity, and technical excellence. ✨
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-xl px-8 py-3 text-lg font-semibold shadow-lg shadow-purple-500/25" 
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Load More Projects
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-purple-400/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Have a Project in Mind? 💡
            </h3>
            <p className="text-gray-300 mb-6">
              Let's collaborate and create something amazing together!
            </p>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-xl px-8 py-3 text-lg font-semibold"
              asChild
            >
              <a href="#contact">Let's Build It 🚀</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
