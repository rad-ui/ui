'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

/**
 * Hairline install command with copy-to-clipboard.
 *
 * Presentation only — the command is selectable text so it stays useful
 * when scripting is blocked or the API is unavailable.
 */
export default function InstallCommand({
    command,
    label,
    tone = 'panel',
    className = ''
}: {
    command: string
    label?: string
    tone?: 'panel' | 'canvas' | 'inverse'
    className?: string
}) {
    const [copied, setCopied] = useState(false)
    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (resetTimer.current) clearTimeout(resetTimer.current)
        }
    }, [])

    const copy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(command)
            setCopied(true)
            if (resetTimer.current) clearTimeout(resetTimer.current)
            resetTimer.current = setTimeout(() => setCopied(false), 1600)
        } catch {
            setCopied(false)
        }
    }, [command])

    const toneClass =
        tone === 'inverse'
            ? 'border-gray-700 bg-gray-50 text-gray-1000'
            : tone === 'canvas'
              ? 'border-gray-400 bg-gray-50 text-gray-1000'
              : 'border-gray-500 bg-gray-100 text-gray-1000'

    return (
        <div
            className={`group flex items-center gap-3 rounded-md border px-3 py-2.5 ${toneClass} ${className}`}
        >
            {label ? (
                <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-950 sm:block">
                    {label}
                </span>
            ) : null}
            <span aria-hidden className="shrink-0 font-mono text-xs text-green-1000">
                $
            </span>
            <code className="min-w-0 flex-1 select-all truncate font-mono text-[0.8125rem]">
                {command}
            </code>
            <button
                type="button"
                onClick={copy}
                aria-label={copied ? 'Command copied' : 'Copy install command'}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-[5px] border border-gray-400 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-950 transition-colors hover:border-gray-700 hover:bg-gray-200 hover:text-gray-1000"
            >
                {copied ? (
                    <Check className="h-3 w-3 text-green-1000" aria-hidden />
                ) : (
                    <Copy className="h-3 w-3" aria-hidden />
                )}
                <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
        </div>
    )
}