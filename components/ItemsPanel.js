'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useOutfit } from '../lib/outfitContext';

// Mock data for clothing items
// In a real app, this would come from an API or database
const CLOTHING_CATEGORIES = [
  {
    id: 'tops',
    name: 'Tops',
    items: [
      { id: 'tshirt', name: 'T-Shirt',src: '/images/tshirt.svg', category: 'tops' },
      { id: 'jacket', name: 'Jacket', src: '/images/jacket.svg', category: 'tops' }
    ]
  },
  {
    id: 'bottoms',
    name: 'Bottoms',
    items: [
      { id: 'pants', name: 'Pants', src: '/images/pants.svg', category: 'bottoms' },
      { id: 'dress', name: 'Dress', src: '/images/dress.svg', category: 'bottoms' }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    items: [
      { id: 'hat', name: 'Hat', src: '/images/cap.svg',  category: 'accessories' },
      { id: 'shoes', name: 'Shoes', src: '/images/shoe.svg', category: 'accessories' }
    ]
  }
];

export default function ItemsPanel() {
  const { addItem } = useOutfit();
  const [activeCategory, setActiveCategory] = useState(CLOTHING_CATEGORIES[0].id);

  // Get items for the active category
  const activeCategoryItems = CLOTHING_CATEGORIES.find(
    category => category.id === activeCategory
  )?.items || [];

  const handleDragStart = (e, item) => {
    // Store item data in drag event
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleItemClick = (item) => {
    // Add item to canvas
    addItem(item);
  };

  return (
    <div className="items-panel">
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '16px',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        Clothing Items
      </h2>
      
      {/* Category tabs */}
      <div className="category-tabs" style={{ display: 'flex', marginBottom: '16px' }}>
        {CLOTHING_CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            style={{
              flex: 1,
              padding: '8px',
              backgroundColor: activeCategory === category.id ? '#3f51b5' : '#e0e0e0',
              color: activeCategory === category.id ? 'white' : 'black',
              border: 'none',
              borderRadius: activeCategory === category.id ? '4px' : '0',
              cursor: 'pointer',
              fontWeight: activeCategory === category.id ? 'bold' : 'normal',
              margin: '0 4px'
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Items grid */}
      <div 
        className="items-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          padding: '16px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          maxHeight: '500px',
          overflowY: 'auto'
        }}
      >
        {activeCategoryItems.map(item => (
          <div
            key={item.id}
            className="item-card"
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onClick={() => handleItemClick(item)}
            style={{
              backgroundColor: 'white',
              padding: '12px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              ':hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }
            }}
          >
            <div className="item-image" style={{ marginBottom: '8px' }}>
              <Image
                src={item.src}
                alt={item.name}
                width={item.width || 100}
                height={item.height || 100}
                style={{ 
                  objectFit: 'contain',
                  margin: '0 auto'
                }}
              />
            </div>
            <div className="item-name" style={{ fontWeight: '500' }}>
              {item.name}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '16px',
        fontSize: '0.9rem',
        color: '#666'
      }}>
        Click or drag items to add them to your outfit
      </div>
    </div>
  );
}