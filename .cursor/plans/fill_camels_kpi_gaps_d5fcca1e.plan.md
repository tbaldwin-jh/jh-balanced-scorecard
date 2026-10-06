---
name: Fill CAMELS KPI Gaps
overview: Yes — add the missing CAMELS components as extra KPI cards on the combined Bank/CU monitor, without replacing the Balanced Scorecard. Tag existing metrics and fill Capital, Asset quality, Liquidity, and Sensitivity gaps with charter-aware peers.
todos:
  - id: tag-existing
    content: Add camels letter to the existing 13 bank and CU KPIs and show it on cards
    status: completed
  - id: add-risk-metrics
    content: "Add 4 Risk cards: capital (T1 / net worth), past due 30+, LTD/LTS, IRR NII shock, with charter peers"
    status: completed
  - id: risk-tab
    content: Include Risk in perspective tabs, aggregates, and Add-objective dropdown
    status: completed
isProject: false
---

# Integrate CAMELS as gap-fill, not a replacement

**Recommendation:** Yes, integrate CAMELS — but as **missing safety KPIs on the existing BSC**, not as a second exam dashboard. The president’s Capstone is still Kaplan–Norton. Your own research already says examiners will not grade the BSC, but a BSC that ignores CAMELS will fight the risk committee.

[`community_fi_objective_monitor.html`](c:\Users\TBaldwin\OneDrive - Jack Henry\Desktop\Executive Dashboarding\community_fi_objective_monitor.html) today is strong on **E** (ROA, NOI, efficiency) and weak/empty on **C** and **S**. **A**, **M**, and **L** are only implied (loans, deposits/shares, SLAs, engagement).

## What you already cover vs what to add

| CAMELS | Current 13 cards | Add (extra cards) |
|---|---|---|
| **C** Capital | None | Bank: **Tier 1 leverage**; CU: **Net worth ratio** (same slot) |
| **A** Asset quality | Loans (size only) | **Past due 30+** (NPL-style; lower is better) |
| **M** Management | SLAs, Emplify, turnover | No new card — tag existing as M |
| **E** Earnings | ROA, NOI, efficiency | No new card — tag as E |
| **L** Liquidity | Deposits / shares (stock) | **Loan-to-deposit** (bank) / **Loan-to-share** (CU) |
| **S** Sensitivity | None | **IRR NII shock** (±200 bp, vs ALCO limit) |

Four extra cards keeps the page from becoming a 47-KPI catalog. Criticized assets and wholesale reliance stay in the other mockups unless you want them later.

## Where they live

Add a **Risk** tab (same visual language as the other tabs) so Financial does not jump from 4 to 7 mixed earnings/safety cards.

- Tabs stay: All, Financial, Customer/Member, Internal Process, **Risk**, Learning & Development
- Aggregates already scope to the active tab — they will pick up the new cards with no new chart types
- Cards, sparklines, progress bars, and the merged **KPI & gaps** / **Trend & peers** drill stay the same

Tag every card with a small `camels` letter (`C/A/M/E/L/S`) in the meta line so the mapping is visible without a CAMELS-only layout.

## Charter swap (same 4 slots)

| Slot | Bank | Credit union |
|---|---|---|
| Capital | Tier 1 leverage, target ~9–10%, peer within UBPR | Net worth ratio, well-capitalized ≥7%, many target 10%+ |
| Asset quality | Past due 30+ / gross loans | Same formula; CU peer often tighter |
| Liquidity | LTD = loans / deposits | LTS = loans / shares |
| Sensitivity | NII Δ under +200 bp vs ALCO limit | Same; peer within FPR, not bank ALM |

Peer-within-charter rule from [`BANK_VS_CU_FRAMEWORK.md`](c:\Users\TBaldwin\OneDrive - Jack Henry\Desktop\Executive Dashboarding\jhbi_balanced_scorecard\docs\BANK_VS_CU_FRAMEWORK.md) still applies — never grade CU efficiency or capital on a bank curve.

## Implementation (after you approve)

Edit only [`community_fi_objective_monitor.html`](c:\Users\TBaldwin\OneDrive - Jack Henry\Desktop\Executive Dashboarding\community_fi_objective_monitor.html):

1. Add `camels` on all 13 existing metrics; show it on the card meta (e.g. `E · Financial`)
2. Append 4 Risk metrics to `bankObjectives` and `cuObjectives` with `peer` / `peerSeries` sample data
3. Include `Risk` in `perspectives()`
4. Include `Risk` in the Add-objective dropdown

No change to the original [`community_bank_objective_monitor.html`](c:\Users\TBaldwin\OneDrive - Jack Henry\Desktop\Executive Dashboarding\community_bank_objective_monitor.html).
