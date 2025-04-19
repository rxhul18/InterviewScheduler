"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";
export function TimePickerDemo({ date, setDate }) {
    const minuteRef = React.useRef(null);
    const hourRef = React.useRef(null);
    const secondRef = React.useRef(null);
    return (_jsxs("div", { className: "flex items-end gap-2", children: [_jsxs("div", { className: "grid gap-1 text-center", children: [_jsx(Label, { htmlFor: "hours", className: "text-xs", children: "Hours" }), _jsx(TimePickerInput, { picker: "hours", date: date, setDate: setDate, ref: hourRef, onRightFocus: () => minuteRef.current?.focus() })] }), _jsxs("div", { className: "grid gap-1 text-center", children: [_jsx(Label, { htmlFor: "minutes", className: "text-xs", children: "Minutes" }), _jsx(TimePickerInput, { picker: "minutes", date: date, setDate: setDate, ref: minuteRef, onLeftFocus: () => hourRef.current?.focus(), onRightFocus: () => secondRef.current?.focus() })] }), _jsx("div", { className: "flex h-10 items-center", children: _jsx(Clock, { className: "ml-2 h-4 w-4" }) })] }));
}
