# AGENTS.md

Welcome to the **template-ui-react** repository. This document serves as the single source of truth, architectural standard, and comprehensive operational guide for AI agents and core maintainers working across this codebase.

---

## 1. Project Overview & Architectural Mission

`template-ui-react` is an enterprise-ready CLI scaffolding tool designed to bootstrap modern React and Next.js applications in seconds with zero configuration friction.

### Dual-Layer Architecture

1. **CLI Layer (`/bin`, `/scripts`, `/utils`):**
   - Executable node binaries built using ESM (`commander`, `inquirer`, `ora`, `shelljs`, `chalk`).
   - Responsible for interactive prompt flows, system dependency validation, safe file transfer, lockfile synchronization, and project initialization.
2. **Templates Layer (`/templates/*`):**
   - Autonomous, standalone frontend application templates.
   - Each template must be completely self-sufficient and capable of running tests, linting, and production builds independently.

---

## 2. Directory Layout & File Structure

```
template-ui-react/
├── bin/                          # CLI entry points and CLI command handlers
│   ├── index.js                  # Main CLI executable (bin runner: #!/usr/bin/env node)
│   ├── init-project.js           # Interactive project initialization workflow
│   ├── info.js                   # CLI environment diagnostics output
│   └── update.js                 # CLI version update checker
├── scripts/                      # Helper scripts for scaffolding
│   ├── setup-project.js          # File copying & package.json metadata transformer
│   └── copy-yarn.js              # Yarn lockfile synchronization engine
├── utils/                        # Core CLI utility modules
│   ├── center-text.js            # Terminal text centering helper
│   ├── copy-file.js              # Safe asynchronous recursive file copying engine
│   ├── has-pkg-manager.js        # Global package manager detector (npm, yarn, pnpm)
│   └── run-command.js            # Safe child_process spawn execution wrapper
├── packages/                     # Shared canonical modules
│   └── ui/                       # Single Source of Truth for @base-ui/react + Tailwind v4 components
├── templates/                    # Isolated boilerplate templates
│   ├── next-ts/                  # Next.js App Router + TypeScript + Tailwind v4 + Base UI + Zustand
│   └── next-dashboard/           # Next.js Dashboard starter template
├── package.json                  # Root package configuration for CLI distribution
├── eslint.config.js              # ESLint flat configuration for root CLI
├── .prettierrc                   # Prettier rules for formatting
├── .prettierignore               # Prettier ignore list
├── README.md                     # Public npm package documentation
└── AGENTS.md                     # Agent & contributor guidelines (this file)
```

---

## 3. Engineering Principles & Quality Standards

### UI Component Single Source of Truth (1x Maintenance Rule)

- **Source of Truth (`packages/ui/`):**
  - All `@base-ui/react` primitives and UI components are defined and maintained in `packages/ui/`.
  - **Never** manually duplicate or fragment UI changes across templates. Always edit in `packages/ui/` first and run `yarn sync:ui` (`node scripts/sync-ui.js`).
  - The synchronization engine selectively distributes only the components required by each template (e.g. core form/dialog primitives for `next-ts`, full component suite for `next-dashboard`) and generates tailored `index.ts` export files.

### Clean Architecture & Layer Separation

When contributing to templates (such as `templates/next-ts` or `templates/next-dashboard`):

- **UI Primitives (`src/components/ui/`):**
  - Use headless unstyled primitives (`@base-ui/react`) combined with `class-variance-authority` (CVA).
  - Components must remain pure, accessible, and decoupled from application state.
- **State Management (`src/stores/`):**
  - Implement modular, SSR-safe stores using `zustand` v5.
  - Never instantiate global singleton closures outside React context or SSR boundary.
- **Network & API Layer (`src/lib/axios.ts` & `src/services/`):**
  - Centralize Axios instance with request and response interceptors.
  - Never execute `redirect` side effects inside interceptors in a way that breaks Server Component execution.
  - Wrap errors using standard `ApiError` classes.
- **Runtime Validation (`src/validators/`):**
  - Validate all external API inputs, forms, and environment variables using `zod` schemas.
  - Derive TypeScript interfaces using `z.infer<typeof schema>`.
- **Path Aliases:**
  - Always use standard path aliases `@/*` pointing to `./src/*`. Never introduce scattered or fragmented alias prefixes.

### TypeScript Strictness & Code Conventions

- Maintain `"strict": true` across all `tsconfig.json` files.
- Disallow `any`; use `unknown` with type guards or Zod parsers.
- Use React 19 forward-compatible component patterns without `useLayoutEffect` to avoid SSR hydration warnings.
- Full keyboard navigation and ARIA roles must be preserved on all interactive components.

---

## 4. CLI Safety & Operational Boundaries

1. **Path Resolution Safety:**
   - Never use `process.cwd()` to locate repository-internal assets or template folders.
   - Always resolve template assets using `import.meta.url` via `path.dirname(fileURLToPath(import.meta.url))`.
2. **Asynchronous File Copying:**
   - In `utils/copy-file.js`, all recursive directory copying calls must be explicitly `await`-ed.
   - Never copy build artifacts, cache, or lockfiles (`node_modules`, `.next`, `dist`, `build`, `coverage`, `.DS_Store`).
3. **Target Directory Validation:**
   - Always verify if the destination directory exists before attempting to scaffold.

---

## 5. Testing & Verification Workflow

Agents must execute and verify all of the following commands before completing any task:

### A. Root CLI Verification

```bash
# 1. Format root codebase
yarn format

# 2. Lint root codebase
yarn lint

# 3. Test CLI binary options
node bin/index.js --help
node bin/index.js --version
```

### B. Template Verification (`templates/next-ts`)

```bash
cd templates/next-ts

# 1. Verify TypeScript types
npx tsc --noEmit

# 2. Run automated unit tests
yarn test

# 3. Verify ESLint rules
yarn lint

# 4. Verify Next.js production build
yarn build
```

---

## 6. Release & Publishing Checklist (NPM)

Before publishing a new version to npm:

- [ ] Ensure `package.json` `"version"` is updated following Semantic Versioning (`semver`).
- [ ] Ensure `"main"` and `"bin"` point to `./bin/index.js`.
- [ ] Run full test suites on all templates under `templates/`.
- [ ] Verify that `npm pack --dry-run` includes all required template files while omitting `node_modules` and `.next`.
