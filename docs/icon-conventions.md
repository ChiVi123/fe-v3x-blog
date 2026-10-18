
# Icon Conventions

## Preferred icon library

- ALWAYS prefer icons from `lucide-react` when a suitable icon exists.
- Reuse the existing Lucide icon components instead of creating duplicate implementations.
- Choose icons that match the intended meaning, visual style, and design requirements.
- Do not use unrelated icons merely because an exact match is unavailable.

## Custom icon components

- If `lucide-react` does not provide a suitable icon, or its available icons do not satisfy the design requirements, create a custom icon component.
- Custom icons MUST follow the component API and visual conventions of `lucide-react`.
- Store reusable custom icon components in `src/components/shared/icons/`.
- Each custom icon SHOULD be implemented as an individual component and exported using a descriptive PascalCase name.
- Custom icons MUST be reusable and MUST NOT contain unrelated business logic.

## Component API

Custom icon components SHOULD support the following props:

- `size`: icon width and height; defaults to `24`.
- `color`: icon stroke color; defaults to `"currentColor"`.
- `strokeWidth`: stroke thickness; defaults to `2`.
- `absoluteStrokeWidth`: whether to normalize stroke width relative to icon size, when applicable.
- `className`: CSS class names.
- Standard SVG props, such as `aria-hidden`, `role`, `focusable`, and `onClick`, when appropriate.

Use `React.SVGProps<SVGSVGElement>` or an equivalent SVG prop type to preserve standard SVG attributes.

## Visual conventions

- Use SVG for custom icons whenever practical.
- Follow Lucide's standard visual style: outline-based shapes, rounded line caps, rounded line joins, and consistent stroke widths.
- Use `currentColor` by default so icons inherit their color from surrounding text or CSS.
- Keep icons visually consistent in proportions, alignment, and whitespace.
- Avoid unnecessary fills, gradients, shadows, and decorative details unless explicitly required by the design.
- Provide accessible names for meaningful standalone icons.
- Mark decorative icons as hidden from assistive technologies when appropriate.

## Usage

- Use Lucide icons directly when suitable.
- Import custom icons from the project's shared icon directory.
- Use the same sizing, color, and stroke conventions for both Lucide and custom icons.
- Do not create a custom icon if an existing Lucide icon satisfies the requirement.
- Do not use emoji or unrelated image assets as substitutes for interface icons unless explicitly required by the design.

## Before creating a custom icon

1. Check whether `lucide-react` already provides a suitable icon.
2. Confirm that the existing icon cannot satisfy the design requirements through supported props or styling.
3. Create a reusable SVG component following the conventions above.
4. Verify rendering, sizing, color inheritance, and accessibility.
