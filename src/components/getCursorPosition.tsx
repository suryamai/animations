'use client';

import { motion } from "motion/react";
import useMousePosition from "@/hooks/useMousePosition";

export default function GetCursorPosition() {
    const cursorPosition = useMousePosition();

    return (
        <motion.div
            className="pointer-events-none w-30 h-20 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg"
        >
            {`X: ${cursorPosition.x}, Y: ${cursorPosition.y}`}
            <div
                style={{
                    top: `${cursorPosition.y}px`,
                    left: `${cursorPosition.x}px`,
                    transform: `translate(-50%, -50%)`,
                }} 
                className={`absolute w-10 h-10 bg-violet-500 bg-opacity-20 rounded-lg`}></div>
        </motion.div>
    );
}