# Power BI model map (BigQuery scorecard)

Use this with dataset `bank_scorecard` after loading the SQL pack in [`README.md`](./README.md).

## Recommended first model (tiles)

Import these objects:

| Object | Role |
|--------|------|
| `fact_scorecard_kpi_monthly` | Fact for KPI tiles |
| `dim_date` | Date axis / slicer |
| `dim_metric` | Metric labels, formulas, view tags |
| `dim_org` | FI filter (one row in seed) |
| `vw_objective_kpi_monthly` | Objectives page (flattened) |

Optional drill-down:

| Object | Role |
|--------|------|
| `fact_financial_monthly` | Margin, efficiency, ROA inputs |
| `fact_franchise_monthly` | Household and deposit inputs |
| `fact_risk_monthly` | Credit quality inputs |
| `fact_ops_monthly` | BSA and cycle-time inputs |
| `dim_perspective` | Perspective grouping |
| `dim_objective` + `bridge_objective_metric` | Only if you prefer bridge modeling over the view |

## Relationships

```text
fact_scorecard_kpi_monthly[date_key]  * → 1  dim_date[date_key]
fact_scorecard_kpi_monthly[org_key]   * → 1  dim_org[org_key]
fact_scorecard_kpi_monthly[metric_key]* → 1  dim_metric[metric_key]

fact_financial_monthly[date_key]      * → 1  dim_date[date_key]
fact_franchise_monthly[date_key]      * → 1  dim_date[date_key]
fact_risk_monthly[date_key]           * → 1  dim_date[date_key]
fact_ops_monthly[date_key]            * → 1  dim_date[date_key]
(same org_key → dim_org for each domain fact)
```

For objectives, prefer `vw_objective_kpi_monthly` as a single import table (no bridge needed). If you import the bridge instead:

```text
bridge_objective_metric[objective_key] * → 1 dim_objective[objective_key]
bridge_objective_metric[metric_key]    * → 1 dim_metric[metric_key]
```

Filter `fact_scorecard_kpi_monthly` by metric through `dim_metric`, and use a separate objectives visual from the view to avoid many-to-many ambiguity.

## Report pages

1. **Executive home**: matrix or cards from `fact_scorecard_kpi_monthly` for all 12 metrics at selected `date_key`. Use `display_value` and `status_tone`.
2. **Board**: filter `dim_metric.scorecard_view_tags` contains `board`.
3. **Lending**: tags contain `lending`; add risk fact trends.
4. **Ops / digital**: tags contains `ops`; add BSA aging and decision cycle.
5. **Objectives**: table or cards from `vw_objective_kpi_monthly` grouped by `perspective_name` and `objective_name`.

## Card field mapping

| Visual field | Column |
|--------------|--------|
| Title | `dim_metric.metric_name` |
| Value | `fact_scorecard_kpi_monthly.display_value` (or `metric_value` with format) |
| Target | `target_label` |
| Status | `status_tone` (`success` / `warning` / `danger` / `info`) |
| Owner | `owner` |
| Cadence | `period_label` |

Composite metrics:

- `core_deposits`: `metric_value` = growth, `metric_value_secondary` = mix
- `bsa_aging`: `metric_value` = avg days, `metric_value_secondary` = share aged > 30 days

## DAX stubs (from domain facts)

Use these if you skip the precomputed KPI fact later. Seed already materializes the same logic in `fact_scorecard_kpi_monthly`.

```dax
NIM =
DIVIDE(
    SUM ( fact_financial_monthly[interest_income] )
        - SUM ( fact_financial_monthly[interest_expense] ),
    SUM ( fact_financial_monthly[avg_earning_assets] )
)

Efficiency Ratio =
DIVIDE(
    SUM ( fact_financial_monthly[noninterest_expense] ),
    ( SUM ( fact_financial_monthly[interest_income] )
        - SUM ( fact_financial_monthly[interest_expense] ) )
        + SUM ( fact_financial_monthly[noninterest_income] )
)

ROA =
DIVIDE (
    SUM ( fact_financial_monthly[net_income] ),
    SUM ( fact_financial_monthly[avg_total_assets] )
)

Loan Growth =
DIVIDE (
    SUM ( fact_financial_monthly[loans_end] )
        - SUM ( fact_financial_monthly[loans_begin] ),
    SUM ( fact_financial_monthly[loans_begin] )
)

Core Deposit Mix =
DIVIDE (
    SUM ( fact_franchise_monthly[core_deposits_end] ),
    SUM ( fact_franchise_monthly[total_deposits] )
)

Products Per HH =
DIVIDE (
    SUM ( fact_franchise_monthly[active_product_relationships] ),
    SUM ( fact_franchise_monthly[household_count] )
)

Digital Active Rate =
DIVIDE (
    SUM ( fact_franchise_monthly[digital_active_users] ),
    SUM ( fact_franchise_monthly[eligible_customers] )
)

Criticized Ratio =
DIVIDE (
    SUM ( fact_risk_monthly[special_mention] )
        + SUM ( fact_risk_monthly[substandard] )
        + SUM ( fact_risk_monthly[doubtful] )
        + SUM ( fact_risk_monthly[loss] ),
    SUM ( fact_risk_monthly[gross_loans] )
)

Past Due 30+ =
DIVIDE (
    SUM ( fact_risk_monthly[past_due_30_plus] ),
    SUM ( fact_risk_monthly[gross_loans] )
)

Wholesale Reliance =
DIVIDE (
    SUM ( fact_financial_monthly[wholesale_funding] ),
    SUM ( fact_financial_monthly[total_liabilities] )
)

BSA Avg Age Days =
DIVIDE (
    SUM ( fact_ops_monthly[sum_alert_age_days] ),
    SUM ( fact_ops_monthly[open_bsa_alerts] )
)

Decision Cycle Days =
AVERAGE ( fact_ops_monthly[loan_decision_median_days] )
```

Note: YoY loan and core growth in the seed KPI fact compare to the prior-year month when available (July 2026 vs July 2025). The simple begin/end DAX above is month-over-snapshot, not YoY. Prefer `fact_scorecard_kpi_monthly` for scorecard tiles.

## Objectives seed (11)

| Code | Objective | Primary metrics |
|------|-----------|-----------------|
| FIN_NIM | Sustain net interest margin | nim |
| FIN_EFF | Improve operating efficiency | efficiency |
| FIN_ROA | Deliver target return on assets | roa |
| FIN_LOAN | Grow quality loans | loan_growth (+ criticized) |
| CUS_HH | Deepen household relationships | products_per_hh |
| CUS_CORE | Grow core funding franchise | core_deposits |
| CUS_DIG | Increase digital engagement | digital_active |
| RSK_CREDIT | Maintain credit quality | criticized, past_due_30 |
| RSK_LIQ | Limit wholesale funding reliance | wholesale_reliance |
| RSK_BSA | Keep BSA inventory within SLA | bsa_aging |
| CAP_CYCLE | Shorten loan decision cycle time | decision_cycle |
