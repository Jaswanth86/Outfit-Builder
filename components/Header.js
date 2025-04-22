'use client';

import Link from 'next/link';
import { useCart } from '../lib/cartContext';

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    }}>
      <div className="logo">
        <Link href="/" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontSize: '1.5rem',
          fontWeight: 'bold' 
        }}>
          Outfit Builder
        </Link>
      </div>
      
      <nav>
        <ul style={{ 
          display: 'flex', 
          listStyle: 'none', 
          gap: '1.5rem',
          margin: 0,
          padding: 0
        }}>
          <li>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/cart" style={{ 
              color: 'white', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Cart
              {itemCount > 0 && (
                <span style={{
                  backgroundColor: '#ff4081',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem'
                }}>
                  {itemCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}