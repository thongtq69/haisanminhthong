# Quick Start Guide

## Installation & Running

1. **Navigate to project directory:**
   ```bash
   cd seafood-crab-homepage
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   The dev server will start on `http://localhost:5173` (or another port if 5173 is busy)

## Project Overview

This is a complete e-commerce homepage featuring:

### Main Sections:
1. **Navbar** - Fixed navigation with logo, menu, cart, and hotline
2. **Hero Section** - Full-screen hero with:
   - Parallax scrolling background
   - Auto-rotating carousel (3 slides)
   - Mouse movement parallax effects
   - Animated snowfall
   - Ocean wave animations
3. **Category Section** - 5 crab/seafood categories with hover effects
4. **Product Grid** - 12 featured products in responsive grid
5. **Flash Sale Section** - 3 Christmas combo deals with countdown timer
6. **Feature Section** - 4 service guarantees (fresh daily, fast delivery, etc.)
7. **Blog Section** - 5 recipe/blog posts with scroll animations
8. **Footer** - Company info, links, social media, contact details

### Key Features:
- ✅ Parallax scrolling effects
- ✅ Auto carousel with navigation dots
- ✅ Mouse movement parallax on decorative elements
- ✅ Scroll-triggered animations (fade-in, slide-up)
- ✅ Hover interactions on cards and buttons
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Christmas/winter theme throughout
- ✅ SEO-optimized HTML structure

### Color Scheme:
- **Red**: #E53935 (Christmas accents, CTAs)
- **Blue**: #1565C0 (Ocean theme, backgrounds)
- **Light Blue**: #F5F8FF, #EDF2FF (Snowy backgrounds)

## Customization

### Change Products:
Edit `src/data/products.js`

### Change Categories:
Edit `src/data/categories.js`

### Change Blog Posts:
Edit `src/data/blog.js`

### Change Carousel Slides:
Edit `src/data/carousel.js`

### Modify Colors:
Edit `tailwind.config.js` - colors section

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Notes

- All images use placeholder URLs - replace with actual product images
- Prices are formatted in Vietnamese Dong (₫)
- The design is optimized for conversion with clear CTAs

