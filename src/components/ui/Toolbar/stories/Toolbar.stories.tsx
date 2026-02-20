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
    <SandboxEditor className="space-y-4 pt-4">
      <Toolbar.Root aria-label="Formatting options">
        <Toolbar.ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
          <Toolbar.ToggleItem value="left" aria-label="Align left">
            <AlignLeft size={14} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem value="center" aria-label="Align center">
            <AlignCenter size={14} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem value="right" aria-label="Align right">
            <AlignRight size={14} />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Separator />
        <Toolbar.ToggleGroup type="multiple" value={textStyles} onValueChange={setTextStyles}>
          <Toolbar.ToggleItem value="bold" aria-label="Bold">
            <Bold size={14} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem value="italic" aria-label="Italic">
            <Italic size={14} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem value="underline" aria-label="Underline">
            <Underline size={14} />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Separator />
        <Toolbar.Link href="#" aria-label="Insert link">
          <Link2 size={14} />
        </Toolbar.Link>
      </Toolbar.Root>
      <div className="text-sm text-gray-700">
        Active styles: {textStyles.join(', ') || 'none'} | Alignment: {alignment[0] ?? 'none'}
      </div>
    </SandboxEditor>
  );
};

export const Default = {
  args: {}
};
