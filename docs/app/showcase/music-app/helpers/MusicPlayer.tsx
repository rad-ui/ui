"use client";

import React, { useState } from "react";

import Text from "@radui/ui/Text";
import Toggle from "@radui/ui/Toggle";
import Tooltip from "@radui/ui/Tooltip";
import TrackPreviousIcon from "@/icons/TrackPrevious"
import TrackNextIcon from "@/icons/TrackNext"
import PlayIcon from "@/icons/Play"

const ArtistBox: React.FC = () => {
    return <span className='flex items-center gap-3 min-w-0'>
        <img src="https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg" className='h-10 w-10 rounded-lg border border-gray-600 object-cover' alt="Hybrid Theory album cover" width={40} height={40} />
        <div className='min-w-0'>
            <Text className="truncate text-sm! font-semibold text-gray-1000!">Linkin Park</Text>
            <Text className="text-[11px]! text-gray-1000/70">Papercut • Hybrid Theory</Text>
        </div>
    </span>
}


const IconContainerSmall: any = ({ children, label }: any) => {
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <button
                    type="button"
                    aria-label={label}
                    className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-gray-1000/5 text-gray-1000/70 hover:border-gray-700 hover:bg-gray-1000/10 hover:text-gray-1000'
                >
                    <span className='flex h-[22px] w-[22px] items-center justify-center'>
                        {children}
                    </span>
                </button>
            </Tooltip.Trigger>
            <Tooltip.Content>{label}</Tooltip.Content>
        </Tooltip.Root>
    );
}

const PlayButton: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <Toggle
            color="green"
            pressed={isPlaying}
            onPressedChange={setIsPlaying}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className='mx-0.5 h-10! w-10! rounded-full! border-0! bg-gray-1000! p-0! text-gray-50! shadow-none!'
        >
            {isPlaying ? <span className='flex gap-1.5'><span className='h-4 w-1 rounded-full bg-gray-50'/><span className='h-4 w-1 rounded-full bg-gray-50'/></span> : <div className='ml-0.5 h-5 w-5'><PlayIcon /></div>}
        </Toggle>
    );
}

const ProgressBars: React.FC = () => {
    const bars = [5, 8, 12, 17, 23, 29, 35, 40, 34, 28, 22, 18, 15, 19, 24, 30, 36, 41, 38, 31, 25, 20, 16, 14, 18, 23, 28, 34, 39, 42, 37, 30]

    return <div className='flex h-11 items-end gap-[3px]'>
        {bars.map((height, index) => (
            <span
                key={index}
                className={`block rounded-full ${index < 21 ? 'bg-gray-1000/10' : 'bg-linear-to-t from-green-800 to-green-800'}`}
                style={{ width: '4px', height: `${height}px` }}
            />
        ))}
    </div>
}

const TrackProgress: React.FC = () => {
    return <div className='flex items-center gap-2.5'>
        <Text className='text-[11px]! text-gray-1000/70'>01:34</Text>
        <div className='relative h-2 flex-1 overflow-visible rounded-full bg-gray-1000/20'>
            <div className='absolute inset-y-0 left-0 w-[64%] rounded-full bg-gray-1000' />
            <div className='absolute inset-y-0 left-[64%] right-0 rounded-full bg-gray-700/30' />
            <div className='absolute left-[64%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-800 ring-2 ring-gray-50' />
        </div>
        <Text className='text-[11px]! text-gray-1000/70'>03:48</Text>
    </div>
}


const MusicPlayer: React.FC = () => {
    return (
        <div className='rounded-xl border border-gray-600 bg-gray-50 px-3 py-2.5 text-gray-1000 backdrop-blur-xl sm:px-4'>
            <div className='grid gap-2.5 lg:grid-cols-[minmax(0,1.3fr)_minmax(360px,0.95fr)] lg:items-center'>
                <div className='min-w-0 space-y-1.5'>
                    <div className='flex items-center gap-3'>
                        <ArtistBox />
                    </div>
                    <TrackProgress />
                </div>

                <div className='flex items-center gap-3 rounded-lg border border-gray-600 bg-gray-1000/[0.04] px-3 py-2'>
                    <div className='flex items-center gap-2.5 shrink-0'>
                        <IconContainerSmall label="Previous track">
                            <TrackPreviousIcon />
                        </IconContainerSmall>
                        <PlayButton />
                        <IconContainerSmall label="Next track">
                            <TrackNextIcon />
                        </IconContainerSmall>
                    </div>

                    <div className='min-w-0 flex-1'>
                        <Text className='text-[10px]! uppercase tracking-[0.28em] text-gray-1000/70'>Live Waveform</Text>
                        <div className='mt-1 flex items-center justify-between gap-5'>
                            <ProgressBars />
                            <Text className='shrink-0 text-[11px]! text-gray-1000/70'>03:48</Text>
                        </div>
                    </div>

                    <div className='shrink-0 flex items-center gap-2 text-gray-1000/70'>
                        <span className='h-2 w-2 rounded-full bg-green-400' />
                        <Text className='!text-[11px]'>Lossless</Text>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MusicPlayer;
