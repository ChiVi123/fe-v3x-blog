
# Next.js Image Rules

## Mandatory image component

- ALWAYS use `Image` from `next/image` to render images in the UI.
- Do not use a native HTML `<img>` element for image rendering.
- This rule applies to feature components, shared components, and layout components.

Import:

import Image from "next/image";

## Implementation requirements

- Provide meaningful `alt` text for informative images.
- Use `alt=""` for decorative images.
- Specify `width` and `height` for fixed-size images, or use `fill` when appropriate.
- When using `fill`, ensure the parent container has appropriate positioning and dimensions.
- Use `sizes` for responsive images when appropriate.
- Configure remote image sources according to the project's Next.js configuration.
- Do not introduce another image library for UI rendering without an explicit requirement.

## Version compatibility

- Read the installed Next.js Image documentation under `node_modules/next/dist/docs/`.
- Use APIs supported by the installed version.
- Do not assume that examples from another Next.js version are compatible.
