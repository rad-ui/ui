"use client"

import React from 'react';
import Button from "@radui/ui/Button";
import Heading from "@radui/ui/Heading";
import Text from "@radui/ui/Text";
import { Search } from "lucide-react";

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
        <div className='absolute inset-0 rounded-xl border border-gray-600 bg-gradient-to-br from-gray-1000/10 via-gray-1000/5 to-gray-1000/5 backdrop-blur-sm' />
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-1000/[0.03] to-transparent' />
        <div className='absolute inset-x-0 bottom-0 h-20 rounded-b-[22px] bg-gradient-to-t from-gray-1000/80 via-gray-1000/40 to-transparent' />
        {albumCovers.map((album, index) => (
            <img
                key={album.artist}
                alt={album.artist}
                onMouseEnter={() => {
                    setIndexHovered(index)
                }}
                className={`absolute h-32 w-32 rounded-xl border border-gray-600 object-cover ${album.className} ${indexHovered === index ? 'z-20' : 'z-10'}`}
                src={album.src}
            />
        ))}
        <div className='absolute bottom-3 left-3 right-3 rounded-lg border border-gray-600 bg-gray-1000/60 p-2.5 backdrop-blur-md'>
            <Text className='!text-[10px] uppercase tracking-[0.3em] text-gray-50/75'>Selected vibe</Text>
            <Text className='mt-1.5 !text-sm font-semibold !text-gray-50'>
                {indexHovered === null ? 'Hover an album to preview the mood.' : `${albumCovers[indexHovered].artist} is steering the blend.`}
            </Text>
        </div>
    </div>
}

const PlaylistHero: any = () => {
    const playlist = {
        title: 'The Summer Playlist',
        description: 'Punchy alt rock, polished electronics, and enough motion to keep the evening rolling.',
    }

    return (
        <section className='relative overflow-hidden rounded-xl border border-gray-600 bg-gray-50 p-3 sm:p-4 lg:p-4'>
            <div className='pointer-events-none absolute -left-12 -top-16 h-64 w-64 rounded-full bg-green-500/10 blur-3xl' />
            <div className='pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-green-300/10 blur-3xl' />
            <div className='pointer-events-none absolute inset-y-0 left-[42%] w-px bg-gradient-to-b from-transparent via-gray-1000/10 to-transparent' />
            <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-1000/5 to-transparent' />
            <div className='relative grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_320px] xl:items-center'>
                <div className="space-y-3">
                    <div className='flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between'>
                        <div className='flex w-full max-w-sm items-center gap-2 rounded-full border border-gray-600 bg-gray-1000/[0.08] px-3.5 py-2 backdrop-blur-sm transition-colors focus-within:border-green-700'>
                            <Search className='h-4 w-4 shrink-0 text-gray-1000/60' />
                            <input
                                type='search'
                                aria-label='Search artists, albums, moods'
                                placeholder='Search artists, albums, moods...'
                                className='w-full bg-transparent text-sm text-gray-1000 outline-none placeholder:text-gray-1000/60'
                            />
                        </div>
                        <div className='flex flex-wrap gap-1.5'>
                            {moodTags.map((tag) => (
                                <span key={tag} className='rounded-full border border-gray-600 bg-gray-1000/[0.04] px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-gray-1000/70'>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Text className='mb-2 uppercase tracking-[0.35em] !text-[10px] text-green-900'>Featured Collection</Text>
                        <Heading as="h1" className="max-w-4xl text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.92] !text-gray-1000">
                            {playlist.title}
                        </Heading>
                        <Text as="h5" className="mt-3 max-w-2xl !text-base text-gray-1000/80">
                            {playlist.description}
                        </Text>
                    </div>

                    <div className='flex flex-col gap-2.5 sm:flex-row sm:items-center'>
                        <Button variant="solid" className="flex items-center justify-center gap-2 rounded-full border-0 !bg-gray-1000 px-4 py-2.5 !text-gray-50">
                            <span>Play Now</span> <RightArrow />
                        </Button>
                        <div className='rounded-full border border-gray-600 bg-gray-1000/[0.03] px-3.5 py-2'>
                            <Text className='!text-xs text-gray-1000/75'>Updated 12 minutes ago for your evening rotation.</Text>
                        </div>
                    </div>

                    <div className='grid gap-2.5 sm:grid-cols-3'>
                        {featureStats.map((stat, index) => (
                            <div key={stat.label} className={`rounded-xl border p-3.5 backdrop-blur-sm ${
                                index === 2
                                    ? 'border-green-700/30 bg-gradient-to-br from-green-900/10 to-green-800/10'
                                    : 'border-gray-600 bg-gray-1000/[0.04]'
                            }`}>
                                <Text className='!text-[10px] uppercase tracking-[0.28em] text-gray-1000/70'>{stat.label}</Text>
                                <Text className='mt-2.5 !text-[1.65rem] font-semibold !text-gray-1000'>{stat.value}</Text>
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
