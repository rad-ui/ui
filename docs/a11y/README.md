# Accessibility Guidelines

This section outlines accessibility and keyboard interaction guidance for components in the library.

## Button
| Key | Description |
| --- | ----------- |
| `Tab` | Move focus to the button |
| `Enter`/`Space` | Activate the button |

## Accordion
| Key | Description |
| --- | ----------- |
| `Tab` | Move focus between triggers |
| `Arrow Down`/`Arrow Up` | Navigate between triggers |
| `Enter`/`Space` | Toggle the associated panel |

## Disclosure
| Key | Description |
| --- | ----------- |
| `Tab` | Move focus to the trigger |
| `Enter`/`Space` | Toggle content visibility |

All interactive components expose the appropriate ARIA roles and attributes such as `aria-expanded`, `aria-haspopup`, and `aria-controls` when required.
