import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Spacer,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type ViewId = "executive" | "board" | "lending" | "ops";
type MetricId =
  | "nim"
  | "efficiency"
  | "roa"
  | "loanGrowth"
  | "coreDeposits"
  | "productsPerHh"
  | "digitalActive"
  | "criticized"
  | "pastDue"
  | "liquidity"
  | "bsaAging"
  | "decisionCycle";

type Metric = {
  id: MetricId;
  name: string;
  perspective: "Financial" | "Customer" | "Risk" | "Capability";
  value: string;
  vsTarget: string;
  tone: "success" | "warning" | "danger" | "info";
  owner: string;
  period: string;
  formula: string;
  inputs: string;
  notes: string;
  views: ViewId[];
};

const METRICS: Metric[] = [
  {
    id: "nim",
    name: "Net interest margin (NIM)",
    perspective: "Financial",
    value: "3.42%",
    vsTarget: "Target 3.50% · -8 bps",
    tone: "warning",
    owner: "CFO / ALCO",
    period: "YTD annualized",
    formula:
      "NIM = Net Interest Income / Average Earning Assets\nwhere Net Interest Income = Interest Income - Interest Expense",
    inputs:
      "Interest income, interest expense, average earning assets (loans + securities + interest-bearing balances), usually daily or monthly average, annualized.",
    notes:
      "Community banks often annualize YTD NII as NII × (365 / days elapsed) before dividing. Keep the same averaging method period to period.",
    views: ["executive", "board"],
  },
  {
    id: "efficiency",
    name: "Efficiency ratio",
    perspective: "Financial",
    value: "61.8%",
    vsTarget: "Target ≤ 60% · +1.8 pts",
    tone: "warning",
    owner: "COO / CFO",
    period: "YTD",
    formula:
      "Efficiency Ratio = Noninterest Expense / (Net Interest Income + Noninterest Income)",
    inputs:
      "Noninterest expense (salaries, occupancy, tech, other), NII, fee and other noninterest income. Exclude provision for credit losses unless your board policy includes it.",
    notes:
      "Lower is better. Document whether one-time items (core conversion, merger costs) are excluded for management reporting.",
    views: ["executive", "board", "ops"],
  },
  {
    id: "roa",
    name: "Return on assets (ROA)",
    perspective: "Financial",
    value: "0.98%",
    vsTarget: "Target 1.05% · -7 bps",
    tone: "warning",
    owner: "CEO / CFO",
    period: "YTD annualized",
    formula: "ROA = Net Income / Average Total Assets",
    inputs:
      "GAAP net income (or board-approved adjusted NI), average total assets for the same period.",
    notes:
      "Annualize YTD NI the same way as NIM. Pair with ROE for board packs, but ROA is cleaner across leverage differences.",
    views: ["executive", "board"],
  },
  {
    id: "loanGrowth",
    name: "Loan growth",
    perspective: "Financial",
    value: "+6.1%",
    vsTarget: "Plan +7.0% · -0.9 pts",
    tone: "info",
    owner: "CLO / Lending",
    period: "YoY ending balances",
    formula:
      "Loan Growth = (Ending Gross Loans - Beginning Gross Loans) / Beginning Gross Loans",
    inputs:
      "Gross loans held for investment at period start and end. Report by portfolio (C&I, CRE, consumer, ag) in drill-down.",
    notes:
      "Prefer ending balances for franchise growth. Also show net loans after charge-offs if credit burn is material.",
    views: ["executive", "board", "lending"],
  },
  {
    id: "coreDeposits",
    name: "Core deposit growth / mix",
    perspective: "Customer",
    value: "+4.2% / 78%",
    vsTarget: "Growth plan +5% · Mix ≥ 75%",
    tone: "success",
    owner: "Retail / Treasury",
    period: "YoY / spot mix",
    formula:
      "Core Deposit Growth = (Ending Core - Beginning Core) / Beginning Core\nCore Mix = Core Deposits / Total Deposits\nCore ≈ DDA + Savings + MMDA (exclude CDs, brokered, and listing-service deposits)",
    inputs:
      "Deposit balances by product and acquisition channel. Brokered and listing-service flags must be reliable.",
    notes:
      "Show both growth and mix. Cheap sticky balances can shrink while mix looks fine if total deposits fall faster.",
    views: ["executive", "board"],
  },
  {
    id: "productsPerHh",
    name: "Products per household",
    perspective: "Customer",
    value: "2.4",
    vsTarget: "Target 2.6 · -0.2",
    tone: "warning",
    owner: "Retail / CS",
    period: "Month-end",
    formula:
      "Products per Household = Count of Active Product Relationships / Count of Households\nActive = open account or relationship with balance or activity in the last 90 days (define once and freeze)",
    inputs:
      "CIF / householding keys, product-type taxonomy (checking, savings, card, loan, treasury, wealth).",
    notes:
      "Householding quality drives this metric. Bad merges inflate or deflate the ratio. Track definition changes in DECISIONS-style notes.",
    views: ["executive", "board"],
  },
  {
    id: "digitalActive",
    name: "Digital active users",
    perspective: "Customer",
    value: "41%",
    vsTarget: "Target 45% · -4 pts",
    tone: "warning",
    owner: "Digital / Retail",
    period: "Trailing 30 days",
    formula:
      "Digital Active Rate = Digital Active Users / Eligible Customers\nDigital Active User = unique customer with qualifying login or monetary transaction in online or mobile in the period",
    inputs:
      "Digital channel event log (login, transfer, bill pay, mobile deposit), eligible base (retail customers with online enrollment or all households).",
    notes:
      "Pick enrolled vs all-customer denominator and stick to it. Absolute MAU is useful for ops; rate is better for scorecards.",
    views: ["executive", "ops"],
  },
  {
    id: "criticized",
    name: "Criticized assets",
    perspective: "Risk",
    value: "3.1%",
    vsTarget: "Limit ≤ 4.0% of loans",
    tone: "success",
    owner: "CRO / Credit",
    period: "Month-end",
    formula:
      "Criticized Asset Ratio = (Special Mention + Substandard + Doubtful + Loss) / Total Gross Loans\nOptional board view: Criticized / Tier 1 Capital",
    inputs:
      "Risk ratings from loan system, including accruing special mention and nonaccrual classified balances.",
    notes:
      "Do not mix criticized (includes special mention) with classified-only (substandard and worse) without labeling.",
    views: ["executive", "board", "lending"],
  },
  {
    id: "pastDue",
    name: "Past due 30+",
    perspective: "Risk",
    value: "1.18%",
    vsTarget: "Limit ≤ 1.50%",
    tone: "success",
    owner: "Credit Admin",
    period: "Month-end",
    formula:
      "Past Due 30+ Ratio = Principal Balance of Loans ≥ 30 Days Past Due / Total Gross Loans\nOften shown as: 30-59, 60-89, 90+ buckets, with nonaccrual called out separately",
    inputs:
      "Days past due from servicing system, unpaid principal balance, nonaccrual flags.",
    notes:
      "Some boards want past due including nonaccrual; others want accruing past due only. Label the version on the tile.",
    views: ["executive", "board", "lending"],
  },
  {
    id: "liquidity",
    name: "Wholesale funding reliance",
    perspective: "Risk",
    value: "12.4%",
    vsTarget: "Limit ≤ 15%",
    tone: "success",
    owner: "Treasury / ALCO",
    period: "Month-end",
    formula:
      "Wholesale Reliance = Wholesale Funding / Total Liabilities\nWholesale Funding = Brokered Deposits + Listing-Service Deposits + FHLB Advances + Fed Funds Purchased + Other Wholesale Borrowings\nCompanion: Loan-to-Deposit = Total Loans / Total Deposits",
    inputs:
      "Liability balances by funding type, brokered and listing flags, FHLB and wholesale borrowing accounts.",
    notes:
      "Community banks often watch LTD and on-hand liquidity (cash + unpledged securities + unused FHLB) alongside this ratio.",
    views: ["executive", "board"],
  },
  {
    id: "bsaAging",
    name: "BSA alert aging",
    perspective: "Risk",
    value: "18 days",
    vsTarget: "SLA ≤ 20 days avg · 6% > 30d",
    tone: "success",
    owner: "BSA Officer",
    period: "Open inventory",
    formula:
      "Avg Alert Age = Sum(As-Of Date - Alert Open Date) / Count of Open Alerts\nAged Share = Open Alerts with Age > 30 Days / Open Alerts\nAlso track SAR filing timeliness vs regulatory clock",
    inputs:
      "AML case/alert system open date, status, disposition date, SAR due dates.",
    notes:
      "Average can hide a stale tail. Always show % aged past SLA beside the average.",
    views: ["executive", "ops", "board"],
  },
  {
    id: "decisionCycle",
    name: "Loan decision cycle time",
    perspective: "Capability",
    value: "6.5 days",
    vsTarget: "Target ≤ 5.0 days median",
    tone: "danger",
    owner: "Lending Ops",
    period: "Trailing 90 days",
    formula:
      "Decision Cycle Time (median) = Median(Decision Timestamp - Application Received Timestamp)\nfor applications decided in the period\nSegment by consumer vs commercial, and by auto-decision vs manual",
    inputs:
      "LOS timestamps: application received, first complete package, decision, and optional docs-complete clock stops.",
    notes:
      "Use median, not mean. Pause the clock for borrower-caused document gaps if policy allows, and disclose that rule.",
    views: ["executive", "lending", "ops"],
  },
];

