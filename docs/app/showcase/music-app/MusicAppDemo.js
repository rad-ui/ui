"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import Avatar from "@radui/ui/Avatar"
import Badge from "@radui/ui/Badge"
import Button from "@radui/ui/Button"
import Command from "@radui/ui/Command"
import ContextMenu from "@radui/ui/ContextMenu"
import Dialog from "@radui/ui/Dialog"
import DropdownMenu from "@radui/ui/DropdownMenu"
import HoverCard from "@radui/ui/HoverCard"
import Kbd from "@radui/ui/Kbd"
import Popover from "@radui/ui/Popover"
import RadioGroup from "@radui/ui/RadioGroup"
import Separator from "@radui/ui/Separator"
import Slider from "@radui/ui/Slider"
import Switch from "@radui/ui/Switch"
import Tabs from "@radui/ui/Tabs"
import TextField from "@radui/ui/TextField"
import Toast, { createToastManager } from "@radui/ui/Toast"
import Toggle from "@radui/ui/Toggle"
import Tooltip from "@radui/ui/Tooltip"
import {
    Clock3,
    Disc3,
    Heart,
    Home,
    Library,
    ListMusic,
    ListPlus,
    LogOut,
    Moon,
    MoreHorizontal,
    Music2,
    Pause,
    Play,
    Plus,
    Repeat,
    Repeat1,
    Search,
    Settings,
    Share2,
    Shuffle,
    SkipBack,
    SkipForward,
    User,
    Volume1,
    Volume2,
    VolumeX,
    X,
} from "lucide-react"

/* ------------------------------------------------------------------ data */

const photo = (id, w = 400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

const artists = {
    "Hollow Coast": { photo: photo("1493225457124-a3eb161ffa5f", 160), listeners: "2.4M", bio: "Synth-rock trio from Lisbon. Night drives, wet streets, big choruses." },
    "Mira Vale": { photo: photo("1514525253161-7a46d19cd819", 160), listeners: "1.1M", bio: "Dream-pop songwriter recording everything in a converted lighthouse." },
    "The Static Hours": { photo: photo("1470225620780-dba8ba36b745", 160), listeners: "640K", bio: "Post-punk revivalists with a soft spot for analog delay." },
    "June Arcade": { photo: photo("1459749411175-04bf5292ceea", 160), listeners: "890K", bio: "Indie four-piece. Bright guitars, brighter harmonies." },
    "Night Bureau": { photo: photo("1501612780327-45045538702b", 160), listeners: "310K", bio: "Instrumental outfit scoring films that don't exist." },
    Loam: { photo: photo("1508700115892-45ecd05ae2ad", 160), listeners: "1.8M", bio: "Ambient producer building tracks from field recordings." },
    "Ada Wren": { photo: photo("1487180144351-b8472da7d491", 160), listeners: "720K", bio: "Pianist and producer. Quiet music for loud days." },
    "Polar Index": { photo: photo("1506157786151-b8491531f063", 160), listeners: "450K", bio: "Modular synth duo from Oslo." },
    "The Daylights": { photo: photo("1498038432885-c6f3f1b912ee", 160), listeners: "980K", bio: "Folk band that sounds like Sunday morning." },
    Ottilie: { photo: photo("1524368535928-5b5e00ddc76b", 160), listeners: "260K", bio: "Soul singer with a 1970s Wurlitzer and opinions." },
}

const t = (id, title, artist, album, duration, cover) => ({ id, title, artist, album, duration, cover: photo(cover) })

const basePlaylists = [
    {
        id: "late-night",
        name: "Late Night Drive",
        owner: "Sound Wave",
        description: "Moody synths and slow-burn guitars for the empty highway.",
        genres: ["Synthwave", "Indie rock", "Dream pop"],
        followers: "184,203",
        cover: photo("1493225457124-a3eb161ffa5f"),
        tracks: [
            t(1, "Neon Rain", "Hollow Coast", "City Lights", 214, "1493225457124-a3eb161ffa5f"),
            t(2, "Afterglow", "Mira Vale", "Afterglow", 247, "1514525253161-7a46d19cd819"),
            t(3, "Overpass", "The Static Hours", "Signals", 198, "1470225620780-dba8ba36b745"),
            t(4, "Low Tide", "Hollow Coast", "City Lights", 263, "1493225457124-a3eb161ffa5f"),
            t(5, "Paper Moons", "June Arcade", "Paper Moons", 221, "1459749411175-04bf5292ceea"),
            t(6, "Exit 42", "Night Bureau", "Mileage", 236, "1501612780327-45045538702b"),
            t(7, "Glass Hours", "Mira Vale", "Afterglow", 205, "1514525253161-7a46d19cd819"),
        ],
    },
    {
        id: "focus",
        name: "Deep Focus",
        owner: "Sound Wave",
        description: "Instrumental beats to keep you in flow.",
        genres: ["Ambient", "Electronic", "Piano"],
        followers: "1,022,914",
        cover: photo("1511671782779-c97d3d27a1d4"),
        tracks: [
            t(11, "Quiet Engine", "Loam", "Fieldwork", 182, "1508700115892-45ecd05ae2ad"),
            t(12, "Morning Static", "Ada Wren", "Margins", 240, "1487180144351-b8472da7d491"),
            t(13, "Lattice", "Loam", "Fieldwork", 215, "1508700115892-45ecd05ae2ad"),
            t(14, "Soft Machines", "Polar Index", "Soft Machines", 268, "1506157786151-b8491531f063"),
        ],
    },
    {
        id: "sunday",
        name: "Sunday Records",
        owner: "You",
        description: "Warm, slow and a little dusty.",
        genres: ["Folk", "Soul"],
        followers: "12",
        cover: photo("1459749411175-04bf5292ceea"),
        tracks: [
            t(21, "Coffee & Vinyl", "The Daylights", "Porch Songs", 199, "1498038432885-c6f3f1b912ee"),
            t(22, "Sundial", "Ottilie", "Sundial", 232, "1524368535928-5b5e00ddc76b"),
            t(23, "Long Way Home", "The Daylights", "Porch Songs", 254, "1498038432885-c6f3f1b912ee"),
        ],
    },
]

const friends = [
    { name: "Maya", img: 47, track: "Afterglow", artist: "Mira Vale", when: "Now" },
    { name: "Theo", img: 12, track: "Lattice", artist: "Loam", when: "12 min" },
    { name: "Ines", img: 45, track: "Sundial", artist: "Ottilie", when: "1 hr" },
]

const sleepOptions = [
    { value: "off", label: "Off" },
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "end", label: "End of track" },
]

