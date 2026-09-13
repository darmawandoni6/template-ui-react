# 🎨 Central UI Package (`packages/ui`)

This directory is the **Single Source of Truth** for all headless `@base-ui/react` + Tailwind CSS v4 components across all project templates (`next-ts`, `next-dashboard`, etc.).

---

## ⚡ 1x Maintenance Rule

> **CRITICAL:** Whenever you add, fix, or update any UI component, **edit it here in `packages/ui/` ONLY**.

### Synchronizing Changes to Templates

To distribute updates to all templates, run:

```bash
# From repository root
yarn sync:ui
```

---

## 📦 Component Registry

| Component           | Primitive                      | Description                                      |
| :------------------ | :----------------------------- | :----------------------------------------------- |
| `alert-dialog.tsx`  | `@base-ui/react/dialog`        | Modal confirmation dialog                        |
| `avatar.tsx`        | `@base-ui/react/avatar`        | User profile avatar with fallback                |
| `badge.tsx`         | `cva`                          | Semantic status badges                           |
| `breadcrumb.tsx`    | Accessible Nav                 | Breadcrumb navigation with `render` prop         |
| `button.tsx`        | `@base-ui/react/button`        | Button with `loading` state & full size variants |
| `card.tsx`          | Semantic HTML                  | Card layout with header, content, footer         |
| `checkbox.tsx`      | `@base-ui/react/checkbox`      | Accessible custom checkbox                       |
| `dialog.tsx`        | `@base-ui/react/dialog`        | Modal dialog with overlay                        |
| `dropdown-menu.tsx` | `@base-ui/react/menu`          | Dropdown menu with keyboard navigation           |
| `error-form.tsx`    | Semantic HTML                  | Form validation error feedback                   |
| `input.tsx`         | Semantic HTML                  | Controlled input with password visibility toggle |
| `label.tsx`         | Semantic HTML                  | Native accessible label                          |
| `separator.tsx`     | `@base-ui/react/separator`     | Visual horizontal/vertical separator             |
| `sheet.tsx`         | `@base-ui/react/dialog`        | Sliding side drawer panel                        |
| `sidebar.tsx`       | `@base-ui/react` + `useRender` | Collapsible sidebar system (Sidebar-07)          |
| `skeleton.tsx`      | Semantic HTML                  | Animated placeholder skeleton                    |
| `table.tsx`         | Semantic HTML                  | Accessible data table                            |
| `tooltip.tsx`       | `@base-ui/react/tooltip`       | Hover/focus tooltip with delay                   |
