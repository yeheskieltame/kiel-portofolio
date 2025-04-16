
import { useState } from 'react';
import { useAdminData } from './AdminDataContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Save, X, PlusCircle, MinusCircle } from "lucide-react";
import { toast } from '@/hooks/use-toast';

export const AdminEducation = () => {
  const { education, updateEducation, deleteEducation, addEducation } = useAdminData();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<any | null>(null);
  const [newEducation, setNewEducation] = useState({
    provider: '',
    imageUrl: '',  // New field for provider image
    courses: [{ name: '', link: '' }]
  });

  const handleEditEducation = (edu: any) => {
    // If imageUrl doesn't exist in the education object, add it with an empty string
    const educationWithImage = {
      ...edu,
      imageUrl: edu.imageUrl || ''
    };
    setCurrentEducation(educationWithImage);
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

    // Make sure we have at least one course
    if (newEducation.courses.length === 0 || !newEducation.courses[0].name) {
      toast({
        title: "Validation Error",
        description: "At least one course is required.",
        variant: "destructive",
      });
      return;
    }

    addEducation(newEducation);
    setIsAddDialogOpen(false);
    setNewEducation({
      provider: '',
      imageUrl: '',
      courses: [{ name: '', link: '' }]
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
      updatedCourses[index] = { ...updatedCourses[index], [field]: value };
      setNewEducation(prev => ({
        ...prev,
        courses: updatedCourses
      }));
    } else if (currentEducation) {
      const updatedCourses = [...currentEducation.courses];
      updatedCourses[index] = { ...updatedCourses[index], [field]: value };
      setCurrentEducation(prev => ({
        ...prev!,
        courses: updatedCourses
      }));
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Education Management</h2>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.map((edu) => (
          <Card key={edu.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{edu.provider}</h3>
                  {edu.imageUrl && (
                    <div className="mt-2 mb-3">
                      <img 
                        src={edu.imageUrl} 
                        alt={edu.provider} 
                        className="h-12 object-contain rounded"
                      />
                    </div>
                  )}
                </div>
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
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Courses:</span>
                <ul className="mt-1 text-sm space-y-1">
                  {edu.courses.map((course: any, index: number) => (
                    <li key={index} className="flex items-center justify-between">
                      <span>{course.name}</span>
                      {course.link && (
                        <a 
                          href={course.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-theme-purple hover:underline"
                        >
                          View Certificate
                        </a>
                      )}
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
            <DialogTitle>Edit Education</DialogTitle>
            <DialogDescription>
              Make changes to the education information.
            </DialogDescription>
          </DialogHeader>
          {currentEducation && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-provider">Provider</Label>
                <Input 
                  id="edit-provider" 
                  value={currentEducation.provider} 
                  onChange={(e) => setCurrentEducation({...currentEducation, provider: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Provider Image URL</Label>
                <Input 
                  id="edit-image" 
                  value={currentEducation.imageUrl || ''} 
                  onChange={(e) => setCurrentEducation({...currentEducation, imageUrl: e.target.value})}
                  placeholder="URL to provider image (optional)"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Courses</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleAddCourse(false)}
                    className="h-7 px-2"
                  >
                    <PlusCircle className="h-3.5 w-3.5 mr-1" /> Add Course
                  </Button>
                </div>
                <div className="space-y-4">
                  {currentEducation.courses.map((course: any, index: number) => (
                    <div key={index} className="space-y-2 border border-gray-200 p-3 rounded-md">
                      <div className="flex justify-between items-center">
                        <Label htmlFor={`edit-course-${index}`}>Course {index + 1}</Label>
                        {currentEducation.courses.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemoveCourse(index, false)}
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Input
                        id={`edit-course-${index}`}
                        value={course.name}
                        onChange={(e) => handleCourseChange('name', e.target.value, index, false)}
                        placeholder="Course name"
                      />
                      <Input
                        value={course.link || ''}
                        onChange={(e) => handleCourseChange('link', e.target.value, index, false)}
                        placeholder="Certificate link (optional)"
                      />
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
            <DialogTitle>Add New Education</DialogTitle>
            <DialogDescription>
              Add a new education provider and courses.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="add-provider">Provider</Label>
              <Input 
                id="add-provider" 
                value={newEducation.provider} 
                onChange={(e) => setNewEducation({...newEducation, provider: e.target.value})}
                placeholder="e.g., Coursera, Udemy"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-image">Provider Image URL</Label>
              <Input 
                id="add-image" 
                value={newEducation.imageUrl} 
                onChange={(e) => setNewEducation({...newEducation, imageUrl: e.target.value})}
                placeholder="URL to provider image (optional)"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Courses</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleAddCourse(true)}
                  className="h-7 px-2"
                >
                  <PlusCircle className="h-3.5 w-3.5 mr-1" /> Add Course
                </Button>
              </div>
              <div className="space-y-4">
                {newEducation.courses.map((course, index) => (
                  <div key={index} className="space-y-2 border border-gray-200 p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <Label htmlFor={`add-course-${index}`}>Course {index + 1}</Label>
                      {newEducation.courses.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveCourse(index, true)}
                          className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      id={`add-course-${index}`}
                      value={course.name}
                      onChange={(e) => handleCourseChange('name', e.target.value, index, true)}
                      placeholder="Course name"
                    />
                    <Input
                      value={course.link}
                      onChange={(e) => handleCourseChange('link', e.target.value, index, true)}
                      placeholder="Certificate link (optional)"
                    />
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
                setNewEducation({
                  provider: '',
                  imageUrl: '',
                  courses: [{ name: '', link: '' }]
                });
              }}
            >
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleAddEducation} className="bg-theme-purple hover:bg-theme-purple/90">
              <Plus className="h-4 w-4 mr-2" /> Add Education
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Education</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this education entry? This action cannot be undone.
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
