import Callout from '@radui/ui/Callout';
import Text from "@radui/ui/Text";
import { BookmarkIcon } from '../docs/codeUsage';

const CalloutSizes = () => {
    const sizes = ['small', 'medium', 'large', 'x-large'];
    const variants = ['soft', 'outline'];
    return <div className='flex flex-col gap-4'>
        {variants.map((variant, index) => {
            return <div key={index} className='flex justify-center flex-wrap gap-4'>
                {sizes.map((size, index) => {
                    return (
                       <Callout key={index} size={size} variant={variant}>
                         <BookmarkIcon />
                         <Text className="font-bold">Error</Text>
                         <Text>Something went wrong. Please try again later.</Text>
                       </Callout>)
                })}
            </div>
        })}
    </div>
}

export default CalloutSizes;