const VIEWS: { id: ViewId; label: string; purpose: string }[] = [
  {
    id: "executive",
    label: "Executive home",
    purpose: "One-page balanced scorecard. All 12 metrics, status vs target, owner.",
  },
  {
    id: "board",
    label: "Board",
    purpose: "Capital, earnings, franchise, and risk posture. Fewer ops detail tiles.",
  },
  {
    id: "lending",
    label: "Lending",
    purpose: "Growth, credit quality, and speed-to-decision for the credit engine.",
  },
  {
    id: "ops",
    label: "Ops / digital",
    purpose: "Efficiency, channel adoption, BSA throughput, and cycle-time bottlenecks.",
  },
];

function metricById(id: MetricId): Metric {
  return METRICS.find((m) => m.id === id)!;
}

export default function CommunityBankScorecardWireframe() {
  const theme = useHostTheme();
  const [view, setView] = useCanvasState<ViewId>("scorecard-view", "executive");
  const [selected, setSelected] = useCanvasState<MetricId>(
    "scorecard-metric",
    "nim",
  );

  const viewMeta = VIEWS.find((v) => v.id === view)!;
  const visible = METRICS.filter((m) => m.views.includes(view));
  const active = metricById(selected);
  const selectedVisible = visible.some((m) => m.id === selected)
    ? active
    : visible[0];

  const toneCount = {
    success: visible.filter((m) => m.tone === "success").length,
    warning: visible.filter((m) => m.tone === "warning").length,
    danger: visible.filter((m) => m.tone === "danger").length,
  };

  return (
    <Stack gap={20}>
      <Stack gap={6}>
        <H1>Community bank balanced scorecard</H1>
        <Text tone="secondary">
          Wireframe with illustrative sample values. Not a live FI feed. Period
          labels and formulas are the durable part.
        </Text>
      </Stack>

      <Row gap={8} wrap>
        {VIEWS.map((v) => {
          const pill = (
            <Pill active={view === v.id} onClick={() => setView(v.id)}>
              {v.label}
            </Pill>
          );
          return <span key={v.id}>{pill}</span>;
        })}
      </Row>

      <Callout tone="info" title={viewMeta.label}>
        {viewMeta.purpose}
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat value={String(visible.length)} label="Metrics on this view" />
        <Stat
          value={String(toneCount.success)}
          label="On / better than target"
          tone="success"
        />
        <Stat
          value={String(toneCount.warning)}
          label="Watch"
          tone="warning"
        />
        <Stat
          value={String(toneCount.danger)}
          label="Off target"
          tone="danger"
        />
      </Grid>

      <Divider />

      <H2>Dashboard wireframe</H2>
      <Text tone="secondary" size="small">
        Layout sketch: header strip, KPI grid, then formula inspector. Click a
        metric card to load its calculation.
      </Text>

      <Card>
        <CardHeader
          trailing={
            <Text size="small" tone="tertiary">
              As of 2026-07-31 · Sample bank
            </Text>
          }
        >
          {viewMeta.label} · top bar
        </CardHeader>
        <CardBody>
          <Row gap={16} wrap>
            <Text size="small" tone="secondary">
              Logo / FI name
            </Text>
            <Text size="small" tone="secondary">
              Period: MTD | QTD | YTD
            </Text>
            <Text size="small" tone="secondary">
              Compare: Plan | Prior year | Peer
            </Text>
            <Spacer />
            <Text size="small" tone="secondary">
              Export board pack
            </Text>
          </Row>
        </CardBody>
      </Card>

      <Grid columns={3} gap={12}>
        {visible.map((m) => {
          const isActive = selectedVisible.id === m.id;
          return (
            <div
              key={m.id}
              style={{
                outline: isActive
                  ? `2px solid ${theme.accent.primary}`
                  : undefined,
                borderRadius: 8,
              }}
            >
              <Card>
                <CardHeader trailing={<Pill size="sm">{m.perspective}</Pill>}>
                  {m.name}
                </CardHeader>
                <CardBody>
                  <Stack gap={10}>
                    <Stat value={m.value} label={m.vsTarget} tone={m.tone} />
                    <Text size="small" tone="tertiary">
                      Owner: {m.owner} · {m.period}
                    </Text>
                    <Pill active={isActive} onClick={() => setSelected(m.id)}>
                      {isActive ? "Showing formula" : "Show formula"}
                    </Pill>
                  </Stack>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </Grid>

      <Divider />

      <H2>Calculation inspector</H2>
      <Card>
        <CardHeader trailing={<Pill size="sm">{selectedVisible.perspective}</Pill>}>
          {selectedVisible.name}
        </CardHeader>
        <CardBody>
          <Stack gap={12}>
            <Grid columns={3} gap={12}>
              <Stack gap={4}>
                <Text size="small" tone="tertiary">
                  Sample value
                </Text>
                <Text weight="semibold">{selectedVisible.value}</Text>
              </Stack>
              <Stack gap={4}>
                <Text size="small" tone="tertiary">
                  Owner
                </Text>
                <Text weight="semibold">{selectedVisible.owner}</Text>
              </Stack>
              <Stack gap={4}>
                <Text size="small" tone="tertiary">
                  Cadence
                </Text>
                <Text weight="semibold">{selectedVisible.period}</Text>
              </Stack>
            </Grid>

            <Stack gap={4}>
              <H3>Formula</H3>
              <Text
                style={{
                  fontFamily: theme.kind ? "inherit" : undefined,
                  whiteSpace: "pre-wrap",
                  background: theme.fill.tertiary,
                  padding: 12,
                  borderRadius: 6,
                }}
              >
                {selectedVisible.formula}
              </Text>
            </Stack>

            <Stack gap={4}>
              <H3>Inputs</H3>
              <Text tone="secondary">{selectedVisible.inputs}</Text>
            </Stack>

            <Stack gap={4}>
              <H3>Definition notes</H3>
              <Text tone="secondary">{selectedVisible.notes}</Text>
            </Stack>
          </Stack>
        </CardBody>
      </Card>

      <H2>All 12 formulas (reference)</H2>
      <Table
        stickyHeader
        striped
        headers={["Metric", "Formula", "Owner"]}
        columnAlign={["left", "left", "left"]}
        rows={METRICS.map((m) => [
          m.name,
          m.formula.replace(/\n/g, " · "),
          m.owner,
        ])}
      />

      <H2>Suggested page map</H2>
      <Table
        headers={["View", "Primary tiles", "Drill-downs"]}
        rows={[
          [
            "Executive home",
            "All 12 scorecard metrics",
            "Click-through to Board / Lending / Ops detail",
          ],
          [
            "Board",
            "NIM, Efficiency, ROA, Loan growth, Core deposits, Products/HH, Criticized, Past due, Wholesale reliance, BSA aging",
            "Peer charts, capital, provision trend",
          ],
          [
            "Lending",
            "Loan growth, Criticized, Past due, Decision cycle time",
            "Portfolio mix, pipeline conversion, exception queues",
          ],
          [
            "Ops / digital",
            "Efficiency, Digital active, BSA aging, Decision cycle time",
            "Channel funnel, alert inventory, STP / exception rate",
          ],
        ]}
      />

      <Callout tone="neutral" title="Implementation order">
        Lock definitions and owners first, then wire source systems (core,
        LOS, AML, digital events, GL). Sample values above are placeholders for
        layout only.
      </Callout>
    </Stack>
  );
}
