import Button from '@radui/ui/Button';


const ButtonColor = () => {
    const sizes = ['small', 'medium', 'large', 'x-large'];
    const variants = ['solid', 'soft', 'outline', 'ghost'];
    return <div className='flex flex-col gap-4'>
        {variants.map((variant, index) => {
            return <div key={index} className='flex items-center gap-4'>
                {sizes.map((size, index) => {
                    return <Button key={index} size={size} variant={variant} color='pink'>Button</Button>
                })}
            </div>
        })}
    </div>
}

export default ButtonColor;