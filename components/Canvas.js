'use client';

import { useRef } from 'react';
import ClothingItem from './ClothingItem';
import { useOutfit } from '../lib/outfitContext';
import { useCart } from '../lib/cartContext';

export default function Canvas() {
  const { outfitItems, clearOutfit } = useOutfit();
  const { addOutfitToCart } = useCart();
  const canvasRef = useRef(null);

  // Handle "Add to Cart" button click
  const handleAddToCart = () => {
    if (outfitItems.length === 0) {
      alert('Please add items to your outfit first!');
      return;
    }
    
    // Make a copy of the current outfit to add to cart
    // We don't want to modify the original items
    const outfitForCart = outfitItems.map(item => ({
      ...item,
      position: { ...item.position } // Create a copy of the position object
    }));
    
    addOutfitToCart(outfitForCart);
    alert('Outfit added to cart!');
  };

  return (
    <div className="canvas-container">
      <div 
        ref={canvasRef}
        className="canvas"
        style={{
          position: 'relative',
          width: '600px',
          height: '800px',
          backgroundColor: '#f5f5f5',
          border: '2px dashed #ccc',
          overflow: 'hidden',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          margin: '0 auto'
        }}
      >
        {/* Background silhouette (optional) */}
        <div 
          className="silhouette"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '500px',
            backgroundColor: 'rgba(200,200,200,0.2)',
            borderRadius: '100px 100px 0 0',
            zIndex: 0
          }}
        />

        {/* Render all outfit items */}
        {outfitItems.map(item => (
          <ClothingItem 
            key={item.id} 
            item={item} 
            isInPanel={false}
          />
        ))}
      </div>

      {/* Canvas controls */}
      <div 
        className="canvas-controls"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '16px'
        }}
      >
        <button
          onClick={clearOutfit}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Clear Canvas
        </button>
        
        <button
          onClick={handleAddToCart}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}