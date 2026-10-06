import {
  BarChart,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  LineChart,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type Tone = "success" | "warning" | "danger" | "info";
type Perspective = "Financial" | "Customer" | "Risk" | "Capability";

type Kpi = {
  id: string;
  name: string;
  perspective: Perspective;
  actualDisplay: string;
  targetDisplay: string;
  peerDisplay: string;
  actual: number;
  target: number;
  peer: number;
  unit: "pct" | "number" | "days";
  higherIsBetter: boolean;
  tone: Tone;
  beatsPeer: boolean;
  formula: string;
  driverNote: string;
};

const KPIS: Kpi[] = [
  {
    id: "nim",
    name: "Net interest margin",
    perspective: "Financial",
    actualDisplay: "3.42%",
    targetDisplay: "3.50%",
    peerDisplay: "3.35%",
    actual: 3.42,
    target: 3.5,
    peer: 3.35,
    unit: "pct",
    higherIsBetter: true,
    tone: "warning",
    beatsPeer: true,
    formula: "NIM = (Interest Income - Interest Expense) / Average Earning Assets",
    driverNote:
      "Sample run-rate NII on ~$1.90B average earning assets. Gap to target is mostly funding cost and mix, not volume.",
  },
  {
    id: "efficiency",
    name: "Efficiency ratio",
    perspective: "Financial",
    actualDisplay: "61.8%",
    targetDisplay: "60.0%",
    peerDisplay: "63.5%",
    actual: 61.8,
    target: 60.0,
    peer: 63.5,
    unit: "pct",
    higherIsBetter: false,
    tone: "warning",
    beatsPeer: true,
    formula:
      "Efficiency = Noninterest Expense / (Net Interest Income + Noninterest Income)",
    driverNote:
      "Ahead of peer but still 180 bps behind plan. Expense growth and fee income are the two levers.",
  },
  {
    id: "roa",
    name: "Return on assets",
    perspective: "Financial",
    actualDisplay: "0.98%",
    targetDisplay: "1.05%",
    peerDisplay: "0.95%",
    actual: 0.98,
    target: 1.05,
    peer: 0.95,
    unit: "pct",
    higherIsBetter: true,
    tone: "warning",
    beatsPeer: true,
    formula: "ROA = Net Income / Average Total Assets",
    driverNote:
      "Jul 2026 sample: net income ~$21.8M on ~$2.22B average assets = 0.98%. At the same asset base, 1.05% needs ~$23.3M NI (about $1.5M more).",
  },
  {
    id: "loan_growth",
    name: "Loan growth",
    perspective: "Financial",
    actualDisplay: "+6.1%",
    targetDisplay: "+7.0%",
    peerDisplay: "+4.8%",
    actual: 6.1,
    target: 7.0,
    peer: 4.8,
    unit: "pct",
    higherIsBetter: true,
    tone: "warning",
    beatsPeer: true,
    formula:
      "Loan Growth = (Ending Gross Loans - Beginning Gross Loans) / Beginning Gross Loans",
    driverNote:
      "Growing faster than peer, still 90 bps short of plan. Watch CRE vs C&I mix in drill-through.",
  },
  {
    id: "core_deposits",
    name: "Core deposit growth / mix",
    perspective: "Customer",
    actualDisplay: "+4.2% / 78%",
    targetDisplay: "+5.0% / 75%",
    peerDisplay: "+3.5% / 74%",
    actual: 4.2,
    target: 5.0,
    peer: 3.5,
    unit: "pct",
    higherIsBetter: true,
    tone: "warning",
    beatsPeer: true,
    formula:
      "Growth = (Ending Core - Beginning Core) / Beginning Core; Mix = Core / Total Deposits",
    driverNote:
      "Growth variance uses the growth leg. Mix (78%) is already above the 75% floor.",
  },
  {
    id: "products_per_hh",
    name: "Products per household",
    perspective: "Customer",
    actualDisplay: "2.4",
    targetDisplay: "2.6",
    peerDisplay: "2.35",
    actual: 2.4,
    target: 2.6,
    peer: 2.35,
    unit: "number",
    higherIsBetter: true,
    tone: "warning",
    beatsPeer: true,
    formula:
      "Products per Household = Active Product Relationships / Households",
    driverNote:
      "Slightly ahead of peer; still 0.20 below plan. Householding quality matters as much as offers.",
  },
  {
    id: "digital_active",
    name: "Digital active users",
    perspective: "Customer",
    actualDisplay: "41%",
    targetDisplay: "45%",
    peerDisplay: "38%",
    actual: 41,
    target: 45,
    peer: 38,
    unit: "pct",
    higherIsBetter: true,
    tone: "warning",
    beatsPeer: true,
    formula: "Digital Active Rate = Digital Active Users / Eligible Customers",
    driverNote:
      "Ahead of peer by 300 bps; 400 bps behind target. Enrollment vs engagement is the next cut.",
  },
  {
    id: "criticized",
    name: "Criticized assets",
    perspective: "Risk",
    actualDisplay: "3.1%",
    targetDisplay: "4.0% limit",
    peerDisplay: "3.4%",
    actual: 3.1,
    target: 4.0,
    peer: 3.4,
    unit: "pct",
    higherIsBetter: false,
    tone: "success",
    beatsPeer: true,
    formula:
      "Criticized = (Special Mention + Substandard + Doubtful + Loss) / Gross Loans",
    driverNote:
      "Inside limit and better than peer. Keep special-mention migration watchlist on the credit page.",
  },
  {
    id: "past_due",
    name: "Past due 30+",
    perspective: "Risk",
    actualDisplay: "1.18%",
    targetDisplay: "1.50% limit",
    peerDisplay: "1.25%",
    actual: 1.18,
    target: 1.5,
    peer: 1.25,
    unit: "pct",
    higherIsBetter: false,
    tone: "success",
    beatsPeer: true,
    formula: "Past Due 30+ = UPB >= 30 DPD / Gross Loans",
    driverNote: "Inside limit and slightly better than peer median.",
  },
  {
    id: "wholesale",
    name: "Wholesale funding reliance",
    perspective: "Risk",
    actualDisplay: "12.4%",
    targetDisplay: "15.0% limit",
    peerDisplay: "14.0%",
    actual: 12.4,
    target: 15.0,
    peer: 14.0,
    unit: "pct",
    higherIsBetter: false,
    tone: "success",
    beatsPeer: true,
    formula: "Wholesale Reliance = Wholesale Funding / Total Liabilities",
    driverNote: "Comfortably inside limit and better than peer.",
  },
  {
    id: "bsa_aging",
    name: "BSA alert aging",
    perspective: "Risk",
    actualDisplay: "18 days",
    targetDisplay: "20 days SLA",
    peerDisplay: "21 days",
    actual: 18,
    target: 20,
    peer: 21,
    unit: "days",
    higherIsBetter: false,
    tone: "success",
    beatsPeer: true,
    formula: "Avg Alert Age = Sum(Age Days) / Open Alerts",
    driverNote: "Inside SLA and ahead of peer. Still watch the aged >30 day tail.",
  },
  {
    id: "decision_cycle",
    name: "Loan decision cycle time",
    perspective: "Capability",
    actualDisplay: "6.5 days",
    targetDisplay: "5.0 days",
    peerDisplay: "5.8 days",
    actual: 6.5,
    target: 5.0,
    peer: 5.8,
    unit: "days",
    higherIsBetter: false,
    tone: "danger",
    beatsPeer: false,
    formula:
      "Median(Decision Timestamp - Application Received Timestamp)",
    driverNote:
      "Behind target and peer. Split consumer auto-decision vs commercial manual queues next.",
  },
];

/** Sample ROA trend (%). */
const ROA_TREND = {
  categories: ["Mar", "Apr", "May", "Jun", "Jul"],
  actual: [0.94, 0.95, 0.96, 0.97, 0.98],
  peer: [0.93, 0.93, 0.94, 0.94, 0.95],
};

type GapResult = {
  label: string;
  favorable: boolean;
  inLine: boolean;
};

function formatGap(k: Kpi, compare: number): GapResult {
  const delta = k.actual - compare;
  if (Math.abs(delta) < 0.0005) {
    return { label: "In line", favorable: true, inLine: true };
  }
  const favorable = k.higherIsBetter ? delta > 0 : delta < 0;
  const abs = Math.abs(delta);
  let amount: string;
  if (k.unit === "pct") {
    const bps = Math.round(abs * 100);
    amount = bps >= 100 ? `${(abs).toFixed(2)} pts` : `${bps} bps`;
  } else if (k.unit === "days") {
    amount = `${abs.toFixed(1)} days`;
  } else {
    amount = abs.toFixed(2);
  }
  return {
    label: `${favorable ? "Ahead" : "Behind"} ${amount}`,
    favorable,
    inLine: false,
  };
}

function gapVsTarget(k: Kpi): GapResult {
  return formatGap(k, k.target);
}

function gapVsPeer(k: Kpi): GapResult {
  return formatGap(k, k.peer);
}

function statusLabel(tone: Tone): string {
  if (tone === "success") return "On target";
  if (tone === "warning") return "Watch";
  if (tone === "danger") return "Off target";
  return "Info";
}

function kpiById(id: string): Kpi {
  return KPIS.find((k) => k.id === id) ?? KPIS[2];
}

export default function BankPresidentScorecard() {
  const theme = useHostTheme();
  const [selectedId, setSelectedId] = useCanvasState("selected-kpi", "roa");
  const selected = kpiById(selectedId);

  const onTarget = KPIS.filter((k) => k.tone === "success").length;
  const watch = KPIS.filter((k) => k.tone === "warning").length;
  const off = KPIS.filter((k) => k.tone === "danger").length;
  const beatPeer = KPIS.filter((k) => k.beatsPeer).length;
  const aheadTarget = KPIS.filter((k) => gapVsTarget(k).favorable).length;

  const byPerspective = (p: Perspective) =>
    KPIS.filter((k) => k.perspective === p);

  const vsT = gapVsTarget(selected);
  const vsP = gapVsPeer(selected);

  return (
    <Stack gap={20}>
      <Stack gap={6}>
        <H1>Riverbend Community Bank | President Scorecard</H1>
        <Text tone="secondary">
          Power BI-style wireframe. Sample data as of July 2026. Peer = Assets
          $1B-$3B median. Click a KPI to drill.
        </Text>
      </Stack>

      <Card>
        <CardHeader>Report filters</CardHeader>
        <CardBody>
          <Row gap={8} wrap>
            <Pill active>Period: Jul 2026</Pill>
            <Pill active>Compare: Plan + Peer</Pill>
            <Pill active>Org: Riverbend</Pill>
            <Pill active>View: President</Pill>
          </Row>
        </CardBody>
      </Card>

      <Grid columns={5} gap={12}>
        <Stat value={String(onTarget)} label="On target" tone="success" />
        <Stat value={String(watch)} label="Watch" tone="warning" />
        <Stat value={String(off)} label="Off target" tone="danger" />
        <Stat
          value={`${aheadTarget} / ${KPIS.length}`}
          label="Ahead of target"
          tone="info"
        />
        <Stat
          value={`${beatPeer} / ${KPIS.length}`}
          label="Ahead of peer"
          tone="info"
        />
      </Grid>

      <Divider />

      <H2>Financial</H2>
      <Grid columns={2} gap={12}>
        {byPerspective("Financial").map((k) => (
          <div key={k.id}>
            <KpiCard
              kpi={k}
              selected={selectedId === k.id}
              onSelect={() => setSelectedId(k.id)}
            />
          </div>
        ))}
      </Grid>

      <H2>Customer / franchise</H2>
      <Grid columns={3} gap={12}>
        {byPerspective("Customer").map((k) => (
          <div key={k.id}>
            <KpiCard
              kpi={k}
              selected={selectedId === k.id}
              onSelect={() => setSelectedId(k.id)}
            />
          </div>
        ))}
      </Grid>

      <H2>Risk and ops</H2>
      <Grid columns={3} gap={12}>
        {[...byPerspective("Risk"), ...byPerspective("Capability")].map(
          (k) => (
            <div key={k.id}>
              <KpiCard
                kpi={k}
                selected={selectedId === k.id}
                onSelect={() => setSelectedId(k.id)}
              />
            </div>
          ),
        )}
      </Grid>

      <Divider />

      <H2>Drill: {selected.name}</H2>
      <Card>
        <CardHeader trailing={<Pill size="sm">{selected.perspective}</Pill>}>
          {selected.name}
        </CardHeader>
        <CardBody>
          <Stack gap={14}>
            <Row gap={8} wrap>
              <Pill active={vsT.inLine || vsT.favorable}>
                vs Target: {vsT.label}
              </Pill>
              <Pill active={vsP.inLine || vsP.favorable}>
                vs Peer: {vsP.label}
              </Pill>
              <Pill>{statusLabel(selected.tone)}</Pill>
            </Row>

            <Grid columns={3} gap={12}>
              <Stat
                value={selected.actualDisplay}
                label="Actual"
                tone={selected.tone}
              />
              <Stat value={selected.targetDisplay} label="Target" />
              <Stat value={selected.peerDisplay} label="Peer median" />
            </Grid>

            <Stack gap={4}>
              <H3>Formula</H3>
              <Text
                style={{
                  whiteSpace: "pre-wrap",
                  background: theme.fill.tertiary,
                  padding: 12,
                  borderRadius: 6,
                }}
              >
                {selected.formula}
              </Text>
            </Stack>

            <Stack gap={4}>
              <H3>Drivers</H3>
              <Text tone="secondary">{selected.driverNote}</Text>
            </Stack>

            <H3>Actual vs target vs peer</H3>
            <BarChart
              categories={["Selected KPI"]}
              series={[
                { name: "Actual", data: [selected.actual], tone: "info" },
                { name: "Target", data: [selected.target], tone: "neutral" },
                { name: "Peer", data: [selected.peer], tone: "warning" },
              ]}
              valueSuffix={
                selected.unit === "pct"
                  ? "%"
                  : selected.unit === "days"
                    ? " d"
                    : ""
              }
              height={200}
              beginAtZero={selected.unit !== "pct" || selected.actual > 10}
              showValues
            />

            {selected.id === "roa" ? (
              <Stack gap={8}>
                <H3>ROA trend (sample)</H3>
                <Text size="small" tone="secondary">
                  Actual ROA with target 1.05% reference. Peer shown as second
                  series.
                </Text>
                <LineChart
                  categories={ROA_TREND.categories}
                  series={[
                    {
                      name: "Actual ROA",
                      data: ROA_TREND.actual,
                      tone: "info",
                    },
                    {
                      name: "Peer ROA",
                      data: ROA_TREND.peer,
                      tone: "warning",
                    },
                  ]}
                  valueSuffix="%"
                  beginAtZero={false}
                  height={220}
                  referenceLines={[
                    { value: 1.05, label: "Target 1.05%", tone: "danger" },
                  ]}
                />
                <BarChart
                  categories={["Net income ($M)", "NI needed for 1.05%"]}
                  series={[
                    {
                      name: "Jul 2026 sample",
                      data: [21.8, 23.3],
                      tone: "info",
                    },
                  ]}
                  valuePrefix="$"
                  valueSuffix="M"
                  height={180}
                  showValues
                />
                <Text size="small" tone="secondary">
                  Asset base held flat at ~$2.22B for the what-if. Closing 7 bps
                  to target is about $1.5M of incremental NI in this sample.
                </Text>
              </Stack>
            ) : null}
          </Stack>
        </CardBody>
      </Card>

      <H2>Variance detail</H2>
      <Table
        stickyHeader
        striped
        headers={[
          "Metric",
          "Actual",
          "Target",
          "Peer",
          "vs Target",
          "vs Peer",
          "Status",
        ]}
        columnAlign={[
          "left",
          "right",
          "right",
          "right",
          "left",
          "left",
          "left",
        ]}
        rowTone={KPIS.map((k) => k.tone)}
        rows={KPIS.map((k) => [
          k.name,
          k.actualDisplay,
          k.targetDisplay,
          k.peerDisplay,
          gapVsTarget(k).label,
          gapVsPeer(k).label,
          statusLabel(k.tone),
        ])}
      />

      <Callout tone="neutral" title="Wireframe note">
        Illustrative sample for layout review. Gaps use bps for rate metrics
        (pts when the gap is 100 bps or more). Click any KPI card to load the
        drill panel. ROA includes trend and NI what-if.
      </Callout>
    </Stack>
  );
}

function KpiCard({
  kpi,
  selected,
  onSelect,
}: {
  kpi: Kpi;
  selected: boolean;
  onSelect: () => void;
}) {
  const theme = useHostTheme();
  const vsT = gapVsTarget(kpi);
  const vsP = gapVsPeer(kpi);

  return (
    <div
      style={{
        outline: selected ? `2px solid ${theme.accent.primary}` : undefined,
        borderRadius: 8,
        cursor: "pointer",
      }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
    >
      <Card>
        <CardHeader trailing={<Pill size="sm">{kpi.perspective}</Pill>}>
          {kpi.name}
        </CardHeader>
        <CardBody>
          <Stack gap={10}>
            <Stat
              value={kpi.actualDisplay}
              label={`Actual · ${statusLabel(kpi.tone)}`}
              tone={kpi.tone}
            />
            <Grid columns={2} gap={8}>
              <Stack gap={2}>
                <Text size="small" tone="tertiary">
                  Target
                </Text>
                <Text weight="semibold">{kpi.targetDisplay}</Text>
              </Stack>
              <Stack gap={2}>
                <Text size="small" tone="tertiary">
                  Peer
                </Text>
                <Text weight="semibold">{kpi.peerDisplay}</Text>
              </Stack>
            </Grid>
            <Stack gap={2}>
              <Text size="small" tone="secondary">
                vs Target: {vsT.label}
              </Text>
              <Text size="small" tone="secondary">
                vs Peer: {vsP.label}
              </Text>
            </Stack>
            <Pill active={selected} onClick={onSelect}>
              {selected ? "Showing drill" : "Drill down"}
            </Pill>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}
