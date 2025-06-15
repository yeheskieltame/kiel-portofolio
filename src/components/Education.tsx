
import { ExternalLink, Award, BookOpen, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminData } from "./admin/AdminDataContext";

const Education = () => {
  const { education } = useAdminData();
  
  return (
    <section id="education" className="py-20 px-6 md:px-10 relative overflow-hidden">
      {/* Animated Background - moved to back with reduced opacity */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.15),transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.15),transparent_50%)] animate-pulse-slow" style={{ animationDelay: "1.5s" }}></div>
        
        {/* Floating Elements - moved to back with reduced opacity */}
        <div className="absolute top-16 left-16 w-16 h-16 border border-blue-500/20 rotate-12 animate-float"></div>
        <div className="absolute top-32 right-24 w-12 h-12 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-24 left-1/3 w-8 h-8 border-2 border-cyan-500/20 animate-rotate-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">Learning Journey</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Education & Certifications
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Committed to lifelong learning in{" "}
            <span className="text-blue-400 font-semibold">blockchain technology</span>,{" "}
            <span className="text-purple-400 font-semibold">artificial intelligence</span>, and{" "}
            <span className="text-cyan-400 font-semibold">cutting-edge development</span>
          </p>
        </div>

        <div className="space-y-12">
          {/* Current Focus Section */}
          <div className="relative group opacity-0 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            {/* Background glow moved to back with reduced opacity */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 hover:border-purple-500/30 transition-all duration-500">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/20">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Current Focus</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                  <span className="text-green-400 text-xs font-medium">Active Learning</span>
                </div>
              </div>

              {/* Learning Items */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group/item p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30">
                      <span className="font-bold text-purple-300">B</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 group-hover/item:text-purple-200 transition-colors">
                        Bangkit Academy's Machine Learning Path
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Expanding expertise in machine learning and data science through structured learning and practical projects.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group/item p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                      <span className="font-bold text-blue-300">A</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 group-hover/item:text-blue-200 transition-colors">
                        Advanced Specializations
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        TensorFlow Developer, Deep Learning Specialization, and Generative AI courses for cutting-edge skills.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((cert, index) => (
              <div 
                key={cert.id} 
                className="group relative opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: "forwards" }}
              >
                {/* Background Glow - moved to back with reduced opacity */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 hover:border-blue-500/30 transition-all duration-500 hover:scale-105">
                  {/* Provider Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {cert.image_url && (
                        <div className="p-2 rounded-xl bg-white/10 border border-white/20">
                          <img 
                            src={cert.image_url} 
                            alt={cert.provider} 
                            className="h-10 w-10 object-contain rounded"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                        {cert.provider}
                      </h3>
                    </div>
                    
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20">
                      <Award className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                  
                  {/* Courses List */}
                  <div className="space-y-3">
                    {cert.courses.map((course, courseIndex) => (
                      <div 
                        key={courseIndex} 
                        className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group/course"
                      >
                        <span className="text-gray-300 text-sm font-medium group-hover/course:text-white transition-colors">
                          {course.name}
                        </span>
                        {course.link && (
                          <Button size="sm" variant="ghost" className="p-0 h-auto hover:bg-blue-500/20" asChild>
                            <a href={course.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                              <ExternalLink className="h-3 w-3" />
                              <span>Verify</span>
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Community Section */}
          <div className="relative group opacity-0 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            {/* Background glow moved to back with reduced opacity */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 hover:border-green-500/30 transition-all duration-500">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-white/20">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Community Involvement</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-green-500/50 to-transparent"></div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                I believe in giving back to the community and sharing knowledge. I contributed to{" "}
                <span className="text-green-400 font-semibold">Komunitas Permata Ibu Pertiwi</span> as a{" "}
                <span className="text-cyan-400 font-semibold">Management Creator</span>, organizing events to promote culture and inspire resilience among youth:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: "Rantak 2023", desc: "Promoting local culture through digital platforms" },
                  { name: "Pejuang Tanggu 4", desc: "Inspiring youth through community engagement" },
                  { name: "Ayo Sekolah 3.0", desc: "Encouraging education and self-development" }
                ].map((event, index) => (
                  <div key={event.name} className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-white/10 hover:border-green-500/30 transition-all duration-300">
                    <h4 className="font-semibold text-white mb-2">{event.name}</h4>
                    <p className="text-gray-400 text-sm">{event.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
