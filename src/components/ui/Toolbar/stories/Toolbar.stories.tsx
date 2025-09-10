import React from 'react';
import Toolbar from '../Toolbar';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
  title: 'Components/Toolbar',
  component: Toolbar,
  render: (args: React.JSX.IntrinsicAttributes) => <Template {...args} />
};

const Template = (_args: any) => {
  return (
    <SandboxEditor className="space-y-4 pt-4">
      <Toolbar.Root aria-label="Formatting options">
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Button>Italic</Toolbar.Button>
        <Toolbar.Separator />
        <Toolbar.Link href="#">Link</Toolbar.Link>
      </Toolbar.Root>
    </SandboxEditor>
  );
};

export const Default = {
  args: {}
};
