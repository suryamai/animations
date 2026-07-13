"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

const ballColors = ["#8b5cf6", "#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#44df75", "#f43d00"];

export default function AnimatedBalls() {
    const balls = useMemo(
        () =>
            Array.from({ length: 10 }, (_, index) => ({
                id: index,
                size: 14 + index * 2,
                color: ballColors[index % ballColors.length],
                x: 20 + index * 10,
                y: 20 + index * 8,
                duration: 1.1 + (index % 4) * 0.2,
                delay: index * 0.08,
            })),
        []
    );

    return (
        <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden rounded-lg bg-slate-950">
            {balls.map((ball) => (
                <motion.span
                    key={ball.id}
                    className="absolute rounded-full"
                    animate={{
                        y: [ball.y, ball.y - 70, ball.y],
                        x: [ball.x, ball.x + 18, ball.x],
                        scale: [1, 1.08, 1],
                        opacity: [0.75, 1, 0.75],
                    }}
                    transition={{
                        duration: ball.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: ball.delay,
                    }}
                    style={{
                        width: ball.size,
                        height: ball.size,
                        backgroundColor: ball.color,
                        left: `${ball.x}%`,
                        top: `${ball.y}%`,
                        boxShadow: `0 0 20px ${ball.color}`,
                    }}
                />
            ))}
        </div>
    );
}