import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from './components/Dashboard';
import { InterviewForm } from './components/InterviewForm';
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schedule" element={<InterviewForm />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}
