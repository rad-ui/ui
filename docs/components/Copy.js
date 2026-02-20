'use client';
import { useState, useEffect } from 'react';
import { Check, Copy as CopyIcon } from 'lucide-react';

function Copy({ content }) {
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

    const TickIcon = () => {
        return (
            <div className="w-4 h-4">
                <Check className="w-full h-full" />
            </div>
        );
    };

    return (
        <span className = "flex items-center">
            <button
                onClick={handleCopy}
                className=" m-0.5 mr-0 ml-2 px-1.5 py-1.5 border border-blue-400 hover:border-blue-500 text-sm font-bold rounded text-blue-900 hover:text-blue-900 bg-blue-100 hover:bg-blue-300">
                {isCopied ? <TickIcon /> : (
                    <div className="w-4 h-4">
                        <CopyIcon className="w-full h-full" />
                    </div>
                )}
            </button>
        </span>

    );
}

export default Copy;
