
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Tag, Star, Filter, Grid, List } from "lucide-react";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
    { id: "all", label: "All Activities", count: activities?.length || 0 },
    { id: "workshop", label: "Workshops", count: activities?.filter(a => a.category === "workshop").length || 0 },
    { id: "speaking", label: "Speaking", count: activities?.filter(a => a.category === "speaking").length || 0 },
    { id: "education", label: "Education", count: activities?.filter(a => a.category === "education").length || 0 },
    { id: "hackathon", label: "Hackathons", count: activities?.filter(a => a.category === "hackathon").length || 0 },
    { id: "community", label: "Community", count: activities?.filter(a => a.category === "community").length || 0 },
  ];

  const filteredActivities = activities?.filter(activity => 
    selectedCategory === "all" || activity.category === selectedCategory
  ) || [];

  const featuredActivities = activities?.filter(activity => activity.is_featured) || [];

  if (isLoading) {
    return (
      <section className="py-20 px-6 md:px-10 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-700 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="activities" className="py-20 px-6 md:px-10 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-purple-400" />
            <span className="inline-block py-2 px-4 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-200 border border-purple-400/30 backdrop-blur-sm">
              🚀 My Journey
            </span>
            <Star className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
            Activities & Achievements
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover my journey through workshops, conferences, and community contributions. 
            Each activity represents a step forward in innovation and knowledge sharing. ✨
          </p>
        </div>

        {/* Featured Activities Carousel */}
        {featuredActivities.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              🌟 Featured Activities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredActivities.map((activity, index) => (
                <Card
                  key={activity.id}
                  className="group relative overflow-hidden bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-lg border border-purple-500/30 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 opacity-0 animate-slide-up hover-scale"
                  style={{ 
                    animationDelay: `${index * 0.2}s`, 
                    animationFillMode: "forwards" 
                  }}
                  onMouseEnter={() => setHoveredCard(activity.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
                  
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={activity.image_url} 
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <Badge className="absolute top-4 right-4 bg-purple-600/90 text-white">
                      Featured
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                      {activity.title}
                    </h4>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
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
                      {activity.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs bg-purple-600/30 text-purple-200 border-purple-400/30"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {activity.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-gray-600/30 text-gray-300">
                          +{activity.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0"
                    : "bg-gray-800/50 text-gray-300 border-gray-600 hover:bg-gray-700/50"
                } transition-all duration-300`}
              >
                {category.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="bg-gray-800/50 text-gray-300 border-gray-600 hover:bg-gray-700/50"
            >
              {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Activities Grid/List */}
        <div className={`${
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-6"
        }`}>
          {filteredActivities.map((activity, index) => (
            <Card
              key={activity.id}
              className={`group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-blue-900/50 backdrop-blur-lg border border-blue-500/20 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 opacity-0 animate-slide-up hover-scale ${
                viewMode === "list" ? "flex flex-row" : ""
              }`}
              style={{ 
                animationDelay: `${0.1 + index * 0.1}s`, 
                animationFillMode: "forwards" 
              }}
              onMouseEnter={() => setHoveredCard(activity.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
              
              <div className={`${viewMode === "list" ? "w-1/3" : "aspect-video"} relative overflow-hidden`}>
                <img 
                  src={activity.image_url} 
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                {activity.is_featured && (
                  <Badge className="absolute top-4 right-4 bg-yellow-600/90 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <Badge className={`absolute top-4 left-4 bg-${getCategoryColor(activity.category)}/90 text-white capitalize`}>
                  {activity.category}
                </Badge>
              </div>

              <CardContent className={`${viewMode === "list" ? "flex-1" : ""} p-6`}>
                <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                  {activity.title}
                </h4>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {activity.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
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
                  {activity.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="text-xs bg-blue-600/30 text-blue-200 border-blue-400/30"
                    >
                      <Tag className="w-2 h-2 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No activities found</h3>
            <p className="text-gray-500">Try selecting a different category or view all activities.</p>
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-xl bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-purple-400/30">
            <div className="text-3xl font-bold text-white mb-2">{activities?.length || 0}</div>
            <div className="text-gray-300 text-sm">Total Activities</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30">
            <div className="text-3xl font-bold text-white mb-2">{featuredActivities.length}</div>
            <div className="text-gray-300 text-sm">Featured</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-cyan-400/30">
            <div className="text-3xl font-bold text-white mb-2">{categories.filter(c => c.id !== "all").length}</div>
            <div className="text-gray-300 text-sm">Categories</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-400/30">
            <div className="text-3xl font-bold text-white mb-2">
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
