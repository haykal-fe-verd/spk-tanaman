import React from 'react';
import { usePage } from '@inertiajs/react';

import { PageProps } from '@/types';

import AdminDashboard from './admin';
import UserDashboard from './user';

function DashboardPage() {
    // hooks
    const { auth } = usePage<PageProps>().props;

    // states
    const role = auth.user.role;

    if (role === 'admin') return <AdminDashboard />;

    return <UserDashboard />;
}

export default DashboardPage;
