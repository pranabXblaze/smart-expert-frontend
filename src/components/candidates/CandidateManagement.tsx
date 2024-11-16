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
import { UserPlus, Search, GraduationCap, Briefcase } from 'lucide-react';
import type { Candidate } from '@/types';

export default function CandidateManagement() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddCandidate = (candidate: Partial<Candidate>) => {
    const newCandidate: Candidate = {
      id: Date.now().toString(),
      email: candidate.email || '',
      name: candidate.name || '',
      role: 'candidate',
      createdAt: new Date(),
      specialization: candidate.specialization || [],
      education: candidate.education || [],
      experience: candidate.experience || 0,
      researchArea: candidate.researchArea || [],
    };
    setCandidates([...candidates, newCandidate]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Candidate Management
          </h2>
          <p className="text-muted-foreground">
            Manage and track interview candidates
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Candidate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Candidate</DialogTitle>
              <DialogDescription>
                Enter the candidate's details to add them to the system
              </DialogDescription>
            </DialogHeader>
            <CandidateForm onSubmit={handleAddCandidate} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search candidates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <ScrollArea className="h-[600px]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{candidate.name}</CardTitle>
        <CardDescription>{candidate.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span>{candidate.education[0]?.degree}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span>{candidate.experience} years experience</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CandidateForm({
  onSubmit,
}: {
  onSubmit: (data: Partial<Candidate>) => void;
}) {
  const [formData, setFormData] = useState<Partial<Candidate>>({
    name: '',
    email: '',
    specialization: [],
    experience: 0,
    education: [],
    researchArea: [],
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
      <Button type="submit">Add Candidate</Button>
    </form>
  );
}