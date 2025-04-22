# Outfit Builder - NextJS WYSIWYG Editor

A web-based outfit builder application that allows users to mix and match clothing items through a drag-and-drop interface. Users can create outfits by combining different clothing items and save them to a shopping cart.

## Features

- **Drag-and-Drop Interface**: Easily drag clothing items onto the canvas
- **Visual Outfit Assembly**: Position and layer clothing items to create complete outfits
- **Category Filtering**: Browse items by category (tops, bottoms, accessories)
- **Shopping Cart Integration**: Save outfits to cart for later purchase
- **Responsive Design**: Works on desktop and tablet devices

## Tech Stack

- **Next.js 14**: React framework with server-side rendering
- **React 18**: UI library
- **CSS-in-JS**: Styled with inline styles for simplicity
- **localStorage**: For cart persistence between sessions

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/outfit-builder.git
   cd outfit-builder
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `/public/clothing` directory with subdirectories for clothing item images:
   ```
   mkdir -p public/clothing/tops public/clothing/bottoms public/clothing/accessories
   ```

4. Add your clothing item images to the appropriate directories.

## Running the App

1. Start the development server:
   ```
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Instructions

1. **Browse Items**: Click on category tabs to view different clothing items
2. **Add Items**: Click on an item to add it to the canvas
3. **Position Items**: Drag items on the canvas to position them
4. **Remove Items**: Click the "x" button or double-click to remove an item
5. **Save Outfit**: Click "Add to Cart" to save your outfit
6. **View Cart**: Click on the Cart link in the header to view saved outfits

## Building for Production

1. Build the production version:
   ```
   npm run build
   ```

2. Start the production server:
   ```
   npm start
   ```

## Additional Information

- The app uses browser's localStorage to persist cart data between sessions
- All clothing items are positioned absolutely on the canvas
- Z-index is automatically managed for layering items
- Each clothing item in the cart is priced at $19.99 (mock pricing)

## Future Enhancements

- User accounts and authentication
- Saving outfits to user profiles
- Real product database integration
- Mobile-responsive design improvements
- Ability to rotate and resize clothing items
- Color variants for clothing items

## License

MIT