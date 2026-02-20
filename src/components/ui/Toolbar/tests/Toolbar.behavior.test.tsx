import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toolbar from '../Toolbar';
import { axe, keyboard } from 'test-utils';

describe('Toolbar keyboard navigation and a11y', () => {
  test('arrow keys move focus between items', async () => {
    render(
      <Toolbar.Root aria-label="Editor toolbar">
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Button>Italic</Toolbar.Button>
        <Toolbar.Link href="#">Link</Toolbar.Link>
      </Toolbar.Root>
    );

    const user = keyboard();
    await user.tab();
    const buttons = screen.getAllByRole('button');
    const link = screen.getByRole('link');
    expect(buttons[0]).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(buttons[1]).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(link).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(buttons[1]).toHaveFocus();
  });

  test('home and end keys move to first and last toolbar item', async () => {
    render(
      <Toolbar.Root aria-label="Editor toolbar">
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Button>Italic</Toolbar.Button>
        <Toolbar.Link href="#">Link</Toolbar.Link>
      </Toolbar.Root>
    );

    const user = keyboard();
    await user.tab();
    const buttons = screen.getAllByRole('button');
    const link = screen.getByRole('link');

    await user.keyboard('{End}');
    expect(link).toHaveFocus();
    await user.keyboard('{Home}');
    expect(buttons[0]).toHaveFocus();
  });

  test('vertical orientation uses arrow up/down', async () => {
    render(
      <Toolbar.Root aria-label="Editor toolbar" orientation="vertical">
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Button>Italic</Toolbar.Button>
        <Toolbar.Link href="#">Link</Toolbar.Link>
      </Toolbar.Root>
    );

    const user = keyboard();
    await user.tab();
    const buttons = screen.getAllByRole('button');
    const link = screen.getByRole('link');

    await user.keyboard('{ArrowDown}');
    expect(buttons[1]).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(link).toHaveFocus();
    await user.keyboard('{ArrowUp}');
    expect(buttons[1]).toHaveFocus();
  });

  test('loop mode wraps focus at edges', async () => {
    render(
      <Toolbar.Root aria-label="Editor toolbar" loop>
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Button>Italic</Toolbar.Button>
        <Toolbar.Link href="#">Link</Toolbar.Link>
      </Toolbar.Root>
    );

    const user = keyboard();
    await user.tab();
    const buttons = screen.getAllByRole('button');
    const link = screen.getByRole('link');

    await user.keyboard('{ArrowLeft}');
    expect(link).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(buttons[0]).toHaveFocus();
  });

  test('toggle group item receives roving focus and updates pressed state', async () => {
    render(
      <Toolbar.Root aria-label="Editor toolbar">
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.ToggleGroup type="single" defaultValue={['italic']}>
          <Toolbar.ToggleItem value="italic">Italic</Toolbar.ToggleItem>
          <Toolbar.ToggleItem value="underline">Underline</Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Link href="#">Link</Toolbar.Link>
      </Toolbar.Root>
    );

    const user = keyboard();
    await user.tab();

    const bold = screen.getByRole('button', { name: 'Bold' });
    const italic = screen.getByRole('button', { name: 'Italic' });
    const underline = screen.getByRole('button', { name: 'Underline' });
    expect(bold).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(italic).toHaveFocus();
    expect(italic).toHaveAttribute('aria-pressed', 'true');

    await user.keyboard('{ArrowRight}');
    expect(underline).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(underline).toHaveAttribute('aria-pressed', 'true');
    expect(italic).toHaveAttribute('aria-pressed', 'false');
  });

  test('asChild preserves custom element semantics', async () => {
    render(
      <Toolbar.Root aria-label="Editor toolbar">
        <Toolbar.Button asChild>
          <button type="button">Custom Button</button>
        </Toolbar.Button>
        <Toolbar.Link asChild>
          <a href="/docs">Docs</a>
        </Toolbar.Link>
      </Toolbar.Root>
    );

    expect(screen.getByRole('button', { name: 'Custom Button' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
  });

  test('axe: no accessibility violations', async () => {
    const { container } = render(
      <Toolbar.Root aria-label="Editor toolbar">
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Button>Italic</Toolbar.Button>
        <Toolbar.ToggleGroup type="multiple" defaultValue={['underline']}>
          <Toolbar.ToggleItem value="underline">Underline</Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Link href="#">Link</Toolbar.Link>
      </Toolbar.Root>
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
