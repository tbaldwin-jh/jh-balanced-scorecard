# SymRaw.bak — Docker + SQL Server tools



## Files



| File | Role |

|------|------|

| [`SymRaw.bak`](../../SymRaw.bak) | ARCU **raw** Episys landing (SQL Server backup) |

| [`SymAnalytics.bak`](../../SymAnalytics.bak) | ARCU **analytics** EDW (restore after SymRaw) |

| [`docker-compose.yml`](./docker-compose.yml) | SQL Server **2025** container (required for these backups) |

| [`restore_both.sql`](./restore_both.sql) | `RESTORE DATABASE` for both backups |

| [`inventory_after_restore.sql`](./inventory_after_restore.sql) | Full table/view list |

| [`output/RESTORE_INVENTORY_SUMMARY.md`](./output/RESTORE_INVENTORY_SUMMARY.md) | **Completed inventory** (object counts + L1 map hints) |

| [`l1/ARCU_SYMRAW_METRIC_COVERAGE.md`](../../l1/ARCU_SYMRAW_METRIC_COVERAGE.md) | Metric Yes/No coverage |



## Important: SQL Server version



These backups were taken on **SQL Server 2025** (internal DB version **998**).  

**SQL Server 2022 Docker/Express cannot restore them.** Use **`mcr.microsoft.com/mssql/server:2025-latest`**.



## Docker (recommended)



From repo root:



```powershell

$env:MSSQL_SA_PASSWORD = "YourStrong!Password"

docker compose -f tools/symraw/docker-compose.yml up -d

# Wait ~10s, then restore:

docker exec -i mssql-arcu /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P $env:MSSQL_SA_PASSWORD -C -i /var/opt/mssql/backup/tools/symraw/restore_both.sql

```



Backups are mounted read-only at `/var/opt/mssql/backup/` (repo root).



## Query examples



```powershell

docker exec mssql-arcu /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P $env:MSSQL_SA_PASSWORD -C -d SymAnalytics -Q "SELECT TOP 5 * FROM edw.FactGLMonthlySnapshot"

```



Connect from SSMS / Azure Data Studio: **`localhost,1433`**, database **`SymRaw`** or **`SymAnalytics`**.



## Windows Express (optional)



Same restore scripts apply after installing **SQL Server 2025 Express** (not 2022). Use `RESTORE FILELISTONLY` on your local path to `SymRaw.bak`, then `WITH MOVE` as in [`restore_both.sql`](./restore_both.sql).



## After restore



1. Run [`inventory_after_restore.sql`](./inventory_after_restore.sql) on both databases (or use existing TSV in [`output/`](./output/)).

2. Populate `map_metric_arcu_item` per [`.cursor/plans/l1_public_data_sources_90b1121e.plan.md`](../../.cursor/plans/l1_public_data_sources_90b1121e.plan.md).


