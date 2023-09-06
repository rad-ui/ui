

const ColorBubble = ({ colorClass }) => {
  const size = 32;
  return (
    <div className={`${colorClass} mr-1`} style={{ width: 100, height: size }}>
    </div>
  )
}


const ColorsTemplate = () => {


  return <div>

    <div className={`p-4 space-y-1 `}>
      <div className='flex'>
        <ColorBubble colorClass='bg-gray-50' />
        <ColorBubble colorClass='bg-gray-100' />
        <ColorBubble colorClass='bg-gray-200' />
        <ColorBubble colorClass='bg-gray-300' />
        <ColorBubble colorClass='bg-gray-400' />
        <ColorBubble colorClass='bg-gray-500' />
        <ColorBubble colorClass='bg-gray-600' />
        <ColorBubble colorClass='bg-gray-700' />
        <ColorBubble colorClass='bg-gray-800' />
        <ColorBubble colorClass='bg-gray-900' />
        <ColorBubble colorClass='bg-gray-950' />
        <ColorBubble colorClass='bg-gray-1000' />
      </div>
      <div className='flex'>
        <ColorBubble colorClass='bg-mauve-50' />
        <ColorBubble colorClass='bg-mauve-100' />
        <ColorBubble colorClass='bg-mauve-200' />
        <ColorBubble colorClass='bg-mauve-300' />
        <ColorBubble colorClass='bg-mauve-400' />
        <ColorBubble colorClass='bg-mauve-500' />
        <ColorBubble colorClass='bg-mauve-600' />
        <ColorBubble colorClass='bg-mauve-700' />
        <ColorBubble colorClass='bg-mauve-800' />
        <ColorBubble colorClass='bg-mauve-900' />
        <ColorBubble colorClass='bg-mauve-950' />
        <ColorBubble colorClass='bg-mauve-1000' />
      </div>
      <div className='flex'>

        <ColorBubble colorClass='bg-slate-50' />
        <ColorBubble colorClass='bg-slate-100' />
        <ColorBubble colorClass='bg-slate-200' />
        <ColorBubble colorClass='bg-slate-300' />
        <ColorBubble colorClass='bg-slate-400' />
        <ColorBubble colorClass='bg-slate-500' />
        <ColorBubble colorClass='bg-slate-600' />
        <ColorBubble colorClass='bg-slate-700' />
        <ColorBubble colorClass='bg-slate-800' />
        <ColorBubble colorClass='bg-slate-900' />
        <ColorBubble colorClass='bg-slate-950' />
        <ColorBubble colorClass='bg-slate-1000' />

      </div>
      <div className='flex'>
        <ColorBubble colorClass='bg-sage-50' />
        <ColorBubble colorClass='bg-sage-100' />
        <ColorBubble colorClass='bg-sage-200' />
        <ColorBubble colorClass='bg-sage-300' />
        <ColorBubble colorClass='bg-sage-400' />
        <ColorBubble colorClass='bg-sage-500' />
        <ColorBubble colorClass='bg-sage-600' />
        <ColorBubble colorClass='bg-sage-700' />
        <ColorBubble colorClass='bg-sage-800' />
        <ColorBubble colorClass='bg-sage-900' />
        <ColorBubble colorClass='bg-sage-950' />
        <ColorBubble colorClass='bg-sage-1000' />
      </div>
      <div className='flex'>

        <ColorBubble colorClass='bg-olive-50' />
        <ColorBubble colorClass='bg-olive-100' />
        <ColorBubble colorClass='bg-olive-200' />
        <ColorBubble colorClass='bg-olive-300' />
        <ColorBubble colorClass='bg-olive-400' />
        <ColorBubble colorClass='bg-olive-500' />
        <ColorBubble colorClass='bg-olive-600' />
        <ColorBubble colorClass='bg-olive-700' />
        <ColorBubble colorClass='bg-olive-800' />
        <ColorBubble colorClass='bg-olive-900' />
        <ColorBubble colorClass='bg-olive-950' />
        <ColorBubble colorClass='bg-olive-1000' />
      </div>
      <div className='flex'>
        <ColorBubble colorClass='bg-sand-50' />
        <ColorBubble colorClass='bg-sand-100' />
        <ColorBubble colorClass='bg-sand-200' />
        <ColorBubble colorClass='bg-sand-300' />
        <ColorBubble colorClass='bg-sand-400' />
        <ColorBubble colorClass='bg-sand-500' />
        <ColorBubble colorClass='bg-sand-600' />
        <ColorBubble colorClass='bg-sand-700' />
        <ColorBubble colorClass='bg-sand-800' />
        <ColorBubble colorClass='bg-sand-900' />
        <ColorBubble colorClass='bg-sand-950' />
        <ColorBubble colorClass='bg-sand-1000' />
      </div>
    </div>
  </div>

}

export default ColorsTemplate