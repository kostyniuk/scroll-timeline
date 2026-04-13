import { Timeline, type TimelineItem } from "@/components/timeline";
import { ScrollableDemo } from "@/components/scrollable-demo";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import type { ReactNode } from "react";

// ─── Datasets ────────────────────────────────────────────────────────────────

/** Long-form career entries — used for demos where content height matters */
const CAREER: TimelineItem[] = [
  {
    id: "lead",
    period: "Jan 2024 — Present",
    title: "Engineering Lead",
    subtitle: "NovaSystems",
    isCurrent: true,
    defaultExpanded: true,
    description:
      "Leading architecture and delivery across frontend modernisation, backend platform work, and performance initiatives. Managing a team of four engineers while staying deeply hands-on in design decisions and code reviews.",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    icon: "N",
    additionalContent: [
      {
        title: "Key Achievements",
        content: [
          "Reduced time-to-deploy from 45 minutes to under 8 minutes by redesigning the CI/CD pipeline.",
          "Led the migration from REST to GraphQL, cutting over-fetching by an estimated 40%.",
          "Established a design-system working group that standardised component patterns across 3 product squads.",
        ],
      },
      {
        title: "People & Process",
        content:
          "Introduced quarterly engineering health retrospectives and lightweight architecture decision records (ADRs), improving team alignment and reducing repeat discussions on settled decisions.",
      },
    ],
  },
  {
    id: "staff",
    period: "Mar 2022 — Dec 2023",
    title: "Staff Engineer",
    subtitle: "Meridian Labs",
    description:
      "Owned the core data pipeline and drove a full migration from a monolith to a service-oriented architecture. Reduced p99 API latency by 60 % and cut infrastructure costs by consolidating redundant services.",
    tags: ["Go", "gRPC", "Kafka", "Kubernetes", "Terraform"],
    icon: "M",
    additionalContent: [
      {
        title: "Impact",
        content: [
          "Reduced p99 API latency from 820 ms to 330 ms after introducing an in-process cache layer.",
          "Cut monthly infrastructure spend by 22% by right-sizing Kubernetes node pools.",
          "Authored internal Go style guide adopted by all backend squads.",
        ],
      },
    ],
  },
  {
    id: "senior",
    period: "Aug 2020 — Feb 2022",
    title: "Senior Software Engineer",
    subtitle: "Vortex",
    description:
      "Built the real-time collaboration layer for a document editor used by 500k+ daily active users. Introduced operational transforms to handle concurrent edits and authored the team's first engineering RFC process.",
    tags: ["React", "WebSockets", "Redis", "CRDTs"],
    icon: "V",
  },
  {
    id: "mid",
    period: "Jun 2018 — Jul 2020",
    title: "Software Engineer",
    subtitle: "Apex Tech",
    description:
      "Delivered customer-facing features across billing, authentication, and reporting surfaces. Championed the migration from class components to hooks and wrote the internal guide that onboarded the whole frontend team.",
    tags: ["React", "GraphQL", "Stripe", "Jest"],
    icon: "A",
  },
  {
    id: "junior",
    period: "Sep 2016 — May 2018",
    title: "Junior Software Engineer",
    subtitle: "StartupX",
    description:
      "First full-time engineering role. Learned the full stack end-to-end — from database schema design to CSS animations. Shipped a customer self-service portal that replaced a manual support workflow.",
    tags: ["Node.js", "Express", "MySQL", "jQuery"],
    icon: "S",
  },
];

/** Short product-release entries — good for property-focused demos */
const RELEASES: TimelineItem[] = [
  {
    id: "v3",
    period: "April 2025",
    title: "v3.0 — Complete Redesign",
    subtitle: "scroll-timeline",
    isCurrent: true,
    defaultExpanded: true,
    description:
      "Ground-up rewrite with a new API surface, full TypeScript support, Tailwind v4 compatibility, and a motion-powered scroll-driven axis.",
    tags: ["TypeScript", "motion", "Tailwind v4"],
    icon: "3",
    additionalContent: [
      {
        title: "What's new",
        content: [
          "New additionalContent prop for collapsible sections per item.",
          "shadcn/ui components: Item, Collapsible, Badge, Button.",
          "Dark mode support via next-themes.",
          "Expanded TypeScript types: TimelineSectionData, defaultExpanded.",
        ],
      },
    ],
  },
  {
    id: "v2",
    period: "November 2024",
    title: "v2.0 — Sticky Icons",
    subtitle: "scroll-timeline",
    description:
      "Introduced CSS sticky icon pinning. Icons stay visible at a configurable viewport offset while you scroll through long entries.",
    tags: ["sticky", "stickyOffset"],
    icon: "2",
  },
  {
    id: "v1",
    period: "June 2024",
    title: "v1.5 — Color Props",
    subtitle: "scroll-timeline",
    description:
      "Added coveredColor and uncoveredColor props. Both accept any valid CSS color — hex, hsl(), oklch(), or CSS variables.",
    tags: ["coveredColor", "uncoveredColor"],
    icon: "1",
  },
  {
    id: "v0",
    period: "January 2024",
    title: "v1.0 — Initial Release",
    subtitle: "scroll-timeline",
    description:
      "First public release. Single-file component, scroll-driven two-color axis, zero dependencies beyond motion and Tailwind.",
    tags: ["open-source", "MIT"],
    icon: "✦",
  },
];

