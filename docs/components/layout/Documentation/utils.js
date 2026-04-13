"use client"
import { Link2 } from 'lucide-react';

export const getDocsViewport = () => {
    return document.querySelector('#docs-content .rad-ui-scroll-area-viewport');
}

export const scrollToDocsAnchor = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const viewport = getDocsViewport();
    if (viewport instanceof HTMLElement) {
        const viewportRect = viewport.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const top = viewport.scrollTop + (elementRect.top - viewportRect.top) - 24;

        viewport.scrollTo({
            top,
            behavior: 'smooth',
        });
    } else {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    window.history.pushState({}, '', `#${id}`);
}

export const BookMarkLink = ({ children, id }) => {
    const sanitizedId = id.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    const scrollToElement = (e) => {
        e.preventDefault();
        scrollToDocsAnchor(sanitizedId);
    };

    return (
        <div id={sanitizedId} className="docs-anchor scroll-mt-24">
            <a
                className='group inline-flex items-center gap-3 no-underline'
                href={`#${sanitizedId}`}
                onClick={scrollToElement}
                aria-label={`Direct link to ${id}`}
            >
                <span className="min-w-0">{children}</span>
                <span className="translate-x-[-4px] text-red-900 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100">
                    <Link2 size={16} strokeWidth={2} />
                </span>
            </a>
        </div>
    );
}
