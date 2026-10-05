'use client'

import Link from "next/link"

const colorFamilies = [
  "gray",
  "mauve",
  "slate",
  "sage",
  "olive",
  "sand",
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "bronze",
  "gold",
  "brown",
  "orange",
  "amber",
  "yellow",
  "lime",
  "mint",
  "sky",
]

const scaleSteps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950", "1000"]

const roleBands = [
  {
    label: "Canvas",
    range: "50-100",
    steps: ["50", "100"],
    description: "Page backgrounds, subtle panels, and ambient surfaces.",
  },
  {
    label: "Controls",
    range: "200-400",
    steps: ["200", "300", "400"],
    description: "Interactive fills that can lift, press, and communicate state.",
  },
  {
    label: "Structure",
    range: "500-700",
    steps: ["500", "600", "700"],
    description: "Borders, separators, focus edges, and visible scaffolding.",
  },
  {
    label: "Emphasis",
    range: "800-900",
    steps: ["800", "900"],
    description: "Solid accents for selections, badges, and primary moments.",
  },
  {
    label: "Text",
    range: "950-1000",
    steps: ["950", "1000"],
    description: "Readable foregrounds for supporting and primary copy.",
  },
]

const familyGroups = [
  { label: "Neutrals", families: ["gray", "mauve", "slate", "sage", "olive", "sand"] },
  { label: "Warm signal", families: ["tomato", "red", "ruby", "crimson", "pink", "orange", "amber", "yellow"] },
  { label: "Cool signal", families: ["purple", "violet", "iris", "indigo", "blue", "cyan", "sky"] },
  { label: "Organic signal", families: ["teal", "jade", "green", "grass", "lime", "mint"] },
  { label: "Earth", families: ["bronze", "gold", "brown", "plum"] },
]

const specimenFamilies = ["gray", "ruby", "blue", "jade", "amber", "plum"]

const stats = [
  ["families", colorFamilies.length],
  ["steps each", scaleSteps.length],
  ["role bands", roleBands.length],
]

const formatFamilyName = (family) => family.charAt(0).toUpperCase() + family.slice(1)

const colorVar = (family, step) => `var(--rad-ui-color-${family}-${step})`

const Swatch = ({ family, step, className = "" }) => (
  <span
    className={`block ${className}`}
    style={{ backgroundColor: colorVar(family, step) }}
    title={`${formatFamilyName(family)} ${step}`}
    aria-label={`${formatFamilyName(family)} ${step}`}
  />
)

const SpectrumStrip = ({ family, compact = false }) => (
  <div
    className="grid grid-cols-12 gap-px overflow-hidden rounded-[6px] border border-gray-400 bg-gray-400"
    aria-label={`${formatFamilyName(family)} scale from ${scaleSteps[0]} to ${scaleSteps[scaleSteps.length - 1]}`}
  >
    {scaleSteps.map((step) => (
      <Swatch
        key={`${family}-${step}`}
        family={family}
        step={step}
        className={compact ? "h-6" : "h-12 sm:h-16"}
      />
    ))}
  </div>
)

const RoleBand = ({ band, family }) => (
  <article className="grid min-h-[15rem] grid-rows-[auto_1fr_auto] border border-gray-400 bg-gray-50 p-4">
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-gray-1000">{band.label}</h2>
        <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-gray-950">
          {band.range}
        </p>
      </div>
      <span className="rounded-full border border-gray-400 bg-gray-100 px-2.5 py-1 font-mono text-[0.68rem] text-gray-950">
        {band.steps.length} steps
      </span>
    </div>

    <p className="mt-5 text-sm leading-6 text-gray-950">{band.description}</p>

    <div className="mt-6 grid grid-cols-2 gap-2">
      {band.steps.map((step) => (
        <div key={`${band.label}-${step}`} className="min-w-0">
          <Swatch family={family} step={step} className="h-11 rounded-[5px] border border-black/5" />
          <div className="mt-1.5 font-mono text-[0.68rem] text-gray-950">{step}</div>
        </div>
      ))}
    </div>
  </article>
)

const FamilySpecimen = ({ family }) => (
  <article className="overflow-hidden border border-gray-400 bg-gray-50">
    <div className="p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-1000">{formatFamilyName(family)}</h3>
        <span className="font-mono text-[0.7rem] text-gray-950">{family}</span>
      </div>
      <div className="mt-4">
        <SpectrumStrip family={family} compact />
      </div>
    </div>

    <div
      className="border-t border-gray-400 p-4"
      style={{ backgroundColor: colorVar(family, "100") }}
    >
      <div
        className="rounded-[6px] border p-3"
        style={{
          backgroundColor: colorVar(family, "50"),
          borderColor: colorVar(family, "500"),
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <span
            className="font-mono text-[0.68rem] uppercase tracking-[0.14em]"
            style={{ color: colorVar(family, "950") }}
          >
            sample ui
          </span>
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: colorVar(family, "900") }}
          />
        </div>
        <p
          className="mt-3 text-sm font-medium leading-6"
          style={{ color: colorVar(family, "1000") }}
        >
          {formatFamilyName(family)} can move from quiet surface to confident text without changing families.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span
            className="rounded-[5px] px-3 py-1.5 text-xs font-medium text-gray-50"
            style={{ backgroundColor: colorVar(family, "900") }}
          >
            Action
          </span>
          <span
            className="rounded-[5px] border px-3 py-1.5 text-xs font-medium"
            style={{
              backgroundColor: colorVar(family, "200"),
              borderColor: colorVar(family, "600"),
              color: colorVar(family, "1000"),
            }}
          >
            State
          </span>
        </div>
      </div>
    </div>
  </article>
)

