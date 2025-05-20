import React from "react";

import ToggleTheme from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";

import Logo from "@/assets/img/logo.png";

function GuestNabar() {
    return (
        <nav className="flex items-center justify-between sticky top-0 bg-card z-50 px-4 py-2">
            <img src={Logo} alt="@Logo" className="w-12 h-12 " />
            <h1>Menu</h1>
            <div className="flex items-center gap-3">
                <ToggleTheme />
                <Button className="h-7">Login</Button>
                <Button variant="secondary" className="h-7">
                    Register
                </Button>
            </div>
        </nav>
    );
}

export default GuestNabar;
