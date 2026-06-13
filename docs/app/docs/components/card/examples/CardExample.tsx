'use client';

import Button from '@radui/ui/Button';
import Card from '@radui/ui/Card';

const CardExample = () => {
    return (
        <Card variant="outline" size="small" className="w-full max-w-[34rem]">
            <Card.Header>
                <Card.Title>Project Update</Card.Title>
                <Card.Description>A quick snapshot from the latest activity.</Card.Description>
            </Card.Header>
            <Card.Content>
                <p className="m-0 text-[0.95rem] leading-6 text-[var(--rad-ui-text-primary)]">
                    The latest changes are ready for review. Remaining work is limited to final QA and a short content pass before release.
                </p>
            </Card.Content>
            <Card.Footer>
                <Button className="w-full">Action</Button>
            </Card.Footer>
        </Card>
    );
};

export default CardExample;
