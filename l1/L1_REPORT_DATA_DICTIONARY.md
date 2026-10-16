# L1 report data dictionary

HTML reports ship in [`bank/`](./bank/l1_1_enterprise_strategy.html) or [`credit_union/`](./credit_union/l1_1_enterprise_strategy.html). Deliver one pack per client.

This dictionary now lives as a Cursor plan (same family as the public-data-sources plan):

**[`.cursor/plans/l1_report_data_dictionary.plan.md`](../.cursor/plans/l1_report_data_dictionary.plan.md)**

Open that plan for the Field / Description / Type tables (shared header, KPI observation, L2 grain, and each L1 report).

## L1-6 People (current proving tiles)

Six executive tiles — not the 24-tile HR operations board:

| `metric_code` | Display name | Notes |
|---------------|--------------|--------|
| `engagement` | Engagement | Also on L1-1 rollup |
| `turnover` | Voluntary turnover | Regretted exits |
| `teller_to` | Teller / frontline turnover | Frontline leak |
| `ttf` | Time-to-fill critical roles | Examiner-sensitive seats |
| `training` | Required training completion | Risk/compliance modules |
| `learning_paths` | Learning paths | Merged succession + commercial credentials (bank) / board education (CU) |

HR operational metrics (headcount, DEI, absenteeism, leave dollars, training cost) are **catalog / drill 3** only. See [`HR_METRICS_L1_6_MAPPING.md`](./HR_METRICS_L1_6_MAPPING.md).

## CU charter (ARCU / NCUA proving names)

Credit-union tiles use NCUA / ARCU Key Ratios. Bank tiles are unchanged.

| `metric_code` | Bank proving name | CU proving name |
|---------------|-------------------|-----------------|
| `efficiency` | Efficiency | OpEx / average assets |
| `noi` | NOI vs budget | Net income vs plan |
| `criticized` | Criticized assets | Net charge-offs |
| `acl` | ACL coverage | Allowance / delinquent |
| `loan_assets` | Loans-to-assets | Loans-to-shares (LTA is drill context) |
| `wholesale` | Wholesale reliance | Borrowed funds / shares |

## L1-4 Risk (current proving tiles)

Credit / capital / liquidity tiles are unchanged on the bank book. Three book-risk tiles sit in their own group — not jammed into IRR or Past due, and not on L1-1. CU liquidity proving number is **loans-to-shares**; CU realized-loss proving number is **net charge-offs**.

| `metric_code` | Display name | Notes |
|---------------|--------------|--------|
| `runoff` | Runoff / payoffs | Payoffs + pipeline runoff. Ticketing alerts are drill 3 |
| `txn_yield` | New vs renewal spread | Proving number is new − renewal (bps). Both WA rates on drill 1 / 3. L1-5 keeps the production coupon |
| `maturities` | Maturing loans (180d) | Contractual maturities 0–30 / 31–90 / 91–180 |

Overdraft aging (bank) / courtesy pay (CU) in 1–10 / 11–20 / 21–30 / 30+ day buckets still lives on **Past due 30+** (`past_due`) drill 1 and 3 on L1-4 only. The proving number stays loan 30+.
