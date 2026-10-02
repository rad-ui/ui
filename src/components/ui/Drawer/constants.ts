/**
 * Single source of truth for Drawer timing and gesture tuning.
 *
 * The duration values below are fallbacks only. The drawer resolves animation
 * completion through the Web Animations API and reads the real durations from
 * the `--rad-ui-drawer-open-duration` / `--rad-ui-drawer-close-duration` custom
 * properties emitted by the stylesheets. Changing a stylesheet therefore can
 * never desync the unmount timing, which was the case when the close duration
 * was duplicated across fragments and hand-matched to `$close-duration`.
 */

export const OPEN_DURATION_MS = 500;
export const CLOSE_DURATION_MS = 400;

export const OPEN_DURATION_VAR = '--rad-ui-drawer-open-duration';
export const CLOSE_DURATION_VAR = '--rad-ui-drawer-close-duration';

// ── Gesture tuning ───────────────────────────────────────────────────────────

/** Minimum travel (px) before a release counts as a swipe at all. */
export const MIN_SWIPE_DISTANCE = 10;

/** Velocity (px/ms) at or above which a release is treated as a flick. */
export const FAST_FLICK_VELOCITY = 0.5;

/** Fraction of the drawer size a slow drag must cross to dismiss. */
export const DISMISS_DISTANCE_RATIO = 0.5;

/** Velocity (px/ms) above which snap point skipping kicks in. */
export const SNAP_VELOCITY_THRESHOLD = 0.5;

/** Projected travel (px) added per px/ms of release velocity. */
export const SNAP_VELOCITY_PROJECTION = 300;

/** Upper clamp on the release velocity used for snap projection (px/ms). */
export const MAX_SNAP_VELOCITY = 4;

/** Movement (px) before a gesture commits to an axis. */
export const AXIS_LOCK_SLOP = 6;

/** How much further the dismiss axis must lead before it claims the gesture. */
export const AXIS_LOCK_BIAS = 2;

/** Shortest window (ms) used when sampling release velocity. */
export const MIN_VELOCITY_SAMPLE_MS = 16;

/** Samples older than this (ms) are discarded, so a pause kills the flick. */
export const MAX_RELEASE_VELOCITY_AGE_MS = 80;

/** Release transitions are clamped into this window (ms). */
export const MIN_RELEASE_DURATION_MS = 80;
export const MAX_RELEASE_DURATION_MS = 360;

/** Strength is a scalar in (MIN_RELEASE_STRENGTH, 1]. */
export const MIN_RELEASE_STRENGTH = 0.1;

/** Release velocities (px/ms) used for strength scaling. */
export const MIN_RELEASE_VELOCITY = 0.2;
export const MAX_RELEASE_VELOCITY = 4;

/** Fraction of an inward over-drag that is applied. */
export const RUBBER_BAND_FACTOR = 0.2;

/** How far each open nested level peeks out of its parent (px). */
export const NESTED_PEEK_PX = 20;

/** Travel (px) a `Drawer.SwipeZone` drag must cover to open the drawer. */
export const SWIPE_ZONE_OPEN_THRESHOLD = 48;

/** Edge strip width (px) occupied by a `Drawer.SwipeZone`. */
export const SWIPE_ZONE_SIZE = 20;

/** Maximum visible edge affordance shown while dragging a `Drawer.SwipeZone`. */
export const SWIPE_ZONE_PEEK_PX = 8;

/** Tokenized transition used when an abandoned edge swipe settles back. */
export const SWIPE_ZONE_RESET_TRANSITION =
    'transform var(--rad-ui-motion-duration-normal) var(--rad-ui-motion-easing-standard)';

// ── Public CSS variables ─────────────────────────────────────────────────────
// Structural runtime variables: they carry measured geometry and drag offsets
// so CSS can compose the open/closed transform with the live drag transform.

export const CSS_VAR = {
    movementX: '--rad-ui-drawer-swipe-movement-x',
    movementY: '--rad-ui-drawer-swipe-movement-y',
    snapPointOffset: '--rad-ui-drawer-snap-point-offset',
    progress: '--rad-ui-drawer-swipe-progress',
    strength: '--rad-ui-drawer-swipe-strength',
    height: '--rad-ui-drawer-height',
    nestedDrawers: '--rad-ui-nested-drawers',
} as const;

// ── Escape hatches ───────────────────────────────────────────────────────────

/**
 * Adding either attribute to a descendant opts that subtree out of swipe
 * dismissal. Unprefixed is the documented name; the prefixed alias matches the
 * library-infrastructure naming allowed for internal opt-in markers.
 */
export const SWIPE_IGNORE_SELECTOR = '[data-swipe-ignore],[data-rad-ui-swipe-ignore]';

/** Marks the scrollable region of a drawer so swipes over text still select. */
export const SWIPE_CONTENT_ATTRIBUTE = 'data-swipe-content';
