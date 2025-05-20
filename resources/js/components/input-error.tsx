import React from "react";

import { cn } from "@/lib/utils";

interface InputErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

export default function InputError({
    message,
    className = "",
    ...props
}: InputErrorProps) {
    return message ? (
        <p
            {...props}
            className={cn("mt-1 text-sm text-destructive", className)}
        >
            {message}
        </p>
    ) : null;
}
