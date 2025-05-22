import {
    LayoutDashboard,
    List,
    ListStart,
    LucideIcon,
    MapPinned,
    PanelRightClose,
    Scale,
    Sprout,
} from 'lucide-react';

import { Role, Roles } from '@/data/roles';

export interface Navigation {
    name: string;
    url: string;
    icon?: LucideIcon;
    roles: Role[];
    children?: Navigation[];
}

export const navigations: Navigation[] = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
        roles: [Roles.ADMIN, Roles.USER],
    },

    //! ADMIN
    {
        name: 'Tanaman',
        url: '/tanaman',
        icon: Sprout,
        roles: [Roles.ADMIN],
    },
    {
        name: 'Kriteria',
        url: '/kriteria',
        icon: List,
        roles: [Roles.ADMIN],
    },
    {
        name: 'Sub Kriteria',
        url: '/subkriteria',
        icon: ListStart,
        roles: [Roles.ADMIN],
    },
    {
        name: 'Nilai Perbandingan',
        url: '/nilai-perbandingan',
        icon: Scale,
        roles: [Roles.ADMIN],
    },
    {
        name: 'Syarat Tanam',
        url: '/sub-kriteria',
        icon: PanelRightClose,
        roles: [Roles.ADMIN],
    },

    //! USER
    {
        name: 'Lahan',
        url: '/lahan',
        icon: MapPinned,
        roles: [Roles.USER],
    },
];
