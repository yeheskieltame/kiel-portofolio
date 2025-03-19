
import SkillCard from "./SkillCard";

const Skills = () => {
  const frontendSkills = [
    {
      name: "React",
      icon: "/placeholder.svg",
      level: 90,
    },
    {
      name: "JavaScript",
      icon: "/placeholder.svg",
      level: 85,
    },
    {
      name: "TypeScript",
      icon: "/placeholder.svg",
      level: 80,
    },
    {
      name: "HTML & CSS",
      icon: "/placeholder.svg",
      level: 95,
    },
    {
      name: "Tailwind CSS",
      icon: "/placeholder.svg",
      level: 90,
    },
    {
      name: "Next.js",
      icon: "/placeholder.svg",
      level: 85,
    },
  ];

  const backendSkills = [
    {
      name: "Node.js",
      icon: "/placeholder.svg",
      level: 75,
    },
    {
      name: "Express",
      icon: "/placeholder.svg",
      level: 80,
    },
    {
      name: "MongoDB",
      icon: "/placeholder.svg",
      level: 70,
    },
    {
      name: "PostgreSQL",
      icon: "/placeholder.svg",
      level: 65,
    },
    {
      name: "Firebase",
      icon: "/placeholder.svg",
      level: 75,
    },
    {
      name: "GraphQL",
      icon: "/placeholder.svg",
      level: 60,
    },
  ];

  const otherSkills = [
    {
      name: "Git & GitHub",
      icon: "/placeholder.svg",
      level: 85,
    },
    {
      name: "UI/UX Design",
      icon: "/placeholder.svg",
      level: 75,
    },
    {
      name: "Testing",
      icon: "/placeholder.svg",
      level: 70,
    },
    {
      name: "CI/CD",
      icon: "/placeholder.svg",
      level: 65,
    },
  ];

  return (
    <section id="skills" className="py-20 px-6 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-secondary text-secondary-foreground mb-3">
            Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of expertise that I've developed over the years.
          </p>
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="text-xl font-medium mb-6">Frontend Development</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {frontendSkills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  level={skill.level}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-6">Backend Development</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {backendSkills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  level={skill.level}
                  index={index + frontendSkills.length}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-6">Other Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherSkills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  level={skill.level}
                  index={index + frontendSkills.length + backendSkills.length}
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
