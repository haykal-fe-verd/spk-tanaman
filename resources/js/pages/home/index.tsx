import React from "react";

import GuestLayout from "@/layouts/guest-layout";
import ToggleTheme from "@/components/toggle-theme";

function HomePage() {
    return (
        <GuestLayout title="Home">
            Home
            <ToggleTheme />
        </GuestLayout>
    );
}

export default HomePage;
