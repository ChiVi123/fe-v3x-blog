
# Type Definitions

## Directory conventions

- Shared and reusable type definitions SHOULD be stored in `src/types/`.
- Organize type definitions by domain or feature when appropriate.
- Avoid placing unrelated type definitions in a single file.
- Do not create separate type files for trivial types that are only used locally unless doing so improves readability or maintainability.

## Type design

- Prefer explicit, meaningful type names.
- Use `type` or `interface` according to the project's existing conventions and the requirements of the type.
- Reuse existing types instead of duplicating equivalent definitions.
- Avoid `any` when a safer type can be defined.
- Keep API contracts, domain models, and UI-specific types distinguishable when the project requires those boundaries.

## Example structure

src/types/
  api.ts
  product.ts
  user.ts

These filenames are examples, not mandatory files.

## Before defining a type

1. Check whether an equivalent type already exists.
2. Determine its scope and domain.
3. Place shared types in `src/types/`.
4. Keep truly local types near their usage when appropriate.
5. Update dependent imports and verify TypeScript compatibility.