/** Minimal milestone entries — shows the component with no tags or descriptions */
const MILESTONES: TimelineItem[] = [
  {
    id: "ship",
    period: "Week 8",
    title: "Production Launch",
    subtitle: "Zero downtime deploy",
    icon: "🚀",
    isCurrent: true,
    defaultExpanded: true,
    additionalContent: [
      {
        title: "Launch checklist",
        content: [
          "Blue/green deployment with instant rollback.",
          "Monitoring dashboards and alerting verified.",
          "CDN cache warm-up completed.",
        ],
      },
    ],
  },
  {
    id: "beta",
    period: "Week 6",
    title: "Beta Program",
    subtitle: "50 invited users",
    icon: "β",
  },
  {
    id: "alpha",
    period: "Week 3",
    title: "Internal Alpha",
    subtitle: "Team dogfooding",
    icon: "α",
  },
  {
    id: "kickoff",
    period: "Week 1",
    title: "Project Kickoff",
    subtitle: "Scope locked, team assembled",
    icon: "◆",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <main className="min-h-screen">

      {/* ── Sticky header ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/20 backdrop-blur-xs">
        <div className="mx-auto max-w-3xl px-6 py-1 flex items-center justify-between">
          <div>
            <p className="font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
              component demo
            </p>
            <h1 className="text-sm font-semibold leading-tight">Scroll Timeline</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://github.com/kostyniuk/scroll-timeline"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub →
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16 space-y-28">

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-3xl font-bold tracking-tight leading-tight">
            A timeline that knows<br />where you&apos;ve been.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
            A scroll-driven React component with a two-color axis — one shade
            for the path already covered, another for the path ahead.
            Optionally pins each icon as you read through its content.
          </p>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "motion", "Tailwind CSS v4", "TypeScript"].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[0.6rem] tracking-wide px-2 py-1 rounded-md border border-border bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Demo 1 — fixed-height scrollable container
        ═══════════════════════════════════════════════════════════════ */}
        <Demo
          label="example / scrollable container"
          title="Fixed-height scrollable container"
          description="Pass a scrollContainer ref to track a scoped overflow-y-auto div instead of the page. The two-color axis and sticky icons both react to that container's scroll — ideal for sidebars, modals, or any timeline that lives inside a bounded area."
          code={`const scrollRef = useRef<HTMLDivElement>(null);

<div ref={scrollRef} className="h-[480px] overflow-y-auto">
  <Timeline
    items={items}
    sticky
    stickyOffset={0}
    coveredColor="var(--foreground)"
    scrollContainer={scrollRef}
  />
</div>`}
        >
          <ScrollableDemo items={CAREER} coveredColor="var(--foreground)" stickyOffset={0} />
        </Demo>

        {/* ═══════════════════════════════════════════════════════════════
            Demo 2 — no sticky
        ═══════════════════════════════════════════════════════════════ */}
        <Demo
          label="example / no sticky"
          title="Without sticky icons"
          description="Set sticky={false} to let icons scroll naturally with the content. The two-color axis still tracks progress — it's the scroll-driven core of the component, completely independent of sticky."
          code={`<Timeline
  items={items}
  sticky={false}
  coveredColor="var(--foreground)"
/>`}
        >
          <Card className="overflow-visible">
            <CardContent className="px-6 sm:px-10 py-6 sm:py-8">
              <Timeline items={CAREER} sticky={false} coveredColor="var(--foreground)" stickyOffset={80} />
            </CardContent>
          </Card>
        </Demo>

        {/* ═══════════════════════════════════════════════════════════════
            Demo 3 — custom colors
        ═══════════════════════════════════════════════════════════════ */}
        <Demo
          label="example / custom colors"
          title="Custom axis colors"
          description="coveredColor and uncoveredColor accept any CSS color — hex, hsl(), oklch(), CSS variables. uncoveredColor auto-derives as 18% of coveredColor when omitted."
          code={`<Timeline
  items={items}
  sticky
  coveredColor="oklch(0.55 0.18 145)"
  uncoveredColor="oklch(0.85 0.08 145)"
/>`}
        >
          <Card className="overflow-visible">
            <CardContent className="px-6 sm:px-10 py-6 sm:py-8">
              <Timeline
                items={RELEASES}
                sticky
                coveredColor="oklch(0.55 0.18 145)"
                uncoveredColor="oklch(0.85 0.08 145)"
                stickyOffset={80}
              />
            </CardContent>
          </Card>
        </Demo>

        {/* ─── Props reference ──────────────────────────────────────── */}
        <section className="space-y-6">
          <SectionLabel label="api reference" title="Props" description="TimelineProps — passed directly to the Timeline component." />
          <Card className="overflow-hidden p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {["Prop", "Type", "Default", "Description"].map((h) => (
                    <th
                      key={h}
                      className={`text-left font-mono text-[0.65rem] px-4 py-3 text-muted-foreground font-normal${h === "Description" ? " hidden sm:table-cell" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {PROPS.map((p) => (
                  <tr key={p.name} className="align-top hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-foreground whitespace-nowrap">{p.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{p.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{p.default}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell leading-relaxed">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <SectionLabel label="api reference" title="TimelineItem props" description="Per-item shape passed inside the items array." />
          <Card className="overflow-hidden p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {["Prop", "Type", "Default", "Description"].map((h) => (
                    <th
                      key={h}
                      className={`text-left font-mono text-[0.65rem] px-4 py-3 text-muted-foreground font-normal${h === "Description" ? " hidden sm:table-cell" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ITEM_PROPS.map((p) => (
                  <tr key={p.name} className="align-top hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-foreground whitespace-nowrap">{p.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{p.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{p.default}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell leading-relaxed">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        {/* ─── Footer ───────────────────────────────────────────────── */}
        <footer className="border-t border-border pt-8 pb-4 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            MIT License · Open source ·{" "}
            <a
              href="https://github.com/kostyniuk/scroll-timeline"
              className="hover:text-foreground transition-colors"
            >
              github.com/kostyniuk/scroll-timeline
            </a>
          </p>
        </footer>

      </div>
    </main>
  );
}

// ─── Demo wrapper ─────────────────────────────────────────────────────────────

function Demo({
  label,
  title,
  description,
  code,
  children,
}: {
  label: string;
  title: string;
  description: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <SectionLabel label={label} title={title} description={description} />

      {/* Code snippet */}
      <pre className="rounded-xl border border-border bg-muted/60 px-5 py-4 text-[0.7rem] font-mono leading-relaxed overflow-x-auto text-muted-foreground whitespace-pre">
        {code}
      </pre>

      {/* Live component */}
      {children}
    </section>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────

function SectionLabel({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-1.5">
      <p className="font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">{label}</p>
      <h2 className="text-xl font-semibold">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{description}</p>
      )}
    </div>
  );
}

// ─── Props data ───────────────────────────────────────────────────────────────

const PROPS = [
  { name: "items", type: "TimelineItem[]", default: "—", description: "Array of timeline entries to render. Only title is required on each item." },
  { name: "sticky", type: "boolean", default: "true", description: "Pin each icon at stickyOffset while scrolling through an entry. Uses CSS position: sticky." },
  { name: "dot", type: "boolean", default: "false", description: "Render a small 8 px dot instead of a full icon circle. The icon field on items is ignored." },
  { name: "coveredColor", type: "string", default: '"currentColor"', description: "CSS color for the axis segment already scrolled past. Accepts hex, hsl(), oklch(), CSS variables." },
  { name: "uncoveredColor", type: "string", default: "18% of coveredColor", description: "CSS color for the future axis segment. Derived automatically if omitted." },
  { name: "lineWidth", type: "number", default: "2", description: "Width of the axis line in pixels." },
  { name: "stickyOffset", type: "number", default: "80", description: "Viewport distance where icons stick and where progress starts/ends. Match to your header height." },
  { name: "iconSize", type: "number", default: "24", description: "Diameter of the icon circle in pixels. The axis auto-centers on the icon column." },
  { name: "scrollContainer", type: "RefObject<HTMLElement>", default: "—", description: "Ref to a scrollable container. When provided, scroll progress tracks that element instead of the viewport." },
  { name: "className", type: "string", default: "—", description: "Extra class names applied to the timeline root element." },
];

// ─── Per-item props (shown below the main table) ──────────────────────────────

const ITEM_PROPS = [
  { name: "title", type: "string", default: "—", description: "Primary heading for the entry. Required." },
  { name: "id", type: "string | number", default: "index", description: "Unique key. Falls back to array index." },
  { name: "period", type: "string", default: "—", description: "Date or date-range label rendered in monospace above the title." },
  { name: "subtitle", type: "string", default: "—", description: "Secondary line below the title (e.g. company name or location)." },
  { name: "description", type: "string", default: "—", description: "Longer body text rendered below the subtitle." },
  { name: "icon", type: "ReactNode", default: "—", description: "Content rendered inside the icon circle. Ignored when dot={true}." },
  { name: "tags", type: "string[]", default: "—", description: "Pill tags rendered at the bottom of the entry." },
  { name: "isCurrent", type: "boolean", default: "false", description: "Shows a live (pulsing) indicator badge next to the title." },
  { name: "additionalContent", type: "TimelineSectionData[]", default: "—", description: "Collapsible sections with optional title and string or string[] content. A toggle button appears when provided." },
  { name: "defaultExpanded", type: "boolean", default: "false", description: "Whether the collapsible content is open on first render." },
];
