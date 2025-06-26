
import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import Profile from "@/components/Profile";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Articles from "@/components/Articles";
import Activities from "@/components/Activities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero3D />
        <Profile />
        <Services />
        <Skills />
        <Projects />
        <Articles />
        <Activities />
        <Education />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
