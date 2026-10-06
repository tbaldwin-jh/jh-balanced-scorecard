# BSC Implementation Guide — Community Banks & Credit Unions

Step-by-step playbook to stand up a balanced scorecard using this pack’s catalog, canvases, and planning loop.

**Related**

- Philosophy & bank vs CU differences: [`BANK_VS_CU_FRAMEWORK.md`](./BANK_VS_CU_FRAMEWORK.md)
- Metric dictionary: [`../data/metric_catalog.json`](../data/metric_catalog.json)
- Dual-mode canvas: [`../canvases/community-fi-bsc-framework.canvas.tsx`](../canvases/community-fi-bsc-framework.canvas.tsx)
- Planning workspace pattern: [`../canvases/bsc-planning-workspace.canvas.tsx`](../canvases/bsc-planning-workspace.canvas.tsx)
- Bank executive monitor pattern: [`../canvases/bank-president-scorecard.canvas.tsx`](../canvases/bank-president-scorecard.canvas.tsx)

---

## 0. Preconditions (week 0)

| Check | Why |
|-------|-----|
| Charter known (bank vs CU) | Selects capital, franchise, and peer language |
| Asset size / peer band defined | UBPR or FPR peer set |
| Executive sponsor (CEO/CFO or CEO/COO) | Prevents KPI sprawl |
| Data owners named (GL, core, LOS, AML, digital, HR) | Calc QA needs humans |
| Board / ALCO cadence known | Sets monthly vs quarterly tiles |

Deliverable: one-page charter brief (bank or CU starter pack from the framework doc).

---

## 1. Objectives (planning step 1)

Mirror the six-step loop already used in this repo:

1. Objectives  
2. Metrics  
3. Targets  
4. Peers  
5. Calc QA  
6. Publish  

For each BSC perspective, write **3–5 outcome statements** the leadership team owns this year.

Examples:

| Perspective | Bank objective | CU objective |
|-------------|----------------|--------------|
| Financial | Deliver plan ROA without stretching wholesale | Earn ROA sufficient to fund net-worth growth and member value |
| Customer | Deepen products per household | Grow average member relationship and net members |
| Internal Process | Cut median decision cycle to ≤5 days | Same-day digital onboarding; FOM adherence ≥99% |
| Learning & Growth | Credential commercial lender bench | Meet board education hour policy |
| Risk | Keep criticized ≤ limit; BSA inside SLA | Keep delinquency ≤ limit; BSA inside SLA |

**Rule:** If an objective cannot name an owner, it does not enter the scorecard.

---

## 2. Metrics (planning step 2)

1. Open [`metric_catalog.csv`](../data/metric_catalog.csv).  
2. Filter `institution_types` to `shared` plus your charter (`bank` or `credit_union`).  
3. Bind **one proving metric** per objective (optional secondary for drill).  
4. Lock for each metric:
   - Formula text (exactly as catalog or board-approved variant)
   - Inputs / source systems
   - Annualization / averaging method
   - Higher-is-better flag
   - CAMELS component (for risk committee mapping)

**Starter counts**

- Executive home: **12 KPIs** (see framework starter packs)  
- Full operating dictionary: up to **~40–50** (this catalog has 47)  
- Board pack: **8–15**  

Avoid publishing the entire dictionary to the president page.

---

## 3. Targets (planning step 3)

| Target type | Use when | Example |
|-------------|----------|---------|
| Plan goal | Earnings, growth, franchise | ROA 1.05%; loan growth +7% |
| Limit / ceiling | Risk | Criticized ≤4%; wholesale ≤15% |
| Band | Utilization | LTD 80–90%; LTS 75–88% |
| Floor | Capital | Net worth ≥10%; Tier 1 leverage ≥9% |

Document:

- Period (MTD / QTD / YTD / YoY)  
- Whether one-time items are excluded for management reporting  
- Who can change a target mid-year (usually ALCO / board)

