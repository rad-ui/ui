"use client"

import { useEffect, useRef, useState } from "react"
import Avatar from "@radui/ui/Avatar"
import Badge from "@radui/ui/Badge"
import Button from "@radui/ui/Button"
import Separator from "@radui/ui/Separator"
import TextField from "@radui/ui/TextField"
import Tooltip from "@radui/ui/Tooltip"
import { FileText, Hash, Image as ImageIcon, Phone, Pin, Plus, Search, SendHorizontal, Video } from "lucide-react"

const people = {
    nina: { name: "Nina Patel", role: "Design lead", initials: "NP", img: 47, online: true },
    leo: { name: "Leo Martins", role: "Frontend", initials: "LM", img: 12, online: true },
    amara: { name: "Amara Okafor", role: "Product", initials: "AO", img: 45 },
    jun: { name: "Jun Park", role: "Support", initials: "JP", img: 33, online: true },
    you: { name: "You", role: "Engineering", initials: "YO" },
}

const initialChannels = [
    {
        id: "launch",
        name: "launch-week",
        topic: "Everything shipping in the 2.0 release, Mar 18–22",
        members: ["nina", "leo", "amara", "jun"],
        unread: 3,
        pinned: [
            { icon: FileText, label: "Launch checklist", meta: "Updated today" },
            { icon: ImageIcon, label: "Hero artwork v4.png", meta: "2.4 MB" },
        ],
        messages: [
            { id: 1, author: "amara", time: "9:02", text: "Morning! Changelog draft is up — can everyone skim their section before noon?" },
            { id: 2, author: "nina", time: "9:14", text: "Looked through the new docs screenshots. Dark mode versions are in the launch folder too.", reactions: { "🎉": 3, "👀": 1 } },
            { id: 3, author: "leo", time: "9:20", text: "Bundle size check passed: the Dialog refactor saved about 4 kB gzipped." },
            { id: 4, author: "leo", time: "9:21", text: "Running the full a11y suite again after lunch, just to be safe." },
            { id: 5, author: "you", time: "9:26", text: "Nice. I'll merge the release branch once the visual regression run is green.", reactions: { "👍": 2 } },
        ],
    },
    {
        id: "design",
        name: "design-crit",
        topic: "Weekly critique — post work in progress, any fidelity",
        members: ["nina", "amara", "you"],
        unread: 0,
        pinned: [{ icon: FileText, label: "Critique guidelines", meta: "Pinned by Nina" }],
        messages: [
            { id: 1, author: "nina", time: "Mon", text: "Uploaded two directions for the pricing page. Option B uses the new card density." },
            { id: 2, author: "amara", time: "Mon", text: "B reads faster for me. The plan comparison is much easier to scan.", reactions: { "💯": 2 } },
        ],
    },
    {
        id: "support",
        name: "support",
        topic: "Customer escalations and docs gaps",
        members: ["jun", "leo", "you"],
        unread: 1,
        pinned: [],
        messages: [
            { id: 1, author: "jun", time: "8:40", text: "Two tickets this week asking how to keep a Popover open while focus moves into a Combobox." },
            { id: 2, author: "jun", time: "8:41", text: "Might be worth a docs example?" },
        ],
    },
]

const PersonAvatar = ({ id, size }) => {
    const person = people[id]
    return (
        <Avatar.Root size={size}>
            {person.img ? <Avatar.Image src={`https://i.pravatar.cc/96?img=${person.img}`} alt={person.name} /> : null}
            <Avatar.Fallback>{person.initials}</Avatar.Fallback>
        </Avatar.Root>
    )
}

const IconButton = ({ label, children }) => (
    <Tooltip.Root>
        <Tooltip.Trigger
            aria-label={label}
            className="grid h-8 w-8 place-items-center rounded-md text-gray-950 transition-colors hover:bg-gray-200 hover:text-gray-1000"
        >
            {children}
        </Tooltip.Trigger>
        <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip.Root>
)

const nowLabel = () => new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M$/i, "")

