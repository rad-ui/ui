import React from 'react';
import { render, screen } from '@testing-library/react';
import DropdownMenu from './DropdownMenu';

describe('DropdownMenu', () => {
  test('forwards refs to underlying elements', () => {
    const rootRef = React.createRef<HTMLDivElement>();
    const triggerRef = React.createRef<HTMLButtonElement>();
    const contentRef = React.createRef<HTMLDivElement>();
    const itemRef = React.createRef<HTMLButtonElement>();

    render(
      <DropdownMenu.Root ref={rootRef} defaultOpen>
        <DropdownMenu.Trigger ref={triggerRef}>Trigger</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content ref={contentRef}>
            <DropdownMenu.Item ref={itemRef}>Item</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );

    expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
    expect(itemRef.current).toBeInstanceOf(HTMLButtonElement);
  });

  test('renders without console warnings', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Trigger</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Item</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );

    expect(errorSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });

  test('renders menu items for accessibility', () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Trigger</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Item</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );

    expect(screen.getByText('Item')).toBeInTheDocument();
  });
});

