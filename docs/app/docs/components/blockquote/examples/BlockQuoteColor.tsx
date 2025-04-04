import BlockQuote from '@radui/ui/BlockQuote';


const BlockQuoteColor = () => {
    const sizes = ['small', 'medium', 'large', 'x-large'];
    return <div className='flex flex-col gap-4'>
                {sizes.map((size, index) => {
                    return <BlockQuote key={index} size={size} color='pink'>
                        <span className='text-gray-950'>"Behind every great man is a woman rolling her eyes." — Jim Carrey</span>
                    </BlockQuote>
                })}
            </div>
}

export default BlockQuoteColor;