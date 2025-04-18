
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminData } from "./admin/AdminDataContext";

const Education = () => {
  const { education } = useAdminData();
  
  return (
    <section id="education" className="py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-secondary text-secondary-foreground mb-3">
            Learning
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm committed to lifelong learning in data science and web development. Here are some of the certifications I've earned.
          </p>
        </div>

        <div className="space-y-10">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <h3 className="text-xl font-semibold mb-6">Current Focus</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-medium">B</span>
                </div>
                <div>
                  <h4 className="font-medium">Bangkit Academy's Machine Learning Path</h4>
                  <p className="text-muted-foreground">Expanding my expertise in machine learning and data science through structured learning and practical projects.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-medium">O</span>
                </div>
                <div>
                  <h4 className="font-medium">Ongoing Advanced Courses</h4>
                  <p className="text-muted-foreground">Currently working through advanced machine learning specializations including: Machine Learning Specialization, TensorFlow Developer Professional Certificate, Deep Learning Specialization, and Generative AI courses.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((cert, index) => (
              <div 
                key={cert.id} 
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 opacity-0 animate-fade-in hover-scale"
                style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: "forwards" }}
              >
                <h3 className="text-xl font-semibold mb-3">{cert.provider}</h3>
                
                {cert.imageUrl && (
                  <div className="mb-4">
                    <img 
                      src={cert.imageUrl} 
                      alt={cert.provider} 
                      className="h-16 object-contain rounded"
                    />
                  </div>
                )}
                
                <ul className="space-y-3">
                  {cert.courses.map((course, courseIndex) => (
                    <li key={courseIndex} className="flex justify-between items-start">
                      <span className="text-sm text-muted-foreground">{course.name}</span>
                      {course.link && (
                        <Button size="sm" variant="ghost" className="p-0 h-auto" asChild>
                          <a href={course.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs">
                            <ExternalLink className="h-3 w-3" />
                            <span>Verify</span>
                          </a>
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <h3 className="text-xl font-semibold mb-6">Community Involvement</h3>
            <p className="text-muted-foreground mb-4">
              I believe in giving back to the community and sharing knowledge. I contributed to <strong>Komunitas Permata Ibu Pertiwi</strong> as a <strong>Management Creator</strong>, organizing events to promote culture and inspire resilience among youth:
            </p>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground pl-4">
              <li><strong>Rantak 2023</strong>: Promoting local culture through digital platforms.</li>
              <li><strong>Pejuang Tanggu 4</strong>: Inspiring youth through community engagement.</li>
              <li><strong>Ayo Sekolah 3.0</strong>: Encouraging education and self-development.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
