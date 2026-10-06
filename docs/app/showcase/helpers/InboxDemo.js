"use client"

import { useMemo, useState } from "react"

import Avatar from "@radui/ui/Avatar"
import Badge from "@radui/ui/Badge"
import Button from "@radui/ui/Button"
import Checkbox from "@radui/ui/Checkbox"
import Separator from "@radui/ui/Separator"
import TextField from "@radui/ui/TextField"
import Toggle from "@radui/ui/Toggle"
import Tooltip from "@radui/ui/Tooltip"
import { Archive, ArrowLeft, Clock3, File, Inbox, Pencil, Search, Send, Star, Trash2 } from "lucide-react"

const folders = [
    { id: "inbox", label: "Inbox", icon: Inbox },
    { id: "starred", label: "Starred", icon: Star },
    { id: "snoozed", label: "Snoozed", icon: Clock3 },
    { id: "sent", label: "Sent", icon: Send },
    { id: "drafts", label: "Drafts", icon: File },
]

const labels = [
    { label: "Customers", tone: "bg-blue-800" },
    { label: "Billing", tone: "bg-amber-800" },
    { label: "Hiring", tone: "bg-green-800" },
]

const initialMail = [
    {
        id: 1,
        from: "Priya Raman",
        email: "priya@lumen.dev",
        img: 5,
        subject: "Contract renewal — two quick questions",
        preview: "Thanks for the updated proposal. Before we sign, could you confirm whether the annual plan includes…",
        body: [
            "Hi there,",
            "Thanks for the updated proposal. Before we sign, could you confirm whether the annual plan includes the SSO add-on, and whether we can move the start date to April 1?",
            "Happy to jump on a call this week if that's easier.",
            "Best,\nPriya",
        ],
        time: "9:41 AM",
        unread: true,
        starred: true,
        label: "Customers",
    },
    {
        id: 2,
        from: "Stripe",
        email: "receipts@stripe.com",
        subject: "Your receipt from Northwind #2041-8812",
        preview: "Amount paid $1,280.00 · Date paid Mar 14 · Payment method Visa ending 4242",
        body: ["Amount paid: $1,280.00", "Date paid: March 14", "Payment method: Visa ending in 4242", "Questions? Reply to this email or visit the billing portal."],
        time: "8:15 AM",
        unread: true,
        starred: false,
        label: "Billing",
    },
    {
        id: 3,
        from: "Marcus Lee",
        email: "marcus@northwind.io",
        img: 59,
        subject: "Interview loop for the design engineer role",
        preview: "I've put together the panel for Thursday. Can you take the systems design session at 2pm?",
        body: [
            "Hey,",
            "I've put together the panel for Thursday. Can you take the systems design session at 2pm? The candidate's portfolio is linked in the hiring doc.",
            "Thanks!\nMarcus",
        ],
        time: "Yesterday",
        unread: false,
        starred: false,
        label: "Hiring",
    },
    {
        id: 4,
        from: "Linear",
        email: "notifications@linear.app",
        subject: "3 issues assigned to you this week",
        preview: "NW-412 Keyboard focus lost after closing nested dialog · NW-415 Tooltip delay on touch devices · NW-419…",
        body: ["NW-412 Keyboard focus lost after closing nested dialog", "NW-415 Tooltip delay on touch devices", "NW-419 Combobox announces stale result count"],
        time: "Yesterday",
        unread: false,
        starred: true,
    },
    {
        id: 5,
        from: "Elena Duarte",
        email: "elena@fieldnotes.co",
        img: 26,
        subject: "Loved the new docs!",
        preview: "Just wanted to say the new component pages are fantastic — the keyboard tables saved our team hours.",
        body: ["Just wanted to say the new component pages are fantastic — the keyboard tables saved our team hours.", "Keep it up,\nElena"],
        time: "Mar 12",
        unread: false,
        starred: false,
        label: "Customers",
    },
]

const IconAction = ({ label, onClick, children }) => (
    <Tooltip.Root>
        <Tooltip.Trigger
            aria-label={label}
            onClick={onClick}
            className="grid h-8 w-8 place-items-center rounded-md text-gray-950 transition-colors hover:bg-gray-200 hover:text-gray-1000"
        >
            {children}
        </Tooltip.Trigger>
        <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip.Root>
)

const Sender = ({ mail, size }) => (
    <Avatar.Root size={size}>
        {mail.img ? <Avatar.Image src={`https://i.pravatar.cc/96?img=${mail.img}`} alt={mail.from} /> : null}
        <Avatar.Fallback>{mail.from.split(" ").map((part) => part[0]).join("").slice(0, 2)}</Avatar.Fallback>
    </Avatar.Root>
)

