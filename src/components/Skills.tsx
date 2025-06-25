
import SkillCard from "./SkillCard";
import { useAdminData } from "./admin/AdminDataContext";
import { Brain, Code, Globe } from "lucide-react";

const Skills = () => {
  const { skills, isLoading } = useAdminData();

  if (isLoading) {
    return (
      <section id="skills" className="py-16 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(120,119,198,0.05)_25%,rgba(120,119,198,0.05)_26%,transparent_27%,transparent_74%,rgba(120,119,198,0.05)_75%,rgba(120,119,198,0.05)_76%,transparent_77%)] bg-[length:60px_60px] animate-pulse-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
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
      title: "Programming",
      icon: Code,
      skills: programmingSkills,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400"
    },
    {
      title: "ML & AI",
      icon: Brain,
      skills: mlSkills,
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    },
    {
      title: "Web Dev",
      icon: Globe,
      skills: webDevSkills,
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400"
    }
  ];

  return (
    <section id="skills" className="py-16 px-6 md:px-10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(120,119,198,0.05)_25%,rgba(120,119,198,0.05)_26%,transparent_27%,transparent_74%,rgba(120,119,198,0.05)_75%,rgba(120,119,198,0.05)_76%,transparent_77%)] bg-[length:60px_60px] animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Compact Header */}
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-4">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300 text-sm font-medium">Tech Stack</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-base leading-relaxed">
            Comprehensive expertise in{" "}
            <span className="text-purple-400 font-semibold">blockchain</span>,{" "}
            <span className="text-blue-400 font-semibold">AI</span>, and{" "}
            <span className="text-cyan-400 font-semibold">web technologies</span>
          </p>
        </div>

        {/* Compact Skills Grid - 3 columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.2 + categoryIndex * 0.1}s`, animationFillMode: "forwards" }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-xl bg-gradient-to-r ${category.gradient} border border-white/10`}>
                  <category.icon className={`h-5 w-5 ${category.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-white">{category.title}</h3>
              </div>

              {/* Compact Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, index) => (
                  <SkillCard
                    key={skill.id}
                    name={skill.name}
                    icon={skill.icon}
                    level={skill.level}
                    index={index + categoryIndex * 10}
                    compact={true}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Compact Bottom CTA */}
        <div className="text-center mt-12 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:scale-105 transition-transform cursor-pointer border border-white/10">
            <span>View Projects</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
