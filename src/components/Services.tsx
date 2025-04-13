
import { useState } from "react";
import { Code, BrainCircuit, MessageSquare, Facebook, Shield, Zap, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceRequestDialog from "@/components/ServiceRequestDialog";
import { useAdminData } from "./admin/AdminDataContext";

const Services = () => {
  const { services, isLoading } = useAdminData();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRequestService = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedService(null);
  };

  // Function to get the icon component based on the icon name
  const getIconComponent = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Code: <Code className="h-8 w-8 text-theme-purple" />,
      BrainCircuit: <BrainCircuit className="h-8 w-8 text-theme-blue" />,
      MessageSquare: <MessageSquare className="h-8 w-8 text-theme-purple-dark" />,
      Facebook: <Facebook className="h-8 w-8 text-[#1877F2]" />,
      Shield: <Shield className="h-8 w-8 text-theme-purple" />,
      Zap: <Zap className="h-8 w-8 text-theme-blue" />,
      Database: <Database className="h-8 w-8 text-theme-purple-dark" />
    };
    
    return icons[iconName] || <Code className="h-8 w-8 text-theme-purple" />;
  };
  
  if (isLoading) {
    return (
      <section id="services" className="py-20 px-6 md:px-10 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <p>Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 px-6 md:px-10 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-circuit bg-cover bg-fixed opacity-5"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-theme-purple/20 text-theme-purple border border-theme-purple/30 mb-3">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-theme-purple to-theme-blue animate-gradient-shift bg-300%">
            What I Offer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional freelance services tailored to your specific needs. From custom software development to AI solutions and digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-theme-purple/10 hover:border-theme-purple/30 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6 p-3 bg-gradient-to-br from-theme-purple/10 to-theme-blue/10 rounded-lg inline-block">
                  {getIconComponent(service.icon)}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-theme-dark group-hover:text-theme-purple transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 flex-grow">
                  {service.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm uppercase text-muted-foreground font-medium mb-3">Features</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-theme-purple"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-theme-purple text-theme-purple hover:bg-theme-purple hover:text-white transition-all"
                  onClick={() => handleRequestService(service.title)}
                >
                  Request Service
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceRequestDialog 
          isOpen={isDialogOpen} 
          onClose={handleCloseDialog} 
          serviceName={selectedService} 
        />
      )}
    </section>
  );
};

export default Services;
