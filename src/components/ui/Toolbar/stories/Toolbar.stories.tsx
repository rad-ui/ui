import React from 'react';
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Link2, Underline } from 'lucide-react';
import Toolbar from '../Toolbar';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
  title: 'Components/Toolbar',
  component: Toolbar,
  render: (args: React.JSX.IntrinsicAttributes) => <Template {...args} />
};

const Template = (_args: any) => {
  const [textStyles, setTextStyles] = React.useState<string[]>(['bold']);
  const [alignment, setAlignment] = React.useState<string[]>(['left']);

  return (
    <SandboxEditor className="space-y-6 pt-4">
      <div
        style={{
          minHeight: '320px',
          borderRadius: '14px',
          background: 'var(--rad-ui-color-gray-200)',
          border: '1px solid var(--rad-ui-color-gray-400)',
          display: 'grid',
          placeItems: 'center',
          padding: '40px 28px'
        }}
      >
        <Toolbar.Root aria-label="Formatting options">
          <Toolbar.ToggleGroup type="multiple" value={textStyles} onValueChange={setTextStyles}>
            <Toolbar.ToggleItem value="bold" aria-label="Bold">
              <Bold size={16} />
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="italic" aria-label="Italic">
              <Italic size={16} />
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="underline" aria-label="Underline">
              <Underline size={16} />
            </Toolbar.ToggleItem>
          </Toolbar.ToggleGroup>
          <Toolbar.Separator />
          <Toolbar.ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
            <Toolbar.ToggleItem value="left" aria-label="Align left">
              <AlignLeft size={16} />
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="center" aria-label="Align center">
              <AlignCenter size={16} />
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="right" aria-label="Align right">
              <AlignRight size={16} />
            </Toolbar.ToggleItem>
          </Toolbar.ToggleGroup>
          <Toolbar.Separator />
          <Toolbar.Link href="#" aria-label="Insert link">
            <Link2 size={16} />
            Add link
          </Toolbar.Link>
          <Toolbar.Separator />
          <span className="rad-ui-toolbar-meta">Edited 2 hours ago</span>
          <Toolbar.Button aria-label="Share">
            Share
          </Toolbar.Button>
        </Toolbar.Root>
      </div>
    </SandboxEditor>
  );
};

export const Default = {
  args: {}
};
