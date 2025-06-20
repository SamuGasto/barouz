"use client"
import { Euphoria_Script } from "next/font/google";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const euphoriaScript = Euphoria_Script({
    weight: "400",
    style: "normal",
    display: "swap",
    subsets: ["latin"],
});

export default function Loading() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress <= 95 ? prevProgress + 1 : prevProgress < 100 ? prevProgress + 0.5 : prevProgress));
        }, 50);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-6 md:p-10 aspect-square w-1/3">
            <h1 className={euphoriaScript.className + " text-5xl text-brand-primary font-thin"}>Cargando el menú...</h1>
            <Progress className="w-full" value={progress} />
        </div>
    );
}