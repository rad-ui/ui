import BlockQuote from '@radui/ui/BlockQuote';


const BlockQuoteColor = () => {
    const sizes = ['small', 'medium', 'large', 'x-large'];
    return <div className='flex flex-col gap-4'>
                {sizes.map((size, index) => {
                    return <BlockQuote key={index} size={size} color='pink'>
                         "Behind every great man is a woman rolling her eyes." — Jim Carrey
                    </BlockQuote>
                })}
            </div>
}

export default BlockQuoteColor;