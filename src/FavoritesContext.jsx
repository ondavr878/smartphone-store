import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([])

    const toggleFavorite = useCallback((productId) => {
        setFavorites((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId],
        )
    }, [])

    const isFavorite = useCallback(
        (productId) => favorites.includes(productId),
        [favorites],
    )

    const favCount = favorites.length

    const value = useMemo(
        () => ({ favorites, toggleFavorite, isFavorite, favCount }),
        [favorites, toggleFavorite, isFavorite, favCount],
    )

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext)
    if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
    return ctx
}
