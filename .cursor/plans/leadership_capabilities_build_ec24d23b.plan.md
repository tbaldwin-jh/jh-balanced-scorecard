---
name: Leadership Capabilities Build
overview: Add exception briefing, a charter-aware strategy map, and a third Drivers & action drill to the combined Bank/CU monitor — no new KPI cards, original bank monitor unchanged.
todos:
  - id: exception-strip
    content: Add tab-scoped exception strip (off-track + at-risk) above tabs; click opens drill
    status: completed
  - id: strategy-map
    content: Add charter-aware strategy map (4 BSC boxes + Risk rail); click filters perspective
    status: completed
  - id: drivers-action-drill
    content: Add 3rd drill Drivers & action with sample drivers/action on all 17 bank and CU metrics
    status: completed
isProject: false
---

# Build leadership capabilities (no new KPIs)

Follow the advice in the leadership-gaps plan: **do not add NIM, core mix, AMR, or any other cards.** Edit only [`community_fi_objective_monitor.html`](c:\Users\TBaldwin\OneDrive - Jack Henry\Desktop\Executive Dashboarding\community_fi_objective_monitor.html). Reuse visual language from [`executive_bsc_dashboard.html`](c:\Users\TBaldwin\OneDrive - Jack Henry\Desktop\Executive Dashboarding\executive_bsc_dashboard.html). Leave [`community_bank_objective_monitor.html`](c:\Users\TBaldwin\OneDrive - Jack Henry\Desktop\Executive Dashboarding\community_bank_objective_monitor.html) alone.

Meeting sequence after this build:

```text
5 seconds   Exception strip (off-track + at-risk only)
1 click     Strategy map → filters the tab
2nd click   1 · KPI & gaps (already there)
3rd click   3 · Drivers & action (new; keep 2 · Trend & peers)
```

Skip period context and definition lock (out of this scope).

## 1. Exception briefing

Insert `#exceptionStrip` **between the hero and the tabs** so it is the first thing leadership sees.

- Rows = objectives where `statusOf` is `bad` or `watch`, scoped to the **active tab** (All = whole scorecard)
- Each row: metric, badge, owner, `gapLabel` vs target, ahead/behind peer
- Click a row → same as clicking a card (`openDetail`, `drillLevel = 1`)
- If none: one line “All objectives on this tab are on track”
- Keep the existing count tiles in the hero; do not hide the 17 cards

## 2. Strategy map

Add a compact cause-and-effect row **under the exception strip, above tabs**. Copy `.strategy-map` / `.map-card` / pulse-by-status from the executive dashboard — four Kaplan–Norton boxes plus **Risk as a constraint rail**, not a fifth equal earnings box.

Charter-aware chain (from [`BANK_VS_CU_FRAMEWORK.md`](c:\Users\TBaldwin\OneDrive - Jack Henry\Desktop\Executive Dashboarding\jhbi_balanced_scorecard\docs\BANK_VS_CU_FRAMEWORK.md)):

- Bank caption: `L&D → Process → Customer → Financial (shareholder value) · Risk constrains`
- CU caption: `L&D → Process → Member → Financial (member value + net worth) · Risk constrains`
- One sample causal line under the map, swapped with charter (bank: credit quality → provision → ROA; CU: efficiency → capital retention → net worth)

Each map card: perspective name, count on-track, pulse color from that perspective’s worst status. Click sets `activePerspective` (same as tabs). Do not turn the map into another KPI grid.

## 3. Third drill: drivers + next action

In `#detailPanel`, add a third level button. Cap remains **3** (`openDetail` currently forces `drillLevel > 2` down to 2 — raise that to 3).

- `1 · KPI & gaps` — unchanged
- `2 · Trend & peers` — unchanged
- `3 · Drivers & action` — new: 2–4 drivers + one named action (what / owner / due)

Add sample fields on **both** `bankObjectives` and `cuObjectives` (all 17 ids, charter wording):

```js
drivers: [{ title, meta }, ...],
action: { what: "...", owner: "...", due: "Sep 2026" }
```

Reuse `.driver-list` from the executive dashboard. Pull driver copy from that file for the original 13 where it exists; write CU-specific drivers for Member / net worth / LTS / FPR peers. Risk four get ALCO/credit actions (e.g. IRR: “Stay inside −8% NII floor · ALCO · monthly”).

`createObjective`: stub one driver (“Newly added — bind drivers in planning”) and `action: { what: "TBD", owner, due: "TBD" }`. No fourth drill level. No persist/workflow.

## Out of scope

- New KPI cards
- As-of / YTD / prior year
- Formula tooltips
- Edits to the original bank monitor, advice plan file, or catalog
