import { styled, darkTheme } from '@/stitches';
import { useState } from 'react';

import Button from "../../Button/Button"


const StoryBlockContainer = styled('div', {
    darkTheme,
    backgroundColor: '$gray3',
    border: '0',
    minHeight: '400px',
    borderRadius: "5px",
    padding: "12px",
    fontFamily: 'inherit',
})


const StoryBlock = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    return (
        <StoryBlockContainer className={`${isDarkTheme ? 'dark-theme' : ''}`}>
            <div >
                <div>
                    <Button onClick={() => setIsDarkTheme(!isDarkTheme)}>{isDarkTheme ? "Dark Theme" : "Light Theme"}</Button>
                </div>
                <div >
                    {children}
                </div>
            </div>

        </StoryBlockContainer>
    );
}

export default StoryBlock;