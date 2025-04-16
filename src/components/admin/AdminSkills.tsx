
import { useState } from 'react';
import { useAdminData, Skill } from './AdminDataContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";
import { toast } from '@/hooks/use-toast';

export const AdminSkills = () => {
  const { skills, updateSkill, deleteSkill, addSkill } = useAdminData();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    name: '',
    icon: '/placeholder.svg',
    level: 75,
    category: 'programming',
  });

  const handleEditSkill = (skill: Skill) => {
    setCurrentSkill({ ...skill });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!currentSkill) return;
    
    if (!currentSkill.name) {
      toast({
        title: "Validation Error",
        description: "Skill name is required.",
        variant: "destructive",
      });
      return;
    }

    updateSkill(currentSkill);
    setIsEditDialogOpen(false);
    setCurrentSkill(null);
  };

  const handleAddSkill = () => {
    if (!newSkill.name) {
      toast({
        title: "Validation Error",
        description: "Skill name is required.",
        variant: "destructive",
      });
      return;
    }

    addSkill(newSkill);
    setIsAddDialogOpen(false);
    setNewSkill({
      name: '',
      icon: '/placeholder.svg',
      level: 75,
      category: 'programming',
    });
  };

  const handleConfirmDelete = () => {
    if (!currentSkill) return;
    
    deleteSkill(currentSkill.id);
    setIsDeleteDialogOpen(false);
    setCurrentSkill(null);
  };

  // Group skills by category
  const programmingSkills = skills.filter(skill => skill.category === 'programming');
  const mlSkills = skills.filter(skill => skill.category === 'ml');
  const webDevSkills = skills.filter(skill => skill.category === 'webdev');

  const renderSkillCard = (skill: Skill) => (
    <Card key={skill.id} className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">{skill.name}</h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleEditSkill(skill)}
              className="h-7 w-7 p-0"
            >
              <Pencil className="h-3 w-3" />
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => {
                setCurrentSkill(skill);
                setIsDeleteDialogOpen(true);
              }}
              className="h-7 w-7 p-0"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-theme-purple"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
          <div className="text-right text-xs font-medium">
            {skill.level}%
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Skills Management</h2>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Programming Languages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {programmingSkills.map(renderSkillCard)}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Machine Learning & Data Science</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mlSkills.map(renderSkillCard)}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Web Development & Tools</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {webDevSkills.map(renderSkillCard)}
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
            <DialogDescription>
              Update skill name and proficiency level.
            </DialogDescription>
          </DialogHeader>
          {currentSkill && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Skill Name</Label>
                <Input 
                  id="edit-name" 
                  value={currentSkill.name} 
                  onChange={(e) => setCurrentSkill({...currentSkill, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-icon">Icon URL</Label>
                <Input 
                  id="edit-icon" 
                  value={currentSkill.icon} 
                  onChange={(e) => setCurrentSkill({...currentSkill, icon: e.target.value})}
                  placeholder="URL to icon image (e.g., https://example.com/icon.png)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={currentSkill.category} 
                  onValueChange={(value: 'programming' | 'ml' | 'webdev') => 
                    setCurrentSkill({...currentSkill, category: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">Programming Languages</SelectItem>
                    <SelectItem value="ml">Machine Learning & Data Science</SelectItem>
                    <SelectItem value="webdev">Web Development & Tools</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="edit-level">Proficiency Level: {currentSkill.level}%</Label>
                </div>
                <Slider
                  value={[currentSkill.level]}
                  min={10}
                  max={100}
                  step={5}
                  onValueChange={(value) => setCurrentSkill({...currentSkill, level: value[0]})}
                  className="py-4"
                />
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setCurrentSkill(null);
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
            <DialogTitle>Add New Skill</DialogTitle>
            <DialogDescription>
              Add a new technical skill to your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="add-name">Skill Name</Label>
              <Input 
                id="add-name" 
                value={newSkill.name} 
                onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                placeholder="e.g., React"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-icon">Icon URL</Label>
              <Input 
                id="add-icon" 
                value={newSkill.icon} 
                onChange={(e) => setNewSkill({...newSkill, icon: e.target.value})}
                placeholder="URL to icon image (e.g., https://example.com/icon.png)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-category">Category</Label>
              <Select 
                value={newSkill.category} 
                onValueChange={(value: 'programming' | 'ml' | 'webdev') => 
                  setNewSkill({...newSkill, category: value})
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programming Languages</SelectItem>
                  <SelectItem value="ml">Machine Learning & Data Science</SelectItem>
                  <SelectItem value="webdev">Web Development & Tools</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="add-level">Proficiency Level: {newSkill.level}%</Label>
              </div>
              <Slider
                value={[newSkill.level]}
                min={10}
                max={100}
                step={5}
                onValueChange={(value) => setNewSkill({...newSkill, level: value[0]})}
                className="py-4"
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setNewSkill({
                  name: '',
                  icon: '/placeholder.svg',
                  level: 75,
                  category: 'programming',
                });
              }}
            >
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleAddSkill} className="bg-theme-purple hover:bg-theme-purple/90">
              <Plus className="h-4 w-4 mr-2" /> Add Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Skill</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this skill? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setCurrentSkill(null);
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
