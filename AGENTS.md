<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Ignore routine debugging and unverified changes. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Keep a qualifying candidate through the reporting pass even if you resolve or work around it. A successful fix changes the report outcome; it does not erase the friction that qualified it.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `node node_modules/next/dist/bin/next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->

<!-- BEGIN:project-coding-rules -->
## Project Coding Rules

Before implementing or modifying code, read the relevant documentation in `docs/`.

### Documentation references

- Component organization and layouts: Read [`docs/component-architecture.md`](docs/component-architecture.md) when creating, moving, or modifying components.
- Custom hooks: Read [`docs/hooks-conventions.md`](docs/hooks-conventions.md) when working with hooks.
- Next.js Image: Read [`docs/nextjs-image.md`](docs/nextjs-image.md) whenever rendering images.
- Server Components: Read [`docs/server-components.md`](docs/server-components.md) when working with `src/app/**/page.tsx`, Server Components, or Client Components.
- Utilities: Read [`docs/utilities-conventions.md`](docs/utilities-conventions.md) when creating or modifying utility functions.
- Type definitions: Read [`docs/types-conventions.md`](docs/types-conventions.md) when defining or organizing types.
- Navigation and links: Read [`docs/nextjs-link.md`](docs/nextjs-link.md) when creating or modifying navigation links.
- Icons: Read [`docs/icon-conventions.md`](docs/icon-conventions.md) when selecting, creating, or modifying icons.

### General requirements

- Follow the existing project architecture and conventions.
- Keep changes scoped to the requested task.
- Reuse existing components, hooks, and utilities whenever appropriate.
- Do not introduce patterns that conflict with documented rules.
- Read the relevant documentation for the installed Next.js version before writing Next.js code.
- Update imports and references when moving files.
- Verify affected code and TypeScript types after making changes.
<!-- END:project-coding-rules -->

<!-- BEGIN:rule-precedence -->
## Rule Precedence and Conflict Resolution

### Source of truth

- Follow the user's current task requirements within the project's technical constraints.
- Follow the mandatory project rules defined in `AGENTS.md` and the applicable documentation in `docs/`.
- Follow the APIs and constraints supported by the installed framework and dependencies.
- Use the existing codebase as a reference for conventions only when they do not conflict with higher-priority requirements.

### Conflict resolution

- Do not silently ignore, override, or reinterpret conflicting rules.
- When two project documents conflict, identify the conflicting requirements and determine which document is authoritative.
- `AGENTS.md` defines the general project rules and links to detailed documentation. Detailed documentation defines the implementation conventions for its respective topic.
- If a detailed document contradicts `AGENTS.md`, do not assume either rule automatically wins. Resolve the inconsistency before proceeding with affected changes.
- Never use an API that is unsupported by the installed framework version merely because a project rule or existing code references it.
- If the conflict cannot be resolved safely, explain the conflict and ask for clarification before making the affected changes.
- When resolving a conflict, update the relevant documentation if necessary to prevent recurrence.
<!-- END:rule-precedence -->
