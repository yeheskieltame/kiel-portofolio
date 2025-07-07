
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ServiceRequestDialog from "./ServiceRequestDialog";
import { useAdminData } from "./admin/AdminDataContext";
import { MessageCircle, Megaphone, Globe, Brain, Blocks, Zap, Sparkles, ArrowRight, Star } from "lucide-react";

const Services = () => {
  const { services, isLoading } = useAdminData();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  // Modern service configurations based on your actual offerings
  const modernServices = [
    {
      id: 1,
      title: "🤖 Chatbot Development",
      description: "Custom AI-powered chatbots for business automation, customer service, and engagement across Telegram, WhatsApp, and web platforms with NLP capabilities.",
      icon: MessageCircle,
      category: "AI & Automation",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Natural Language Processing", "Multi-platform Integration", "Business Automation", "Custom AI Training"],
      pricing: "Starting from $800"
    },
    {
      id: 2,
      title: "📱 Social Media ADS Management",
      description: "Comprehensive advertising services across all social media platforms including WhatsApp, Instagram, Facebook, and TikTok with targeted campaigns.",
      icon: Megaphone,
      category: "Digital Marketing",
      gradient: "from-pink-500 to-rose-500",
      features: ["Multi-Platform Campaigns", "Targeted Advertising", "Performance Analytics", "ROI Optimization"],
      pricing: "Starting from $500"
    },
    {
      id: 3,
      title: "🌐 Website Development",
      description: "Modern, responsive websites for companies, institutions, and portfolios using cutting-edge technologies and best practices.",
      icon: Globe,
      category: "Web Development",
      gradient: "from-green-500 to-emerald-500",
      features: ["Responsive Design", "Modern Technologies", "SEO Optimized", "Performance Focused"],
      pricing: "Starting from $1,200"
    },
    {
      id: 4,
      title: "🧠 AI Model Development",
      description: "Custom AI solutions including deep learning and machine learning models for business intelligence, automation, and data analysis.",
      icon: Brain,
      category: "Artificial Intelligence",
      gradient: "from-purple-500 to-violet-500",
      features: ["Deep Learning", "Machine Learning", "Custom Training", "Data Analysis"],
      pricing: "Starting from $1,500"
    },
    {
      id: 5,
      title: "⛓️ Blockchain DApp Development",
      description: "Decentralized applications and smart contracts development for Web3 solutions, including identity management and protocol development.",
      icon: Blocks,
      category: "Blockchain & Web3",
      gradient: "from-orange-500 to-red-500",
      features: ["Smart Contracts", "Web3 Integration", "DeFi Solutions", "Protocol Development"],
      pricing: "Starting from $2,000"
    },
    {
      id: 6,
      title: "⚡ Business Automation",
      description: "Streamline your business processes with custom automation solutions, workflow optimization, and integration services.",
      icon: Zap,
      category: "Automation",
      gradient: "from-yellow-500 to-orange-500",
      features: ["Workflow Automation", "Process Optimization", "System Integration", "Custom Solutions"],
      pricing: "Starting from $600"
    }
  ];

  if (isLoading) {
    return (
      <section id="services" className="py-20 px-6 md:px-10 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 px-6 md:px-10 relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/50"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span className="inline-block py-2 px-6 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200/50 shadow-sm">
              ✨ Professional Services
            </span>
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800">
            Transform Your Vision
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From AI-powered chatbots to blockchain DApps, I deliver cutting-edge solutions 
            that drive innovation and accelerate your digital transformation journey. 🚀
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {modernServices.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <Card 
                key={service.id}
                className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 bg-white/80 backdrop-blur-sm cursor-pointer opacity-0 animate-slide-up`}
                style={{ 
                  animationDelay: `${0.1 + index * 0.1}s`, 
                  animationFillMode: "forwards"
                }}
                onClick={() => handleServiceClick({
                  id: service.id,
                  title: service.title,
                  description: service.description
                })}
              >
                {/* Gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500 -z-10`}></div>
                <div className="absolute inset-[1px] bg-white rounded-xl z-0"></div>
                
                <CardHeader className="relative z-10 pb-4">
                  {/* Icon and Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <Badge 
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 border-gray-200 text-xs font-medium"
                    >
                      {service.category}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors mb-3">
                    {service.title}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10 pt-0">
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.features.map((feature: string, featureIndex: number) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`}></div>
                        <span className="text-xs text-gray-600 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pricing and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 font-medium">Investment</span>
                      <span className={`text-lg font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                        {service.pricing}
                      </span>
                    </div>
                    
                    <Button 
                      className={`bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white border-0 rounded-xl px-6 py-2 font-semibold shadow-lg group-hover:scale-105 transition-all duration-300`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick({
                          id: service.id,
                          title: service.title,
                          description: service.description
                        });
                      }}
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 backdrop-blur-sm border border-blue-200/30 shadow-xl">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Ready to Innovation? 🚀
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's discuss your project and create something extraordinary together. 
                From concept to deployment, I'll guide you through every step.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <a href="#contact" className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Start Conversation
                  </a>
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300"
                  asChild
                >
                  <a href="#projects" className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    View Portfolio
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServiceRequestDialog 
        service={selectedService}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </section>
  );
};

export default Services;
