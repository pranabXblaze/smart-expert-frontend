import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserPlus, Search, GraduationCap, Award, BookOpen } from 'lucide-react';
import type { Expert } from '@/types';

export default function ExpertManagement() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddExpert = (expert: Partial<Expert>) => {
    const newExpert: Expert = {
      id: Date.now().toString(),
      email: expert.email || '',
      name: expert.name || '',
      role: 'expert',
      createdAt: new Date(),
      specialization: expert.specialization || [],
      experience: expert.experience || 0,
      education: expert.education || [],
      publications: expert.publications || [],
      skills: expert.skills || [],
      previousBoards: [],
    };
    setExperts([...experts, newExpert]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expert Management</h2>
          <p className="text-muted-foreground">
            Manage and track subject matter experts for interview boards
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Expert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Expert</DialogTitle>
              <DialogDescription>
                Enter the expert's details to add them to the system
              </DialogDescription>
            </DialogHeader>
            <ExpertForm onSubmit={handleAddExpert} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search experts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <ScrollArea className="h-[600px]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{expert.name}</CardTitle>
        <CardDescription>{expert.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span>{expert.education[0]?.degree}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <span>{expert.experience} years experience</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{expert.publications.length} publications</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ExpertForm({ onSubmit }: { onSubmit: (data: Partial<Expert>) => void }) {
  const [formData, setFormData] = useState<Partial<Expert>>({
    name: '',
    email: '',
    specialization: [],
    experience: 0,
    education: [],
    publications: [],
    skills: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience</Label>
        <Input
          id="experience"
          type="number"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: Number(e.target.value) })
          }
          required
        />
      </div>
      <Button type="submit">Add Expert</Button>
    </form>
  );
}