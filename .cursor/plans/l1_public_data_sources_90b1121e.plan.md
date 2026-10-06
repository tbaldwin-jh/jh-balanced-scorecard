---
name: L1 public data sources
overview: Map every L1 proving metric to Call Report, ARCU, other Jack Henry systems (core, Banno, Synapsys, LoanVantage, Yellow Hammer, ALM), and remaining public files (SOD, FDIC BankFind, FRED). Warehouse still never mixes UBPR and FPR.
todos:
  - id: staging-ddl
    content: Define DDL for 8 public staging tables (Call, UBPR institution, UBPR peer, 5300, FPR institution, FPR peer, SOD, optional FDIC financials)
    status: pending
  - id: arcu-staging-ddl
    content: Define stg_arcu_* tables (member, share, loan, GL snapshot, optional Peer Data) plus map_metric_arcu_item
    status: pending
  - id: map-metric-public
    content: Create map_metric_public_item (metric_code x charter x MDRM/UBPR/5300/FPR code) for financial and risk L1 tiles
    status: pending
  - id: extend-internal-facts
    content: Add fact_capital/production/service/people/acquisition monthly for tiles Call Report cannot feed; CU monthly Actual from ARCU where landed
    status: pending
  - id: scorecard-kpi
    content: Extend fact_scorecard_kpi_monthly with peer_value, prior_value, charter, peer_source, actual_source (call/5300/arcu/gl/…), calc_qa_pass
    status: pending
  - id: map-metric-jh
    content: Fill map_metric_jh_system (metric_code x charter x JH product x object) for cores, ARCU, Banno, Synapsys, LoanVantage, Yellow Hammer, ALM
    status: pending
  - id: load-one-quarter
    content: Load one CDR + NCUA + SOD quarter for the $1B–$3B band and reconcile quarter Actual to Call/5300
    status: pending
isProject: false
---

# L1 data sources and table shapes

Reference inventory for binding tiles later. This is a **schema and sourcing plan**, not a live bind. Existing warehouse sketches live in [jhbi_balanced_scorecard/sql/bigquery_scorecard/01_dims.sql](jhbi_balanced_scorecard/sql/bigquery_scorecard/01_dims.sql) and [02_facts.sql](jhbi_balanced_scorecard/sql/bigquery_scorecard/02_facts.sql). L1 tile IDs and locked sources live in [l1/l1_shared.js](l1/l1_shared.js) (`METRICS`, `METRIC_DEFS`).

**Hard rule:** never mix Uniform Bank Performance Report (UBPR) and Financial Performance Report (FPR) on the same curve. Bank peers = UBPR. Credit-union peers = FPR / 5300 (including ARCU Peer Data, which is still NCUA Call Report — not a third peer book).

**Source families (use together, do not mix peer books)**

| Family | What it is | Grain | Role |
|---|---|---|---|
| **Call Report family** | Bank: FFIEC 031 / 041 / 051. CU: NCUA 5300. Peers: UBPR (bank) or FPR (CU). | Quarter (SOD annual) | Public Actual + peer for earnings, capital, credit, liquidity. Best first bind for a **demo**. |
| **ARCU** | Jack Henry **Advanced Reporting for Credit Unions** on Symitar / Episys. Optional Peer Data = NCUA 5300 files. | Daily / month-end; member, account, branch | CU operational Actual, franchise, L2. Not a public Riverbend extract. |
| **Other Jack Henry** | Cores, Banno, Synapsys, LoanVantage / Lending, Yellow Hammer, ProfitStars / Sendero ALM, 4\|sight. | Daily / event | Named product for each remaining tile. Banks do not use ARCU; they use SilverLake / CIF 20/20 / Core Director plus the same satellite products. |
| **Other public** | FDIC BankFind, SOD, QBP, FRED, PCA/NCUA well-capitalized rules. HMDA is mortgage-only — not an L1 tile. | Quarter / annual / daily rates | Demo peers, market context, policy floors. Never a substitute for the institution target. |

