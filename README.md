# Executive Dashboarding

Community bank **Balanced Scorecard** executive dashboards — monitor objectives against goals for board and L1 leadership.

## Problem & value

| | |
|---|---|
| **Problem** | Executives lack a single, objective-driven view that shows whether the bank is on track — without operational overload. |
| **Value** | Faster strategic decisions, asset-based planning, and a reusable BSC framework tied to Capstone KPIs. |

## Open these first

**L1 Balanced Scorecard (six reports).** Riverbend Community Bank demo; Bank / CU toggle; sample as-of 31 Jul 2026.

| File | Purpose |
|------|---------|
| [`l1/l1_1_enterprise_strategy.html`](./l1/l1_1_enterprise_strategy.html) | **L1-1 Enterprise Strategy Scorecard** — home: 9 rollup tiles, exceptions, strategy map |
| [`l1/l1_2_financial.html`](./l1/l1_2_financial.html) | L1-2 Financial Performance and Earnings (CFO) |
| [`l1/l1_3_franchise.html`](./l1/l1_3_franchise.html) | L1-3 Customer / Member Franchise (CMO) |
| [`l1/l1_4_risk_capital.html`](./l1/l1_4_risk_capital.html) | L1-4 Balance Sheet, Risk and Capital (CRO) |
| [`l1/l1_5_process.html`](./l1/l1_5_process.html) | L1-5 Internal Process and Growth Execution (COO) |
| [`l1/l1_6_people.html`](./l1/l1_6_people.html) | L1-6 People and Organizational Capacity (CHRO) |
| [`l1/PHASE1_CHARTER_AND_OBJECTIVES.md`](./l1/PHASE1_CHARTER_AND_OBJECTIVES.md) | **Charter documentation** (sponsors, peer band, this year’s objectives). Not on the L1 chrome — open from here. |
| [`l1/ARCU_SYMRAW_METRIC_COVERAGE.md`](./l1/ARCU_SYMRAW_METRIC_COVERAGE.md) | CU: which L1 metrics SymRaw/ARCU can support (from `SymRaw.bak` scope) |

### Working and planning monitors

| File | Purpose |
|------|---------|
| [`community_bank_president_strategic.html`](./community_bank_president_strategic.html) | President strategic dashboard — 7 franchise KPIs, period pills, gauges, YoY vs peer |
| [`community_fi_objective_monitor.html`](./community_fi_objective_monitor.html) | Bank / CU combined monitor — Capstone KPIs (not the L1 home; do not enlarge) |
| [`community_fi_working_monitor.html`](./community_fi_working_monitor.html) | Working-session layout — exceptions, sticky drill, Definitions tab |
| [`executive_bsc_dashboard.html`](./executive_bsc_dashboard.html) | Earlier executive dashboard — strategy map, hero KPIs, 3-level drill-down |
| [`community_bank_objective_monitor.html`](./community_bank_objective_monitor.html) | Planning: set / edit objectives and targets |
| [`community_bank_objective_aggregates.html`](./community_bank_objective_aggregates.html) | Aggregate visuals — status mix, perspective roll-ups, attainment ranking |
| [`objective-trend-scorecard.canvas.tsx`](./objective-trend-scorecard.canvas.tsx) | Cursor canvas — objective input + trends |

Open the `.html` files in a browser (no build step). Open `.canvas.tsx` beside chat in Cursor.

## Balanced Scorecard perspectives

1. **Learning & Development** (leading) — Emplify, turnover, skills  
2. **Internal Process** (leading) — Efficiency, commercial loan SLA, teller SLA  
3. **Customer** (leading) — CSI, retention, channel usage  
4. **Financial** (lagging) — ROA, NOI, deposits, loans  

## Drill-down (max 3)

1. **Status** — actual vs target + trend  
2. **Drivers** — top offenders / influencing factors  
3. **Snapshot** — detail for leadership conversation  

## Related package

Deeper research, planning UIs, metric catalog, and BigQuery seed live in [`jhbi_balanced_scorecard/`](./jhbi_balanced_scorecard/).

## Source materials

- Capstone Strategic Project (anonymized) — BSC framework & targets  
- Executive dashboard notes — audience tiers, loan/deposit priorities, decline flags  
- `Key Metrics within Capstone Thesis.ipynb` — KPI summary  
