
import SkillCard from "./SkillCard";
import { useAdminData } from "./admin/AdminDataContext";
import { Skeleton } from "@/components/ui/skeleton";

const Skills = () => {
  const { skills, isLoading } = useAdminData();

  // Create skeleton arrays for loading state
  const skeletonSmall = Array(6).fill(0);
  const skeletonMedium = Array(6).fill(0);
  const skeletonLarge = Array(6).fill(0);

  // Group skills by category
  const programmingSkills = skills.filter(skill => skill.category === 'programming');
  const mlSkills = skills.filter(skill => skill.category === 'ml');
  const webDevSkills = skills.filter(skill => skill.category === 'webdev');

  const renderSkeletonCards = (array: any[], startIndex: number = 0) => (
    array.map((_, index) => (
      <div key={`skeleton-${startIndex + index}`} className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="w-full h-1 rounded-full" />
          </div>
        </div>
      </div>
    ))
  );

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
              {isLoading 
                ? renderSkeletonCards(skeletonSmall) 
                : programmingSkills.map((skill, index) => (
                    <SkillCard
                      key={skill.id}
                      name={skill.name}
                      icon={skill.icon}
                      level={skill.level}
                      index={index}
                    />
                  ))
              }
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-6">Machine Learning & Data Science</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading 
                ? renderSkeletonCards(skeletonMedium, skeletonSmall.length) 
                : mlSkills.map((skill, index) => (
                    <SkillCard
                      key={skill.id}
                      name={skill.name}
                      icon={skill.icon}
                      level={skill.level}
                      index={index + programmingSkills.length}
                    />
                  ))
              }
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-6">Web Development & Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading 
                ? renderSkeletonCards(skeletonLarge, skeletonSmall.length + skeletonMedium.length) 
                : webDevSkills.map((skill, index) => (
                    <SkillCard
                      key={skill.id}
                      name={skill.name}
                      icon={skill.icon}
                      level={skill.level}
                      index={index + programmingSkills.length + mlSkills.length}
                    />
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
