import React from "react";
import { Head } from "@inertiajs/react";

import BaseLayout from "@/layouts/base-layout";

interface GuestLayoutProps extends React.PropsWithChildren {
    title: string;
}

function GuestLayout({ children, title }: GuestLayoutProps) {
    return (
        <BaseLayout>
            <Head title={title} />
            <main>{children}</main>
        </BaseLayout>
    );
}

export default GuestLayout;
