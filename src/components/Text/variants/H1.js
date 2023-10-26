import { styled, darkTheme } from '@/stitches';


const StyledH1 = styled('h1', {
    darkTheme,
    color: '$gray12',
    fontSize: '3em',
    letterSpacing:"-0.05em",
    fontWeight: 'medium',
    margin:"0px",
    padding:"0px",
});

const H1 = ({ children,...props }) => {
    return (
        <StyledH1 {...props}>
                {children}
        </StyledH1>
    );
}

export default H1;