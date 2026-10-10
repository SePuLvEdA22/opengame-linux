# Agent Skills (OpenCode)

This project uses skills installed globally under `~/.config/opencode/skills/` (with shared references in `~/.config/opencode/references/`).

Stack:

## Core Rules

- If a task matches a skill, invoke it with the `skill` tool before acting.
- Skills are located in `~/.config/opencode/skills/<skill-name>/SKILL.md`.
- Follow the skill workflow strictly; do not partially apply it.
- Never skip required steps such as spec, plan, or test when a skill demands them.

## Intent → Skill Mapping

Map the user's intent to the matching skill automatically:

- Feature / new functionality → `spec-driven-development`, then `incremental-implementation` and `test-driven-development`
- Planning / breakdown → `planning-and-task-breakdown`
- Bug / failure / unexpected behavior → `debugging-and-error-recovery`
- Code review → `code-review-and-quality`
- Refactoring / simplification → `code-simplification`
- API or interface design → `api-and-interface-design`
- UI work (components, pages, layouts in `src/`) → `frontend-ui-engineering`
- Security (forms, inputs, deps) → `security-and-hardening`
- Performance (Core Web Vitals, images, CSS/JS) → `performance-optimization`
- Quality bar / standards → `constraint-driven-development`
- CI, build, deploy (`astro build`, pipelines) → `ci-cd-and-automation`
- Docs / ADRs → `documentation-and-adrs`
- Release / launch checklist → `shipping-and-launch`
- Commits, branches, PRs, releases → `git-workflow-and-versioning`
- Verify against official docs first → `source-driven-development`
- High-stakes / uncertain decision → `doubt-driven-development`
- Browser verification (DOM, console, network) → `browser-testing-with-devtools`
- Production behavior / logging → `observability-and-instrumentation`
- Vague idea / need to refine concept → `idea-refine`
- Ambiguous request / need interview → `interview-me`
- Session setup / degrading output / context config → `context-engineering`
- Remove old code / migrate (APIs, schema) → `deprecation-and-migration`
- Decide which skill applies → `using-agent-skills`

## Execution Model

For every request:

1. Determine if any skill applies (even a small chance).
2. Load the skill with `skill({ name: "<skill-name>" })`.
3. Follow the skill workflow exactly.
4. Only proceed to implementation once required steps are complete.
