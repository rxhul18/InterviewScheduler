import { create } from "zustand";
import { Interview } from "./types";

interface InterviewStore {
    interviews: Interview[];
    addInterview: (interview: Interview) => void;
    deleteInterview: (id: string) => void;
}

export const useInterviewStore = create<InterviewStore>((set)=>({
    interviews: [],
    addInterview: (interview) => set((state)=>({
        interviews: [...state.interviews, interview]
    })),
    deleteInterview: (id) => set((state)=>({
        interviews: state.interviews.filter((interview)=>interview.id !== id)
    }))
    
}))