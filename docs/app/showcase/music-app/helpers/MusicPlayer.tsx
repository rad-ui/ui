"use client";

import React, { useState } from "react";

import Text from "@radui/ui/Text";
import TrackPreviousIcon from "@/icons/TrackPrevious"
import TrackNextIcon from "@/icons/TrackNext"
import PlayIcon from "@/icons/Play"

const ArtistBox: React.FC = () => {
    return <span className='flex items-center space-x-2'>
        <img src="https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg" className='rounded-md' alt="Avatar" width={48} />
        <div>
            <Text className="font-bold">Linkin Park</Text>
            <Text className="!text-xs text-gray-950">Hybrid Theory</Text>
        </div>
    </span>
}


const IconContainerSmall: any = ({ children }: any) => {
    return (
        <div className='text-gray-1000 hover:text-purple-900 cursor-pointer' style={{ height: 18, width: 18 }}>
            {children}
        </div>
    );
}

const PlayButton: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <div className='text-gray-1000 mx-2 border-2 border-gray-1000 rounded-full p-2 flex items-center justify-center hover:bg-purple-1000 hover:text-purple-50 hover:border-purple-1000 cursor-pointer' style={{ height: "48px", width: "48px" }}>
            <PlayIcon />
        </div>
    );
}


const MusicPlayer: React.FC = () => {
    return (
        <div className='text-black bg-gradient-to-l from-gray-400 to-gray-50 text-gray-1000 bottom-0 w-full px-4 py-4 left-0 shadow-xl border border-gray-500 backdrop-blur-sm'>
            <div className='flex items-center space-x-8'>
                <ArtistBox />
                <div className='text-black flex items-center space-x-4'>
                    <IconContainerSmall>
                        <TrackPreviousIcon />
                    </IconContainerSmall>
                    <PlayButton />
                    <IconContainerSmall>
                        <TrackNextIcon />
                    </IconContainerSmall>
                </div>
            </div>
        </div>
    );
}
export default MusicPlayer;
