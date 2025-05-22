import { Config } from "ziggy-js";

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    avatar: string;
    created_at?: string;
    email_verified_at?: string;
}

export type Flash = {
    success?: string;
    error?: string;
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    flash: Flash;
    status?: string;
};

// pagination
export type LinkType = {
    url: string | null;
    label: string;
    active: boolean;
};

export type PaginationType<T> = {
    current_page: number;
    data: T[];
    first_page_url: string | null;
    from: number;
    last_page: number;
    last_page_url: string | null;
    links: LinkType[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

// tanaman
export type Tanaman = {
    id: string;
    nama: string;
    deskripsi: string;
    created_at: string;
    updated_at: string;
};

// kriteria
export type Kriteria = {
    id: string;
    nama: string;
    tipe: "benefit" | "cost";
    bobot: number | null;
    created_at: string;
    updated_at: string;
};

// sub kriteria
export type SubKriteria = {
    id: string;
    id_kriteria: string;
    nama: string;
    nilai: number;
    created_at: string;
    updated_at: string;
    kriteria: Kriteria;
};

// nilai perbandingan
export type NilaiPerbandingan = {
    id: string;
    id_kriteria_1: string;
    id_kriteria_2: string;
    nilai: number;
    created_at: string;
    updated_at: string;
    kriteria1: Kriteria;
    kriteria2: Kriteria;
};

// lahan
export type Lahan = {
    id: string;
    id_user: string;
    nama: string;
    lokasi: string;
    luas: string;
    created_at: string;
    updated_at: string;
    user: User;
    riwayatTanam: RiwayatTanam[];
    kriteriaLahan: KriteriaLahan[];
};

// kriteria lahan
export type KriteriaLahan = {
    id: string;
    id_lahan: string;
    id_kriteria: string;
    id_sub_kriteria: string;
    created_at: string;
    updated_at: string;
};

// riwayat tanam
export interface RiwayatTanam {
    id: string;
    id_lahan: string;
    id_tanaman: string;
    tanggal_tanam: string;
    tanggal_panen: string;
    tanggal_istirahat: string;
    created_at: string;
    updated_at: string;
}
