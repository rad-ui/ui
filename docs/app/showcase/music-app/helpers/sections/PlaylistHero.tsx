"use client"

import React from 'react';
import Button from "@radui/ui/Button";
import Heading from "@radui/ui/Heading";
import Text from "@radui/ui/Text";
import Badge from "@radui/ui/Badge";

import RightArrow from "@/icons/RightArrow";


const InteractiveAlbums: any = () => {
    const [indexHovered, setIndexHovered] = React.useState<number | null>(null)


    return <>
        <img
            alt="Linkin Park"
            onMouseEnter={() => {
                setIndexHovered(0)
            }} className='absolute right-40 top-10 rotate-0 rounded-full' width="300" src="https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg" />
        <img
            alt="Three Days Grace"
            onMouseEnter={() => {
                setIndexHovered(1)
            }} className='absolute right-20 top-10 rotate-[45deg] rounded-full' width="300"
            src="https://upload.wikimedia.org/wikipedia/en/2/28/Three_days_grace_pain.png"
        />
        <img
            alt="Avenged Sevenfold"
            onMouseEnter={() => {
                setIndexHovered(2)
            }} className={`absolute right-0 top-10 rotate-[90deg] rounded-full `} width="300"
            src="https://images.squarespace-cdn.com/content/v1/56720f37dc5cb4b9e2d7ae94/1567996721263-CQNAONU89XR9F032OLZM/image-asset.jpeg" />

    </>
}

const PlaylistHero: any = () => {

    const playlist = {
        title: 'The Summer Playlist',
        description: 'The best of summer hits from this decade. Enjoy the sun and the music!',
        cover: 'https://via.placeholder.com/150'
    }

    const backgroundClasses = "bg-violet-700"
    const tailwindAnimatedClasses = `bg-gradient-to-r
    from-violet-50
    via-violet-500
    to-violet-600
    background-animate 
    hover:bg-purple-700
    `

    return (
        <div className={`flex items-center justify-between p-20 !pl-4 !pt-4  relative overflow-hidden ${tailwindAnimatedClasses}`}>

            <div className="gap-4 space-y-4">
                <div>
                    <div>
                        <input placeholder="Search..." className='flex flex-1 items-center px-2 rounded-md border border-gray-400 text-gray-950' />
                    </div>

                </div>
                <InteractiveAlbums />
                <div>
                    <Badge color="purple" className="mb-2" style={{ width: "130px", fontSize: "12px" }}>Party Collection</Badge>
                    <Heading as="h1" className="text-purple-950">{playlist.title}</Heading>
                    <Text as="h5" className="text-gray-1000 mb-4">{playlist.description}</Text>
                    <Button variant="solid" className="space-x-2"> <span>Play Now</span> <RightArrow /> </Button>
                </div>
            </div>

        </div>
    )
}

export default PlaylistHero;
