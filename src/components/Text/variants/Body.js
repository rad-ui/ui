import { styled, darkTheme } from '@/stitches';


const StyledBody = styled('span', {
    darkTheme,
    display:"inline-block",
    color: '$gray11',
    fontSize: '1em',
    letterSpacing:"-0.05em",
    fontWeight: '400',
    margin:"0px",
    padding:"0px",
});

const Body = ({ children,...props }) => {
    return (
        <StyledBody {...props}>
                {children}
        </StyledBody>
    );
}

export default Body;