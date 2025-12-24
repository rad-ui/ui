/**
 * Basic smoke tests for Storybook stories.
 *
 * This configuration runs in CI via the Storybook test runner. It renders each
 * story and performs a minimal interaction to surface runtime errors that unit
 * tests might miss.
 *
 * What it covers:
 *   - Verifies that stories render without throwing.
 *   - Clicks the first button (if present) to catch simple interaction bugs.
 *
 * What it doesn't cover:
 *   - Visual regressions or accessibility checks.
 *   - Complex workflows that require multiple interactions.
 *   - Stories that depend on network requests or auth; those may require mocks
 *     or can be excluded from CI if flaky.
 *
 * This smoke test is a lightweight safety net and does not replace dedicated
 * unit, integration, or visual testing.
 */
// If a button exists, click the first one to ensure the interaction doesn't trigger
// runtime errors.
export const run = async ({ canvasElement }) => {
  // Import testing utilities inside the runner so that Storybook's jsdom
  // environment is available. Importing at the module level throws because the
  // package expects `location` to exist on the global object.
  const { within, userEvent } = await import('@storybook/testing-library');

  const canvas = within(canvasElement);
  // Use queryAllByRole so the test runner doesn't throw when multiple buttons
  // are present.
  const [button] = canvas.queryAllByRole('button');
  if (button) {
    await userEvent.click(button);
  }
};
