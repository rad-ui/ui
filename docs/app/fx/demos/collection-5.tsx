'use client'
import { useState } from 'react'
import Button from '@radui/ui/Button'
import Rain from '@/registry/fx/rain'
import Snowfall from '@/registry/fx/snowfall'
import DriftClouds from '@/registry/fx/drift-clouds'
import Bokeh from '@/registry/fx/bokeh'
import RippleDrops from '@/registry/fx/ripple-drops'
import MeshGradient from '@/registry/fx/mesh-gradient'
import Sunburst from '@/registry/fx/sunburst'
import Vortex from '@/registry/fx/vortex'
import StripeFlow from '@/registry/fx/stripe-flow'
import Halftone from '@/registry/fx/halftone'
import HexGrid from '@/registry/fx/hex-grid'
import TileWave from '@/registry/fx/tile-wave'
import ContourLines from '@/registry/fx/contour-lines'
import Constellation from '@/registry/fx/constellation'
import OrbitSystem from '@/registry/fx/orbit-system'
import CodeRain from '@/registry/fx/code-rain'
import CircuitTraces from '@/registry/fx/circuit-traces'
import EqualizerBars from '@/registry/fx/equalizer-bars'
import WarpTunnel from '@/registry/fx/warp-tunnel'
import Hyperspace from '@/registry/fx/hyperspace'

// Every background demo sits on the same near-black canvas with light text, so
// the effects look as intended and the text keeps its contrast in both themes.
const scene = 'flex w-full self-stretch items-center justify-center px-8 py-28'
const dark = { background: '#04050a' }
const Title = ({ children }: { children: React.ReactNode }) => (
    <p className="text-center text-3xl font-semibold tracking-tight" style={{ color: '#f4f4f5' }}>{children}</p>
)

export const RainDemo = () => <Rain className={scene} style={dark}><Title>Stormy weather</Title></Rain>
export const SnowfallDemo = () => <Snowfall className={scene} style={dark}><Title>Let it snow</Title></Snowfall>
export const DriftCloudsDemo = () => <DriftClouds className={scene} style={{ background: 'linear-gradient(#0b1530, #04050a)' }}><Title>Head in the clouds</Title></DriftClouds>
export const BokehDemo = () => <Bokeh className={scene} style={dark}><Title>City lights</Title></Bokeh>
export const RippleDropsDemo = () => <RippleDrops className={scene} style={{ background: 'linear-gradient(#04101a, #04050a)' }}><Title>Still water</Title></RippleDrops>
export const MeshGradientDemo = () => <MeshGradient className={scene}><Title>Living colour</Title></MeshGradient>
export const SunburstDemo = () => <Sunburst className={scene} style={{ background: 'radial-gradient(circle, #2a1a05, #04050a 70%)' }}><Title>Golden hour</Title></Sunburst>
export const SunburstHorizonDemo = () => <Sunburst origin="50% 100%" className={scene} style={{ background: 'linear-gradient(#04050a, #2a1405)' }}><Title>Sunrise</Title></Sunburst>
export const VortexDemo = () => <Vortex className={scene} style={dark}><Title>Into the swirl</Title></Vortex>
export const StripeFlowDemo = () => <StripeFlow className={scene} style={dark}><Title>Under construction</Title></StripeFlow>
export const HalftoneDemo = () => <Halftone className={scene} style={dark}><Title>Print shop</Title></Halftone>
export const HexGridDemo = () => <HexGrid className={scene} style={dark}><Title>Hive mind</Title></HexGrid>
export const TileWaveDemo = () => <TileWave className={scene} style={dark}><Title>Make some waves</Title></TileWave>
export const ContourLinesDemo = () => <ContourLines className={scene} style={dark}><Title>Off the map</Title></ContourLines>
export const ConstellationDemo = () => <Constellation className={scene} style={dark}><Title>Connect the dots</Title></Constellation>
export const OrbitSystemDemo = () => (
    <OrbitSystem className={scene} style={dark}>
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold" style={{ background: '#facc15', color: '#1c1917', boxShadow: '0 0 40px #facc15' }}>FX</span>
    </OrbitSystem>
)
export const CodeRainDemo = () => <CodeRain className={scene} style={dark}><Title>Wake up</Title></CodeRain>
export const CircuitTracesDemo = () => <CircuitTraces className={scene} style={dark}><Title>Signal path</Title></CircuitTraces>
export const EqualizerBarsDemo = () => <EqualizerBars className={scene} style={dark}><Title>Turn it up</Title></EqualizerBars>

const PauseToggle = ({ paused, onToggle, label }: { paused: boolean, onToggle: () => void, label: string }) => (
    <Button variant="soft" color="gray" aria-pressed={paused} onClick={onToggle}>{paused ? `Play ${label}` : `Pause ${label}`}</Button>
)
export const WarpTunnelDemo = () => {
    const [paused, setPaused] = useState(false)
    return <WarpTunnel paused={paused} className={`${scene} flex-col gap-4`} style={dark}>
        <Title>Engage</Title>
        <PauseToggle paused={paused} onToggle={() => setPaused((p) => !p)} label="tunnel" />
    </WarpTunnel>
}
export const HyperspaceDemo = () => {
    const [paused, setPaused] = useState(false)
    return <Hyperspace paused={paused} className={`${scene} flex-col gap-4`} style={dark}>
        <Title>Punch it</Title>
        <PauseToggle paused={paused} onToggle={() => setPaused((p) => !p)} label="stars" />
    </Hyperspace>
}
