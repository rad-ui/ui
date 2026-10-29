---
"@radui/ui": minor
---

Table: redesigned default styling and new layout props. The Clarity recipe now uses neutral surface, border and text aliases (a framed panel, a header band with a bottom border, row dividers, hover highlight, tabular figures) instead of the accent scale, so it renders fully whatever the Theme accent is. New props: `align` (`start` | `center` | `end`) on `Table.Cell` and `Table.ColumnCellHeader`, and `size` (`small` | `medium` | `large`) and `variant` (`surface` | `ghost`) on `Table.Root`.
