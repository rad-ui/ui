
// TODO : Use Floating Portal?

import Popper from '@/components/tools/Popper/Popper';

const Tooltip = ({children, label}) => {
    return <div>
        <Popper pop={'hello'}>{children}</Popper>
    </div>;
};

export default Tooltip;
