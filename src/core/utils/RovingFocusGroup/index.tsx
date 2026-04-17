import RovingFocusRoot from './fragments/RovingFocusRoot';
import RovingFocusGroup from './fragments/RovingFocusGroup';
import RovingFocusItem from './fragments/RovingFocusItem';

/**
 * RovingFocusGroupUtility
 *
 * A component implementation of the Roving Focus (or "Roving tabindex") pattern.
 * This pattern is used to manage keyboard navigation within a group of focusable elements,
 * ensuring only one element in the group is keyboard-focusable at a time.
 *
 * Key features:
 * - Arrow key navigation between items
 * - Home and End key navigation to jump to first or last items
 * - Support for both horizontal and vertical navigation
 * - Optional looping when reaching the end of a group
 * - Prevents default scrolling behavior when using arrow keys
 * - Automatically respects disabled state of child elements
 * - Comprehensive ARIA roles and attributes for screen readers
 *
 * Accessibility benefits:
 * - Follows WAI-ARIA best practices for keyboard navigation
 * - Improves navigation for keyboard and screen reader users
 * - Maintains a single tab stop within a group of related elements
 * - Properly identifies and skips disabled elements during navigation
 * - Uses appropriate ARIA roles (listbox/option pattern)
 * - Provides aria-selected state for the currently focused item
 * - Supports proper labeling with aria-label and aria-labelledby
 *
 * @example
 * <RovingFocusGroup.Root orientation="horizontal" loop={true} aria-label="Main Menu">
 *   <RovingFocusGroup.Group className="flex gap-2" aria-label="Navigation Section">
 *     <RovingFocusGroup.Item aria-label="First option">
 *       <Button>Option 1</Button>
 *     </RovingFocusGroup.Item>
 *     <RovingFocusGroup.Item>
 *       <Button disabled>Disabled Option</Button>
 *     </RovingFocusGroup.Item>
 *     <RovingFocusGroup.Item>
 *       <Button>Option 2</Button>
 *     </RovingFocusGroup.Item>
 *   </RovingFocusGroup.Group>
 * </RovingFocusGroup.Root>
 */
const RovingFocusGroupUtility = {
    Root: RovingFocusRoot,
    Group: RovingFocusGroup,
    Item: RovingFocusItem
};

export default RovingFocusGroupUtility;
