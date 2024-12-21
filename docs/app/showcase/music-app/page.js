import MusicSidebar from './helpers/MusicSidebar'
import MusicPlayer from './helpers/MusicPlayer'


// sections
import TopArtists from './helpers/sections/TopArtists'
import PlaylistHero from './helpers/sections/PlaylistHero'
const MusicAppPage = () => {
    return <div >
        <div className='flex h-ful'>
            {/* Sidebar */}
            <MusicSidebar/>
            {/* Main Content */}
            <div className='flex-1'>
                <div>
                    <PlaylistHero/>
                    <div className='p-4'>
                        <TopArtists/>
                    </div>
                </div>
            </div>
        </div>

        <MusicPlayer/>
    </div>
}

export default MusicAppPage