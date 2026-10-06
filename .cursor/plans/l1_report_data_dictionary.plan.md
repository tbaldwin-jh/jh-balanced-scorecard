---
name: L1 report data dictionary
overview: "Consume-side fields, descriptions, and types each L1 report needs to render. Companion to the public-data-sources plan (which maps those fields to Call, UBPR/FPR, ARCU, and other JH systems). Never mix UBPR and FPR."
todos:
  - id: dictionary-tables
    content: Shared header, KPI observation, L2 grain, and per-report proving-metric tables (Field, Description, Type)
    status: completed
  - id: sync-catalog
    content: When METRICS, METRIC_DEFS, or WHERE_GRAIN change in l1_shared.js, update this plan's tables
    status: pending
isProject: false
---

# L1 report data dictionary

Consume-side fields each L1 page needs to render. Catalog source: [`l1/l1_shared.js`](l1/l1_shared.js) (`METRICS`, `METRIC_DEFS`, `WHERE_GRAIN`, `REPORTS`). Source-system mapping stays in [L1 public data sources](l1_public_data_sources_90b1121e.plan.md).

**First live FI:** Riverbend Community Bank. Credit-union labels are a demo toggle. **As-of (sample):** 31 Jul 2026. **Score:** Actual vs *your* target. Peers pressure-test the plan; they do not replace the target. **Never mix UBPR and FPR.**

Period pills: Month (default), Quarter, YTD, vs prior year. Monthly `series` is six points (Feb–Jul). Quarter uses two closed-quarter points. YTD uses a running mean of the monthly series.

## Shared header (all six reports)

| Field | Description | Type |
|-------|-------------|------|
| `as_of_date` | Close date the pack is scored as | date |
| `charter` | Label and peer book. Bank uses UBPR; CU uses FPR / 5300 | enum (`bank`, `cu`) |
| `period_grain` | How Actual, trend, and vs-prior are sliced | enum (`month`, `quarter`, `ytd`, `py`) |
| `report_id` | Which L1 page is open | enum (`l1-1` … `l1-6`) |
| `report_name` | Report title | string |
| `report_owner` | Seat that chairs the report | string |
| `decision_question` | Decision the page is built to answer | string |
| `org_name` | Display name (Riverbend Community Bank or Credit Union) | string |

## Shared KPI observation (every proving tile)

Every card and drill needs one observation per `metric_id` × `charter` × `as_of_date` × `period_grain`.

| Field | Description | Type |
|-------|-------------|------|
| `metric_id` | Stable catalog id (`roa`, `csi`, …) | string |
| `metric_name` | Display title for the current charter | string |
| `objective` | Outcome the tile proves | string |
| `owner` | Accountable seat on the tile | string |
| `perspective` | BSC perspective (Financial, Customer, Risk, Internal Process, Learning Growth) | string |
| `map_home` | Strategy-map report this tile belongs to (`l1-2` … `l1-6`) | enum |
| `unit` | Unit of `actual` / `target` / `peer` / series | enum (`%`, `$`, `$MM`, `score`, `n`, `x`, `days`, `min`, `hrs`) |
| `direction` | How status is graded vs target | enum (`higher`, `lower`, `band`) |
| `band_low` | Policy-band floor (LTD / LTS only) | number (`%`) or null |
| `band_high` | Policy-band ceiling (LTD / LTS only) | number (`%`) or null |
| `actual` | Institution value for the selected period | number |
| `target` | Board / ALCO target for this charter | number |
| `peer_median` | Same-charter peer median ($1B–$3B). Bank = UBPR; CU = FPR | number |
| `prior_year` | Same grain, prior year | number |
| `series` | Trend Actuals for the selected grain | number[6] (month / YTD / vs-prior) or number[2] (quarter) |
| `prior_series` | Prior-year trend, same length as `series` | number[6] or number[2] |
| `formula` | Calculation shown on Definitions | string |
| `definition` | Locked definition shown on Definitions | string |
| `source` | Where Actual / peer is described (not a bind) | string |
| `camels` | Optional CAMELS letter tag. Not a weight | enum (`C`, `A`, `M`, `E`, `L`, `S`) or empty |
| `status` | Derived vs target (and band). Not stored as a source field | enum (`ok`, `watch`, `bad`) |
| `vs_plan` | Derived Actual minus target, signed in the metric unit | number (derived) |
| `vs_peer` | Derived Actual minus peer median | number (derived) |
| `vs_prior` | Derived Actual minus prior year | number (derived) |

## L2 exception grain

Branch and associate exceptions appear under Needs attention on franchise, people, process, deposit growth, and L1-1 rollups of those tiles. They do **not** apply to enterprise ratios (ROA, capital, LTD, IRR, BSA). Not a seventh L1 report or a full roster.

