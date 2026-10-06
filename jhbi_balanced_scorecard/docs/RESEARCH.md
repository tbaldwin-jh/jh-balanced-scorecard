# Research notes: community bank balanced scorecard

Research and design conclusions from the scorecard side-track (Aug 2026). Intended as the brief when this folder becomes its own repo.

## Why a balanced scorecard for a community bank

Community bank leadership needs more than P&L snapshots. A usable scorecard balances:

| Perspective | Intent |
|-------------|--------|
| Financial | Sustainable earnings (NIM, efficiency, ROA, loan growth) |
| Customer / franchise | Sticky relationships and funding (core deposits, products/HH, digital) |
| Risk | Stay open and trusted (criticized, past due, wholesale, BSA) |
| Capability | Execution speed (loan decision cycle) |

Competitors in the data/platform conversation (warehouse stacks, big-cloud analytics) are out of scope for this pack. The pack is about **FI operating metrics** a president and ALCO already understand.

## The 12 executive KPIs

| # | Metric | Formula (locked language) |
|---|--------|---------------------------|
| 1 | NIM | `(Interest Income - Interest Expense) / Average Earning Assets` |
| 2 | Efficiency | `Noninterest Expense / (NII + Noninterest Income)` |
| 3 | ROA | `Net Income / Average Total Assets` |
| 4 | Loan growth | `(Ending Gross Loans - Beginning Gross Loans) / Beginning Gross Loans` |
| 5 | Core deposit growth / mix | Growth on core; Mix = Core / Total Deposits (core ≈ DDA+Savings+MMDA) |
| 6 | Products per household | `Active product relationships / Households` |
| 7 | Digital active | `Digital active users / Eligible customers` |
| 8 | Criticized assets | `(SM + Substandard + Doubtful + Loss) / Gross Loans` |
| 9 | Past due 30+ | `UPB ≥ 30 DPD / Gross Loans` |
| 10 | Wholesale reliance | `Wholesale funding / Total liabilities` |
| 11 | BSA alert aging | `Sum(age days) / Open alerts` (+ aged >30 share) |
| 12 | Decision cycle | `Median(decision - application received)` |

### Formatting rules that mattered in QA

- Store rates as percent points (`3.42` means 3.42%).  
- Display gaps in **bps** for bankers (`round(delta * 100)`).  
- When \|gap\| ≥ 100 bps, show **pts** (e.g. efficiency 1.80 pts).  
- Always show **vs Target** and **vs Peer**, not peer-only.  
- Respect `higherIsBetter` (efficiency, criticized, past due, wholesale, BSA age, cycle time are lower-is-better).

Example (Jul 2026 sample):

| Metric | Actual | Target | Peer | vs Target | vs Peer |
|--------|--------|--------|------|-----------|---------|
| NIM | 3.42% | 3.50% | 3.35% | Behind 8 bps | Ahead 7 bps |
| ROA | 0.98% | 1.05% | 0.95% | Behind 7 bps | Ahead 3 bps |
| Efficiency | 61.8% | 60% | 63.5% | Behind 180 bps | Ahead 170 bps |

## Actual / Target / Peer

Three columns, not two:

- **Actual** – what the bank did  
- **Target (objective)** – board / ALCO plan or limit  
- **Peer** – external bar (sample: Assets $1B–$3B median)  

Peers **pressure-test** the plan; they do not replace the bank target. The executive UI shows Actual against both.

## Planning vs monitoring

| Mode | Job | Primary UI |
|------|-----|------------|
| Planning | Enter objectives, bind metrics, set targets, attach peers, prove calcs | Planning workspace + Add Objective |
| Monitoring | Read Actual vs Target vs Peer, drill drivers | Executive scorecard |

### Planning control loop

1. Enter / refresh objectives by BSC perspective (owner, intent).  
2. Bind metric(s); lock formula + inputs.  
3. Set plan target or limit + cadence.  
4. Attach peer set, statistic, as-of date.  
5. Calc QA: scorecard engine vs source-grain replay must match.  
6. Publish into executive scorecard refresh.

Calc QA is the gate. Do not publish until formula, grain, annualization, and peer definition agree for the same as-of date.

## ROA drill research (sample)

For the Jul 2026 demo:

- Actual ROA 0.98% ≈ $21.8M NI / $2.22B avg assets  
- Objective 1.05% needs ≈ $23.3M NI at flat assets (~$1.5M gap)  
- Visual pack on the executive HTML: **trend** (Actual vs Peer + Objective line), **tornado** (bps vs objective / peer), **bullet** (Actual between Peer and Objective)

## Data model research (BigQuery)

Star schema optimized for Power BI:

- Dimensions: date, org, perspective, portfolio, metric, objective  
- Bridge: objective ↔ metric  
- Domain monthly facts: financial, franchise, risk, ops  
- Presentation fact: `fact_scorecard_kpi_monthly` (precomputed tiles)  
- View: `vw_objective_kpi_monthly` (flatten for Power BI)

Dual grain on purpose: domain facts for drill math; KPI fact for fast tiles.

Seed: one FI (`org_key = 1`), 13 months (2025-07 through 2026-07), 12 metrics × 13 = 156 KPI rows, 11 sample objectives.

**Not yet in seed:** `peer_value` on the KPI fact (peer lives in HTML/canvas demos; SQL peer column still deferred).

## Audiences / pages

| Audience | Emphasis |
|----------|----------|
| Bank president / CEO | All 12, dual variance, ROA drill |
| Board | Capital, earnings, franchise, risk (fewer ops tiles) |
| Lending | Growth, criticized, past due, cycle time |
| Ops / digital | Efficiency, digital, BSA, cycle time |

## Bank vs credit union expansion (Aug 2026)

Community banks and credit unions share NIM, efficiency, ROA, credit, liquidity, and BSA math, but diverge on:

- **Stakeholder math** – shareholders vs member value / patronage  
- **Capital** – Tier 1 / CBLR vs net worth ratio (earnings-only capital build)  
- **Franchise depth** – products per household vs average member relationship  
- **Commercial constraints** – CRE concentration vs MBL statutory cap  
- **Peer bars** – UBPR vs FPR (CU efficiency ~79% median vs bank ~63% in Q1 2026 illustrative baselines)

See [`BANK_VS_CU_FRAMEWORK.md`](./BANK_VS_CU_FRAMEWORK.md), [`BSC_IMPLEMENTATION_GUIDE.md`](./BSC_IMPLEMENTATION_GUIDE.md), and [`../data/metric_catalog.json`](../data/metric_catalog.json).

## Open follow-ups for the new project

- Add `peer_value` / `peer_label` to BigQuery KPI fact and regenerate seed  
- Wire HTML demos to live BigQuery (or export parquet for Import mode)  
- Real `.pbix` starter file  
- Multi-FI tenancy beyond `dim_org` (`charter_type` for bank vs CU)  
- Auth and persistence for Add Objective (today: browser `localStorage` only)  
- Definition governance: promote `data/metric_catalog.json` to a metric dictionary service  
- CU sample seed FI parallel to Riverbend  

## Sources of truth in this folder

- Formulas and sample numbers: executive HTML + BigQuery seed  
- Cross-charter dictionary: `data/metric_catalog.json`  
- Planning UX: planning HTML + add-objective HTML  
- Decisions log: [`DECISIONS.md`](./DECISIONS.md)  
