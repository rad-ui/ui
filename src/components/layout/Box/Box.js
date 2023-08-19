
import { styled, darkTheme } from '@/stitches';

const StyledBox = styled('div', {
    darkTheme,
    display: "block",
    backgroundColor: '$gray3',
    padding: "10px",
    borderRadius: "5px",
});

const RegularBox = ({ children,...props }) => {
    return (
        <StyledBox {...props}>
            
                {children}
          
        </StyledBox>
    );
}

export default RegularBox;