CU-specific: set **efficiency and ROA** against CU peers and capital plan math, not bank “best practice” printouts.

---

## 4. Peers (planning step 4)

### Community banks

| Source | Use for |
|--------|---------|
| FDIC UBPR | ROA, NIM, efficiency, credit, capital |
| FFIEC / Call Report extracts | Custom peer groups |
| Internal asset-size band | $1B–$3B style groups (as in sample pack) |

### Credit unions

| Source | Use for |
|--------|---------|
| NCUA Financial Performance Report (FPR) | ROA, NIM, efficiency, delinquency, net worth |
| 5300 Call Report peer tools | Size / state / specialty peers |
| Vendor CU peer sets (e.g. Callahan-style) | Franchise and growth benchmarks |

**Peer hygiene**

- Same as-of date as Actual  
- Same formula grain (annualized vs quarterly)  
- Statistic labeled (median / 75th)  
- Peers **pressure-test** targets; they do not replace them  

Illustrative Q1 2026 baselines in this pack (replace before board use):

- Bank: ROA 1.19%, NIM 3.78%, Efficiency 63.2%  
- CU: ROA 0.66%, NIM 3.69%, Efficiency 79.1%  

---

## 5. Calc QA (planning step 5)

Do not publish until engine = hand replay.

### QA checklist (per metric)

- [ ] Formula matches locked dictionary text  
- [ ] Numerator and denominator from agreed source grains  
- [ ] Average method locked (daily vs month-end)  
- [ ] Annualization locked (`NI × 365/days` or equivalent)  
- [ ] Higher/lower-is-better correct for gap labels  
- [ ] bps vs pts display rule applied (`|gap|≥100 bps` → pts for rate gaps)  
- [ ] Criticized includes/excludes special mention as labeled  
- [ ] Digital active denominator (enrolled vs all) frozen  
- [ ] Peer definition matches Actual period  

### Common failure modes

| Failure | Symptom | Fix |
|---------|---------|-----|
| Mixed annualization | NIM jumps on month 1 each quarter | Policy memo + shared UDF |
| Brokered flagged wrong | Core mix looks too good | Fix deposit acquisition codes |
| Householding churn | Products/HH unstable | Freeze merge rules; version notes |
| CU vs bank peer paste | Efficiency always “red” | Swap peer set |
| Classified labeled as criticized | Beats peer falsely | Relabel or recompute |

Use the planning workspace pattern: store `engineValue`, `replayValue`, `match`, and notes per objective before publish.

---

## 6. Publish (planning step 6)

Promote only QA-passed definitions into:

1. Executive scorecard (Actual / Target / Peer)  
2. Board subset  
3. Lending / ops drill pages as needed  

Keep planning and monitoring UIs separate (see [`DECISIONS.md`](./DECISIONS.md)).

---

## 7. Data sourcing map

| Domain | Bank systems | CU systems | Catalog examples |
|--------|--------------|------------|------------------|
| Earnings / margin | GL, ALM | GL, ALM | ROA, NIM, efficiency |
| Capital | Call Report capital calculator | 5300 / net worth worksheet | Tier 1, net worth |
| Loans | Core, LOS, risk ratings | Core, LOS, risk ratings | Growth, criticized, PD, NCO, cycle time |
| Funding | Core deposit products | Core share products | Core mix, LTD/LTS, wholesale |
| Franchise | CIF / householding / CRM | Member system / CRM | Products/HH, AMR, growth, NPS |
| Digital | Online/mobile event logs | Same | Digital active |
| Compliance | AML case system | AML case system | BSA aging |
| People | HRIS / LMS | HRIS / LMS (+ board log) | Turnover, training, board hours |
| Peers | UBPR extract | FPR extract | Peer columns |

Warehouse pattern already sketched for the bank pack: [`../sql/bigquery_scorecard/`](../sql/bigquery_scorecard/) (dimensions + domain facts + `fact_scorecard_kpi_monthly`). Extend `dim_org` with `charter_type` (`bank` | `credit_union`) before multi-FI tenancy.

