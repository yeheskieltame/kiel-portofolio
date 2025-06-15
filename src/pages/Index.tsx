
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Articles from "@/components/Articles";
import Activities from "@/components/Activities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Skills />
        <Projects />
        <Articles />
        <Activities />
        <Education />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <Toaster />
    </div>
  );
};

export default Index;
