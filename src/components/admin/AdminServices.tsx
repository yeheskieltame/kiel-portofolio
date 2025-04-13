
import { useState } from 'react';
import { useAdminData, Service } from './AdminDataContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, Save, X, PlusCircle, MinusCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

export const AdminServices = () => {
  const { services, updateService, deleteService, addService } = useAdminData();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    title: '',
    description: '',
    icon: 'Code',
    features: ['']
  });

  // Icons available for services
  const availableIcons = [
    { name: 'Code', label: 'Code' },
    { name: 'BrainCircuit', label: 'Brain Circuit' },
    { name: 'MessageSquare', label: 'Message Square' },
    { name: 'Facebook', label: 'Facebook' },
    { name: 'Shield', label: 'Shield' },
    { name: 'Zap', label: 'Lightning' },
    { name: 'Database', label: 'Database' }
  ];

  const handleEditService = (service: Service) => {
    setCurrentService({ ...service });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!currentService) return;
    
    if (!currentService.title || !currentService.description) {
      toast({
        title: "Validation Error",
        description: "Title and description are required.",
        variant: "destructive",
      });
      return;
    }

    updateService(currentService);
    setIsEditDialogOpen(false);
    setCurrentService(null);
  };

  const handleAddService = () => {
    if (!newService.title || !newService.description) {
      toast({
        title: "Validation Error",
        description: "Title and description are required.",
        variant: "destructive",
      });
      return;
    }

    // Filter out empty features
    const cleanedFeatures = newService.features.filter(f => f.trim() !== '');
    if (cleanedFeatures.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one feature is required.",
        variant: "destructive",
      });
      return;
    }

    addService({
      ...newService,
      features: cleanedFeatures
    });
    
    setIsAddDialogOpen(false);
    setNewService({
      title: '',
      description: '',
      icon: 'Code',
      features: ['']
    });
  };

  const handleConfirmDelete = () => {
    if (!currentService) return;
    
    deleteService(currentService.id);
    setIsDeleteDialogOpen(false);
    setCurrentService(null);
  };

  const handleAddFeature = (isNew: boolean) => {
    if (isNew) {
      setNewService(prev => ({
        ...prev,
        features: [...prev.features, '']
      }));
    } else if (currentService) {
      setCurrentService(prev => ({
        ...prev!,
        features: [...prev!.features, '']
      }));
    }
  };

  const handleRemoveFeature = (index: number, isNew: boolean) => {
    if (isNew) {
      setNewService(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }));
    } else if (currentService) {
      setCurrentService(prev => ({
        ...prev!,
        features: prev!.features.filter((_, i) => i !== index)
      }));
    }
  };

  const handleFeatureChange = (value: string, index: number, isNew: boolean) => {
    if (isNew) {
      const updatedFeatures = [...newService.features];
      updatedFeatures[index] = value;
      setNewService(prev => ({
        ...prev,
        features: updatedFeatures
      }));
    } else if (currentService) {
      const updatedFeatures = [...currentService.features];
      updatedFeatures[index] = value;
      setCurrentService(prev => ({
        ...prev!,
        features: updatedFeatures
      }));
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Services Management</h2>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditService(service)}
                    className="h-8 w-8 p-0"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      setCurrentService(service);
                      setIsDeleteDialogOpen(true);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Features:</span>
                <ul className="mt-1 text-xs space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="h-1 w-1 rounded-full bg-gray-400 mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Make changes to the service information.
            </DialogDescription>
          </DialogHeader>
          {currentService && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input 
                  id="edit-title" 
                  value={currentService.title} 
                  onChange={(e) => setCurrentService({...currentService, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  value={currentService.description} 
                  onChange={(e) => setCurrentService({...currentService, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-icon">Icon</Label>
                <Select 
                  value={currentService.icon}
                  onValueChange={(value) => setCurrentService({...currentService, icon: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableIcons.map((icon) => (
                      <SelectItem key={icon.name} value={icon.name}>
                        {icon.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Features</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleAddFeature(false)}
                    className="h-7 px-2"
                  >
                    <PlusCircle className="h-3.5 w-3.5 mr-1" /> Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {currentService.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(e.target.value, index, false)}
                        placeholder={`Feature ${index + 1}`}
                        className="flex-1"
                      />
                      {currentService.features.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveFeature(index, false)}
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
                setCurrentService(null);
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
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new service to offer to your clients.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="add-title">Title</Label>
              <Input 
                id="add-title" 
                value={newService.title} 
                onChange={(e) => setNewService({...newService, title: e.target.value})}
                placeholder="e.g., Web Development"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-description">Description</Label>
              <Textarea 
                id="add-description" 
                value={newService.description} 
                onChange={(e) => setNewService({...newService, description: e.target.value})}
                placeholder="Brief description of the service offered"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-icon">Icon</Label>
              <Select 
                value={newService.icon} 
                onValueChange={(value) => setNewService({...newService, icon: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {availableIcons.map((icon) => (
                    <SelectItem key={icon.name} value={icon.name}>
                      {icon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Features</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleAddFeature(true)}
                  className="h-7 px-2"
                >
                  <PlusCircle className="h-3.5 w-3.5 mr-1" /> Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {newService.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(e.target.value, index, true)}
                      placeholder={`Feature ${index + 1}`}
                      className="flex-1"
                    />
                    {newService.features.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveFeature(index, true)}
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
                setNewService({
                  title: '',
                  description: '',
                  icon: 'Code',
                  features: ['']
                });
              }}
            >
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleAddService} className="bg-theme-purple hover:bg-theme-purple/90">
              <Plus className="h-4 w-4 mr-2" /> Add Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setCurrentService(null);
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
