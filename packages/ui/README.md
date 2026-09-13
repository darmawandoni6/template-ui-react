# 🎨 Central UI Package (`packages/ui`)

This directory is the **Single Source of Truth** for all headless `@base-ui/react` + Tailwind CSS v4 components across all project templates (`next-ts`, `next-dashboard`, etc.).

---

## 📚 UI Framework Documentation & References

The UI components in this package are designed following the modern **shadcn/ui** architecture and headless primitives:

- **shadcn/ui Framework & Installation Guide:** [https://ui.shadcn.com/docs/installation](https://ui.shadcn.com/docs/installation)
- **Base UI Component Primitives:** [https://base-ui.com](https://base-ui.com)
- **Tailwind CSS v4 Documentation:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

---

## ⚡ 1x Maintenance Rule

> **CRITICAL:** Whenever you add, fix, or update any UI component, **edit it here in `packages/ui/` ONLY**.

### Synchronizing Changes to Templates

The custom synchronization engine (`scripts/sync-ui.js`) selectively distributes only the components required by each template and generates tailored `index.ts` exports:

```bash
# From repository root:
yarn sync:ui

# Or format and sync in one step:
yarn format
```

---

## 📦 Component Registry & Template Distribution

| Component           | Base Primitive                 | Features / Styling Conventions                     | `next-ts` | `next-dashboard` |
| :------------------ | :----------------------------- | :------------------------------------------------- | :-------: | :--------------: |
| `alert-dialog.tsx`  | `@base-ui/react/dialog`        | Confirmation modal, focus trap, centered translate |     ✓     |        ✓         |
| `avatar.tsx`        | `@base-ui/react/avatar`        | User profile avatar with initials fallback         |     -     |        ✓         |
| `badge.tsx`         | `class-variance-authority`     | Semantic status badges (default, secondary, etc.)  |     ✓     |        ✓         |
| `breadcrumb.tsx`    | Accessible Nav                 | Breadcrumb nav with `render` prop & wrapping       |     -     |        ✓         |
| `button.tsx`        | `@base-ui/react/button`        | Button with `loading` spinner & size variants      |     ✓     |        ✓         |
| `card.tsx`          | Semantic HTML                  | Card layout with header, title, content, footer    |     ✓     |        ✓         |
| `checkbox.tsx`      | `@base-ui/react/checkbox`      | Accessible checkbox with `data-checked:` variant   |     ✓     |        ✓         |
| `dialog.tsx`        | `@base-ui/react/dialog`        | Accessible modal dialog with backdrop blur         |     ✓     |        ✓         |
| `dropdown-menu.tsx` | `@base-ui/react/menu`          | Dropdown menu with positioning and keyboard nav    |     -     |        ✓         |
| `error-form.tsx`    | Semantic HTML                  | Form validation error display helper               |     ✓     |        ✓         |
| `input.tsx`         | Semantic HTML                  | Controlled input with password visibility toggle   |     ✓     |        ✓         |
| `label.tsx`         | Semantic HTML                  | Accessible form label with CVA variants            |     ✓     |        ✓         |
| `separator.tsx`     | `@base-ui/react/separator`     | Canonical `h-px` / `w-px` decorative divider       |     -     |        ✓         |
| `sheet.tsx`         | `@base-ui/react/dialog`        | Sliding drawer panel with canonical transitions    |     -     |        ✓         |
| `sidebar.tsx`       | `@base-ui/react` + `useRender` | Sidebar-07 system with collapsible icon/offcanvas  |     -     |        ✓         |
| `skeleton.tsx`      | Semantic HTML                  | Animated pulse loading placeholder                 |     -     |        ✓         |
| `table.tsx`         | Semantic HTML                  | Accessible data table with `has-[[role=checkbox]]` |     -     |        ✓         |
| `tooltip.tsx`       | `@base-ui/react/tooltip`       | Hover/focus tooltip with delay and popup arrow     |     -     |        ✓         |

---

## 🎯 Tailwind CSS v4 & Base UI Standards

- **State Selectors:** Always use native `@base-ui/react` attribute variants (e.g. `data-checked:`, `data-open:`, `data-closed:`, `data-disabled:`, `data-highlighted:`).
- **Canonical Scale:** Avoid arbitrary units where standard scale exists (e.g. `translate-y-10`, `stroke-3`, `h-px`, `min-w-32`, `rounded-xs`).
- **Zero Conflict Rule:** Never mix conflicting axis properties in the same modifier block (e.g. `my-2 mr-2 ml-0` instead of `m-2 ml-0`).
