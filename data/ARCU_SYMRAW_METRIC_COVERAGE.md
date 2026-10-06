# ARCU data — L1 metric coverage

Which locked L1 proving metrics can be fed from **ARCU** on a Symitar CU: **SymAnalytics** (EDW facts/dims) plus **SymRaw** (Episys raw + `sym.VW_*` drill). Validated against restored backups in this repo.

**Catalog source:** [`l1_shared.js`](./l1_shared.js) (`METRICS`). **Warehouse shapes:** [`.cursor/plans/l1_public_data_sources_90b1121e.plan.md`](../.cursor/plans/l1_public_data_sources_90b1121e.plan.md). **Inventory:** [`tools/symraw/output/RESTORE_INVENTORY_SUMMARY.md`](../tools/symraw/output/RESTORE_INVENTORY_SUMMARY.md).

**Hard rules:** CU only. Never mix UBPR and FPR peers. Month/YTD Actual from ARCU; quarter Actual **calc-QA’d** to NCUA 5300. Peers from FPR / 5300 (or ARCU Peer Data), not from SymRaw/SymAnalytics alone.

---

## Evidence (this sample)

| Database | Backup | Role | Scale (restore) |
|----------|--------|------|-----------------|
| **SymAnalytics** | `SymAnalytics.bak` | **Primary for KPI Actual** — `edw.Fact*MonthlySnapshot`, dims | 155 tables |
| **SymRaw** | `SymRaw.bak` | Raw Symitar + **`sym.VW_*`** for L2 drill | 508 tables, 61 views |

Bind KPIs to **SymAnalytics** where a fact exists; use **SymRaw** views when you need account/member/GL line detail. No objects named Banno, Yellow Hammer, HRIS, or survey vendors appear in either database.

**Scorecard warehouse:** Aggregate to `org_key` + month-end. Do not expose member PII on the public Riverbend demo.

---

## Support tiers

| Tier | Meaning for Phase 3 publish |
|------|-----------------------------|
| **Yes** | Objects present in this ARCU sample; monthly Actual with locked formula + calc-QA path. |
| **Partial** | Actual (or numerator) from ARCU; budget, peer, second system, or formula lock still required. |
| **Conditional** | Not in this backup; needs another JH product feed into ARCU or FI-specific config. |
| **No** | No suitable objects in ARCU; external vendor or sample tile. |

---

## Summary counts (39 proving metrics)

| Tier | Count | L1 reports most affected |
|------|-------|---------------------------|
| **Yes** | 18 | L1-2, L1-3, L1-4, part of L1-5 |
| **Partial** | 8 | L1-2 (`noi`), L1-4 (`acl`), L1-5 (production/ops) |
| **Conditional** | 5 | L1-3 (`digital`, `cross_sell`), L1-4 (`criticized`), L1-5 (`self_svc`, `teller_sla`), L1-6 (`training`) |
| **No** | 8 | L1-3 (`csi`, `cac`), L1-4 (`irr`, `bsa`), all other L1-6 people tiles |

**Not ARCU operational data:** peer medians (FPR/5300), **`noi` budget target** (FP&A; `edw.DimGoals` / `DimGLRatioGoals` are hints only—not a substitute for board budget).

---

## Metrics ARCU **can support**

### Financial (L1-2)

| metric_code | Tile | Tier | Primary ARCU objects | Notes |
|-------------|------|------|----------------------|--------|
| `roa` | ROA | Yes | `SymAnalytics.edw.FactGLMonthlySnapshot`, `edw.DimGLAccount`, `edw.DimGLAccountNCUA` | NI and avg assets; Q vs 5300. |
| `roe_nwg` | Net worth growth | Yes | Same + GL net worth mapping | CU net worth growth, not bank ROE. |
| `nim` | NIM | Yes | `FactGLMonthlySnapshot`, GL dims | NII and earning-asset base. |
| `efficiency` | Efficiency | Yes | `FactGLMonthlySnapshot`, GL dims | OpEx and revenue denominator. |
| `noi` | NOI vs budget | Partial | `FactGLMonthlySnapshot` (Actual); `edw.DimGoals` (optional target hint) | **Budget** not authoritative in ARCU. |
| `loan_growth` | Loan growth | Yes | `edw.FactLoanMonthlySnapshot`, `DimLoanType` | YoY from monthly loan snapshot. |
| `dep_growth` | Share growth | Yes | `edw.FactShareMonthlySnapshot`, `DimShareType` | YoY share balances. |
| `fee_mix` | Noninterest income mix | Yes | `FactGLMonthlySnapshot`, `DimGLAccount` | Noninterest ÷ total revenue. |

