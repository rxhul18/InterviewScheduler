import { create } from "zustand";
export const useInterviewStore = create((set) => ({
    interviews: [],
    loadInterviews: () => {
        const storedInterviews = localStorage.getItem('interviews');
        if (storedInterviews) {
            set({ interviews: JSON.parse(storedInterviews) });
        }
    },
    addInterview: (interview) => set((state) => ({
        interviews: [...state.interviews, interview]
    })),
    deleteInterview: (id) => set((state) => ({
        interviews: state.interviews.filter((interview) => interview.id !== id)
    }))
}));
