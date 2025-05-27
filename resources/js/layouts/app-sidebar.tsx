import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, ChevronsUpDown, LogOut, SquareAsterisk, UserPen } from 'lucide-react';

import { PageProps } from '@/types';
import { getInitial, hasAccess } from '@/lib/utils';
import { Role } from '@/data/roles';
import { navigations } from '@/data/navigations';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';

function SidebarItem() {
    // hooks
    const { auth, ziggy } = usePage<PageProps>().props;

    //  states
    const currentPath = new URL(ziggy.location).pathname;
    const filteredNavigations = navigations.filter(item =>
        hasAccess(auth.user.role as Role, item.roles)
    );

    return (
        <SidebarGroup>
            <SidebarMenu className="overfl">
                {filteredNavigations.map(item => {
                    const isActive =
                        item.children?.some(subItem => subItem.url === currentPath) ||
                        currentPath.startsWith(item.url);

                    return item.children ? (
                        <Collapsible
                            key={item.name}
                            asChild
                            defaultOpen={isActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.name}>
                                        {item.icon && <item.icon />}
                                        <span>{item.name}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.children
                                            .filter(subItem =>
                                                hasAccess(auth.user.role as Role, subItem.roles)
                                            )
                                            .map(subItem => (
                                                <SidebarMenuSubItem key={subItem.name}>
                                                    <SidebarMenuSubButton
                                                        isActive={currentPath.startsWith(
                                                            subItem.url
                                                        )}
                                                        asChild
                                                    >
                                                        <Link href={subItem.url}>
                                                            <span>{subItem.name}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton isActive={isActive} asChild>
                                <Link href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function SidebarUser() {
    // hooks
    const { auth } = usePage<PageProps>().props;
    const { isMobile } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={`/storage/${auth?.user?.avatar}`}
                                    alt={`@${auth?.user?.name}`}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {getInitial(auth?.user?.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{auth?.user?.name}</span>
                                <span className="truncate text-[8px]">{auth?.user?.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={`/storage/${auth?.user?.avatar}`}
                                        alt={`@${auth?.user?.name}`}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {getInitial(auth?.user?.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {auth?.user?.name}
                                    </span>
                                    <span className="truncate text-[8px]">{auth?.user?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link href="/profile">
                                    <UserPen />
                                    Profil
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <Link href="/ganti-password">
                                    <SquareAsterisk />
                                    Ganti Password
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={route('logout')}
                                    as="button"
                                    method="post"
                                    className="w-full bg-destructive text-destructive-foreground"
                                >
                                    <LogOut />
                                    Logout
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-none text-primary-foreground">
                                <Icons.Logo className="size-8 fill-primary" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold uppercase">
                                    {import.meta.env.VITE_APP_SHORT_NAME}
                                </span>
                                <span className="truncate text-xs">
                                    Versi {import.meta.env.VITE_APP_VERSION}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarItem />
            </SidebarContent>

            <SidebarFooter>
                <SidebarUser />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}

export default AppSidebar;
