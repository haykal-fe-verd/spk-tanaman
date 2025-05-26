import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, LabelList, Pie, PieChart } from 'recharts';

import UserLayout from '@/layouts/user-layout';
import { History, List, MapPinned, Sprout } from 'lucide-react';
import CardDashboard from '@/components/card-dashboard';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface UserDashboardProps {
    statisticUser: {
        tanaman: number;
        kriteria: number;
        lahan: number;
        riwayat_tanam: number;
    };
    chartUser: { month: string; total: number }[];
    chartTanaman: { name: string; value: number }[];
}
function UserDashboard({ statisticUser, chartUser, chartTanaman }: UserDashboardProps) {
    const data = [
        {
            title: 'Jumlah Tanaman',
            icon: Sprout,
            desc: 'tanaman',
            value: statisticUser.tanaman,
        },
        {
            title: 'Jumlah Kriteria',
            icon: List,
            desc: 'kriteria',
            value: statisticUser.kriteria,
        },
        {
            title: 'Lahan',
            icon: MapPinned,
            desc: 'lahan',
            value: statisticUser.lahan,
        },
        {
            title: 'Riwayat Tanam',
            icon: History,
            desc: 'riwayat tanam',
            value: statisticUser.riwayat_tanam,
        },
    ];

    const chartData = chartUser;

    const chartConfig = {
        riwayat: {
            label: 'Riwayat Tanam',
            color: 'hsl(var(--chart-1))',
        },
    } satisfies ChartConfig;

    const chartDataTanaman = chartTanaman;

    const chartConfigTanaman = {
        name: {
            label: 'Tanaman',
        },
        padi: {
            label: 'Padi',
            color: 'hsl(var(--chart-1))',
        },
        jagung: {
            label: 'Jagung',
            color: 'hsl(var(--chart-2))',
        },
        tembakau: {
            label: 'Tembakau',
            color: 'hsl(var(--chart-3))',
        },
        cabai_besar: {
            label: 'Cabai Besar',
            color: 'hsl(var(--chart-4))',
        },
        cabai_rawit: {
            label: 'Cabai Rawit',
            color: 'hsl(var(--chart-5))',
        },
        tomat: {
            label: 'Tomat',
            color: 'hsl(var(--chart-1))',
        },
        bawang_merah: {
            label: 'Bawang Merah',
            color: 'hsl(var(--chart-2))',
        },
    } satisfies ChartConfig;

    return (
        <UserLayout title="Dashboard">
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <Card className="col-span-1 lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Grafik Riwayat Tanam</CardTitle>
                                <CardDescription>
                                    Jumlah aktivitas tanam berdasarkan bulan.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-[400px] w-full">
                                    <BarChart accessibilityLayer data={chartData}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={value => value.slice(0, 3)}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Bar
                                            dataKey="total"
                                            fill="var(--color-riwayat)"
                                            radius={8}
                                        />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="col-span-1 lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Grafik Jenis Tanaman Paling Sering Ditanam</CardTitle>
                                <CardDescription>
                                    Visualisasi distribusi tanaman berdasarkan riwayat tanam.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={chartConfigTanaman}
                                    className="h-[400px] w-full"
                                >
                                    <PieChart>
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    nameKey="name"
                                                    hideLabel={false}
                                                />
                                            }
                                        />
                                        <Pie
                                            data={chartDataTanaman}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            label
                                        >
                                            <LabelList dataKey="name" position="outside" />
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

export default UserDashboard;
