export type InterviewType = 'TECHNICAL' | 'HR' | 'BEHAVIORAL';

export interface Interview {
    id: string;
    candidateName: string;
    interviewerName: string;
    dateTime: string
    type: InterviewType;
}

export interface TimeSlot {
    start: string;
    end: string;
    available: boolean;
}