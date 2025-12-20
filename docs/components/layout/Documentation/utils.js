"use client"
import { Link as LinkIcon } from 'lucide-react';

export const BookMarkLink = ({ children, id }) => {
    const sanitizedId = id.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    const scrollToElement = (e) => {
        e.preventDefault();
        const element = document.getElementById(sanitizedId);
        const offset = 240; // Adjust this value based on your header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        const docsElement = document.querySelector('#docs-content');

        element.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Update URL without triggering another scroll
        window.history.pushState({}, '', `#${sanitizedId}`);
    };

    return (
        <div id={sanitizedId}>
            <a
                className='flex items-center space-x-4'
                href={`#${sanitizedId}`}
                onClick={scrollToElement}
                aria-label={`Direct link to ${id}`}
            >
                <span>{children}</span>
                <LinkIcon size={24} />
            </a>
        </div>
    );
}