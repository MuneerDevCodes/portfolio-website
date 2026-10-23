# NeoCart — Portfolio Project Copy

## Project title

NeoCart — Browser-Based E-Commerce Storefront

## Tagline

A browser-based demo of the workflows in a small e-commerce website.

## Short description

NeoCart is a responsive demo that models the core workflows of a small e-commerce website. Built with Next.js, React, and TypeScript, it lets shoppers browse and filter a seeded product catalog, manage a cart and wishlist, and place simulated Cash on Delivery orders, with shopping data saved locally in the browser.

## Full project description

I built NeoCart as a demo workflow for a small e-commerce website, covering the customer-facing experience from browsing products through checkout and order management. It does not require an account, backend, or external payment service. Shoppers can explore 50 products across five categories, search and filter the catalog, view product details, and manage favorites and recently viewed items. They can check out with delivery details, optionally save those details on their device, and review or cancel orders later.

The app uses localStorage for browser-specific shopping preferences and IndexedDB for the product catalog and order history. This keeps the demo self-contained while demonstrating common e-commerce flows, persistent client-side state, and a responsive interface with light and dark themes.

## Key features

- Product catalog with search, category, price, stock, and sorting controls
- Grid and list display options
- Product detail pages, featured products, and category browsing
- Persistent cart with quantity management and a buy-now checkout flow
- Wishlist and recently viewed products
- Checkout form with validation, delivery estimates, and optional saved shipping details
- Simulated Cash on Delivery order placement
- Order history and detail pages, with cancellation and stock restoration
- Responsive layouts and light/dark themes
- Contact page that saves a message draft locally

## Technology

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- localStorage for cart, wishlist, preferences, recently viewed products, and consented shipping details
- IndexedDB for the product catalog and orders

## Technical highlights

- Designed the app around browser storage, with client-side loading states to support persisted data.
- Separated reusable UI, React context providers, hooks, data utilities, and TypeScript domain types.
- Implemented catalog filtering and sorting, checkout validation, order persistence, and stock updates without a server.
- Included clear demo boundaries: checkout simulates Cash on Delivery, contact messages are not transmitted, and user data remains in the current browser.

## Suggested portfolio-card version

**NeoCart** is a responsive demo of a small e-commerce website workflow, built with Next.js, React, and TypeScript. It features a searchable and filterable catalog, persistent cart and wishlist, simulated checkout, and local order history. The app uses localStorage and IndexedDB to demonstrate a self-contained shopping experience without a backend or account system.

## Links to add

- Live demo: [Add your deployed URL]
- Source code: [Add your repository URL]
