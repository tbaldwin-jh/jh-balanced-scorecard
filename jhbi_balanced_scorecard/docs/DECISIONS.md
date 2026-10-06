# Decisions

Architecture and product choices for the community bank balanced scorecard pack.

### Decision: Dual grain BigQuery star schema

Date: 2026-08-06

Status: accepted

Context:

- Need sample schemas so teams can build a Power BI report from a community bank scorecard wireframe.
- Target platform is GCP BigQuery.

Decision:

- Ship star schema under `sql/bigquery_scorecard/` with dimensions, domain monthly facts, objectives (`dim_objective` + `bridge_objective_metric`), and precomputed `fact_scorecard_kpi_monthly`.
- Dual grain: domain facts hold additive inputs; KPI fact holds tile-ready values.
- Provide `vw_objective_kpi_monthly` to avoid awkward many-to-many modeling in Power BI on day one.
- Scripts use `YOUR_PROJECT` placeholders. No secrets or live deploy in-repo.

### Decision: Canvas-first then black HTML for executive demo

Date: 2026-08-07

Status: accepted

Context:

- Needed a president view with Actual / Target / Peer and shareable file drop.

Decision:

- Prototype in Cursor canvas, then ship black Power BI-style HTML (`mockups/community_bank_executive_scorecard.html`) titled **Community Bank | Executive Scorecard**.
- Bank President Scorecard remains the audience label in chrome.
- Gap labels use bps (pts when ≥ 100 bps). Cards show vs Target and vs Peer.
- ROA drill includes trend, tornado variance, and bullet position visuals.

### Decision: Planning is separate from monitoring

Date: 2026-08-07

Status: accepted

Context:

- Users asked whether planning means entering objectives, comparing peers, and proving metric calcs.

Decision:

- Yes. Planning workspace and Add Objective UI are separate from the executive monitor.
- Peers pressure-test plans; they do not replace bank targets.
- Calc QA (engine vs source-grain replay) is required before publish.

### Decision: Split from JD kit into env_balanced_scorecard

Date: 2026-08-10

Status: accepted

Context:

- Scorecard work was a side track inside `env_job_descriptions` and will become its own project.

Decision:

- Move mockups, SQL pack, canvas sources, and research docs to `/Users/MAmes/env_balanced_scorecard`.
- Leave a pointer in the JD repo timeline so agents do not recreate the pack there.

### Decision: Dual-charter BSC (community bank + credit union)

Date: 2026-08-12

Status: accepted

Context:

- Research asked whether community banks and credit unions need different scorecard metrics.
- Structural differences (ownership, tax, capital issuance, MBL caps, peer reports) change Financial and Customer perspectives more than Risk/Process math.

Decision:

- Keep one BSC framework with a **shared spine** plus **charter-specific** metrics.
- Ship `data/metric_catalog.json` (47 KPIs) as the dictionary source of truth.
- Ship dual-mode canvas `canvases/community-fi-bsc-framework.canvas.tsx` (bank / CU / compare).
- Document philosophy in `docs/BANK_VS_CU_FRAMEWORK.md` and rollout in `docs/BSC_IMPLEMENTATION_GUIDE.md`.
- Never peer-benchmark CU efficiency or ROA primarily against bank medians; use FPR / CU peers.
- Treat CU ROA as capital-build fuel, not a failed bank-style profitability target.
