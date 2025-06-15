
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BookOpen, Calendar, Sparkles, ArrowRight, FileText } from "lucide-react";

const Articles = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      title: "ReportChain: Revolutionizing Institutional Reporting Through Blockchain Technology",
      description: "Exploring how blockchain technology can transform institutional reporting processes, bringing transparency, immutability, and efficiency to traditional reporting systems.",
      url: "https://www.linkedin.com/pulse/reportchain-revolutionizing-institutional-reporting-yunus-tame-rkfmc",
      publishDate: "2024",
      readTime: "5 min read",
      category: "Blockchain",
      tags: ["Blockchain", "Innovation", "Technology", "Reporting"]
    },
    {
      id: 2,
      title: "5 Ways To Adaptability",
      description: "Discover practical strategies and approaches to develop adaptability in our rapidly changing world. Learn how to thrive in uncertainty and embrace change as an opportunity.",
      url: "https://www.linkedin.com/pulse/5-ways-adaptability-yeheskiel-yunus-tame-nqgxc",
      publishDate: "2024",
      readTime: "4 min read",
      category: "Personal Development",
      tags: ["Adaptability", "Growth", "Leadership", "Mindset"]
    }
  ];

  return (
    <section id="articles" className="py-20 px-6 md:px-10 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 right-20 animate-float">
        <div className="p-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30">
          <BookOpen className="w-5 h-5 text-blue-400" />
        </div>
      </div>
      <div className="absolute bottom-32 left-16 animate-float" style={{animationDelay: "1s"}}>
        <div className="p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30">
          <FileText className="w-5 h-5 text-purple-400" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="inline-block py-2 px-4 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border border-blue-400/30 backdrop-blur-sm">
              📝 Knowledge Sharing
            </span>
            <BookOpen className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
            Featured Articles
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Exploring the intersection of technology, innovation, and human potential. 
            Dive into insights on blockchain, personal development, and emerging trends. 📚
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {articles.map((article, index) => (
            <Card
              key={article.id}
              className={`group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-blue-900/50 backdrop-blur-lg border border-blue-500/20 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 opacity-0 animate-slide-up hover-scale`}
              style={{ 
                animationDelay: `${0.1 + index * 0.2}s`, 
                animationFillMode: "forwards" 
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
              
              <CardHeader className="relative">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-sm border border-blue-400/30">
                    <Sparkles className="w-3 h-3 text-blue-200" />
                    <span className="text-xs font-medium text-blue-100">
                      {article.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{article.publishDate}</span>
                  </div>
                </div>

                <CardTitle className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">
                  {article.title}
                </CardTitle>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                  <span>{article.readTime}</span>
                </div>
              </CardHeader>

              <CardContent className="relative">
                <CardDescription className="text-gray-300 mb-6 leading-relaxed">
                  {article.description}
                </CardDescription>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border border-blue-400/30 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 3 && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-600/30 to-gray-700/30 text-gray-300 border border-gray-500/30">
                      +{article.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Read Article Button */}
                <Button 
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/25" 
                  asChild
                >
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-2"
                  >
                    <span>Read Article</span>
                    <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${hoveredIndex === index ? 'translate-x-1' : ''}`} />
                  </a>
                </Button>
              </CardContent>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-lg transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-blue-600/5 via-cyan-600/5 to-purple-600/5 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`} />
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to Read More? 📖
            </h3>
            <p className="text-gray-300 mb-6">
              Follow me on LinkedIn for more insights on technology, innovation, and personal development.
            </p>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 rounded-xl px-8 py-3 text-lg font-semibold"
              asChild
            >
              <a 
                href="https://www.linkedin.com/in/yeheskiel-yunus-tame/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Follow on LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;
