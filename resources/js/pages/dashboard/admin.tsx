import React from 'react';
import { List, ListStart, Sprout, UsersRound } from 'lucide-react';
import AuthLayout from '@/layouts/auth-layout';
import CardDashboard from '@/components/card-dashboard';

function AdminDashboard() {
    const data = [
        {
            title: 'Jumlah Tanaman',
            icon: Sprout,
            desc: 'tanaman',
            value: '10',
        },
        {
            title: 'Jumlah Kriteria',
            icon: List,
            desc: 'kriteria',
            value: '36',
        },
        {
            title: 'Jumlah Sub Kriteria',
            icon: ListStart,
            desc: 'sub  kriteria',
            value: '587',
        },
        {
            title: 'Jumlah Pengguna',
            icon: UsersRound,
            desc: 'pengguna',
            value: '3410',
        },
    ];

    return (
        <AuthLayout title="Dashboard">
            <div className="space-y-5">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <div className="justify-center px-3 py-1 text-sm font-medium capitalize rounded-md bg-primary/20 text-primary ">
                        Rabu, 15 Agustus 2023
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                        {data.map((item, index) => (
                            <CardDashboard
                                key={index}
                                title={item.title}
                                Icon={item.icon}
                                desc={item.desc}
                                value={item.value}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default AdminDashboard;
