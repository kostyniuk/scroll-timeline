"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Timeline, type TimelineItem } from "@/components/timeline";

export function ScrollableDemo({
  items,
  coveredColor = "var(--foreground)",
  stickyOffset = 0,
}: {
  items: TimelineItem[];
  coveredColor?: string;
  stickyOffset?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div
          ref={scrollRef}
          className="h-[480px] overflow-y-auto px-6 sm:px-10 py-6 sm:py-8"
        >
          <Timeline
            items={items}
            sticky
            stickyOffset={stickyOffset}
            coveredColor={coveredColor}
            scrollContainer={scrollRef}
          />
        </div>
      </CardContent>
    </Card>
  );
}
