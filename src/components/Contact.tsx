import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import WalletDonation from "./WalletDonation";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    service: "", // Default will be set after fetching services
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  // Fetch available services from Supabase
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoadingServices(true);
      try {
        const { data, error } = await supabase
          .from('kiel_portfolio_services')
          .select('title')
          .order('title');
          
        if (error) {
          console.error("Error fetching services:", error);
          throw error;
        }
        
        if (data && data.length > 0) {
          const servicesTitles = data.map(service => service.title);
          setAvailableServices(servicesTitles);
          // Set default selected service to first one
          setFormData(prev => ({ ...prev, service: servicesTitles[0] }));
        } else {
          // Fallback to default service if none found
          setAvailableServices(["Custom Software Development"]);
          setFormData(prev => ({ ...prev, service: "Custom Software Development" }));
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
        // Fallback to default services if fetch fails
        setAvailableServices([
          "Custom Software Development",
          "Machine Learning Solutions",
          "Chatbot Development",
          "Meta Business Account Setup",
          "Other Services"
        ]);
        setFormData(prev => ({ ...prev, service: "Custom Software Development" }));
      } finally {
        setIsLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create a message that includes all form data including the selected service
      const emailBody = `
        Name: ${formData.name}
        Email: ${formData.email}
        Subject: ${formData.subject}
        Service: ${formData.service}
        
        Message:
        ${formData.message}
      `;

      // Open email client with pre-populated fields
      const mailtoLink = `mailto:yeheskielyunustame13@gmail.com?subject=${encodeURIComponent(`[Freelance Inquiry] ${formData.subject} - ${formData.service}`)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink, '_blank');
      
      // Show success message
      toast({
        title: "Message prepared!",
        description: "Your email client has been opened with the message. Just click send!",
      });
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        service: availableServices[0] || "Custom Software Development",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-theme-purple-light/5 to-theme-blue-light/10"></div>
      <div className="absolute inset-0 -z-10 bg-circuit bg-cover bg-fixed opacity-5"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-theme-purple/20 text-theme-purple border border-theme-purple/30 mb-3">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-theme-purple to-theme-blue">
            Contact Me
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Ready to start your next digital journey? Let's discuss how I can help bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2 space-y-8 opacity-0 animate-slide-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-theme-purple to-theme-blue flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-muted-foreground">yeheskielyunustame13@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-theme-purple to-theme-blue flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Phone</h3>
                  <p className="text-muted-foreground">+62 878 6133 0910</p>
                  <p className="text-muted-foreground">+62 822 4185 5484 (Chatbot)</p>

                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-theme-purple to-theme-blue flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Location</h3>
                  <p className="text-muted-foreground">Yogyakarta, Indonesia</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-6 bg-white/90 backdrop-blur-sm shadow-xl">
              <WalletDonation variant="contact" />
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-xl opacity-0 animate-slide-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="rounded-xl border-gray-200 focus:border-theme-purple focus:ring-theme-purple/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-xl border-gray-200 focus:border-theme-purple focus:ring-theme-purple/20"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  disabled={isLoadingServices}
                  className="w-full rounded-xl border-gray-200 focus:border-theme-purple focus:ring-theme-purple/20 py-2 px-3"
                >
                  {isLoadingServices ? (
                    <option value="">Loading services...</option>
                  ) : (
                    availableServices.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))
                  )}
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="rounded-xl border-gray-200 focus:border-theme-purple focus:ring-theme-purple/20"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Project Details
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Describe your project requirements"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="rounded-xl resize-none border-gray-200 focus:border-theme-purple focus:ring-theme-purple/20"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full rounded-xl py-6 gap-2 bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90 transition-all duration-300" 
                disabled={isSubmitting || isLoadingServices}
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
