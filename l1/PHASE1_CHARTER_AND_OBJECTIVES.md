# Phase 1 — Charter brief and this year’s objectives

Demo stand-in for the sponsor workshop. First live FI in this pack is **Riverbend Community Bank**. The L1 HTML suite also toggles a credit-union label set (FPR peers) so both charters can be demoed; only the bank is treated as the first *live* scorecard.

Replace names, targets, and owners when a real FI workshop completes.

---

## Charter brief

| Item | Decision |
|------|----------|
| Institution | Riverbend Community Bank (`org_key = 1` in BigQuery seed) |
| Charter | Community bank (first live). CU mode is demo-only until a second workshop. |
| Sponsors | CEO + CFO |
| Peer band | Assets $1B–$3B, UBPR median. CU demo uses FPR / same size band. |
| As-of | 31 July 2026 (sample month, matches seed) |
| Periods on L1-1 / L1-2 | Month (default), Quarter, YTD, vs prior year |
| Who may change a target mid-year | Earnings and franchise goals: ALCO. Risk limits and capital floors: board. No owner-only edits after publish. |
| Peer vs target | Peers pressure-test the plan. They do not replace the bank target. Never mix UBPR and FPR. |
| L1-1 size | 9 objective tiles (within 8–12). ELT + board pack = this page only (CEO chairs). |

### Data owners

| Domain | Owner seat | Feeds |
|--------|------------|--------|
| GL / earnings | CFO | ROA, ROE, NIM, NOI, efficiency, fee mix |
| Core / deposits | Treasurer | Deposit/share growth, core mix, LTD/LTS, wholesale |
| LOS / credit | Chief Credit | Loan growth, past due, criticized, ACL, decision cycle, pipeline |
| ALM | Treasurer / CFO-ALM | NIM path, IRR NII shock |
| CIF / member | CMO (franchise, not marketing-only) | CSI/NPS, retention, household/member growth, products/HH or AMR, CAC, digital active, cross-sell |
| AML | BSA Officer | BSA aging |
| Digital / ops | COO | Cost per transaction, self-service mix, teller SLA, decision cycle; CU onboarding |
| Sales / BD | CBO | Funnel conversion, new-money yield, origination volume, commercial pipeline |
| HRIS / LMS | CHRO | Engagement, turnover, time-to-fill, training, succession, credentials |

---

## This year’s outcomes (one proving metric each)

### L1-2 Financial (CFO)

| Outcome | Proving metric | Target (bank) | CU demo |
|---------|----------------|---------------|---------|
| Earn a competitive return without stretching wholesale | ROA | 1.50% | 0.75% (capital-build fuel) |
| Deliver shareholder return (bank) / retain earnings (CU) | ROE / Net worth growth | ROE 12.0% | Net worth growth 8.0% |
| Hold spread quality | NIM | 3.50% | 3.50% |
| Keep the operating load inside plan | Efficiency | 52% | 79% vs FPR |
| Hit earnings plan | NOI vs budget | $19.0MM | $12.5MM |
| Grow earning assets with credit discipline | Loan growth | 7.0% YoY | 6.0% YoY |
| Grow the funding book | Deposit / share growth | 6.0% YoY | 5.5% YoY |
| Diversify off the spread | Noninterest income mix | 22% | 16% |

### L1-3 Franchise (CMO — franchise value, not a marketing-mix score)

| Outcome | Proving metric | Target (bank) | CU demo |
|---------|----------------|---------------|---------|
| Keep service above the Capstone floor | CSI / NPS | CSI 7.2 | NPS 70 |
| Hold the book we already have | Retention | 92% | 93% |
| Grow relationships, not account records | Customer / member growth | 4.0% | 3.5% |
| Improve funding stickiness | Core funding mix | 78% | 80% |
| Deepen the household / member | Products per HH / AMR | 3.10 products/HH | AMR $18.5k |
| Shift usage to digital | Digital active | 62% | 58% |
| Increase wallet share | Cross-sell | 18% | 16% |
| Acquire without buying volume | CAC | $285 | $240 |

### L1-4 Risk / capital (CRO)

| Outcome | Proving metric | Target (bank) | CU demo |
|---------|----------------|---------------|---------|
| Stay well capitalized | Tier 1 / Net worth | Tier 1 leverage 9.5% | Net worth 10.5% |
| Keep credit inside appetite | Past due 30+ | 1.10% | 0.90% |
| Surface problem credits early | Criticized assets | 4.0% | 3.5% |
| Cover expected loss | ACL coverage | 1.25× | 1.20× |
| Run utilization in band | LTD / LTS | 86% (band 80–90) | 82% (band 75–88) |
| Stay inside IRR policy | IRR sensitivity | −6.0% NII +200 bp (floor −8%) | −5.5% |
| Limit wholesale | Wholesale reliance | 12% | 10% |
| Close BSA on time | BSA aging | 18 days avg | 16 days |

