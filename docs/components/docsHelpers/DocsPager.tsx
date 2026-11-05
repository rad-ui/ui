"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { docsNavigationSections } from "@/app/docs/docsNavigationSections";

type NavLink = { title: string; path: string };
type Section = { title: string; items: NavLink[] };

// Reading order: the sidebar's sections, flattened. Components stay alphabetical.
const ORDER: { section: string; item: NavLink }[] = (docsNavigationSections as unknown as Section[]).flatMap((section) =>
    section.items.map((item) => ({ section: section.title, item }))
);

/** Previous and next page, in sidebar order, under every /docs article. */
const DocsPager = () => {
    const pathname = usePathname();
    const index = ORDER.findIndex(({ item }) => item.path === pathname);
    if (index === -1) return null;

    const previous = ORDER[index - 1];
    const next = ORDER[index + 1];
    if (!previous && !next) return null;

    return (
        <nav aria-label="Previous and next page" className="mt-16 grid gap-3 sm:grid-cols-2">
            {previous ? (
                <Link
                    href={previous.item.path}
                    className="group flex flex-col gap-1 rounded-xl border border-gray-400 bg-gray-50 px-4 py-3.5 transition-colors hover:border-gray-600 hover:bg-gray-100"
                >
                    <span className="flex items-center gap-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gray-950">
                        <ArrowLeft size={12} strokeWidth={2.25} aria-hidden className="transition-transform group-hover:-translate-x-0.5" />
                        Previous
                    </span>
                    <span className="text-[0.95rem] font-medium text-gray-1000">{previous.item.title}</span>
                    <span className="text-[0.78rem] text-gray-950">{previous.section}</span>
                </Link>
            ) : (
                <span aria-hidden />
            )}
            {next ? (
                <Link
                    href={next.item.path}
                    className="group flex flex-col gap-1 rounded-xl border border-gray-400 bg-gray-50 px-4 py-3.5 text-right transition-colors hover:border-gray-600 hover:bg-gray-100"
                >
                    <span className="flex items-center justify-end gap-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gray-950">
                        Next
                        <ArrowRight size={12} strokeWidth={2.25} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-[0.95rem] font-medium text-gray-1000">{next.item.title}</span>
                    <span className="text-[0.78rem] text-gray-950">{next.section}</span>
                </Link>
            ) : null}
        </nav>
    );
};

export default DocsPager;
