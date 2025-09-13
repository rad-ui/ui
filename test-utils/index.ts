/**
 * Shared helpers for accessibility-centric tests.
 *
 * The newly added helpers focus on accessibility-specific testing.
 *
 * - `axe` runs an `axe-core` audit with our default WCAG 2.1 A/AA rules,
 *   making it easy to verify that rendered components meet accessibility
 *   guidelines without repeating configuration in every test.
 * - `keyboard` wraps `@testing-library/user-event` to simulate real user
 *   keystrokes (Tab navigation, Enter/Space activation, etc.) consistently
 *   across suites.
 *
 * These utilities don’t replace existing tests; they complement them. Most
 * component tests assert rendering and business logic but rarely check for
 * accessibility issues or keyboard interactions. Using these helpers improves
 * coverage for a11y and keyboard behavior alongside functional tests.
 *
 * ## When to use
 * - Whenever a component renders user-facing DOM and should meet a11y standards.
 * - When verifying keyboard navigation (focus order, activation via Enter/Space,
 *   escape handling, etc.).
 *
 * ## How to use
 * ```ts
 * import { axe, keyboard } from 'test-utils';
 *
 * const { container } = render(<MyComponent />);
 *
 * // accessibility assertions
 * await expect(await axe(container)).toHaveNoViolations();
 *
 * // keyboard interactions
 * const user = keyboard();
 * await user.tab();
 * await user.keyboard('{Enter}');
 * ```
 *
 * ## Pitfalls & Gotchas
 * - `axe` is async; await its result before making assertions.
 * - Run `axe` after the DOM has settled. If your component updates asynchronously,
 *   wait for those updates (e.g., `await screen.findBy...`) before calling `axe`.
 * - Some `axe-core` rules rely on browser APIs not implemented in JSDOM (e.g.,
 *   color-contrast); those checks are skipped and may require manual testing.
 * - Components that render via portals or outside `document.body` require passing
 *   the root element to `axe` (e.g., `axe(portalRoot)`).
 * - `keyboard` returns a fresh `userEvent` instance; create a new one per test to
 *   avoid leaking state between tests.
 * - Keyboard helpers simulate real keys; ensure elements are focusable and use
 *   proper semantics (`role`, `tabIndex`) for expected behavior.
 */

import * as axeCore from 'axe-core';
import userEvent from '@testing-library/user-event';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';

export const axe = (element?: HTMLElement) =>
    axeCore.run(element ?? document.body, {
        runOnly: {
            type: 'tag',
            values: ACCESSIBILITY_TEST_TAGS
        }
    });

export const keyboard = () => userEvent.setup();
