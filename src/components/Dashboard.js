import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useInterviewStore } from '@/lib/store';
import { Calendar as CalendarIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InterviewCalendar from './InterviewCalendar';
export function Dashboard() {
    const { toast } = useToast();
    const [date, setDate] = useState(new Date());
    const { interviews, deleteInterview } = useInterviewStore();
    const handleDelete = (id) => {
        const interviews = localStorage.getItem("interviews");
        if (!interviews)
            return;
        const data = JSON.parse(interviews);
        // Find index of the item with the given id
        const index = data.findIndex((interviews) => interviews.id === id);
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
        return (interviewDate.getDate() === date?.getDate() &&
            interviewDate.getMonth() === date?.getMonth() &&
            interviewDate.getFullYear() === date?.getFullYear());
    });
    return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Interview Dashboard" }), _jsx(Button, { asChild: true, children: _jsx(Link, { to: "/schedule", children: "Schedule Interview" }) })] }), _jsxs("div", { className: "flex flex-col md:grid grid-cols-[100%_1fr] md:grid-cols-[400px_1fr] gap-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Calendar" }), _jsx(CardDescription, { children: "Select a date to view interviews" })] }), _jsx(CardContent, { className: 'flex justify-center', children: _jsx(InterviewCalendar, { date: date, onSelect: (newDate) => newDate && setDate(newDate) }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Scheduled Interviews" }), _jsx(CardDescription, { children: date?.toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        }) })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: filteredInterviews.length === 0 ? (_jsx("p", { className: "text-muted-foreground text-center py-4", children: "No interviews scheduled for this date" })) : (filteredInterviews.map((interview) => (_jsx(Card, { children: _jsxs(CardContent, { className: "flex items-center justify-between p-4", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: interview.candidateName }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["with ", interview.interviewerName] }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(CalendarIcon, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: new Date(interview.dateTime).toLocaleTimeString() }), _jsx("span", { className: "text-sm bg-secondary px-2 py-0.5 rounded", children: interview.type })] })] }), _jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(Button, { variant: "destructive", size: "icon", children: _jsx(Trash2, { className: "w-4 h-4" }) }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Delete Interview?" }), _jsx(AlertDialogDescription, { children: "This action cannot be undone." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { onClick: () => handleDelete(interview.id), children: "Delete" })] })] })] })] }) }, interview.id)))) }) })] })] })] }));
}
