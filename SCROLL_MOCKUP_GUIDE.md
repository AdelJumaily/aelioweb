# Scroll Mockup Reveal Component Guide

## What I Built

I created a premium, scroll-triggered mockup showcase component that displays a sticky laptop or phone mockup. As users scroll, the screenshots inside the mockup smoothly transition, creating an engaging "scrollytelling" portfolio showcase similar to Apple or Stripe product reveals.

## Files Created

1. **`/app/components/ScrollMockupReveal.tsx`** - Main component
2. **`/app/components/utils/useScrollProgress.ts`** - Utility hook (optional, for future use)
3. **Updated `/app/page.tsx`** - Example usage

## Features Implemented

✅ **Sticky Mockup** - Mockup stays fixed while scrolling  
✅ **Smooth Image Transitions** - Fade and scale animations between screenshots  
✅ **Scroll Progress Tracking** - Uses Framer Motion's `useScroll` hook  
✅ **Zoom Effect** - Subtle zoom-in as you scroll through the section  
✅ **Dual Mockup Types** - Supports both laptop and phone mockups  
✅ **Mobile Responsive** - Scales down beautifully on mobile devices  
✅ **Progress Indicators** - Visual dots showing current image  
✅ **Premium Design** - Glassy gradients, soft shadows, clean minimal UI  
✅ **Tailwind Only** - No external CSS files, all styling with Tailwind + inline styles  

## How It Works

### Technical Implementation

1. **Scroll Detection**: Uses Framer Motion's `useScroll` hook to track scroll progress within the container
2. **Image Index Calculation**: Maps scroll progress (0-1) to image indices
3. **Smooth Transitions**: Uses Framer Motion's `motion.div` with opacity and scale animations
4. **Sticky Positioning**: CSS `sticky` keeps the mockup fixed while content scrolls
5. **Spring Physics**: Smooth spring animation for natural-feeling scroll progress

### Component Props

```typescript
interface ScrollMockupRevealProps {
  images: string[];           // Array of screenshot image URLs
  mockupType?: 'laptop' | 'phone';  // Type of mockup (default: 'laptop')
  height?: string;            // Scroll section height (default: '200vh')
  className?: string;         // Additional CSS classes
}
```

## Usage Example

```tsx
import ScrollMockupReveal from "./components/ScrollMockupReveal";

export default function HomePage() {
  const portfolioImages = [
    '/screenshots/project1.jpg',
    '/screenshots/project2.jpg',
    '/screenshots/project3.jpg',
    '/screenshots/project4.jpg',
  ];

  return (
    <main>
      <ScrollMockupReveal
        images={portfolioImages}
        mockupType="laptop"
        height="250vh"
        className="py-20"
      />
    </main>
  );
}
```

## Setting Up Your Images

1. **Create a screenshots folder** in your `public` directory:
   ```
   public/
     screenshots/
       project1.jpg
       project2.jpg
       project3.jpg
       ...
   ```

2. **Use the image paths** in your component:
   ```tsx
   const images = [
     '/screenshots/project1.jpg',
     '/screenshots/project2.jpg',
     '/screenshots/project3.jpg',
   ];
   ```

3. **Image Recommendations**:
   - Use high-quality screenshots (1920x1080 for laptop, 375x812 for phone)
   - Keep file sizes optimized (< 500KB per image)
   - Use WebP format for better performance
   - Ensure consistent aspect ratios

## Customization Options

### Change Mockup Type
```tsx
<ScrollMockupReveal
  images={images}
  mockupType="phone"  // or "laptop"
/>
```

### Adjust Scroll Height
```tsx
<ScrollMockupReveal
  images={images}
  height="300vh"  // Longer scroll = slower transitions
/>
```

### Add Custom Styling
```tsx
<ScrollMockupReveal
  images={images}
  className="bg-gradient-to-b from-black to-gray-900"
/>
```

## Animation Details

- **Fade Duration**: 0.6 seconds with custom easing
- **Scale Effect**: 0.95 to 1.05 (subtle zoom)
- **Spring Physics**: Stiffness 100, Damping 30 for smooth motion
- **Progress Calculation**: Divides scroll progress evenly across images

## Mobile Responsiveness

The component automatically:
- Scales down mockup size on mobile (90vw for laptop, 80vw for phone)
- Maintains aspect ratios
- Adjusts screen bezel proportions
- Keeps animations smooth on touch devices

## Performance Optimizations

- Uses `passive: true` for scroll listeners
- Framer Motion's optimized animations
- Image lazy loading (add `loading="lazy"` if needed)
- CSS transforms for GPU acceleration

## Troubleshooting

### Images not showing?
- Check image paths are correct (relative to `public` folder)
- Ensure images exist in the specified location
- Check browser console for 404 errors

### Animation too fast/slow?
- Adjust the `height` prop (higher = slower transitions)
- Modify spring physics in the component

### Mockup not sticky?
- Ensure parent container has proper height
- Check for CSS conflicts with `position: sticky`

## Next Steps

1. Add your actual portfolio screenshots
2. Adjust scroll height to match your content
3. Customize colors/gradients if needed
4. Add more images (3-5 recommended for best UX)

## Design Philosophy

The component follows Aelio's premium design aesthetic:
- **Minimal**: Clean, uncluttered interface
- **Glassy**: Subtle glassmorphism effects
- **Smooth**: Buttery animations and transitions
- **Professional**: High-end agency feel

Enjoy your new scroll-triggered portfolio showcase! 🚀

