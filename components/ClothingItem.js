'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useOutfit } from '../lib/outfitContext';

// Component for a clothing item that can be dragged and dropped
export default function ClothingItem({ item, isInPanel = false }) {
  const { bringToFront, updateItemPosition, removeItem } = useOutfit();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(item.position || { x: 50, y: 50 });
  const itemRef = useRef(null);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const itemStartPosRef = useRef({ x: 0, y: 0 });

  // For items in the canvas (not in panel)
  useEffect(() => {
    if (!isInPanel && item.position) {
      setPosition(item.position);
    }
  }, [item.position, isInPanel]);

  // Mouse event handlers
  const handleMouseDown = (e) => {
    if (isInPanel) return; // Don't allow dragging in the panel
    
    e.preventDefault();
    setIsDragging(true);
    bringToFront(item.id); // Bring to front when clicked
    
    // Record starting positions
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    itemStartPosRef.current = { ...position };
    
    // Add temporary event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const dx = e.clientX - dragStartPosRef.current.x;
    const dy = e.clientY - dragStartPosRef.current.y;
    
    const newPosition = {
      x: itemStartPosRef.current.x + dx,
      y: itemStartPosRef.current.y + dy
    };
    
    setPosition(newPosition);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    updateItemPosition(item.id, position);
    
    // Remove temporary event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Item style for positioning
  const itemStyle = isInPanel
    ? {} // No absolute positioning in panel
    : {
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: item.zIndex || 1,
        cursor: 'move',
        transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
        boxShadow: isDragging ? '0 0 10px rgba(0,0,0,0.3)' : 'none'
      };

  // Double click handler to remove item
  const handleDoubleClick = () => {
    if (!isInPanel) {
      removeItem(item.id);
    }
  };

  return (
    <div
      ref={itemRef}
      className={`clothing-item ${isInPanel ? 'panel-item' : 'canvas-item'}`}
      style={itemStyle}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <Image
        src={item.src}
        alt={item.name || 'Clothing item'}
        width={item.width || 100}
        height={item.height || 100}
        style={{ pointerEvents: 'none' }} // Prevents image drag default behavior
      />
      {!isInPanel && (
        <button 
          className="remove-btn"
          onClick={() => removeItem(item.id)}
          style={{
            position: 'absolute', 
            top: '-10px', 
            right: '-10px',
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '12px',
            border: 'none'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}