| Field | Description | Type |
|-------|-------------|------|
| `metric_id` | Parent L1 tile | string |
| `charter` | Bank or CU grain pack | enum (`bank`, `cu`) |
| `role` | Job family in the grain (tellers, RMs, platform, …) | string |
| `location_name` | Branch or book name | string |
| `location_value` | Same unit as the parent tile | number |
| `location_status` | Exception status for that location | enum (`ok`, `watch`, `bad`) |
| `associate_name` | Named associate (1–2 per tile in the sample) | string |
| `associate_value` | Same unit as the parent tile | number |
| `associate_status` | Exception status for that associate | enum (`ok`, `watch`, `bad`) |
| `coach` | Seat that owns the named action | string |

## L1-1 Enterprise Strategy Scorecard

ELT + board pack (CEO chairs). Nine tiles only. Each tile also uses the shared KPI observation fields above.

### Proving metrics

| Field | Bank name | CU name | Description | Type / unit | Direction |
|-------|-----------|---------|-------------|-------------|-----------|
| `roa` | ROA | ROA | Earnings on the asset base (bank) or earnings that fund net worth (CU). Do not grade CU vs a bank ROA target. | number (`%`) | higher |
| `efficiency` | Efficiency | Efficiency | Cost to produce a dollar of revenue. Bank curve ~52%; CU uses FPR ~79%. Never grade CU vs bank 52%. | number (`%`) | lower |
| `loan_growth` | Loan growth | Loan growth | YoY growth in gross loans. CU stays inside MBL and credit limits. | number (`%`) | higher |
| `csi` | CSI / NPS | NPS | Bank: Capstone CSI / NPS survey score. CU: member NPS (% Promoters − % Detractors). | number (`score`) bank; number (`score`) CU on 0–100 NPS | higher |
| `retention` | Retention | Retention | Share of households (bank) or members (CU) that remain open. | number (`%`) | higher |
| `core_mix` | Core funding mix | Core share mix | Sticky core deposits or member shares / total funding. | number (`%`) | higher |
| `capital` | Tier 1 leverage | Net worth ratio | Bank: Tier 1 / average assets. CU: net worth / assets (retained earnings only). | number (`%`) | higher |
| `past_due` | Past due 30+ | Past due 30+ | UPB ≥ 30 DPD / gross loans. | number (`%`) | lower |
| `engagement` | Engagement | Engagement | Associate engagement index (Emplify or successor), participation ≥80%. | number (`score`) | higher |

L2 grain on this pack: `csi`, `retention`, `engagement` only.

### Derived glance (L1-1 only)

| Field | Description | Type |
|-------|-------------|------|
| `ahead_of_plan_count` | Tiles beating own target this period | integer (0–9) |
| `ahead_of_peer_count` | Tiles ahead of peer median | integer (0–9) |
| `ahead_of_prior_count` | Tiles ahead of prior year | integer (0–9) |
| `on_track_path` | Count of tiles with `status = ok` at each series point | integer[6] or integer[2] |
| `on_track_goal` | All board-pack tiles on track | integer (9) |
| `weakest_link_report` | Map box with highest off-track / at-risk pressure | enum (`l1-2` … `l1-6`) |
| `weakest_link_mix` | On-track / at-risk / off-track counts on that report | object `{ ok, watch, bad }` integers |

## L1-2 Financial Performance and Earnings

Owner: CFO.

| Field | Bank name | CU name | Description | Type / unit | Direction |
|-------|-----------|---------|-------------|-------------|-----------|
| `roa` | ROA | ROA | Earnings on the asset base (bank) or capital-build fuel (CU). | number (`%`) | higher |
| `roe_nwg` | ROE | Net worth growth | Bank: net income / average equity. CU: change in net worth / prior net worth (retained earnings only). | number (`%`) | higher |
| `nim` | NIM | NIM | Net interest income / average earning assets. | number (`%`) | higher |
| `efficiency` | Efficiency | Efficiency | Noninterest expense / (NII + noninterest income). Bank vs CU curves stay separate. | number (`%`) | lower |
| `noi` | NOI vs budget | NOI vs budget | NII + noninterest income − noninterest expense, annualized. | number (`$MM`) | higher |
| `loan_growth` | Loan growth | Loan growth | YoY gross loans HFI. | number (`%`) | higher |
| `dep_growth` | Deposit growth | Share growth | YoY deposits (bank) or member shares (CU). Has L2 branch grain. | number (`%`) | higher |
| `fee_mix` | Noninterest income mix | Noninterest income mix | Noninterest income / (NII + noninterest income). CU: do not maximize junk fees. | number (`%`) | higher |

## L1-3 Customer / Member Franchise

Owner: CMO (franchise, not marketing-only). Several tiles carry L2 branch/associate grain.

| Field | Bank name | CU name | Description | Type / unit | Direction |
|-------|-----------|---------|-------------|-------------|-----------|
| `csi` | CSI / NPS | NPS | Bank CSI survey mean. CU NPS. | number (`score`) | higher |
| `retention` | Retention | Retention | 1 − (closed CIF or members / beginning book). | number (`%`) | higher |
| `hh_growth` | Customer growth | Member growth | Net household (CIF) or member growth. CU inside FOM. | number (`%`) | higher |
| `core_mix` | Core funding mix | Core share mix | Core deposits or shares / total deposits or shares. | number (`%`) | higher |
| `depth` | Products per household | AMR | Bank: open products / households. CU: average member relationship value / members. | number (`n`) bank; number (`$k`) CU | higher |
| `digital` | Digital active | Digital active | 90-day active digital users / eligible customers or members. | number (`%`) | higher |
| `cross_sell` | Cross-sell | Cross-sell | Households or members with 2+ products / book. | number (`%`) | higher |
| `cac` | CAC | CAC | Acquisition spend / net new funded households or members. | number (`$`) | lower |

