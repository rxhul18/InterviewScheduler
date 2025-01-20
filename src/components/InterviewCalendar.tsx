import { useInterviewStore } from "@/lib/store";
import { DayContent, DayContentProps } from 'react-day-picker';
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";

interface InterviewCalendarProps {
    date: Date;
    onSelect: (date: Date | undefined) => void;
}

export default function InterviewCalendar({date, onSelect}: InterviewCalendarProps) {
    const interviews = useInterviewStore((state) => state.interviews);

    //Get interviews for each day
    const getInterviewCount = (day: Date) => {
        return interviews.filter((interview) => {
            const interviewDate = new Date(interview.dateTime);
            return (
                interviewDate.getDate() === day.getDate() &&
                interviewDate.getMonth() === day.getMonth() &&
                interviewDate.getFullYear() === day.getFullYear()
            )
        }).length;
    }

    function customDay(props: DayContentProps) {
        const count = getInterviewCount(props.date);
        return (
            <div className="relative">
                <DayContent {...props} />
                {count > 0 && (
                    <Badge
                        variant="secondary"
                        className="absolute -top-2 -right-3 h-3 w-3 p-0 bg-orange-400 flex items-center justify-center text-[8px]"
                    >
                        {count}
                    </Badge>
                )}
            </div>
        )
    }

    return (
        <Calendar 
            mode="single"
            selected={date}
            onSelect={onSelect}
            className="rounded-md border dark:text-white"
            components={{
                DayContent: customDay
            }}
        />
    )
}
