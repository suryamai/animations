'use client';

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import useMousePosition from "@/hooks/useMousePosition";

type RainDrop = {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    drift: number;
    color: string;
};

export default function RainAnimation() {
    const cursorPosition = useMousePosition();
    const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();

            if (!rect) return;

            const nextPosition = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };

            const newDrops = Array.from({ length: 4 }, (_, index) => ({
                id: Date.now() + index + Math.random(),
                x: nextPosition.x,
                y: nextPosition.y,
                size: 2 + Math.random() * 3,
                duration: 0.4 + Math.random() * 0.4,
                drift: (Math.random() - 0.5) * 24,
                color: ["#60a5fa", "#38bdf8", "#f8fafc"][Math.floor(Math.random() * 3)],
            }));

            setRainDrops((prev) => [...prev, ...newDrops].slice(-40));
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative flex h-screen w-screen items-center justify-center rounded-lg bg-blue-500/90 text-sm font-bold text-white shadow-lg"
        >
            <div className="relative z-10">
                {`X: ${cursorPosition.x.toFixed(0)}, Y: ${cursorPosition.y.toFixed(0)}`}
            </div>

            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
                {rainDrops.map((drop) => (
                    <motion.span
                        key={drop.id}
                        className="absolute block rounded-full"
                        initial={{ opacity: 1, x: 0, y: 0 }}
                        animate={{ opacity: 0, x: drop.drift, y: 140 }}
                        transition={{ duration: drop.duration, ease: "linear" }}
                        style={{
                            left: drop.x,
                            top: drop.y,
                            width: drop.size,
                            height: drop.size * 2.8,
                            backgroundColor: drop.color,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}