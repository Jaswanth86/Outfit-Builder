/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Enable image optimization for clothing items
    images: {
      domains: ['cdn.pixabay.com', 'images.unsplash.com'],
      // Set image optimization parameters
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      // Allow SVG if needed
      dangerouslyAllowSVG: true,
      contentDispositionType: 'attachment',
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      // Local images don't need a loader
      loader: 'default',
    },
    // Server components config
    experimental: {
      // Since we're using client components for state management
      // we don't need server actions here
      // serverActions: false,  // Removed to fix invalid config warning
    }
  };
  
export default nextConfig;
