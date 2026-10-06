# SymRaw / SymAnalytics — restore inventory (2026-09-25)

Restored from repo-root backups using **Docker** `mcr.microsoft.com/mssql/server:2025-latest` (SQL Server 2025).  
**Note:** `mssql/server:2022-latest` fails with *database version 998 incompatible with version 958*.

| Database | Tables | Views | Source backup |
|----------|--------|-------|----------------|
| **SymRaw** | 508 | 61 | `SymRaw.bak` (~1.22 GB) |
| **SymAnalytics** | 155 | 1 | `SymAnalytics.bak` (~248 MB) |

Full object lists: [`symraw_all_objects.tsv`](./symraw_all_objects.tsv), [`symanalytics_all_objects.tsv`](./symanalytics_all_objects.tsv).

## SymRaw schemas

| Schema | Role |
|--------|------|
| **sym** | Current Symitar/Episys raw mirror (larger row counts) |
| **stg** | Staging copy of same file families |

Key **sym** tables (row counts at restore):

| Object | Rows | L1 relevance |
|--------|------|----------------|
| `sym.GLACCOUNT` | 24,331 | GL / earnings building blocks |
| `sym.GLHISTORY` | 3,606 | GL activity |
| `sym.ShareDataSupp` | 616,706 | Shares / deposits |
| `sym.LoanDataSupp` | 130,907 | Loans / delinquency |
| `sym.AccountDataSupp` | 308,542 | Account relationships |
| `sym.MemberGroups` | 181 | Member segmentation |

Key **sym** views (use for readable joins):

`VW_Member`, `VW_Account`, `VW_ShareSnapshot`, `VW_LoanSnapshot`, `VW_ShareTransaction`, `VW_LoanTransaction`, `VW_GLAccount`, `VW_GLHistory`, `VW_LoanApp`, `VW_Branch`

## SymAnalytics **edw** star schema (prefer for KPI Actual)

| Object | Rows | L1 relevance |
|--------|------|----------------|
| `edw.DimMember` | 132,270 | Member growth, retention |
| `edw.DimGLAccount` | 1,176 | NIM, efficiency, fee mix |
| `edw.FactGLMonthlySnapshot` | 19,007 | Monthly financial Actual |
| `edw.FactGLDailySnapshot` | 19,011 | GL trend / drill |
| `edw.FactShareMonthlySnapshot` | 616,706 | Share growth, core mix |
| `edw.FactLoanMonthlySnapshot` | 130,907 | Loan growth, past due |
| `edw.FactMemberSnapshot` | 264,441 | Franchise / AMR |
| `edw.FactLoanApp` | 68,038 | Funnel / cycle (partial) |
| `edw.FactTransaction` | 392,876 | CPT / volume |
| `edw.FactAccountSnapshot` | 308,542 | Products per member / depth |

## Metric map hint (warehouse bind)

| metric_code | Primary objects |
|-------------|-----------------|
| `roa`, `nim`, `efficiency`, `fee_mix` | `edw.FactGLMonthlySnapshot` + `edw.DimGLAccount` |
| `loan_growth`, `past_due` | `edw.FactLoanMonthlySnapshot` |
| `dep_growth`, `core_mix` | `edw.FactShareMonthlySnapshot` + share type dims |
| `retention`, `hh_growth`, `depth` | `edw.FactMemberSnapshot`, `edw.DimMember` |
| `orig_vol`, `funnel`, `cycle` | `edw.FactLoanApp`, `sym.VW_LoanApp` (Partial—formula lock at FI) |
| `cpt` | `edw.FactTransaction` + GL expense |

Still **not** in these DBs: `csi`, `cac`, `bsa`, `irr`, L1-6 HR tiles (see [`l1/ARCU_SYMRAW_METRIC_COVERAGE.md`](../../../l1/ARCU_SYMRAW_METRIC_COVERAGE.md)).

## Connect locally

- **Host:** `localhost,1433`
- **User:** `SA` (password set when container was created — use your own via `MSSQL_SA_PASSWORD`)
- **Databases:** `SymRaw`, `SymAnalytics`

Container name: `mssql-arcu` (see [`docker-compose.yml`](../docker-compose.yml)).
