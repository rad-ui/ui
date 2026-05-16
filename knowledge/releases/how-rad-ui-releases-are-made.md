# Rad UI Release stages

## Phase 1 - WIP
These components are work in progress and are not ready for production use.

## Phase 2 - Beta
These components are packaged and are bundled in the production build, but are not publicly announced regarding its availability. It is available for use if the consumer knows about it but at their own risk. These are generally meant for the library authors to test them out in internal experiments and apps before making them public.

## Phase 3 - Preview
These are released to the public, ideally gearing up for production release, but use with caution as they are still subject to change.

## Phase 4 - Stable
These are released and officially documented on the docs website. These components are production ready and can be used in production applications.

# Other release types

## Deprecated
These components will be removed in a future release. They are still available for use but are not recommended for use.

## Removed
These components have been removed from the library and are no longer available for use.



# Workflow

On Storybook, non stable components are put inside "WIP" category, until they are released they stay there. Once they are released they are placed inside "Components" category.

What defines a released component?
1. The component name is part of scripts/RELEASED_COMPONENTS.cjs
2. The component is documented on the docs website