'use client'
import CountTo from '@/registry/fx/count-to'

const Stat = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="flex flex-col items-center gap-1">
        <span className="text-4xl font-semibold tracking-tight text-gray-1000">{children}</span>
        <span className="text-sm text-gray-950">{label}</span>
    </div>
)

export const CountToDemo = () => (
    <div className="grid grid-cols-1 gap-10 px-6 sm:grid-cols-3">
        <Stat label="Components"><CountTo to={66} /></Stat>
        <Stat label="Weekly installs"><CountTo to={12840} /></Stat>
        <Stat label="Saved per seat"><CountTo to={49.5} format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 1 }} /></Stat>
    </div>
)
