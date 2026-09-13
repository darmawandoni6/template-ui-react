<div align="center">

# ⚡ template-ui-react

**A modern CLI tool to quickly bootstrap production-ready React & Next.js projects with zero setup friction.**

[![npm version](https://img.shields.io/npm/v/template-ui-react.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/template-ui-react)
[![npm downloads](https://img.shields.io/npm/dm/template-ui-react.svg?style=flat-square&color=emerald)](https://www.npmjs.com/package/template-ui-react)
[![node version](https://img.shields.io/node/v/template-ui-react.svg?style=flat-square)](https://nodejs.org)
[![license](https://img.shields.io/npm/l/template-ui-react.svg?style=flat-square&color=orange)](LICENSE)

[Quick Start](#-quick-start) • [Interactive Flow](#-how-it-works) • [Templates](#-available-templates) • [CLI Commands](#-cli-commands) • [Contributing](#-contributing)

</div>

---

## 🚀 Quick Start

You can generate a new project instantly using `npx` (no global installation required):

```bash
npx template-ui-react new my-app
```

Or install globally via your preferred package manager:

```bash
# Using npm
npm install -g template-ui-react

# Using yarn
yarn global add template-ui-react

# Using pnpm
pnpm add -g template-ui-react
```

Then create a new project anytime:

```bash
template-ui-react new my-app
```

---

## 🪄 How It Works

Running `template-ui-react new <project-name>` starts an interactive prompt:

```text
? Install React template? Yes
? What project template would you like to generate? next-ts
? Do you want to install dependencies now? Yes
? Which package manager do you want to use? yarn

✔ Setting up project files...
✔ Installing dependencies using yarn...
✔ Setup project my-app succeeded! 🎉

Next steps:
  cd my-app
  yarn dev
```

---

## 📦 Available Templates

| Template                      | Stack                                                                                                                          | Ideal For                                                   |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------- |
| **`next-ts`** _(Recommended)_ | Next.js 15+ (App Router) • React 19 • Tailwind CSS v4 • Base UI • Zustand v5 • Zod • Axios • Jest                              | Fullstack web apps, SaaS, modern web portals                |
| **`next-dashboard`**          | Next.js 15+ (App Router) • Tailwind CSS v4 • shadcn/ui (Sidebar-07) • Base UI • Zustand • Zod • React Hook Form • Axios • Jest | Enterprise admin dashboards, analytics portals & backoffice |
| **`core-ui-next`**            | Next.js • React • CoreUI • SCSS • Modular Store                                                                                | Enterprise admin panels & complex management dashboards     |

---

## 🎨 Shared UI Architecture (`packages/ui`)

All `@base-ui/react` + Tailwind CSS v4 components across templates are maintained in **`packages/ui/`** following the **1x Maintenance Rule**:

- **Centralized Source of Truth:** Edit components once in `packages/ui/`.
- **Selective Sync (`yarn sync:ui`):** Distributes only the components required by each template (`next-ts` gets core primitives, `next-dashboard` gets the full component suite).
- **Zero Configuration Drift:** Automated synchronization ensures consistent accessibility, keyboard navigation, and design tokens across all boilerplate templates.

---

## 🛠️ CLI Commands & Options

| Command / Option                       | Description                                                |
| :------------------------------------- | :--------------------------------------------------------- |
| `template-ui-react new <project-name>` | Create and initialize a new project interactively          |
| `template-ui-react -i, --info`         | Display environment diagnostics (OS, Node.js, CLI version) |
| `template-ui-react update`             | Check and update the CLI to the latest version             |
| `template-ui-react -v, --version`      | Output the current version of the CLI                      |
| `template-ui-react -h, --help`         | Display help and list all available commands               |

---

## 💻 Local Development & Contributing

To contribute or test the CLI locally:

```bash
# 1. Clone repository
git clone https://github.com/darmawandoni6/template-ui-react.git
cd template-ui-react

# 2. Install dependencies
yarn install

# 3. Link CLI locally for testing
npm link
template-ui-react --help

# 4. Run linter and formatter
yarn format
yarn lint
```

---

## 📄 License

Distributed under the **ISC License**. See [LICENSE](LICENSE) for details.

---

<div align="center">
  <sub>Maintained by <a href="https://github.com/darmawandoni6">Doni Darmawan</a>. If you find this project helpful, give it a ⭐!</sub>
</div>
