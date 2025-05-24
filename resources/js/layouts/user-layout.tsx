import React from 'react';
import { Head } from '@inertiajs/react';

import BaseLayout from '@/layouts/base-layout';
import TopbarUser from '@/layouts/topbar-user';
import ScrollToTop from '@/components/scroll-to-top';

interface UserLayoutProps extends React.PropsWithChildren {
    title: string;
}

function UserLayout({ children, title }: UserLayoutProps) {
    return (
        <BaseLayout>
            <Head title={title} />

            <main className="w-full space-y-5 p-5 overflow-x-hidden bg-background">
                <TopbarUser />
                {children}
                <ScrollToTop />
            </main>
        </BaseLayout>
    );
}

export default UserLayout;
