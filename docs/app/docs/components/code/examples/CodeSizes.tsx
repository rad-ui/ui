import Code from '@radui/ui/Code';
import Text from "@radui/ui/Text";

const CodeSizes = () => {
    const sizes = ['small', 'medium', 'large', 'x-large'];
    const variants = ['soft', 'outline'];
    return <div className='flex'>
        {variants.map((variant, index) => {
            return <div key={index} className='flex justify-center w-80 flex-wrap gap-4'>
                {sizes.map((size, index) => {
                    return (
                       <Code key={index} size={size} variant={variant}>
                         
                         <Text>console.log('This is some code')</Text>
                         
                       </Code>)
                })}
            </div>
        })}
    </div>
}

export default CodeSizes;