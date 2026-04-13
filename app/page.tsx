import { Timeline, type TimelineItem } from "@/components/timeline";
import { Card, CardContent } from "@/components/ui/card";
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
    description:
      "Leading architecture and delivery across frontend modernisation, backend platform work, and performance initiatives. Managing a team of four engineers while staying deeply hands-on in design decisions and code reviews.",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    icon: "N",
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
    description:
      "Ground-up rewrite with a new API surface, full TypeScript support, Tailwind v4 compatibility, and a motion-powered scroll-driven axis.",
    tags: ["TypeScript", "motion", "Tailwind v4"],
    icon: "3",
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
          <a
            href="https://github.com/kostyniuk/scroll-timeline"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub →
          </a>
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
            Demo 1 — sticky icons (default)
        ═══════════════════════════════════════════════════════════════ */}
        <Demo
          label="example / sticky icons"
          title="Sticky icons"
          description="Icons pin at stickyOffset from the viewport top as you scroll through each entry. You always know which item you're reading — perfect for long-form content like timelines and experiences."
          code={`<Timeline
  items={careerItems}
  sticky
  coveredColor="var(--foreground)"
  stickyOffset={80}
/>`}
        >
          <Timeline items={CAREER} sticky stickyOffset={80} coveredColor="var(--foreground)" />
        </Demo>

        {/* ═══════════════════════════════════════════════════════════════
            Demo 2 — dot variant
        ═══════════════════════════════════════════════════════════════ */}
        <Demo
          label="example / dot variant"
          title="Dot variant"
          description="Set dot={true} to replace icon circles with small dots. No icon content is rendered — just a 8px position marker on the axis. Great for minimal, dense timelines."
          code={`<Timeline
  items={milestones}
  dot
  sticky
  coveredColor="var(--foreground)"
/>`}
        >
          <Timeline items={MILESTONES} dot sticky coveredColor="var(--foreground)" stickyOffset={80} />
        </Demo>

        {/* ═══════════════════════════════════════════════════════════════
            Demo 3 — custom colors
        ═══════════════════════════════════════════════════════════════ */}
        <Demo
          label="example / custom colors"
          title="Custom axis colors"
          description="coveredColor and uncoveredColor accept any CSS color. Use hex, hsl(), oklch(), or CSS variables. uncoveredColor auto-derives from coveredColor if omitted."
          code={`<Timeline
  items={releaseNotes}
  sticky
  coveredColor="oklch(0.55 0.18 145)"
  uncoveredColor="oklch(0.85 0.08 145)"
/>`}
        >
          <Timeline
            items={RELEASES}
            sticky
            coveredColor="oklch(0.55 0.18 145)"
            uncoveredColor="oklch(0.85 0.08 145)"
            stickyOffset={80}
          />
        </Demo>

        {/* ─── Props reference ──────────────────────────────────────── */}
        <section className="space-y-6">
          <SectionLabel label="api reference" title="Props" />
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

      {/* Live component — overflow-visible so sticky icons aren't clipped */}
      <Card className="overflow-visible">
        <CardContent className="px-6 sm:px-10 py-6 sm:py-10">
          {children}
        </CardContent>
      </Card>
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
  { name: "sticky", type: "boolean", default: "true", description: "Pin each icon at stickyOffset from the viewport top while the user reads through the entry." },
  { name: "dot", type: "boolean", default: "false", description: "Render a small 8 px dot instead of the icon circle. icon on items is ignored." },
  { name: "coveredColor", type: "string", default: '"currentColor"', description: "CSS color for the axis segment already scrolled past. Accepts hex, hsl(), oklch(), CSS variables." },
  { name: "uncoveredColor", type: "string", default: "18% of coveredColor", description: "CSS color for the future axis segment. Derived automatically if omitted." },
  { name: "lineWidth", type: "number", default: "2", description: "Width of the axis line in pixels." },
  { name: "stickyOffset", type: "number", default: "80", description: "Distance in px from the viewport top where icons stick. Match this to your sticky header height." },
  { name: "iconSize", type: "number", default: "24", description: "Diameter of the icon circle in pixels. The axis auto-centers on the icon column." },
  { name: "className", type: "string", default: "—", description: "Extra class names applied to the timeline root element." },
];
