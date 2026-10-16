# Coffee Shop Mobile App UI

A responsive coffee shop app UI built with **React** and **Vite**. It works on mobile, tablet and desktop.

**Live demo:** coffee-shop-51wj5doy1-ft-end.vercel.app


**Github repository url:** https://github.com/dhanushbabu0118/coffee-shop

## Screens

1. **Get Started** - onboarding screen
2. **Home** - search, promo banner, category chips, coffee grid
3. **Detail** - coffee info, size selector, price, Buy Now
4. **Order** - Deliver / Pick Up, quantity, payment summary
5. **Tracking** - map route, delivery progress, courier info

## Features

- Live search and category filtering
- Favorites (heart on cards and on the Detail screen)
- Size selection (S / M / L) that updates the price
- Quantity stepper that updates the payment summary
- Notifications tab
- Responsive layouts:
  - Mobile: under 768px, bottom navigation
  - Tablet: 768px to 1099px, 3-column grid
  - Desktop: 1100px and up, sidebar navigation, 4-column grid

## Tech Stack

- React 18
- Vite 5
- Plain CSS (no UI library)

## Getting Started

```bash
npm install
npm run dev
```

Open the local link shown in the terminal (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

The production build is created in the `dist` folder.

## Project Structure

```
coffee-shop-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx      # app entry
    ├── App.jsx       # screens and interactions
    ├── data.js       # coffee items, categories, sizes
    └── index.css     # styles and responsive breakpoints
```

## Deployment

Deployed on Vercel / Netlify with:

- Build command: `npm run build`
- Output directory: `dist`