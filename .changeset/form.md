---
"@radui/ui": minor
---

Add Form, a form that validates its Fields before submitting. A submit with invalid fields shows every error and focuses the first invalid field; once valid, `onFormSubmit` receives the values as an object. Pass server errors as `errors`, keyed by field name: each shows on its Field and clears when the user edits it. `validationMode` sets the default for every Field inside.
