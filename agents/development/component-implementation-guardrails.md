# Component Implementation Guardrails

Start with [Knowledge Master List](../../knowledge/MASTER_LIST.md).

This document exists to prevent recurring implementation mistakes in component
work

## Non-Negotiable Rules

### 1. Demo and story styling must never live in component styles

- Component stylesheets under `src/components/ui/<Component>/` may contain only
  reusable public component styling.