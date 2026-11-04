---
"@radui/ui": minor
---

Toasts can be swiped left and right as well as up and down. Set `swipeDirection` on a toast (one direction or a list) to choose its dismiss directions; it overrides the provider's `swipeDirections`. A toast swiped sideways slides out to that side, and the toast element gets `data-swipe-direction` (its allowed directions) and `data-swipe-out` (the direction it was dismissed in).
