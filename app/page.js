'use client';

import { OutfitProvider } from '../lib/outfitContext';
import Canvas from '../components/Canvas';
import ItemsPanel from '../components/ItemsPanel';
import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ 
        padding: '0 2rem', 
        maxWidth: '1400px', 
        margin: '0 auto' 
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          fontSize: '2.5rem'
        }}>
          Mix & Match Outfit Builder
        </h1>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          {/* Left side - Items panel */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <ItemsPanel />
          </div>
          
          {/* Right side - Canvas */}
          <div style={{ flex: '2', minWidth: '600px' }}>
            <Canvas />
          </div>
        </div>
        
        <div style={{ 
          marginTop: '3rem', 
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <h2>How to Use</h2>
          <ol style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', paddingLeft: '2rem' }}>
            <li>Click on clothing items from the left panel to add them to your outfit</li>
            <li>Drag items on the canvas to position them</li>
            <li>Click the remove button (×) to remove an item</li>
          </ol>
        </div>
      </main>
    </>
  );
}