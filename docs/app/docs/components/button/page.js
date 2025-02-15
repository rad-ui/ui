import Documentation from '@/components/layout/Documentation/Documentation';
import Button from '@radui/ui/Button';
import SEO from '../../docsIndex';
import codeUsage from './docs/codeUsage';
import { code as variantCodeUsage } from './docs/variantCodeUsage';
import { code as sizeCodeUsage } from './docs/sizeCodeUsage';
import { code as colorCodeUsage } from './docs/colorCodeUsage';
import Card from '@radui/ui/Card';
import Text from '@radui/ui/Text';
import Separator from '@radui/ui/Separator';
import Tooltip from '@radui/ui/Tooltip';

import ButtonVariants from './examples/ButtonVariants';
import ButtonSizes from './examples/ButtonSizes';
import ButtonColor from './examples/ButtonColor';

const PAGE_NAME = 'BUTTON_DOCS';

export const metadata = SEO.getMetadata(PAGE_NAME);


const Arrow = () => {
    return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const ButtonDocs = () => {
    const buttonVariants = ['solid', 'soft', 'outline', 'ghost'];
    const buttonStyleDescription = {
        solid: 'Solid buttons are the most common type of button. They have a solid background color and a border.',
        soft: 'Soft buttons have a soft background color and a border.',
        outline: 'Outline buttons have a border and a background color.',
        ghost: 'Ghost buttons have a border and a background color.',
    }
    return <div>
        <Documentation
            currentPage={PAGE_NAME} title='Button' description={`
            Buttons are used to trigger an action. You can use them in forms, dialogs, and more.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div style={{ display: 'flex', gap: 20 }}>
                    <Button color="green" className="space-x-2" ><span>Click Me! </span><Arrow /></Button>
                </div>
            </Documentation.ComponentHero>
            
            <Documentation.ComponentHero title='Variants' codeUsage={variantCodeUsage}>
                <ButtonVariants />
            </Documentation.ComponentHero>
  

            <Documentation.ComponentHero title='Sizes' codeUsage={sizeCodeUsage}>
                <ButtonSizes />
            </Documentation.ComponentHero>

            <Documentation.ComponentHero title='Color' codeUsage={colorCodeUsage}>
                <ButtonColor />
            </Documentation.ComponentHero>
        </Documentation>
    </div>;
};

export default ButtonDocs;
