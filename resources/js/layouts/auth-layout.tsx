import React from "react";
import { Head } from "@inertiajs/react";

import BaseLayout from "@/layouts/base-layout";
import AppSidebar from "@/layouts/app-sidebar";
import Topbar from "@/layouts/topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ScrollToTop from "@/components/scroll-to-top";

interface AuthLayoutProps extends React.PropsWithChildren {
    title: string;
}

function AuthLayout({ children, title }: AuthLayoutProps) {
    return (
        <BaseLayout>
            <Head title={title} />

            <SidebarProvider>
                <AppSidebar />
                <main className="w-full space-y-5 p-5 overflow-x-hidden bg-background">
                    <Topbar />
                    {children}
                    <ScrollToTop />
                </main>
            </SidebarProvider>
        </BaseLayout>
    );
}

export default AuthLayout;
