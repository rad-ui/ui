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

    return <div className='relative h-[330px] w-full'>
        <div className='absolute inset-0 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-sm' />
        <div className='absolute inset-x-0 bottom-0 h-24 rounded-b-[28px] bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent' />
        {albumCovers.map((album, index) => (
            <img
                key={album.artist}
                alt={album.artist}
                onMouseEnter={() => {
                    setIndexHovered(index)
                }}
                className={`absolute h-48 w-48 rounded-[26px] border border-white/10 object-cover shadow-2xl transition-all duration-500 ${album.className} ${indexHovered === index ? 'z-20 scale-105 -translate-y-3' : 'z-10'}`}
                src={album.src}
            />
        ))}
        <div className='absolute bottom-5 left-5 right-5 rounded-[22px] border border-white/10 bg-black/35 p-4 backdrop-blur-md'>
            <Text className='!text-xs uppercase tracking-[0.3em] text-white/40'>Selected vibe</Text>
            <Text className='mt-2 font-semibold !text-white'>
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
        <section className='relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-stone-900 via-slate-900 to-zinc-950 p-5 shadow-2xl sm:p-6 lg:p-8'>
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-rose-500/15' />
            <div className='pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-orange-300/10 to-transparent' />
            <div className='relative grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_460px] xl:items-center'>
                <div className="space-y-6">
                    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                        <label className='group flex w-full max-w-md items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-sm'>
                            <span className='h-2.5 w-2.5 rounded-full bg-orange-500 shadow-lg' />
                            <input placeholder="Search artists, albums, moods..." className='w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35' />
                        </label>
                        <div className='flex flex-wrap gap-2'>
                            {moodTags.map((tag) => (
                                <span key={tag} className='rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/60'>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Text className='mb-3 uppercase tracking-[0.35em] !text-[11px] text-orange-300'>Featured Collection</Text>
                        <Heading as="h1" className="max-w-4xl text-[clamp(3rem,8vw,5.8rem)] leading-[0.92] !text-white">
                            {playlist.title}
                        </Heading>
                        <Text as="h5" className="mt-4 max-w-2xl text-white/68">
                            {playlist.description}
                        </Text>
                    </div>

                    <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                        <Button variant="solid" className="flex items-center justify-center gap-2 rounded-full border-0 bg-gradient-to-br from-orange-500 to-rose-400 px-6 py-4 !text-white shadow-xl">
                            <span>Play Now</span> <RightArrow />
                        </Button>
                        <div className='rounded-full border border-white/10 bg-white/[0.04] px-4 py-3'>
                            <Text className='!text-sm text-white/70'>Updated 12 minutes ago for your evening rotation.</Text>
                        </div>
                    </div>

                    <div className='grid gap-3 sm:grid-cols-3'>
                        {featureStats.map((stat) => (
                            <div key={stat.label} className='rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm'>
                                <Text className='!text-xs uppercase tracking-[0.28em] text-white/35'>{stat.label}</Text>
                                <Text className='mt-3 text-2xl font-semibold !text-white'>{stat.value}</Text>
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
