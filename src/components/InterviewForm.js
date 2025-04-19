import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useInterviewStore } from '@/lib/store';
import InterviewCalendar from './InterviewCalendar';
import { TimePickerDemo } from './timepicker/time-picker-demo';
export function InterviewForm() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const addInterview = useInterviewStore((state) => state.addInterview);
    const [date, setDate] = useState();
    const [formData, setFormData] = useState({
        candidateName: '',
        interviewerName: '',
        type: '',
    });
    const interviews = JSON.parse(localStorage.getItem('interviews') || '[]');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!date) {
            toast({
                title: 'Error',
                description: 'Please select a date',
                variant: 'destructive',
            });
            return;
        }
        const interview = {
            id: crypto.randomUUID(),
            dateTime: date.toISOString(),
            ...formData,
        };
        addInterview(interview);
        interviews.push(interview);
        localStorage.setItem('interviews', JSON.stringify(interviews));
        toast({
            title: 'Success',
            description: 'Interview scheduled successfully',
        });
        navigate('/');
    };
    return (_jsx("form", { onSubmit: handleSubmit, className: "space-y-6 max-w-md mx-auto p-6", children: _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { placeholder: "Candidate Name", value: formData.candidateName, onChange: (e) => setFormData({ ...formData, candidateName: e.target.value }), required: true }), _jsx(Input, { placeholder: "Interviewer Name", value: formData.interviewerName, onChange: (e) => setFormData({ ...formData, interviewerName: e.target.value }), required: true }), _jsxs(Select, { value: formData.type, onValueChange: (value) => setFormData({ ...formData, type: value }), required: true, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select Interview Type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "TECHNICAL", children: "Technical" }), _jsx(SelectItem, { value: "HR", children: "HR" }), _jsx(SelectItem, { value: "BEHAVIORAL", children: "Behavioral" })] })] }), _jsx(InterviewCalendar, { date: date ?? new Date(), onSelect: setDate }), _jsx(TimePickerDemo, { date: date, setDate: setDate }), _jsx(Button, { type: "submit", className: "w-full", children: "Schedule Interview" })] }) }));
}
