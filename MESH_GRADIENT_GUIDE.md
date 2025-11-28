# Fluid Mesh Gradient Guide

This guide explains how to use fluid mesh gradients in your hero section. You have two options:

## 🎨 Option 1: CSS-Based Mesh Gradient (Recommended for most cases)

**File:** `app/components/MeshGradient.tsx`

### How It Works:
- Uses multiple overlapping CSS radial gradients
- Animates using CSS keyframes
- Lightweight and performant
- No JavaScript calculations needed

### Usage:

```tsx
import MeshGradient from './components/MeshGradient';

// Basic usage
<MeshGradient />

// Custom colors
<MeshGradient 
  colors={[
    '#0a0a0a',  // Base color (dark)
    '#1a1a3e',  // Gradient color 1
    '#2d1b4e',  // Gradient color 2
    '#1e3a5f',  // Gradient color 3
    '#0f2540',  // Gradient color 4
  ]}
  intensity={1.5}  // Animation speed (1 = normal, 2 = 2x faster)
  opacity={1}     // Overall opacity (0-1)
/>
```

### Customization Tips:

1. **Color Schemes:**
   ```tsx
   // Warm theme
   colors={['#1a0a0a', '#3d1a1a', '#5d2a2a', '#4a1a2a']}
   
   // Cool theme
   colors={['#0a0a1a', '#1a1a3e', '#2a2a5e', '#1a2a4e']}
   
   // Vibrant theme
   colors={['#0a0a0a', '#3a1a5e', '#5e2a8e', '#4a3a7e']}
   ```

2. **Animation Speed:**
   - `intensity={0.5}` - Slow, smooth
   - `intensity={1}` - Normal speed
   - `intensity={2}` - Fast, energetic

---

## 🚀 Option 2: Canvas-Based Mesh Gradient (Advanced)

**File:** `app/components/CanvasMeshGradient.tsx`

### How It Works:
- Uses HTML5 Canvas with `requestAnimationFrame`
- Real-time gradient point movement
- More fluid and dynamic
- Requires JavaScript calculations (slightly more CPU intensive)

### Usage:

```tsx
import CanvasMeshGradient from './components/CanvasMeshGradient';

// Basic usage
<CanvasMeshGradient />

// Custom configuration
<CanvasMeshGradient 
  colors={['#0a0a0a', '#1a1a3e', '#2d1b4e', '#1e3a5f']}
  speed={0.0005}      // Movement speed (0.0001 = slow, 0.001 = fast)
  pointCount={6}      // Number of gradient points (more = more complex)
/>
```

### When to Use Canvas Version:
- ✅ You want the smoothest possible animation
- ✅ You need more control over individual gradient points
- ✅ You're okay with slightly higher CPU usage
- ✅ You want to add interactivity (mouse tracking, etc.)

---

## 📝 Implementation in Hero Component

Currently, the Hero component uses the CSS-based mesh gradient by default. To switch:

### Switch to Canvas Version:

```tsx
// In Hero.tsx, replace:
import MeshGradient from './MeshGradient';

// With:
import CanvasMeshGradient from './CanvasMeshGradient';

// Then replace the component:
<CanvasMeshGradient 
  colors={['#0a0a0a', '#1a1a3e', '#2d1b4e', '#1e3a5f']}
  speed={0.0005}
  pointCount={4}
/>
```

### Combine with Video (Layered Effect):

You can layer the mesh gradient over a video for a unique effect:

```tsx
<div className="absolute inset-0 w-full h-full z-0">
  {/* Video layer */}
  <video ... />
  
  {/* Mesh gradient overlay */}
  <MeshGradient 
    opacity={0.6}  // Semi-transparent overlay
    colors={['transparent', '#1a1a3e80', '#2d1b4e80']}
  />
</div>
```

---

## 🎯 Key Concepts Explained

### What is a Mesh Gradient?
A mesh gradient is created by overlapping multiple radial gradients at different positions. As these gradients move and blend together, they create a fluid, organic-looking background.

### CSS Approach:
- **Pros:** Lightweight, GPU-accelerated, easy to customize
- **Cons:** Less dynamic, fixed animation paths

### Canvas Approach:
- **Pros:** More dynamic, real-time calculations, smoother
- **Cons:** Slightly more CPU intensive, more complex

---

## 💡 Pro Tips

1. **Performance:** CSS version is generally better for performance
2. **Color Selection:** Use colors that are close in hue for smoother blends
3. **Opacity:** Lower opacity (0.6-0.8) can create subtle, elegant effects
4. **Testing:** Try different color combinations to match your brand
5. **Mobile:** Both versions work on mobile, but CSS is more battery-friendly

---

## 🔧 Troubleshooting

**Gradient not animating?**
- Check that CSS animations are enabled
- Verify `intensity` prop is not 0

**Colors too bright/dark?**
- Adjust the base color (first in array)
- Lower the opacity prop
- Use darker/lighter color values

**Performance issues?**
- Use CSS version instead of Canvas
- Reduce `pointCount` in Canvas version
- Lower `intensity` for slower animations

---

## 🎨 Color Palette Suggestions

```tsx
// Dark & Mysterious
['#0a0a0a', '#1a1a2e', '#2d1b3e', '#1e2a4f']

// Ocean Deep
['#0a0a1a', '#1a2a4e', '#2a3a6e', '#1a3a5f']

// Sunset Vibes
['#1a0a0a', '#3d1a1a', '#5d2a1a', '#4a1a2a']

// Purple Dream
['#0a0a1a', '#2a1a3e', '#4a2a5e', '#3a1a4e']
```

Happy coding! 🚀

