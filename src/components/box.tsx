"use client";

import { useState } from "react"
import { motion } from "motion/react"

export default function Box() {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        console.log("Mouse entered the box");
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
        console.log("Mouse left the box");
    }

    return (
        <motion.div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-32 h-32 bg-blue-500 rounded-lg"
            initial={{ rotate: 0 }}
            animate={{ rotate: isHovered ? 0 : 360, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        />
    )
}