const InboxDemo = () => {
    const [mail, setMail] = useState(initialMail)
    const [folder, setFolder] = useState("inbox")
    const [query, setQuery] = useState("")
    const [selected, setSelected] = useState(() => new Set())
    const [openId, setOpenId] = useState(1)
    const [reply, setReply] = useState("")
    const [sentReplies, setSentReplies] = useState({})

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase()
        return mail
            .filter((item) => (folder === "starred" ? item.starred : folder === "inbox"))
            .filter((item) => !q || `${item.from} ${item.subject} ${item.preview}`.toLowerCase().includes(q))
    }, [mail, folder, query])

    const open = mail.find((item) => item.id === openId)
    const unreadCount = mail.filter((item) => item.unread).length
    const allSelected = visible.length > 0 && visible.every((item) => selected.has(item.id))

    const update = (id, patch) => setMail((all) => all.map((item) => (item.id === id ? { ...item, ...patch } : item)))

    const openMail = (id) => {
        setOpenId(id)
        update(id, { unread: false })
        setReply("")
    }

    const toggleSelected = (id, checked) => setSelected((current) => {
        const next = new Set(current)
        if (checked) next.add(id)
        else next.delete(id)
        return next
    })

    const removeSelected = () => {
        setMail((all) => all.filter((item) => !selected.has(item.id)))
        if (selected.has(openId)) setOpenId(null)
        setSelected(new Set())
    }

    const removeOpen = () => {
        setMail((all) => all.filter((item) => item.id !== openId))
        setOpenId(null)
    }

    const sendReply = (event) => {
        event.preventDefault()
        if (!reply.trim()) return
        setSentReplies((all) => ({ ...all, [openId]: [...(all[openId] ?? []), reply.trim()] }))
        setReply("")
    }

    return (
        <div className="grid h-[720px] grid-cols-1 text-gray-1000 md:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,380px)_minmax(0,1fr)]">
            {/* Folders */}
            <aside className="hidden flex-col gap-1 border-r border-gray-400 bg-gray-100 p-3 md:flex">
                <Button className="mb-3 w-full justify-center">
                    <Pencil className="h-4 w-4" />
                    Compose
                </Button>
                <nav aria-label="Folders">
                    <ul className="space-y-0.5">
                        {folders.map(({ id, label, icon: Icon }) => (
                            <li key={id}>
                                <button
                                    type="button"
                                    aria-current={folder === id ? "page" : undefined}
                                    onClick={() => { setFolder(id); setSelected(new Set()) }}
                                    className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                                        folder === id ? "bg-gray-300 font-medium" : "text-gray-950 hover:bg-gray-200"
                                    }`}
                                >
                                    <Icon className="h-4 w-4 text-gray-950" />
                                    {label}
                                    {id === "inbox" && unreadCount ? <span className="ml-auto text-xs font-semibold tabular-nums">{unreadCount}</span> : null}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <p className="px-2.5 pb-1 pt-5 text-xs font-medium text-gray-950">Labels</p>
                <ul className="space-y-0.5">
                    {labels.map(({ label, tone }) => (
                        <li key={label} className="flex items-center gap-2.5 px-2.5 py-1.5 text-sm text-gray-950">
                            <span className={`h-2 w-2 rounded-full ${tone}`} />
                            {label}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* List */}
            <section aria-label="Messages" className={`min-h-0 flex-col border-r border-gray-400 bg-gray-50 ${open ? "hidden xl:flex" : "flex"}`}>
                <div className="border-b border-gray-400 p-3">
                    <TextField
                        aria-label="Search mail"
                        placeholder="Search mail"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        startSlot={<Search className="h-4 w-4" />}
                    />
                </div>
                <div className="flex h-11 items-center gap-2 border-b border-gray-400 px-4">
                    <Checkbox.Root
                        aria-label="Select all"
                        checked={allSelected}
                        onCheckedChange={(checked) => setSelected(checked ? new Set(visible.map((item) => item.id)) : new Set())}
                    >
                        <Checkbox.Indicator />
                    </Checkbox.Root>
                    {selected.size ? (
                        <>
                            <span className="ml-1 text-sm font-medium">{selected.size} selected</span>
                            <div className="ml-auto flex">
                                <IconAction label="Archive" onClick={removeSelected}><Archive className="h-4 w-4" /></IconAction>
                                <IconAction label="Delete" onClick={removeSelected}><Trash2 className="h-4 w-4" /></IconAction>
                            </div>
                        </>
                    ) : (
                        <span className="ml-1 text-sm text-gray-950">{visible.length} conversations</span>
                    )}
                </div>
                <ul className="min-h-0 flex-1 divide-y divide-gray-300 overflow-y-auto">
                    {visible.length === 0 ? (
                        <li className="px-6 py-16 text-center text-sm text-gray-950">
                            {query ? `No messages match “${query}”.` : "You're all caught up."}
                        </li>
                    ) : null}
                    {visible.map((item) => (
                        <li
                            key={item.id}
                            className={`relative flex gap-3 px-4 py-3 transition-colors ${item.id === openId ? "bg-gray-200" : "hover:bg-gray-100"}`}
                        >
                            <div className="flex flex-col items-center gap-2 pt-0.5">
                                <Checkbox.Root
                                    aria-label={`Select message from ${item.from}`}
                                    checked={selected.has(item.id)}
                                    onCheckedChange={(checked) => toggleSelected(item.id, checked === true)}
                                >
                                    <Checkbox.Indicator />
                                </Checkbox.Root>
                                <Toggle
                                    aria-label={item.starred ? "Unstar" : "Star"}
                                    pressed={item.starred}
                                    onPressedChange={(starred) => update(item.id, { starred })}
                                    className="h-6! w-6! min-h-0! rounded-md! border-0! bg-transparent! p-0! shadow-none! hover:bg-gray-200!"
                                >
                                    <Star className={`h-4 w-4 ${item.starred ? "fill-amber-800 text-amber-800" : "text-gray-950"}`} />
                                </Toggle>
                            </div>
                            <button type="button" onClick={() => openMail(item.id)} className="min-w-0 flex-1 text-left">
                                <span className="flex items-baseline gap-2">
                                    {item.unread ? <span className="h-2 w-2 shrink-0 self-center rounded-full bg-blue-800" aria-label="Unread" /> : null}
                                    <span className={`truncate text-sm ${item.unread ? "font-semibold" : "font-medium"}`}>{item.from}</span>
                                    <span className="ml-auto shrink-0 text-xs text-gray-950">{item.time}</span>
                                </span>
                                <span className={`mt-0.5 block truncate text-sm ${item.unread ? "font-medium text-gray-1000" : "text-gray-1000"}`}>{item.subject}</span>
                                <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-gray-950">{item.preview}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Reading pane */}
            {open ? (
                <article aria-label={open.subject} className="flex min-h-0 flex-col bg-gray-50">
                    <div className="flex h-12 items-center gap-1 border-b border-gray-400 px-3">
                        <span className="xl:hidden">
                            <IconAction label="Back to list" onClick={() => setOpenId(null)}><ArrowLeft className="h-4 w-4" /></IconAction>
                        </span>
                        <IconAction label="Archive" onClick={removeOpen}><Archive className="h-4 w-4" /></IconAction>
                        <IconAction label="Delete" onClick={removeOpen}><Trash2 className="h-4 w-4" /></IconAction>
                        <IconAction label="Snooze"><Clock3 className="h-4 w-4" /></IconAction>
                        <span className="ml-auto text-xs text-gray-950">{open.time}</span>
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-xl font-semibold tracking-tight">{open.subject}</h2>
                            {open.label ? <Badge variant="soft" size="small">{open.label}</Badge> : null}
                        </div>
                        <div className="mt-5 flex items-center gap-3">
                            <Sender mail={open} />
                            <div className="min-w-0">
                                <p className="text-sm font-semibold">{open.from}</p>
                                <p className="truncate text-xs text-gray-950">{open.email}</p>
                            </div>
                        </div>
                        <div className="mt-6 max-w-[62ch] space-y-4 whitespace-pre-line text-[15px] leading-relaxed">
                            {open.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        </div>
                        {(sentReplies[open.id] ?? []).map((text, index) => (
                            <div key={index} className="mt-6 max-w-[62ch] rounded-lg bg-gray-200 px-4 py-3">
                                <p className="text-xs font-medium text-gray-950">You replied · just now</p>
                                <p className="mt-1 whitespace-pre-line text-[15px] leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                    <Separator />
                    <form onSubmit={sendReply} className="flex items-center gap-2 px-4 py-3">
                        <div className="min-w-0 flex-1">
                            <TextField
                                aria-label={`Reply to ${open.from}`}
                                placeholder={`Reply to ${open.from.split(" ")[0]}…`}
                                value={reply}
                                onChange={(event) => setReply(event.target.value)}
                            />
                        </div>
                        <Button type="submit" disabled={!reply.trim()}>
                            <Send className="h-4 w-4" />
                            Send
                        </Button>
                    </form>
                </article>
            ) : (
                <div className="hidden place-items-center bg-gray-50 text-sm text-gray-950 xl:grid">Select a message to read it.</div>
            )}
        </div>
    )
}

export default InboxDemo
