"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [isMounted, setIsMounted] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme") as "light" | "dark";
            if (storedTheme) {
                setTheme(storedTheme);
            }
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-0.5 bg-gray-700 dark:bg-gray-800 rounded"
            title="Modo oscuro"
        >
            {theme === "dark" ? "☀️" : "🌙"}
        </button>
    );
}