## L1-4 Balance Sheet, Risk and Capital

Owner: CRO. Enterprise-only except where `WHERE_GRAIN` already has a pack. CAMELS letters on capital and past due are tags, not weights.

| Field | Bank name | CU name | Description | Type / unit | Direction |
|-------|-----------|---------|-------------|-------------|-----------|
| `capital` | Tier 1 leverage | Net worth ratio | Bank: Tier 1 / average assets vs PCA / CBLR. CU: net worth / assets; NCUA well-capitalized ≥7%. | number (`%`) | higher |
| `past_due` | Past due 30+ | Past due 30+ | UPB ≥ 30 DPD / gross loans. | number (`%`) | lower |
| `criticized` | Criticized assets | Criticized assets | Special mention + classified / loans. | number (`%`) | lower |
| `acl` | ACL coverage | ACL coverage | ACL / nonperforming loans (CECL). | number (`x`) | higher |
| `ltd` | LTD | LTS | Loans / deposits (bank, band 80–90) or loans / shares (CU, band 75–88). Also needs `band_low`, `band_high`. | number (`%`) | band |
| `irr` | IRR NII +200 bp | IRR NII +200 bp | ΔNII under +200 bp / base NII. Must stay ≥ ALCO floor −8%. Less negative is better. | number (`%`) | higher |
| `wholesale` | Wholesale reliance | Wholesale reliance | Wholesale or borrowed funds / total liabilities. | number (`%`) | lower |
| `bsa` | BSA aging | BSA aging | Mean days open for unresolved AML alerts. | number (`days`) | lower |

## L1-5 Process, Service and Production

Owner: COO / CBO. Tiles stack by `group`. Loan and deposit *growth* stay on L1-2.

### Report-only field

| Field | Description | Type |
|-------|-------------|------|
| `group` | Which L1-5 stack the tile sits on | enum (`ops`, `prod`) |

### Proving metrics

| Field | Group | Bank name | CU name | Description | Type / unit | Direction |
|-------|-------|-----------|---------|-------------|-------------|-----------|
| `cycle` | ops | Decision cycle | Decision cycle | Median days application → credit decision. Bank commercial SLA; CU consumer / MBL. | number (`days`) | lower |
| `cpt` | ops | Cost per transaction | Cost per transaction | Transaction-processing expense / transaction count. | number (`$`) | lower |
| `self_svc` | ops | Digital self-service | Digital self-service | STP / digital txns / eligible txns (ops lens). | number (`%`) | higher |
| `teller_sla` | ops | Teller SLA | Teller SLA | Average minutes per teller window transaction. Has L2. | number (`min`) | lower |
| `funnel` | prod | Funnel conversion | Funnel conversion | Booked loans / applications. | number (`%`) | higher |
| `new_yield` | prod | Yield on new originations | Yield on new originations | Weighted average note rate on originations in the period. | number (`%`) | higher |
| `orig_vol` | prod | Origination volume | Origination volume | Sum of booked principal. Has L2. | number (`$MM`) | higher |
| `pipeline` | prod | Commercial pipeline | Onboarding cycle | Bank: booked C&I / weighted pipeline. CU: median days application → funded membership (FOM checks). | number (`%`) bank; number (`days`) CU | higher (bank); lower (CU) |

## L1-6 People and Organizational Capacity

Owner: CHRO. Frontline turnover and engagement carry L2 grain.

| Field | Bank name | CU name | Description | Type / unit | Direction |
|-------|-----------|---------|-------------|-------------|-----------|
| `engagement` | Engagement | Engagement | Vendor engagement index; participation ≥80%. | number (`score`) | higher |
| `turnover` | Voluntary turnover | Voluntary turnover | Voluntary separations / average headcount. | number (`%`) | lower |
| `teller_to` | Teller / frontline turnover | Teller / frontline turnover | Teller or frontline separations / average headcount in that family. | number (`%`) | lower |
| `ttf` | Time-to-fill critical roles | Time-to-fill critical roles | Offer-accept date minus requisition open date for BSA, credit, CFO-1. | number (`days`) | lower |
| `training` | Required training completion | Required training completion | Completed required modules / assigned modules. | number (`%`) | higher |
| `succession` | Succession coverage | Succession coverage | Named ready-now backups / critical seats (CEO-1, BSA, credit, CFO). | number (`%`) | higher |
| `skill_board` | Commercial skill coverage | Board education hours | Bank: credentialed commercial lenders / lenders. CU: documented volunteer board training hours YTD. | number (`%`) bank; number (`hrs`) CU | higher |
