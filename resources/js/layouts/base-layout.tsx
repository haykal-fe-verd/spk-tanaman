import React from "react";
import { usePage } from "@inertiajs/react";

import { PageProps } from "@/types";

import { ThemeProvider } from "@/components/theme-provider";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

function BaseLayout({ children }: React.PropsWithChildren) {
    // hooks
    const { flash, status } = usePage<PageProps>().props;

    // effects
    React.useEffect(() => {
        if (status) {
            toast(status);
        }

        if (flash?.success) {
            toast.success("Berhasil", {
                description: flash.success,
            });
        }

        if (flash?.error) {
            toast.error("Oops", {
                description: flash.error,
            });
        }
    }, [flash?.error, flash?.success, status]);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div>
                {children}
                <Toaster position="top-right" expand={true} richColors />
            </div>
        </ThemeProvider>
    );
}

export default BaseLayout;
