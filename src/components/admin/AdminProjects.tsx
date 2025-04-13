
import { useState } from 'react';
import { useAdminData, Project } from './AdminDataContext';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, Save, X, ExternalLink, Github, PlusCircle, MinusCircle, ImageIcon } from "lucide-react";
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
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    demo_link: '',
    github_link: '',
    tech: []
  });

  // For managing technologies input
  const [techInput, setTechInput] = useState('');
  const [newTechInput, setNewTechInput] = useState('');

  const handleEditProject = (project: Project) => {
    setCurrentProject({ ...project });
    setIsEditDialogOpen(true);
    setTechInput(''); // Reset tech input when opening edit dialog
  };

  const handleSaveEdit = () => {
    if (!currentProject) return;
    
    if (!currentProject.title || !currentProject.description || !currentProject.image) {
      toast({
        title: "Validation Error",
        description: "Title, description, and image URL are required.",
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
        description: "Title, description, and image URL are required.",
        variant: "destructive",
      });
      return;
    }

    addProject(newProject);
    setIsAddDialogOpen(false);
    setNewProject({
      title: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      demo_link: '',
      github_link: '',
      tech: []
    });
    setNewTechInput('');
  };

  const handleConfirmDelete = () => {
    if (!currentProject) return;
    
    deleteProject(currentProject.id);
    setIsDeleteDialogOpen(false);
    setCurrentProject(null);
  };

  const handleAddTech = () => {
    if (techInput.trim() && currentProject) {
      if (!currentProject.tech.includes(techInput.trim())) {
        setCurrentProject({
          ...currentProject,
          tech: [...currentProject.tech, techInput.trim()]
        });
        setTechInput('');
      }
    }
  };

  const handleAddNewTech = () => {
    if (newTechInput.trim()) {
      if (!newProject.tech.includes(newTechInput.trim())) {
        setNewProject({
          ...newProject,
          tech: [...newProject.tech, newTechInput.trim()]
        });
        setNewTechInput('');
      }
    }
  };

  const handleRemoveTech = (tech: string) => {
    if (currentProject) {
      setCurrentProject({
        ...currentProject,
        tech: currentProject.tech.filter(t => t !== tech)
      });
    }
  };

  const handleRemoveNewTech = (tech: string) => {
    setNewProject({
      ...newProject,
      tech: newProject.tech.filter(t => t !== tech)
    });
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projects Management</h2>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                }}
              />
            </div>
            <CardContent className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg">{project.title}</h3>
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
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech.map((tech, i) => (
                  <span key={i} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="px-6 py-3 bg-secondary/20 flex justify-between">
              <div className="flex gap-4">
                {project.demo_link && (
                  <a 
                    href={project.demo_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-theme-purple"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Demo</span>
                  </a>
                )}
                {project.github_link && (
                  <a 
                    href={project.github_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-theme-purple"
                  >
                    <Github className="h-3 w-3" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to the project information.
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
                <div className="flex gap-2">
                  <Input 
                    id="edit-image" 
                    value={currentProject.image} 
                    onChange={(e) => setCurrentProject({...currentProject, image: e.target.value})}
                    className="flex-1"
                  />
                  <div className="h-10 w-10 bg-secondary flex items-center justify-center rounded">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                </div>
                {currentProject.image && (
                  <div className="mt-2 aspect-video w-full overflow-hidden rounded">
                    <img 
                      src={currentProject.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-demo-link">Demo Link (Optional)</Label>
                <Input 
                  id="edit-demo-link" 
                  value={currentProject.demo_link} 
                  onChange={(e) => setCurrentProject({...currentProject, demo_link: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-github-link">GitHub Link (Optional)</Label>
                <Input 
                  id="edit-github-link" 
                  value={currentProject.github_link} 
                  onChange={(e) => setCurrentProject({...currentProject, github_link: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Technologies</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add technology..."
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTech()}
                  />
                  <Button 
                    onClick={handleAddTech} 
                    type="button"
                    variant="outline"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tech.map((tech, index) => (
                    <div key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="text-sm">{tech}</span>
                      <button 
                        onClick={() => handleRemoveTech(tech)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
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
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
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
                placeholder="e.g., Personal Portfolio Website"
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
              <div className="flex gap-2">
                <Input 
                  id="add-image" 
                  value={newProject.image} 
                  onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                  className="flex-1"
                  placeholder="https://example.com/image.jpg"
                />
                <div className="h-10 w-10 bg-secondary flex items-center justify-center rounded">
                  <ImageIcon className="h-5 w-5" />
                </div>
              </div>
              {newProject.image && (
                <div className="mt-2 aspect-video w-full overflow-hidden rounded">
                  <img 
                    src={newProject.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                    }}
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-demo-link">Demo Link (Optional)</Label>
              <Input 
                id="add-demo-link" 
                value={newProject.demo_link} 
                onChange={(e) => setNewProject({...newProject, demo_link: e.target.value})}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-github-link">GitHub Link (Optional)</Label>
              <Input 
                id="add-github-link" 
                value={newProject.github_link} 
                onChange={(e) => setNewProject({...newProject, github_link: e.target.value})}
                placeholder="https://github.com/yourusername/project"
              />
            </div>
            <div className="space-y-2">
              <Label>Technologies</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTechInput}
                  onChange={(e) => setNewTechInput(e.target.value)}
                  placeholder="Add technology..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNewTech()}
                />
                <Button 
                  onClick={handleAddNewTech} 
                  type="button"
                  variant="outline"
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newProject.tech.map((tech, index) => (
                  <div key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="text-sm">{tech}</span>
                    <button 
                      onClick={() => handleRemoveNewTech(tech)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
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
                  image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
                  demo_link: '',
                  github_link: '',
                  tech: []
                });
                setNewTechInput('');
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
