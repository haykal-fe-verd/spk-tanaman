import React from "react";
import { CircleChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

function ScrollToTop() {
    // states
    const [visible, setVisible] = React.useState<boolean>(false);

    // events
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    // effects
    React.useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <Button
            size="icon"
            aria-label="Scroll to top"
            className={cn(
                "fixed bottom-5 right-5 transition-opacity rounded-full duration-300",
                visible ? "opacity-100" : "opacity-0"
            )}
            onClick={scrollToTop}>
            <CircleChevronUp />
        </Button>
    );
}

export default ScrollToTop;
