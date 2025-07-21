'use client';
import SwitchRoot, { SwitchRootProps } from './fragments/SwitchRoot';
import SwitchThumb from './fragments/SwitchThumb';

const Switch = () => {
    console.warn('Direct usage of Switch is not supported. Please use Switch.Root, Switch.Thumb, etc. instead.');
    return null;

    // const dataAttributes = useCreateDataAttribute('switch', { variant, size });
    // const accentAttributes = useCreateDataAccentColorAttribute(color);
    // const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    // return (
    //     <>
    //         {/* <input type='checkbox' className={clsx(rootClass)} {...props} checked= {isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
    //         <button
    //             type="button"
    //             onClick={handleChecked}
    //             role="switch"
    //             aria-checked={isChecked}
    //             {...composedAttributes()}
    //         ></button> */}

    //     </>
    // );
};

export namespace SwitchProps {
    export type Root = SwitchRootProps;
}

Switch.Root = SwitchRoot;
Switch.Thumb = SwitchThumb;
export default Switch;
