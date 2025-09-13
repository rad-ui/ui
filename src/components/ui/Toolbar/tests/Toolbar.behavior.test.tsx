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

  test('axe: no accessibility violations', async () => {
    const { container } = render(
      <Toolbar.Root aria-label="Editor toolbar">
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Button>Italic</Toolbar.Button>
        <Toolbar.Link href="#">Link</Toolbar.Link>
      </Toolbar.Root>
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
