-- Flattened objective ↔ metric ↔ monthly KPI view for Power BI.
-- Replace YOUR_PROJECT with your GCP project id before running.

CREATE OR REPLACE VIEW `YOUR_PROJECT.bank_scorecard.vw_objective_kpi_monthly` AS
SELECT
  o.objective_key,
  o.objective_code,
  o.objective_name,
  o.owner_role AS objective_owner,
  o.sort_order AS objective_sort_order,
  p.perspective_key,
  p.perspective_code,
  p.perspective_name,
  m.metric_key,
  m.metric_code,
  m.metric_name,
  m.unit AS metric_unit,
  m.format_hint,
  m.formula_text,
  m.default_owner AS metric_owner,
  m.scorecard_view_tags,
  b.is_primary AS is_primary_metric,
  b.weight AS objective_metric_weight,
  f.date_key,
  d.full_date,
  d.year_month,
  d.calendar_year,
  d.calendar_month,
  f.org_key,
  org.org_name,
  f.metric_value,
  f.metric_value_secondary,
  f.display_value,
  f.target_value,
  f.target_label,
  f.variance_to_target,
  f.status_tone,
  f.owner AS kpi_owner,
  f.period_label
FROM `YOUR_PROJECT.bank_scorecard.bridge_objective_metric` AS b
JOIN `YOUR_PROJECT.bank_scorecard.dim_objective` AS o
  ON b.objective_key = o.objective_key
JOIN `YOUR_PROJECT.bank_scorecard.dim_perspective` AS p
  ON o.perspective_key = p.perspective_key
JOIN `YOUR_PROJECT.bank_scorecard.dim_metric` AS m
  ON b.metric_key = m.metric_key
JOIN `YOUR_PROJECT.bank_scorecard.fact_scorecard_kpi_monthly` AS f
  ON f.metric_key = m.metric_key
JOIN `YOUR_PROJECT.bank_scorecard.dim_date` AS d
  ON f.date_key = d.date_key
JOIN `YOUR_PROJECT.bank_scorecard.dim_org` AS org
  ON f.org_key = org.org_key
WHERE o.is_active = TRUE;
