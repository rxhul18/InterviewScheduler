"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "../hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
const FormSchema = z.object({
    dob: z.date({
        required_error: "A date of birth is required.",
    }),
});
export function DatePickerForm() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
    });
    function onSubmit(data) {
        toast({
            title: "You submitted the following values:",
            description: (_jsx("pre", { className: "mt-2 w-[340px] rounded-md bg-slate-950 p-4", children: _jsx("code", { className: "text-white", children: JSON.stringify(data, null, 2) }) })),
        });
    }
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(FormField, { control: form.control, name: "dob", render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-col", children: [_jsx(FormLabel, { children: "Date of birth" }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(FormControl, { children: _jsxs(Button, { variant: "outline", className: cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground"), children: [field.value ? (format(field.value, "PPP")) : (_jsx("span", { children: "Pick a date" })), _jsx(CalendarIcon, { className: "ml-auto h-4 w-4 opacity-50" })] }) }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: field.value, onSelect: field.onChange, 
                                            // disabled={(date) =>
                                            //   date > new Date() || date < new Date("1900-01-01")
                                            // }
                                            initialFocus: true }) })] }), _jsx(FormDescription, { children: "Your date of birth is used to calculate your age." }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", children: "Submit" })] }) }));
}
