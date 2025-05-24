import React from 'react';
import { Maximize, Minimize, RefreshCcw } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
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

function RefreshTrigger() {
    // events
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn('h-7 w-7 transition-transform duration-150')}
            onClick={handleRefresh}
        >
            <RefreshCcw />
            <span className="sr-only">Reload Page</span>
        </Button>
    );
}

function Topbar() {
    return (
        <header className="w-full px-4 py-2 h-14 flex items-center justify-between bg-card rounded-md shadow-sm border">
            <div className="flex items-center gap-3">
                <SidebarTrigger />
            </div>

            <div className="flex items-center justify-center gap-3">
                <ToggleTheme />
                <FullscreenTrigger />
                <RefreshTrigger />
            </div>
        </header>
    );
}

export default Topbar;