### Franchise (L1-3)

| metric_code | Tile | Tier | Primary ARCU objects | Notes |
|-------------|------|------|----------------------|--------|
| `retention` | Retention | Yes | `edw.FactMemberSnapshot`, `DimMember`, `DimMemberStatus` | Close vs open members. |
| `hh_growth` | Member growth | Yes | `FactMemberSnapshot`, `DimMember` | Net members; not 5300 stock alone. |
| `core_mix` | Core share mix | Yes | `FactShareMonthlySnapshot`, `DimShareType`, `DimShareCode` | Lock core product map with board. |
| `depth` | AMR / products per member | Yes | `edw.FactAccountSnapshot`, `FactAccountAggregate`, `DimAccount` | Products/accounts per member. |
| `digital` | Digital active | Conditional | — | No digital-login objects in this ARCU sample → **Banno** (or digital extract) if licensed. |
| `cross_sell` | Cross-sell | Conditional | — | No CRM/campaign facts here → **Synapsys** + core typical. |

### Risk / capital (L1-4)

| metric_code | Tile | Tier | Primary ARCU objects | Notes |
|-------------|------|------|----------------------|--------|
| `capital` | Net worth ratio | Yes | `FactGLMonthlySnapshot`, GL/NCUA account dims | Net worth and assets. |
| `past_due` | Past due 30+ | Yes | `FactLoanMonthlySnapshot`, `DimNCUADaysPastDueRange`, `DimDaysPastDueRange` | Delinquency; branch via `DimBranch`. |
| `acl` | ACL coverage | Partial | `FactGLMonthlySnapshot` (allowance), `FactLoanMonthlySnapshot`, charge-off dims | Confirm CECL/allowance GL map at FI. |
| `ltd` | LTS | Yes | `FactLoanMonthlySnapshot`, `FactShareMonthlySnapshot` | Loans ÷ shares (board definition). |
| `wholesale` | Borrowed funds reliance | Yes | Share/loan snapshots + share/GL product codes | FHLB/borrowed mapping. |
| `criticized` | Criticized assets | Conditional | — | No special-mention rating facts in sample → credit admin / LOS. |
| `irr` | IRR NII +200 bp | No | — | **ALM** (ProfitStars/Sendero), not in ARCU DB. |
| `bsa` | BSA aging | No | — | **Yellow Hammer**, not in ARCU DB. |

### Process (L1-5)

| metric_code | Tile | Tier | Primary ARCU objects | Notes |
|-------------|------|------|----------------------|--------|
| `orig_vol` | Origination volume | Yes | `FactLoanMonthlySnapshot`, `sym.VW_LoanSnapshot` | Booked volume in period. |
| `new_yield` | New-money yield | Partial | `FactLoanMonthlySnapshot`, `DimLoanRateRange`, `sym.VW_LoanSnapshot` | Weighted note rate on new money—confirm field lock. |
| `funnel` | Funnel conversion | Partial | `edw.FactLoanApp`, `DimLoanAppType`, `sym.VW_LoanApp` | Apps vs booked—define credit box in formula. |
| `cycle` | Decision cycle | Partial | `FactLoanApp`, `VW_LoanApp` | App → decision timestamps if populated. |
| `cpt` | Cost per transaction | Partial | `edw.FactTransaction`, `FactTransactionSummary`, `FactGLMonthlySnapshot` | Txn count + OpEx allocation. |
| `pipeline` | Onboarding cycle (CU) | Partial | `FactMemberSnapshot`, `sym.VW_Member` | Membership/FOM timing; bank C&I pipeline N/A. |
| `self_svc` | Digital self-service | Conditional | — | No STP/digital channel classification in sample. |
| `teller_sla` | Teller SLA | Conditional | `FactTransaction`, `DimTerminal`, `DimBranch` | **Volume** only; wait-time not in ARCU. |

### People (L1-6)

| metric_code | Tile | Tier | Primary ARCU objects | Notes |
|-------------|------|------|----------------------|--------|
| `training` | Required training | Conditional | — | No LMS completion facts in sample. |
| `engagement` | Engagement | No | — | HRIS / survey vendor. |
| `turnover` | Voluntary turnover | No | — | HRIS. |
| `teller_to` | Frontline turnover | No | — | HRIS. |
| `ttf` | Time-to-fill | No | — | ATS. |
| `succession` | Succession coverage | No | — | HRIS / governance. |
| `skill_board` | Skill / board hours | No | — | LMS / board secretary. |

