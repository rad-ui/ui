import React from 'react';
import Dialog from '../../src/components/ui/Dialog/Dialog';
import Select from '../../src/components/ui/Select/Select';
import Tooltip from '../../src/components/ui/Tooltip/Tooltip';

export function SSRDialog() {
  return (
    <Dialog.Root open>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Title</Dialog.Title>
          <Dialog.Description>Description</Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function SSRSelect() {
  return (
    <Select.Root defaultValue="one">
      <Select.Trigger>Trigger</Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Item value="one">One</Select.Item>
          <Select.Item value="two">Two</Select.Item>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export function SSRTooltip() {
  return (
    <Tooltip.Root defaultOpen>
      <Tooltip.Trigger>Trigger</Tooltip.Trigger>
      <Tooltip.Content>Content</Tooltip.Content>
    </Tooltip.Root>
  );
}
