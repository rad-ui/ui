const ColorBubble = ({ colorClass }) => {
  const size = 32
  return (
    <div
      className={`${colorClass} mr-0.5`}
      style={{ width: 100, height: size }}
    ></div>
  )
}

const colors = {
  gray: [
    'bg-gray-50',
    'bg-gray-100',
    'bg-gray-200',
    'bg-gray-300',
    'bg-gray-400',
    'bg-gray-500',
    'bg-gray-600',
    'bg-gray-700',
    'bg-gray-800',
    'bg-gray-900',
    'bg-gray-950',
    'bg-gray-1000'
  ],
  mauve: [
    'bg-mauve-50',
    'bg-mauve-100',
    'bg-mauve-200',
    'bg-mauve-300',
    'bg-mauve-400',
    'bg-mauve-500',
    'bg-mauve-600',
    'bg-mauve-700',
    'bg-mauve-800',
    'bg-mauve-900',
    'bg-mauve-950',
    'bg-mauve-1000'
  ],
  slate: [
    'bg-slate-50',
    'bg-slate-100',
    'bg-slate-200',
    'bg-slate-300',
    'bg-slate-400',
    'bg-slate-500',
    'bg-slate-600',
    'bg-slate-700',
    'bg-slate-800',
    'bg-slate-900',
    'bg-slate-950',
    'bg-slate-1000'
  ],
  olive: [
    'bg-olive-50',
    'bg-olive-100',
    'bg-olive-200',
    'bg-olive-300',
    'bg-olive-400',
    'bg-olive-500',
    'bg-olive-600',
    'bg-olive-700',
    'bg-olive-800',
    'bg-olive-900',
    'bg-olive-950',
    'bg-olive-1000'
  ],
  sand: [
    'bg-sand-50',
    'bg-sand-100',
    'bg-sand-200',
    'bg-sand-300',
    'bg-sand-400',
    'bg-sand-500',
    'bg-sand-600',
    'bg-sand-700',
    'bg-sand-800',
    'bg-sand-900',
    'bg-sand-950',
    'bg-sand-1000'
  ],
  tomato: [
    'bg-tomato-50',
    'bg-tomato-100',
    'bg-tomato-200',
    'bg-tomato-300',
    'bg-tomato-400',
    'bg-tomato-500',
    'bg-tomato-600',
    'bg-tomato-700',
    'bg-tomato-800',
    'bg-tomato-900',
    'bg-tomato-950',
    'bg-tomato-1000'
  ],
  red: [
    'bg-red-50',
    'bg-red-100',
    'bg-red-200',
    'bg-red-300',
    'bg-red-400',
    'bg-red-500',
    'bg-red-600',
    'bg-red-700',
    'bg-red-800',
    'bg-red-900',
    'bg-red-950',
    'bg-red-1000'
  ],
  ruby: [
    'bg-ruby-50',
    'bg-ruby-100',
    'bg-ruby-200',
    'bg-ruby-300',
    'bg-ruby-400',
    'bg-ruby-500',
    'bg-ruby-600',
    'bg-ruby-700',
    'bg-ruby-800',
    'bg-ruby-900',
    'bg-ruby-950',
    'bg-ruby-1000'
  ],
  crimson: [
    'bg-crimson-50',
    'bg-crimson-100',
    'bg-crimson-200',
    'bg-crimson-300',
    'bg-crimson-400',
    'bg-crimson-500',
    'bg-crimson-600',
    'bg-crimson-700',
    'bg-crimson-800',
    'bg-crimson-900',
    'bg-crimson-950',
    'bg-crimson-1000'
  ],
  pink: [
    'bg-pink-50',
    'bg-pink-100',
    'bg-pink-200',
    'bg-pink-300',
    'bg-pink-400',
    'bg-pink-500',
    'bg-pink-600',
    'bg-pink-700',
    'bg-pink-800',
    'bg-pink-900',
    'bg-pink-950',
    'bg-pink-1000'
  ],
  plum: [
    'bg-plum-50',
    'bg-plum-100',
    'bg-plum-200',
    'bg-plum-300',
    'bg-plum-400',
    'bg-plum-500',
    'bg-plum-600',
    'bg-plum-700',
    'bg-plum-800',
    'bg-plum-900',
    'bg-plum-950',
    'bg-plum-1000'
  ],
  purple: [
    'bg-purple-50',
    'bg-purple-100',
    'bg-purple-200',
    'bg-purple-300',
    'bg-purple-400',
    'bg-purple-500',
    'bg-purple-600',
    'bg-purple-700',
    'bg-purple-800',
    'bg-purple-900',
    'bg-purple-950',
    'bg-purple-1000'
  ],
  indigo: [
    'bg-indigo-50',
    'bg-indigo-100',
    'bg-indigo-200',
    'bg-indigo-300',
    'bg-indigo-400',
    'bg-indigo-500',
    'bg-indigo-600',
    'bg-indigo-700',
    'bg-indigo-800',
    'bg-indigo-900',
    'bg-indigo-950',
    'bg-indigo-1000'
  ],
  blue: [
    'bg-blue-50',
    'bg-blue-100',
    'bg-blue-200',
    'bg-blue-300',
    'bg-blue-400',
    'bg-blue-500',
    'bg-blue-600',
    'bg-blue-700',
    'bg-blue-800',
    'bg-blue-900',
    'bg-blue-950',
    'bg-blue-1000'
  ],
  cyan: [
    'bg-cyan-50',
    'bg-cyan-100',
    'bg-cyan-200',
    'bg-cyan-300',
    'bg-cyan-400',
    'bg-cyan-500',
    'bg-cyan-600',
    'bg-cyan-700',
    'bg-cyan-800',
    'bg-cyan-900',
    'bg-cyan-950',
    'bg-cyan-1000'
  ],
  teal: [
    'bg-teal-50',
    'bg-teal-100',
    'bg-teal-200',
    'bg-teal-300',
    'bg-teal-400',
    'bg-teal-500',
    'bg-teal-600',
    'bg-teal-700',
    'bg-teal-800',
    'bg-teal-900',
    'bg-teal-950',
    'bg-teal-1000'
  ],
  jade: [
    'bg-jade-50',
    'bg-jade-100',
    'bg-jade-200',
    'bg-jade-300',
    'bg-jade-400',
    'bg-jade-500',
    'bg-jade-600',
    'bg-jade-700',
    'bg-jade-800',
    'bg-jade-900',
    'bg-jade-950',
    'bg-jade-1000'
  ],
  green: [
    'bg-green-50',
    'bg-green-100',
    'bg-green-200',
    'bg-green-300',
    'bg-green-400',
    'bg-green-500',
    'bg-green-600',
    'bg-green-700',
    'bg-green-800',
    'bg-green-900',
    'bg-green-950',
    'bg-green-1000'
  ],
  grass: [
    'bg-grass-50',
    'bg-grass-100',
    'bg-grass-200',
    'bg-grass-300',
    'bg-grass-400',
    'bg-grass-500',
    'bg-grass-600',
    'bg-grass-700',
    'bg-grass-800',
    'bg-grass-900',
    'bg-grass-950',
    'bg-grass-1000'
  ],
  bronze: [
    'bg-bronze-50',
    'bg-bronze-100',
    'bg-bronze-200',
    'bg-bronze-300',
    'bg-bronze-400',
    'bg-bronze-500',
    'bg-bronze-600',
    'bg-bronze-700',
    'bg-bronze-800',
    'bg-bronze-900',
    'bg-bronze-950',
    'bg-bronze-1000'
  ],
  gold: [
    'bg-gold-50',
    'bg-gold-100',
    'bg-gold-200',
    'bg-gold-300',
    'bg-gold-400',
    'bg-gold-500',
    'bg-gold-600',
    'bg-gold-700',
    'bg-gold-800',
    'bg-gold-900',
    'bg-gold-950',
    'bg-gold-1000'
  ],
  brown: [
    'bg-brown-50',
    'bg-brown-100',
    'bg-brown-200',
    'bg-brown-300',
    'bg-brown-400',
    'bg-brown-500',
    'bg-brown-600',
    'bg-brown-700',
    'bg-brown-800',
    'bg-brown-900',
    'bg-brown-950',
    'bg-brown-1000'
  ],
  orange: [
    'bg-orange-50',
    'bg-orange-100',
    'bg-orange-200',
    'bg-orange-300',
    'bg-orange-400',
    'bg-orange-500',
    'bg-orange-600',
    'bg-orange-700',
    'bg-orange-800',
    'bg-orange-900',
    'bg-orange-950',
    'bg-orange-1000'
  ],
  amber: [
    'bg-amber-50',
    'bg-amber-100',
    'bg-amber-200',
    'bg-amber-300',
    'bg-amber-400',
    'bg-amber-500',
    'bg-amber-600',
    'bg-amber-700',
    'bg-amber-800',
    'bg-amber-900',
    'bg-amber-950',
    'bg-amber-1000'
  ],
  yellow: [
    'bg-yellow-50',
    'bg-yellow-100',
    'bg-yellow-200',
    'bg-yellow-300',
    'bg-yellow-400',
    'bg-yellow-500',
    'bg-yellow-600',
    'bg-yellow-700',
    'bg-yellow-800',
    'bg-yellow-900',
    'bg-yellow-950',
    'bg-yellow-1000'
  ],
  lime: [
    'bg-lime-50',
    'bg-lime-100',
    'bg-lime-200',
    'bg-lime-300',
    'bg-lime-400',
    'bg-lime-500',
    'bg-lime-600',
    'bg-lime-700',
    'bg-lime-800',
    'bg-lime-900',
    'bg-lime-950',
    'bg-lime-1000'
  ],
  mint: [
    'bg-mint-50',
    'bg-mint-100',
    'bg-mint-200',
    'bg-mint-300',
    'bg-mint-400',
    'bg-mint-500',
    'bg-mint-600',
    'bg-mint-700',
    'bg-mint-800',
    'bg-mint-900',
    'bg-mint-950',
    'bg-mint-1000'
  ],
  sky: [
    'bg-sky-50',
    'bg-sky-100',
    'bg-sky-200',
    'bg-sky-300',
    'bg-sky-400',
    'bg-sky-500',
    'bg-sky-600',
    'bg-sky-700',
    'bg-sky-800',
    'bg-sky-900',
    'bg-sky-950',
    'bg-sky-1000'
  ]
}

const ColorsTemplate = () => {
  return (
    <div className="p-4 space-y-0.5">
        
    {Object.entries(colors).map(([groupName, colorGroup], groupIndex)=>(
        <div key={groupIndex} className="flex">
            {colorGroup.map((colorClass, colorIndex)=>(
                <ColorBubble key={colorIndex} colorClass={colorClass}/>
            ))}
        </div>
      ))}
    </div>
  )
}

export default ColorsTemplate
