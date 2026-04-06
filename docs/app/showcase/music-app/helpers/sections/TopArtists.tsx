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
        <article className='group cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200/20 hover:bg-white/[0.08] hover:shadow-xl'>
            <div className='relative overflow-hidden rounded-[22px]'>
                <img className='h-52 w-full object-cover transition duration-500 group-hover:scale-105' src={artist.image} alt={`${artist.name} album cover`} />
                <div className='absolute inset-x-0 top-0 flex items-center justify-between p-3'>
                    <span className='rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm'>#{index + 1}</span>
                    <span className='rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70 backdrop-blur-sm'>{artist.genre}</span>
                </div>
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3'>
                    <Text className='!text-xs uppercase tracking-[0.24em] text-white/50'>Monthly listeners</Text>
                    <Text className='mt-1 font-semibold !text-white'>{artist.monthly}</Text>
                </div>
            </div>
            <div className='pt-4'>
                <Text className="!text-base font-semibold !text-white">{artist.name}</Text>
                <Text className="mt-1 !text-sm text-white/50">{artist.album}</Text>
            </div>
        </article>
    )
}

const TopArtists = () => {
    return (
        <section className='grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]'>
            <div>
                <div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
                    <div>
                        <Text className='mb-2 uppercase tracking-[0.32em] !text-[11px] text-white/35'>Top Artists</Text>
                        <Heading as="h4" className="!text-white">Heavy rotation, redesigned.</Heading>
                    </div>
                    <Text className='max-w-xl !text-sm text-white/55'>
                        Large-format cards, better spacing, and clearer metadata make the gallery feel premium instead of crowded.
                    </Text>
                </div>
                <div className='grid gap-4 sm:grid-cols-2 2xl:grid-cols-3'>
                    {artistsData.map((artist, index) => (
                        <Artist artist={artist} index={index} key={artist.name} />
                    ))}
                </div>
            </div>

            <aside className='rounded-[30px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5'>
                <Text className='uppercase tracking-[0.32em] !text-[11px] text-white/35'>Tonight's Queue</Text>
                <Heading as="h6" className='mt-3 !text-white'>Momentum builders</Heading>
                <div className='mt-5 space-y-3'>
                    {quickQueue.map((track, index) => (
                        <div key={track.title} className='flex items-center justify-between rounded-[22px] border border-white/10 bg-black/20 px-4 py-3'>
                            <div className='min-w-0 pr-3'>
                                <Text className='!text-xs uppercase tracking-[0.24em] text-white/35'>0{index + 1}</Text>
                                <Text className='mt-1 truncate font-semibold !text-white'>{track.title}</Text>
                                <Text className='!text-sm text-white/45'>{track.artist}</Text>
                            </div>
                            <Text className='!text-sm text-white/50'>{track.length}</Text>
                        </div>
                    ))}
                </div>

                <div className='mt-6 rounded-[24px] border border-orange-300/10 bg-gradient-to-b from-orange-500/15 via-orange-500/5 to-black/10 p-4'>
                    <Text className='!text-xs uppercase tracking-[0.3em] text-white/40'>Session Lift</Text>
                    <Text className='mt-3 text-3xl font-semibold !text-white'>+28%</Text>
                    <Text className='mt-2 !text-sm text-white/60'>
                        More visual depth and cleaner grouping make the demo feel like a product, not a placeholder.
                    </Text>
                </div>
            </aside>
        </section>
    )
}

export default TopArtists;
