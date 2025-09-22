import HomeIcon from "@/icons/Home"
import RocketIcon from "@/icons/Rocket"
import DiscIcon from "@/icons/Disc"
import RowsIcon from "@/icons/Rows"

import SoundWaveSampleLogo from "@/icons/logos/SoundWaveSampleLogo"

import Text from "@radui/ui/Text"
const MenuItem = ({children, label="", active=false}) => {
    const DIMENSIONS = 18;
    return <div className={`flex items-center space-x-2 cursor-pointer`}>
                <div className='flex items-center space-x-2'>
                    <div className='flex-none' style={{width:DIMENSIONS, height:DIMENSIONS}}>{children}</div>
                    <Text className={`${active?'!font-medium text-gray-1000':'font-light text-gray-1000 hover:text-gray-1000 !hover:font-medium'}`}>{label}</Text>
                </div>
        </div>
}

const MusicSidebar = () => {
   return <div className='bg-gray-50 border flex-none p-4' style={{width:"220px"}}>
                <div className='mb-4 text-gray-1000' style={{width:"70%"}}>
                    <SoundWaveSampleLogo/>
                </div>
                <div className='space-y-2'>
                    <MenuItem label="Home" active={true}><HomeIcon/></MenuItem>
                    <MenuItem label="Explore" ><RocketIcon/></MenuItem>
                    <MenuItem label="Genres"> <DiscIcon/></MenuItem>
                </div>

                <div>
                    <Text className='mb-2 mt-6 uppercase text-gray-950 font-light !text-sm'>Your Playlists</Text>
                    <div className='space-y-2'>
                         <MenuItem label="My Repeats"> <RowsIcon/></MenuItem>
                         <MenuItem label="Top 50 Classic"> <RowsIcon/></MenuItem>
                        <MenuItem label="1992-2002 Rock"> <RowsIcon/></MenuItem>
                    </div>
                </div>
            </div>
}

export default MusicSidebar;