const MessagingDemo = () => {
    const [channels, setChannels] = useState(initialChannels)
    const [activeId, setActiveId] = useState("launch")
    const [draft, setDraft] = useState("")
    const listRef = useRef(null)

    const active = channels.find((channel) => channel.id === activeId)

    useEffect(() => {
        const list = listRef.current
        if (list) list.scrollTop = list.scrollHeight
    }, [activeId, active.messages.length])

    const openChannel = (id) => {
        setActiveId(id)
        setChannels((all) => all.map((channel) => (channel.id === id ? { ...channel, unread: 0 } : channel)))
    }

    const send = (event) => {
        event.preventDefault()
        const text = draft.trim()
        if (!text) return
        setChannels((all) => all.map((channel) => (
            channel.id === activeId
                ? { ...channel, messages: [...channel.messages, { id: Date.now(), author: "you", time: nowLabel(), text }] }
                : channel
        )))
        setDraft("")
    }

    const toggleReaction = (messageId, emoji) => {
        setChannels((all) => all.map((channel) => {
            if (channel.id !== activeId) return channel
            return {
                ...channel,
                messages: channel.messages.map((message) => {
                    if (message.id !== messageId) return message
                    const mine = new Set(message.mine ?? [])
                    const reactions = { ...(message.reactions ?? {}) }
                    if (mine.has(emoji)) {
                        mine.delete(emoji)
                        reactions[emoji] -= 1
                        if (reactions[emoji] <= 0) delete reactions[emoji]
                    } else {
                        mine.add(emoji)
                        reactions[emoji] = (reactions[emoji] ?? 0) + 1
                    }
                    return { ...message, reactions, mine: [...mine] }
                }),
            }
        }))
    }

    return (
        <div className="grid h-[720px] grid-cols-1 text-gray-1000 md:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_280px]">
            {/* Sidebar */}
            <aside className="hidden min-h-0 flex-col border-r border-gray-400 bg-gray-100 md:flex">
                <div className="flex items-center justify-between px-4 pb-3 pt-4">
                    <div className="flex items-center gap-2.5">
                        <span className="grid h-7 w-7 place-items-center rounded-md bg-gray-1000 text-xs font-semibold text-gray-50">N</span>
                        <span className="text-sm font-semibold">Northwind</span>
                    </div>
                    <IconButton label="New message"><Plus className="h-4 w-4" /></IconButton>
                </div>
                <div className="px-3">
                    <TextField aria-label="Search messages" placeholder="Search" startSlot={<Search className="h-4 w-4" />} />
                </div>

                <nav aria-label="Channels" className="mt-5 min-h-0 flex-1 overflow-y-auto px-2">
                    <p className="px-2 pb-1.5 text-xs font-medium text-gray-950">Channels</p>
                    <ul className="space-y-0.5">
                        {channels.map((channel) => {
                            const isActive = channel.id === activeId
                            return (
                                <li key={channel.id}>
                                    <button
                                        type="button"
                                        onClick={() => openChannel(channel.id)}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                                            isActive ? "bg-gray-300 font-medium text-gray-1000" : "text-gray-950 hover:bg-gray-200"
                                        }`}
                                    >
                                        <Hash className="h-4 w-4 shrink-0 text-gray-950" />
                                        <span className={`truncate ${channel.unread ? "font-semibold text-gray-1000" : ""}`}>{channel.name}</span>
                                        {channel.unread ? (
                                            <span className="ml-auto rounded-full bg-gray-1000 px-1.5 text-[11px] font-semibold leading-5 text-gray-50">{channel.unread}</span>
                                        ) : null}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>

                    <p className="px-2 pb-1.5 pt-5 text-xs font-medium text-gray-950">Direct messages</p>
                    <ul className="space-y-0.5">
                        {["nina", "leo", "jun"].map((id) => (
                            <li key={id} className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-gray-950">
                                <span className="relative">
                                    <PersonAvatar id={id} size="small" />
                                    {people[id].online ? (
                                        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-gray-100 bg-green-800" />
                                    ) : null}
                                </span>
                                <span className="truncate">{people[id].name}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Conversation */}
            <section aria-label={`#${active.name}`} className="flex min-h-0 min-w-0 flex-col bg-gray-50">
                <header className="flex items-center gap-3 border-b border-gray-400 px-4 py-3 sm:px-5">
                    <div className="min-w-0 flex-1">
                        <h2 className="flex items-center gap-1 text-[15px] font-semibold">
                            <Hash className="h-4 w-4 text-gray-950" />
                            {active.name}
                        </h2>
                        <p className="truncate text-[13px] text-gray-950">{active.topic}</p>
                    </div>
                    <div className="hidden -space-x-1.5 sm:flex">
                        {active.members.slice(0, 3).map((id) => (
                            <span key={id} className="rounded-full ring-2 ring-gray-50"><PersonAvatar id={id} size="small" /></span>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <IconButton label="Start a call"><Phone className="h-4 w-4" /></IconButton>
                        <IconButton label="Start a video call"><Video className="h-4 w-4" /></IconButton>
                    </div>
                </header>

                {/* Mobile channel switcher */}
                <div className="flex gap-1.5 overflow-x-auto border-b border-gray-400 px-4 py-2 md:hidden [scrollbar-width:none]">
                    {channels.map((channel) => (
                        <Button
                            key={channel.id}
                            size="small"
                            variant={channel.id === activeId ? "solid" : "soft"}
                            onClick={() => openChannel(channel.id)}
                        >
                            #{channel.name}
                        </Button>
                    ))}
                </div>

                <ol ref={listRef} className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-5" aria-live="polite">
                    <li className="flex items-center gap-3 text-xs font-medium text-gray-950" aria-hidden="true">
                        <Separator className="flex-1" />
                        Today
                        <Separator className="flex-1" />
                    </li>
                    {active.messages.map((message, index) => {
                        const person = people[message.author]
                        const grouped = index > 0 && active.messages[index - 1].author === message.author
                        return (
                            <li key={message.id} className={`group flex gap-3 ${grouped ? "-mt-3.5" : ""}`}>
                                <div className="w-8 shrink-0">{grouped ? null : <PersonAvatar id={message.author} />}</div>
                                <div className="min-w-0 flex-1">
                                    {grouped ? null : (
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-sm font-semibold">{person.name}</span>
                                            <span className="text-xs text-gray-950">{message.time}</span>
                                        </div>
                                    )}
                                    <p className="mt-0.5 text-[15px] leading-relaxed text-gray-1000">{message.text}</p>
                                    {message.reactions && Object.keys(message.reactions).length ? (
                                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                                            {Object.entries(message.reactions).map(([emoji, count]) => {
                                                const pressed = message.mine?.includes(emoji)
                                                return (
                                                    <button
                                                        key={emoji}
                                                        type="button"
                                                        aria-pressed={pressed}
                                                        aria-label={`${emoji} ${count}, ${pressed ? "remove" : "add"} reaction`}
                                                        onClick={() => toggleReaction(message.id, emoji)}
                                                        className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors ${
                                                            pressed ? "border-gray-800 bg-gray-200 font-semibold" : "border-gray-400 hover:border-gray-700"
                                                        }`}
                                                    >
                                                        <span>{emoji}</span>
                                                        <span className="tabular-nums">{count}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    ) : null}
                                </div>
                            </li>
                        )
                    })}
                </ol>

                <form onSubmit={send} className="flex items-center gap-2 border-t border-gray-400 px-4 py-3 sm:px-5">
                    <div className="min-w-0 flex-1">
                        <TextField
                            aria-label={`Message #${active.name}`}
                            placeholder={`Message #${active.name}`}
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                        />
                    </div>
                    <Button type="submit" disabled={!draft.trim()} aria-label="Send message">
                        <SendHorizontal className="h-4 w-4" />
                        <span className="hidden sm:inline">Send</span>
                    </Button>
                </form>
            </section>

            {/* Details */}
            <aside aria-label="Channel details" className="hidden min-h-0 flex-col overflow-y-auto border-l border-gray-400 bg-gray-100 px-5 py-4 xl:flex">
                <h3 className="text-sm font-semibold">About</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-950">{active.topic}</p>

                <div className="py-5"><Separator /></div>

                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Members</h3>
                    <Badge variant="soft" size="small">{active.members.length}</Badge>
                </div>
                <ul className="mt-3 space-y-3">
                    {active.members.map((id) => (
                        <li key={id} className="flex items-center gap-3">
                            <PersonAvatar id={id} size="small" />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">{people[id].name}</p>
                                <p className="truncate text-xs text-gray-950">{people[id].role}</p>
                            </div>
                            {people[id].online ? <span className="ml-auto h-2 w-2 rounded-full bg-green-800" aria-label="Online" /> : null}
                        </li>
                    ))}
                </ul>

                <div className="py-5"><Separator /></div>

                <h3 className="flex items-center gap-1.5 text-sm font-semibold"><Pin className="h-3.5 w-3.5" /> Pinned</h3>
                {active.pinned.length ? (
                    <ul className="mt-3 space-y-2">
                        {active.pinned.map(({ icon: Icon, label, meta }) => (
                            <li key={label} className="flex items-center gap-3 rounded-lg px-1 py-1">
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-gray-200 text-gray-950"><Icon className="h-4 w-4" /></span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{label}</p>
                                    <p className="text-xs text-gray-950">{meta}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-2 text-sm text-gray-950">Nothing pinned yet.</p>
                )}
            </aside>
        </div>
    )
}

export default MessagingDemo
