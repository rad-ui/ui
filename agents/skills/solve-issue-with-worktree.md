Work on this issue in an isolated git worktree by default.

Instructions:
- Start by reading `knowledge/MASTER_LIST.md` and treat it as the canonical project guidance.
- Create or use a dedicated git worktree for this issue before making changes.
- Do all work only inside that worktree.
- Investigate the issue, implement the fix, run relevant tests/validation, and keep the scope limited to this issue only.
- Do not revert, overwrite, or clean up unrelated changes in the main worktree or other worktrees.
- Commit the changes with a clear commit message.
- Push the branch and open a PR against `main`.
- In the PR, include:
  - what changed
  - why
  - tests/validation run
  - any known risks or follow-ups
- If blocked, stop and report the blocker clearly instead of guessing.

Issue to work on:
<issue link or issue description>

Defaults:
- Base branch: `main`
- Branch name: `dev/<short-issue-slug>`
- Worktree location: choose a sensible sibling directory for the repo worktree if not specified

Return at the end:
- worktree path
- branch name
- commit sha
- PR URL
- short summary of the fix
- tests/validation run
