import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

const THEMES = ['cosmic', 'sunset', 'light']
const THEME_LABELS = {
    cosmic: 'Cosmic Purple',
    sunset: 'Ocean Sunset',
    light: 'Light Mode',
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('pv-theme') || 'cosmic'
    })

    useEffect(() => {
        localStorage.setItem('pv-theme', theme)
        const root = document.getElementById('root')
        root.className = `theme-${theme}`
    }, [theme])

    const cycleTheme = () => {
        setTheme(prev => {
            const idx = THEMES.indexOf(prev)
            return THEMES[(idx + 1) % THEMES.length]
        })
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, THEMES, THEME_LABELS }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
