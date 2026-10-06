# Executive Dashboarding

Community bank **Balanced Scorecard** executive dashboards — monitor objectives against plan for board and L1 leadership.

**GitHub:** [tbaldwin-jh/jh-balanced-scorecard](https://github.com/tbaldwin-jh/jh-balanced-scorecard)

## Problem & value

| | |
|---|---|
| **Problem** | Executives lack a single, objective-driven view that shows whether the institution is on track — without operational overload. |
| **Value** | Faster strategic decisions, asset-based planning, and a reusable BSC framework tied to Capstone KPIs and L1 proving metrics. |

## Open these first

**L1 Balanced Scorecard (six reports).** Riverbend Community Bank demo; Bank / CU toggle; Month / Quarter / YTD / vs prior year; sample as-of 31 Jul 2026.

| File | Purpose |
|------|---------|
| [`l1/l1_1_enterprise_strategy.html`](./l1/l1_1_enterprise_strategy.html) | **L1-1 Enterprise Strategy Scorecard** — home: 9 rollup tiles, exceptions, strategy map |
| [`l1/l1_2_financial.html`](./l1/l1_2_financial.html) | L1-2 Financial Performance and Earnings (CFO) |
| [`l1/l1_3_franchise.html`](./l1/l1_3_franchise.html) | L1-3 Customer / Member Franchise (CMO) |
| [`l1/l1_4_risk_capital.html`](./l1/l1_4_risk_capital.html) | L1-4 Balance Sheet, Risk and Capital (CRO) |
| [`l1/l1_5_process.html`](./l1/l1_5_process.html) | L1-5 Internal Process and Growth Execution (COO) |
| [`l1/l1_6_people.html`](./l1/l1_6_people.html) | L1-6 People and Organizational Capacity (CHRO) |
| [`l1/l1_shared.js`](./l1/l1_shared.js) / [`l1/l1_shared.css`](./l1/l1_shared.css) | Shared sample-data engine and chrome (39 proving metrics) |
| [`l1/charter.html`](./l1/charter.html) | Phase 1 charter (HTML) |
| [`l1/planning.html`](./l1/planning.html) | Planning workspace entry |
| [`l1/PHASE1_CHARTER_AND_OBJECTIVES.md`](./l1/PHASE1_CHARTER_AND_OBJECTIVES.md) | Sponsor brief, peer band, objectives (markdown source) |
| [`l1/L1_REPORT_DATA_DICTIONARY.md`](./l1/L1_REPORT_DATA_DICTIONARY.md) | Metric definitions and report map |

### JH Connect L1 suite (Jack Henry–informable metrics)

Same layout and behavior as `l1/`, with **31 metrics** Jack Henry can inform (8 non-informable tiles removed). Jack Henry logo in the top bar.

| File | Purpose |
|------|---------|
| [`l1_jhconnect/l1_1_enterprise_strategy_JHConnect.html`](./l1_jhconnect/l1_1_enterprise_strategy_JHConnect.html) | L1-1 JH Connect |
| [`l1_jhconnect/l1_2_financial_JHConnect.html`](./l1_jhconnect/l1_2_financial_JHConnect.html) | L1-2 JH Connect |
| [`l1_jhconnect/l1_3_franchise_JHConnect.html`](./l1_jhconnect/l1_3_franchise_JHConnect.html) | L1-3 JH Connect |
| [`l1_jhconnect/l1_4_risk_capital_JHConnect.html`](./l1_jhconnect/l1_4_risk_capital_JHConnect.html) | L1-4 JH Connect |
| [`l1_jhconnect/l1_5_process_JHConnect.html`](./l1_jhconnect/l1_5_process_JHConnect.html) | L1-5 JH Connect |
| [`l1_jhconnect/l1_6_people_JHConnect.html`](./l1_jhconnect/l1_6_people_JHConnect.html) | L1-6 JH Connect |
| [`.cursor/plans/jh_l1_data_coverage_e6f2a73c.plan.md`](./.cursor/plans/jh_l1_data_coverage_e6f2a73c.plan.md) | Which L1 metrics JH can / cannot inform |

### Demo notes & source docs

| File | Purpose |
|------|---------|
| [`docs/L1_Executive_Dashboard_Suite_Demo_Notes.docx`](./docs/L1_Executive_Dashboard_Suite_Demo_Notes.docx) | Master L1 demo script |
| [`docs/L1_Executive_Dashboard_Suite_Demo_Notes_Bank.docx`](./docs/L1_Executive_Dashboard_Suite_Demo_Notes_Bank.docx) | Bank-focused demo notes |
| [`docs/L1_Executive_Dashboard_Suite_Demo_Notes_Credit_Union.docx`](./docs/L1_Executive_Dashboard_Suite_Demo_Notes_Credit_Union.docx) | Credit-union-focused demo notes |
| [`docs/Key Metrics within Capstone Thesis.ipynb`](./docs/Key%20Metrics%20within%20Capstone%20Thesis.ipynb) | Capstone KPI summary |
| [`docs/objective-trend-scorecard.canvas.tsx`](./docs/objective-trend-scorecard.canvas.tsx) | Cursor canvas — objective input + trends |
| [`docs/Metric-Analysis-Chart-JHAKnow`](./docs/Metric-Analysis-Chart-JHAKnow) | JHAKnow / core metric coverage chart (bank) |

### Data & CU coverage

| File | Purpose |
|------|---------|
| [`data/ARCU_SYMRAW_METRIC_COVERAGE.md`](./data/ARCU_SYMRAW_METRIC_COVERAGE.md) | Which L1 metrics SymRaw / ARCU can support |
| [`data/SymRaw.bak`](./data/SymRaw.bak) / [`data/SymAnalytics.bak`](./data/SymAnalytics.bak) | Local CU database backups for inventory (not in git if large) |
| [`tools/symraw/`](./tools/symraw/README.md) | Docker restore + object inventory scripts |

### Archive mockups (superseded by L1)

Earlier HTML monitors kept for reference:

| File | Purpose |
|------|---------|
| [`archive mockups/community_bank_president_strategic.html`](./archive%20mockups/community_bank_president_strategic.html) | President strategic — 7 franchise KPIs, period pills, gauges |
| [`archive mockups/community_fi_objective_monitor.html`](./archive%20mockups/community_fi_objective_monitor.html) | Bank / CU combined Capstone monitor |
| [`archive mockups/community_fi_working_monitor.html`](./archive%20mockups/community_fi_working_monitor.html) | Working session — exceptions, sticky drill, Definitions |
| [`archive mockups/community_bank_objective_monitor.html`](./archive%20mockups/community_bank_objective_monitor.html) | Planning: edit objectives and targets |

Open `.html` files in a browser (no build step). Open `.canvas.tsx` beside chat in Cursor. Repo index: [`readme.html`](./readme.html) · [`Vibe-coding-mockups-directory.ipynb`](./Vibe-coding-mockups-directory.ipynb).

## Balanced Scorecard perspectives (L1 map)

1. **Learning & Growth** (leading) — People / L1-6  
2. **Internal Process** (leading) — Process & production / L1-5  
3. **Customer / Member** (leading) — Franchise / L1-3  
4. **Financial** (lagging) — L1-2  
5. **Risk / Capital** (constraint) — L1-4  

Enterprise strategy (L1-1) rolls up the five L1 reports.

## Drill-down (max 3 levels on L1 tiles)

1. **KPI & gaps** — vs plan, vs peer median, vs prior year; close-the-gap narrative  
2. **Trend & peers** — multi-period trend with peer line; named peer table  
3. **Drivers & action** — why it moved; named owner and due date (plus branch/associate L2 where modeled)

## Related package

Research, planning UIs, metric catalog, and BigQuery seed: [`jhbi_balanced_scorecard/`](./jhbi_balanced_scorecard/) — start with [`docs/PRODUCT_OVERVIEW.md`](./jhbi_balanced_scorecard/docs/PRODUCT_OVERVIEW.md).

## Source materials (docs/)

Capstone strategic project (Word), executive dashboard research, project plans, and progress timeline live under [`docs/`](./docs/).
