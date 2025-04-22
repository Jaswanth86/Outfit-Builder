'use client';

import { createContext, useContext, useState } from 'react';

// Create context
const OutfitContext = createContext();

// Provider component
export function OutfitProvider({ children }) {
  const [outfitItems, setOutfitItems] = useState([]);

  // Add a clothing item to the outfit
  const addItem = (item) => {
    const newItem = {
      ...item,
      id: `${item.id}-${Date.now()}`, // Ensure unique ID for each instance
      position: item.position || { x: 50, y: 50 }, // Default position if not provided
      zIndex: outfitItems.length + 1 // Stack items
    };
    setOutfitItems(prev => [...prev, newItem]);
  };

  // Update item position
  const updateItemPosition = (id, position) => {
    setOutfitItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, position } : item
      )
    );
  };

  // Bring item to front (increase z-index)
  const bringToFront = (id) => {
    // Get highest z-index
    const highestZ = Math.max(...outfitItems.map(item => item.zIndex), 0);
    
    setOutfitItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, zIndex: highestZ + 1 } : item
      )
    );
  };

  // Remove item from outfit
  const removeItem = (id) => {
    setOutfitItems(prev => prev.filter(item => item.id !== id));
  };

  // Clear all items
  const clearOutfit = () => {
    setOutfitItems([]);
  };

  return (
    <OutfitContext.Provider value={{
      outfitItems,
      addItem,
      updateItemPosition,
      bringToFront,
      removeItem,
      clearOutfit
    }}>
      {children}
    </OutfitContext.Provider>
  );
}

// Custom hook to use the outfit context
export function useOutfit() {
  const context = useContext(OutfitContext);
  if (context === undefined) {
    throw new Error('useOutfit must be used within an OutfitProvider');
  }
  return context;
}