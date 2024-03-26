import { createContext, useState } from "react"

interface ThemeContextType {
    isLightMode: boolean | null
    loadThemeFromLS: () => void
    handleLightDarkModes: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default function ThemeProvider({ children }: { children: React.ReactNode }) {

    const [isLightMode, setIsLightMode] = useState<boolean | null>(true)
    const elmDocument = document.querySelector("html") as HTMLElement;

    const loadThemeFromLS = () => {
        const theme = localStorage.getItem("theme");
        if (!theme) {
            localStorage.setItem("theme", "true");
            setIsLightMode(true);
            elmDocument.setAttribute("data-bs-theme", "light");
        } else {
            setIsLightMode(theme === "true");
            elmDocument.setAttribute("data-bs-theme", theme === "true" ? "light" : "dark");
        }
    }

    const handleLightDarkModes = () => {
        const theme = localStorage.getItem("theme");
        if (theme === "true") {
            setIsLightMode(false)
            elmDocument.setAttribute("data-bs-theme", "dark")
            localStorage.setItem("theme", "false")
        }
        else if (theme === "false") {
            setIsLightMode(true)
            elmDocument.setAttribute("data-bs-theme", "light")
            localStorage.setItem("theme", "true")
        }
    }

    return (
        <ThemeContext.Provider value={{ isLightMode, loadThemeFromLS, handleLightDarkModes }}>
            {children}
        </ThemeContext.Provider>
    )
}