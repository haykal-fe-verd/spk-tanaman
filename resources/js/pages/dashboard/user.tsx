import React from 'react';

import UserLayout from '@/layouts/user-layout';

function UserDashboard() {
    return (
        <UserLayout title="Dashboard">
            <div className="space-y-5">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <div className="justify-center px-3 py-1 text-sm font-medium capitalize rounded-md bg-primary/20 text-primary ">
                        Rabu, 15 Agustus 2023
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">UserDashboard</div>
                </div>
            </div>
        </UserLayout>
    );
}

export default UserDashboard;
