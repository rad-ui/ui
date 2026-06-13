"use client";

import React, { useState } from "react";

import Text from "@radui/ui/Text";
import TrackPreviousIcon from "@/icons/TrackPrevious"
import TrackNextIcon from "@/icons/TrackNext"
import PlayIcon from "@/icons/Play"

const ArtistBox: React.FC = () => {
    return <span className='flex items-center gap-3 min-w-0'>
        <img src="https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg" className='h-10 w-10 rounded-lg border border-slate-50/10 object-cover' alt="Hybrid Theory album cover" width={40} height={40} />
        <div className='min-w-0'>
            <Text className="truncate !text-sm font-semibold !text-slate-1000">Linkin Park</Text>
            <Text className="!text-[11px] text-slate-900/80">Papercut • Hybrid Theory</Text>
        </div>
    </span>
}


const IconContainerSmall: any = ({ children }: any) => {
    return (
        <button className='flex h-10 w-10 items-center justify-center rounded-full border border-slate-500 bg-slate-1000/5 text-slate-900 hover:border-slate-600 hover:bg-slate-1000/10 hover:text-slate-1000'>
            <span className='flex h-[22px] w-[22px] items-center justify-center'>
                {children}
            </span>
        </button>
    );
}

const PlayButton: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <button
            onClick={() => setIsPlaying((value) => !value)}
            className='mx-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-900 via-amber-800 to-orange-800 text-slate-50 shadow-xl'
        >
            {isPlaying ? <span className='flex gap-1.5'><span className='h-4 w-1 rounded-full bg-slate-50'/><span className='h-4 w-1 rounded-full bg-slate-50'/></span> : <div className='ml-0.5 h-5 w-5'><PlayIcon /></div>}
        </button>
    );
}

const ProgressBars: React.FC = () => {
    const bars = [5, 8, 12, 17, 23, 29, 35, 40, 34, 28, 22, 18, 15, 19, 24, 30, 36, 41, 38, 31, 25, 20, 16, 14, 18, 23, 28, 34, 39, 42, 37, 30]

    return <div className='flex h-11 items-end gap-[3px]'>
        {bars.map((height, index) => (
            <span
                key={index}
                className={`block rounded-full ${index < 21 ? 'bg-slate-1000/14' : 'bg-gradient-to-t from-orange-800 to-amber-800'}`}
                style={{ width: '4px', height: `${height}px` }}
            />
        ))}
    </div>
}

const TrackProgress: React.FC = () => {
    return <div className='flex items-center gap-2.5'>
        <Text className='!text-[11px] text-slate-900/70'>01:34</Text>
        <div className='relative h-2 flex-1 overflow-visible rounded-full bg-slate-1000/18'>
            <div className='absolute inset-y-0 left-0 w-[64%] rounded-full bg-gradient-to-r from-amber-900 to-orange-800' />
            <div className='absolute inset-y-0 left-[64%] right-0 rounded-full bg-slate-700/30' />
            <div className='absolute left-[64%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-50 bg-amber-800 ring-2 ring-slate-50/65' />
        </div>
        <Text className='!text-[11px] text-slate-900/70'>03:48</Text>
    </div>
}


const MusicPlayer: React.FC = () => {
    return (
        <div className='rounded-[18px] border border-slate-500 bg-gradient-to-r from-slate-50 via-mauve-50 to-slate-100 px-3 py-2.5 text-slate-1000 backdrop-blur-xl sm:px-4'>
            <div className='grid gap-2.5 lg:grid-cols-[minmax(0,1.3fr)_minmax(360px,0.95fr)] lg:items-center'>
                <div className='min-w-0 space-y-1.5'>
                    <div className='flex items-center gap-3'>
                        <ArtistBox />
                    </div>
                    <TrackProgress />
                </div>

                <div className='flex items-center gap-3 rounded-[16px] border border-slate-500 bg-slate-1000/[0.04] px-3 py-2'>
                    <div className='flex items-center gap-2.5 shrink-0'>
                        <IconContainerSmall>
                            <TrackPreviousIcon />
                        </IconContainerSmall>
                        <PlayButton />
                        <IconContainerSmall>
                            <TrackNextIcon />
                        </IconContainerSmall>
                    </div>

                    <div className='min-w-0 flex-1'>
                        <Text className='!text-[10px] uppercase tracking-[0.28em] text-slate-900/75'>Live Waveform</Text>
                        <div className='mt-1 flex items-center justify-between gap-5'>
                            <ProgressBars />
                            <Text className='shrink-0 !text-[11px] text-slate-900/70'>03:48</Text>
                        </div>
                    </div>

                    <div className='shrink-0 flex items-center gap-2 text-slate-900/70'>
                        <span className='h-2 w-2 rounded-full bg-emerald-400' />
                        <Text className='!text-[11px]'>Lossless</Text>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MusicPlayer;
