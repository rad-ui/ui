import Card from '~/components/ui/Card/Card';
import Button from '~/components/ui/Button/Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

const CARD_VARIANTS = ['soft', 'outline'];
const CARD_SIZES = ['small', 'medium', 'large', 'x-large'];

type CardStoryProps = {
    variant?: string;
    size?: string;
};

const LoginCard = ({ variant, size }: CardStoryProps) => {
    const resolvedVariant = variant || 'default';
    const resolvedSize = size || 'medium';
    const title = resolvedVariant === 'soft' ? 'Weekly Summary' : 'Project Update';
    const description = resolvedSize === 'small'
        ? 'A quick snapshot from the latest activity.'
        : 'Key progress, blockers, and next steps from the latest activity.';
    const body = resolvedVariant === 'soft'
        ? 'Three tasks were completed this week, and the team is on track to wrap the remaining review items tomorrow.'
        : 'The latest changes are ready for review. Remaining work is limited to final QA and a short content pass before release.';

    return (
        <div style={{ width: '100%', maxWidth: '36rem' }}>
            <Card variant={variant} size={size} style={{ width: '100%' }}>
                <Card.Header>
                    <Card.Title>{title}</Card.Title>
                    <Card.Description>{description}</Card.Description>
                </Card.Header>

                <Card.Content>
                    <p className="m-0 text-[0.95rem] leading-6 text-[var(--rad-ui-text-primary)]">
                        {body}
                    </p>
                </Card.Content>

                <Card.Footer>
                    <Button className="w-full">Action</Button>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default {
    title: 'WIP/Card',
    component: Card,
    argTypes: {
        variant: {
            control: 'select',
            options: CARD_VARIANTS,
            description: 'Card variant style'
        },
        size: {
            control: 'select',
            options: CARD_SIZES,
            description: 'Card size'
        }
    },
    args: {
        variant: 'outline',
        size: 'small'
    },
    render: (args: CardStoryProps) => (
        <SandboxEditor>
            <div className="flex justify-center py-12">
                <LoginCard variant={args.variant} size={args.size} />
            </div>
        </SandboxEditor>
    )
};

export const Default = () => (
    <SandboxEditor>
        <div className="flex justify-center py-12">
            <LoginCard variant="outline" size="small" />
        </div>
    </SandboxEditor>
);

export const Variants = () => (
    <SandboxEditor>
        <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2">
            {CARD_VARIANTS.map((variant) => (
                <LoginCard key={variant} variant={variant} size="small" />
            ))}
        </div>
    </SandboxEditor>
);

export const Sizes = () => (
    <SandboxEditor>
        <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2">
            {CARD_SIZES.map((size) => (
                <LoginCard key={size} variant="outline" size={size} />
            ))}
        </div>
    </SandboxEditor>
);
