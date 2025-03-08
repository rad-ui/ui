import Button from '@radui/ui/Button';


const ButtonSizes = () => {
    const sizes = ['small', 'medium', 'large', 'x-large'];
    const variants = ['solid', 'soft', 'outline', 'ghost'];
    return <div className='flex flex-col gap-4'>
        {variants.map((variant, index) => {
            return <div key={index} className='flex items-center gap-4'>
                {sizes.map((size, index) => {
                    return <Button key={index} size={size} variant={variant}>
                        <span>Button</span>
                        </Button>
                })}
            </div>
        })}
    </div>
}

export default ButtonSizes;