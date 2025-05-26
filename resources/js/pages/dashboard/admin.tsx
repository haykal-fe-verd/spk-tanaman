import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { List, ListStart, Sprout, UsersRound } from 'lucide-react';

import AuthLayout from '@/layouts/auth-layout';
import CardDashboard from '@/components/card-dashboard';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminDashboardProps {
    statisticAdmin: {
        tanaman: number;
        kriteria: number;
        sub_kriteria: number;
        pengguna: number;
    };
    chartAdmin: { month: string; user: number }[];
}

function AdminDashboard({ statisticAdmin, chartAdmin }: AdminDashboardProps) {
    const data = [
        {
            title: 'Jumlah Tanaman',
            icon: Sprout,
            desc: 'tanaman',
            value: statisticAdmin.tanaman,
        },
        {
            title: 'Jumlah Kriteria',
            icon: List,
            desc: 'kriteria',
            value: statisticAdmin.kriteria,
        },
        {
            title: 'Jumlah Sub Kriteria',
            icon: ListStart,
            desc: 'sub  kriteria',
            value: statisticAdmin.sub_kriteria,
        },
        {
            title: 'Jumlah Pengguna',
            icon: UsersRound,
            desc: 'pengguna',
            value: statisticAdmin.pengguna,
        },
    ];

    const chartData = chartAdmin;

    const chartConfig = {
        user: {
            label: 'Petani',
            color: 'hsl(var(--chart-1))',
        },
    } satisfies ChartConfig;

    return (
        <AuthLayout title="Dashboard">
            <div className="space-y-5">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <div className="justify-center px-3 py-1 text-sm font-medium capitalize rounded-md bg-primary/20 text-primary ">
                        {new Date().toLocaleDateString('id-ID', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
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
                                value={item.value.toString()}
                            />
                        ))}
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Grafik Pengguna</CardTitle>
                            <CardDescription>
                                Menampilkan grafik pengguna berdasarkan bulan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={value => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="line" />}
                                    />
                                    <Area
                                        dataKey="user"
                                        type="natural"
                                        fill="var(--color-user)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-user)"
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthLayout>
    );
}

export default AdminDashboard;
