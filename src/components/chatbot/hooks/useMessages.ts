
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Message } from "../types";
import { useKommo } from "./useKommo";

export const useMessages = (stopSpeaking: () => void) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm Yeheskiel's assistant powered by Kommo CRM. I can help you with questions about services, projects, and connect you directly with our team. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [leadCaptureMode, setLeadCaptureMode] = useState(false);
  const [leadData, setLeadData] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});
  
  const { isConnected, createLead, initiateAuth } = useKommo();

  // Pre-defined responses for common questions
  const getAutomatedResponse = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return "I offer comprehensive services including:\n\n• Blockchain Development\n• AI/ML Solutions\n• Web Development\n• Smart Contract Development\n• DeFi Applications\n• NFT Platforms\n\nWould you like to know more about any specific service or discuss your project requirements?";
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
      return "I've worked on various exciting projects including blockchain applications, AI solutions, and web platforms. You can see my latest work in the Projects section above. Would you like to discuss a similar project for your needs?";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('get in touch')) {
      return "Great! I'd love to help you with your project. To connect you with the right solution, I'll need some basic information. Let me collect your details so we can provide you with the best assistance.";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
      return "Project costs vary based on complexity and requirements. I'd be happy to provide a detailed quote after understanding your specific needs. Would you like to share more details about your project so I can connect you with accurate pricing information?";
    }
    
    return null;
  };

  const initiateLeadCapture = () => {
    setLeadCaptureMode(true);
    const leadMessage: Message = {
      id: `bot-${Date.now()}`,
      content: "Perfect! Let me collect some information to better assist you. What's your name?",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, leadMessage]);
  };

  const handleLeadCaptureStep = (inputMessage: string) => {
    if (!leadData.name) {
      setLeadData(prev => ({ ...prev, name: inputMessage }));
      const nextMessage: Message = {
        id: `bot-${Date.now()}`,
        content: `Nice to meet you, ${inputMessage}! What's your email address?`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, nextMessage]);
    } else if (!leadData.email) {
      setLeadData(prev => ({ ...prev, email: inputMessage }));
      const nextMessage: Message = {
        id: `bot-${Date.now()}`,
        content: "Great! And your phone number? (Optional - you can type 'skip' if you prefer not to share)",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, nextMessage]);
    } else if (!leadData.phone) {
      const phone = inputMessage.toLowerCase() === 'skip' ? '' : inputMessage;
      setLeadData(prev => ({ ...prev, phone }));
      const nextMessage: Message = {
        id: `bot-${Date.now()}`,
        content: "Perfect! Finally, please tell me more about your project or how I can help you:",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, nextMessage]);
    } else if (!leadData.message) {
      setLeadData(prev => ({ ...prev, message: inputMessage }));
      setLeadCaptureMode(false);
      
      // Create lead in Kommo
      if (isConnected) {
        createLeadInKommo({
          name: leadData.name!,
          email: leadData.email!,
          phone: leadData.phone,
          message: inputMessage
        });
      }
      
      const finalMessage: Message = {
        id: `bot-${Date.now()}`,
        content: `Thank you ${leadData.name}! I've recorded your information and someone from our team will get back to you soon. In the meantime, feel free to explore our services and projects above, or ask me any other questions!`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, finalMessage]);
      
      // Reset lead data
      setLeadData({});
    }
  };

  const createLeadInKommo = async (contactData: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }) => {
    try {
      await createLead(contactData);
      toast({
        title: "Information Submitted",
        description: "Your details have been saved to our CRM. We'll contact you soon!",
      });
    } catch (error) {
      console.error('Failed to create lead:', error);
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your information. Please try the contact form below.",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async (inputMessage: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    stopSpeaking();

    // Handle lead capture flow
    if (leadCaptureMode) {
      handleLeadCaptureStep(inputMessage);
      setIsLoading(false);
      return;
    }

    try {
      // Check if Kommo is connected
      if (!isConnected) {
        const connectMessage: Message = {
          id: `bot-${Date.now()}`,
          content: "To provide you with the best experience and connect you with our team, I need to connect to our CRM system. Would you like me to set up this connection?",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, connectMessage]);
        setIsLoading(false);
        return;
      }

      // Get automated response
      const automatedResponse = getAutomatedResponse(inputMessage);
      
      if (automatedResponse) {
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: automatedResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Default response for unrecognized queries
        const defaultMessage: Message = {
          id: `bot-${Date.now()}`,
          content: "I understand you're interested in learning more. I specialize in blockchain development, AI solutions, and web applications. Would you like to discuss your specific project requirements? I can connect you with detailed information and pricing.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, defaultMessage]);
      }

      // Check if user seems interested in services and trigger lead capture
      const interestedKeywords = ['interested', 'quote', 'project', 'hire', 'work together', 'contact', 'discuss'];
      if (interestedKeywords.some(keyword => inputMessage.toLowerCase().includes(keyword))) {
        setTimeout(() => {
          initiateLeadCapture();
        }, 1000);
      }

    } catch (error) {
      console.error("Error handling message:", error);
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "I apologize, but I'm having some technical difficulties. Please feel free to use the contact form below to reach out directly, or try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Please try again or use the contact form below.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const connectToKommo = () => {
    initiateAuth();
  };

  return {
    messages,
    isLoading,
    handleSendMessage,
    connectToKommo,
    isConnected
  };
};
