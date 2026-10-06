-- Dimension tables for bank_scorecard.
-- Replace YOUR_PROJECT with your GCP project id before running.

CREATE TABLE IF NOT EXISTS `YOUR_PROJECT.bank_scorecard.dim_date` (
  date_key INT64 NOT NULL,
  full_date DATE NOT NULL,
  calendar_year INT64 NOT NULL,
  calendar_quarter INT64 NOT NULL,
  calendar_month INT64 NOT NULL,
  month_name STRING NOT NULL,
  month_end_flag BOOL NOT NULL,
  fiscal_year INT64 NOT NULL,
  year_month STRING NOT NULL
);

CREATE TABLE IF NOT EXISTS `YOUR_PROJECT.bank_scorecard.dim_org` (
  org_key INT64 NOT NULL,
  org_id STRING NOT NULL,
  org_name STRING NOT NULL,
  org_type STRING NOT NULL,
  state_code STRING,
  peer_group STRING,
  is_active BOOL NOT NULL
);

CREATE TABLE IF NOT EXISTS `YOUR_PROJECT.bank_scorecard.dim_perspective` (
  perspective_key INT64 NOT NULL,
  perspective_code STRING NOT NULL,
  perspective_name STRING NOT NULL,
  sort_order INT64 NOT NULL
);

CREATE TABLE IF NOT EXISTS `YOUR_PROJECT.bank_scorecard.dim_portfolio` (
  portfolio_key INT64 NOT NULL,
  portfolio_code STRING NOT NULL,
  portfolio_name STRING NOT NULL,
  portfolio_family STRING NOT NULL,
  sort_order INT64 NOT NULL
);

CREATE TABLE IF NOT EXISTS `YOUR_PROJECT.bank_scorecard.dim_metric` (
  metric_key INT64 NOT NULL,
  metric_code STRING NOT NULL,
  metric_name STRING NOT NULL,
  perspective_key INT64 NOT NULL,
  unit STRING NOT NULL,
  format_hint STRING NOT NULL,
  formula_text STRING NOT NULL,
  higher_is_better BOOL,
  default_owner STRING NOT NULL,
  default_cadence STRING NOT NULL,
  scorecard_view_tags ARRAY<STRING>,
  sort_order INT64 NOT NULL
);

CREATE TABLE IF NOT EXISTS `YOUR_PROJECT.bank_scorecard.dim_objective` (
  objective_key INT64 NOT NULL,
  objective_code STRING NOT NULL,
  objective_name STRING NOT NULL,
  perspective_key INT64 NOT NULL,
  description STRING,
  owner_role STRING NOT NULL,
  sort_order INT64 NOT NULL,
  is_active BOOL NOT NULL
);
