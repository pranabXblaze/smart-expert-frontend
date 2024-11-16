import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Users,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from 'lucide-react';
import type { Expert, InterviewBoard, MatchingScore } from '@/types';

export default function MatchingSystem() {
  const [selectedBoard, setSelectedBoard] = useState<string>('');
  const [matchingResults, setMatchingResults] = useState<MatchingScore[]>([]);

  // Mock data for demonstration
  const boards: InterviewBoard[] = [
    {
      id: '1',
      name: 'Computer Science Panel',
      requiredSpecializations: ['AI/ML', 'Cybersecurity'],
      date: new Date('2024-03-25'),
      candidates: ['1', '2'],
      experts: [],
      status: 'pending',
    },
  ];

  const experts: Expert[] = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      email: 'sarah@example.com',
      role: 'expert',
      createdAt: new Date(),
      specialization: ['AI/ML', 'Data Science'],
      experience: 10,
      education: [
        {
          degree: 'Ph.D. in Computer Science',
          institution: 'MIT',
          year: 2015,
        },
      ],
      publications: ['AI in Defense', 'ML Applications'],
      skills: ['Python', 'TensorFlow'],
      previousBoards: ['board1', 'board2'],
      relevancyScore: 0.92,
    },
  ];

  const handleMatch = () => {
    // Simplified matching algorithm for demonstration
    const results: MatchingScore[] = experts.map((expert) => ({
      expertId: expert.id,
      boardId: selectedBoard,
      score: Math.random() * 0.4 + 0.6, // Random score between 0.6 and 1.0
      breakdown: {
        specializationMatch: Math.random(),
        experienceScore: Math.random(),
        educationScore: Math.random(),
        previousPerformance: Math.random(),
      },
    }));

    setMatchingResults(results.sort((a, b) => b.score - a.score));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Matching System</h2>
        <p className="text-muted-foreground">
          Match experts with interview boards based on relevancy
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configure Matching</CardTitle>
          <CardDescription>
            Select an interview board to find matching experts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Select
              value={selectedBoard}
              onValueChange={setSelectedBoard}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select interview board" />
              </SelectTrigger>
              <SelectContent>
                {boards.map((board) => (
                  <SelectItem key={board.id} value={board.id}>
                    {board.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleMatch}
              disabled={!selectedBoard}
              className="space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Find Matches</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {matchingResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Matching Results</CardTitle>
            <CardDescription>
              Experts ranked by relevancy score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Expert</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead className="text-right">Match Score</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matchingResults.map((result) => {
                    const expert = experts.find((e) => e.id === result.expertId);
                    if (!expert) return null;

                    return (
                      <TableRow key={result.expertId}>
                        <TableCell className="font-medium">
                          {expert.name}
                        </TableCell>
                        <TableCell>
                          {expert.specialization.join(', ')}
                        </TableCell>
                        <TableCell>{expert.experience} years</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            <span
                              className={
                                result.score >= 0.8
                                  ? 'text-green-600'
                                  : 'text-yellow-600'
                              }
                            >
                              {(result.score * 100).toFixed(1)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {result.score >= 0.8 ? (
                            <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-600 ml-auto" />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}