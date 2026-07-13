'use client';

import { useEffect, useState } from "react";

export default function useMousePosition () {

    const [cursorPosition, setCursorPosition] = useState({
        x: 0, y: 0
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
        
    }, []);

    return cursorPosition;

}