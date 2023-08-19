import { styled, darkTheme } from '@/stitches';


const StyledH2 = styled('h2', {
    darkTheme,
    color: '$gray12',
    fontSize: '2.6em',
    letterSpacing:"-0.05em",
    fontWeight: 'medium',
    margin:"0px",
    padding:"0px",
});

const H2 = ({ children,...props }) => {
    return (
        <StyledH2 {...props}>
                {children}
        </StyledH2>
    );
}

export default H2;