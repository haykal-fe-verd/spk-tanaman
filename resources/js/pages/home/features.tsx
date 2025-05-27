import React from 'react';
import { LucideIcon, Mail, Send, Sprout } from 'lucide-react';

import Title from './title';

function Features() {
    const data: { title: string; desc: string; icon: LucideIcon }[] = [
        {
            title: 'Rekomendasi Tanaman',
            desc: 'Dapatkan saran tanaman paling cocok berdasarkan kondisi aktual lahan.',
            icon: Sprout,
        },

        {
            title: 'Kontak dan Bantuan',
            desc: 'Hubungi kami untuk bantuan teknis atau pertanyaan terkait sistem.',
            icon: Mail,
        },

        {
            title: 'Single Page Application',
            desc: 'Navigasi cepat dan efisien tanpa reload halaman berkat teknologi SPA.',
            icon: Send,
        },
    ];

    return (
        <section id="features" className="py-16 ">
            <Title
                title="Fitur Unggulan"
                desc=" Kami menyediakan fitur lengkap untuk memudahkan petani mengambil keputusan."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="p-6 border bg-card shadow-lg rounded-lg text-center"
                    >
                        <item.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                        <h3 className="font-semibold text-xl">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Features;
