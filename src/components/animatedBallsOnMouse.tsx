'use client';

import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
// import useMousePosition from "@/hooks/useMousePosition";

type RainDrop = {
    id: number;
    x: number;
    y: number;
    length: number;
    width: number;
    duration: number;
    driftX: number;
    driftY: number;
    color: string;
};

export default function AnimatedBallsOnMouse({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // const mousePosition = useMousePosition();
    const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = window.setInterval(() => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            const nextDrops = Array.from({ length: 10 }, () => ({
                id: Date.now() + Math.random(),
                x: Math.random() * width,
                y: Math.random() * height,
                length: 12 + Math.random() * 18,
                width: 1 + Math.random() * 1.2,
                duration: 0.45 + Math.random() * 0.3,
                driftX: (Math.random() - 0.5) * 28,
                driftY: 180 + Math.random() * 120,
                color: ["#cbd5e1", "#e2e8f0", "#f8fafc"][Math.floor(Math.random() * 3)],
            }));

            setRainDrops((prev) => [...prev, ...nextDrops].slice(-220));
        }, 100);

        return () => window.clearInterval(interval);
    }, []);

    // const trail = useMemo(() => {
    //     if (!containerRef.current) return null;

    //     const rect = containerRef.current.getBoundingClientRect();
    //     return {
    //         x: mousePosition.x - rect.left,
    //         y: mousePosition.y - rect.top,
    //     };
    // }, [mousePosition.x, mousePosition.y]);

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-slate-950">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {rainDrops.map((drop) => (
                    <motion.span
                        key={`${drop.id}-${drop.x}-${drop.y}`}
                        className="absolute rounded-full"
                        initial={{ opacity: 1, x: 0, y: 0, scaleY: 1 }}
                        animate={{ opacity: 0, x: drop.driftX, y: drop.driftY, scaleY: 0.95 }}
                        transition={{ duration: drop.duration, ease: "linear" }}
                        style={{
                            left: drop.x,
                            top: drop.y,
                            width: drop.width,
                            height: drop.length,
                            background: `linear-gradient(to bottom, ${drop.color}, rgba(255,255,255,0.1))`,
                            transform: "translate(-50%, -50%)",
                            boxShadow: `0 0 8px ${drop.color}`,
                        }}
                    />
                ))}
            </div>

            {/* <motion.div
                className="absolute h-3 w-3 rounded-full bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                animate={{ x: trail ? trail.x - 6 : 0, y: trail ? trail.y - 6 : 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                style={{ left: 0, top: 0 }}
            /> */}
            {children}
        </div>
    );
}