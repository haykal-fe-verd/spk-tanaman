import React from 'react';
import { usePage } from '@inertiajs/react';

import { PageProps } from '@/types';

import AdminDashboard from './admin';
import UserDashboard from './user';

interface DashboardPageProps {
    // admin
    statisticAdmin: {
        tanaman: number;
        kriteria: number;
        sub_kriteria: number;
        pengguna: number;
    };
    chartAdmin: { month: string; user: number; fill: string }[];

    // user
    statisticUser: {
        tanaman: number;
        kriteria: number;
        lahan: number;
        riwayat_tanam: number;
    };
    chartUser: { month: string; total: number }[];
    chartTanaman: { name: string; value: number }[];
}

function DashboardPage({
    statisticAdmin,
    chartAdmin,
    statisticUser,
    chartUser,
    chartTanaman,
}: DashboardPageProps) {
    // hooks
    const { auth } = usePage<PageProps>().props;

    // states
    const role = auth.user.role;

    if (role === 'admin')
        return <AdminDashboard statisticAdmin={statisticAdmin} chartAdmin={chartAdmin} />;

    return (
        <UserDashboard
            statisticUser={statisticUser}
            chartUser={chartUser}
            chartTanaman={chartTanaman}
        />
    );
}

export default DashboardPage;
