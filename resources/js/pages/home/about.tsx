import React from 'react';

import Title from './title';

function About() {
    return (
        <section id="about" className="py-16 ">
            <Title title="Tentang Kami" desc="Temukan hal menarik tentang kami di sini." />

            <div className="max-w-2xl mx-auto text-center space-y-6 px-4">
                Kami adalah platform digital pertanian yang berkomitmen membantu petani dalam
                mengambil keputusan terbaik berdasarkan data dan teknologi. Dengan sistem pendukung
                keputusan, kami memberikan rekomendasi tanaman berdasarkan data lahan dan riwayat
                tanam.
            </div>
        </section>
    );
}

export default About;
