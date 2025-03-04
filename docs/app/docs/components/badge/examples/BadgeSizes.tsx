import Badge from '@radui/ui/Badge';


const BadgeSizes = () => {
    const sizes = ['small', 'medium', 'large', 'x-large'];
    const variants = ['soft', 'outline'];
    return <div className='flex flex-col gap-4'>
        {variants.map((variant, index) => {
            return <div key={index} className='flex items-center gap-4'>
                {sizes.map((size, index) => {
                    return <Badge key={index} size={size} variant={variant}>
                        <span>Badge</span>
                        </Badge>
                })}
            </div>
        })}
    </div>
}

export default BadgeSizes;