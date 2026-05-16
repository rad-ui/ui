import Button from '../Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import { ArrowRight } from 'lucide-react';

const BUTTON_TEXT = 'Proceed';
const BUTTON_VARIANTS = ['solid', 'soft', 'outline', 'ghost'];
const BUTTON_SIZES = ['small', 'medium', 'large', 'x-large'];

const renderButtonContent = () => (
    <>
        <div>{BUTTON_TEXT}</div>
        <ArrowRight className="text-current" size={16} />
    </>
);

export default {
    title: 'Components/Button',
    component: Button
};

export const Sizes = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Button Sizes</p>
        </div>
        <div className='flex flex-col gap-6'>
            {BUTTON_VARIANTS.map((variant) => (
                <div key={variant} className='flex flex-wrap items-start gap-2'>
                    {BUTTON_SIZES.map((size) => (
                        <Button key={`${variant}-${size}`} size={size} variant={variant}>
                            {renderButtonContent()}
                        </Button>
                    ))}
                </div>
            ))}
        </div>
    </SandboxEditor>;
};
