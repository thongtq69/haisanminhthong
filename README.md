# Noel Sea Crab - E-commerce Homepage

A modern, interactive e-commerce homepage for seafood and crab sales with a Christmas/winter theme. Built with React, Tailwind CSS, and Framer Motion.

## Features

- 🎄 **Christmas & Winter Theme** - Beautiful seasonal design with snowflakes, Christmas icons, and winter atmosphere
- 🦀 **Seafood Focus** - Dedicated to fresh crab and seafood products
- ✨ **Modern Animations** - Parallax effects, scroll animations, hover interactions, and mouse movement effects
- 🎠 **Auto Carousel** - Rotating hero banners with automatic slide transitions
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Beautiful UI/UX** - Clean, modern design inspired by The Gioi Di Dong layout

## Technology Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations and motion effects
- **Vite** - Build tool and dev server

## Project Structure

```
seafood-crab-homepage/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Rating.jsx
│   │   │   └── Icons.jsx
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx  # Hero with parallax & carousel
│   │   ├── CategorySection.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductCard.jsx
│   │   ├── FlashSaleSection.jsx
│   │   ├── FeatureSection.jsx
│   │   ├── BlogSection.jsx
│   │   └── Footer.jsx
│   ├── data/                # Mock data
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── blog.js
│   │   └── carousel.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   
   File `.env.development` (cho local development):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   
   File này đã có sẵn trong project. Nếu chưa có, tạo file `.env.development` với nội dung trên.

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   Frontend sẽ chạy tại: `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## Deploy lên Vercel

1. **Connect repository** trên Vercel Dashboard
2. **Set Environment Variables:**
   ```
   VITE_API_URL=https://be-haisanminhthong.onrender.com/api
   ```
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Frontend URL:** `https://haisanminhthong.vercel.app`

**Lưu ý quan trọng:**
- `VITE_API_URL` phải được set trên Vercel Environment Variables
- Vercel sẽ tự động build với biến môi trường này
- Không cần sửa code khi deploy, chỉ cần set biến môi trường trên Vercel

## Key Features Explained

### Hero Section
- **Parallax Background**: Multiple layers (ocean waves, snow, decorative elements) moving at different speeds on scroll
- **Auto Carousel**: Rotates through 3 promotional banners every 5 seconds
- **Mouse Movement Effects**: Decorative crab icons and bubbles follow mouse movement
- **Snowfall Animation**: Animated snowflakes falling continuously

### Interactive Elements
- **Scroll Animations**: Sections fade in and slide up as you scroll
- **Hover Effects**: Product cards lift up, images zoom, and additional info appears
- **Smooth Transitions**: All interactions use smooth, polished animations

### Color Scheme
- **Red (#E53935)**: Christmas accents, CTAs, badges
- **Blue (#1565C0)**: Ocean theme, backgrounds, headers
- **Supporting Colors**: Light blues and whites for snowy feeling

## Customization

### Adding Products
Edit `src/data/products.js` to add or modify products.

### Modifying Categories
Edit `src/data/categories.js` to change category information.

### Updating Blog Posts
Edit `src/data/blog.js` to add or modify blog entries.

### Changing Carousel Slides
Edit `src/data/carousel.js` to modify hero carousel content.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- Images use placeholder URLs. Replace with actual product images in production.
- All prices are in Vietnamese Dong (₫) format.
- The design is optimized for e-commerce conversion with clear CTAs and product focus.

## License

This project is created for demonstration purposes.

