
import Popper from '~/components/tools/Popper/Popper';

const Dropdown = ({list=[], selected}) => {
    const PopElem = () => {
        return <ul className='bg-white px-2 py-2 shadow-lg rounded-md'>
            {list.map((item, index) => {
                return <li key={index}>{item.value}</li>;
            })}
        </ul>;
    };
    return <div className='relative'>
        <Popper open={true} placement="bottom-start" popperName="dropdown" pop={<PopElem/>}>
            <span>Dropdown</span>
        </Popper>
    </div>;
};

export default Dropdown;
