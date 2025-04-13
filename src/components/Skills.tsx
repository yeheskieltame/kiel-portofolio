
import SkillCard from "./SkillCard";
import { useAdminData } from "./admin/AdminDataContext";

const Skills = () => {
  const { skills, isLoading } = useAdminData();

  if (isLoading) {
    return (
      <section id="skills" className="py-20 px-6 md:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p>Loading skills...</p>
        </div>
      </section>
    );
  }

  // Group skills by category
  const programmingSkills = skills.filter(skill => skill.category === 'programming');
  const mlSkills = skills.filter(skill => skill.category === 'ml');
  const webDevSkills = skills.filter(skill => skill.category === 'webdev');

  return (
    <section id="skills" className="py-20 px-6 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-secondary text-secondary-foreground mb-3">
            Tech Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills in machine learning, data science, and web development that I've developed over the years.
          </p>
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="text-xl font-medium mb-6">Programming Languages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programmingSkills.map((skill, index) => (
                <SkillCard
                  key={skill.id}
                  name={skill.name}
                  icon={skill.icon}
                  level={skill.level}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-6">Machine Learning & Data Science</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mlSkills.map((skill, index) => (
                <SkillCard
                  key={skill.id}
                  name={skill.name}
                  icon={skill.icon}
                  level={skill.level}
                  index={index + programmingSkills.length}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-6">Web Development & Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webDevSkills.map((skill, index) => (
                <SkillCard
                  key={skill.id}
                  name={skill.name}
                  icon={skill.icon}
                  level={skill.level}
                  index={index + programmingSkills.length + mlSkills.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
