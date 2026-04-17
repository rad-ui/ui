import MusicSidebar from './helpers/MusicSidebar'
import MusicPlayer from './helpers/MusicPlayer'

import TopArtists from './helpers/sections/TopArtists'
import PlaylistHero from './helpers/sections/PlaylistHero'

const MusicAppPage = () => {
    return <div className='relative min-h-[760px]'>
        <div className='grid min-h-[760px] lg:grid-cols-[216px_minmax(0,1fr)]'>
            <MusicSidebar/>
            <main className='min-w-0 p-2.5 pb-28 sm:p-3 sm:pb-32 lg:p-4 lg:pb-36'>
                <div className='space-y-4'>
                    <PlaylistHero/>
                    <TopArtists/>
                </div>
            </main>
        </div>

        <div className='absolute inset-x-0 bottom-0 p-2.5 pt-0 sm:p-3 sm:pt-0 lg:p-4 lg:pt-0'>
            <MusicPlayer/>
        </div>
    </div>
}

export default MusicAppPage
