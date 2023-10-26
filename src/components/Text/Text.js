import {Header, H1, H2, H3, H4, Body} from './variants';

const Text = ({ children, ...props }) => (
    <div {...props}>
        {children}
    </div>

);


Text.Header = Header;
Text.H1 = H1;
Text.H2 = H2;
Text.H3 = H3;
Text.H4 = H4;
Text.Body = Body;



export default Text;