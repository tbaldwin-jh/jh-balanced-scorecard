-- Fact and bridge tables for bank_scorecard.
-- Replace YOUR_PROJECT with your GCP project id before running.

CREATE TABLE IF NOT EXISTS `YOUR_PROJECT.bank_scorecard.bridge_objective_metric` (
  objective_key INT64 NOT NULL,
  metric_key INT64 NOT NULL,
  is_primary BOOL NOT NULL,
  weight FLOAT64
);

-- Monthly GL / ALM style inputs for financial KPIs.
CREATE TABLE IF NOT EXISTS `YOUR_PROJECT.bank_scorecard.fact_financial_monthly` (
  date_key INT64 NOT NULL,
  org_key INT64 NOT NULL,
  interest_income NUMERIC NOT NULL,
  interest_expense NUMERIC NOT NULL,
  noninterest_income NUMERIC NOT NULL,
  noninterest_expense NUMERIC NOT NULL,
  net_income NUMERIC NOT NULL,
  avg_earning_assets NUMERIC NOT NULL,
  avg_total_assets NUMERIC NOT NULL,
  loans_begin NUMERIC NOT NULL,
  loans_end NUMERIC NOT NULL,
  total_deposits NUMERIC NOT NULL,
  total_liabilities NUMERIC NOT NULL,
  wholesale_funding NUMERIC NOT NULL,
  currency_code STRING NOT NULL
);

-- Franchise / customer inputs.
CREATE TABLE IF NOT EXISTS `YOUR_PROJECT.bank_scorecard.fact_franchise_monthly` (
  date_key INT64 NOT NULL,
  org_key INT64 NOT NULL,
  core_deposits_begin NUMERIC NOT NULL,
  core_deposits_end NUMERIC NOT NULL,
  total_deposits NUMERIC NOT NULL,
  household_count INT64 NOT NULL,
  active_product_relationships INT64 NOT NULL,
  digital_active_users INT64 NOT NULL,
  eligible_customers INT64 NOT NULL
);

-- Credit / liquidity risk inputs.
CREATE TABLE IF NOT EXISTS `YOUR_PROJECT.bank_scorecard.fact_risk_monthly` (
  date_key INT64 NOT NULL,
  org_key INT64 NOT NULL,
  gross_loans NUMERIC NOT NULL,
  special_mention NUMERIC NOT NULL,
  substandard NUMERIC NOT NULL,
  doubtful NUMERIC NOT NULL,
  loss NUMERIC NOT NULL,
  past_due_30_plus NUMERIC NOT NULL,
  past_due_30_59 NUMERIC NOT NULL,
  past_due_60_89 NUMERIC NOT NULL,
  past_due_90_plus NUMERIC NOT NULL,
  nonaccrual NUMERIC NOT NULL
);

-- Ops / BSA / cycle-time inputs (pre-aggregated at month grain).
CREATE TABLE IF NOT EXISTS `YOUR_PROJECT.bank_scorecard.fact_ops_monthly` (
  date_key INT64 NOT NULL,
  org_key INT64 NOT NULL,
  open_bsa_alerts INT64 NOT NULL,
  sum_alert_age_days INT64 NOT NULL,
  alerts_aged_over_30 INT64 NOT NULL,
  loan_decision_median_days FLOAT64 NOT NULL,
  loan_decisions_count INT64 NOT NULL
);

-- Presentation layer: precomputed scorecard KPIs for fast Power BI tiles.
CREATE TABLE IF NOT EXISTS `YOUR_PROJECT.bank_scorecard.fact_scorecard_kpi_monthly` (
  date_key INT64 NOT NULL,
  org_key INT64 NOT NULL,
  metric_key INT64 NOT NULL,
  metric_value FLOAT64 NOT NULL,
  metric_value_secondary FLOAT64,
  display_value STRING NOT NULL,
  target_value FLOAT64,
  target_label STRING,
  variance_to_target FLOAT64,
  status_tone STRING NOT NULL,
  owner STRING NOT NULL,
  period_label STRING NOT NULL
);
