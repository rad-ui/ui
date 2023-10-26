import { styled, darkTheme } from '@/stitches';


const StyledH4 = styled('h4', {
    darkTheme,
    color: '$gray12',
    fontSize: '2.2em',
    letterSpacing:"-0.05em",
    fontWeight: 'medium',
    margin:"0px",
    padding:"0px",
});

const H4 = ({ children,...props }) => {
    return (
        <StyledH4 {...props}>
                {children}
        </StyledH4>
    );
}

export default H4;