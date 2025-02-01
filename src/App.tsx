import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InterviewForm } from './components/InterviewForm';
import { Toaster } from "./components/ui/toaster";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
        <div className="min-h-full w-full flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<InterviewForm />} />
          </Routes>
          <Toaster />
        </div>
    </BrowserRouter>
  )
}
