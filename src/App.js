import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InterviewForm } from './components/InterviewForm';
import { Toaster } from "./components/ui/toaster";
import { Dashboard } from "./components/Dashboard";
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs("div", { className: "min-h-full w-full flex flex-col items-center justify-center", children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/schedule", element: _jsx(InterviewForm, {}) })] }), _jsx(Toaster, {})] }) }));
}
