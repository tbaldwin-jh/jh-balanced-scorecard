-- Community bank balanced scorecard dataset (BigQuery Standard SQL).
-- Replace YOUR_PROJECT with your GCP project id before running.
-- Example:
--   sed 's/YOUR_PROJECT/my-gcp-project/g' 00_dataset.sql | bq query --use_legacy_sql=false

CREATE SCHEMA IF NOT EXISTS `YOUR_PROJECT.bank_scorecard`
OPTIONS (
  location = 'US',
  description = 'Community bank balanced scorecard star schema for Power BI demos'
);
