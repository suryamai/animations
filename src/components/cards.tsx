'use client';

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

type CardItem = {
    id: number;
    title: string;
    description: string;
    accent: string;
};

const cardItems: CardItem[] = [
    {
        id: 1,
        title: "First Card",
        description: "This card fades in as you begin scrolling.",
        accent: "from-cyan-400 to-blue-500",
    },
    {
        id: 2,
        title: "Second Card",
        description: "The next card appears smoothly and replaces the previous one.",
        accent: "from-fuchsia-500 to-violet-600",
    },
    {
        id: 3,
        title: "Third Card",
        description: "Each step uses a clean fade in and fade out transition.",
        accent: "from-emerald-400 to-teal-500",
    },
    {
        id: 4,
        title: "Fourth Card",
        description: "Scroll further to experience the full sequence.",
        accent: "from-amber-400 to-orange-500",
    },
];

export default function Cards() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        const nextIndex = Math.min(cardItems.length - 1, Math.max(0, Math.floor(value * cardItems.length)));
        setActiveIndex(nextIndex);
    });

    return (
        <div ref={containerRef} className="relative h-[400vh] w-full bg-slate-950 text-white">
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
                <div className="relative flex h-[70vh] w-full max-w-5xl items-center justify-center">
                    {cardItems.map((card, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <motion.div
                                key={card.id}
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                                animate={{
                                    opacity: isActive ? 1 : 0,
                                    y: isActive ? 0 : 24,
                                    scale: isActive ? 1 : 0.96,
                                }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                            >
                                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
                                    <div className={`mb-6 h-2 w-20 rounded-full bg-gradient-to-r ${card.accent}`} />
                                    <h2 className="mb-3 text-2xl font-semibold">{card.title}</h2>
                                    <p className="text-sm leading-7 text-slate-300">{card.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}