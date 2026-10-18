
# Next.js Link Rules

## Mandatory navigation component

- ALWAYS use `Link` from `next/link` for internal navigation within the Next.js application.
- Do not use a native HTML `<a>` element for internal navigation.
- Import `Link` explicitly:

  `import Link from "next/link";`

## Internal navigation

- Use `Link` for navigation between internal pages and routes.
- Use `Link` for internal navigation in feature components, shared components, and layout components.
- Preserve existing query parameters, dynamic route segments, and navigation behavior when modifying links.
- Reuse existing route conventions and helpers when available.

## External links

- Native `<a>` elements MAY be used for external URLs, such as links to other websites.
- For external links that open a new tab, use `target="_blank"` and `rel="noopener noreferrer"`.
- Do not use `Link` solely to replace native anchors for external navigation unless required by the installed Next.js version or project conventions.

## Non-navigation interactions

- Use `<button>` for actions that perform operations rather than navigate to another URL.
- Do not use `Link` as a substitute for buttons.
- Do not use clickable `<a>` elements without a meaningful navigation destination.

## Before implementation

- Check existing routing conventions and the installed Next.js documentation.
- Verify that links navigate to the intended destination and preserve the expected behavior.
