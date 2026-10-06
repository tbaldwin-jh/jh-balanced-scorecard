-- Seed dimensions, objectives, metrics, and objective-metric bridge.
-- Replace YOUR_PROJECT with your GCP project id before running.
-- Safe to re-run: truncates then inserts.

TRUNCATE TABLE `YOUR_PROJECT.bank_scorecard.bridge_objective_metric`;
TRUNCATE TABLE `YOUR_PROJECT.bank_scorecard.dim_objective`;
TRUNCATE TABLE `YOUR_PROJECT.bank_scorecard.dim_metric`;
TRUNCATE TABLE `YOUR_PROJECT.bank_scorecard.dim_portfolio`;
TRUNCATE TABLE `YOUR_PROJECT.bank_scorecard.dim_perspective`;
TRUNCATE TABLE `YOUR_PROJECT.bank_scorecard.dim_org`;
TRUNCATE TABLE `YOUR_PROJECT.bank_scorecard.dim_date`;

-- Month-end dates: 2025-07-31 through 2026-07-31 (13 months).
INSERT INTO `YOUR_PROJECT.bank_scorecard.dim_date`
  (date_key, full_date, calendar_year, calendar_quarter, calendar_month, month_name, month_end_flag, fiscal_year, year_month)
VALUES
  (20250731, DATE '2025-07-31', 2025, 3, 7, 'July', TRUE, 2025, '2025-07'),
  (20250831, DATE '2025-08-31', 2025, 3, 8, 'August', TRUE, 2025, '2025-08'),
  (20250930, DATE '2025-09-30', 2025, 3, 9, 'September', TRUE, 2025, '2025-09'),
  (20251031, DATE '2025-10-31', 2025, 4, 10, 'October', TRUE, 2025, '2025-10'),
  (20251130, DATE '2025-11-30', 2025, 4, 11, 'November', TRUE, 2025, '2025-11'),
  (20251231, DATE '2025-12-31', 2025, 4, 12, 'December', TRUE, 2025, '2025-12'),
  (20260131, DATE '2026-01-31', 2026, 1, 1, 'January', TRUE, 2026, '2026-01'),
  (20260228, DATE '2026-02-28', 2026, 1, 2, 'February', TRUE, 2026, '2026-02'),
  (20260331, DATE '2026-03-31', 2026, 1, 3, 'March', TRUE, 2026, '2026-03'),
  (20260430, DATE '2026-04-30', 2026, 2, 4, 'April', TRUE, 2026, '2026-04'),
  (20260531, DATE '2026-05-31', 2026, 2, 5, 'May', TRUE, 2026, '2026-05'),
  (20260630, DATE '2026-06-30', 2026, 2, 6, 'June', TRUE, 2026, '2026-06'),
  (20260731, DATE '2026-07-31', 2026, 3, 7, 'July', TRUE, 2026, '2026-07');

INSERT INTO `YOUR_PROJECT.bank_scorecard.dim_org`
  (org_key, org_id, org_name, org_type, state_code, peer_group, is_active)
VALUES
  (1, 'RCB-001', 'Riverbend Community Bank', 'Community Bank', 'MO', 'Assets 1B-3B', TRUE);

INSERT INTO `YOUR_PROJECT.bank_scorecard.dim_perspective`
  (perspective_key, perspective_code, perspective_name, sort_order)
VALUES
  (1, 'FIN', 'Financial', 1),
  (2, 'CUS', 'Customer', 2),
  (3, 'RSK', 'Risk', 3),
  (4, 'CAP', 'Capability', 4);

INSERT INTO `YOUR_PROJECT.bank_scorecard.dim_portfolio`
  (portfolio_key, portfolio_code, portfolio_name, portfolio_family, sort_order)
VALUES
  (1, 'CI', 'Commercial and Industrial', 'Loan', 1),
  (2, 'CRE', 'Commercial Real Estate', 'Loan', 2),
  (3, 'CONS', 'Consumer', 'Loan', 3),
  (4, 'AG', 'Agricultural', 'Loan', 4),
  (5, 'DDA', 'Demand Deposit (DDA)', 'Deposit', 5),
  (6, 'SAV', 'Savings', 'Deposit', 6),
  (7, 'MMDA', 'Money Market', 'Deposit', 7),
  (8, 'CD', 'Certificates of Deposit', 'Deposit', 8);

INSERT INTO `YOUR_PROJECT.bank_scorecard.dim_metric`
  (metric_key, metric_code, metric_name, perspective_key, unit, format_hint, formula_text, higher_is_better, default_owner, default_cadence, scorecard_view_tags, sort_order)
