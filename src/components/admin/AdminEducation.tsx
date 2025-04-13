
import { useState } from 'react';
import { useAdminData, Education } from './AdminDataContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Save, X, ExternalLink, PlusCircle, MinusCircle } from "lucide-react";
import { toast } from '@/hooks/use-toast';

export const AdminEducation = () => {
  const { education, updateEducation, deleteEducation, addEducation } = useAdminData();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<Education | null>(null);
  const [newEducation, setNewEducation] = useState<Omit<Education, 'id'>>({
    provider: '',
    courses: [{ name: '', link: '' }],
  });

  const handleEditEducation = (edu: Education) => {
    setCurrentEducation({ ...edu });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!currentEducation) return;
    
    if (!currentEducation.provider) {
      toast({
        title: "Validation Error",
        description: "Provider name is required.",
        variant: "destructive",
      });
      return;
    }

    if (currentEducation.courses.length === 0 || 
        currentEducation.courses.some(course => !course.name)) {
      toast({
        title: "Validation Error",
        description: "All courses must have a name.",
        variant: "destructive",
      });
      return;
    }

    updateEducation(currentEducation);
    setIsEditDialogOpen(false);
    setCurrentEducation(null);
  };

  const handleAddEducation = () => {
    if (!newEducation.provider) {
      toast({
        title: "Validation Error",
        description: "Provider name is required.",
        variant: "destructive",
      });
      return;
    }

    if (newEducation.courses.length === 0 || 
        newEducation.courses.some(course => !course.name)) {
      toast({
        title: "Validation Error",
        description: "All courses must have a name.",
        variant: "destructive",
      });
      return;
    }

    addEducation(newEducation);
    setIsAddDialogOpen(false);
    setNewEducation({
      provider: '',
      courses: [{ name: '', link: '' }],
    });
  };

  const handleConfirmDelete = () => {
    if (!currentEducation) return;
    
    deleteEducation(currentEducation.id);
    setIsDeleteDialogOpen(false);
    setCurrentEducation(null);
  };

  const handleAddCourse = (isNew: boolean) => {
    if (isNew) {
      setNewEducation(prev => ({
        ...prev,
        courses: [...prev.courses, { name: '', link: '' }]
      }));
    } else if (currentEducation) {
      setCurrentEducation(prev => ({
        ...prev!,
        courses: [...prev!.courses, { name: '', link: '' }]
      }));
    }
  };

  const handleRemoveCourse = (index: number, isNew: boolean) => {
    if (isNew) {
      setNewEducation(prev => ({
        ...prev,
        courses: prev.courses.filter((_, i) => i !== index)
      }));
    } else if (currentEducation) {
      setCurrentEducation(prev => ({
        ...prev!,
        courses: prev!.courses.filter((_, i) => i !== index)
      }));
    }
  };

  const handleCourseChange = (field: 'name' | 'link', value: string, index: number, isNew: boolean) => {
    if (isNew) {
      const updatedCourses = [...newEducation.courses];
      updatedCourses[index] = {
        ...updatedCourses[index],
        [field]: value
      };
      setNewEducation(prev => ({
        ...prev,
        courses: updatedCourses
      }));
    } else if (currentEducation) {
      const updatedCourses = [...currentEducation.courses];
      updatedCourses[index] = {
        ...updatedCourses[index],
        [field]: value
      };
      setCurrentEducation(prev => ({
        ...prev!,
        courses: updatedCourses
      }));
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Education & Certifications Management</h2>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" /> Add Education Provider
        </Button>
      </div>

      <div className="space-y-6">
        {education.map((edu) => (
          <Card key={edu.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg">{edu.provider}</h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditEducation(edu)}
                    className="h-8 w-8 p-0"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      setCurrentEducation(edu);
                      setIsDeleteDialogOpen(true);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ul className="space-y-2">
                {edu.courses.map((course, index) => (
                  <li key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{course.name}</span>
                    {course.link && (
                      <a 
                        href={course.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-theme-purple"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Verify</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Education Provider</DialogTitle>
            <DialogDescription>
              Update information about this education provider and its courses.
            </DialogDescription>
          </DialogHeader>
          {currentEducation && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-provider">Provider Name</Label>
                <Input 
                  id="edit-provider" 
                  value={currentEducation.provider} 
                  onChange={(e) => setCurrentEducation({...currentEducation, provider: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Courses & Certifications</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleAddCourse(false)}
                    className="h-7 px-2"
                  >
                    <PlusCircle className="h-3.5 w-3.5 mr-1" /> Add Course
                  </Button>
                </div>
                {currentEducation.courses.map((course, index) => (
                  <div key={index} className="space-y-2 p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs">Course #{index + 1}</Label>
                      {currentEducation.courses.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveCourse(index, false)}
                          className="h-6 w-6 p-0"
                        >
                          <MinusCircle className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Input
                        value={course.name}
                        onChange={(e) => handleCourseChange('name', e.target.value, index, false)}
                        placeholder="Course name"
                      />
                      <Input
                        value={course.link}
                        onChange={(e) => handleCourseChange('link', e.target.value, index, false)}
                        placeholder="Verification link (optional)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setCurrentEducation(null);
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
            <DialogTitle>Add New Education Provider</DialogTitle>
            <DialogDescription>
              Add a new education provider and its courses or certifications.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="add-provider">Provider Name</Label>
              <Input 
                id="add-provider" 
                value={newEducation.provider} 
                onChange={(e) => setNewEducation({...newEducation, provider: e.target.value})}
                placeholder="e.g., Coursera, Udemy, etc."
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Courses & Certifications</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleAddCourse(true)}
                  className="h-7 px-2"
                >
                  <PlusCircle className="h-3.5 w-3.5 mr-1" /> Add Course
                </Button>
              </div>
              {newEducation.courses.map((course, index) => (
                <div key={index} className="space-y-2 p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs">Course #{index + 1}</Label>
                    {newEducation.courses.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveCourse(index, true)}
                        className="h-6 w-6 p-0"
                      >
                        <MinusCircle className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={course.name}
                      onChange={(e) => handleCourseChange('name', e.target.value, index, true)}
                      placeholder="Course name"
                    />
                    <Input
                      value={course.link}
                      onChange={(e) => handleCourseChange('link', e.target.value, index, true)}
                      placeholder="Verification link (optional)"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setNewEducation({
                  provider: '',
                  courses: [{ name: '', link: '' }],
                });
              }}
            >
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleAddEducation} className="bg-theme-purple hover:bg-theme-purple/90">
              <Plus className="h-4 w-4 mr-2" /> Add Provider
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Education Provider</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this education provider and all its courses? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setCurrentEducation(null);
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
