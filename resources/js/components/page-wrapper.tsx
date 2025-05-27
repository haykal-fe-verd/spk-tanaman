import { LucideIcon, StepBack } from 'lucide-react';

import { cn, formatTitle } from '@/lib/utils';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PageWrapperProps {
    Icon: LucideIcon;
    title: string;
    children: React.ReactNode;
    isBack?: boolean;
}

function PageWrapper({ Icon, children, title, isBack = false }: PageWrapperProps) {
    return (
        <section id={formatTitle(title)}>
            <Card className={cn('rounded-md')}>
                <CardHeader>
                    <CardTitle className={cn('flex items-center gap-3')}>
                        <Icon className="w-5 h-5" />
                        <span className="capitalize">{title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className={cn('w-full flex flex-col gap-5')}>
                    {isBack && (
                        <Button
                            size="sm"
                            variant="destructive"
                            className="w-fit inline-flex items-center gap-2"
                            onClick={() => window.history.back()}
                        >
                            <StepBack />
                            Kembali
                        </Button>
                    )}

                    {children}
                </CardContent>
            </Card>
        </section>
    );
}

export default PageWrapper;
