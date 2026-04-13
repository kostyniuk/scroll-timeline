# Scroll Timeline

A scroll-driven React timeline component with a two-color axis — one color for the path already covered, another for the path ahead. Optionally pins each item's icon as you scroll through its content.

## Features

- **Scroll-driven two-color axis** — powered by `motion`'s `useScroll`, zero re-renders
- **Sticky icons** — each icon pins at a configurable viewport offset while you read the entry
- **Fully configurable** — colors, line width, icon size, sticky offset
- **TypeScript** — complete type definitions included
- **Tailwind CSS** — styling via utility classes, easy to override

## Usage

Copy `components/timeline.tsx` into your project, then:

```tsx
import { Timeline } from "@/components/timeline";

<Timeline
  items={[
    {
      period: "2024 — Present",
      title: "Engineering Lead",
      subtitle: "Acme Corp",
      description: "...",
      tags: ["React", "TypeScript"],
      icon: "A",
      isCurrent: true,
    },
  ]}
  sticky
  coveredColor="var(--foreground)"
  stickyOffset={80}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TimelineItem[]` | — | Array of timeline entries |
| `sticky` | `boolean` | `true` | Pin icons at `stickyOffset` while scrolling |
| `coveredColor` | `string` | `"currentColor"` | CSS color for the scrolled-past axis segment |
| `uncoveredColor` | `string` | 18% of `coveredColor` | CSS color for the future axis segment |
| `lineWidth` | `number` | `2` | Axis line width in pixels |
| `stickyOffset` | `number` | `80` | Viewport top distance where icons stick (px) |
| `iconSize` | `number` | `24` | Icon circle diameter in pixels |
| `className` | `string` | — | Extra class names on the root element |

## Dependencies

- [motion](https://motion.dev) — for `useScroll` and scroll-driven animation
- [Tailwind CSS v4](https://tailwindcss.com)

## License

MIT
