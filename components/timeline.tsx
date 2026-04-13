"use client";

import { motion, useScroll } from "motion/react";
import React, { useRef, type CSSProperties, type ReactNode } from "react";
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
  /** Secondary line below the title (maps to "company" in portfolio) */
  subtitle?: string;
  /** Longer body text */
  description?: string;
  /** Icon rendered inside the circular indicator. Ignored when dot={true}. */
  icon?: ReactNode;
  /** Small pill tags rendered below the description */
  tags?: string[];
  /** Shows a live indicator badge next to the title */
  isCurrent?: boolean;
  /** Collapsible extra sections (bullet points, text blocks, etc.) */
  additionalContent?: TimelineSectionData[];
  /** Whether the collapsible is open by default */
  defaultExpanded?: boolean;
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
   * Distance from the viewport top where icons stick.
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
    <div className={`flex flex-col gap-4${className ? ` ${className}` : ""}`}>
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
    uncoveredColor ?? `color-mix(in srgb, ${coveredColor} 18%, transparent)`;

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
  const [openDetailedInformation, setOpenDetailedInformation] =
    React.useState(isExpanded);

  const hasAdditionalContent = Boolean(item.additionalContent?.length);

  return (
    // Inline styles for the row layout — same rationale as the container.
    <div style={{ display: "flex", gap: "3rem" }}>

      {/* ── Indicator column ─────────────────────────────────────────
       * No explicit height or position here — flex's default align-items:stretch
       * automatically makes this column as tall as the content column, giving
       * the sticky child enough room to actually stick within it.
       */}
      <div style={{ width: iconSize, flexShrink: 0 }}>
        {dot ? (
          // ── Dot variant ──────────────────────────────────────────
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: iconSize / 2 - 4,
              zIndex: 10,
              ...(sticky ? { position: "sticky", top: stickyOffset } : {}),
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
              zIndex: 10,
              ...(sticky ? { position: "sticky", top: stickyOffset } : {}),
            }}
          >
            {item.icon}
          </div>
        )}
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Item className="mb-12 last:mb-0">
          <ItemContent>
            {item.period && (
              <span className="text-[0.625rem] font-mono tracking-wide text-muted-foreground">
                {item.period}
              </span>
            )}

            <Collapsible
              open={openDetailedInformation}
              onOpenChange={setOpenDetailedInformation}
            >
              <ItemTitle className="text-sm">
                {item.title}
                {item.isCurrent && (
                  <span className="inline-flex items-center gap-1 font-mono text-[0.6rem] tracking-wide uppercase text-muted-foreground">
                    <span className="block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    now
                  </span>
                )}
                {hasAdditionalContent && (
                  <CollapsibleTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="size-8"
                      />
                    }
                  >
                    {openDetailedInformation ? (
                      <ChevronsDownUp />
                    ) : (
                      <ChevronsUpDown />
                    )}
                    <span className="sr-only">Toggle details</span>
                  </CollapsibleTrigger>
                )}
              </ItemTitle>

              {item.subtitle ? (
                <ItemDescription className="font-medium text-foreground">
                  {item.subtitle}
                </ItemDescription>
              ) : null}

              {item.description ? (
                <ItemDescription>{item.description}</ItemDescription>
              ) : null}

              {hasAdditionalContent && item.additionalContent ? (
                <CollapsibleContent>
                  <TimelineSections
                    sections={item.additionalContent}
                    className="pt-4"
                  />
                </CollapsibleContent>
              ) : null}

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