const FamilyGroup = ({ group }) => (
  <section className="border-t border-gray-400 py-6">
    <div className="grid gap-5 lg:grid-cols-[14rem_minmax(0,1fr)]">
      <div>
        <h2 className="text-xl font-semibold text-gray-1000">{group.label}</h2>
        <p className="mt-2 text-sm leading-6 text-gray-950">
          {group.families.length} families, each with the same 12-step contract.
        </p>
      </div>

      <div className="grid gap-3">
        {group.families.map((family) => (
          <div key={family} className="grid items-center gap-3 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
            <div className="flex items-center justify-between gap-3 sm:block">
              <div className="text-sm font-medium text-gray-1000">{formatFamilyName(family)}</div>
              <div className="font-mono text-[0.68rem] text-gray-950 sm:mt-1">{family}</div>
            </div>
            <SpectrumStrip family={family} compact />
          </div>
        ))}
      </div>
    </div>
  </section>
)

const StepMap = () => (
  <div className="overflow-hidden border border-gray-400 bg-gray-50">
    <div className="grid grid-cols-2 border-b border-gray-400 sm:grid-cols-4 lg:grid-cols-6">
      {scaleSteps.map((step) => (
        <div key={step} className="border-b border-r border-gray-300 p-4 last:border-r-0 sm:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(4n)]:border-r lg:[&:nth-child(6n)]:border-r-0">
          <div className="font-mono text-[0.72rem] text-gray-950">{step}</div>
          <Swatch family="blue" step={step} className="mt-3 h-16 rounded-[6px] border border-black/5" />
        </div>
      ))}
    </div>
    <div className="grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
      <p className="text-sm leading-6 text-gray-950">
        The numbers mean role before they mean shade. Once a component uses a role consistently,
        you can swap from blue to amber or jade without relearning the scale.
      </p>
      <Link
        href="/docs/first-steps/introduction"
        className="inline-flex w-fit items-center justify-center rounded-[6px] border border-gray-1000 bg-gray-1000 px-4 py-2 text-sm font-medium text-gray-50 transition hover:bg-gray-950"
      >
        Explore docs
      </Link>
    </div>
  </div>
)

const ColorTemplate = () => {
  return (
    <main className="min-h-full bg-gray-50 text-gray-1000">
      <section className="border-b border-gray-400 bg-gray-100">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-12 sm:px-8 md:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,0.65fr)] lg:px-10 lg:py-20">
          <div>
            <div className="inline-flex rounded-[6px] border border-gray-400 bg-gray-50 px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-gray-950">
              Rad UI colors
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-gray-1000 md:text-7xl">
              A color atlas for interfaces that have to work.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-950">
              The palette is organized by job: surfaces, controls, edges, emphasis, and text.
              Pick a family for tone, then use the same scale numbers to keep interaction,
              contrast, and hierarchy predictable.
            </p>
          </div>

          <div className="self-end border border-gray-400 bg-gray-50">
            <div className="grid grid-cols-3 border-b border-gray-400">
              {stats.map(([label, value]) => (
                <div key={label} className="border-r border-gray-300 p-4 last:border-r-0">
                  <div className="text-3xl font-semibold text-gray-1000">{value}</div>
                  <div className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-gray-950">
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4">
              <SpectrumStrip family="sky" />
              <p className="mt-4 text-sm leading-6 text-gray-950">
                Every family follows the same ramp, so a component can carry its structure
                from a neutral theme into expressive product color.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-400 bg-gray-50">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="mb-7 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-gray-950">
                Scale roles
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-gray-1000 md:text-4xl">
                Read the scale like a UI sentence.
              </h2>
            </div>
            <p className="text-sm leading-6 text-gray-950 lg:justify-self-end lg:text-right">
              The same twelve numbers repeat across every family. Their meaning stays steady,
              which keeps product teams from turning color into guesswork.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-gray-400 bg-gray-400 md:grid-cols-2 xl:grid-cols-5">
            {roleBands.map((band) => (
              <RoleBand key={band.label} band={band} family="jade" />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gray-400 bg-gray-100">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-gray-950">
                Specimens
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-gray-1000">
                Families in context, not just chips.
              </h2>
              <p className="mt-4 text-sm leading-6 text-gray-950">
                Each specimen uses the same family for surface, border, state, accent,
                and text so the relationship between steps is visible at a glance.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {specimenFamilies.map((family) => (
                <FamilySpecimen key={family} family={family} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-400 bg-gray-50">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-gray-950">
                Step map
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-gray-1000">
                One number system across the whole palette.
              </h2>
            </div>
            <StepMap />
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="mb-2 grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-gray-950">
                Complete atlas
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-gray-1000">
                All families, grouped by temperament.
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-6 text-gray-950">
              The full palette remains scannable without becoming a spreadsheet. Each row keeps
              the complete 50 to 1000 scale and the token name you use in Tailwind classes.
            </p>
          </div>

          {familyGroups.map((group) => (
            <FamilyGroup key={group.label} group={group} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default ColorTemplate
