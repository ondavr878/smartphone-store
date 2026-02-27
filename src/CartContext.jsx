import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    const addToCart = useCallback((product, storage, color) => {
        setCartItems((prev) => {
            const key = `${product.id}-${storage}-${color}`
            const existing = prev.find((item) => item.key === key)
            if (existing) {
                return prev.map((item) =>
                    item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
                )
            }
            return [
                ...prev,
                {
                    key,
                    id: product.id,
                    name: product.name,
                    brand: product.brand,
                    price: product.price,
                    image: product.image,
                    storage,
                    color,
                    quantity: 1,
                },
            ]
        })
    }, [])

    const removeFromCart = useCallback((key) => {
        setCartItems((prev) => prev.filter((item) => item.key !== key))
    }, [])

    const updateQuantity = useCallback((key, delta) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.key === key
                        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                        : item,
                )
                .filter((item) => item.quantity > 0),
        )
    }, [])

    const clearCart = useCallback(() => setCartItems([]), [])

    const cartCount = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
        [cartItems],
    )

    const value = useMemo(
        () => ({ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }),
        [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount],
    )

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within CartProvider')
    return ctx
}