### L1-1 enterprise rollup (9 tiles)

| metric_code | ARCU tier | Comment |
|-------------|-----------|---------|
| `roa`, `efficiency`, `capital`, `loan_growth`, `core_mix`, `retention`, `past_due` | Yes | Bind from SymAnalytics monthly facts. |
| `csi` | No | Survey—keep sample or external feed. |
| `engagement` | No | HRIS—keep sample or external feed. |

---

## Metrics ARCU **cannot** support (do not promise)

| metric_code | Why not in this ARCU sample | Use instead |
|-------------|----------------------------|-------------|
| `csi` | No satisfaction/NPS data | Raddon, Qualtrics, Medallia |
| `cac` | No acquisition spend / attribution | Marketing GL + CRM |
| `irr` | No ALM shock | ProfitStars / Sendero ALM |
| `bsa` | No AML case aging | Yellow Hammer |
| `engagement`, `turnover`, `teller_to`, `ttf`, `succession`, `skill_board` | No HRIS/LMS/survey objects | Named HR/ATS/LMS vendors |
| `digital`, `cross_sell`, `criticized`, `self_svc` | Not in backup (tier Conditional until feed proven) | Banno, Synapsys, LOS/credit admin as licensed |
| **Peer curves** | Regulatory peer, not core | FPR / 5300 / ARCU Peer Data |
| **`noi` vs plan** | Board budget not in EDW | FP&A / GL budget system |

---

## Master map: metric → SymAnalytics / SymRaw

Grain for facts: **month-end** (`DimDate` on SymAnalytics). L2 drill: **branch** where `DimBranch` joins apply.

| metric_code | SymAnalytics (preferred) | SymRaw (drill) |
|-------------|-------------------------|----------------|
| `roa`, `roe_nwg`, `nim`, `efficiency`, `fee_mix`, `noi`, `capital` | `edw.FactGLMonthlySnapshot` + `DimGLAccount` / `DimGLAccountNCUA` | `sym.VW_GLHistory`, `sym.VW_GLAccount` |
| `loan_growth`, `past_due`, `orig_vol`, `new_yield` | `edw.FactLoanMonthlySnapshot` + loan dims | `sym.VW_LoanSnapshot`, `sym.VW_LoanTransaction` |
| `dep_growth`, `core_mix`, `ltd`, `wholesale` | `edw.FactShareMonthlySnapshot` + share dims | `sym.VW_ShareSnapshot`, `sym.VW_ShareTransaction` |
| `retention`, `hh_growth`, `depth` | `edw.FactMemberSnapshot`, `FactAccountSnapshot` | `sym.VW_Member`, `sym.VW_Account` |
| `acl` | `FactGLMonthlySnapshot` + `FactLoanMonthlySnapshot` | `sym.GLHISTORY`, loan charge-off dims |
| `funnel`, `cycle` | `edw.FactLoanApp` + app dims | `sym.VW_LoanApp` |
| `cpt` | `edw.FactTransaction`, `FactTransactionSummary` | Share/loan transaction views |
| `pipeline` | `FactMemberSnapshot` | `sym.VW_Member` |

Populate `map_metric_arcu_item` in the warehouse from this table after formula lock per FI.

---

## Demo vs live CU

| Posture | ARCU role |
|---------|-----------|
| **Public Riverbend demo** | Do **not** require ARCU. Quarter financial/risk from Call/5300 + FPR; sample series for **No** and unproven **Conditional** tiles. |
| **Live CU v1** | Publish **Yes** first, then **Partial** with calc-QA; add **Conditional** only when feed inventory confirms. |
| **Bank (first FI)** | ARCU N/A — SilverLake (or equivalent) + Call/UBPR. |

---

## Stakeholder language

- **Say:** “This ARCU sample supports **monthly GL, loans, shares, members, delinquency, loan applications, and transactions**—covering most of **L1-2**, core **L1-3/L1-4**, and part of **L1-5** via SymAnalytics.”
- **Do not say:** “ARCU runs the full six-report scorecard.” **CSI, CAC, BSA, IRR, and L1-6 people** need other systems or stay on sample data.
