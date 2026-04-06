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
    const DIMENSIONS = 18;

    return <button className={`flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left transition-all duration-300 ${
        active
            ? 'border-white/15 bg-white text-zinc-950 shadow-xl'
            : 'border-white/0 bg-white/[0.03] text-white/70 hover:border-white/10 hover:bg-white/[0.06] hover:text-white'
    }`}>
        <span className='flex items-center gap-3'>
            <span className={`flex items-center justify-center rounded-xl ${active ? 'bg-zinc-950 text-white' : 'bg-white/5 text-white/75'}`} style={{width:36, height:36}}>
                <span className='flex-none' style={{width:DIMENSIONS, height:DIMENSIONS}}>{children}</span>
            </span>
            <span>
                <Text className={`${active ? 'font-semibold !text-zinc-950' : 'font-medium text-current'}`}>{label}</Text>
                {meta ? <Text className={`${active ? 'text-zinc-950/60' : 'text-white/40'} !text-xs`}>{meta}</Text> : null}
            </span>
        </span>
        <span className={`h-2.5 w-2.5 rounded-full ${active ? 'bg-orange-500' : 'bg-white/10'}`} />
    </button>
}

const MusicSidebar = () => {
   return <aside className='flex min-h-full flex-col border-b border-white/10 bg-black/20 p-4 backdrop-blur-xl lg:border-b-0 lg:border-r lg:border-white/10 lg:p-6'>
                <div className='mb-8 flex items-center justify-between gap-4'>
                    <div className='text-white' style={{width:"70%"}}>
                        <SoundWaveSampleLogo/>
                    </div>
                    <div className='rounded-full border border-white/10 bg-white/5 px-3 py-1'>
                        <Text className='!text-xs uppercase tracking-[0.25em] text-white/45'>Beta</Text>
                    </div>
                </div>

                <div className='space-y-2'>
                    {primaryItems.map((item) => (
                        <MenuItem key={item.label} label={item.label} active={item.active}>
                            {item.icon}
                        </MenuItem>
                    ))}
                </div>

                <div className='mt-8'>
                    <Text className='mb-3 uppercase tracking-[0.3em] text-white/35 !text-[11px]'>Your Playlists</Text>
                    <div className='space-y-2'>
                        {playlists.map((playlist) => (
                            <MenuItem key={playlist.label} label={playlist.label} meta={playlist.tracks}>
                                <RowsIcon/>
                            </MenuItem>
                        ))}
                    </div>
                </div>

                <div className='mt-8 rounded-[28px] border border-white/10 bg-gradient-to-b from-orange-500/15 to-white/5 p-4'>
                    <Text className='!text-xs uppercase tracking-[0.3em] text-white/40'>Mood Capsule</Text>
                    <Text className='mt-3 font-semibold !text-white'>Cinematic Rock</Text>
                    <Text className='mt-2 !text-sm text-white/60'>
                        Distorted guitars, glowing synth pads, and a cleaner visual rhythm across the layout.
                    </Text>
                    <div className='mt-4 flex flex-wrap gap-2'>
                        {["High Energy", "Warm Tones", "Late Night"].map((tag) => (
                            <span key={tag} className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70'>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className='mt-auto pt-8'>
                    <div className='rounded-[24px] border border-white/10 bg-white/[0.03] p-4'>
                        <Text className='!text-xs uppercase tracking-[0.3em] text-white/35'>For Tonight</Text>
                        <Text className='mt-3 font-semibold !text-white'>17 new tracks</Text>
                        <Text className='mt-1 !text-sm text-white/55'>Fresh releases selected for this demo state.</Text>
                    </div>
                </div>
            </aside>
}

export default MusicSidebar;
