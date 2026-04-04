import Card from '~/components/ui/Card/Card';
import Button from '~/components/ui/Button/Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

const Variants = ['soft', 'outline'];
const Sizes = ['small', 'medium', 'large', 'x-large'];

type CardStoryProps = {
    variant?: string;
    size?: string;
};

const LoginCard = ({ variant, size }: CardStoryProps) => {
    return (
        <div style={{ width: '100%', maxWidth: '48rem' }}>
            <Card variant={variant} size={size} style={{ width: '100%' }}>
                <Card.Header>
                    <Card.Title>Login to your account</Card.Title>
                    <Card.Action>Sign Up</Card.Action>
                    <Card.Description>
                        Enter your email below to login to your account
                    </Card.Description>
                </Card.Header>

                <Card.Content>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                            <label className="text-sm font-medium text-[var(--rad-ui-text-primary)]">Email</label>
                        </div>
                        <input
                            className="w-full rounded-xl border border-[var(--rad-ui-border-soft)] bg-[var(--rad-ui-surface-panel)] px-3 py-2 text-sm text-[var(--rad-ui-text-primary)] outline-none transition focus:border-[var(--rad-ui-border-default)]"
                            placeholder="m@example.com"
                            type="email"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                            <label className="text-sm font-medium text-[var(--rad-ui-text-primary)]">Password</label>
                            <button className="text-sm font-medium text-[var(--rad-ui-text-secondary)]" type="button">Forgot your password?</button>
                        </div>
                        <input
                            className="w-full rounded-xl border border-[var(--rad-ui-border-soft)] bg-[var(--rad-ui-surface-panel)] px-3 py-2 text-sm text-[var(--rad-ui-text-primary)] outline-none transition focus:border-[var(--rad-ui-border-default)]"
                            type="password"
                        />
                    </div>
                </Card.Content>

                <Card.Footer>
                    <Button className="w-full">Login</Button>
                    <Button className="w-full" variant="outline">Login with Google</Button>
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
            options: Variants,
            description: 'Card variant style'
        },
        size: {
            control: 'select',
            options: Sizes,
            description: 'Card size'
        }
    },
    args: {
        variant: 'outline',
        size: 'medium'
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
            <LoginCard variant="outline" size="medium" />
        </div>
    </SandboxEditor>
);

export const Variant = () => (
    <SandboxEditor>
        <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2">
            {Variants.map((variant) => (
                <LoginCard key={variant} variant={variant} size="medium" />
            ))}
        </div>
    </SandboxEditor>
);

export const Size = () => (
    <SandboxEditor>
        <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2">
            {Sizes.map((size) => (
                <LoginCard key={size} variant="outline" size={size} />
            ))}
        </div>
    </SandboxEditor>
);