VALUES
  (1, 'nim', 'Net interest margin (NIM)', 1, 'ratio', '0.00%',
   'NIM = (Interest Income - Interest Expense) / Average Earning Assets', TRUE,
   'CFO / ALCO', 'YTD annualized', ['executive', 'board'], 1),
  (2, 'efficiency', 'Efficiency ratio', 1, 'ratio', '0.0%',
   'Efficiency Ratio = Noninterest Expense / (Net Interest Income + Noninterest Income)', FALSE,
   'COO / CFO', 'YTD', ['executive', 'board', 'ops'], 2),
  (3, 'roa', 'Return on assets (ROA)', 1, 'ratio', '0.00%',
   'ROA = Net Income / Average Total Assets', TRUE,
   'CEO / CFO', 'YTD annualized', ['executive', 'board'], 3),
  (4, 'loan_growth', 'Loan growth', 1, 'ratio', '+0.0%',
   'Loan Growth = (Ending Gross Loans - Beginning Gross Loans) / Beginning Gross Loans', TRUE,
   'CLO / Lending', 'YoY ending balances', ['executive', 'board', 'lending'], 4),
  (5, 'core_deposits', 'Core deposit growth / mix', 2, 'composite', '+0.0% / 0%',
   'Growth = (Ending Core - Beginning Core) / Beginning Core; Mix = Core / Total Deposits', TRUE,
   'Retail / Treasury', 'YoY / spot mix', ['executive', 'board'], 5),
  (6, 'products_per_hh', 'Products per household', 2, 'number', '0.0',
   'Products per Household = Active Product Relationships / Households', TRUE,
   'Retail / CS', 'Month-end', ['executive', 'board'], 6),
  (7, 'digital_active', 'Digital active users', 2, 'ratio', '0%',
   'Digital Active Rate = Digital Active Users / Eligible Customers', TRUE,
   'Digital / Retail', 'Trailing 30 days', ['executive', 'ops'], 7),
  (8, 'criticized', 'Criticized assets', 3, 'ratio', '0.0%',
   'Criticized Asset Ratio = (SM + Substandard + Doubtful + Loss) / Total Gross Loans', FALSE,
   'CRO / Credit', 'Month-end', ['executive', 'board', 'lending'], 8),
  (9, 'past_due_30', 'Past due 30+', 3, 'ratio', '0.00%',
   'Past Due 30+ Ratio = Principal Balance of Loans >= 30 DPD / Total Gross Loans', FALSE,
   'Credit Admin', 'Month-end', ['executive', 'board', 'lending'], 9),
  (10, 'wholesale_reliance', 'Wholesale funding reliance', 3, 'ratio', '0.0%',
   'Wholesale Reliance = Wholesale Funding / Total Liabilities', FALSE,
   'Treasury / ALCO', 'Month-end', ['executive', 'board'], 10),
  (11, 'bsa_aging', 'BSA alert aging', 3, 'composite', '0 days',
   'Avg Alert Age = Sum(Age Days) / Open Alerts; Aged Share = Alerts > 30 Days / Open Alerts', FALSE,
   'BSA Officer', 'Open inventory', ['executive', 'ops', 'board'], 11),
  (12, 'decision_cycle', 'Loan decision cycle time', 4, 'days', '0.0 days',
   'Decision Cycle Time (median) = Median(Decision Timestamp - Application Received Timestamp)', FALSE,
   'Lending Ops', 'Trailing 90 days', ['executive', 'lending', 'ops'], 12);

INSERT INTO `YOUR_PROJECT.bank_scorecard.dim_objective`
  (objective_key, objective_code, objective_name, perspective_key, description, owner_role, sort_order, is_active)
VALUES
  (1, 'FIN_NIM', 'Sustain net interest margin', 1,
   'Protect earning-asset yield and funding cost discipline through the rate cycle.', 'CFO / ALCO', 1, TRUE),
  (2, 'FIN_EFF', 'Improve operating efficiency', 1,
   'Keep noninterest expense growth below revenue growth.', 'COO / CFO', 2, TRUE),
  (3, 'FIN_ROA', 'Deliver target return on assets', 1,
   'Translate margin and fee income into sustainable ROA.', 'CEO / CFO', 3, TRUE),
  (4, 'FIN_LOAN', 'Grow quality loans', 1,
   'Expand loan balances without degrading credit standards.', 'CLO / Lending', 4, TRUE),
  (5, 'CUS_HH', 'Deepen household relationships', 2,
   'Increase products per household through needs-based offers.', 'Retail / CS', 5, TRUE),
  (6, 'CUS_CORE', 'Grow core funding franchise', 2,
   'Grow sticky core deposits and keep core mix healthy.', 'Retail / Treasury', 6, TRUE),
  (7, 'CUS_DIG', 'Increase digital engagement', 2,
   'Raise active digital usage among eligible customers.', 'Digital / Retail', 7, TRUE),
  (8, 'RSK_CREDIT', 'Maintain credit quality', 3,
   'Keep criticized and past-due levels inside board limits.', 'CRO / Credit', 8, TRUE),
  (9, 'RSK_LIQ', 'Limit wholesale funding reliance', 3,
   'Fund growth primarily with core deposits; cap wholesale share.', 'Treasury / ALCO', 9, TRUE),
  (10, 'RSK_BSA', 'Keep BSA inventory within SLA', 3,
   'Clear alerts on time and avoid a stale aged tail.', 'BSA Officer', 10, TRUE),
  (11, 'CAP_CYCLE', 'Shorten loan decision cycle time', 4,
   'Reduce median time from application to decision for competitive speed.', 'Lending Ops', 11, TRUE);

INSERT INTO `YOUR_PROJECT.bank_scorecard.bridge_objective_metric`
  (objective_key, metric_key, is_primary, weight)
VALUES
  (1, 1, TRUE, 1.0),
  (2, 2, TRUE, 1.0),
  (3, 3, TRUE, 1.0),
  (4, 4, TRUE, 0.7),
  (4, 8, FALSE, 0.3),
  (5, 6, TRUE, 1.0),
  (6, 5, TRUE, 1.0),
  (7, 7, TRUE, 1.0),
  (8, 8, TRUE, 0.5),
  (8, 9, TRUE, 0.5),
  (9, 10, TRUE, 1.0),
  (10, 11, TRUE, 1.0),
  (11, 12, TRUE, 1.0);
