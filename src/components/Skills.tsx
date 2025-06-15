
import SkillCard from "./SkillCard";
import { useAdminData } from "./admin/AdminDataContext";
import { Brain, Code, Globe } from "lucide-react";

const Skills = () => {
  const { skills, isLoading } = useAdminData();

  if (isLoading) {
    return (
      <section id="skills" className="py-20 px-6 md:px-10 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(120,119,198,0.05)_25%,rgba(120,119,198,0.05)_26%,transparent_27%,transparent_74%,rgba(120,119,198,0.05)_75%,rgba(120,119,198,0.05)_76%,transparent_77%)] bg-[length:60px_60px] animate-pulse-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-8">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300 text-sm font-medium">Loading Tech Stack...</span>
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-gradient-to-r from-purple-500/20 to-transparent rounded animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Group skills by category
  const programmingSkills = skills.filter(skill => skill.category === 'programming');
  const mlSkills = skills.filter(skill => skill.category === 'ml');
  const webDevSkills = skills.filter(skill => skill.category === 'webdev');

  const categories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: programmingSkills,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400"
    },
    {
      title: "Machine Learning & AI",
      icon: Brain,
      skills: mlSkills,
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    },
    {
      title: "Web Development & Tools",
      icon: Globe,
      skills: webDevSkills,
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400"
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 md:px-10 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(120,119,198,0.05)_25%,rgba(120,119,198,0.05)_26%,transparent_27%,transparent_74%,rgba(120,119,198,0.05)_75%,rgba(120,119,198,0.05)_76%,transparent_77%)] bg-[length:60px_60px] animate-pulse-slow"></div>
        
        {/* Floating Geometric Shapes with subtle animation */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-purple-500/20 rotate-45 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-cyan-500/20 animate-rotate-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300 text-sm font-medium">Tech Stack</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            A comprehensive overview of my technical expertise in{" "}
            <span className="text-purple-400 font-semibold">blockchain development</span>,{" "}
            <span className="text-blue-400 font-semibold">artificial intelligence</span>, and{" "}
            <span className="text-cyan-400 font-semibold">web technologies</span>
          </p>
        </div>

        {/* Skills Categories */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.2 + categoryIndex * 0.1}s`, animationFillMode: "forwards" }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.gradient} border border-white/10 hover:border-white/20 transition-all duration-300`}>
                  <category.icon className={`h-6 w-6 ${category.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, index) => (
                  <SkillCard
                    key={skill.id}
                    name={skill.name}
                    icon={skill.icon}
                    level={skill.level}
                    index={index + categoryIndex * 10}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:scale-105 transition-transform cursor-pointer border border-white/10">
            <span>Explore My Projects</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