Month / YTD pills still prefer GL / ARCU (or bank core) for Actual. Reconcile quarter Actual to Call / 5300. Peer as-of = last closed quarter.

```mermaid
flowchart LR
  call[FFIEC_Call]
  ubpr[UBPR]
  fdic[FDIC_BankFind_SOD]
  n5300[NCUA_5300]
  fpr[FPR]
  core[JH_core_SilverLake_Symitar]
  arcu[JH_ARCU]
  banno[JH_Banno]
  crm[JH_Synapsys]
  los[JH_LoanVantage]
  bsa[JH_YellowHammer]
  alm[JH_ProfitStars_ALM]
  stg[stg_public]
  facts[internal_monthly_facts]
  kpi[fact_scorecard_kpi]
  l1[L1_tiles]
  call --> stg
  ubpr --> stg
  fdic --> stg
  n5300 --> stg
  fpr --> stg
  arcu --> facts
  core --> facts
  banno --> facts
  crm --> facts
  los --> facts
  bsa --> facts
  alm --> facts
  stg --> kpi
  facts --> kpi
  kpi --> l1
```

---

## Jack Henry product catalog (what can feed L1)

Installs vary. Treat this as the **default JH map**, then confirm at the FI. `source_system` on facts should store the product actually licensed.

| JH product | Typical charter | Feeds L1 tiles |
|---|---|---|
| **SilverLake / CIF 20/20 / Core Director** | Bank | Monthly balances: loans, deposits, CIF, core mix, LTD, wholesale, past due, origination booked to core, householding |
| **Symitar Episys** | CU | Same as bank core for shares, loans, members, FOM, delinquency |
| **ARCU** | CU | Warehouse over Episys (+ optional Peer Data 5300). See Layer 1b |
| **4\|sight / Enterprise Reporting** | Bank (where licensed) | Bank analog to ARCU — operational DW, not a peer book |
| **General ledger on core / JH GL** | Both | `roa`, `roe_nwg`, `nim`, `efficiency`, `noi`, `fee_mix`, `acl` expense, `cpt` expense |
| **Banno Digital Platform** | Both | `digital` (90-day login), `self_svc` (eligible digital txns), apply flow into funnel |
| **Synapsys** | Both | `cross_sell`, household/member products, commercial `pipeline` (bank), referral conversion |
| **LoanVantage** (commercial) | Bank | `cycle`, `funnel`, `pipeline`, `new_yield`, `orig_vol`, criticized ratings if credit admin lives here |
| **JH Lending / Mortgagebot / Consumer Direct** | Both | Consumer `cycle`, `funnel`, `orig_vol`, `new_yield` |
| **Yellow Hammer BSA / AML** | Both | `bsa` alert aging |
| **ProfitStars / Sendero ALM** | Both | `irr` NII +200 bp; NIM path context (tile Actual still GL) |
| **ProfitStars / CECL or core ALLL** | Both | `acl` inputs with GL |
| **Teller / branch on core** | Both | Transaction counts for `cpt`; queue wait is often a non-JH lobby system — confirm before binding `teller_sla` |
| **JH Banker Education / LMS (if licensed)** | Both | Possible `training`; many FIs use a third-party LMS instead |

**Not Jack Henry (leave named as such):** CSI/NPS survey (Raddon, Qualtrics, Medallia), HRIS/ATS/Emplify, marketing spend for CAC, board secretary hours, talent-review succession.

---

## Other public sources (beyond Call / 5300 / UBPR / FPR)

