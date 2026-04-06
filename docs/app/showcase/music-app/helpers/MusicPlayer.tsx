"use client";

import React, { useState } from "react";

import Text from "@radui/ui/Text";
import TrackPreviousIcon from "@/icons/TrackPrevious"
import TrackNextIcon from "@/icons/TrackNext"
import PlayIcon from "@/icons/Play"

const ArtistBox: React.FC = () => {
    return <span className='flex items-center gap-3'>
        <img src="https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg" className='h-14 w-14 rounded-2xl border border-white/10 object-cover shadow-lg' alt="Hybrid Theory album cover" width={56} height={56} />
        <div>
            <Text className="font-semibold !text-white">Linkin Park</Text>
            <Text className="!text-xs text-white/50">Papercut • Hybrid Theory</Text>
        </div>
    </span>
}


const IconContainerSmall: any = ({ children }: any) => {
    return (
        <button className='flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white'>
            {children}
        </button>
    );
}

const PlayButton: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <button
            onClick={() => setIsPlaying((value) => !value)}
            className='mx-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-300 text-zinc-950 shadow-xl transition hover:scale-[1.03]'
        >
            {isPlaying ? <span className='flex gap-1.5'><span className='h-4 w-1 rounded-full bg-zinc-950'/><span className='h-4 w-1 rounded-full bg-zinc-950'/></span> : <div className='ml-0.5 h-5 w-5'><PlayIcon /></div>}
        </button>
    );
}

const ProgressBars: React.FC = () => {
    return <div className='flex items-center gap-1.5'>
        {Array.from({ length: 24 }).map((_, index) => (
            <span
                key={index}
                className={`w-1 rounded-full ${index < 15 ? 'bg-gradient-to-t from-orange-500 to-amber-300' : 'bg-white/12'}`}
                style={{ height: `${10 + (index % 5) * 5}px` }}
            />
        ))}
    </div>
}


const MusicPlayer: React.FC = () => {
    return (
        <div className='rounded-[28px] border border-white/10 bg-gradient-to-br from-stone-950 via-zinc-900 to-stone-900 px-4 py-4 text-white shadow-2xl backdrop-blur-xl sm:px-6'>
            <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
                <ArtistBox />
                <div className='flex items-center justify-center gap-4'>
                    <IconContainerSmall>
                        <TrackPreviousIcon />
                    </IconContainerSmall>
                    <PlayButton />
                    <IconContainerSmall>
                        <TrackNextIcon />
                    </IconContainerSmall>
                </div>
                <div className='flex flex-col gap-3 lg:min-w-[340px] lg:items-end'>
                    <div className='flex w-full items-center justify-between gap-4 lg:max-w-[340px]'>
                        <Text className='!text-xs uppercase tracking-[0.3em] text-white/35'>Live Waveform</Text>
                        <Text className='!text-xs text-white/45'>01:34 / 03:48</Text>
                    </div>
                    <div className='flex w-full items-center justify-between gap-4 lg:max-w-[340px]'>
                        <ProgressBars />
                        <div className='flex items-center gap-2 text-white/45'>
                            <span className='h-2 w-2 rounded-full bg-emerald-400 shadow-sm' />
                            <Text className='!text-xs'>Lossless</Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MusicPlayer;
