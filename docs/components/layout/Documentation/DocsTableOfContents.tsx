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
    const pathname = usePathname();

    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        let timeout: number | undefined;

        const buildToc = () => {
            const article = document.getElementById("docs-article");
            const viewport = getDocsViewport();
            if (!article) return;

            const headings = Array.from(
                article.querySelectorAll<HTMLHeadingElement>("h2, h3")
            )
                .filter((heading) => heading.textContent?.trim())
                .map((heading) => {
                    const text = heading.textContent?.trim() || "";
                    const anchorRoot = heading.closest<HTMLElement>(".docs-anchor");
                    const id = anchorRoot?.id || heading.id || makeId(text);
                    if (!anchorRoot && !heading.id) {
                        heading.id = id;
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
                <p className="mb-4 text-[0.9rem] font-bold text-gray-950">On this page</p>
                <nav aria-label="Table of contents">
                    <ul className="flex list-none flex-col gap-1 pl-0">
                        {items.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToDocsAnchor(item.id);
                                    }}
                                    className={`relative block border-l pl-4 ${
                                        item.level === 3 ? "ml-3 py-1 text-[0.92rem]" : "py-1.5 text-[0.98rem]"
                                    } ${
                                        activeId === item.id
                                            ? "border-red-700 font-semibold text-gray-950"
                                            : "border-gray-300 text-gray-800 hover:text-gray-950"
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
