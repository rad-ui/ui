import { styled, darkTheme } from '@/stitches';


const StyledHeader = styled('section', {
    darkTheme,
    color: '$gray12',
    fontSize: '4em',
    letterSpacing:"-0.05em",
    fontWeight: 'bold',
    margin:"0px",
    padding:"0px",
    lineHeight:"1.3em",
});

const Header = ({ children,...props }) => {
    return (
        <StyledHeader {...props}>
                {children}
        </StyledHeader>
    );
}

export default Header;