| Public source | URL / file | Informs | Does not inform |
|---|---|---|---|
| **FDIC BankFind `/financials`** | [banks.data.fdic.gov](https://banks.data.fdic.gov/) | Convenience bank quarter: ROA, ROE, NIM, efficiency, assets, loans, deposits (`stg_fdic_financials_api`) | CU tiles; month pills; franchise/people |
| **FDIC Summary of Deposits** | BankFind SOD | Optional market-share context; annual deposit stock by branch | Not a current L1 tile; not monthly mix |
| **FDIC Quarterly Banking Profile** | FDIC QBP | Industry sanity-check only | Not the tile peer (use UBPR) |
| **PCA / CBLR well-capitalized** | FFIEC PCA; CBLR ~9% leverage for electing banks | `capital` **floor language** (policy), not Actual | Does not replace Call Actual |
| **NCUA well-capitalized net worth** | Typically ≥7% net worth ratio | CU `capital` floor language | Does not replace 5300 Actual |
| **FRED** (Fed) | Selected interest rates | ALCO context for NIM / IRR discussion | Not institution Actual or peer |
| **HMDA** | FFIEC HMDA | Mortgage application slice only | Not `funnel` / `orig_vol` L1 tiles |
| **BLS JOLTS / QCEW** | BLS | Industry turnover context | Not `turnover` tile peer |
| **Census / FFIEC geocoding** | With SOD | Market definition for a future share tile | Not in the six L1 reports now |

---

## What Call Report can inform

**Bank Actual (quarterly):** Call Report (FFIEC 031 / 041 / 051). Community banks under $5B often file 051. Bulk: [cdr.ffiec.gov DownloadBulkData](https://cdr.ffiec.gov/public/PWS/DownloadBulkData.aspx). JSON shortcut: [FDIC BankFind financials](https://banks.data.fdic.gov/) (`/financials`, filter `CERT` + `REPDTE`).

**Bank Peer:** UBPR peer-group averages, asset band $1B–$3B as in the mockups. Same CDR bulk page (UBPR Ratio / Rank / Stats). [FFIEC UBPR](https://www.ffiec.gov/UBPR.htm).

**CU Actual (quarterly):** 5300 Call Report. [NCUA quarterly data](https://ncua.gov/analysis/credit-union-corporate-call-report-data), [Custom Query](https://webapps2.ncua.gov/CustomQuery/), [recent 5300](https://recent5300.ncua.gov/).

**CU Peer:** FPR institution + peer averages (~6–8 weeks after cycle). [fpr.ncua.gov](https://fpr.ncua.gov/). Formula lock: [FPR Ratio and Formula Guide](https://ncua.gov/files/publications/analysis/fpr-ratio-formula-guide.pdf). ARCU Peer Data, if licensed, is this same 5300/FPR file landed in ARCU — still `peer_source = fpr`, never UBPR.

**Deposit market (annual, not monthly mix):** FDIC Summary of Deposits. [BankFind SOD](https://banks.data.fdic.gov/bankfind-suite/SOD). Not a current L1 tile.

**Industry sanity-check only (not tile peers):** FDIC Quarterly Banking Profile.

**Call / 5300 / UBPR / FPR populate:** `roa`, `roe_nwg`, `nim`, `efficiency`, `noi`, `loan_growth`, `dep_growth`, `fee_mix`, `capital`, `past_due`, `acl`, `ltd`, `wholesale`. `core_mix` only if the board accepts the regulatory core definition.

**Not on Call / 5300:** CSI/NPS, retention, household/member growth, products/HH or AMR, digital active, cross-sell, CAC, criticized (special mention), IRR NII +200 bp, BSA aging, cycle/funnel/yield/origination/pipeline/onboarding, CPT, self-service, teller SLA, engagement, turnover, time-to-fill, training, succession, skill/board hours.

---

## What ARCU can inform

**SymRaw evidence (this repo):** [`SymRaw.bak`](../SymRaw.bak) + [`SymAnalytics.bak`](../SymAnalytics.bak). Metric-level Yes / Partial / Conditional / No lists for every L1 proving tile: [`l1/ARCU_SYMRAW_METRIC_COVERAGE.md`](../l1/ARCU_SYMRAW_METRIC_COVERAGE.md). Post-restore object names: [`tools/symraw/inventory_after_restore.sql`](../tools/symraw/inventory_after_restore.sql).

ARCU is a **credit-union** warehouse. Treat it as `source_system = arcu` on CU monthly facts. Do not load live member-level ARCU into the public Riverbend demo.

**Out of the box from Symitar (typical):** share and loan balances, member counts, product relationships, delinquency from the core, branch, GL snapshots if the GL feed is on, origination volume if loan booking is in core.

**If additional feeds are landed in ARCU** (LOS, digital, MeridianLink / Origence, card): funnel, new-money yield, pipeline, digital active, self-service mix, onboarding cycle.

**ARCU Peer Data (optional):** NCUA Call Report download into ARCU. Use for CU **peer** and for reconciling CU quarter Actual to 5300 — same rules as FPR / 5300, not a substitute for UBPR.

**Usually not in ARCU (keep other systems):** survey CSI/NPS, marketing CAC, AML alert aging, ALM IRR shock, special-mention criticized, teller queue SLA, HRIS engagement/turnover/TTF/succession, LMS training, board education hours.

**Bank analog (not ARCU):** SilverLake / CIF 20/20 / Core Director warehouse or GL. Same metric map, different `source_system`.

---

## Layer 1 — public staging (8 extract tables)

Keep these close to the official file. One grain per table. Do not compute L1 KPIs here.

### 1. `stg_ffiec_call_item`

One row per bank × quarter × Call Report item (MDRM).

| Column | Type | Notes |
|---|---|---|
| rssd_id | STRING | ID_RSSD |
| cert | STRING | FDIC CERT |
| report_date | DATE | Quarter-end |
| form_type | STRING | `031` / `041` / `051` |
| schedule | STRING | RI, RC, RC-C, RC-E, RC-N, RC-R, RI-B |
| mdrm | STRING | Item code |
| item_value | NUMERIC | As filed |
| unit | STRING | USD thousands vs ratio, per taxonomy |
| load_ts | TIMESTAMP | |
| source_file | STRING | Bulk zip / PWS batch |

### 2. `stg_ffiec_ubpr_ratio`

One row per bank × quarter × UBPR ratio (institution).

| Column | Type |
|---|---|
| rssd_id | STRING |
| report_date | DATE |
| ubpr_item | STRING |
| item_name | STRING |
| item_value | NUMERIC |
| peer_group_id | STRING |
| load_ts | TIMESTAMP |
| source_file | STRING |

### 3. `stg_ffiec_ubpr_peer`

One row per UBPR peer group × quarter × ratio (the **peer** number for bank tiles).

| Column | Type | Notes |
|---|---|---|
| peer_group_id | STRING | Asset-size group; lock $1B–$3B |
| peer_group_label | STRING | |
| report_date | DATE | |
| ubpr_item | STRING | |
| statistic | STRING | `average` / `median` / `percentile` — label what UBPR publishes |
| item_value | NUMERIC | |
| bank_count | INT64 | |
| load_ts | TIMESTAMP | |
| source_file | STRING | |

### 4. `stg_ncua_5300_item`

One row per credit union × cycle × 5300 account.

| Column | Type |
|---|---|
| charter_number | STRING |
| cycle_date | DATE |
| account_code | STRING |
| account_name | STRING |
| item_value | NUMERIC | |
| load_ts | TIMESTAMP | |
| source_file | STRING | NCUA file **or** ARCU Peer Data extract |
| is_preliminary | BOOL | |

### 5. `stg_ncua_fpr_ratio`

One row per CU × cycle × FPR ratio (institution).

| Column | Type |
|---|---|
| charter_number | STRING |
| cycle_date | DATE |
| fpr_ratio_code | STRING |
| ratio_name | STRING |
| item_value | NUMERIC |
| peer_group_id | STRING |
| load_ts | TIMESTAMP |
| source_file | STRING |

### 6. `stg_ncua_fpr_peer`

One row per FPR peer group × cycle × ratio (the **peer** number for CU tiles).

| Column | Type |
|---|---|
| peer_group_id | STRING |
| peer_group_label | STRING |
| cycle_date | DATE |
| fpr_ratio_code | STRING |
| statistic | STRING |
| item_value | NUMERIC |
| cu_count | INT64 |
| load_ts | TIMESTAMP |
| source_file | STRING | FPR **or** ARCU Peer Data |

### 7. `stg_fdic_sod_branch`

Annual branch deposits (not a monthly L1 tile).

| Column | Type |
|---|---|
| year | INT64 |
| cert | STRING |
| branch_uninum | STRING |
| branch_name | STRING |
| state | STRING |
| county | STRING |
| deposits | NUMERIC |
| load_ts | TIMESTAMP |

### 8. `stg_fdic_financials_api` (optional convenience)

Denormalized FDIC `/financials` row (CERT × REPDTE). Use when you do not want to pivot MDRM. Columns at minimum: `cert`, `rssd_id`, `repdte`, `name`, `asset`, `dep`, `netinc`, `eq`, `lnlsnet`, `nim`, `roa`, `roe`, `eeffr` (efficiency), plus whatever BankFind fields map to LTD, past due, leverage. Keep MDRM staging as the calc-QA source of truth.

---

## Layer 1b — ARCU staging (CU operational)

Aggregate before leaving the CU. **Do not** land raw member names in the scorecard warehouse. Grain of KPI facts remains `org_key` + `date_key` (month-end), with optional branch grain for L2.

### 9. `stg_arcu_gl_monthly`

Month-end GL / trial-balance rollup from ARCU (NII, noninterest income/expense, assets, shares, loans). Feeds CU monthly Actual for `roa`, `roe_nwg`, `nim`, `efficiency`, `noi`, `fee_mix`, `capital`.

### 10. `stg_arcu_share_loan_monthly`

Org (and optional branch) month-end: total shares, core shares, loans, past-due UPB, wholesale/borrowed. Feeds `dep_growth`, `loan_growth`, `core_mix`, `ltd`, `wholesale`, `past_due`.

### 11. `stg_arcu_member_monthly`

Member counts, closed members, products per member / AMR, 90-day digital if the digital feed is in ARCU. Feeds `hh_growth` (member growth), `retention`, `depth`, `digital` (if landed), `cross_sell` (if product attach is in ARCU).

### 12. `stg_arcu_origination_monthly`

Booked principal, application counts, note rates on new money, pipeline — **only if** LOS / Origence / MeridianLink is landed. Feeds `orig_vol`, `funnel`, `new_yield`, `pipeline` (CU onboarding if membership timestamps are in ARCU).

### 13. `map_metric_arcu_item`

Join key: `metric_code` × ARCU object/table × grain (`org` / `branch`). Parallel to `map_metric_public_item`, CU charter only.

---

## Layer 2 — internal monthly facts (extend existing)

Reuse [02_facts.sql](jhbi_balanced_scorecard/sql/bigquery_scorecard/02_facts.sql). Add the missing domains so every L1 tile has a numerator/denominator home. Grain: `org_key` + `date_key` (month-end). CU rows may have `source_system = arcu` when ARCU is the feed.

**Already specified**

- `fact_financial_monthly` — NII building blocks, NI, avg assets, loans, deposits, wholesale
- `fact_franchise_monthly` — core deposits, households, products, digital
- `fact_risk_monthly` — criticized buckets, past due buckets, nonaccrual
- `fact_ops_monthly` — BSA aging, decision cycle

**Add**

- `fact_capital_monthly` — `tier1_capital`, `avg_total_assets`, `net_worth`, `acl_balance`, `npl`, `irr_nii_shock_200bp`
- `fact_production_monthly` — `applications`, `booked_loans`, `booked_principal`, `new_money_yield`, `pipeline_weighted`, `booked_ci`, `onboarding_median_days`
- `fact_service_monthly` — `txn_expense`, `txn_count`, `stp_txns`, `eligible_txns`, `teller_minutes`, `teller_txns`
- `fact_people_monthly` — `engagement_index`, `voluntary_seps`, `avg_hc`, `teller_seps`, `avg_teller_hc`, `ttf_days`, `training_completed`, `training_assigned`, `ready_now_seats`, `critical_seats`, `credentialed_lenders`, `commercial_lenders`, `board_edu_hours`
- `fact_acquisition_monthly` — `acquisition_spend`, `net_new_households`, `closed_cif`, `begin_cif`

All of these tables: `date_key`, `org_key`, typed measures, `currency_code` where dollars, `source_system` (`gl`, `call`, `5300`, `arcu`, `core`, `los`, `hris`, `aml`, `alm`, `survey`).

---

## Layer 3 — scorecard bind (1 table the L1 tiles read)

Extend existing `fact_scorecard_kpi_monthly` (or a view over it). **One row per org × metric × period.** This is what L1 Actual / Target / Peer / prior year bind to.

| Column | Type | Notes |
|---|---|---|
| date_key | INT64 | Period end (month or quarter) |
| org_key | INT64 | Riverbend = 1 in the seed |
| metric_key | INT64 | Joins `dim_metric.metric_code` (`roa`, `efficiency`, …) |
| charter | STRING | `bank` / `cu` — drives UBPR vs FPR |
| period_type | STRING | `month` / `quarter` / `ytd` / `py` |
| actual_value | FLOAT64 | |
| target_value | FLOAT64 | Policy, not peer |
| peer_value | FLOAT64 | From `stg_*_peer` only |
| prior_value | FLOAT64 | Same period last year |
| unit | STRING | `%`, `$MM`, `days`, … |
| status_tone | STRING | `ok` / `watch` / `bad` |
| peer_set_id | STRING | UBPR group **or** FPR group — never both |
| peer_source | STRING | `ubpr` / `fpr` / `none` |
| actual_source | STRING | `gl` / `call` / `5300` / `arcu` / `silverlake` / `symitar` / `banno` / `synapsys` / `loanvantage` / `yellow_hammer` / `alm` / … |
| asof_actual | DATE | |
| asof_peer | DATE | May lag Actual |
| calc_qa_pass | BOOL | Publish gate |

**Supporting dims (already mostly exist)**

- `dim_org` — add `charter`, `rssd_id`, `cert`, `ncua_charter`, `asset_peer_band`, `arcu_db` (CU only, optional)
- `dim_metric` — add `camels`, `l1_reports` (array), `direction` (`higher` / `lower` / `band`)
- **New** `dim_peer_set` — `peer_set_id`, `charter`, `source` (`ubpr`/`fpr`), `band_label`, `statistic`
- **New** `map_metric_public_item` — `metric_code`, `charter`, `call_mdrm` or `ubpr_item` or `fpr_ratio_code` or `acct_5300`
- **New** `map_metric_arcu_item` — `metric_code`, ARCU object, grain (CU only)
- **New** `map_metric_jh_system` — `metric_code`, `charter`, `jh_product` (`silverlake` / `symitar` / `arcu` / `banno` / `synapsys` / `loanvantage` / `yellow_hammer` / `alm` / …), `object_name`, `grain`

---

## Metric to source map (every L1 proving tile)

Legend: Call = FFIEC Call (bank) or 5300 (CU) for Actual. Peer = UBPR (bank) or FPR / 5300 / ARCU Peer Data (CU). ARCU = CU warehouse. JH = named Jack Henry product for monthly Actual / L2. Other public = additional files that can inform the tile (context, convenience extract, or policy floor) — not a second peer book.

| metric_code | Tile | Call / 5300 | UBPR / FPR | ARCU (CU) | Jack Henry system | Other public |
|---|---|---|---|---|---|---|
| roa | ROA | Yes (Q) | Yes | GL in ARCU (M) | Core GL (SilverLake / Episys) | FDIC BankFind /financials ROA (bank convenience) |
| roe_nwg | ROE / net worth growth | Yes (Q) | Yes | GL in ARCU (M) | Core GL | FDIC /financials ROE (bank); 5300 net worth (CU) |
| nim | NIM | Yes (Q) | Yes | GL in ARCU (M) | Core GL; ProfitStars / Sendero ALM for path | FDIC /financials NIM; FRED for rate-path context only |
| efficiency | Efficiency | Yes (Q) | Yes | GL in ARCU (M) | Core GL | FDIC /financials eeffr; QBP industry check only |
| noi | NOI vs budget | Earnings yes; budget no | Weak | GL in ARCU (M) | Core GL + internal budget | Call NI — not vs budget |
| loan_growth | Loan growth | Yes (Q) | Yes | Yes (M) | Core loan; LoanVantage booked | Call RC-C; FDIC loans |
| dep_growth | Deposit / share growth | Yes (Q) | Yes | Yes (M) | Core deposits / shares | Call RC-E; SOD annual stock (not monthly growth) |
| fee_mix | Noninterest income mix | Yes (Q) | Yes | GL in ARCU (M) | Core GL | Call RI noninterest |
| csi | CSI / NPS | No | No | No | None | None (vendor survey / Raddon — not public) |
| retention | Retention | No | No | Member close (M) | Core CIF (bank); Episys membership (CU) | 5300 member count is stock, not retention |
| hh_growth | Customer / member growth | No | No | Members (M) | Core CIF / Synapsys; Episys members | 5300 members (CU stock only) |
| core_mix | Core funding / share mix | If board accepts Call core def | If used | Yes (M, preferred) | Core product codes (DDA/savings/MMDA vs CDs/brokered) | UBPR core-deposit ratio if formula matches board lock |
| depth | Products/HH / AMR | No | No | Yes (M) | Core CIF / Synapsys | None |
| digital | Digital active | No | No | If digital landed | Banno (90-day login / eligible) | None |
| cross_sell | Cross-sell | No | No | If product attach | Synapsys + core | None |
| cac | CAC | No | No | No | Core for net-new CIF only | None (spend is marketing GL, often non-JH) |
| capital | Tier 1 / net worth | Yes (Q) | Yes | GL in ARCU (M) | Core GL + capital worksheet | PCA / CBLR (bank floor); NCUA well-capitalized typically 7%+ (CU floor) — policy, not Actual |
| past_due | Past due 30+ | Yes (Q) | Yes | Yes (M + branch L2) | Core collections / servicing | Call RC-N; 5300 delinquency |
| criticized | Criticized assets | No (SM not on Call) | No | If ratings landed | LoanVantage / credit admin on core | Call classified (substandard+) is not special mention |
| acl | ACL coverage | Yes (Q) | Yes | If GL + NPL | Core GL; ProfitStars / CECL module if licensed | Call RI-B / RC allowance |
| ltd | LTD / LTS | Yes (Q) | Yes | Yes (M) | Core loans / deposits | Call; UBPR LTD |
| irr | IRR NII +200 bp | No | No | No | ProfitStars / Sendero ALM | FRED rates = scenario context only |
| wholesale | Wholesale reliance | Yes (Q) | Yes | Yes (M) | Core liability types (FHLB, brokered) | Call RC wholesale / FHLB |
| bsa | BSA aging | No | No | No | Yellow Hammer BSA/AML | None |
| cycle | Decision cycle | No | No | If LOS landed | LoanVantage (C&I); JH Lending / Mortgagebot (consumer) | HMDA is mortgage apps only — not this tile |
| funnel | Funnel conversion | No | No | If LOS landed | LoanVantage / JH Lending; Banno apply | HMDA — do not use as L1 funnel |
| new_yield | New-money yield | No | No | If note rates in ARCU | LOS booked rate + core note | None |
| orig_vol | Origination volume | No | No | If bookings in core | LOS to core booked principal | HMDA mortgage dollars only |
| cpt | Cost per transaction | No | No | If txn + GL | Core / Banno txn counts + GL expense | None |
| self_svc | Digital self-service | No | No | If STP landed | Banno + core STP | None |
| pipeline | C&I pipeline / CU onboarding | No | No | Onboarding timestamps; pipeline if CRM/LOS | Bank: Synapsys + LoanVantage. CU: Episys membership / FOM | None |
| teller_sla | Teller SLA | No | No | If queue landed | Core teller txns (count only). Wait time often non-JH lobby/queue | None |
| engagement | Engagement | No | No | No | None | None (Emplify / survey vendor) |
| turnover | Voluntary turnover | No | No | No | None | BLS JOLTS = industry context, not tile peer |
| teller_to | Teller / frontline turnover | No | No | No | None (HRIS job family) | None |
| ttf | Time-to-fill | No | No | No | None (ATS) | None |
| training | Required training | No | No | No | JH education/LMS if licensed; else third-party LMS | None |
| succession | Succession coverage | No | No | No | None | None |
| skill_board | Skill / board hours | No | No | No | None (LMS / board secretary) | None |

**Demo vs live**

- **Public demo:** bind quarter Actual + peer from Call / UBPR (bank) or 5300 / FPR (CU). Optional FDIC BankFind /financials shortcut for bank earnings tiles. Keep sample series for everything Call cannot feed. Do not require ARCU or Banno.
- **Live CU:** monthly Actual and L2 from ARCU + Banno / Yellow Hammer / LOS as licensed; quarter calc-QA against 5300; peer from FPR or ARCU Peer Data.
- **Live bank:** monthly Actual from SilverLake (or CIF 20/20 / Core Director) + 4|sight if present + same satellite products; quarter calc-QA against Call; peer from UBPR.

SOD informs optional market-share context, not a current L1 tile. PCA/NCUA well-capitalized numbers are **target-type floors**, not Actual.

---

## Operating rules

- Peer as-of equals the last **closed** Call / 5300 quarter; monthly tiles still show GL or ARCU Actual.
- `peer_source` on a row must match `dim_org.charter`. ARCU Peer Data → `fpr`, never `ubpr`.
- Calc QA: replay `stg_ffiec_call_item` / `stg_ncua_5300_item` through `map_metric_public_item` and compare to `actual_value` for quarter periods before publish. CU monthly ARCU Actual is reconciled to 5300 at quarter-end, not instead of it.
- ARCU stays behind the CU firewall. Scorecard warehouse gets aggregates only.
- Do not add a seventh L1 report or new tiles as part of this work.

---

## Suggested implementation order (when building later)

1. Stand up the 8 public staging tables and load one quarter of CDR + NCUA + SOD for the $1B–$3B band (demo bind).
2. Fill `map_metric_public_item` for the Call / 5300 / UBPR / FPR codes in the table above.
3. Fill `map_metric_jh_system` from the FI’s licensed stack (do not assume LoanVantage or Banno).
4. For a CU install: stand up `stg_arcu_*` and `map_metric_arcu_item`; land GL, share/loan, member first; Banno/LOS only if already in ARCU.
5. Extend internal facts for capital, production, service, people, acquisition (bank core / 4|sight analog to ARCU).
6. Build `fact_scorecard_kpi_monthly` (or a view) with Actual + Peer + prior and `actual_source`.
7. Point L1 HTML at that table only after `calc_qa_pass`.

No HTML/mockup changes in this pass unless explicitly asked.
