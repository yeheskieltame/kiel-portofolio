
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
              <div className="mb-5 space-y-2">
                <h3 className="text-lg font-medium">Connect with me</h3>
                <p className="text-muted-foreground text-sm">
                  Follow me on social media to stay updated with my latest projects and insights.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://github.com/yeheskieltame" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-dark-light text-white hover:bg-theme-dark transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                  <span className="text-sm">GitHub</span>
                </a>
                
                <a 
                  href="https://linkedin.com/in/yeheskieltame" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0077B5] text-white hover:bg-[#006699] transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  <span className="text-sm">LinkedIn</span>
                </a>
                
                <a 
                  href="https://discord.gg/skyriortame" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2] text-white hover:bg-[#4a56d6] transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  <span className="text-sm">Discord</span>
                </a>
              </div>
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
