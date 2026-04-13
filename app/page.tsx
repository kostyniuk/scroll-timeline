import { Timeline, type TimelineItem } from "@/components/timeline";

// ─── Shared demo data ─────────────────────────────────────────────────────────

const ITEMS: TimelineItem[] = [
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
      "Built the real-time collaboration layer for a document editor used by 500 k+ daily active users. Introduced operational transforms to handle concurrent edits and authored the team's first engineering RFC process.",
    tags: ["React", "WebSockets", "Redis", "CRDTs"],
    icon: "V",
  },
  {
    id: "mid",
    period: "Jun 2018 — Jul 2020",
    title: "Software Engineer",
    subtitle: "Apex Tech",
    description:
      "Delivered customer-facing features across the billing, authentication, and reporting surfaces. Championed the migration from class components to hooks and wrote the internal guide that onboarded the whole frontend team.",
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              component demo
            </span>
            <h1 className="text-base font-semibold leading-tight">
              Scroll Timeline
            </h1>
          </div>
          <a
            href="https://github.com"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub →
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16 space-y-32">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            A timeline that knows where you&apos;ve been.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
            A scroll-driven React component with a two-color axis — one color
            for the path already covered, another for the path ahead. Optionally
            pins each item&apos;s icon as you read through its content.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["Next.js", "React", "motion", "Tailwind CSS", "TypeScript"].map(
              (tag) => (
                <span
                  key={tag}
                  className="font-mono text-[0.65rem] tracking-wide px-2 py-1 rounded border border-border bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </section>

        {/* ── Demo 1 — Sticky ───────────────────────────────────────── */}
        <section className="space-y-8">
          <SectionHeader
            label="variant / sticky"
            title="With Sticky Icons"
            description="As you scroll through a long entry, the icon pins at the top of the viewport — you always know which item you're reading."
          />

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
            <Timeline
              items={ITEMS}
              sticky
              coveredColor="var(--foreground)"
              stickyOffset={80}
            />
          </div>
        </section>

        {/* ── Demo 2 — No Sticky ────────────────────────────────────── */}
        <section className="space-y-8">
          <SectionHeader
            label="variant / default"
            title="Without Sticky Icons"
            description="Icons scroll with the content. The two-color axis still tracks your read progress."
          />

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
            <Timeline
              items={ITEMS}
              sticky={false}
              coveredColor="var(--foreground)"
              stickyOffset={80}
            />
          </div>
        </section>

        {/* ── Demo 3 — Custom color ─────────────────────────────────── */}
        <section className="space-y-8">
          <SectionHeader
            label="variant / accent"
            title="Custom Colors"
            description="Pass any CSS color to coveredColor and uncoveredColor. Works with hex, hsl(), oklch(), CSS variables — anything."
          />

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
            <Timeline
              items={ITEMS}
              sticky
              coveredColor="var(--accent-color)"
              stickyOffset={80}
            />
          </div>
        </section>

        {/* ── Props reference ───────────────────────────────────────── */}
        <section className="space-y-6">
          <SectionHeader
            label="api"
            title="Props"
            description="All props are optional except items."
          />

          <div className="rounded-2xl border border-border overflow-hidden text-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/60">
                  <th className="text-left font-mono text-xs px-4 py-3 text-muted-foreground font-normal">Prop</th>
                  <th className="text-left font-mono text-xs px-4 py-3 text-muted-foreground font-normal">Type</th>
                  <th className="text-left font-mono text-xs px-4 py-3 text-muted-foreground font-normal">Default</th>
                  <th className="text-left font-mono text-xs px-4 py-3 text-muted-foreground font-normal hidden sm:table-cell">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {PROPS.map((prop) => (
                  <tr key={prop.name} className="align-top">
                    <td className="px-4 py-3 font-mono text-xs text-foreground whitespace-nowrap">{prop.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{prop.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{prop.default}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────── */}
        <footer className="border-t border-border pt-8 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            MIT License · Open source · Copy and adapt freely
          </p>
        </footer>

      </div>
    </main>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-1.5">
      <p className="font-mono text-[0.65rem] tracking-widest uppercase text-muted-foreground">
        {label}
      </p>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground max-w-lg">{description}</p>
    </div>
  );
}

const PROPS = [
  {
    name: "items",
    type: "TimelineItem[]",
    default: "—",
    description: "Array of timeline entries to render.",
  },
  {
    name: "sticky",
    type: "boolean",
    default: "true",
    description: "Pin icons at stickyOffset while scrolling through long entries.",
  },
  {
    name: "coveredColor",
    type: "string",
    default: '"currentColor"',
    description: "CSS color for the axis segment already scrolled past.",
  },
  {
    name: "uncoveredColor",
    type: "string",
    default: "18% of coveredColor",
    description: "CSS color for the axis segment not yet reached.",
  },
  {
    name: "lineWidth",
    type: "number",
    default: "2",
    description: "Width of the axis line in pixels.",
  },
  {
    name: "stickyOffset",
    type: "number",
    default: "80",
    description: "Distance from the viewport top where icons stick (px).",
  },
  {
    name: "iconSize",
    type: "number",
    default: "24",
    description: "Diameter of the icon circle in pixels.",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Extra class names applied to the root element.",
  },
];
