# FreshBites 🍃 — Fast & Fresh Nigerian Snack Ordering Web App

FreshBites is a modern, responsive e-commerce web application designed for quick snack and beverage ordering. Built with React, Vite, Tailwind CSS, and Zustand, it streamlines the buying experience by eliminating complex payment gateways and forwarding completed orders straight to WhatsApp.

## Features

- **Global Cart State Management:** Powered by Zustand with automatic `localStorage` persistence across page reloads.
- **Direct WhatsApp Checkout:** Compiles ordered snacks, quantities, and subtotal into an automatically formatted WhatsApp chat message.
- **Live Search & Availability Status:** Real-time header search displays matching items, availability badges, and quick-add actions.
- **Dynamic Category & Price Filtering:** Instant client-side filtering by category (Snacks, Beverages, Bakery, and Combo Packs), price range, and stock status.
- **Synchronized Badges & Quantities:** Real-time cart counters across the navigation header, catalog cards, and sticky cart drawer.
- **Fully Responsive UI:** Mobile-friendly layout styled with Tailwind CSS, Lucide React icons, and subtle micro-interactions.

## Tech Stack

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) with `persist` middleware
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router DOM](https://reactrouter.com/)

## Project Structure

```text
freshbites/
├── public/
│   ├── favicon.svg          # Brand leaf favicon
│   └── hero.png             # Hero banner asset
├── src/
│   ├── components/
│   │   ├── SiteHeader.jsx   # Navigation, live search, and cart badge
│   │   └── SiteFooter.jsx   # Footer with WhatsApp support CTA
│   ├── data/
│   │   └── products.js      # Centralized product catalog
│   ├── pages/
│   │   ├── Home.jsx         # Landing page with hero banner and fast cart
│   │   ├── Shop.jsx         # Filterable catalog and sticky checkout drawer
│   │   ├── About.jsx        # Brand story, mission, and values
│   │   ├── Contact.jsx      # Contact info, map preview, and inquiry form
│   │   └── NotFound.jsx     # 404 error page
│   ├── store/
│   │   └── useCartStore.js  # Global Zustand cart store
│   ├── App.jsx              # Application routes
│   └── main.jsx             # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- `npm`, `yarn`, or `pnpm`

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Destiny27052005/freshbites.git
cd freshbites
```

Replace `your-username` with the appropriate GitHub username or repository URL.

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in your terminal to view the application.

**4. Build for production**

```bash
npm run build
```

**5. Preview the production build**

```bash
npm run preview
```

## Configuration

### WhatsApp Checkout Number

To direct customer orders and support messages to your business WhatsApp number, update the relevant phone number and click-to-chat links in these files:

- `src/pages/Home.jsx` — inside `handleWhatsAppCheckout`
- `src/pages/Shop.jsx` — inside `handleWhatsAppOrder`
- `src/pages/Contact.jsx` — inside `handleWhatsAppChat`
- `src/components/SiteFooter.jsx` — inside `handleSupportClick`

Use the following format:

```text
https://wa.me/<country_code><phone_number>
```

For example, a Nigerian number can use this format:

```text
https://wa.me/2348012345678
```

Use your actual business number in production. The number should include the country code and contain digits only, without a plus sign, spaces, or punctuation.

### WhatsApp Order Flow

1. Customers browse the product catalog.
2. They add products to the cart and adjust quantities.
3. The application calculates the subtotal.
4. The checkout handler formats the order details into a WhatsApp message.
5. WhatsApp opens with the prepared message.
6. The customer reviews and sends the message to the vendor.

**Note:** WhatsApp checkout does not automatically send the message or process payments. The customer must send the message manually, and the vendor confirms the order.

## License

This project is intended to be licensed under the [MIT License](https://opensource.org/license/mit/).