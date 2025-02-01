import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useInterviewStore } from '@/lib/store';
import { InterviewType } from '@/lib/types';
import InterviewCalendar from './InterviewCalendar';
import { TimePickerDemo } from './timepicker/time-picker-demo';

export function InterviewForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const addInterview = useInterviewStore((state) => state.addInterview);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    candidateName: '',
    interviewerName: '',
    type: '' as InterviewType,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast({
        title: 'Error',
        description: 'Please select a date',
        variant: 'destructive',
      });
      return;
    }

    console.log('formData', formData);

    console.log('formData', date);
    const interview = {
      id: crypto.randomUUID(),
      dateTime: date.toISOString(),
      ...formData,
    };

    addInterview(interview);
    toast({
      title: 'Success',
      description: 'Interview scheduled successfully',
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
      <div className="space-y-4">
        <Input
          placeholder="Candidate Name"
          value={formData.candidateName}
          onChange={(e) =>
            setFormData({ ...formData, candidateName: e.target.value })
          }
          required
        />
        <Input
          placeholder="Interviewer Name"
          value={formData.interviewerName}
          onChange={(e) =>
            setFormData({ ...formData, interviewerName: e.target.value })
          }
          required
        />
        <Select
          value={formData.type}
          onValueChange={(value) =>
            setFormData({ ...formData, type: value as InterviewType })
          }
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Interview Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TECHNICAL">Technical</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
            <SelectItem value="BEHAVIORAL">Behavioral</SelectItem>
          </SelectContent>
        </Select>
        <InterviewCalendar date={date ?? new Date()} onSelect={setDate} />
        <TimePickerDemo date={date} setDate={setDate} />
        <Button type="submit" className="w-full">
          Schedule Interview
        </Button>
      </div>
    </form>
  );
}