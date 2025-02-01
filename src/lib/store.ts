import { create } from "zustand";
import { Interview } from "./types";

interface InterviewStore {
    interviews: Interview[];
    loadInterviews: () => void;
    addInterview: (interview: Interview) => void;
    deleteInterview: (id: string) => void;
}

export const useInterviewStore = create<InterviewStore>((set)=>({
    interviews: [],
    loadInterviews:()=>{
       const storedInterviews = localStorage.getItem('interviews');     
       if (storedInterviews) {
            set({interviews: JSON.parse(storedInterviews)});
       }
    },
    addInterview: (interview) => set((state)=>({
        interviews: [...state.interviews, interview]
    })),
    deleteInterview: (id) => set((state)=>({
        interviews: state.interviews.filter((interview)=>interview.id !== id)
    }))
}))