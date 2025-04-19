import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useInterviewStore } from "@/lib/store";
import { DayContent } from 'react-day-picker';
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { useEffect } from "react";
export default function InterviewCalendar({ date, onSelect }) {
    const interviews = useInterviewStore((state) => state.interviews);
    const { loadInterviews } = useInterviewStore();
    useEffect(() => {
        loadInterviews();
    }, []);
    //Get interviews for each day
    const getInterviewCount = (day) => {
        return interviews.filter((interview) => {
            const interviewDate = new Date(interview.dateTime);
            return (interviewDate.getDate() === day.getDate() &&
                interviewDate.getMonth() === day.getMonth() &&
                interviewDate.getFullYear() === day.getFullYear());
        }).length;
    };
    function customDay(props) {
        const count = getInterviewCount(props.date);
        return (_jsxs("div", { className: "relative", children: [_jsx(DayContent, { ...props }), count > 0 && (_jsx(Badge, { variant: "secondary", className: "absolute -top-2 -right-3 h-3 w-3 p-0 bg-orange-400 flex items-center justify-center text-[8px]", children: count }))] }));
    }
    return (_jsx(Calendar, { mode: "single", selected: date, onSelect: onSelect, className: "rounded-md border dark:text-white", components: {
            DayContent: customDay
        } }));
}
