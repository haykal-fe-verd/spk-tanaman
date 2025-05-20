import React from "react";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

type CardDashboardProps = {
    title: string;
    Icon: LucideIcon;
    desc: string;
    value: string;
    className?: string;
};

function CardDashboard({
    title,
    Icon,
    desc,
    value,
    className,
}: CardDashboardProps) {
    return (
        <Card className={cn("", className)}>
            <CardContent className="p-5 space-y-3">
                <div className="w-full items-center flex justify-between">
                    <h4 className="text-sm capitalize leading-relaxed text-muted-foreground font-semibold">
                        {title}
                    </h4>
                    <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold">{value}</h2>
                    <p className="text-xs leading-none text-muted-foreground">
                        {desc}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export default CardDashboard;
