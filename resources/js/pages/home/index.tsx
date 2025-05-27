import React from 'react';

import GuestLayout from '@/layouts/guest-layout';
import { Separator } from '@/components/ui/separator';
import Navbar from './navbar';
import Footer from './footer';
import Hero from './hero';
import Features from './features';
import Contact from './contact';
import About from './about';

function HomePage() {
    return (
        <GuestLayout title="Home">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <Hero />

            {/* Feature Section */}
            <Features />

            <Separator />

            {/* About Section */}
            <About />

            <Separator />

            {/* Contact Section */}
            <Contact />

            {/* Footer */}
            <Footer />
        </GuestLayout>
    );
}

export default HomePage;
