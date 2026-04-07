"use client"

import React from 'react';
import Button from "@radui/ui/Button";
import Heading from "@radui/ui/Heading";
import Text from "@radui/ui/Text";

import RightArrow from "@/icons/RightArrow";

const albumCovers = [
    {
        artist: "Linkin Park",
        src: "https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg",
        className: "left-0 top-10 -rotate-[14deg]"
    },
    {
        artist: "Three Days Grace",
        src: "https://upload.wikimedia.org/wikipedia/en/2/28/Three_days_grace_pain.png",
        className: "left-28 top-2 rotate-[8deg]"
    },
    {
        artist: "Deadset Society",
        src: "https://images.squarespace-cdn.com/content/v1/56720f37dc5cb4b9e2d7ae94/1567996721263-CQNAONU89XR9F032OLZM/image-asset.jpeg",
        className: "left-52 top-16 rotate-[18deg]"
    }
]

const featureStats = [
    { label: "Curated Tracks", value: "128" },
    { label: "Saved Hours", value: "42h" },
    { label: "New Drops", value: "16" }
]

const moodTags = ["Arena Alt", "Drive Time", "Midnight Lift"]

const InteractiveAlbums: any = () => {
    const [indexHovered, setIndexHovered] = React.useState<number | null>(null)

    return <div className='relative h-[238px] w-full'>
        <div className='absolute inset-0 rounded-[22px] border border-slate-500 bg-gradient-to-br from-slate-1000/10 via-slate-1000/5 to-slate-1000/5 backdrop-blur-sm' />
        <div className='absolute inset-0 rounded-[28px] bg-gradient-to-br from-slate-1000/[0.03] to-transparent' />
        <div className='absolute inset-x-0 bottom-0 h-20 rounded-b-[22px] bg-gradient-to-t from-slate-1000/80 via-slate-1000/40 to-transparent' />
        {albumCovers.map((album, index) => (
            <img
                key={album.artist}
                alt={album.artist}
                onMouseEnter={() => {
                    setIndexHovered(index)
                }}
                className={`absolute h-32 w-32 rounded-[18px] border border-slate-500 object-cover ${album.className} ${indexHovered === index ? 'z-20' : 'z-10'}`}
                src={album.src}
            />
        ))}
        <div className='absolute bottom-3 left-3 right-3 rounded-[16px] border border-slate-500 bg-slate-1000/45 p-2.5 backdrop-blur-md'>
            <Text className='!text-[10px] uppercase tracking-[0.3em] text-slate-900/75'>Selected vibe</Text>
            <Text className='mt-1.5 !text-sm font-semibold !text-slate-1000'>
                {indexHovered === null ? 'Hover an album to preview the mood.' : `${albumCovers[indexHovered].artist} is steering the blend.`}
            </Text>
        </div>
    </div>
}

const PlaylistHero: any = () => {
    const playlist = {
        title: 'The Summer Playlist',
        description: 'Punchy alt rock, polished electronics, and enough motion to make the whole demo feel alive.',
    }

    return (
        <section className='relative overflow-hidden rounded-[20px] border border-slate-500 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100 p-3 sm:p-4 lg:p-4'>
            <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_38%_30%,theme(colors.orange.400/.22),transparent_22%),radial-gradient(circle_at_82%_68%,theme(colors.amber.300/.12),transparent_28%)]' />
            <div className='pointer-events-none absolute inset-y-0 left-[42%] w-px bg-gradient-to-b from-transparent via-slate-1000/10 to-transparent' />
            <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-1000/5 to-transparent' />
            <div className='relative grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_320px] xl:items-center'>
                <div className="space-y-3">
                    <div className='flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between'>
                        <label className='group flex w-full max-w-sm items-center gap-2 rounded-full border border-slate-600 bg-slate-1000/[0.08] px-3 py-2 backdrop-blur-sm'>
                            <span className='h-2.5 w-2.5 rounded-full bg-amber-800' />
                            <input placeholder="Search artists, albums, moods..." className='w-full bg-transparent text-sm text-slate-1000 outline-none placeholder:text-slate-900' />
                        </label>
                        <div className='flex flex-wrap gap-1.5'>
                            {moodTags.map((tag) => (
                                <span key={tag} className='rounded-full border border-slate-500 bg-slate-1000/[0.04] px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-900/80'>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Text className='mb-2 uppercase tracking-[0.35em] !text-[10px] text-amber-900'>Featured Collection</Text>
                        <Heading as="h1" className="max-w-4xl text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.92] !text-slate-1000">
                            {playlist.title}
                        </Heading>
                        <Text as="h5" className="mt-3 max-w-2xl !text-base text-slate-1000/80">
                            {playlist.description}
                        </Text>
                    </div>

                    <div className='flex flex-col gap-2.5 sm:flex-row sm:items-center'>
                        <Button variant="solid" className="flex items-center justify-center gap-2 rounded-full border-0 bg-gradient-to-r from-amber-900 to-orange-800 px-4 py-2.5 !text-slate-1000">
                            <span>Play Now</span> <RightArrow />
                        </Button>
                        <div className='rounded-full border border-slate-500 bg-slate-1000/[0.03] px-3.5 py-2'>
                            <Text className='!text-xs text-slate-1000/75'>Updated 12 minutes ago for your evening rotation.</Text>
                        </div>
                    </div>

                    <div className='grid gap-2.5 sm:grid-cols-3'>
                        {featureStats.map((stat, index) => (
                            <div key={stat.label} className={`rounded-[18px] border p-3.5 backdrop-blur-sm ${
                                index === 2
                                    ? 'border-amber-700/30 bg-gradient-to-br from-amber-900/10 to-orange-800/10'
                                    : 'border-slate-500 bg-slate-1000/[0.04]'
                            }`}>
                                <Text className='!text-[10px] uppercase tracking-[0.28em] text-slate-900/75'>{stat.label}</Text>
                                <Text className='mt-2.5 !text-[1.65rem] font-semibold !text-slate-1000'>{stat.value}</Text>
                            </div>
                        ))}
                    </div>
                </div>

                <InteractiveAlbums />
            </div>
        </section>
    )
}

export default PlaylistHero;
