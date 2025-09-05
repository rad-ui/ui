import React from 'react';
import DisclosureRoot, { DisclosureRootProps } from './fragments/DisclosureRoot';
import DisclosureItem from './fragments/DisclosureItem';
import DisclosureTrigger from './fragments/DisclosureTrigger';
import DisclosureContent from './fragments/DisclosureContent';

export type DisclosureProps = DisclosureRootProps & {
     items:{title:string, content: React.ReactNode}[]
};

interface DisclosureComponent extends React.ForwardRefExoticComponent<DisclosureProps & React.RefAttributes<React.ElementRef<'div'>>> {
    Root: typeof DisclosureRoot;
    Item: typeof DisclosureItem;
    Trigger: typeof DisclosureTrigger;
    Content: typeof DisclosureContent;
}

const Disclosure = React.forwardRef<React.ElementRef<'div'>, DisclosureProps>(({ items, ...props }, ref) => {
    return (

        <DisclosureRoot ref={ref} {...props}>
            {items.map((item, index) => (
                <DisclosureItem key={index} value={index}>
                    <DisclosureTrigger>
                        {item.title}
                    </DisclosureTrigger>
                    <DisclosureContent>
                        {item.content}
                    </DisclosureContent>
                </DisclosureItem>

            ))}

        </DisclosureRoot>
    );
}) as DisclosureComponent;

Disclosure.Root = DisclosureRoot;
Disclosure.Item = DisclosureItem;
Disclosure.Trigger = DisclosureTrigger;
Disclosure.Content = DisclosureContent;

Disclosure.displayName = 'Disclosure';

export default Disclosure;
