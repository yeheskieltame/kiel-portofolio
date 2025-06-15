
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Tag, Star, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { format } from "date-fns";

type Activity = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  activity_date: string;
  location: string | null;
  category: string;
  tags: string[];
  is_featured: boolean;
};

const Activities = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: activities, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("kiel_portfolio_activities")
        .select("*")
        .order("activity_date", { ascending: false });
      
      if (error) throw error;
      return data as Activity[];
    },
  });

  const categories = [
    { id: "all", label: "All" },
    { id: "workshop", label: "Workshops" },
    { id: "speaking", label: "Speaking" },
    { id: "education", label: "Education" },
    { id: "hackathon", label: "Hackathons" },
    { id: "community", label: "Community" },
  ];

  const filteredActivities = activities?.filter(activity => 
    selectedCategory === "all" || activity.category === selectedCategory
  ) || [];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(filteredActivities.length / itemsPerSlide);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (isLoading) {
    return (
      <section className="py-16 px-6 md:px-10 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const getCurrentSlideItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return filteredActivities.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <section id="activities" className="py-16 px-6 md:px-10 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Compact Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="inline-block py-2 px-4 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-200 border border-purple-400/30 backdrop-blur-sm">
              🚀 Journey Gallery
            </span>
            <Star className="w-4 h-4 text-purple-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
            Activities & Achievements
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Auto-rotating showcase of workshops, conferences, and community contributions ✨
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentSlide(0);
              }}
              className={`${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0"
                  : "bg-gray-800/50 text-gray-300 border-gray-600 hover:bg-gray-700/50"
              } transition-all duration-300 text-xs`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={totalSlides <= 1}
            className="bg-gray-800/50 text-gray-300 border-gray-600 hover:bg-gray-700/50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">
              {currentSlide + 1} / {totalSlides}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAutoPlay}
              className="bg-gray-800/50 text-gray-300 border-gray-600 hover:bg-gray-700/50"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={totalSlides <= 1}
            className="bg-gray-800/50 text-gray-300 border-gray-600 hover:bg-gray-700/50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Auto-rotating Gallery */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                    {filteredActivities
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((activity, index) => (
                      <Card
                        key={activity.id}
                        className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-blue-900/50 backdrop-blur-lg border border-blue-500/20 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover-scale"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
                        
                        <div className="aspect-video relative overflow-hidden">
                          <img 
                            src={activity.image_url} 
                            alt={activity.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          {activity.is_featured && (
                            <Badge className="absolute top-3 right-3 bg-yellow-600/90 text-white text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          <Badge className={`absolute top-3 left-3 bg-${getCategoryColor(activity.category)}/90 text-white capitalize text-xs`}>
                            {activity.category}
                          </Badge>
                        </div>

                        <CardContent className="p-4">
                          <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mb-2 line-clamp-2">
                            {activity.title}
                          </h4>
                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                            {activity.description}
                          </p>
                          
                          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{format(new Date(activity.activity_date), "MMM dd, yyyy")}</span>
                            </div>
                            {activity.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span className="truncate">{activity.location}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {activity.tags.slice(0, 2).map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="secondary"
                                className="text-xs bg-blue-600/30 text-blue-200 border-blue-400/30"
                              >
                                <Tag className="w-2 h-2 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                            {activity.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs bg-gray-600/30 text-gray-300">
                                +{activity.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-purple-400 w-6" 
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-purple-400/30">
            <div className="text-2xl font-bold text-white mb-1">{activities?.length || 0}</div>
            <div className="text-gray-300 text-sm">Total Activities</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30">
            <div className="text-2xl font-bold text-white mb-1">{activities?.filter(a => a.is_featured).length || 0}</div>
            <div className="text-gray-300 text-sm">Featured</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-cyan-400/30">
            <div className="text-2xl font-bold text-white mb-1">{categories.filter(c => c.id !== "all").length}</div>
            <div className="text-gray-300 text-sm">Categories</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-400/30">
            <div className="text-2xl font-bold text-white mb-1">
              {activities?.reduce((total, activity) => total + activity.tags.length, 0) || 0}
            </div>
            <div className="text-gray-300 text-sm">Total Tags</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to get category color
const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    workshop: "blue-600",
    speaking: "purple-600",
    education: "green-600",
    hackathon: "red-600",
    community: "yellow-600",
    training: "indigo-600",
    competition: "pink-600",
    development: "cyan-600",
  };
  return colors[category] || "gray-600";
};

export default Activities;
