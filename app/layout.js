'use client';

import { CartProvider } from '../lib/cartContext';
import { OutfitProvider } from '../lib/outfitContext';
import './globals.css';

// Client component wrapper for context providers
function Providers({ children }) {
  return (
    <CartProvider>
      <OutfitProvider>
        {children}
      </OutfitProvider>
    </CartProvider>
  );
}

// Root layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Outfit Builder</title>
        <meta name="description" content="Mix and match clothing items to create your perfect outfit" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}