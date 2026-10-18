
# Utilities Conventions

## Directory conventions

- Utility functions MUST be stored in `src/lib/`.
- Small, simple utility functions MAY be defined in `src/lib/utils.ts`.
- Functions MUST be organized and presented clearly by topic.
- Complex utilities or utilities belonging to distinct domains SHOULD be placed in dedicated files under `src/lib/`.

## Organization by topic

- Group related functions together.
- Use clear function names and descriptive types.
- Separate unrelated concerns instead of accumulating unrelated logic in `utils.ts`.
- Move a group of utilities into a dedicated module when the group becomes complex or difficult to navigate.

Example structure:

src/lib/
  utils.ts
  date.ts
  number.ts
  format.ts
  validation.ts

These filenames are examples; choose them according to actual project requirements.

## Design requirements

- Keep utility functions focused and predictable.
- Prefer pure functions when practical.
- Avoid unnecessary dependencies and side effects.
- Do not duplicate existing utility logic.
- Export functions explicitly when they are intended for reuse.

## Before creating a utility

1. Search for an existing implementation.
2. Determine the function's domain and complexity.
3. Choose `utils.ts` or a dedicated module.
4. Define appropriate input and return types.
5. Update imports and verify affected code.
