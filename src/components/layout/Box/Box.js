
import { styled, darkTheme } from '@/stitches';

const StyledBox = styled('div', {
    darkTheme,
    display: "block",
    backgroundColor: '$gray3',
    padding: "10px",
    borderRadius: "5px",
});

const RegularBox = ({ children }) => {
    return (
        <StyledBox>
            <div>
                {children}
            </div>
        </StyledBox>
    );
}

export default RegularBox;