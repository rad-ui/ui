'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'

import Button from '@radui/ui/Button'
import Dialog from '@radui/ui/Dialog'
import Tabs from '@radui/ui/Tabs'

import Unthemed from './Unthemed'

export type QuickStartStep = {
    id: string
    label: string
    file: string
    code: string
    highlighted: ReactNode
}

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
    useEffect(
        () => () => {
            if (timer.current) clearTimeout(timer.current)
        },
        []
    )

    return (
        <button
            type="button"
            onClick={async () => {
                try {
                    await navigator.clipboard.writeText(text)
                    setCopied(true)
                    if (timer.current) clearTimeout(timer.current)
                    timer.current = setTimeout(() => setCopied(false), 1600)
                } catch {
                    setCopied(false)
                }
            }}
            aria-label={copied ? 'Copied' : 'Copy code'}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.8125rem] text-gray-950 transition-colors hover:bg-gray-200 hover:text-gray-1000"
        >
            {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
            {copied ? 'Copied' : 'Copy'}
        </button>
    )
}

export default function QuickStart({ steps }: { steps: QuickStartStep[] }) {
    const [tab, setTab] = useState(steps[0]?.id ?? '')
    return (
        <div className="min-w-0">
            <Unthemed>
                <Tabs.Root value={tab} onValueChange={setTab} className="min-w-0">
                    <Tabs.List aria-label="Quick start steps" className="flex flex-wrap gap-1">
                        {steps.map((step) => (
                            <Tabs.Trigger
                                key={step.id}
                                value={step.id}
                                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium text-gray-950 outline-none transition-colors hover:text-gray-1000 focus-visible:ring-2 focus-visible:ring-gray-1000 data-[state=active]:bg-gray-1000 data-[state=active]:text-gray-50"
                            >
                                {step.label}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>

                    {steps.map((step) => (
                        <Tabs.Content key={step.id} value={step.id} className="mt-4 outline-none">
                            <div className="overflow-hidden rounded-2xl border border-gray-400 bg-gray-100">
                                <div className="flex items-center justify-between gap-3 py-2 pl-5 pr-3">
                                    <span className="font-mono text-[0.8125rem] text-gray-950">{step.file}</span>
                                    <CopyButton text={step.code} />
                                </div>
                                <pre className="docs-syntax-pre overflow-x-auto px-5 pb-5 font-mono text-[0.8125rem] leading-6 text-gray-1000">
                                    <code className="docs-code-block language-tsx">{step.highlighted}</code>
                                </pre>
                            </div>
                        </Tabs.Content>
                    ))}
                </Tabs.Root>
            </Unthemed>
            {tab === 'compose' ? (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gray-100 px-5 py-4">
                    <span className="text-sm text-gray-950">That snippet, running:</span>
                    <ProfileDialog />
                </div>
            ) : null}
        </div>
    )
}

function ProfileDialog() {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button>Edit profile</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                    <Dialog.Title>Edit profile</Dialog.Title>
                    <Dialog.Description>
                        Composed from parts, rendered through your own Button with asChild.
                    </Dialog.Description>
                    <Dialog.Footer>
                        <Dialog.Close asChild>
                            <Button>Done</Button>
                        </Dialog.Close>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
