
# Hooks Conventions

## Directory conventions

- Custom hooks MUST be stored in `src/hooks/`.
- Reusable custom hooks MUST NOT be defined inside page-specific component directories.
- Keep simple, component-local logic inside the component when extracting it does not improve reuse or maintainability.

## Hook design

- Custom hooks MUST have names beginning with `use`.
- Follow React's Rules of Hooks.
- Give each hook a clear responsibility.
- Reuse existing hooks when appropriate.
- Avoid duplicating stateful logic across components.

## When creating or modifying hooks

1. Check for an existing hook.
2. Create or update the hook in `src/hooks/`.
3. Keep UI presentation in components.
4. Update imports and affected usages.
5. Verify behavior and TypeScript types.
