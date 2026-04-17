'use client';
import { useState, useEffect } from 'react';
import { Check, Copy as CopyIcon } from 'lucide-react';

function Copy({ content, className = '', iconSize = 15 }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setIsCopied(true);
    };

    useEffect(() => {
        let timeout;
        if (isCopied) {
            timeout = setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [isCopied]);

    return (
        <span className = "flex items-center">
            <button
                onClick={handleCopy}
                className={`inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-[var(--rad-ui-border-soft)] bg-[var(--rad-ui-surface-subtle)] text-[var(--rad-ui-text-secondary)] hover:bg-[var(--rad-ui-surface-hover)] hover:text-[var(--rad-ui-text-primary)] ${className}`}>
                {isCopied ? <Check size={iconSize} strokeWidth={2.25} /> : <CopyIcon size={iconSize} strokeWidth={2} />}
            </button>
        </span>

    );
}

export default Copy;
