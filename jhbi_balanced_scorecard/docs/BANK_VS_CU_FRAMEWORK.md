# Bank vs Credit Union Balanced Scorecard Framework

How community banks and credit unions should share a BSC spine — and where the metrics must diverge.

**Related artifacts**

- Metric dictionary: [`../data/metric_catalog.json`](../data/metric_catalog.json) / [`../data/metric_catalog.csv`](../data/metric_catalog.csv) (47 KPIs)
- Interactive dual-mode canvas: [`../canvases/community-fi-bsc-framework.canvas.tsx`](../canvases/community-fi-bsc-framework.canvas.tsx)
- Implementation steps: [`BSC_IMPLEMENTATION_GUIDE.md`](./BSC_IMPLEMENTATION_GUIDE.md)
- Prior community-bank research: [`RESEARCH.md`](./RESEARCH.md)

---

## 1. Same tool, different owners

Kaplan–Norton BSC still works for both charters: **Financial · Customer/Member · Internal Process · Learning & Growth**, with **Risk** elevated as a fifth operating perspective for regulated depositories (aligned to CAMELS).

What changes is the **top of the strategy map**:

| | Community bank | Credit union |
|--|----------------|--------------|
| Owner | Shareholders | Member-owners |
| Success definition | Sustainable earnings, franchise value, dividends / valuation | Member value (rates, fees, access, service) + capital retention |
| Capital creation | Retained earnings + equity issuance / holding-company actions | Retained earnings **only** |
| Tax | Subject to federal income tax | Generally federal tax-exempt |
| Primary regulator / peer pack | FDIC / OCC / Fed · UBPR | NCUA · FPR |
| Commercial constraint | CRE concentration guidance; broader C&I capacity | Member-business lending statutory cap (~12.25% of assets, with exceptions) |

**Implication:** Do not copy a bank scorecard onto a CU (or vice versa) without rewriting the Financial and Customer perspectives. Shared process and risk KPIs travel better than earnings and franchise-depth KPIs.

---

## 2. Why the headline numbers look different

Illustrative Q1 2026 sector medians used in this pack:

| KPI | Community banks | Credit unions | Read-through |
|-----|-----------------|---------------|--------------|
| ROA | ~1.19% | ~0.66% | CU ROA ~half of bank ROA is often **by design** (member pricing / service), not automatic distress |
| NIM | ~3.78% | ~3.69% | Margins are close; models diverge after OpEx, fees, and tax |
| Efficiency | ~63.2% | ~79.1% | CU expense load is structurally higher; **never** grade CU efficiency on a bank peer curve |

Design rules:

1. **Peer within charter and size.** UBPR peers for banks; FPR / CU peer groups for credit unions.
2. **Targets are institution policy; peers pressure-test targets.** Same Actual / Target / Peer discipline as the existing bank pack.
3. **ROA remains useful for CUs** — not as a shareholder return proxy, but as the **fuel for net-worth growth** when you cannot issue stock.

---

## 3. Perspective adaptations

### Financial

**Shared spine:** ROA, NIM, efficiency, loan growth, deposit/share growth, noninterest income mix, capital growth.

**Bank-only / bank-emphasized:** ROE, EPS growth, Tier 1 / CET1 / CBLR.

**CU-only / CU-emphasized:** Net worth ratio, member benefit / patronage capacity.

Philosophy:

- Banks: “Earn a competitive ROA/ROE without stretching credit or wholesale funding.”
- CUs: “Earn enough ROA to stay well capitalized and grow with members while returning measurable value.”

### Customer / Member

**Shared:** Core funding mix & growth, digital active, satisfaction/NPS, retention, cross-sell, market share (where measurable).

**Bank-emphasized:** Products per household, household acquisition.

**CU-emphasized:** Average member relationship (loans + shares per member), member growth, products per member.

Philosophy:

- Banks measure **household franchise depth**.
- CUs measure **member ownership depth** — members are both customers and capital providers indirectly via retained earnings.

### Internal Process

**Shared:** Decision cycle time, originations per FTE, loan-to-deposit / loan-to-share, STP / exception rates.

**Bank-emphasized:** Commercial / C&I pipeline conversion.

**CU-emphasized:** Member onboarding cycle (incl. FOM checks), field-of-membership adherence, MBL utilization vs cap.

### Learning & Growth

**Shared:** Engagement, voluntary turnover, training hours per FTE.

**Bank-emphasized:** Commercial lending credential coverage.

**CU-emphasized:** Volunteer board education hours, member financial education reach.

### Risk (CAMELS-aligned)

**Shared:** Criticized / delinquency / NCO, ACL coverage, wholesale reliance, on-hand liquidity, IRR sensitivity, BSA aging, cyber KRIs, exam/DOR aging.

**Bank-emphasized:** CRE concentration vs capital.

**CU-emphasized:** MBL concentration / cap utilization when the commercial book is material; consumer delinquency often leads the pack for retail-heavy CUs.

---