/* -------------------------------------------------------------- helpers */

const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`

// Slim media scrubber on top of the Rad UI Slider. Tokens only, so it follows light/dark.
const mediaSliderCss = `
.sw-media-slider .rad-ui-slider{max-width:none;min-height:16px}
.sw-media-slider .rad-ui-slider-track{height:4px;background-color:var(--rad-ui-color-gray-500);box-shadow:none}
.sw-media-slider .rad-ui-slider-track::before,.sw-media-slider .rad-ui-slider-track::after{display:none}
.sw-media-slider .rad-ui-slider-range{background-color:var(--rad-ui-color-gray-1000);box-shadow:none;transition:background-color .15s}
.sw-media-slider:hover .rad-ui-slider-range,.sw-media-slider:focus-within .rad-ui-slider-range{background-color:var(--rad-ui-color-green-900)}
.sw-media-slider .rad-ui-slider-thumb{width:12px;height:12px;margin-left:4px;border:0;background-color:var(--rad-ui-color-gray-1000);box-shadow:var(--rad-ui-shadow-sm);opacity:0;transition:opacity .15s}
.sw-media-slider:hover .rad-ui-slider-thumb,.sw-media-slider .rad-ui-slider-thumb:focus-visible{opacity:1}
`

const IconButton = ({ label, onClick, active, shortcut, className = "", children }) => (
    <Tooltip.Root>
        <Tooltip.Trigger
            aria-label={label}
            aria-pressed={active}
            onClick={onClick}
            className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${active ? "text-green-900" : "text-gray-900 hover:text-gray-1000"} ${className}`}
        >
            {children}
        </Tooltip.Trigger>
        <Tooltip.Content>
            <span className="flex items-center gap-2">{label}{shortcut ? <Kbd size="small">{shortcut}</Kbd> : null}</span>
        </Tooltip.Content>
    </Tooltip.Root>
)

const Equalizer = () => (
    <span className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
        {[60, 100, 40].map((height, bar) => (
            <span key={bar} className="w-[3px] rounded-sm bg-green-900 motion-safe:animate-pulse" style={{ height: `${height}%`, animationDelay: `${bar * 150}ms` }} />
        ))}
    </span>
)

const ArtistHoverCard = ({ name, following, onToggleFollow }) => {
    const artist = artists[name]
    return (
        <HoverCard.Root openDelay={250} className="inline">
            <HoverCard.Trigger className="inline cursor-pointer text-[length:inherit]! font-normal! text-inherit! no-underline! hover:text-gray-1000! hover:underline!">{name}</HoverCard.Trigger>
            <HoverCard.Content>
                <div className="w-64">
                    <div className="flex items-center gap-3">
                        <Avatar.Root size="large">
                            <Avatar.Image src={artist.photo} alt={name} />
                            <Avatar.Fallback>{name.slice(0, 2)}</Avatar.Fallback>
                        </Avatar.Root>
                        <div className="min-w-0">
                            <p className="truncate text-[15px] font-semibold text-gray-1000">{name}</p>
                            <p className="text-xs text-gray-900">{artist.listeners} monthly listeners</p>
                        </div>
                    </div>
                    <p className="mt-3 text-sm leading-snug text-gray-950">{artist.bio}</p>
                    <Toggle pressed={following} onPressedChange={onToggleFollow} className="mt-3 w-full! justify-center">
                        {following ? "Following" : "Follow"}
                    </Toggle>
                </div>
            </HoverCard.Content>
        </HoverCard.Root>
    )
}

/* ---------------------------------------------------------------- app */

