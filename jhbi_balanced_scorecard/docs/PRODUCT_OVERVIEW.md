# Product overview

## Personas

| Persona | Needs |
|---------|--------|
| Bank president / CEO | One-page health: Actual, objective target, peer; drill on miss (esp. ROA) |
| Credit union CEO / Board chair | Same monitor pattern with net worth, AMR, member growth; CU peer bars |
| CFO / ALCO | Margin, efficiency, ROA, wholesale / LTS; locked formulas |
| CRO / Credit | Criticized, past due; definition clarity (criticized vs classified) |
| Planning / FP&A | Enter objectives, bind metrics, set targets, attach peers, pass calc QA |
| BI / data | BigQuery star schema, Power BI relationships, seed for demos; charter_type ready |

## Primary flows

```text
Planning
  Add Objective UI ──► draft in browser (demo)
       │
       ▼
  Planning workspace (inspect / step QA)
       │ publish (conceptual)
       ▼
Monitoring
  Executive Scorecard (Actual / Target / Peer)
       │
       ▼
  KPI drill (ROA: trend + tornado + bullet)
```

## Artifact map

```text
env_balanced_scorecard/
  README.md
  data/
    metric_catalog.json  47-KPI dictionary (bank + CU + shared)
    metric_catalog.csv
  docs/
    BANK_VS_CU_FRAMEWORK.md      charter differences + starter packs
    BSC_IMPLEMENTATION_GUIDE.md  rollout, sourcing, QA, cadence
    RESEARCH.md                  original bank metric research
    DECISIONS.md
    PRODUCT_OVERVIEW.md          this file
  mockups/
    community_bank_executive_scorecard.html
    community_bank_bsc_planning.html
    community_bank_bsc_add_objective.html
    community_bank_scorecard_wireframe.html
  sql/bigquery_scorecard/
    00..05 SQL + README + POWER_BI_MODEL.md
  canvases/
    community-fi-bsc-framework.canvas.tsx   dual-mode bank vs CU
    bank-president-scorecard.canvas.tsx
    community-bank-scorecard-wireframe.canvas.tsx
    bsc-planning-workspace.canvas.tsx
```

## Sample data posture

- One fictional FI: Riverbend Community Bank (`org_key = 1` in SQL).  
- Latest demo month: 2026-07-31.  
- Peer group label: Assets $1B–$3B median (illustrative).  
- Add Objective publishes to `localStorage` only in the HTML demo.

## Next product increments (suggested)

1. Persist objectives to BigQuery (or API) instead of `localStorage`.  
2. Add peer columns to `fact_scorecard_kpi_monthly`.  
3. Add `charter_type` on `dim_org` and a CU seed FI beside Riverbend.  
4. Ship a starter `.pbix` on the star schema.  
5. Promote ROA visual pack patterns to other KPIs selectively.  
6. Wire live UBPR / FPR peer extracts into the catalog peer fields.  
