# GPU-Optimized Animation Guidelines

## Overview
All animations in ASLA use transform and opacity only for GPU rendering at 60fps.

## GPU-Safe Properties
✅ **Always use:**
- `transform: translate()` - For position changes
- `transform: scale()` - For size changes
- `transform: rotate()` - For rotation changes
- `opacity` - For fading effects

❌ **Never use for animations:**
- `left`, `right`, `top`, `bottom` - Use transform instead
- `width`, `height` - Use transform: scale() instead
- `margin`, `padding` - Use transform instead
- `color`, `background-color` - Use opacity layers instead

## Implementation Patterns

### 1. Position Movement (GPU-Safe)
```tsx
animate={{ x: 100, y: 50 }}  // ✅ GPU accelerated
animate={{ left: 100, top: 50 }}  // ❌ CPU intensive
```

### 2. Scaling (GPU-Safe)
```tsx
animate={{ scale: 1.2 }}  // ✅ GPU accelerated
animate={{ width: '120%' }}  // ❌ CPU intensive
```

### 3. Opacity/Fading (GPU-Safe)
```tsx
animate={{ opacity: 0.5 }}  // ✅ GPU accelerated
```

### 4. Rotation (GPU-Safe)
```tsx
animate={{ rotate: 45 }}  // ✅ GPU accelerated
```

## Performance Checklist
- ✅ All card hovers use transform/opacity only
- ✅ All modal animations use transform/opacity only
- ✅ All scroll animations use useTransform hooks
- ✅ All spring physics optimized with damping
- ✅ Parallax effects use transform3d
- ✅ No expensive computations during render

## Monitoring Performance
- Use Chrome DevTools Performance tab
- Look for 60fps solid frame rate
- Check GPU acceleration in Rendering tab
- Monitor "paint" time (should be low)
- Verify "composite" frames are GPU-rendered

## Common Jank Sources to Avoid
1. ❌ Animating `left`/`top` instead of `x`/`y`
2. ❌ Animating `width`/`height` instead of `scale`
3. ❌ DOM mutations during animations
4. ❌ Layout thrashing (read/write cycles)
5. ❌ Heavy JavaScript during animations
6. ❌ Blur/shadow with large values during animations
7. ❌ Too many simultaneous animations (batch with stagger)
8. ❌ useMotionValue without proper memoization

## Framer Motion Optimizations
- Use `layoutId` for shared layout animations
- Memoize variant definitions
- Use `transition={{ type: 'spring', ... }}` for smoothness
- Avoid `whileInView` on heavy components
- Use `viewport={{ once: true }}` to prevent re-triggers
- Batch animations with stagger for efficiency
