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

    return <button className={`flex w-full items-center justify-between rounded-xl border px-2.5 py-1.5 text-left ${
        active
            ? 'border-sand-800 bg-slate-1000 text-slate-50'
            : 'border-transparent bg-slate-1000/[0.03] text-slate-900 hover:border-slate-400 hover:bg-slate-1000/[0.06] hover:text-slate-1000'
    }`}>
        <span className='flex items-center gap-3'>
            <span className={`flex items-center justify-center rounded-lg ${active ? 'bg-slate-50 text-slate-1000' : 'bg-slate-1000/5 text-slate-900'}`} style={{width:24, height:24}}>
                <span className='flex-none' style={{width:DIMENSIONS, height:DIMENSIONS}}>{children}</span>
            </span>
            <span>
                <Text className={`${active ? 'font-semibold !text-[13px] !text-slate-50' : 'font-medium !text-[13px] text-current'}`}>{label}</Text>
                {meta ? <Text className={`${active ? 'text-slate-50/60' : 'text-slate-800'} !text-[10px]`}>{meta}</Text> : null}
            </span>
        </span>
        <span className={`h-2 w-2 rounded-full ${active ? 'bg-orange-800' : 'bg-slate-500'}`} />
    </button>
}

const MusicSidebar = () => {
   return <aside className='flex min-h-full flex-col border-b border-slate-500 bg-slate-200/70 p-2.5 backdrop-blur-xl lg:border-b-0 lg:border-r lg:border-slate-500 lg:p-3'>
                <div className='mb-4 flex items-center justify-between gap-2.5'>
                    <div className='text-slate-1000' style={{width:"70%"}}>
                        <SoundWaveSampleLogo/>
                    </div>
                    <div className='rounded-full border border-slate-500 bg-slate-1000/5 px-2 py-0.5'>
                        <Text className='!text-xs uppercase tracking-[0.25em] text-slate-900/75'>Beta</Text>
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
                    <Text className='mb-1.5 uppercase tracking-[0.3em] text-slate-900/80 !text-[9px]'>Your Playlists</Text>
                    <div className='space-y-1'>
                        {playlists.map((playlist) => (
                            <MenuItem key={playlist.label} label={playlist.label} meta={playlist.tracks}>
                                <RowsIcon/>
                            </MenuItem>
                        ))}
                    </div>
                </div>

                <div className='mt-5 rounded-[18px] border border-bronze-600/25 bg-gradient-to-b from-bronze-500/18 via-slate-1000/[0.03] to-slate-1000/[0.02] p-2.5'>
                    <Text className='!text-[10px] uppercase tracking-[0.3em] text-slate-900/75'>Mood Capsule</Text>
                    <Text className='mt-2.5 !text-sm font-semibold !text-slate-1000'>Cinematic Rock</Text>
                    <Text className='mt-1.5 !text-xs text-slate-900/80'>
                        Distorted guitars, glowing synth pads, and a cleaner visual rhythm across the layout.
                    </Text>
                    <div className='mt-2.5 flex flex-wrap gap-1.5'>
                        {["High Energy", "Warm Tones", "Late Night"].map((tag) => (
                            <span key={tag} className='rounded-full border border-slate-500 bg-slate-1000/5 px-2.5 py-1 text-[11px] text-slate-1000/75'>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className='mt-auto pt-5'>
                    <div className='rounded-[16px] border border-slate-500 bg-gradient-to-b from-slate-1000/[0.04] to-slate-1000/[0.02] p-2.5'>
                        <Text className='!text-[10px] uppercase tracking-[0.3em] text-slate-900/75'>For Tonight</Text>
                        <Text className='mt-2.5 !text-sm font-semibold !text-slate-1000'>17 new tracks</Text>
                        <Text className='mt-1 !text-xs text-slate-900/80'>Fresh releases selected for this demo state.</Text>
                    </div>
                </div>
            </aside>
}

export default MusicSidebar;
