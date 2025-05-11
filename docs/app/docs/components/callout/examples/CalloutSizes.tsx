"use client";
import Callout from '@radui/ui/Callout';
import { BookmarkIcon } from './CalloutExample';

const CalloutSizes = () => {
    const sizes = ['small', 'medium', 'large', 'x-large'];
    const variants = ['soft', 'outline'];
    return <div className='flex flex-col gap-4'>

             <div  className='flex flex-col gap-4 justify-center flex-wrap'>
                {sizes.map((size, index) => {
                    return (
                       <Callout.Root size={size} color="red" key={index}>
                            <Callout.Icon>
                                <BookmarkIcon />
                            </Callout.Icon>
                            <Callout.Text>
                                Seems like there's been an error. Please try again.
                            </Callout.Text>
                        </Callout.Root>
                    )
                })}
            </div>

    </div>
}

export default CalloutSizes;