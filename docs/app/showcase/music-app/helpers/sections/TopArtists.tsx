import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"


const artistsData = [
    {
        name: 'Linkin Park',
        album: 'Hybrid Theory',
        image: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg',
        genre: 'Nu Metal',
        monthly: '32.4M'
    },
    {
        name: 'Three Days Grace',
        album: 'One-X',
        image: 'https://upload.wikimedia.org/wikipedia/en/2/28/Three_days_grace_pain.png',
        genre: 'Alt Rock',
        monthly: '14.8M'
    },
    {
        name: 'Deadset Society',
        album: 'Destroy + Rebuild',
        image: 'https://images.squarespace-cdn.com/content/v1/56720f37dc5cb4b9e2d7ae94/1567996721263-CQNAONU89XR9F032OLZM/image-asset.jpeg',
        genre: 'Hard Rock',
        monthly: '6.2M'
    },
    {
        name: 'Mike Shinoda',
        album: 'Post Traumatic',
        image: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Post_Traumatic_album.jpg',
        genre: 'Alt Hip-Hop',
        monthly: '8.9M'
    },
    {
        name: 'Breaking Benjamin',
        album: 'Phobia',
        image: 'https://upload.wikimedia.org/wikipedia/en/4/44/Phobia-Breaking_Benjamin_album.jpg',
        genre: 'Post-Grunge',
        monthly: '12.1M'
    },
    {
        name: 'Papa Roach',
        album: 'Infest',
        image: 'https://upload.wikimedia.org/wikipedia/en/4/48/Papa_Roach_Infest.jpg',
        genre: 'Hard Rock',
        monthly: '11.3M'
    },
    {
        name: 'Skillet',
        album: 'Awake',
        image: 'https://upload.wikimedia.org/wikipedia/en/9/95/Skilletawake2009albumart.jpg',
        genre: 'Christian Rock',
        monthly: '10.9M'
    },
    {
        name: 'Evanescence',
        album: 'Fallen',
        image: 'https://upload.wikimedia.org/wikipedia/en/2/25/Evanescence_-_Fallen.png',
        genre: 'Alt Metal',
        monthly: '20.5M'
    },
    {
        name: 'Red',
        album: 'End of Silence',
        image: 'https://upload.wikimedia.org/wikipedia/en/5/57/Endofsilence.png',
        genre: 'Symphonic Rock',
        monthly: '4.4M'
    },
    {
        name: 'Starset',
        album: 'Transmissions',
        image: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Starset_Transmissions.jpg',
        genre: 'Cinematic Rock',
        monthly: '9.1M'
    }
]

const quickQueue = [
    { title: "Bleed It Out", artist: "Linkin Park", length: "2:44" },
    { title: "Animal I Have Become", artist: "Three Days Grace", length: "3:51" },
    { title: "The Diary of Jane", artist: "Breaking Benjamin", length: "3:21" },
    { title: "Monster", artist: "Skillet", length: "2:58" }
]


const Artist: any = ({ artist, index }: any) => {
    return (
        <article className='group cursor-pointer overflow-hidden rounded-xl border border-gray-600 bg-linear-to-b from-gray-1000/[0.08] to-gray-1000/[0.03] p-1.5 hover:border-green-700/20 hover:bg-gray-1000/[0.08]'>
            <div className='relative overflow-hidden rounded-lg'>
                <img className='h-28 w-full object-cover' src={artist.image} alt={`${artist.name} album cover`} />
                <div className='absolute inset-x-0 top-0 flex items-center justify-between p-2'>
                    <span className='rounded-full bg-gray-1000/60 px-2.5 py-0.5 text-[11px] font-medium text-gray-50/90 backdrop-blur-xs'>#{index + 1}</span>
                    <span className='rounded-full border border-gray-600 bg-gray-1000/25 px-2.5 py-0.5 text-[11px] text-gray-50/90 backdrop-blur-xs'>{artist.genre}</span>
                </div>
                <div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-gray-1000/80 to-transparent p-2'>
                    <Text className='text-[10px]! uppercase tracking-[0.24em] text-gray-50/80'>Monthly listeners</Text>
                    <Text className='mt-0.5 text-[1.05rem]! font-semibold text-gray-50!'>{artist.monthly}</Text>
                </div>
            </div>
            <div className='px-1 pb-0.5 pt-2'>
                <Text className="text-[1rem]! font-semibold text-gray-1000!">{artist.name}</Text>
                <Text className="mt-0.5 text-[11px]! text-gray-1000/70">{artist.album}</Text>
            </div>
        </article>
    )
}

const TopArtists = () => {
    return (
        <section className='grid gap-3 xl:grid-cols-[minmax(0,1fr)_220px]'>
            <div>
                <div className='mb-3 space-y-1.5'>
                    <div>
                        <Text className='mb-1.5 uppercase tracking-[0.32em] text-[10px]! text-gray-1000/70'>Top Artists</Text>
                        <Heading as="h5" className="!text-gray-1000">Heavy rotation, redesigned.</Heading>
                    </div>
                    <Text className='max-w-2xl text-xs! text-gray-1000/70'>
                        Ten artists driving this month&apos;s rotation, ranked by total monthly listeners.
                    </Text>
                </div>
                <div className='grid gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
                    {artistsData.map((artist, index) => (
                        <Artist artist={artist} index={index} key={artist.name} />
                    ))}
                </div>
            </div>

            <aside className='rounded-xl border border-gray-600 bg-linear-to-b from-gray-1000/[0.08] to-gray-1000/[0.03] p-2.5'>
                <Text className='uppercase tracking-[0.32em] text-[10px]! text-gray-1000/70'>Tonight's Queue</Text>
                <Heading as="h6" className='mt-2 text-gray-1000!'>Momentum builders</Heading>
                <div className='mt-3 space-y-2'>
                    {quickQueue.map((track, index) => (
                        <div key={track.title} className='flex items-center justify-between rounded-lg border border-gray-600 bg-gray-1000/20 px-2.5 py-1.5'>
                            <div className='min-w-0 pr-3'>
                                <Text className='text-[10px]! uppercase tracking-[0.24em] text-gray-1000/70'>0{index + 1}</Text>
                                <Text className='mt-0.5 truncate text-sm! font-semibold text-gray-1000!'>{track.title}</Text>
                                <Text className='text-xs! text-gray-1000/70'>{track.artist}</Text>
                            </div>
                            <Text className='text-xs! text-gray-1000/70'>{track.length}</Text>
                        </div>
                    ))}
                </div>

                <div className='mt-3.5 rounded-lg border border-green-600/25 bg-linear-to-b from-green-500/20 via-green-900/5 to-gray-1000/10 p-3'>
                    <Text className='text-[10px]! uppercase tracking-[0.3em] text-gray-1000/70'>Session Lift</Text>
                    <Text className='mt-2.5 text-[1.65rem]! font-semibold text-gray-1000!'>+28%</Text>
                    <Text className='mt-1.5 text-xs! text-gray-1000/70'>
                        Listener growth across the rotation this week, up sharply after the new album drop.
                    </Text>
                </div>
            </aside>
        </section>
    )
}

export default TopArtists;
