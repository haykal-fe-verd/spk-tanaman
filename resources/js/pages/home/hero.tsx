import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRightCircle } from 'lucide-react';
import Typewriter from 'typewriter-effect';

import { Button } from '@/components/ui/button';

function Hero() {
    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center text-center relative bg-cover bg-center"
            style={{ backgroundImage: `url('/hero.jpeg')` }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/50" />
            <div className="relative z-10 space-y-4 max-w-3xl px-4 text-white">
                <h1 className="text-4xl font-bold">
                    <Typewriter
                        options={{
                            strings: [
                                'Sistem Pendukung Keputusan',
                                'Rekomendasi Tanaman Terbaik',
                                'Berbasis AHP dan TOPSIS',
                            ],
                            autoStart: true,
                            loop: true,
                            delay: 50,
                        }}
                    />
                </h1>
                <p className="text-lg">
                    Bantu petani memilih tanaman terbaik berdasarkan kondisi lahan dan riwayat tanam
                    dengan metode AHP dan TOPSIS.
                </p>
                <Link href={route('register')}>
                    <Button size="lg" className="mt-20">
                        Mulai Sekarang
                        <ArrowRightCircle />
                    </Button>
                </Link>
            </div>
        </section>
    );
}

export default Hero;
