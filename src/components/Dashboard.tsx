import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useInterviewStore } from '@/lib/store';
import { Calendar as CalendarIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InterviewCalendar from './InterviewCalendar';


export function Dashboard() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const { interviews, deleteInterview } = useInterviewStore();

  const handleDelete = (id: string) => {
    const interviews = localStorage.getItem("interviews");
    if (!interviews) return;

    const data = JSON.parse(interviews);

    // Find index of the item with the given id
    const index = data.findIndex((interviews: { id: string; }) => interviews.id === id);
    if (index !== -1) {
        data.splice(index, 1); // Remove item at the found index
        localStorage.setItem("interviews", JSON.stringify(data));
    }
    deleteInterview(id);
    toast({
      title: 'Success',
      description: 'Interview deleted successfully',
    });
  };

  const filteredInterviews = interviews.filter((interview) => {
    const interviewDate = new Date(interview.dateTime);
    return (
      interviewDate.getDate() === date?.getDate() &&
      interviewDate.getMonth() === date?.getMonth() &&
      interviewDate.getFullYear() === date?.getFullYear()
    );
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Interview Dashboard</h1>
        <Button asChild>
          <Link to="/schedule">Schedule Interview</Link>
        </Button>
      </div>

      <div className="flex flex-col md:grid grid-cols-[100%_1fr] md:grid-cols-[400px_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view interviews</CardDescription>
          </CardHeader>
          <CardContent className='flex justify-center'>
            <InterviewCalendar date={date} onSelect={(newDate) => newDate && setDate(newDate)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Interviews</CardTitle>
            <CardDescription>
              {date?.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInterviews.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No interviews scheduled for this date
                </p>
              ) : (
                filteredInterviews.map((interview) => (
                  <Card key={interview.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-semibold">{interview.candidateName}</p>
                        <p className="text-sm text-muted-foreground">
                          with {interview.interviewerName}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span className="text-sm">
                            {new Date(interview.dateTime).toLocaleTimeString()}
                          </span>
                          <span className="text-sm bg-secondary px-2 py-0.5 rounded">
                            {interview.type}
                          </span>
                        </div>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Interview?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={()=>handleDelete(interview.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}