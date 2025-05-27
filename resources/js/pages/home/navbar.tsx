import React from 'react';
import { Link } from '@inertiajs/react';
import { LogIn, Maximize, Minimize } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import ToggleTheme from '@/components/toggle-theme';

function FullscreenTrigger() {
    const [isFullscreen, setIsFullscreen] = React.useState<boolean>(() =>
        Boolean(document.fullscreenElement)
    );

    React.useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false));
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn('h-7 w-7 transition-transform duration-150')}
            onClick={toggleFullscreen}
        >
            {isFullscreen ? <Minimize /> : <Maximize />}
            <span className="sr-only">Toggle Fullscreen</span>
        </Button>
    );
}

function Navbar() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-card backdrop-blur-sm border-b py-4 px-6 flex justify-between items-center">
            <Link href={route('home')}>
                <Button size="sm" variant="link">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary ">
                        <Icons.Logo className="size-8 fill-primary-foreground" />
                    </div>
                    <div className="hidden lg:grid flex-1 text-left text-sm leading-tight ">
                        <span className="truncate font-semibold uppercase">
                            {import.meta.env.VITE_APP_SHORT_NAME}
                        </span>
                        <span className="truncate text-xs">
                            Versi {import.meta.env.VITE_APP_VERSION}
                        </span>
                    </div>
                </Button>
            </Link>
            <nav className="space-x-4">
                <Link href="#features" className="hover:underline">
                    Fitur
                </Link>
                <Link href="#about" className="hover:underline">
                    Tentang
                </Link>
                <Link href="#contact" className="hover:underline">
                    Kontak
                </Link>
            </nav>

            <div className="flex gap-2">
                <FullscreenTrigger />
                <ToggleTheme />
                <Link href={route('login')}>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                        <LogIn />
                    </Button>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;
