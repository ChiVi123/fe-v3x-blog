
# Component Architecture

## Directory conventions

- Page- or feature-specific components MUST be stored in `src/components/feature/[page]/`.
- Shared and reusable components MUST be stored in `src/components/shared/`.
- Layout components MUST be stored in `src/components/layouts/`.
- Do not place page-specific components in `src/components/shared/`.
- Do not place layout components in feature directories unless they are exclusively feature-specific and are not responsible for application-level layout.

## Feature components

- Organize components by page or feature.
- Keep each component focused on a clear responsibility.
- Check for existing components before creating new ones.
- Keep feature-specific dependencies within the appropriate feature boundary whenever practical.

## Shared components

- Place components intended for reuse across multiple pages or features in `src/components/shared/`.
- Shared components MUST NOT depend on feature-specific implementation details.
- Keep shared components generic without introducing unnecessary abstractions.

## Layout components

- Store reusable layout components in `src/components/layouts/`.
- Layout components are responsible for structural presentation, such as page shells, navigation areas, sidebars, and content containers.
- Keep business logic out of layout components unless it is required for layout behavior.
- Reuse layouts when multiple pages share the same structure.

## When creating or moving components

1. Identify the component's responsibility and scope.
2. Check whether an existing component can be reused.
3. Select the appropriate directory.
4. Update imports and references.
5. Verify affected pages and components.
