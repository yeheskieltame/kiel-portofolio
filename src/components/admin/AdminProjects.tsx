
import { useState } from 'react';
import { useAdminData, Project } from './AdminDataContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, Save, X, ExternalLink, Github, PlusCircle, MinusCircle } from "lucide-react";
import { toast } from '@/hooks/use-toast';

export const AdminProjects = () => {
  const { projects, updateProject, deleteProject, addProject } = useAdminData();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    image: '',
    demoLink: '',
    githubLink: '',
    tech: [''],
  });

  const handleEditProject = (project: Project) => {
    setCurrentProject({ ...project });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!currentProject) return;
    
    if (!currentProject.title || !currentProject.description || !currentProject.image) {
      toast({
        title: "Validation Error",
        description: "Title, description and image URL are required.",
        variant: "destructive",
      });
      return;
    }

    updateProject(currentProject);
    setIsEditDialogOpen(false);
    setCurrentProject(null);
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description || !newProject.image) {
      toast({
        title: "Validation Error",
        description: "Title, description and image URL are required.",
        variant: "destructive",
      });
      return;
    }

    // Filter out empty technologies
    const cleanedTech = newProject.tech.filter(t => t.trim() !== '');
    if (cleanedTech.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one technology is required.",
        variant: "destructive",
      });
      return;
    }

    addProject({
      ...newProject,
      tech: cleanedTech
    });
    
    setIsAddDialogOpen(false);
    setNewProject({
      title: '',
      description: '',
      image: '',
      demoLink: '',
      githubLink: '',
      tech: [''],
    });
  };

  const handleConfirmDelete = () => {
    if (!currentProject) return;
    
    deleteProject(currentProject.id);
    setIsDeleteDialogOpen(false);
    setCurrentProject(null);
  };

  const handleAddTech = (isNew: boolean) => {
    if (isNew) {
      setNewProject(prev => ({
        ...prev,
        tech: [...prev.tech, '']
      }));
    } else if (currentProject) {
      setCurrentProject(prev => ({
        ...prev!,
        tech: [...prev!.tech, '']
      }));
    }
  };

  const handleRemoveTech = (index: number, isNew: boolean) => {
    if (isNew) {
      setNewProject(prev => ({
        ...prev,
        tech: prev.tech.filter((_, i) => i !== index)
      }));
    } else if (currentProject) {
      setCurrentProject(prev => ({
        ...prev!,
        tech: prev!.tech.filter((_, i) => i !== index)
      }));
    }
  };

  const handleTechChange = (value: string, index: number, isNew: boolean) => {
    if (isNew) {
      const updatedTech = [...newProject.tech];
      updatedTech[index] = value;
      setNewProject(prev => ({
        ...prev,
        tech: updatedTech
      }));
    } else if (currentProject) {
      const updatedTech = [...currentProject.tech];
      updatedTech[index] = value;
      setCurrentProject(prev => ({
        ...prev!,
        tech: updatedTech
      }));
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projects Management</h2>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg line-clamp-1">{project.title}</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditProject(project)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => {
                        setCurrentProject(project);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index} 
                      className="inline-block px-2 py-0.5 bg-gray-100 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 text-xs">
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-theme-purple"
                    >
                      <ExternalLink className="h-3 w-3" /> Demo
                    </a>
                  )}
                  {project.githubLink && project.githubLink.trim() !== " " && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-600"
                    >
                      <Github className="h-3 w-3" /> Repository
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to the project details.
            </DialogDescription>
          </DialogHeader>
          {currentProject && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input 
                  id="edit-title" 
                  value={currentProject.title} 
                  onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  value={currentProject.description} 
                  onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input 
                  id="edit-image" 
                  value={currentProject.image} 
                  onChange={(e) => setCurrentProject({...currentProject, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-demo">Demo Link</Label>
                <Input 
                  id="edit-demo" 
                  value={currentProject.demoLink} 
                  onChange={(e) => setCurrentProject({...currentProject, demoLink: e.target.value})}
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-github">GitHub Link</Label>
                <Input 
                  id="edit-github" 
                  value={currentProject.githubLink} 
                  onChange={(e) => setCurrentProject({...currentProject, githubLink: e.target.value})}
                  placeholder="https://github.com/username/repo"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Technologies</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleAddTech(false)}
                    className="h-7 px-2"
                  >
                    <PlusCircle className="h-3.5 w-3.5 mr-1" /> Add Tech
                  </Button>
                </div>
                <div className="space-y-2">
                  {currentProject.tech.map((tech, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={tech}
                        onChange={(e) => handleTechChange(e.target.value, index, false)}
                        placeholder={`Technology ${index + 1}`}
                        className="flex-1"
                      />
                      {currentProject.tech.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveTech(index, false)}
                          className="h-9 w-9 p-0"
                        >
                          <MinusCircle className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setCurrentProject(null);
              }}
            >
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-theme-purple hover:bg-theme-purple/90">
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Create a new project to showcase in your portfolio.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="add-title">Title</Label>
              <Input 
                id="add-title" 
                value={newProject.title} 
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                placeholder="e.g., E-Commerce Website"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-description">Description</Label>
              <Textarea 
                id="add-description" 
                value={newProject.description} 
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                placeholder="Brief description of the project"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-image">Image URL</Label>
              <Input 
                id="add-image" 
                value={newProject.image} 
                onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-demo">Demo Link</Label>
              <Input 
                id="add-demo" 
                value={newProject.demoLink} 
                onChange={(e) => setNewProject({...newProject, demoLink: e.target.value})}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-github">GitHub Link</Label>
              <Input 
                id="add-github" 
                value={newProject.githubLink} 
                onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})}
                placeholder="https://github.com/username/repo"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Technologies</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleAddTech(true)}
                  className="h-7 px-2"
                >
                  <PlusCircle className="h-3.5 w-3.5 mr-1" /> Add Tech
                </Button>
              </div>
              <div className="space-y-2">
                {newProject.tech.map((tech, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={tech}
                      onChange={(e) => handleTechChange(e.target.value, index, true)}
                      placeholder={`Technology ${index + 1}`}
                      className="flex-1"
                    />
                    {newProject.tech.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveTech(index, true)}
                        className="h-9 w-9 p-0"
                      >
                        <MinusCircle className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setNewProject({
                  title: '',
                  description: '',
                  image: '',
                  demoLink: '',
                  githubLink: '',
                  tech: [''],
                });
              }}
            >
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleAddProject} className="bg-theme-purple hover:bg-theme-purple/90">
              <Plus className="h-4 w-4 mr-2" /> Add Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setCurrentProject(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
