
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceRequestDialog } from "./ServiceRequestDialog";
import { useAdminData } from "./admin/AdminDataContext";
import { Blocks, BrainCircuit, Code, Database, Sparkles, Zap, Network, Cpu, Shield, Rocket } from "lucide-react";

const Services = () => {
  const { services, isLoading } = useAdminData();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const iconMap: { [key: string]: any } = {
    'blockchain': Blocks,
    'ai': BrainCircuit,
    'web': Code,
    'mobile': Cpu,
    'data': Database,
    'security': Shield,
    'innovation': Sparkles,
    'network': Network,
    'performance': Zap,
    'launch': Rocket
  };

  const getServiceIcon = (category: string) => {
    const IconComponent = iconMap[category.toLowerCase()] || Code;
    return IconComponent;
  };

  if (isLoading) {
    return (
      <section id="services" className="py-20 px-6 md:px-10 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 px-6 md:px-10 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="inline-block py-2 px-4 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200">
              🚀 My Services
            </span>
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600">
            Building the Future
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From blockchain solutions to AI innovations, I craft cutting-edge technology 
            that transforms ideas into reality. Let's create something extraordinary together! ✨
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = getServiceIcon(service.category);
            return (
              <Card 
                key={service.id}
                className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm hover:bg-white/90 hover-scale cursor-pointer opacity-0 animate-slide-up`}
                style={{ 
                  animationDelay: `${0.1 + index * 0.1}s`, 
                  animationFillMode: "forwards"
                }}
                onClick={() => handleServiceClick(service)}
              >
                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500 -z-10"></div>
                <div className="absolute inset-[1px] bg-white rounded-xl z-0"></div>
                
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <Badge 
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200"
                    >
                      {service.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10 pt-0">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tech.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">
                      ${service.price}
                    </span>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-xl group-hover:scale-105 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(service);
                      }}
                    >
                      Get Started 🚀
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-purple-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Start Your Project? 🌟
            </h3>
            <p className="text-gray-600 mb-6">
              Let's discuss your vision and bring it to life with cutting-edge technology.
            </p>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-xl px-8 py-3 text-lg font-semibold"
              asChild
            >
              <a href="#contact">Start a Conversation 💬</a>
            </Button>
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
