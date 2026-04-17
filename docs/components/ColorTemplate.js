'use client'

import Link from "next/link";

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
];

const scaleSteps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950", "1000"];
const groups = [
  { label: "Backgrounds", start: 0, end: 1 },
  { label: "Interactive components", start: 2, end: 4 },
  { label: "Borders and separators", start: 5, end: 7 },
  { label: "Solid colors", start: 8, end: 9 },
  { label: "Accessible text", start: 10, end: 11 },
];

const formatFamilyName = (family) => family.charAt(0).toUpperCase() + family.slice(1);

const ColorSwatch = ({ colorClass }) => (
  <div className={`${colorClass} h-14 w-full rounded-[4px]`} />
);

const ColorTemplate = () => {
  return (
    <div className="min-h-full bg-gray-50 text-gray-1000">
      <section className="relative overflow-hidden border-b border-gray-300 bg-gradient-to-b from-sky-100 via-blue-200 to-gray-50">
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-8 py-14 md:px-12 md:py-20 lg:px-16">
          <div className="max-w-5xl space-y-6">
            <div className="inline-flex items-center rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-900">
                Rad UI Colors
              </div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight text-gray-1000 md:text-7xl">
              Colors that behave, not just look good
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-gray-900 md:text-xl">
              Every token here is tuned for actual UI work: backgrounds, states, borders, and text that stay readable and consistent across light and dark.
            </p>
            <p className="max-w-3xl text-base leading-7 text-gray-950 md:text-lg">
              This isn’t a random palette. Each color sits in a structured scale so you can move between surfaces, interactions, and emphasis without guessing or breaking contrast.
            </p>
          </div>

          <div className="flex flex-col gap-6 border-t border-gray-300 pt-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl text-sm leading-7 text-gray-950">
              Compare families side by side, scan how each step shifts, and pick colors based on role, not vibes.
            </div>
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <div className="rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-900">
                29 families
              </div>
              <div className="rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-900">
                12-step scales
              </div>
              <div className="rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-900">
                Built for UI
              </div>
              <Link
                href="/docs/first-steps/introduction"
                className="inline-flex items-center gap-2 rounded-full border border-gray-1000 bg-gray-1000 px-5 py-3 text-sm font-medium text-gray-50 transition hover:bg-gray-950"
              >
                Explore docs
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-8 py-12 md:px-12 md:py-16 lg:px-16">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="space-y-4">
            <div className="pl-[96px]">
              <div className="grid grid-cols-12 gap-3 pb-4 text-sm text-gray-800">
                {groups.map((group) => (
                  <div
                    key={group.label}
                    className="pb-4 text-center"
                    style={{ gridColumn: `${group.start + 1} / ${group.end + 2}` }}
                  >
                    <div>{group.label}</div>
                    <div className="mt-4 flex items-center">
                      <div className="h-2 w-px bg-gray-400" />
                      <div className="h-px flex-1 bg-gray-400" />
                      <div className="h-2 w-px bg-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-12 gap-3 pt-4 text-center text-sm text-gray-700">
                {scaleSteps.map((step) => (
                  <div key={step}>{step}</div>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              {colorFamilies.map((family) => (
                <div key={family} className="grid grid-cols-[84px_repeat(12,minmax(0,1fr))] items-center gap-3">
                  <div className="pr-3 text-lg text-gray-950">{formatFamilyName(family)}</div>
                  {scaleSteps.map((step) => (
                    <ColorSwatch key={`${family}-${step}`} colorClass={`bg-${family}-${step}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColorTemplate;
