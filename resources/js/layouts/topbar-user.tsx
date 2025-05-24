import React from 'react';
import {
    LayoutDashboard,
    LogOut,
    LucideIcon,
    MapPinned,
    Maximize,
    Minimize,
    RefreshCcw,
    SquareAsterisk,
    UserPen,
} from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

import { cn, getInitial } from '@/lib/utils';
import { PageProps } from '@/types';

import { Button } from '@/components/ui/button';
import ToggleTheme from '@/components/toggle-theme';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

function UserDropdown() {
    // hooks
    const { auth, ziggy } = usePage<PageProps>().props;
    const currentPath = new URL(ziggy.location).pathname;

    // states
    const linksData: { name: string; url: string; icon: LucideIcon }[] = [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            name: 'Lahan',
            url: '/lahan',
            icon: MapPinned,
        },
        {
            name: 'Profile',
            url: '/profile',
            icon: UserPen,
        },
        {
            name: 'Ganti Password',
            url: '/ganti-password',
            icon: SquareAsterisk,
        },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 rounded-lg hover:cursor-pointer">
                    <AvatarImage src={auth?.user?.avatar} alt={`@${auth?.user?.name}`} />
                    <AvatarFallback className="rounded-lg">
                        {getInitial(auth?.user?.name)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={auth?.user?.avatar} alt={`@${auth?.user?.name}`} />
                            <AvatarFallback className="rounded-lg">
                                {getInitial(auth?.user?.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{auth?.user?.name}</span>
                            <span className="truncate text-[8px]">{auth?.user?.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {linksData.map((item, index) => {
                        const isActive =
                            currentPath.startsWith(item.url) || currentPath === item.url;

                        return (
                            <DropdownMenuItem
                                key={index}
                                className={cn(isActive && 'bg-accent text-accent-foreground')}
                                asChild
                            >
                                <Link href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.name}</span>
                                </Link>
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link
                            href={route('logout')}
                            as="button"
                            method="post"
                            className="w-full bg-destructive text-destructive-foreground "
                        >
                            <LogOut />
                            Logout
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function TopbarUser() {
    return (
        <header className="w-full px-2 py-2 h-14 flex items-center justify-between bg-card rounded-md shadow-sm border">
            {/* kiri */}
            <div className="flex items-center gap-3">
                <Button size="sm" variant="link">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary ">
                        <Icons.Logo className="size-8 fill-primary-foreground" />
                    </div>
                    <div className="hidden lg:grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold uppercase">
                            {import.meta.env.VITE_APP_SHORT_NAME}
                        </span>
                        <span className="truncate text-xs">
                            Versi {import.meta.env.VITE_APP_VERSION}
                        </span>
                    </div>
                </Button>
            </div>

            {/* kanan */}
            <div className="flex items-center justify-center gap-3">
                <ToggleTheme />
                <FullscreenTrigger />
                <RefreshTrigger />
                <UserDropdown />
            </div>
        </header>
    );
}

export default TopbarUser;
