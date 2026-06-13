# Spell Check And Readability Review

Use this skill when a change introduces or modifies user-facing copy, code
comments, documentation, stories, examples, changelog text, issue templates, or
public API names that humans need to read and trust.

## Source Of Truth

Start with [Knowledge Master List](../../knowledge/MASTER_LIST.md).

Then inspect only the files relevant to the current task and review the actual
diff before making edits. This workflow is intentionally manual. Do not add new
spell-check infrastructure, dependencies, CI jobs, or config files unless the
task explicitly asks for them.

## Goal

Improve readability and catch spelling mistakes in the touched scope without
creating noisy wording churn or changing stable API contracts casually.

## What To Review

Prioritize:

- Documentation, guides, README sections, and issue or PR templates.
- Component stories, examples, demo copy, and empty states.
- Accessibility text such as labels, descriptions, helper text, and error
  messages.
- Code comments, test names, and contributor-facing scripts or instructions.
- Public API names only when a typo is clearly incorrect and the rename is
  intentional, safe, and justified.

## Review Workflow

1. Start from the diff or the narrow task scope. Do not sweep the entire
   repository unless the task explicitly asks for a broad audit.
2. Read surrounding sentences, not isolated words. Fix grammar, spelling, and
   awkward phrasing only when the result is clearly more accurate or readable.
3. Preserve product terminology, package names, code identifiers, URLs, quoted
   external text, and intentional branding even when they look unusual.
4. Be careful with technical vocabulary. Do not "correct" library terms such as
   `unstyled`, `headless`, `data-*`, `Storybook`, `TypeScript`, or component
   names that are already established in the repo.
5. If a typo appears in a private variable or test title, fix it directly. If a
   typo appears in a public export, prop, selector, data attribute, or
   documented API, treat that as an API change and only rename it when the task
   expects that level of change.

## Fix Rules

- Prefer minimal edits that preserve existing meaning.
- Do not rewrite paragraphs just to match personal style.
- Do not expand scope into tone, SEO, or marketing revisions unless the task is
  specifically about that content.
- If a sentence is ambiguous, fix the ambiguity before polishing the wording.
- Keep examples consistent with the repo's actual APIs and terminology after the
  edit.

## Helpful Checks

Use fast local searches when useful, for example:

- Search for a suspicious term with `rg`.
- Review changed prose with `git diff --word-diff`.
- Re-scan neighboring docs or examples that repeat the same phrase.

Manual judgment is the default. Tooling is optional only if it already exists in
the repo or the user explicitly asks for it.

## Verification

After edits, run the smallest checks that match the touched files.

- If only Markdown or agent docs changed, verify formatting by rereading the
  rendered structure in plain text and run `git diff --check`.
- If code comments, stories, or UI copy changed, run the narrowest relevant repo
  command from `knowledge/MASTER_LIST.md` or `package.json`.
- If a command is unnecessary or unavailable, say so explicitly in the final
  summary.

## Deliverable

Report:

- Which files or content types were reviewed.
- What wording, spelling, or readability issues were fixed.
- Whether any suspicious terms were intentionally left unchanged because they are
  public API, branding, or external language.
- Which checks were run.
