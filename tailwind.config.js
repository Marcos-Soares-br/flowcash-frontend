/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    theme: {
        extend: {
            colors: {
                background: "#020617",

                surface: "#0F172A",
                card: "#111827",

                foreground: "#F8FAFC",

                border: "#1E293B",

                primary: {
                    DEFAULT: "#3B82F6",
                    hover: "#2563EB",
                },

                secondary: {
                    DEFAULT: "#9ca3af",
                    hover: "#8d98ad",
                },

                success: {
                    DEFAULT: "#22C55E",
                    hover: "#16A34A",
                    content: "#86EFAC",
                },

                warning: {
                    DEFAULT: "#FCD34D",
                    hover: "#FBBF24",
                },

                error: {
                    DEFAULT: "#EF4444",
                    hover: "#DC2626",
                    content: "#FCA5A5",
                },
            },
            
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
}