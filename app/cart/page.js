'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import { useCart } from '../../lib/cartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Calculate a mock total price based on number of items
  useEffect(() => {
    // Mock price calculation - each item is $19.99
    const itemBasePrice = 19.99;
    let total = 0;
    
    cartItems.forEach(outfit => {
      // Each outfit costs based on the number of items in it
      total += outfit.items.length * itemBasePrice;
    });
    
    setTotalPrice(total.toFixed(2));
  }, [cartItems]);

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    alert('Thank you for your purchase! This would proceed to checkout in a real application.');
    clearCart();
  };

  return (
    <>
      <Header />
      <main style={{ 
        padding: '0 2rem', 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px'
          }}>
            <h2>Your cart is empty</h2>
            <p style={{ marginBottom: '2rem' }}>
              Add some outfits to your cart first!
            </p>
            <Link href="/" style={{
              backgroundColor: '#3f51b5',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-contents">
            {/* List of outfits in cart */}
            <div className="cart-items" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {cartItems.map((outfit, index) => (
                <div 
                  key={outfit.id} 
                  className="cart-item"
                  style={{
                    display: 'flex',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Outfit thumbnail */}
                  <div className="outfit-thumbnail" style={{ 
                    width: '200px',
                    height: '200px',
                    position: 'relative',
                    backgroundColor: '#f5f5f5'
                  }}>
                    {/* Simplified representation of the outfit */}
                    <div style={{ 
                      position: 'relative', 
                      width: '100%',
                      height: '100%'
                    }}>
                      {outfit.items.slice(0, 3).map((item, idx) => (
                        <div 
                          key={item.id}
                          style={{
                            position: 'absolute',
                            left: `${(50 + idx * 15)}px`,
                            top: `${(50 + idx * 10)}px`,
                            zIndex: idx + 1
                          }}
                        >
                          <Image
                            src={item.src}
                            alt={item.name || 'Item'}
                            width={80}
                            height={80}
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Outfit details */}
                  <div className="outfit-details" style={{ 
                    flex: 1, 
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <h3 style={{ marginTop: 0 }}>Outfit #{index + 1}</h3>
                      <p>Items: {outfit.items.length}</p>
                      <p>Added on: {new Date(outfit.dateAdded).toLocaleDateString()}</p>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                        ${(outfit.items.length * 19.99).toFixed(2)}
                      </span>
                      
                      <button
                        onClick={() => removeFromCart(outfit.id)}
                        style={{
                          backgroundColor: '#f44336',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart summary and checkout */}
            <div className="cart-summary" style={{
              backgroundColor: '#f9f9f9',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={clearCart}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Clear Cart
                </button>
                
                <button
                  onClick={handleCheckout}
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}