"use client";
import Callout from "@radui/ui/Callout";
import { BookmarkIcon } from './CalloutExample';

const CalloutColor = () => {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];
    return <div className='flex flex-col gap-4 justify-center flex-wrap'>
                {colors.map((color, index) => {
                    return (
                        <Callout.Root color={color} key={index}>
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
}

export default CalloutColor;