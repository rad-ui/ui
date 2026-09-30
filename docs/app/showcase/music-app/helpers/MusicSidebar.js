import HomeIcon from "@/icons/Home"
import RocketIcon from "@/icons/Rocket"
import DiscIcon from "@/icons/Disc"
import RowsIcon from "@/icons/Rows"

import SoundWaveSampleLogo from "@/icons/logos/SoundWaveSampleLogo"

import Text from "@radui/ui/Text"

const primaryItems = [
    { label: "Home", icon: <HomeIcon/>, active: true },
    { label: "Explore", icon: <RocketIcon/> },
    { label: "Genres", icon: <DiscIcon/> },
]

const playlists = [
    { label: "Neon Afterglow", tracks: "24 tracks" },
    { label: "Alt Rush", tracks: "18 tracks" },
    { label: "Night Drive", tracks: "31 tracks" },
]

const MenuItem = ({children, label="", active=false, meta=""}) => {
    const DIMENSIONS = 16;

    return <button type="button" className={`flex w-full items-center justify-between rounded-xl border px-2.5 py-1.5 text-left ${
        active
            ? 'border-green-700 bg-gray-1000 text-gray-50'
            : 'border-transparent bg-gray-1000/[0.03] text-gray-1000/70 hover:border-gray-700 hover:bg-gray-1000/[0.06] hover:text-gray-1000'
    }`}>
        <span className='flex items-center gap-3'>
            <span className={`flex items-center justify-center rounded-lg ${active ? 'bg-gray-50 text-gray-1000' : 'bg-gray-1000/5 text-gray-1000/70'}`} style={{width:24, height:24}}>
                <span className='flex-none' style={{width:DIMENSIONS, height:DIMENSIONS}}>{children}</span>
            </span>
            <span>
                <Text className={`${active ? 'font-semibold !text-[13px] !text-gray-50' : 'font-medium !text-[13px] text-current'}`}>{label}</Text>
                {meta ? <Text className={`${active ? 'text-gray-50/60' : 'text-gray-1000/60'} !text-[10px]`}>{meta}</Text> : null}
            </span>
        </span>
        <span className={`h-2 w-2 rounded-full ${active ? 'bg-green-800' : 'bg-gray-500'}`} />
    </button>
}

const MusicSidebar = () => {
   return <aside className='flex min-h-full flex-col border-b border-gray-600 bg-gray-200/70 p-2.5 backdrop-blur-xl lg:border-b-0 lg:border-r lg:border-gray-600 lg:p-3'>
                <div className='mb-4 flex items-center justify-between gap-2.5'>
                    <div className='text-gray-1000' style={{width:"70%"}}>
                        <SoundWaveSampleLogo/>
                    </div>
                    <div className='rounded-full border border-gray-600 bg-gray-1000/5 px-2 py-0.5'>
                        <Text className='!text-xs uppercase tracking-[0.25em] text-gray-1000/70'>Beta</Text>
                    </div>
                </div>

                <div className='space-y-1'>
                    {primaryItems.map((item) => (
                        <MenuItem key={item.label} label={item.label} active={item.active}>
                            {item.icon}
                        </MenuItem>
                    ))}
                </div>

                <div className='mt-4'>
                    <Text className='mb-1.5 uppercase tracking-[0.3em] text-gray-1000/70 !text-[9px]'>Your Playlists</Text>
                    <div className='space-y-1'>
                        {playlists.map((playlist) => (
                            <MenuItem key={playlist.label} label={playlist.label} meta={playlist.tracks}>
                                <RowsIcon/>
                            </MenuItem>
                        ))}
                    </div>
                </div>

                <div className='mt-5 rounded-xl border border-green-600/25 bg-gradient-to-b from-green-500/20 via-gray-1000/[0.03] to-gray-1000/[0.02] p-2.5'>
                    <Text className='!text-[10px] uppercase tracking-[0.3em] text-gray-1000/70'>Mood Capsule</Text>
                    <Text className='mt-2.5 !text-sm font-semibold !text-gray-1000'>Cinematic Rock</Text>
                    <Text className='mt-1.5 !text-xs text-gray-1000/70'>
                        Distorted guitars and glowing synth pads, tuned for late-night focus.
                    </Text>
                    <div className='mt-2.5 flex flex-wrap gap-1.5'>
                        {["High Energy", "Warm Tones", "Late Night"].map((tag) => (
                            <span key={tag} className='rounded-full border border-gray-600 bg-gray-1000/5 px-2.5 py-1 text-[11px] text-gray-1000/75'>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className='mt-auto pt-5'>
                    <div className='rounded-lg border border-gray-600 bg-gradient-to-b from-gray-1000/[0.04] to-gray-1000/[0.02] p-2.5'>
                        <Text className='!text-[10px] uppercase tracking-[0.3em] text-gray-1000/70'>For Tonight</Text>
                        <Text className='mt-2.5 !text-sm font-semibold !text-gray-1000'>17 new tracks</Text>
                        <Text className='mt-1 !text-xs text-gray-1000/70'>Fresh releases matched to your evening rotation.</Text>
                    </div>
                </div>
            </aside>
}

export default MusicSidebar;
