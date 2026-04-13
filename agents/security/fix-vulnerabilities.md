You are working in this repo’s local clone. Goal: one integration branch that brings all dependency and security-related updates together so we can merge confidently.

Scope

Link to all open PRs - <https://github.com/rad-ui/ui/pulls>

Treat open PRs from Dependabot, Snyk, Renovate, and similar automated dependency/security bots as the source of truth for what to bump (versions, packages, and which workspaces: root vs subfolders with their own package.json).
Apply equivalent changes on a single new branch off the appropriate base (usually main), instead of merging many small PRs one by one—unless I say otherwise.
Requirements

Inventory: Summarize which packages/workspaces those bot PRs target and the version bumps they propose (group by root vs subproject).

Implement: Update package.json (and lockfiles) consistently so dependency trees are up to date and aligned with those bumps; resolve conflicts and avoid partial upgrades that leave inconsistent peers.

Verify: Run the project’s install, build, lint, and test commands (whatever this repo documents in package.json scripts / CI) until they pass for all relevant workspaces.

Safety: Run npm audit / pnpm audit / yarn npm audit (whichever the repo uses) and address high/critical issues where reasonable; note anything that needs a breaking major or cannot be fixed without product decisions.
Deliverable: Short summary of what changed, remaining risks, and suggested PR title/description. Do not change unrelated code or docs unless required for the upgrade.
Constraints

Prefer minimal, focused diffs; no drive-by refactors.
If gh or network access to GitHub fails, infer from package.json + lockfiles + audit and still produce a coherent upgrade plan.
Start only when I say “go” (or equivalent).

Once all the relevant changes are done, provide a summary telling the user which PRs can be closed, which are pending, and which were not addressed, including relevant details and any blockers.
