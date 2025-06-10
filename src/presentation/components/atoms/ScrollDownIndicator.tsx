import React, { useEffect, useState } from "react";
import ShinyText from '@/presentation/components/atoms/ShinyText';

const ScrollDownIndicator: React.FC = () => {
    const [showIndicator, setShowIndicator] = useState<boolean>(true);

    useEffect(() => {
        const handleScroll = () => {
            const isBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
            setShowIndicator(!isBottom);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {showIndicator && (
                <div
                    style={{
                        position: "fixed",
                        right: 40,
                        bottom: 40,
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: "rgb(255, 255, 255)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 16px rgba(176, 82, 5, 0.23)",
                        }}
                    >
                        <ShinyText
                            text="↓"
                            disabled={false}
                            speed={1}
                            className="text-3xl font-bold"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ScrollDownIndicator;