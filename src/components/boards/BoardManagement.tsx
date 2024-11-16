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
import {
  CalendarDays,
  Users,
  Search,
  PlusCircle,
  GraduationCap,
} from 'lucide-react';
import type { InterviewBoard } from '@/types';

export default function BoardManagement() {
  const [boards, setBoards] = useState<InterviewBoard[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddBoard = (board: Partial<InterviewBoard>) => {
    const newBoard: InterviewBoard = {
      id: Date.now().toString(),
      name: board.name || '',
      requiredSpecializations: board.requiredSpecializations || [],
      date: board.date || new Date(),
      candidates: [],
      experts: [],
      status: 'pending',
    };
    setBoards([...boards, newBoard]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Board Management</h2>
          <p className="text-muted-foreground">
            Configure and manage interview boards
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Board
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Board</DialogTitle>
              <DialogDescription>
                Set up a new interview board with required specializations
              </DialogDescription>
            </DialogHeader>
            <BoardForm onSubmit={handleAddBoard} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search boards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <ScrollArea className="h-[600px]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function BoardCard({ board }: { board: InterviewBoard }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{board.name}</CardTitle>
        <CardDescription>
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-4 w-4" />
            <span>{new Date(board.date).toLocaleDateString()}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span>
              {board.requiredSpecializations.join(', ') ||
                'No specializations set'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {board.experts.length} experts, {board.candidates.length} candidates
            </span>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BoardForm({
  onSubmit,
}: {
  onSubmit: (data: Partial<InterviewBoard>) => void;
}) {
  const [formData, setFormData] = useState<Partial<InterviewBoard>>({
    name: '',
    requiredSpecializations: [],
    date: new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Board Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Interview Date</Label>
        <Input
          id="date"
          type="date"
          onChange={(e) =>
            setFormData({ ...formData, date: new Date(e.target.value) })
          }
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="specializations">Required Specializations</Label>
        <Input
          id="specializations"
          placeholder="Enter specializations separated by commas"
          onChange={(e) =>
            setFormData({
              ...formData,
              requiredSpecializations: e.target.value.split(',').map((s) => s.trim()),
            })
          }
          required
        />
      </div>
      <Button type="submit">Create Board</Button>
    </form>
  );
}