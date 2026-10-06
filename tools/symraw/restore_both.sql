-- Run inside container after compose up (sqlcmd -i restore_both.sql).
-- Backups mounted at /var/opt/mssql/backup/SymRaw.bak and SymAnalytics.bak

RESTORE DATABASE SymRaw
FROM DISK = N'/var/opt/mssql/backup/SymRaw.bak'
WITH
  MOVE N'SymRaw' TO N'/var/opt/mssql/data/SymRaw.mdf',
  MOVE N'SymRaw_log' TO N'/var/opt/mssql/data/SymRaw_log.ldf',
  REPLACE, STATS = 5;

RESTORE DATABASE SymAnalytics
FROM DISK = N'/var/opt/mssql/backup/SymAnalytics.bak'
WITH
  MOVE N'SymAnalytics' TO N'/var/opt/mssql/data/SymAnalytics.mdf',
  MOVE N'SymAnalytics_log' TO N'/var/opt/mssql/data/SymAnalytics_log.ldf',
  REPLACE, STATS = 10;
