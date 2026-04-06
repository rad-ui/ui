import MusicSidebar from './helpers/MusicSidebar'
import MusicPlayer from './helpers/MusicPlayer'

import TopArtists from './helpers/sections/TopArtists'
import PlaylistHero from './helpers/sections/PlaylistHero'

const MusicAppPage = () => {
    return <div className='relative min-h-[920px]'>
        <div className='grid min-h-[920px] lg:grid-cols-[280px_minmax(0,1fr)]'>
            <MusicSidebar/>
            <main className='min-w-0 p-4 pb-40 sm:p-6 sm:pb-44 lg:p-8 lg:pb-48'>
                <div className='space-y-8'>
                    <PlaylistHero/>
                    <TopArtists/>
                </div>
            </main>
        </div>

        <div className='absolute inset-x-0 bottom-0 p-4 pt-0 sm:p-6 sm:pt-0 lg:p-8 lg:pt-0'>
            <MusicPlayer/>
        </div>
    </div>
}

export default MusicAppPage
