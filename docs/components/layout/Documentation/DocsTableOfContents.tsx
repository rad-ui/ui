"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getDocsViewport, scrollToDocsAnchor } from "./utils";

type HeadingItem = {
    id: string;
    text: string;
    level: number;
};

const makeId = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

const DocsTableOfContents = () => {
    const [items, setItems] = useState<HeadingItem[]>([]);
    const [activeId, setActiveId] = useState("");
    const [progress, setProgress] = useState(0);
    const pathname = usePathname();

    // How far down the article the reader is, 0 to 1, drawn as the fill of the list's rail.
    useEffect(() => {
        const viewport = getDocsViewport();
        if (!(viewport instanceof HTMLElement)) return;
        const update = () => {
            const total = viewport.scrollHeight - viewport.clientHeight;
            setProgress(total > 0 ? Math.min(1, Math.max(0, viewport.scrollTop / total)) : 0);
        };
        update();
        viewport.addEventListener("scroll", update, { passive: true });
        const resize = new ResizeObserver(update);
        resize.observe(viewport);
        return () => {
            viewport.removeEventListener("scroll", update);
            resize.disconnect();
        };
    }, [pathname]);

    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        let timeout: number | undefined;

        const buildToc = () => {
            const article = document.getElementById("docs-article");
            const viewport = getDocsViewport();
            if (!article) return;

            const seenIds = new Map<string, number>();
            const headings = Array.from(
                article.querySelectorAll<HTMLHeadingElement>("h2, h3")
            )
                // Headings inside live demos are content, not page sections.
                .filter((heading) => heading.textContent?.trim() && !heading.closest("[data-docs-toc-ignore]"))
                .map((heading) => {
                    const text = heading.textContent?.trim() || "";
                    const anchorRoot = heading.closest<HTMLElement>(".docs-anchor");
                    const baseId = anchorRoot?.id || heading.id || makeId(text);
                    // Sections can share a title (e.g. an "Action" API table and an "Action" example);
                    // suffix repeats so anchors and list keys stay unique.
                    const count = seenIds.get(baseId) ?? 0;
                    seenIds.set(baseId, count + 1);
                    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
                    const target = anchorRoot ?? heading;
                    if (target.id !== id) {
                        target.id = id;
                    }

                    return {
                        id,
                        text,
                        level: Number(heading.tagName.slice(1)),
                    };
                });

            setItems(headings);
            setActiveId(headings[0]?.id || "");

            if (observer) {
                observer.disconnect();
            }

            observer = new IntersectionObserver(
                (entries) => {
                    const visible = entries
                        .filter((entry) => entry.isIntersecting)
                        .sort(
                            (a, b) =>
                                (a.target as HTMLElement).offsetTop -
                                (b.target as HTMLElement).offsetTop
                        );

                    if (visible[0]) {
                        setActiveId(visible[0].target.id);
                    }
                },
                {
                    root: viewport instanceof Element ? viewport : null,
                    rootMargin: "-72px 0px -60% 0px",
                    threshold: [0, 1],
                }
            );

            headings.forEach((heading) => {
                const node = document.getElementById(heading.id);
                if (node) observer?.observe(node);
            });
        };

        const frame = window.requestAnimationFrame(() => {
            buildToc();
            timeout = window.setTimeout(buildToc, 80);
        });

        return () => {
            window.cancelAnimationFrame(frame);
            if (timeout !== undefined) {
                window.clearTimeout(timeout);
            }
            observer?.disconnect();
        };
    }, [pathname]);

    if (items.length <= 1) return null;

    return (
        <aside className="hidden xl:block">
            <div className="sticky top-7 pt-1">
                <p className="mb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gray-950">
                    On this page
                </p>
                <nav aria-label="Table of contents" className="relative">
                    {/* The rail: a faint track with a fill that grows as the reader scrolls. */}
                    <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-gray-300" />
                    <span
                        aria-hidden
                        className="absolute left-0 top-0 w-px bg-green-900 transition-[height] duration-150"
                        style={{ height: `${progress * 100}%` }}
                    />
                    <ul className="flex list-none flex-col gap-px pl-0">
                        {items.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToDocsAnchor(item.id);
                                    }}
                                    aria-current={activeId === item.id ? "location" : undefined}
                                    className={`relative block py-1 leading-5 transition-colors ${
                                        item.level === 3 ? "pl-6 text-[0.8rem]" : "pl-3.5 text-[0.84rem]"
                                    } ${
                                        activeId === item.id
                                            ? "font-medium text-gray-1000 before:absolute before:bottom-1 before:left-0 before:top-1 before:w-[2px] before:rounded-full before:bg-gray-1000"
                                            : "text-gray-950 hover:text-gray-1000"
                                    }`}
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default DocsTableOfContents;