---

## 8. Review cadence

| Forum | Cadence | Focus |
|-------|---------|-------|
| Ops / metric owners | Weekly | BSA aging, pipelines, exceptions, digital |
| ALCO | Monthly | NIM, funding mix, LTD/LTS, IRR, liquidity |
| Executive scorecard | Monthly | Full 12-tile Actual / Target / Peer |
| Credit committee | Monthly | Delinquency, criticized, NCO, concentrations |
| Board | Quarterly | Capital, earnings, franchise, risk posture |
| Planning refresh | Annual (+ mid-year if needed) | Objectives, targets, peer sets, dictionary versions |

**Meeting hygiene**

- Start with red/yellow tiles only, then one deep drill (ROA tornado pattern is the template).  
- Require owner + next action on every off-target tile.  
- Do not reopen formula debates in the monitoring meeting — send them back to planning / data governance.

---

## 9. Charter-specific implementation notes

### Standing up for a community bank

1. Clone the existing 12-KPI executive set.  
2. Confirm CRE concentration and Tier 1 / CBLR tiles for board.  
3. Wire UBPR peer medians for the asset band.  
4. Keep commercial pipeline + skill coverage on lending/HR pages, not necessarily the president 12.

### Standing up for a credit union

1. Start from the CU 12-pack in [`BANK_VS_CU_FRAMEWORK.md`](./BANK_VS_CU_FRAMEWORK.md).  
2. Replace products/HH with AMR + member growth.  
3. Add net worth ratio next to ROA on the financial row.  
4. Add MBL vs cap and FOM adherence on compliance/lending pages.  
5. Wire FPR peers; set efficiency targets on the CU curve (~75–85% band is normal, institution-specific).  
6. Optionally add member benefit / patronage capacity as an annual board metric.

### Dual / vendor / association use

Use **Compare** mode in the framework canvas and the shared compare pack when explaining architecture across charters. Do not force one target library on both.

---

## 10. 90-day rollout outline

| Days | Work |
|------|------|
| 1–15 | Charter brief, objective workshop, select ≤12 executive KPIs from catalog |
| 16–45 | Lock formulas, map source systems, build calc QA worksheets |
| 46–60 | Attach peers, load first Actual month, reconcile to Call Report / 5300 |
| 61–75 | Soft-launch executive + ALCO views; capture definition issues in DECISIONS-style log |
| 76–90 | Board preview; freeze dictionary version; schedule monthly monitoring |

---

## 11. Definition governance

Maintain a single metric dictionary (this repo’s JSON/CSV is the starter). Any change requires:

1. Owner approval  
2. Calc QA re-run  
3. Note in [`DECISIONS.md`](./DECISIONS.md) or a metric changelog  
4. Peer re-validation if formula grain changed  

Version the dictionary (`metric_catalog.json` → `version` field) whenever formulas change.

---

## 12. Quick reference — display rules

From the bank pack research (apply to both charters):

- Store rates as percent points (`3.42` means 3.42%).  
- Show gaps in **bps**; if \|gap\| ≥ 100 bps, show **pts**.  
- Always show **vs Target** and **vs Peer**.  
- Respect `higherIsBetter` (efficiency, delinquency, wholesale, BSA age, cycle time are lower-is-better).  
- Limits display as ceilings/floors, not “missed goals” language when inside appetite.

---

## 13. Done when

- [ ] ≤12 executive KPIs locked with owners  
- [ ] Every KPI has formula, inputs, frequency, peer source  
- [ ] Calc QA passed for the latest as-of month  
- [ ] Charter-correct capital and franchise metrics present  
- [ ] ALCO and board agendas reference the same dictionary IDs  
- [ ] Dictionary version recorded  

At that point the BSC is operable; further metrics belong in drill pages, not on the president home.
