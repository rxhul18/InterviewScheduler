import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InterviewForm } from './components/InterviewForm';
import { Toaster } from "./components/ui/toaster";
import { Dashboard } from "./components/Dashboard";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
        <div className="min-h-[92vh] w-full flex flex-col justify-center bg-white">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<InterviewForm />} />
          </Routes>
          <Toaster />
        </div>
        <Footer />
    </BrowserRouter>
  )
}
