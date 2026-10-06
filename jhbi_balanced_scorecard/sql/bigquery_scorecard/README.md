# BigQuery community bank scorecard

Star schema + seed data for Power BI over GCP BigQuery.

Related mockups (same repo):

- [`../../mockups/community_bank_scorecard_wireframe.html`](../../mockups/community_bank_scorecard_wireframe.html)  
- [`../../mockups/community_bank_executive_scorecard.html`](../../mockups/community_bank_executive_scorecard.html)  

See also [`../../docs/RESEARCH.md`](../../docs/RESEARCH.md).

## What you get

| File | Purpose |
|------|---------|
| [`00_dataset.sql`](./00_dataset.sql) | Create `bank_scorecard` dataset (US) |
| [`01_dims.sql`](./01_dims.sql) | Dimension DDL |
| [`02_facts.sql`](./02_facts.sql) | Fact + bridge DDL |
| [`03_seed_dims.sql`](./03_seed_dims.sql) | Dims, 12 metrics, 11 objectives, bridge |
| [`04_seed_facts.sql`](./04_seed_facts.sql) | 13 months of domain facts + KPI snapshots |
| [`05_views.sql`](./05_views.sql) | `vw_objective_kpi_monthly` for Power BI |
| [`POWER_BI_MODEL.md`](./POWER_BI_MODEL.md) | Relationships, pages, DAX stubs |

Fictional FI: **Riverbend Community Bank** (`org_key = 1`). Latest seed month: **2026-07-31**.

## Load into BigQuery

1. Set your project id:

```bash
export GCP_PROJECT=your-gcp-project-id
export SCORECARD_DIR=sql/bigquery_scorecard
```

2. Substitute and run in order:

```bash
for f in 00_dataset.sql 01_dims.sql 02_facts.sql 03_seed_dims.sql 04_seed_facts.sql 05_views.sql; do
  sed "s/YOUR_PROJECT/${GCP_PROJECT}/g" "${SCORECARD_DIR}/${f}" \
    | bq query --use_legacy_sql=false --project_id="${GCP_PROJECT}"
done
```

Or paste each file into the BigQuery console after replacing `YOUR_PROJECT`.

## Expected row counts

| Table / view | Rows |
|--------------|------|
| `dim_date` | 13 |
| `dim_org` | 1 |
| `dim_perspective` | 4 |
| `dim_portfolio` | 8 |
| `dim_metric` | 12 |
| `dim_objective` | 11 |
| `bridge_objective_metric` | 13 |
| `fact_*_monthly` (domain) | 13 each |
| `fact_scorecard_kpi_monthly` | 156 (13 × 12) |

## Sanity checks

```sql
-- 12 metrics at latest month
SELECT COUNT(DISTINCT metric_key) AS metric_count
FROM `YOUR_PROJECT.bank_scorecard.fact_scorecard_kpi_monthly`
WHERE date_key = 20260731;
-- expect 12

-- Latest display values (should align with wireframe)
SELECT m.metric_code, f.display_value, f.status_tone
FROM `YOUR_PROJECT.bank_scorecard.fact_scorecard_kpi_monthly` f
JOIN `YOUR_PROJECT.bank_scorecard.dim_metric` m USING (metric_key)
WHERE f.date_key = 20260731
ORDER BY m.sort_order;

-- Objective coverage
SELECT objective_code, COUNT(*) AS kpi_links
FROM `YOUR_PROJECT.bank_scorecard.vw_objective_kpi_monthly`
WHERE date_key = 20260731
GROUP BY objective_code
ORDER BY objective_code;
```

## Power BI quick start

1. Power BI Desktop → Get data → Google BigQuery.
2. Select dataset `bank_scorecard`.
3. For a first executive page, import:
   - `fact_scorecard_kpi_monthly`
   - `dim_metric`
   - `dim_date`
   - `dim_org`
   - `vw_objective_kpi_monthly` (objectives page)
4. See [`POWER_BI_MODEL.md`](./POWER_BI_MODEL.md) for relationships and measure stubs.

## Design notes

- Dual grain: domain facts hold inputs; `fact_scorecard_kpi_monthly` holds precomputed tile values for fast demos.
- Objectives live in `dim_objective` and link to metrics through `bridge_objective_metric`.
- No secrets or real project ids are stored in these scripts.
