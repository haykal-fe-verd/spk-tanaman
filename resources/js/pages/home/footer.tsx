import React from 'react';

function Footer() {
    return (
        <footer
            id="footer"
            className="text-center text-xs lg:text-base bg-card py-6 text-muted-foreground border-t"
        >
            Copyright &copy; {new Date().getFullYear()} {import.meta.env.VITE_APP_SHORT_NAME}. All
            rights reserved.
        </footer>
    );
}

export default Footer;
