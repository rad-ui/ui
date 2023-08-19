import { styled, darkTheme } from '@/stitches';


const StyledH3 = styled('h3', {
    darkTheme,
    color: '$gray12',
    fontSize: '2.4em',
    letterSpacing:"-0.05em",
    fontWeight: 'medium',
    margin:"0px",
    padding:"0px",
});

const H3 = ({ children,...props }) => {
    return (
        <StyledH3 {...props}>
                {children}
        </StyledH3>
    );
}

export default H3;