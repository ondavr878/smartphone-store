import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('pv-theme') || 'cosmic'
    })

    useEffect(() => {
        localStorage.setItem('pv-theme', theme)
        const root = document.getElementById('root')
        root.className = `theme-${theme}`
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'cosmic' ? 'sunset' : 'cosmic')
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