### L1-5 Process, service and production (COO / CBO)

Same eight proving metrics; grouped on the page. **Operations (COO):** decision cycle, cost per transaction, digital self-service, teller SLA, and CU onboarding. **Production (CBO):** funnel conversion, new-money yield, origination volume, commercial pipeline. Loan and deposit *growth* stay on L1-2.

**L2 grain (sample):** Branch and associate exceptions appear under Needs attention on every L1 report that has a branch/associate KPI (franchise, people, process, deposit growth, L1-1 rollups of those). Click opens drill 3. Enterprise ratios (ROA, capital, LTD, IRR, BSA) stay enterprise-only. Not a roster.

| Outcome | Proving metric | Target (bank) | CU demo | Group |
|---------|----------------|---------------|---------|-------|
| Decide commercial credits in SLA | Decision cycle | 45 days | 12 days (consumer-heavy) | Operations |
| Convert the funnel | Funnel conversion | 38% | 42% | Production |
| Price new money above the book | Yield on new originations | 6.80% | 6.40% | Production |
| Keep origination volume on plan | Origination volume | $48MM / month | $22MM / month | Production |
| Lower unit cost | Cost per transaction | $2.40 | $2.10 | Operations |
| Move work off the lobby | Digital self-service | 71% | 68% | Operations |
| Win commercial / onboard members | Commercial pipeline / Onboarding cycle | Pipeline 32% | Onboarding 1.2 days | Production (bank) / Operations (CU) |
| Hold branch service speed | Teller SLA | 1.8 min | 1.8 min | Operations |

### L1-6 People (CHRO)

| Outcome | Proving metric | Target (bank) | CU demo |
|---------|----------------|---------------|---------|
| Stay engaged | Engagement | 74 (Emplify) | 76 |
| Cut regretted exits | Voluntary turnover | 11% | 12% |
| Fix the frontline leak | Teller / frontline turnover | 20% | 18% |
| Fill examiner-sensitive seats | Time-to-fill critical roles | 45 days | 50 days |
| Complete required training | Required training completion | 98% | 98% |
| Cover key seats | Succession coverage | 80% | 75% |
| Bench commercial skill / board education | Commercial skill coverage / Board education | 70% credentialed | 12 board hours |

---

## L1-1 rollup (9 tiles — this year’s board pack)

These are the only tiles on the ELT open (CEO chairs). Capital is on this page (Tier 1 / net worth), not only on L1-4. CAMELS letters on capital and past due are tags, not weights. CSI, retention, and engagement carry sample L2 branch/associate exceptions; earnings, capital, loan growth, core mix, and past due do not.

| # | Objective | Metric | Owner | Report home |
|---|-----------|--------|-------|-------------|
| 1 | Deliver top-quartile peer ROA | ROA | CEO / CFO | L1-2 |
| 2 | Operate inside the efficiency goal | Efficiency | CFO / COO | L1-2 |
| 3 | Stay well capitalized | Tier 1 / Net worth | CFO | L1-4 |
| 4 | Keep CSI / NPS above the floor | CSI / NPS | CMO | L1-3 |
| 5 | Hold retention | Retention | CMO | L1-3 |
| 6 | Grow loans with credit discipline | Loan growth | Chief Credit | L1-2 |
| 7 | Improve core funding stickiness | Core funding mix | Treasurer | L1-3 |
| 8 | Keep past due inside appetite | Past due 30+ | CRO | L1-4 |
| 9 | Keep the bench engaged | Engagement | CHRO | L1-6 |

---

## Open the Phase 2 reports

| Report | File |
|--------|------|
| L1-1 Enterprise Strategy Scorecard | [`l1_1_enterprise_strategy.html`](./l1_1_enterprise_strategy.html) |
| L1-2 Financial | [`l1_2_financial.html`](./l1_2_financial.html) |
| L1-3 Franchise | [`l1_3_franchise.html`](./l1_3_franchise.html) |
| L1-4 Risk & Capital | [`l1_4_risk_capital.html`](./l1_4_risk_capital.html) |
| L1-5 Process, Service and Production | [`l1_5_process.html`](./l1_5_process.html) |
| L1-6 People | [`l1_6_people.html`](./l1_6_people.html) |

## Workshop still required (not claimed as done)

This file is a **typed starter** so Phase 2 mockups have bindable objectives. A real CEO/CFO session must still confirm targets, peer set, and mid-year change rights before calc QA (Phase 3).
