# Next.js App Router Starter Template

A modern, clean-code, and scalable starter boilerplate for Next.js applications.

## 🚀 Tech Stack

- **Framework:** [Next.js 15+ (App Router)](https://nextjs.org) with React 19
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) with CSS Variables & `@theme`
- **UI Primitives:** [@base-ui/react](https://base-ui.com) (Unstyled headless components)
- **Component Variants:** [class-variance-authority (CVA)](https://cva.style)
- **State Management:** [Zustand v5](https://zustand-demo.pmnd.rs) (SSR-safe modular stores)
- **Form & Runtime Validation:** [Zod](https://zod.dev)
- **HTTP Client:** [Axios](https://axios-http.com) with typed interceptors and error handling
- **Testing:** [Jest](https://jestjs.io) with [@testing-library/react](https://testing-library.com)
- **Icons:** [Lucide React](https://lucide.dev)
- **Formatting & Linting:** ESLint Flat Config + Prettier + `prettier-plugin-tailwindcss`

---

## 📁 Directory Structure

```
src/
├── app/                  # Next.js App Router (pages, layouts, route handlers)
│   ├── api/placeholder/  # Example API route handler
│   ├── globals.css       # Tailwind v4 theme & base CSS
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Component showcase & demo page
├── components/
│   ├── ui/               # Reusable Base UI + CVA primitives (button, dialog, etc.)
│   └── common/           # Shared compound components
├── hooks/                # Custom React hooks (useDebounce, useDisclosure)
├── lib/                  # Core singletons (axios, utils, env schema)
├── services/             # API client & repository service layer
├── stores/               # Zustand stores
├── types/                # TypeScript interfaces & API types
└── validators/           # Zod validation schemas
```

---

## 🛠️ Getting Started

First, install dependencies:

```bash
# Using yarn
yarn install

# Using npm
npm install

# Using pnpm
pnpm install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🧪 Testing & Quality

```bash
# Run unit tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run linter
yarn lint

# Build for production
yarn build
```
