
# Server and Client Components

## Page entry points

- Every `page.tsx` file under `src/app/` MUST be a Server Component.
- Do not add the `"use client"` directive to `src/app/**/page.tsx`.
- Keep page entry points server-rendered and use them to compose the page, load data, and pass serializable props to child components.

## Client Components

- Use Client Components only when browser-side interactivity or client-only React features are required.
- Place interactive UI in appropriate components under `src/components/feature/[page]/` or `src/components/shared/`.
- Add `"use client"` only at the component boundary that requires it.
- Do not convert an entire page to a Client Component when only a small part needs client-side behavior.

## Data and component boundaries

- Prefer fetching data in Server Components when appropriate.
- Pass serializable data from Server Components to Client Components.
- Keep secrets, private credentials, and server-only logic out of Client Components.
- Keep event handlers and browser-only APIs inside Client Components.

## Before implementation

- Check the installed Next.js documentation in `node_modules/next/dist/docs/`.
- Follow the APIs supported by the installed Next.js version.
- Verify that imports and component boundaries respect server/client restrictions.
