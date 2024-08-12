import React from 'react';
import Modal from './Modal';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';


export default {
    title: 'UI/Data Display/Modal',
    component: Modal,
};

const Template = (args) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    return <SandboxEditor>
        <Modal open={isOpen} onClose={onClose}>
            <Button onClick={toggle}>Trigger</Button>
        </Modal>
    </SandboxEditor>;
};

export const All = Template.bind({});
