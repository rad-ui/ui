import { within, userEvent } from '@storybook/testing-library';

// Basic smoke test for each story. If a button exists, click it to ensure interactions
// don't trigger runtime errors.
export const run = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const [button] = canvas.queryAllByRole('button');
  if (button) {
    await userEvent.click(button);
  }
};
