'use client';
import { CheckCircledIcon, ClipboardIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';

export type CodeProps= {
    children: React.ReactNode;
}

const Code = ({ children }: CodeProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async() => {
        try {
            await navigator.clipboard.writeText(children as string);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy text: ', error);
        }
    };

    return (
        <div className="rui-code-root">
            <div className='pt-1'>

                <button onClick={handleCopy} className="copy-button" title="Copy code">
                    {isCopied
                        ? (
                            <CheckCircledIcon width={16} height={16} className='inline-block' />
                        )
                        : (
                            <ClipboardIcon width={16} height={16} />
                        )}
                </button>
            </div>
            <code>{children}</code>
        </div>
    );
};

export default Code;
