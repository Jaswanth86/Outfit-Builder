'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const CartContext = createContext();

// Provider component
export function CartProvider({ children }) {
  // Initialize state from localStorage if available (client-side only)
  const [cartItems, setCartItems] = useState([]);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('outfit-builder-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('outfit-builder-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add an outfit to the cart
  const addOutfitToCart = (outfit) => {
    const outfitWithId = {
      id: `outfit-${Date.now()}`,
      items: outfit,
      dateAdded: new Date().toISOString()
    };
    setCartItems(prev => [...prev, outfitWithId]);
  };

  // Remove an outfit from the cart
  const removeFromCart = (outfitId) => {
    setCartItems(prev => prev.filter(outfit => outfit.id !== outfitId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addOutfitToCart,
      removeFromCart,
      clearCart,
      itemCount: cartItems.length
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}