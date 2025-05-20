import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Role } from "@/data/roles";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitial(name: string | null | undefined): string {
    if (!name) return "?";

    const nameParts = name.split(" ");
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
    const lastInitial =
        nameParts.length > 1 ? nameParts[1]?.charAt(0).toUpperCase() || "" : "";
    return firstInitial + lastInitial;
}

export function hasAccess(userRoles: Role, menuRoles?: Role[]): boolean {
    if (!menuRoles || menuRoles.length === 0) {
        return true;
    }

    return menuRoles.includes(userRoles);
}

export function formatTitle(title: string) {
    return title.toLowerCase().replace(/\s+/g, "-");
}

export function truncateWords(text: string, maxWords: number = 10): string {
    if (!text) return "";

    const words = text.split(" ");
    return words.length > maxWords
        ? words.slice(0, maxWords).join(" ") + "..."
        : text;
}

export function formatDate(
    dateString: string | Date,
    locale: string = "id-ID",
    options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }
): string {
    const date =
        typeof dateString === "string" ? new Date(dateString) : dateString;

    if (isNaN(date.getTime())) return "-";

    return date.toLocaleDateString(locale, options);
}

export function formatColumnId(id: string) {
    return id
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
