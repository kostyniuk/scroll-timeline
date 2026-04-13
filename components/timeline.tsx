"use client";

import { motion, useScroll } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";

// ─── Public types ────────────────────────────────────────────────────────────

export type TimelineItem = {
  /** Unique key — falls back to array index */
  id?: string | number;
  /** Date / date-range label, rendered in monospace */
  period?: string;
  /** Primary heading */
  title: string;
  /** Secondary line below the title (e.g. company name) */
  subtitle?: string;
  /** Longer body text */
  description?: string;
  /** Icon rendered inside the circular indicator. Ignored when dot={true}. */
  icon?: ReactNode;
  /** Small pill tags rendered below the description */
  tags?: string[];
  /** Shows a live indicator badge next to the title */
  isCurrent?: boolean;
};

export type TimelineProps = {
  items: TimelineItem[];
  /**
   * Pin each item's icon at `stickyOffset` while the user reads through
   * the item's content. Powered by CSS `position: sticky`.
   * @default true
   */
  sticky?: boolean;
  /**
   * Render a small dot on the axis instead of a full icon circle.
   * Useful for minimal / event-style timelines with no icons.
   * @default false
   */
  dot?: boolean;
  /**
   * CSS color for the axis segment that has already been scrolled past.
   * Accepts any valid CSS color — hex, hsl(), oklch(), currentColor, etc.
   * @default "currentColor"
   */
  coveredColor?: string;
  /**
   * CSS color for the axis segment not yet reached.
   * Defaults to `coveredColor` at 18% opacity via `color-mix`.
   */
  uncoveredColor?: string;
  /**
   * Width of the axis line in pixels.
   * @default 2
   */
  lineWidth?: number;
  /**
   * Distance from the viewport top where icons stick (matches the `top`
   * in your sticky CSS, e.g. `top-20` = 80 px).
   * @default 80
   */
  stickyOffset?: number;
  /**
   * Diameter of the icon circle in pixels. Also sets the column width
   * so the axis stays centered regardless of size.
   * @default 24
   */
  iconSize?: number;
  className?: string;
};

// ─── Timeline ────────────────────────────────────────────────────────────────

export function Timeline({
  items,
  sticky = true,
  dot = false,
  coveredColor = "currentColor",
  uncoveredColor,
  lineWidth = 2,
  stickyOffset = 80,
  iconSize = 24,
  className,
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`start ${stickyOffset}px`, `end ${stickyOffset}px`],
  });

  // Center the axis on the icon column.
  const axisLeft = iconSize / 2;

  const resolvedUncoveredColor =
    uncoveredColor ??
    `color-mix(in srgb, ${coveredColor} 18%, transparent)`;

  // Shared absolute positioning — layout done via inline styles,
  // not Tailwind, so it works regardless of content scanning.
  const axisBase: CSSProperties = {
    position: "absolute",
    top: 0,
    left: axisLeft,
    width: lineWidth,
    height: "100%",
    transform: "translateX(-50%)",
    borderRadius: 9999,
  };

  return (
    <div
      ref={containerRef}
      // Critical layout via inline styles — Tailwind scanning is unreliable
      // for files outside `app/` depending on the project setup.
      style={{ position: "relative", display: "flex", flexDirection: "column" }}
      className={className}
    >
      {/* Layer 1 — uncovered axis (always full height) */}
      <div style={{ ...axisBase, backgroundColor: resolvedUncoveredColor }} />

      {/* Layer 2 — covered axis (grows from the top as you scroll) */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: axisLeft,
          width: lineWidth,
          height: "100%",
          borderRadius: 9999,
          backgroundColor: coveredColor,
          // Use motion's x so it composes correctly with scaleY.
          x: "-50%",
          scaleY: scrollYProgress,
          originY: 0,
        }}
      />

      {items.map((item, index) => (
        <TimelineRow
          key={item.id ?? index}
          item={item}
          sticky={sticky}
          dot={dot}
          stickyOffset={stickyOffset}
          iconSize={iconSize}
          coveredColor={coveredColor}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}

// ─── TimelineRow ─────────────────────────────────────────────────────────────

type TimelineRowProps = {
  item: TimelineItem;
  sticky: boolean;
  dot: boolean;
  stickyOffset: number;
  iconSize: number;
  coveredColor: string;
  isLast: boolean;
};

function TimelineRow({
  item,
  sticky,
  dot,
  stickyOffset,
  iconSize,
  coveredColor,
  isLast,
}: TimelineRowProps) {
  return (
    // Inline styles for the row layout — same rationale as the container.
    <div style={{ display: "flex", gap: "2.5rem" }}>

      {/* ── Indicator column ──────────────────────────────────────── */}
      <div
        style={{
          width: iconSize,
          flexShrink: 0,
          position: "relative",
          zIndex: 10,
        }}
      >
        {dot ? (
          // ── Dot variant ──────────────────────────────────────────
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // Offset so the dot center aligns with the first text line.
              paddingTop: iconSize / 2 - 4,
              ...(sticky
                ? { position: "sticky", top: stickyOffset }
                : {}),
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: coveredColor,
                flexShrink: 0,
              }}
            />
          </div>
        ) : (
          // ── Icon circle variant ───────────────────────────────────
          <div
            style={{
              width: iconSize,
              height: iconSize,
              backgroundColor: coveredColor,
              color: "var(--background)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: "bold",
              userSelect: "none",
              ...(sticky
                ? { position: "sticky", top: stickyOffset }
                : { position: "relative" }),
            }}
          >
            {item.icon}
          </div>
        )}
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          paddingBottom: isLast ? 0 : "4rem",
        }}
      >
        {item.period && (
          <p className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted-foreground mb-1.5">
            {item.period}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
          <h3 className="text-sm font-semibold leading-snug">{item.title}</h3>
          {item.isCurrent && (
            <span className="inline-flex items-center gap-1 font-mono text-[0.6rem] tracking-wide uppercase text-muted-foreground">
              <span className="block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              now
            </span>
          )}
        </div>

        {item.subtitle && (
          <p className="text-sm font-medium mb-1.5" style={{ color: "color-mix(in srgb, currentColor 70%, transparent)" }}>
            {item.subtitle}
          </p>
        )}

        {item.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-0.5 font-mono text-[0.6rem] rounded border border-border bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
