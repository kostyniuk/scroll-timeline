"use client";

import { motion, useScroll } from "motion/react";
import React, { useRef, type RefObject, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";

// ─── Public types ────────────────────────────────────────────────────────────

export type TimelineSectionData = {
  title?: string;
  content?: string | string[];
};

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
  /** Collapsible extra sections — bullet lists, text blocks, etc. */
  additionalContent?: TimelineSectionData[];
  /** Whether the collapsible is open by default. First item defaults to true. */
  defaultExpanded?: boolean;
};

export type TimelineProps = {
  items: TimelineItem[];
  /**
   * Pin each item's icon at `stickyOffset` while the user reads its content.
   * Powered by CSS `position: sticky`.
   * @default true
   */
  sticky?: boolean;
  /**
   * Render a small dot on the axis instead of a full icon circle.
   * @default false
   */
  dot?: boolean;
  /**
   * CSS color for the axis segment already scrolled past.
   * Accepts any valid CSS color — hex, hsl(), oklch(), CSS variables.
   * @default "currentColor"
   */
  coveredColor?: string;
  /**
   * CSS color for the axis segment not yet reached.
   * Defaults to 18% opacity of coveredColor via color-mix().
   */
  uncoveredColor?: string;
  /**
   * Width of the axis line in pixels.
   * @default 2
   */
  lineWidth?: number;
  /**
   * Viewport distance from the top where icons stick and where scroll
   * progress starts/ends. Match this to your sticky header height.
   * @default 80
   */
  stickyOffset?: number;
  /**
   * Diameter of the icon circle in pixels. The axis auto-centers on it.
   * @default 24
   */
  iconSize?: number;
  /**
   * Ref to a scrollable container. When provided, scroll progress tracks
   * that element instead of the viewport — use this when the Timeline
   * lives inside a fixed-height overflow-y-auto div.
   */
  scrollContainer?: RefObject<HTMLElement | null>;
  className?: string;
};

// ─── TimelineSection ─────────────────────────────────────────────────────────

function TimelineSection({ section }: { section: TimelineSectionData }) {
  return (
    <div className="flex flex-col gap-2">
      {section.title ? (
        <ItemDescription className="font-medium text-foreground">
          {section.title}
        </ItemDescription>
      ) : null}
      {section.content ? (
        typeof section.content === "string" ? (
          <ItemDescription>{section.content}</ItemDescription>
        ) : (
          <ul className="flex flex-col gap-2 list-disc pl-5 text-left text-xs/relaxed font-normal text-muted-foreground">
            {section.content.map((item, index) => (
              <li key={`${index}-${item}`}>{item}</li>
            ))}
          </ul>
        )
      ) : null}
    </div>
  );
}

function TimelineSections({
  sections,
  className,
}: {
  sections: TimelineSectionData[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {sections.map((section, index) => (
        <TimelineSection
          key={`${index}-${section.title ?? "section"}`}
          section={section}
        />
      ))}
    </div>
  );
}

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
  scrollContainer,
  className,
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // When a scrollContainer ref is provided, track that element's scroll.
  // Otherwise track the container's position through the viewport.
  const { scrollYProgress } = useScroll(
    scrollContainer
      ? { container: scrollContainer }
      : {
          target: containerRef,
          offset: [`start ${stickyOffset}px`, `end ${stickyOffset}px`],
        }
  );

  // Center the axis line on the icon column (half of icon width from left).
  const axisLeft = iconSize / 2;

  const resolvedUncoveredColor =
    uncoveredColor ?? `color-mix(in srgb, ${coveredColor} 18%, transparent)`;

  return (
    <div ref={containerRef} className={cn("relative flex flex-col", className)}>

      {/* Layer 1 — uncovered axis (always full height) */}
      <div
        className="absolute top-0 h-full -translate-x-1/2 rounded-full"
        style={{
          left: axisLeft,
          width: lineWidth,
          backgroundColor: resolvedUncoveredColor,
        }}
      />

      {/* Layer 2 — covered axis (grows downward as you scroll) */}
      <motion.div
        className="absolute top-0 h-full rounded-full"
        style={{
          left: axisLeft,
          width: lineWidth,
          backgroundColor: coveredColor,
          // motion's x composes with scaleY without clobbering the transform
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
          isExpanded={item.defaultExpanded ?? index === 0}
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
  isExpanded: boolean;
};

function TimelineRow({
  item,
  sticky,
  dot,
  stickyOffset,
  iconSize,
  coveredColor,
  isExpanded,
}: TimelineRowProps) {
  const [open, setOpen] = React.useState(isExpanded);
  const hasAdditionalContent = Boolean(item.additionalContent?.length);

  return (
    <div className="flex gap-12">

      {/* ── Indicator column ─────────────────────────────────────────
       * shrink-0 keeps it at iconSize width. No explicit height — flex
       * align-items:stretch (default) automatically matches the content
       * column height, giving the sticky child room to actually stick.
       */}
      <div className="shrink-0" style={{ width: iconSize }}>
        {dot ? (
          // ── Dot variant ────────────────────────────────────────────
          <div
            className={cn("flex justify-center z-10", sticky && "sticky")}
            style={{
              paddingTop: iconSize / 2 - 4,
              ...(sticky ? { top: stickyOffset } : {}),
            }}
          >
            <div
              className="size-2 rounded-full shrink-0"
              style={{ backgroundColor: coveredColor }}
            />
          </div>
        ) : (
          // ── Icon circle variant ─────────────────────────────────────
          <div
            className={cn(
              "rounded-full flex items-center justify-center",
              "text-xs font-bold select-none z-10 text-background",
              sticky && "sticky"
            )}
            style={{
              width: iconSize,
              height: iconSize,
              backgroundColor: coveredColor,
              ...(sticky ? { top: stickyOffset } : {}),
            }}
          >
            {item.icon}
          </div>
        )}
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        <Item className="mb-12 last:mb-0">
          <ItemContent>
            {item.period && (
              <span className="text-[0.625rem] font-mono tracking-wide text-muted-foreground">
                {item.period}
              </span>
            )}

            <Collapsible open={open} onOpenChange={setOpen}>
              <ItemTitle className="text-sm">
                {item.title}
                {item.isCurrent && (
                  <span className="inline-flex items-center gap-1 font-mono text-[0.6rem] tracking-wide uppercase text-muted-foreground">
                    <span className="block size-1.5 rounded-full bg-green-500 animate-pulse" />
                    now
                  </span>
                )}
                {hasAdditionalContent && (
                  <CollapsibleTrigger
                    render={<Button variant="ghost" size="icon-sm" className="size-8" />}
                  >
                    {open ? <ChevronsDownUp /> : <ChevronsUpDown />}
                    <span className="sr-only">Toggle details</span>
                  </CollapsibleTrigger>
                )}
              </ItemTitle>

              {item.subtitle && (
                <ItemDescription className="font-medium text-foreground">
                  {item.subtitle}
                </ItemDescription>
              )}

              {item.description && (
                <ItemDescription>{item.description}</ItemDescription>
              )}

              {hasAdditionalContent && item.additionalContent && (
                <CollapsibleContent>
                  <TimelineSections sections={item.additionalContent} className="pt-4" />
                </CollapsibleContent>
              )}

              {item.tags && item.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag, index) => (
                    <Badge key={`${index}-${tag}`} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </Collapsible>
          </ItemContent>
        </Item>
      </div>
    </div>
  );
}
