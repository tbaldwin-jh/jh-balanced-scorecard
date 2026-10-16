# HR people-metrics → L1-6 mapping

Reference: `people-metrics (HR).png` (24 tiles). L1-6 proving tiles in [`l1_shared.js`](./l1_shared.js): **six** — `engagement`, `turnover`, `teller_to`, `ttf`, `training`, `learning_paths` (succession + commercial skill / board hours merged).

**Max drill is 3.** Tile is entry only. Drill 1 = plan check + 1–2 leading signals. Drill 3 = full HR lists + L2 grain. Definitions is a tab, not a drill.

| Code | D1 | D3 | Catalog |
|------|----|----|---------|
| **D1** | Preview on drill 1 (leading signals) | | |
| **D3** | | Full drivers / `WHERE_GRAIN` | |
| **Catalog** | | | Definitions caption only — not a tile |

## 24 HR tiles

| HR # | HR metric | L1-6 home | D1 | D3 | Catalog |
|------|-----------|-----------|----|----|---------|
| 1 | Headcount | `turnover` / `ttf` | Denominator line | Same | — |
| 2 | Headcount by gender | — | — | — | DEI appendix |
| 3 | Occupancy rate | — | — | — | Out of scope |
| 4 | % female in senior roles | — | — | — | DEI appendix |
| 5 | Hires | `ttf` | — | Hires vs plan (82, −1.5%) | — |
| 6 | Offer acceptance rate | `ttf` | **67%** | Comp band | — |
| 7 | Avg time to fill | `ttf` | — (same tile) | Critical-role scope | — |
| 8 | Decline reasons | `ttf` | **Top: Salary 56.4%** | Full list | — |
| 9 | Terminations | `turnover` | Regretted vs total · **3 LATL** | 54 total as context | — |
| 10 | Termination reasons | `turnover` | **Top: More money** | Treemap list | — |
| 11 | Termination by department | `turnover` | — | Role split: tellers / bankers / managers (not extra tiles) | — |
| 12 | Tenure at exit | `teller_to` | **&lt;1 yr: 20** | Full bands | — |
| 13 | Total absenteeism | — | — | — | Catalog |
| 14 | Absence reasons | — | — | — | Catalog |
| 15 | Annual leave remaining | — | — | — | Catalog |
| 16 | Cost of remaining leave | — | — | — | Catalog |
| 17–20 | Performance buckets | `engagement` | Participation + Questionable 79 | Bottom-quartile teams | Not four tiles |
| 21 | Training cost / person | — | — | — | Catalog (L1 uses completion %) |
| 22 | Completed sessions | `training` | **33 sessions** | Volume driver | — |
| 23 | Attention rate | — | — | — | Catalog (not Emplify) |
| 24 | Training type mix | `training` | — | Internal 36% / External 64% | — |

## L1-6 tiles with no HR board equivalent

| Metric | Why it stays |
|--------|----------------|
| `engagement` | Emplify / engaged band — HR board uses performance buckets |
| `teller_to` | Frontline job-family leak — HR board is org-wide tenure |
| LATL (Least Affordable to Lose) | Client designation on `turnover` drill 1 / 3 — not a seventh people tile |
| `learning_paths` | Unified succession + credentials (was `succession` + `skill_board`) |

## L1-1

Only **`engagement`** rolls to the nine-tile board pack.
