import Button from '../Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const ArrowIcon = ({ className }) => {
    return <svg className={className} width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const BUTTON_TEXT = 'Proceed';
const Variants = ['solid', 'soft', 'outline', 'ghost'];
const Sizes = ['small', 'medium', 'large', 'x-large'];
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Button',
    component: Button,
    render: (args) => <SandboxEditor>
        <div >
            <div className='mt-4 mb-2'>
                <p className='text-gray-950'>Button Variants</p>
            </div>
            <div className='flex'>

                {Variants.map((variant, index) => {
                    let label = `${variant} ${BUTTON_TEXT}`;
                    if (!BUTTON_TEXT) {
                        label = 'Proceed';
                    }
                    return <Button label={`${label}`} key={index} variant={variant} >
                        <div>{BUTTON_TEXT} </div> <ArrowIcon className="text-accent-900" />
                    </Button>;
                })}
                <Button>
                    <div>{!BUTTON_TEXT} </div> <ArrowIcon className="text-white" />
                </Button>
            </div>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AllVariants = {
    args: {
        className: ''
    }
};

export const Size = (args) => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Button Size</p>
        </div>
        <div className=''>

            {Variants.map((variant, index) => (
                <div key={index} className='mb-10'>
                    <span key={index} className="inline-flex items-start space-x-2">
                        {Sizes.map((size, index) => {
                            return <Button key={index} size={size} variant={variant} >
                                <div>{BUTTON_TEXT} </div> <ArrowIcon className="text-accent-900" />
                            </Button>;
                        })}
                    </span>
                </div>
            ))}

        </div>
    </SandboxEditor>;
};

export const Color = (args) => {
    return <SandboxEditor>
        <div className='flex items-center space-x-[40px]'>
            <div>
                <p>Colored Button</p>
                <Button color='red' >
                    <div>{BUTTON_TEXT} </div> <ArrowIcon />
                </Button>
            </div>
            <div>
                <p>Theme Button</p>
                <Button>
                    <div>{BUTTON_TEXT} </div> <ArrowIcon />
                </Button>
            </div>
        </div>
    </SandboxEditor>;
};
