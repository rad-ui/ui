import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"


const artistsData = [
    {
        name: 'Linkin Park',
        album: 'Hybrid Theory',
        image: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg'
    },
    {
        name: 'Three Days Grace',
        album: 'One-X',
        image: 'https://upload.wikimedia.org/wikipedia/en/2/28/Three_days_grace_pain.png'
    },
    {
        name: 'Deadset Society',
        album: 'Destroy + Rebuild',
        image: 'https://images.squarespace-cdn.com/content/v1/56720f37dc5cb4b9e2d7ae94/1567996721263-CQNAONU89XR9F032OLZM/image-asset.jpeg'
    },
    {
        name: 'Mike Shinoda',
        album: 'Post Traumatic',
        image: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Post_Traumatic_album.jpg'
    },
    {
        name: 'Breaking Benjamin',
        album: 'Phobia',
        image: 'https://upload.wikimedia.org/wikipedia/en/4/44/Phobia-Breaking_Benjamin_album.jpg'
    },
    {
        name: 'Papa Roach',
        album: 'Infest',
        image: 'https://upload.wikimedia.org/wikipedia/en/4/48/Papa_Roach_Infest.jpg'
    },
    {
        name: 'Skillet',
        album: 'Awake',
        image: 'https://upload.wikimedia.org/wikipedia/en/9/95/Skilletawake2009albumart.jpg'
    },
    {
        name: 'Evanescence',
        album: 'Fallen',
        image: 'https://upload.wikimedia.org/wikipedia/en/2/25/Evanescence_-_Fallen.png'
    },
    {
        name: 'Red',
        album: 'End of Silence',
        image: 'https://upload.wikimedia.org/wikipedia/en/5/57/Endofsilence.png'
    },
    {
        name: 'Starset',
        album: 'Transmissions',
        image: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Starset_Transmissions.jpg'
    }
]


const Artist: any = ({ artist }: any) => {
    const DIMENSIONS = 160
    return (
        <div className='cursor-pointer'>
            <img style={{ width: DIMENSIONS, height: DIMENSIONS }} className='rounded-md shadow-sm border-2 border-gray-200' src={artist.image} alt='Album Cover' />
            <div>
                <Text className="!text-sm font-bold">{artist.name}</Text>
                <Text className="text-gray-900 !text-xs">{artist.album}</Text>
            </div>
        </div>
    )
}

const TopArtists = () => {
    return (
        <div>
            <Heading as="h6" className="mb-4">Top Artists</Heading>
            <div>
                <div className='flex flex-wrap gap-4'>
                    {
                        artistsData.map((artist, index) => (
                            <Artist artist={artist} key={index} />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default TopArtists;
