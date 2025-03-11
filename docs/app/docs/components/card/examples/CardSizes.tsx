import Card from '@radui/ui/Card';
import Avatar from '@radui/ui/Avatar';

const CardSizes = () => {
    const sizes = ['small', 'medium', 'large', 'x-large'];
    const variants = ['soft', 'outline'];
    return <div className='flex flex-col gap-4'>
        {variants.map((variant, index) => {
            return <div key={index} className='flex items-center gap-4'>
                {sizes.map((size, index) => {
                    return (
                       <Card key={index} size={size} variant={variant} className="bg-gray-50 text-gray-950 flex items-center space-x-2">
                           <Avatar fallback="PP" />
                      <div className="flex flex-col">
                        <span className="font-medium">Peter Parker</span>
                        <span className="text-xs text-gray-800">Biochemist</span>
                      </div>
                       </Card>)
                })}
            </div>
        })}
    </div>
}

export default CardSizes;