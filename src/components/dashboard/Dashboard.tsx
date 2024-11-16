import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Users,
  UserPlus,
  Layout,
  PieChart,
  Activity,
  Calendar,
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Experts',
      value: '124',
      description: 'Active subject matter experts',
      icon: Users,
      trend: '+12% from last month',
    },
    {
      title: 'Active Boards',
      value: '8',
      description: 'Currently ongoing interviews',
      icon: Layout,
      trend: '+2 this week',
    },
    {
      title: 'Pending Candidates',
      value: '45',
      description: 'Awaiting interviews',
      icon: UserPlus,
      trend: '-5% from last week',
    },
    {
      title: 'Match Rate',
      value: '94%',
      description: 'Expert-board matching success',
      icon: PieChart,
      trend: '+3% improvement',
    },
  ];

  const recentActivities = [
    {
      type: 'board_created',
      message: 'New interview board created for Computer Science',
      time: '2 hours ago',
    },
    {
      type: 'expert_matched',
      message: 'Dr. Sarah Wilson matched with Aerospace board',
      time: '3 hours ago',
    },
    {
      type: 'candidate_added',
      message: '12 new candidates added to Electronics board',
      time: '5 hours ago',
    },
    {
      type: 'match_completed',
      message: 'Matching completed for Mechanical Engineering board',
      time: '1 day ago',
    },
  ];

  const upcomingInterviews = [
    {
      board: 'Computer Science Panel',
      date: '2024-03-25',
      candidates: 8,
      experts: 3,
    },
    {
      board: 'Electronics Engineering',
      date: '2024-03-26',
      candidates: 12,
      experts: 4,
    },
    {
      board: 'Mechanical Systems',
      date: '2024-03-28',
      candidates: 6,
      experts: 3,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of the Expert Matching System
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system updates and matches</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {recentActivities.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 border-b pb-3 last:border-0"
                  >
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>Scheduled interview boards</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {upcomingInterviews.map((interview, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 border-b pb-3 last:border-0"
                  >
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{interview.board}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(interview.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-xs text-right">
                      <p>{interview.candidates} candidates</p>
                      <p>{interview.experts} experts</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}