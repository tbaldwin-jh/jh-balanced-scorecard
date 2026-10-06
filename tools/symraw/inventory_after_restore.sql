/* Run on restored SymRaw and SymAnalytics databases.
   Paste results into l1/ARCU_SYMRAW_METRIC_COVERAGE.md (post-restore section). */

SELECT DB_NAME() AS database_name;

SELECT
  s.name AS schema_name,
  o.name AS object_name,
  o.type_desc,
  SUM(p.rows) AS row_count
FROM sys.objects o
JOIN sys.schemas s ON s.schema_id = o.schema_id
LEFT JOIN sys.partitions p ON p.object_id = o.object_id AND p.index_id IN (0, 1)
WHERE o.type IN ('U', 'V')
GROUP BY s.name, o.name, o.type_desc
ORDER BY o.type_desc, s.name, o.name;

/* Keyword filter for scorecard mapping candidates */
SELECT
  s.name + '.' + o.name AS full_name,
  o.type_desc
FROM sys.objects o
JOIN sys.schemas s ON s.schema_id = o.schema_id
WHERE o.type IN ('U', 'V')
  AND (
    o.name LIKE '%GL%'
    OR o.name LIKE '%Loan%'
    OR o.name LIKE '%Share%'
    OR o.name LIKE '%Member%'
    OR o.name LIKE '%Delinq%'
    OR o.name LIKE '%Trans%'
    OR o.name LIKE '%Monetary%'
    OR o.name LIKE '%Branch%'
    OR o.name LIKE '%Income%'
    OR o.name LIKE '%Balance%'
    OR o.name LIKE '%Orig%'
    OR o.name LIKE '%Net%Worth%'
  )
ORDER BY full_name;