const MusicApp = () => {
    const toast = Toast.useToastManager()

    const [playlists, setPlaylists] = useState(basePlaylists)
    const [playlistId, setPlaylistId] = useState("late-night")
    const [tab, setTab] = useState("songs")
    const [current, setCurrent] = useState({ playlistId: "late-night", index: 1 })
    const [queue, setQueue] = useState([])
    const [playing, setPlaying] = useState(false)
    const [position, setPosition] = useState(38)
    const [volume, setVolume] = useState(70)
    const [muted, setMuted] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [repeat, setRepeat] = useState("off")
    const [sleep, setSleep] = useState("off")
    const [liked, setLiked] = useState(() => new Set([2, 12]))
    const [following, setFollowing] = useState(() => new Set(["Mira Vale"]))
    const [savedPlaylists, setSavedPlaylists] = useState(() => new Set(["late-night"]))
    const [filter, setFilter] = useState("")
    const [showQueue, setShowQueue] = useState(true)
    const [paletteOpen, setPaletteOpen] = useState(false)
    const [createOpen, setCreateOpen] = useState(false)
    const [draft, setDraft] = useState({ name: "", description: "", isPublic: true })

    const findPlaylist = useCallback((id) => playlists.find((item) => item.id === id), [playlists])
    const playlist = findPlaylist(playlistId)
    const nowPlaylist = findPlaylist(current.playlistId)
    const track = nowPlaylist.tracks[current.index]
    const totalTime = playlist.tracks.reduce((sum, item) => sum + item.duration, 0)

    const notify = useCallback((title, description) => toast.add({ title, description }), [toast])

    const q = filter.trim().toLowerCase()
    const visibleTracks = playlist.tracks
        .map((item, index) => ({ ...item, index }))
        .filter((item) => !q || `${item.title} ${item.artist} ${item.album}`.toLowerCase().includes(q))

    const albumMap = new Map()
    playlist.tracks.forEach((item, index) => {
        if (!albumMap.has(item.album)) albumMap.set(item.album, { name: item.album, artist: item.artist, cover: item.cover, firstIndex: index, indexes: [] })
        albumMap.get(item.album).indexes.push(index)
    })
    const albums = [...albumMap.values()]

    /* playback */

    const startAt = useCallback((target) => {
        setCurrent(target)
        setPosition(0)
        setPlaying(true)
    }, [])

    const step = useCallback((direction) => {
        if (direction > 0 && queue.length) {
            const [next, ...rest] = queue
            setQueue(rest)
            startAt({ playlistId: next.playlistId, index: next.index })
            return
        }
        setPosition(0)
        setCurrent((now) => {
            const count = findPlaylist(now.playlistId).tracks.length
            if (shuffle && direction > 0 && count > 1) {
                let next = Math.floor(Math.random() * count)
                if (next === now.index) next = (next + 1) % count
                return { ...now, index: next }
            }
            return { ...now, index: (now.index + direction + count) % count }
        })
    }, [findPlaylist, queue, shuffle, startAt])

    useEffect(() => {
        if (!playing) return undefined
        const timer = setInterval(() => setPosition((seconds) => seconds + 1), 1000)
        return () => clearInterval(timer)
    }, [playing])

    useEffect(() => {
        if (position < track.duration) return
        if (sleep === "end") {
            setPlaying(false)
            setPosition(0)
            setSleep("off")
            notify("Sleep timer ended", "Playback paused at the end of the track.")
            return
        }
        if (repeat === "one") setPosition(0)
        else step(1)
    }, [notify, position, repeat, sleep, step, track.duration])

    useEffect(() => {
        if (sleep !== "15" && sleep !== "30") return undefined
        // Demo time: minutes run as seconds so the timer is observable.
        const timer = setTimeout(() => {
            setPlaying(false)
            setSleep("off")
            notify("Sleep timer ended", "Playback paused. Sweet dreams.")
        }, Number(sleep) * 1000)
        return () => clearTimeout(timer)
    }, [notify, sleep])

    // Space toggles playback; ⌘K / Ctrl+K opens search.
    useEffect(() => {
        const onKey = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                event.preventDefault()
                setPaletteOpen((open) => !open)
                return
            }
            if (event.code !== "Space") return
            if (event.target.closest?.("input, textarea, button, [role=slider], [role=dialog], [contenteditable=true]")) return
            event.preventDefault()
            setPlaying((value) => !value)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    const playTrack = (index) => {
        if (current.playlistId === playlistId && current.index === index) {
            setPlaying((value) => !value)
            return
        }
        startAt({ playlistId, index })
    }

    const addToQueue = (items) => {
        setQueue((list) => [...list, ...items.map((item) => ({ ...item, key: `${Date.now()}-${item.playlistId}-${item.index}-${Math.random()}` }))])
    }

    /* library */

    const toggleLike = (item) => {
        const has = liked.has(item.id)
        setLiked((set) => {
            const next = new Set(set)
            if (has) next.delete(item.id)
            else next.add(item.id)
            return next
        })
        notify(has ? "Removed from Liked Songs" : "Added to Liked Songs", item.title)
    }

    const toggleFollow = (name) => {
        const has = following.has(name)
        setFollowing((set) => {
            const next = new Set(set)
            if (has) next.delete(name)
            else next.add(name)
            return next
        })
        notify(has ? `Unfollowed ${name}` : `Following ${name}`)
    }

    const createPlaylist = (event) => {
        event.preventDefault()
        const name = draft.name.trim()
        if (!name) return
        const id = `user-${Date.now()}`
        setPlaylists((list) => [...list, {
            id,
            name,
            owner: "You",
            description: draft.description.trim() || "Your new playlist.",
            genres: [],
            followers: draft.isPublic ? "0" : "Private",
            cover: photo("1446057032654-9d8885db76c6"),
            tracks: [],
        }])
        setPlaylistId(id)
        setTab("songs")
        setCreateOpen(false)
        setDraft({ name: "", description: "", isPublic: true })
        notify("Playlist created", `${name} is ready for some songs.`)
    }

    const addTrackToPlaylist = (targetId, item) => {
        setPlaylists((list) => list.map((entry) => (
            entry.id === targetId && !entry.tracks.some((existing) => existing.id === item.id)
                ? { ...entry, tracks: [...entry.tracks, item] }
                : entry
        )))
        notify(`Added to ${findPlaylist(targetId).name}`, item.title)
    }

    const isPlaylistPlaying = playing && current.playlistId === playlistId
    const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2
    const progress = Math.min(100, (position / track.duration) * 100)
    const userPlaylists = playlists.filter((item) => item.owner === "You")

    const upNextFromPlaylist = Array.from({ length: Math.max(0, Math.min(4, nowPlaylist.tracks.length - 1)) }, (_, i) => {
        const index = (current.index + 1 + i) % nowPlaylist.tracks.length
        return { ...nowPlaylist.tracks[index], index, playlistId: nowPlaylist.id }
    })
    const queued = queue.map((entry) => ({ ...findPlaylist(entry.playlistId).tracks[entry.index], ...entry }))

    const allTracks = playlists.flatMap((entry) => entry.tracks.map((item, index) => ({ ...item, index, playlistId: entry.id })))

    return (
        <div className="flex h-[800px] flex-col bg-gray-50 text-gray-1000">
            <style>{mediaSliderCss}</style>

            <div className={`grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] ${showQueue ? "xl:grid-cols-[240px_minmax(0,1fr)_300px]" : ""}`}>
                {/* ---------------------------------------------------- sidebar */}
                <aside className="hidden min-h-0 flex-col border-r border-gray-400 bg-gray-100 md:flex">
                    <div className="flex items-center gap-2 px-5 pb-4 pt-5">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-green-900 text-gray-50"><Music2 className="h-4 w-4" /></span>
                        <span className="text-[15px] font-semibold tracking-tight">Sound Wave</span>
                    </div>
                    <nav aria-label="Main" className="px-3">
                        <ul className="space-y-0.5">
                            <li><span className="flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-semibold"><Home className="h-[18px] w-[18px]" />Home</span></li>
                            <li>
                                <button type="button" onClick={() => setPaletteOpen(true)} className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-sm text-gray-950 transition-colors hover:bg-gray-200">
                                    <Search className="h-[18px] w-[18px]" />Search
                                    <span className="ml-auto flex gap-0.5"><Kbd size="small">⌘</Kbd><Kbd size="small">K</Kbd></span>
                                </button>
                            </li>
                            <li><span className="flex items-center gap-3 rounded-md px-2.5 py-2 text-sm text-gray-950"><Library className="h-[18px] w-[18px]" />Your library</span></li>
                        </ul>
                    </nav>

                    <div className="mt-5 flex items-center justify-between pl-5 pr-3">
                        <p className="text-xs font-medium text-gray-900">Playlists</p>
                        <IconButton label="Create playlist" onClick={() => setCreateOpen(true)}><Plus className="h-4 w-4" /></IconButton>
                    </div>
                    <ul className="mt-1 min-h-0 flex-1 space-y-0.5 overflow-y-auto px-3">
                        {playlists.map((item) => (
                            <li key={item.id}>
                                <button
                                    type="button"
                                    onClick={() => { setPlaylistId(item.id); setFilter(""); setTab("songs") }}
                                    aria-current={item.id === playlistId ? "page" : undefined}
                                    className={`flex w-full items-center gap-3 rounded-md p-1.5 text-left transition-colors ${item.id === playlistId ? "bg-gray-300" : "hover:bg-gray-200"}`}
                                >
                                    <img src={item.cover} alt="" className="h-10 w-10 shrink-0 rounded object-cover" />
                                    <span className="min-w-0 flex-1">
                                        <span className={`block truncate text-sm font-medium ${current.playlistId === item.id && playing ? "text-green-900" : ""}`}>{item.name}</span>
                                        <span className="block truncate text-xs text-gray-900">Playlist · {item.owner}</span>
                                    </span>
                                    {current.playlistId === item.id && playing ? <Volume2 className="h-3.5 w-3.5 shrink-0 text-green-900" aria-label="Playing" /> : null}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="border-t border-gray-400 px-5 py-4">
                        <p className="text-xs font-medium text-gray-900">Friend activity</p>
                        <ul className="mt-3 space-y-3">
                            {friends.map((friend) => (
                                <li key={friend.name} className="flex items-center gap-2.5">
                                    <span className="relative">
                                        <Avatar.Root size="small">
                                            <Avatar.Image src={`https://i.pravatar.cc/96?img=${friend.img}`} alt={friend.name} />
                                            <Avatar.Fallback>{friend.name[0]}</Avatar.Fallback>
                                        </Avatar.Root>
                                        {friend.when === "Now" ? <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-gray-100 bg-green-900" /> : null}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="flex items-baseline justify-between gap-2">
                                            <span className="truncate text-sm font-medium">{friend.name}</span>
                                            <span className="shrink-0 text-[11px] text-gray-900">{friend.when}</span>
                                        </span>
                                        <span className="block truncate text-xs text-gray-900">{friend.track} · {friend.artist}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* ------------------------------------------------------- main */}
                <main className="flex min-h-0 min-w-0 flex-col">
                    {/* Top bar */}
                    <div className="flex items-center gap-3 border-b border-gray-400 px-4 py-2.5 sm:px-8">
                        <button
                            type="button"
                            onClick={() => setPaletteOpen(true)}
                            className="flex h-9 min-w-0 flex-1 items-center gap-2.5 rounded-full bg-gray-200 px-3.5 text-sm text-gray-900 transition-colors hover:bg-gray-300 sm:max-w-sm"
                        >
                            <Search className="h-4 w-4 shrink-0" />
                            <span className="truncate">What do you want to play?</span>
                            <span className="ml-auto hidden gap-0.5 sm:flex"><Kbd size="small">⌘</Kbd><Kbd size="small">K</Kbd></span>
                        </button>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger aria-label="Account" className="ml-auto min-h-0! rounded-full! border-0! bg-transparent! p-0! shadow-none!">
                                <Avatar.Root size="small">
                                    <Avatar.Image src="https://i.pravatar.cc/96?img=32" alt="Your account" />
                                    <Avatar.Fallback>YO</Avatar.Fallback>
                                </Avatar.Root>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Item label="Profile" onSelect={() => notify("Profile", "Opening your profile…")}><User className="h-4 w-4" /> Profile</DropdownMenu.Item>
                                <DropdownMenu.Item label="Settings" onSelect={() => notify("Settings", "Opening settings…")}><Settings className="h-4 w-4" /> Settings</DropdownMenu.Item>
                                <DropdownMenu.Separator />
                                <DropdownMenu.Item label="Log out" onSelect={() => notify("Logged out", "See you soon.")}><LogOut className="h-4 w-4" /> Log out</DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto">
                        {/* Mobile playlist switcher */}
                        <div className="flex gap-1.5 overflow-x-auto px-4 pt-4 md:hidden [scrollbar-width:none]">
                            {playlists.map((item) => (
                                <Button key={item.id} size="small" variant={item.id === playlistId ? "solid" : "soft"} onClick={() => setPlaylistId(item.id)}>
                                    {item.name}
                                </Button>
                            ))}
                        </div>

                        {/* Header */}
                        <header className="flex flex-col gap-5 px-5 pb-5 pt-6 sm:flex-row sm:items-end sm:px-8">
                            <img src={playlist.cover} alt={`${playlist.name} cover`} className="h-36 w-36 shrink-0 rounded-lg object-cover shadow-xl sm:h-44 sm:w-44" />
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900">Playlist</p>
                                <h2 className="mt-1 truncate text-3xl font-bold tracking-tight sm:text-5xl">{playlist.name}</h2>
                                <p className="mt-2 text-[15px] text-gray-950">{playlist.description}</p>
                                <p className="mt-1.5 text-sm text-gray-900">
                                    <span className="font-medium text-gray-1000">{playlist.owner}</span> · {playlist.tracks.length} songs{totalTime ? ` · ${Math.round(totalTime / 60)} min` : ""}
                                </p>
                            </div>
                        </header>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-3 px-5 pb-2 sm:px-8">
                            <Button
                                size="large"
                                color="green"
                                disabled={!playlist.tracks.length}
                                className="h-12! w-12! justify-center rounded-full! p-0!"
                                aria-label={isPlaylistPlaying ? `Pause ${playlist.name}` : `Play ${playlist.name}`}
                                onClick={() => (current.playlistId === playlistId ? setPlaying((value) => !value) : playTrack(0))}
                            >
                                {isPlaylistPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
                            </Button>
                            <IconButton label={shuffle ? "Disable shuffle" : "Shuffle play"} active={shuffle} onClick={() => setShuffle((value) => !value)} className="h-10! w-10!">
                                <Shuffle className="h-5 w-5" />
                            </IconButton>
                            <Toggle
                                pressed={savedPlaylists.has(playlistId)}
                                onPressedChange={(on) => {
                                    setSavedPlaylists((set) => {
                                        const next = new Set(set)
                                        if (on) next.add(playlistId)
                                        else next.delete(playlistId)
                                        return next
                                    })
                                    notify(on ? "Saved to Your library" : "Removed from Your library", playlist.name)
                                }}
                                aria-label={savedPlaylists.has(playlistId) ? "Remove from library" : "Save to library"}
                                className="rounded-full!"
                            >
                                <Heart className={`h-4 w-4 ${savedPlaylists.has(playlistId) ? "fill-green-900 text-green-900" : ""}`} />
                            </Toggle>
                        </div>

                        {/* Tabs */}
                        <Tabs.Root value={tab} onValueChange={setTab} className="px-2 sm:px-5">
                            <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-3">
                                <Tabs.List aria-label="Playlist views">
                                    <Tabs.Trigger value="songs">Songs</Tabs.Trigger>
                                    <Tabs.Trigger value="albums">Albums</Tabs.Trigger>
                                    <Tabs.Trigger value="about">About</Tabs.Trigger>
                                </Tabs.List>
                                {tab === "songs" ? (
                                    <div className="w-full sm:w-56">
                                        <TextField aria-label="Filter songs" placeholder="Filter songs" value={filter} onChange={(event) => setFilter(event.target.value)} startSlot={<Search className="h-4 w-4" />} />
                                    </div>
                                ) : null}
                            </div>

                            {/* Songs */}
                            <Tabs.Content value="songs" className="border-0! bg-transparent! p-0! shadow-none!">
                                <div role="table" aria-label={`${playlist.name} songs`}>
                                    <div role="row" className="grid grid-cols-[2rem_minmax(0,1fr)_4.5rem_2.5rem] items-center gap-3 border-b border-gray-400 px-3 pb-2 text-xs font-medium text-gray-900 lg:grid-cols-[2rem_minmax(0,1.4fr)_minmax(0,1fr)_4.5rem_2.5rem]">
                                        <span role="columnheader" className="text-center">#</span>
                                        <span role="columnheader">Title</span>
                                        <span role="columnheader" className="hidden lg:block">Album</span>
                                        <span role="columnheader" className="flex justify-end"><Clock3 className="h-4 w-4" aria-label="Duration" /></span>
                                        <span role="columnheader"><span className="sr-only">Actions</span></span>
                                    </div>
                                    <div role="rowgroup" className="py-2">
                                        {playlist.tracks.length === 0 ? (
                                            <div className="flex flex-col items-center px-3 py-14 text-center">
                                                <span className="grid h-12 w-12 place-items-center rounded-full bg-gray-200"><ListMusic className="h-5 w-5 text-gray-900" /></span>
                                                <p className="mt-3 text-[15px] font-medium">Let's find something for your playlist</p>
                                                <p className="mt-1 text-sm text-gray-900">Search for songs, then use “Add to playlist” from any track's menu.</p>
                                                <Button variant="soft" className="mt-4" onClick={() => setPaletteOpen(true)}><Search className="h-4 w-4" /> Find songs</Button>
                                            </div>
                                        ) : null}
                                        {playlist.tracks.length > 0 && visibleTracks.length === 0 ? (
                                            <p className="px-3 py-10 text-center text-sm text-gray-900">No songs match “{filter}”.</p>
                                        ) : null}
                                        {visibleTracks.map((item) => {
                                            const isCurrent = current.playlistId === playlistId && current.index === item.index
                                            return (
                                                <div
                                                    key={item.id}
                                                    role="row"
                                                    aria-selected={isCurrent}
                                                    onDoubleClick={() => playTrack(item.index)}
                                                    className={`group grid grid-cols-[2rem_minmax(0,1fr)_4.5rem_2.5rem] items-center gap-3 rounded-md px-3 py-2 transition-colors lg:grid-cols-[2rem_minmax(0,1.4fr)_minmax(0,1fr)_4.5rem_2.5rem] ${isCurrent ? "bg-gray-200" : "hover:bg-gray-100"}`}
                                                >
                                                    <span role="cell" className="grid place-items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => playTrack(item.index)}
                                                            aria-label={isCurrent && playing ? `Pause ${item.title}` : `Play ${item.title}`}
                                                            className="grid h-7 w-7 place-items-center rounded text-sm tabular-nums text-gray-900"
                                                        >
                                                            {isCurrent && playing ? (
                                                                <>
                                                                    <span className="group-hover:hidden"><Equalizer /></span>
                                                                    <Pause className="hidden h-4 w-4 fill-current text-gray-1000 group-hover:block" />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className={`group-hover:hidden ${isCurrent ? "text-green-900" : ""}`}>{item.index + 1}</span>
                                                                    <Play className="hidden h-4 w-4 fill-current text-gray-1000 group-hover:block" />
                                                                </>
                                                            )}
                                                        </button>
                                                    </span>
                                                    <span role="cell" className="flex min-w-0 items-center gap-3">
                                                        <img src={item.cover} alt="" className="h-10 w-10 shrink-0 rounded object-cover" />
                                                        <span className="min-w-0">
                                                            <span className={`block truncate text-[15px] font-medium ${isCurrent ? "text-green-900" : ""}`}>{item.title}</span>
                                                            <div className="truncate text-sm text-gray-900">
                                                                <ArtistHoverCard name={item.artist} following={following.has(item.artist)} onToggleFollow={() => toggleFollow(item.artist)} />
                                                            </div>
                                                        </span>
                                                    </span>
                                                    <span role="cell" className="hidden truncate text-sm text-gray-900 lg:block">{item.album}</span>
                                                    <span role="cell" className="flex items-center justify-end gap-1">
                                                        <button
                                                            type="button"
                                                            aria-pressed={liked.has(item.id)}
                                                            aria-label={liked.has(item.id) ? `Unlike ${item.title}` : `Like ${item.title}`}
                                                            onClick={() => toggleLike(item)}
                                                            className={`grid h-7 w-7 place-items-center rounded transition-opacity ${liked.has(item.id) ? "text-green-900" : "text-gray-900 opacity-0 hover:text-gray-1000 focus-visible:opacity-100 group-hover:opacity-100"}`}
                                                        >
                                                            <Heart className={`h-4 w-4 ${liked.has(item.id) ? "fill-current" : ""}`} />
                                                        </button>
                                                        <span className="w-9 text-right text-sm tabular-nums text-gray-900">{formatTime(item.duration)}</span>
                                                    </span>
                                                    <span role="cell" className="grid place-items-center">
                                                        <DropdownMenu.Root>
                                                            <DropdownMenu.Trigger aria-label={`More options for ${item.title}`} className="min-h-0! border-0! bg-transparent! p-0! shadow-none! grid h-7 w-7 place-items-center rounded text-gray-900 opacity-0 transition-opacity hover:text-gray-1000 focus-visible:opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </DropdownMenu.Trigger>
                                                            <DropdownMenu.Content>
                                                                <DropdownMenu.Item label="Add to queue" onSelect={() => { addToQueue([{ playlistId, index: item.index }]); notify("Added to queue", item.title) }}>
                                                                    <ListPlus className="h-4 w-4" /> Add to queue
                                                                </DropdownMenu.Item>
                                                                {userPlaylists.filter((entry) => entry.id !== playlistId).map((entry) => (
                                                                    <DropdownMenu.Item key={entry.id} label={`Add to ${entry.name}`} onSelect={() => addTrackToPlaylist(entry.id, item)}>
                                                                        <Plus className="h-4 w-4" /> Add to {entry.name}
                                                                    </DropdownMenu.Item>
                                                                ))}
                                                                <DropdownMenu.Item label={liked.has(item.id) ? "Remove from Liked Songs" : "Save to Liked Songs"} onSelect={() => toggleLike(item)}>
                                                                    <Heart className="h-4 w-4" /> {liked.has(item.id) ? "Remove from Liked Songs" : "Save to Liked Songs"}
                                                                </DropdownMenu.Item>
                                                                <DropdownMenu.Separator />
                                                                <DropdownMenu.Item label="Share" onSelect={() => notify("Link copied", `soundwave.fm/track/${item.id}`)}>
                                                                    <Share2 className="h-4 w-4" /> Share
                                                                </DropdownMenu.Item>
                                                            </DropdownMenu.Content>
                                                        </DropdownMenu.Root>
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Tabs.Content>

                            {/* Albums */}
                            <Tabs.Content value="albums" className="border-0! bg-transparent! p-0! shadow-none!">
                                {albums.length ? (
                                    <>
                                        <p className="px-3 pb-3 text-sm text-gray-900">Right-click an album for more options.</p>
                                        <ul className="grid grid-cols-2 gap-5 px-3 pb-8 sm:grid-cols-3 lg:grid-cols-4">
                                            {albums.map((album) => (
                                                <li key={album.name}>
                                                    <ContextMenu.Root>
                                                        <ContextMenu.Trigger className="group block rounded-lg outline-none">
                                                            <span className="relative block overflow-hidden rounded-lg shadow-md">
                                                                <img src={album.cover} alt="" className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                                            </span>
                                                            <span className="mt-2 block truncate text-sm font-medium">{album.name}</span>
                                                            <span className="block truncate text-xs text-gray-900">{album.artist} · {album.indexes.length} {album.indexes.length === 1 ? "song" : "songs"}</span>
                                                        </ContextMenu.Trigger>
                                                        <ContextMenu.Content>
                                                            <ContextMenu.Item label="Play album" onSelect={() => { startAt({ playlistId, index: album.firstIndex }); addToQueue(album.indexes.slice(1).map((index) => ({ playlistId, index }))) }}>
                                                                <Play className="h-4 w-4" /> Play album
                                                            </ContextMenu.Item>
                                                            <ContextMenu.Item label="Add to queue" onSelect={() => { addToQueue(album.indexes.map((index) => ({ playlistId, index }))); notify("Album added to queue", album.name) }}>
                                                                <ListPlus className="h-4 w-4" /> Add to queue
                                                            </ContextMenu.Item>
                                                            <ContextMenu.Item label="Copy link" onSelect={() => notify("Link copied", `soundwave.fm/album/${album.name.toLowerCase().replace(/\s+/g, "-")}`)}>
                                                                <Share2 className="h-4 w-4" /> Copy link
                                                            </ContextMenu.Item>
                                                        </ContextMenu.Content>
                                                    </ContextMenu.Root>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <p className="px-3 py-10 text-center text-sm text-gray-900">No albums yet.</p>
                                )}
                            </Tabs.Content>

                            {/* About */}
                            <Tabs.Content value="about" className="border-0! bg-transparent! p-0! shadow-none!">
                                <div className="max-w-2xl px-3 pb-8">
                                    <p className="text-[15px] leading-relaxed text-gray-1000">{playlist.description}</p>
                                    {playlist.genres.length ? (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {playlist.genres.map((genre) => <Badge key={genre} variant="soft">{genre}</Badge>)}
                                        </div>
                                    ) : null}
                                    <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                                        {[["Songs", playlist.tracks.length], ["Runtime", `${Math.round(totalTime / 60)} min`], ["Followers", playlist.followers]].map(([label, value]) => (
                                            <div key={label} className="rounded-lg bg-gray-100 p-4">
                                                <dt className="text-xs text-gray-900">{label}</dt>
                                                <dd className="mt-1 text-xl font-semibold tabular-nums">{value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                    <p className="mt-6 text-sm font-medium">Artists in this playlist</p>
                                    <div className="mt-3 flex flex-wrap gap-4">
                                        {[...new Set(playlist.tracks.map((item) => item.artist))].map((name) => (
                                            <div key={name} className="flex items-center gap-2.5">
                                                <Avatar.Root>
                                                    <Avatar.Image src={artists[name].photo} alt={name} />
                                                    <Avatar.Fallback>{name.slice(0, 2)}</Avatar.Fallback>
                                                </Avatar.Root>
                                                <div className="text-sm"><ArtistHoverCard name={name} following={following.has(name)} onToggleFollow={() => toggleFollow(name)} /></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Tabs.Content>
                        </Tabs.Root>
                    </div>
                </main>

                {/* ------------------------------------------------------ queue */}
                {showQueue ? (
                    <aside aria-label="Now playing and queue" className="hidden min-h-0 flex-col overflow-y-auto border-l border-gray-400 bg-gray-100 p-5 xl:flex">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold">Now playing</p>
                            <IconButton label="Hide queue" onClick={() => setShowQueue(false)}><X className="h-4 w-4" /></IconButton>
                        </div>
                        <img
                            src={track.cover}
                            alt={`${track.title} artwork`}
                            className={`mt-3 aspect-square w-full rounded-xl object-cover shadow-xl transition-transform duration-500 ${playing ? "scale-100" : "scale-[0.96]"}`}
                        />
                        <div className="mt-4 flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="truncate text-xl font-bold tracking-tight">{track.title}</p>
                                <div className="truncate text-sm text-gray-900">
                                    <ArtistHoverCard name={track.artist} following={following.has(track.artist)} onToggleFollow={() => toggleFollow(track.artist)} /> · {track.album}
                                </div>
                            </div>
                            <IconButton label={liked.has(track.id) ? "Remove from Liked Songs" : "Save to Liked Songs"} active={liked.has(track.id)} onClick={() => toggleLike(track)}>
                                <Heart className={`h-5 w-5 ${liked.has(track.id) ? "fill-current" : ""}`} />
                            </IconButton>
                        </div>

                        {queued.length ? (
                            <>
                                <div className="mt-6 flex items-center justify-between">
                                    <p className="text-sm font-semibold">Next in queue</p>
                                    <Button variant="ghost" size="small" onClick={() => setQueue([])}>Clear</Button>
                                </div>
                                <ol className="mt-1 space-y-0.5">
                                    {queued.map((item) => (
                                        <li key={item.key} className="flex items-center gap-3 rounded-md p-1.5">
                                            <img src={item.cover} alt="" className="h-10 w-10 shrink-0 rounded object-cover" />
                                            <span className="min-w-0 flex-1">
                                                <span className="block truncate text-sm font-medium">{item.title}</span>
                                                <span className="block truncate text-xs text-gray-900">{item.artist}</span>
                                            </span>
                                            <IconButton label="Remove from queue" onClick={() => setQueue((list) => list.filter((entry) => entry.key !== item.key))}><X className="h-3.5 w-3.5" /></IconButton>
                                        </li>
                                    ))}
                                </ol>
                                <Separator className="my-3" />
                            </>
                        ) : null}

                        <p className={`${queued.length ? "" : "mt-6"} text-sm font-semibold`}>Next from {nowPlaylist.name}</p>
                        <ol className="mt-2 space-y-0.5">
                            {upNextFromPlaylist.map((item) => (
                                <li key={`${item.playlistId}-${item.index}`}>
                                    <button
                                        type="button"
                                        onClick={() => startAt({ playlistId: item.playlistId, index: item.index })}
                                        className="flex w-full items-center gap-3 rounded-md p-1.5 text-left transition-colors hover:bg-gray-200"
                                    >
                                        <img src={item.cover} alt="" className="h-10 w-10 shrink-0 rounded object-cover" />
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate text-sm font-medium">{item.title}</span>
                                            <span className="block truncate text-xs text-gray-900">{item.artist}</span>
                                        </span>
                                        <span className="text-xs tabular-nums text-gray-900">{formatTime(item.duration)}</span>
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </aside>
                ) : null}
            </div>

            {/* ------------------------------------------------------- player */}
            <footer aria-label="Now playing" className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-gray-400 bg-gray-100 px-4 py-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)]">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gray-400 md:hidden" aria-hidden="true">
                    <div className="h-full bg-green-900 transition-[width] duration-1000 ease-linear" style={{ width: `${progress}%` }} />
                </div>

                <div className="flex min-w-0 items-center gap-3">
                    <img src={track.cover} alt="" className="h-12 w-12 shrink-0 rounded object-cover shadow-sm" />
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{track.title}</p>
                        <p className="truncate text-xs text-gray-900">{track.artist}</p>
                    </div>
                    <IconButton label={liked.has(track.id) ? "Remove from Liked Songs" : "Save to Liked Songs"} active={liked.has(track.id)} onClick={() => toggleLike(track)}>
                        <Heart className={`h-4 w-4 ${liked.has(track.id) ? "fill-current" : ""}`} />
                    </IconButton>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <span className="hidden sm:block"><IconButton label={shuffle ? "Disable shuffle" : "Enable shuffle"} active={shuffle} onClick={() => setShuffle((value) => !value)}><Shuffle className="h-4 w-4" /></IconButton></span>
                        <IconButton label="Previous" onClick={() => (position > 3 ? setPosition(0) : step(-1))}><SkipBack className="h-4 w-4 fill-current" /></IconButton>
                        <Tooltip.Root>
                            <Tooltip.Trigger
                                aria-label={playing ? "Pause" : "Play"}
                                onClick={() => setPlaying((value) => !value)}
                                className="grid h-9 w-9 place-items-center rounded-full bg-gray-1000 text-gray-50 transition-transform hover:scale-105"
                            >
                                {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
                            </Tooltip.Trigger>
                            <Tooltip.Content><span className="flex items-center gap-2">{playing ? "Pause" : "Play"}<Kbd size="small">Space</Kbd></span></Tooltip.Content>
                        </Tooltip.Root>
                        <IconButton label="Next" onClick={() => step(1)}><SkipForward className="h-4 w-4 fill-current" /></IconButton>
                        <span className="hidden sm:block">
                            <IconButton
                                label={repeat === "off" ? "Enable repeat" : repeat === "all" ? "Repeat one" : "Disable repeat"}
                                active={repeat !== "off"}
                                onClick={() => setRepeat((value) => (value === "off" ? "all" : value === "all" ? "one" : "off"))}
                            >
                                {repeat === "one" ? <Repeat1 className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
                            </IconButton>
                        </span>
                    </div>
                    <div className="hidden w-full items-center gap-3 md:flex">
                        <span className="w-9 text-right text-xs tabular-nums text-gray-900">{formatTime(position)}</span>
                        <div className="sw-media-slider flex-1">
                            <Slider aria-label="Seek" min={0} max={track.duration} value={position} onValueChange={(value) => setPosition(Array.isArray(value) ? value[0] : value)} />
                        </div>
                        <span className="w-9 text-xs tabular-nums text-gray-900">{formatTime(track.duration)}</span>
                    </div>
                </div>

                <div className="hidden items-center justify-end gap-1 md:flex">
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <button type="button" aria-label="Sleep timer" className={`flex h-8 items-center gap-1.5 rounded-full px-2 text-xs font-medium transition-colors ${sleep !== "off" ? "text-green-900" : "text-gray-900 hover:text-gray-1000"}`}>
                                <Moon className="h-4 w-4" />
                                {sleep !== "off" ? (sleep === "end" ? "End" : `${sleep}m`) : null}
                            </button>
                        </Popover.Trigger>
                        <Popover.Content sideOffset={10}>
                            <div className="w-56">
                                <p className="text-sm font-semibold text-gray-1000">Sleep timer</p>
                                <p className="mt-0.5 text-xs text-gray-900">Pause playback automatically.</p>
                                <RadioGroup.Root value={sleep} onValueChange={(value) => { setSleep(value); if (value !== "off") notify("Sleep timer set", sleepOptions.find((option) => option.value === value).label) }} aria-label="Sleep timer" className="mt-3 flex flex-col gap-2.5">
                                    {sleepOptions.map((option) => (
                                        <RadioGroup.Label key={option.value} className="flex items-center gap-2.5 text-sm text-gray-1000">
                                            <RadioGroup.Item value={option.value}><RadioGroup.Indicator /></RadioGroup.Item>
                                            {option.label}
                                        </RadioGroup.Label>
                                    ))}
                                </RadioGroup.Root>
                            </div>
                        </Popover.Content>
                    </Popover.Root>
                    <span className="hidden xl:block">
                        <IconButton label={showQueue ? "Hide queue" : "Show queue"} active={showQueue} onClick={() => setShowQueue((value) => !value)}>
                            <ListMusic className="h-4 w-4" />
                        </IconButton>
                    </span>
                    <IconButton label={muted ? "Unmute" : "Mute"} onClick={() => setMuted((value) => !value)}><VolumeIcon className="h-4 w-4" /></IconButton>
                    <div className="sw-media-slider w-28">
                        <Slider aria-label="Volume" min={0} max={100} value={muted ? 0 : volume} onValueChange={(value) => { setMuted(false); setVolume(Array.isArray(value) ? value[0] : value) }} />
                    </div>
                </div>
            </footer>

            {/* ------------------------------------------------------ search */}
            <Command.Dialog open={paletteOpen} onOpenChange={setPaletteOpen}>
                <Command.Input placeholder="Search songs, artists, playlists…" />
                <Command.List>
                    <Command.Empty>No results found.</Command.Empty>
                    <Command.Group heading="Playlists">
                        {playlists.map((entry) => (
                            <Command.Item key={entry.id} value={`playlist ${entry.name}`} onSelect={() => { setPlaylistId(entry.id); setTab("songs"); setPaletteOpen(false) }}>
                                <span className="flex items-center gap-3">
                                    <img src={entry.cover} alt="" className="h-8 w-8 rounded object-cover" />
                                    <span>{entry.name}</span>
                                </span>
                            </Command.Item>
                        ))}
                    </Command.Group>
                    <Command.Group heading="Songs">
                        {allTracks.map((item) => (
                            <Command.Item
                                key={`${item.playlistId}-${item.id}`}
                                value={`${item.title} ${item.artist} ${item.album} ${item.playlistId}`}
                                onSelect={() => {
                                    if (findPlaylist(playlistId).owner === "You" && !findPlaylist(playlistId).tracks.length) addTrackToPlaylist(playlistId, item)
                                    startAt({ playlistId: item.playlistId, index: item.index })
                                    setPaletteOpen(false)
                                }}
                            >
                                <span className="flex min-w-0 items-center gap-3">
                                    <img src={item.cover} alt="" className="h-8 w-8 shrink-0 rounded object-cover" />
                                    <span className="min-w-0">
                                        <span className="block truncate">{item.title}</span>
                                        <span className="block truncate text-xs opacity-70">{item.artist}</span>
                                    </span>
                                </span>
                            </Command.Item>
                        ))}
                    </Command.Group>
                </Command.List>
            </Command.Dialog>

            {/* ------------------------------------------------ create playlist */}
            <Dialog.Root open={createOpen} onOpenChange={setCreateOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content>
                        <form onSubmit={createPlaylist}>
                            <Dialog.Title>Create playlist</Dialog.Title>
                            <Dialog.Description>Give it a name — you can add songs from search or any track's menu.</Dialog.Description>
                            <div className="mt-5 flex gap-4">
                                <span className="grid h-24 w-24 shrink-0 place-items-center rounded-lg bg-gray-200 text-gray-900"><Disc3 className="h-8 w-8" /></span>
                                <div className="min-w-0 flex-1 space-y-3">
                                    <label className="block">
                                        <span className="mb-1.5 block text-sm font-medium">Name</span>
                                        <TextField autoFocus placeholder="My playlist" value={draft.name} onChange={(event) => setDraft((value) => ({ ...value, name: event.target.value }))} />
                                    </label>
                                    <label className="block">
                                        <span className="mb-1.5 block text-sm font-medium">Description</span>
                                        <TextField placeholder="Optional" value={draft.description} onChange={(event) => setDraft((value) => ({ ...value, description: event.target.value }))} />
                                    </label>
                                </div>
                            </div>
                            <label className="mt-5 flex items-center justify-between gap-4 rounded-lg bg-gray-100 px-4 py-3">
                                <span>
                                    <span className="block text-sm font-medium">Public playlist</span>
                                    <span className="block text-xs text-gray-900">Show it on your profile and in search.</span>
                                </span>
                                <Switch.Root checked={draft.isPublic} onCheckedChange={(isPublic) => setDraft((value) => ({ ...value, isPublic }))} aria-label="Public playlist"><Switch.Thumb /></Switch.Root>
                            </label>
                            <div className="mt-6 flex justify-end gap-2">
                                <Button type="button" variant="soft" onClick={() => setCreateOpen(false)}>Cancel</Button>
                                <Button type="submit" disabled={!draft.name.trim()}>Create</Button>
                            </div>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* -------------------------------------------------------- toasts */}
            <Toast.Portal>
                <Toast.Viewport>
                    {toast.toasts.map((item) => (
                        <Toast.Root key={item.id} toast={item}>
                            <Toast.Content>
                                <Toast.Title>{item.title}</Toast.Title>
                                {item.description ? <Toast.Description>{item.description}</Toast.Description> : null}
                                <Toast.Close />
                            </Toast.Content>
                        </Toast.Root>
                    ))}
                </Toast.Viewport>
            </Toast.Portal>
        </div>
    )
}

const MusicAppDemo = () => {
    const toastManager = useMemo(() => createToastManager(), [])
    return (
        <Toast.Provider toastManager={toastManager} position="bottom-right" limit={3} timeout={3000}>
            <MusicApp />
        </Toast.Provider>
    )
}

export default MusicAppDemo
