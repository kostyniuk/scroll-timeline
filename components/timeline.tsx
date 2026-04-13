"use client";

/**
 * Scroll Timeline
 *
 * A scroll-driven timeline with a two-color axis:
 *  - coveredColor   → the portion already scrolled past
 *  - uncoveredColor → the portion not yet reached
 *
 * Optionally pins icons with CSS `position: sticky` so the current
 * item's icon stays visible while you read through its content.
 */

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
  /** Icon rendered inside the circular indicator */
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
   * Diameter of the icon circle in pixels.
   * @default 24
   */
  iconSize?: number;
  className?: string;
};

// ─── Timeline ────────────────────────────────────────────────────────────────

export function Timeline({
  items,
  sticky = true,
  coveredColor = "currentColor",
  uncoveredColor,
  lineWidth = 2,
  stickyOffset = 80,
  iconSize = 24,
  className,
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // scrollYProgress: 0 when the container top reaches stickyOffset,
  //                  1 when the container bottom reaches stickyOffset.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`start ${stickyOffset}px`, `end ${stickyOffset}px`],
  });

  // The axis is centered on the icon column (iconSize / 2 from left).
  const axisLeft = iconSize / 2;

  // Shared positioning for both axis layers.
  const axisStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: axisLeft,
    width: lineWidth,
    height: "100%",
    transform: "translateX(-50%)",
    borderRadius: 9999,
  };

  // Fall back to a translucent tint of coveredColor when uncoveredColor
  // is not specified. color-mix() is supported in all modern browsers.
  const resolvedUncoveredColor =
    uncoveredColor ??
    `color-mix(in srgb, ${coveredColor} 18%, transparent)`;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col${className ? ` ${className}` : ""}`}
    >
      {/* Layer 1 — uncovered axis (always full height) */}
      <div
        style={{ ...axisStyle, backgroundColor: resolvedUncoveredColor }}
      />

      {/* Layer 2 — covered axis (grows from top as you scroll) */}
      <motion.div
        style={{
          ...axisStyle,
          // Use motion's x instead of CSS transform so it composes
          // correctly with scaleY without overwriting the transform.
          x: "-50%",
          transform: undefined, // let motion own the transform
          backgroundColor: coveredColor,
          scaleY: scrollYProgress,
          originY: 0, // scale from the top edge
        }}
      />

      {items.map((item, index) => (
        <TimelineRow
          key={item.id ?? index}
          item={item}
          sticky={sticky}
          stickyOffset={stickyOffset}
          iconSize={iconSize}
          coveredColor={coveredColor}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}

// ─── TimelineRow (internal) ───────────────────────────────────────────────────

type TimelineRowProps = {
  item: TimelineItem;
  sticky: boolean;
  stickyOffset: number;
  iconSize: number;
  coveredColor: string;
  isLast: boolean;
};

function TimelineRow({
  item,
  sticky,
  stickyOffset,
  iconSize,
  coveredColor,
  isLast,
}: TimelineRowProps) {
  return (
    <div className="flex gap-6 sm:gap-10">
      {/* ── Icon column ─────────────────────────────────────────────── */}
      {/*
       * The wrapper must be at least as tall as the content so the sticky
       * element has a containing block to stick inside.
       * flex-shrink-0 prevents the column from collapsing.
       */}
      <div
        className="relative z-10 flex-shrink-0"
        style={{ width: iconSize }}
      >
        <div
          style={{
            width: iconSize,
            height: iconSize,
            backgroundColor: coveredColor,
            color: "var(--background)",
            ...(sticky
              ? { position: "sticky", top: stickyOffset }
              : { position: "relative" }),
          }}
          className="rounded-full flex items-center justify-center text-xs font-bold select-none"
        >
          {item.icon}
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className={`flex-1 min-w-0 ${isLast ? "pb-0" : "pb-16"}`}>
        {item.period && (
          <p className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted-foreground mb-1.5">
            {item.period}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
          <h3 className="text-sm font-semibold leading-snug">{item.title}</h3>
          {item.isCurrent && (
            <span className="inline-flex items-center gap-1 font-mono text-[0.6rem] tracking-wide uppercase text-muted-foreground">
              <span
                className="block w-1.5 h-1.5 rounded-full bg-green-500"
                style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
              />
              now
            </span>
          )}
        </div>

        {item.subtitle && (
          <p className="text-sm font-medium text-foreground/70 mb-1.5">
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
