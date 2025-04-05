
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-6 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost" 
              size="sm"
              className="mb-4 gap-2"
              asChild
            >
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-theme-purple to-theme-blue">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last updated: April 5, 2025</p>
          </div>
          
          <div className="prose prose-purple max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Yeheskiel Yunus Tame ("I", "me", or "my") respects your privacy and is committed to protecting
                your personal data. This privacy policy informs you about how I handle your personal data when you visit
                my website or engage my freelance services, and tells you about your privacy rights.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Information I Collect</h2>
              <p>I may collect the following types of information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Personal Identification Information:</strong> Including but not limited to your name, email address, 
                  phone number, and business information that you provide when contacting me.
                </li>
                <li>
                  <strong>Project Information:</strong> Details related to your project requirements, specifications, and any 
                  other information you provide in relation to freelance services.
                </li>
                <li>
                  <strong>Technical Data:</strong> Including IP address, browser type and version, time zone setting and 
                  location, browser plug-in types and versions, operating system and platform, and other technology on the 
                  devices you use to access this website.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use my website.
                </li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. How I Use Your Information</h2>
              <p>I use the collected information for various purposes, including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide and maintain my services</li>
                <li>To communicate with you regarding your inquiries or projects</li>
                <li>To provide you with updates and information about my services</li>
                <li>To improve my website and services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
              <p>
                I implement appropriate security measures to protect your personal information from unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic 
                storage is 100% secure, so I cannot guarantee absolute security.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Data Retention</h2>
              <p>
                I will retain your personal information only for as long as necessary to fulfill the purposes outlined 
                in this privacy policy, unless a longer retention period is required or permitted by law.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Your Data Protection Rights</h2>
              <p>Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The right to access your personal data</li>
                <li>The right to correct inaccurate or incomplete personal data</li>
                <li>The right to erasure of your personal data</li>
                <li>The right to restrict processing of your personal data</li>
                <li>The right to data portability</li>
                <li>The right to object to processing of your personal data</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Third-Party Links</h2>
              <p>
                My website may include links to third-party websites, plug-ins, and applications. Clicking on those links 
                or enabling those connections may allow third parties to collect or share data about you. I do not control 
                these third-party websites and am not responsible for their privacy statements.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
              <p>
                I may update this privacy policy from time to time. Any changes will be posted on this page with an 
                updated revision date. I encourage you to review this privacy policy periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">9. Contact Information</h2>
              <p>
                If you have any questions about this privacy policy or my data practices, please contact me at:
                yeheskielyunustame13@gmail.com
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
