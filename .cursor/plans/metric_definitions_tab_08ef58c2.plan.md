---
name: Metric Definitions Tab
overview: Add a Definitions tab in the working monitor topbar. The formulas table stays hidden until that tab is selected; Monitor/Edit/Add keep the current working session.
todos:
  - id: defs-mode-ui
    content: Add Definitions mode button and hidden defs panel; hide work session when selected
    status: completed
  - id: defs-table-data
    content: Embed charter-aware formula/definition copy for all 17 metrics and render the table
    status: completed
isProject: false
---

# Metric definitions tab (hidden until selected)

Edit only [`community_fi_working_monitor.html`](c:\Users\TBaldwin\OneDrive - Jack Henry\Desktop\Executive Dashboarding\community_fi_working_monitor.html). Do not add a fourth drill. Do not put formulas on every KPI card.

## Behavior

Add **Definitions** next to Monitor / Edit / Add in the topbar.

- **Monitor / Edit / Add:** current working session (exceptions, map, cards, sticky drill). Definitions table is `hidden`.
- **Definitions:** hide `#briefing`, `#map-wrap`, `#rollup`, `#workArea`, and `#addPanel`. Show `#defsPanel` with a table of the **17 scorecard metrics** (charter-aware names).
- Bank vs CU still applies: same slots, swapped labels and formulas (Tier 1 leverage vs net worth; LTD vs LTS; CSI vs MSI; deposits vs shares; UBPR vs FPR).

“Not viewable unless selected” means the table is not on the monitor home and not a always-on card footnote.

## Table columns

| Column | Content |
|---|---|
| Metric | Card name |
| Perspective | Financial / Customer or Member / Process / Risk / L&D |
| CAMELS | C/A/M/E/L/S |
| Definition | One-sentence what it measures |
| Formula | Locked calculation text |
| Source | Inputs + UBPR vs FPR / core / ALM / survey |

Pull formulas from [`metric_catalog.json`](c:\Users\TBaldwin\OneDrive - Jack Henry\Desktop\Executive Dashboarding\jhbi_balanced_scorecard\data\metric_catalog.json) where IDs match (`roa`, `efficiency`, `tier1_leverage`, `net_worth_ratio`, `loan_to_funding`, `past_due`, `irr_sensitivity`, `retention`, `employee_turnover`). Write Capstone-consistent formulas for NOI, balances, CSI/MSI, channel usage, SLAs, and Emplify (not in the catalog under those names).

Example rows:

- Bank ROA: `Net income / average total assets` · Call Report
- CU ROA: same math; note it is capital-build fuel, graded on FPR not UBPR
- Efficiency: `Noninterest expense / (NII + noninterest income)` · never grade CU vs bank 52%
- IRR: `NII Δ under +200 bp vs ALCO −8% floor`

## Implementation

1. Add `data-mode="defs"` button in `.modes`.
2. Add `#defsPanel` (hidden by default) with a caption (“Formulas lock for this charter · sample”) and `<table id="defsTable">`.
3. Add `METRIC_DEFS.bank` / `METRIC_DEFS.cu` objects keyed by the 17 `id`s: `{ definition, formula, source }`. Metric/perspective/camels come from the live `objectives` array so Add-objective rows can append a stub row (“Bind formula in planning”).
4. Extend `setMode`: `defs` hides the work session and calls `renderDefs()`; other modes hide `#defsPanel`.
5. Charter toggle while Definitions is open re-renders the table (Bank vs CU formulas).

No catalog fetch (static HTML). No changes to [`community_fi_objective_monitor.html`](c:\Users\TBaldwin\OneDrive - Jack Henry\Desktop\Executive Dashboarding\community_fi_objective_monitor.html) unless you later want the same tab on the stacked page.
