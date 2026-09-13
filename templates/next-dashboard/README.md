# Next.js Dashboard Starter Template

A modern, scalable Next.js Dashboard boilerplate modeled after **shadcn/ui v4.21.0 Sidebar-07, Login-01 & Signup-01**, powered by `@base-ui/react`, Tailwind CSS v4, Zustand v5, Zod, and React Hook Form.

## 🚀 Tech Stack

- **Framework:** [Next.js 15+ (App Router)](https://nextjs.org) with React 19
- **UI Architecture:** [shadcn/ui Installation & Standards](https://ui.shadcn.com/docs/installation)
- **Layout & Design:** [shadcn/ui Sidebar-07 (Aria Block)](https://github.com/shadcn-ui/ui/tree/shadcn%404.21.0/apps/v4/registry/bases/aria/blocks/sidebar-07)
- **Auth Blocks:** [Login-01](https://github.com/shadcn-ui/ui/tree/shadcn%404.21.0/apps/v4/registry/bases/aria/blocks/login-01) & [Signup-01](https://github.com/shadcn-ui/ui/tree/shadcn%404.21.0/apps/v4/registry/bases/aria/blocks/signup-01)
- **UI Primitives:** [@base-ui/react](https://base-ui.com) (Unstyled headless primitives)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (`@theme` CSS variables) + CVA
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **State Management:** [Zustand v5](https://zustand-demo.pmnd.rs) (SSR-safe modular stores)
- **HTTP Client:** [Axios](https://axios-http.com) with interceptors and `ApiError`
- **Testing:** [Jest](https://jestjs.io) + [@testing-library/react](https://testing-library.com)
- **Icons:** [Lucide React](https://lucide.dev)

---

## 📁 Directory Layout

```
src/
├── app/
│   ├── (auth)/             # Login-01 & Signup-01 auth flows
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/        # Sidebar-07 shell & dashboard pages
│   │   ├── page.tsx        # Overview metrics, charts, transactions
│   │   └── settings/       # Account settings with Zod validation
│   └── api/                # Mock auth & analytics API endpoints
├── components/
│   ├── auth/               # LoginForm & RegisterForm blocks
│   ├── layout/             # Sidebar-07 (AppSidebar, TeamSwitcher, NavMain, NavUser, Header)
│   └── ui/                 # Base UI headless primitives (Sidebar, Dialog, Dropdown, etc.)
├── hooks/                  # Custom hooks (useMobile, useDebounce, useDisclosure)
├── lib/                    # Singletons (Axios client, Zod env parser, cn helper)
├── services/               # API Service & Repository layer
├── stores/                 # Zustand stores (auth, dashboard)
├── types/                  # TypeScript interfaces & API types
└── validators/             # Zod validation schemas
```

---

## 🛠️ Getting Started

```bash
# Install dependencies
yarn install

# Run development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) for the Dashboard, [http://localhost:3000/login](http://localhost:3000/login) for Login, and [http://localhost:3000/register](http://localhost:3000/register) for Register.

---

## 🧪 Testing & Quality

```bash
# Run unit tests
yarn test

# Run linter
yarn lint

# Build for production
yarn build
```
