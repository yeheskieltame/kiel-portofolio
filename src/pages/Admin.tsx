
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Database } from "lucide-react";
import { AdminServices } from '@/components/admin/AdminServices';
import { AdminProjects } from '@/components/admin/AdminProjects';
import { AdminSkills } from '@/components/admin/AdminSkills';
import { AdminEducation } from '@/components/admin/AdminEducation';
import { useToast } from '@/hooks/use-toast';
import { useAdminData } from '@/components/admin/AdminDataContext';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const { toast } = useToast();
  const { initializeDefaultData } = useAdminData();

  // Check if there's an authentication token in localStorage
  useEffect(() => {
    const authToken = localStorage.getItem('adminAuth');
    if (authToken === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    
    // Simple password check - in a real app, this would be a backend call
    setTimeout(() => {
      if (password === 'TameRior09@') {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'authenticated');
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
      } else {
        toast({
          title: "Authentication failed",
          description: "Invalid password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const handleInitializeData = async () => {
    setIsInitializing(true);
    try {
      await initializeDefaultData();
      toast({
        title: "Database initialized",
        description: "Default data has been uploaded to the database",
      });
    } catch (error) {
      console.error("Error initializing data:", error);
      toast({
        title: "Initialization failed",
        description: "Failed to upload default data to the database",
        variant: "destructive",
      });
    } finally {
      setIsInitializing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md shadow-lg animate-fade-in">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>
              Enter your password to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="pr-10"
                  />
                  <Lock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Login"}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            <p className="w-full">This area is restricted to administrators only.</p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleInitializeData} 
              disabled={isInitializing}
              className="flex items-center gap-2"
            >
              <Database className="h-4 w-4" />
              {isInitializing ? "Initializing..." : "Initialize Data"}
            </Button>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>
          <TabsContent value="services">
            <AdminServices />
          </TabsContent>
          <TabsContent value="projects">
            <AdminProjects />
          </TabsContent>
          <TabsContent value="skills">
            <AdminSkills />
          </TabsContent>
          <TabsContent value="education">
            <AdminEducation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