## 4. Nomenclature map (same idea, different words)

| Concept | Bank language | Credit union language |
|---------|---------------|------------------------|
| Funding liabilities | Deposits | Shares |
| Utilization | Loan-to-deposit (LTD) | Loan-to-share (LTS) |
| Core sticky funding | Core deposits | Core shares |
| Capital adequacy | Tier 1 / CET1 / leverage / CBLR | Net worth ratio |
| Owners in the base | Households / customers | Members |
| Relationship depth | Products per household | AMR / products per member |
| Peer report | UBPR | FPR |
| Insurance | FDIC | NCUSIF |

Scorecard UIs should **relabel**, not invent parallel math, for these rows.

---

## 5. Strategy map patterns

### Community bank (simplified)

```text
Commercial skill coverage → Pipeline conversion → Loan growth
Products per household → Fee income → ROA / ROE
Core deposit mix → Funding cost → NIM
Decision cycle → Win rate → Loan growth
Credit quality → Provision → ROA
```

### Credit union (simplified)

```text
Member education / NPS → Member growth → Share growth
Average member relationship → Loan + share depth → NIM / ROA
Onboarding + FOM quality → Experience → Retention
Efficiency discipline → Capital retention → Net worth ratio
Delinquency control → NCO / provision → ROA & capital build
```

Causal links matter more than KPI count. Prefer **15–25 board-visible KPIs**; keep a larger dictionary in the catalog for ops drill-downs.

---

## 6. How to adapt the framework to a specific FI

1. **Start from charter.** Toggle bank vs CU mode in the canvas; hide the other charter’s unique metrics.
2. **Start from strategy, not from the full catalog.** Pick 3–5 outcomes per perspective that the board will actually debate.
3. **Bind one proving metric per objective** (same discipline as [`bsc-planning-workspace.canvas.tsx`](../canvases/bsc-planning-workspace.canvas.tsx)).
4. **Set targets from ALCO / board policy**, then attach **same-charter peers**.
5. **Pass calc QA** before publishing to the executive monitor.
6. **Revisit annually** when field of membership, tax posture, MBL strategy, or capital plan changes.

### Common anti-patterns

| Anti-pattern | Why it hurts |
|--------------|--------------|
| CU efficiency target copied from a bank “best practice” ≤60% | Ignores cooperative cost-to-serve; creates false reds |
| Bank board pack using “member” language without householding rules | Breaks trend continuity |
| Dropping ROA from CU scorecards “because we’re not for profit” | Removes the only scalable capital engine |
| Mixing criticized vs classified without labels | Breaks peer and limit compares |
| Peer set that mixes banks and CUs on ROA/efficiency | Confounds structure with performance |

---

## 7. Regulatory alignment (why Risk is first-class)

Both charters live inside CAMELS-style supervision. Map scorecard risk tiles to components:

| CAMELS | Example KPIs in catalog |
|--------|-------------------------|
| C Capital | Tier 1 / net worth, capital growth |
| A Asset quality | Delinquency, NCO, criticized, CRE/MBL concentration |
| M Management | BSA aging, exam/DOR aging, cyber KRIs, engagement |
| E Earnings | ROA, NIM, efficiency |
| L Liquidity | LTD/LTS, wholesale reliance, on-hand liquidity |
| S Sensitivity | IRR NII/EVE shocks |

Examiners will not grade your BSC — but a BSC that ignores CAMELS will fight the board risk committee every quarter.

---

## 8. Recommended starter packs

### Community bank executive (12)

NIM, Efficiency, ROA, Loan growth, Core deposit growth/mix, Products/HH, Digital active, Criticized, Past due 30+, Wholesale reliance, BSA aging, Decision cycle  

*(Matches the existing Riverbend / bank-president pack.)*

### Credit union executive (12)

NIM, Efficiency, ROA, Net worth ratio, Loan growth, Core share mix, Average member relationship, Member growth, Digital active, Delinquency, Wholesale reliance / LTS, BSA aging  

### Shared “compare” pack (for holding discussions / vendors)

ROA, NIM, Efficiency, Loan growth, Core funding mix, Digital active, Decision cycle, Delinquency, NCO, Wholesale reliance, BSA aging, Engagement  

Use the compare pack to talk architecture; use charter packs to run the FI.

---

## 9. Sources informing this framework

- Existing pack research in [`RESEARCH.md`](./RESEARCH.md) (12 bank KPIs, Actual/Target/Peer, planning loop)
- Sector comparisons of bank vs CU earnings models and Q1 2026 Call Report / industry summaries (ROA, NIM, efficiency medians cited as illustrative)
- CRS / NCUA / FDIC structural differences (ownership, tax, MBL cap, capital)
- Filene and industry CU KPI practice (member-centric measures beyond pure financials)
- CAMELS / FFIEC-oriented KRI catalogs for banks and credit unions

Figures in this pack are **research baselines for template design**, not live peer feeds. Replace with your UBPR/FPR extract before board use.
