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
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type Mode = "bank" | "credit_union" | "compare";
type Perspective =
  | "All"
  | "Financial"
  | "Customer"
  | "Internal Process"
  | "Learning Growth"
  | "Risk";
type Scope = "shared" | "bank" | "credit_union";

type Metric = {
  id: string;
  name: string;
  perspective: Exclude<Perspective, "All">;
  scope: Scope;
  formula: string;
  whyDiffers: string;
  bankSample?: string;
  bankTarget?: string;
  bankPeer?: string;
  cuSample?: string;
  cuTarget?: string;
  cuPeer?: string;
  toneBank?: "success" | "warning" | "danger" | "info";
  toneCu?: "success" | "warning" | "danger" | "info";
  camels: string;
};

const PEERS = {
  bank: { roa: "1.19%", nim: "3.78%", efficiency: "63.2%" },
  cu: { roa: "0.66%", nim: "3.69%", efficiency: "79.1%" },
};

const METRICS: Metric[] = [
  {
    id: "roa",
    name: "Return on assets",
    perspective: "Financial",
    scope: "shared",
    formula: "ROA = Net Income / Average Total Assets",
    whyDiffers:
      "Same formula. CU ROA is structurally lower because value returns to members via rates/fees/service, not shareholders. Still the capital-build constraint for CUs.",
    bankSample: "0.98%",
    bankTarget: "1.05%",
    bankPeer: PEERS.bank.roa,
    cuSample: "0.72%",
    cuTarget: "0.70%",
    cuPeer: PEERS.cu.roa,
    toneBank: "warning",
    toneCu: "success",
    camels: "E",
  },
  {
    id: "nim",
    name: "Net interest margin",
    perspective: "Financial",
    scope: "shared",
    formula: "NIM = (Interest Income − Interest Expense) / Average Earning Assets",
    whyDiffers:
      "Nearly identical economics. Peer medians are close; interpretation differs because CUs often price for member benefit.",
    bankSample: "3.42%",
    bankTarget: "3.50%",
    bankPeer: PEERS.bank.nim,
    cuSample: "3.55%",
    cuTarget: "3.50%",
    cuPeer: PEERS.cu.nim,
    toneBank: "warning",
    toneCu: "success",
    camels: "E",
  },
  {
    id: "efficiency",
    name: "Efficiency ratio",
    perspective: "Financial",
    scope: "shared",
    formula: "Efficiency = Noninterest Expense / (NII + Noninterest Income)",
    whyDiffers:
      "Same formula, different peer bar. Bank medians ~63%; CU medians ~79%. Never benchmark a CU to a bank efficiency peer set.",
    bankSample: "61.8%",
    bankTarget: "≤ 60%",
    bankPeer: PEERS.bank.efficiency,
    cuSample: "77.4%",
    cuTarget: "≤ 78%",
    cuPeer: PEERS.cu.efficiency,
    toneBank: "warning",
    toneCu: "success",
    camels: "E",
  },
  {
    id: "loan_growth",
    name: "Loan growth",
    perspective: "Financial",
    scope: "shared",
    formula:
      "Loan Growth = (Ending Gross Loans − Beginning Gross Loans) / Beginning Gross Loans",
    whyDiffers:
      "Shared growth math. Banks segment C&I/CRE; CUs segment auto/mortgage/card/MBL and watch the MBL cap.",
    bankSample: "+6.1%",
    bankTarget: "+7.0%",
    bankPeer: "+4.8%",
    cuSample: "+5.4%",
    cuTarget: "+6.0%",
    cuPeer: "+4.2%",
    toneBank: "warning",
    toneCu: "warning",
    camels: "A",
  },
  {
    id: "roe",
    name: "Return on equity",
    perspective: "Financial",
    scope: "bank",
    formula: "ROE = Net Income / Average Equity Capital",
    whyDiffers:
      "Shareholder return lens. Not standard for credit unions (no stock equity).",
    bankSample: "11.2%",
    bankTarget: "12.0%",
    bankPeer: "10.5%",
    toneBank: "warning",
    camels: "E",
  },
  {
    id: "eps_growth",
    name: "EPS growth",
    perspective: "Financial",
    scope: "bank",
    formula: "EPS Growth = (EPS_t − EPS_t−1) / |EPS_t−1|",
    whyDiffers: "Relevant for stock banks / BHCs only. CUs cannot issue stock.",
    bankSample: "+4.8%",
    bankTarget: "+6.0%",
    bankPeer: "+5.2%",
    toneBank: "warning",
    camels: "E",
  },
  {
    id: "tier1",
    name: "Tier 1 leverage",
    perspective: "Financial",
    scope: "bank",
    formula: "Tier 1 Leverage = Tier 1 Capital / Average Total Assets",
    whyDiffers:
      "Basel / PCA capital language for banks. CUs use Net Worth Ratio (≥7% well capitalized).",
    bankSample: "9.8%",
    bankTarget: "≥ 9.0%",
    bankPeer: "9.5%",
    toneBank: "success",
    camels: "C",
  },
  {
    id: "net_worth",
    name: "Net worth ratio",
    perspective: "Financial",
    scope: "credit_union",
    formula: "Net Worth Ratio = Net Worth / Total Assets",
    whyDiffers:
      "CU-only capital adequacy metric. Capital can only be built by retaining earnings.",
    cuSample: "10.8%",
    cuTarget: "≥ 10.0%",
    cuPeer: "11.1%",
    toneCu: "success",
    camels: "C",
  },
  {
    id: "patronage",
    name: "Member benefit / patronage capacity",
    perspective: "Financial",
    scope: "credit_union",
    formula:
      "Board method: rate/fee advantage vs market + optional patronage dividend",
    whyDiffers:
      "Cooperative value returned to members. Bank analog is shareholder dividends / franchise value — different stakeholder.",
    cuSample: "$186 / member",
    cuTarget: "≥ $150",
    cuPeer: "n/a",
    toneCu: "success",
    camels: "E",
  },
  {
    id: "core_mix",
    name: "Core funding mix",
    perspective: "Customer",
    scope: "shared",
    formula:
      "Core Mix = Core Deposits or Shares / Total Deposits or Shares",
    whyDiffers:
      "Same franchise-funding idea. Banks say deposits; CUs say shares. Exclude CDs/brokered if policy defines core that way.",
    bankSample: "78%",
    bankTarget: "≥ 75%",
    bankPeer: "74%",
    cuSample: "82%",
    cuTarget: "≥ 80%",
    cuPeer: "81%",
    toneBank: "success",
    toneCu: "success",
    camels: "L",
  },
  {
    id: "products_hh",
    name: "Products per household",
    perspective: "Customer",
    scope: "bank",
    formula: "Active Product Relationships / Households",
    whyDiffers:
      "Bank householding metric. CU analog is products per member / average member relationship.",
    bankSample: "2.4",
    bankTarget: "2.6",
    bankPeer: "2.35",
    toneBank: "warning",
    camels: "M",
  },
  {
    id: "amr",
    name: "Average member relationship",
    perspective: "Customer",
    scope: "credit_union",
    formula: "AMR = (Total Loans + Total Shares) / Members",
    whyDiffers:
      "Signature CU franchise depth metric. Banks usually track products per household instead.",
    cuSample: "$28,400",
    cuTarget: "≥ $27,000",
    cuPeer: "$26,800",
    toneCu: "success",
    camels: "M",
  },
  {
    id: "growth_base",
    name: "Customer / member growth",
    perspective: "Customer",
    scope: "shared",
    formula:
      "Growth = (Ending Count − Beginning Count) / Beginning Count",
    whyDiffers:
      "Banks often count households; CUs count members (ownership base). Net new per branch is a useful ops cut for both.",
    bankSample: "+2.1%",
    bankTarget: "+2.5%",
    bankPeer: "+1.8%",
    cuSample: "+3.4%",
    cuTarget: "+3.0%",
    cuPeer: "+2.6%",
    toneBank: "warning",
    toneCu: "success",
    camels: "M",
  },
  {
    id: "digital",
    name: "Digital active rate",
    perspective: "Customer",
    scope: "shared",
    formula: "Digital Active Users / Eligible Base",
    whyDiffers:
      "Shared channel KPI. Lock enrolled vs all-base denominator and keep it stable.",
    bankSample: "41%",
    bankTarget: "45%",
    bankPeer: "38%",
    cuSample: "48%",
    cuTarget: "50%",
    cuPeer: "44%",
    toneBank: "warning",
    toneCu: "warning",
    camels: "M",
  },
  {
    id: "nps",
    name: "Satisfaction / NPS",
    perspective: "Customer",
    scope: "shared",
    formula: "NPS = % Promoters − % Detractors",
    whyDiffers:
      "Shared voice-of-customer. CU surveys often emphasize cooperative identity and member value.",
    bankSample: "42",
    bankTarget: "≥ 45",
    bankPeer: "40",
    cuSample: "58",
    cuTarget: "≥ 55",
    cuPeer: "52",
    toneBank: "warning",
    toneCu: "success",
    camels: "M",
  },
  {
    id: "decision_cycle",
    name: "Loan decision cycle time",
    perspective: "Internal Process",
    scope: "shared",
    formula: "Median(Decision − Application Received)",
    whyDiffers:
      "Shared speed KPI. Banks split consumer vs commercial; CUs split auto/mortgage/MBL.",
    bankSample: "6.5 days",
    bankTarget: "≤ 5.0 days",
    bankPeer: "5.8 days",
    cuSample: "4.2 days",
    cuTarget: "≤ 4.0 days",
    cuPeer: "4.5 days",
    toneBank: "danger",
    toneCu: "warning",
    camels: "M",
  },
  {
    id: "ltd_lts",
    name: "Loan-to-deposit / loan-to-share",
    perspective: "Internal Process",
    scope: "shared",
    formula: "Banks: Loans / Deposits · CUs: Loans / Shares",
    whyDiffers:
      "Same utilization concept; nomenclature tracks funding base (deposits vs shares).",
    bankSample: "86%",
    bankTarget: "80%–90%",
    bankPeer: "84%",
    cuSample: "79%",
    cuTarget: "75%–88%",
    cuPeer: "78%",
    toneBank: "success",
    toneCu: "success",
    camels: "L",
  },
  {
    id: "commercial_pipeline",
    name: "Commercial pipeline conversion",
    perspective: "Internal Process",
    scope: "bank",
    formula: "Funded Commercial / Qualified Pipeline Opportunities",
    whyDiffers:
      "Community banks often differentiate on C&I/CRE relationships. CUs face MBL statutory limits.",
    bankSample: "28%",
    bankTarget: "≥ 30%",
    bankPeer: "26%",
    toneBank: "warning",
    camels: "M",
  },
  {
    id: "mbl_cap",
    name: "MBL utilization vs statutory cap",
    perspective: "Internal Process",
    scope: "credit_union",
    formula: "MBL Outstanding / Statutory Cap (~12.25% of assets, subject to exceptions)",
    whyDiffers:
      "Hard CU regulatory constraint with no bank equivalent. Shapes commercial strategy.",
    cuSample: "64% of cap",
    cuTarget: "≤ 85% of cap",
    cuPeer: "n/a",
    toneCu: "success",
    camels: "A",
  },
  {
    id: "fom",
    name: "Field-of-membership adherence",
    perspective: "Internal Process",
    scope: "credit_union",
    formula: "Confirmed Eligible New Members / New Memberships",
    whyDiffers: "CU-only regulatory identity control. Banks have no FOM.",
    cuSample: "99.6%",
    cuTarget: "≥ 99%",
    cuPeer: "n/a",
    toneCu: "success",
    camels: "M",
  },
  {
    id: "onboarding",
    name: "Member onboarding cycle time",
    perspective: "Internal Process",
    scope: "credit_union",
    formula: "Median(Account Ready − Membership Application)",
    whyDiffers:
      "Includes FOM eligibility checks unique to CUs. Bank analog is new-account opening time.",
    cuSample: "1.2 days",
    cuTarget: "≤ 1.0 day",
    cuPeer: "1.4 days",
    toneCu: "warning",
    camels: "M",
  },
  {
    id: "engagement",
    name: "Employee engagement",
    perspective: "Learning Growth",
    scope: "shared",
    formula: "Vendor engagement index / survey mean",
    whyDiffers:
      "Shared leading indicator. CU culture often ties engagement to cooperative mission.",
    bankSample: "72",
    bankTarget: "≥ 75",
    bankPeer: "70",
    cuSample: "78",
    cuTarget: "≥ 75",
    cuPeer: "74",
    toneBank: "warning",
    toneCu: "success",
    camels: "M",
  },
  {
    id: "turnover",
    name: "Voluntary turnover",
    perspective: "Learning Growth",
    scope: "shared",
    formula: "Voluntary Separations / Average Headcount",
    whyDiffers: "Shared talent KPI. Segment by role for both charters.",
    bankSample: "14%",
    bankTarget: "≤ 12%",
    bankPeer: "15%",
    cuSample: "11%",
    cuTarget: "≤ 12%",
    cuPeer: "13%",
    toneBank: "warning",
    toneCu: "success",
    camels: "M",
  },
  {
    id: "commercial_skills",
    name: "Commercial lending skill coverage",
    perspective: "Learning Growth",
    scope: "bank",
    formula: "Credentialed Commercial Lenders / Commercial Lender Seats",
    whyDiffers:
      "Supports bank C&I/CRE franchise. Optional for CUs with material MBL programs.",
    bankSample: "81%",
    bankTarget: "≥ 85%",
    bankPeer: "78%",
    toneBank: "warning",
    camels: "M",
  },
  {
    id: "board_edu",
    name: "Volunteer board education hours",
    perspective: "Learning Growth",
    scope: "credit_union",
    formula: "Average Education Hours per Director per Year",
    whyDiffers:
      "Volunteer lay boards are a CU governance hallmark. Track separately from staff training.",
    cuSample: "18 hrs",
    cuTarget: "≥ 16 hrs",
    cuPeer: "n/a",
    toneCu: "success",
    camels: "M",
  },
  {
    id: "member_edu",
    name: "Member education reach",
    perspective: "Learning Growth",
    scope: "credit_union",
    formula: "Members Reached by Education / Total Members",
    whyDiffers:
      "Supports cooperative mission. Banks may run community education; less core to ownership model.",
    cuSample: "12%",
    cuTarget: "≥ 10%",
    cuPeer: "9%",
    toneCu: "success",
    camels: "M",
  },
  {
    id: "criticized",
    name: "Criticized assets",
    perspective: "Risk",
    scope: "shared",
    formula: "(SM + Substandard + Doubtful + Loss) / Gross Loans",
    whyDiffers:
      "Shared credit language. Label criticized vs classified-only. Consumer-heavy CUs may lead with delinquency.",
    bankSample: "3.1%",
    bankTarget: "≤ 4.0%",
    bankPeer: "3.4%",
    cuSample: "2.4%",
    cuTarget: "≤ 3.5%",
    cuPeer: "2.8%",
    toneBank: "success",
    toneCu: "success",
    camels: "A",
  },
  {
    id: "past_due",
    name: "Past due 30+ / delinquency",
    perspective: "Risk",
    scope: "shared",
    formula: "UPB ≥ 30 DPD / Gross Loans",
    whyDiffers: "Primary asset-quality KPI for many CUs; universal for both.",
    bankSample: "1.18%",
    bankTarget: "≤ 1.50%",
    bankPeer: "1.25%",
    cuSample: "0.92%",
    cuTarget: "≤ 1.25%",
    cuPeer: "1.05%",
    toneBank: "success",
    toneCu: "success",
    camels: "A",
  },
  {
    id: "nco",
    name: "Net charge-offs",
    perspective: "Risk",
    scope: "shared",
    formula: "(Charge-offs − Recoveries) / Average Loans",
    whyDiffers: "Shared realized credit loss KPI. Annualize consistently with peers.",
    bankSample: "0.22%",
    bankTarget: "≤ 0.30%",
    bankPeer: "0.28%",
    cuSample: "0.31%",
    cuTarget: "≤ 0.40%",
    cuPeer: "0.35%",
    toneBank: "success",
    toneCu: "success",
    camels: "A",
  },
  {
    id: "cre",
    name: "CRE concentration",
    perspective: "Risk",
    scope: "bank",
    formula: "CRE / Total Risk-Based Capital (interagency definitions)",
    whyDiffers:
      "Classic community bank concentration risk. CUs track MBL concentration instead when material.",
    bankSample: "248%",
    bankTarget: "≤ 300%",
    bankPeer: "260%",
    toneBank: "success",
    camels: "A",
  },
  {
    id: "wholesale",
    name: "Wholesale funding reliance",
    perspective: "Risk",
    scope: "shared",
    formula: "Wholesale Funding / Total Liabilities",
    whyDiffers: "Shared liquidity risk KPI. Pair with on-hand liquidity for ALCO.",
    bankSample: "12.4%",
    bankTarget: "≤ 15%",
    bankPeer: "14%",
    cuSample: "8.1%",
    cuTarget: "≤ 12%",
    cuPeer: "9.5%",
    toneBank: "success",
    toneCu: "success",
    camels: "L",
  },
  {
    id: "bsa",
    name: "BSA alert aging",
    perspective: "Risk",
    scope: "shared",
    formula: "Avg Age = Sum(Age Days) / Open Alerts; show % > 30 days",
    whyDiffers: "Shared compliance KRI. Always show the aged tail, not only the average.",
    bankSample: "18 days",
    bankTarget: "≤ 20 days",
    bankPeer: "21 days",
    cuSample: "16 days",
    cuTarget: "≤ 20 days",
    cuPeer: "19 days",
    toneBank: "success",
    toneCu: "success",
    camels: "M",
  },
];

const PERSPECTIVES: Perspective[] = [
  "All",
  "Financial",
  "Customer",
  "Internal Process",
  "Learning Growth",
  "Risk",
];

const STRATEGY_LINKS = {
  bank: [
    ["Commercial skill coverage", "Pipeline conversion", "Loan growth"],
    ["Products per household", "Fee income mix", "ROA / ROE"],
    ["Core deposit mix", "Funding cost", "NIM"],
    ["Decision cycle time", "Win rate", "Loan growth"],
    ["Credit quality", "Provision expense", "ROA"],
  ],
  credit_union: [
    ["Member education / NPS", "Member growth", "Share growth"],
    ["Average member relationship", "Loan + share depth", "NIM / ROA"],
    ["Onboarding + FOM quality", "Member experience", "Retention"],
    ["Efficiency discipline", "Capital retention", "Net worth ratio"],
    ["Delinquency control", "NCO / provision", "ROA & capital build"],
  ],
};

function visibleForMode(m: Metric, mode: Mode): boolean {
  if (mode === "compare") return true;
  if (mode === "bank") return m.scope === "shared" || m.scope === "bank";
  return m.scope === "shared" || m.scope === "credit_union";
}

function sampleFor(m: Metric, mode: Mode): string {
  if (mode === "credit_union") return m.cuSample ?? "—";
  if (mode === "bank") return m.bankSample ?? "—";
  return m.bankSample && m.cuSample
    ? `Bank ${m.bankSample} · CU ${m.cuSample}`
    : m.bankSample ?? m.cuSample ?? "—";
}

function targetFor(m: Metric, mode: Mode): string {
  if (mode === "credit_union") return m.cuTarget ?? "—";
  if (mode === "bank") return m.bankTarget ?? "—";
  return m.bankTarget && m.cuTarget
    ? `B ${m.bankTarget} · CU ${m.cuTarget}`
    : m.bankTarget ?? m.cuTarget ?? "—";
}

function peerFor(m: Metric, mode: Mode): string {
  if (mode === "credit_union") return m.cuPeer ?? "—";
  if (mode === "bank") return m.bankPeer ?? "—";
  return m.bankPeer && m.cuPeer
    ? `B ${m.bankPeer} · CU ${m.cuPeer}`
    : m.bankPeer ?? m.cuPeer ?? "—";
}

function toneFor(
  m: Metric,
  mode: Mode,
): "success" | "warning" | "danger" | "info" | undefined {
  if (mode === "credit_union") return m.toneCu;
  if (mode === "bank") return m.toneBank;
  return m.toneBank ?? m.toneCu ?? "info";
}

function scopeLabel(scope: Scope): string {
  if (scope === "shared") return "Shared";
  if (scope === "bank") return "Bank only";
  return "CU only";
}

export default function CommunityFiBscFramework() {
  const theme = useHostTheme();
  const [mode, setMode] = useCanvasState<Mode>("fi-bsc-mode", "compare");
  const [perspective, setPerspective] = useCanvasState<Perspective>(
    "fi-bsc-perspective",
    "All",
  );
  const [selectedId, setSelectedId] = useCanvasState(
    "fi-bsc-metric",
    "roa",
  );

  const filtered = METRICS.filter(
    (m) =>
      visibleForMode(m, mode) &&
      (perspective === "All" || m.perspective === perspective),
  );

  const selected =
    filtered.find((m) => m.id === selectedId) ?? filtered[0] ?? METRICS[0];

  const sharedCount = filtered.filter((m) => m.scope === "shared").length;
  const bankOnly = filtered.filter((m) => m.scope === "bank").length;
  const cuOnly = filtered.filter((m) => m.scope === "credit_union").length;

  const modeTitle =
    mode === "bank"
      ? "Community bank scorecard"
      : mode === "credit_union"
        ? "Credit union scorecard"
        : "Bank vs credit union comparison";

  const strategy =
    mode === "credit_union" ? STRATEGY_LINKS.credit_union : STRATEGY_LINKS.bank;

  return (
    <Stack gap={20}>
      <Stack gap={6}>
        <H1>Community FI balanced scorecard framework</H1>
        <Text tone="secondary">
          Dual-mode research template for community banks and credit unions.
          Illustrative sample values (not a live feed). Peer baselines use Q1
          2026 sector medians for ROA, NIM, and efficiency.
        </Text>
      </Stack>

      <Row gap={8} wrap>
        <Pill active={mode === "compare"} onClick={() => setMode("compare")}>
          Compare both
        </Pill>
        <Pill active={mode === "bank"} onClick={() => setMode("bank")}>
          Community bank
        </Pill>
        <Pill
          active={mode === "credit_union"}
          onClick={() => setMode("credit_union")}
        >
          Credit union
        </Pill>
      </Row>

      <Callout
        tone="info"
        title={
          mode === "compare"
            ? "Same BSC skeleton, different stakeholder math"
            : mode === "bank"
              ? "Shareholder-owned · FDIC/OCC/Fed · UBPR peers"
              : "Member-owned · NCUA · FPR peers · tax-exempt cooperative"
        }
      >
        {mode === "compare"
          ? "Banks optimize for sustainable shareholder returns inside safety-and-soundness limits. Credit unions optimize for member value and capital retention — often accepting lower ROA and higher efficiency by design. Use shared metrics for the spine; swap capital, franchise-depth, and commercial metrics by charter."
          : mode === "bank"
            ? "Emphasize ROA/ROE, Tier 1 / CBLR, CRE concentration, commercial pipeline, and products per household. Peer against size-matched community banks (UBPR), not credit unions."
            : "Emphasize ROA as capital-build fuel, net worth ratio, average member relationship, member growth, MBL cap utilization, and FOM adherence. Peer against size-matched credit unions (FPR), not banks."}
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat value={String(filtered.length)} label="Metrics in view" />
        <Stat value={String(sharedCount)} label="Shared" tone="info" />
        <Stat value={String(bankOnly)} label="Bank-only" tone="warning" />
        <Stat value={String(cuOnly)} label="CU-only" tone="success" />
      </Grid>

      {mode === "compare" ? (
        <Grid columns={3} gap={12}>
          <Card>
            <CardHeader>Q1 2026 peer · ROA</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small" tone="secondary">
                  Bank median {PEERS.bank.roa} · CU median {PEERS.cu.roa}
                </Text>
                <Text weight="semibold">
                  CU ROA ~half of bank ROA by design, not distress alone
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Q1 2026 peer · NIM</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small" tone="secondary">
                  Bank {PEERS.bank.nim} · CU {PEERS.cu.nim}
                </Text>
                <Text weight="semibold">
                  Margins are close; earnings models diverge after OpEx and tax
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Q1 2026 peer · Efficiency</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small" tone="secondary">
                  Bank {PEERS.bank.efficiency} · CU {PEERS.cu.efficiency}
                </Text>
                <Text weight="semibold">
                  Never grade a CU efficiency ratio on a bank peer curve
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      ) : (
        <Grid columns={3} gap={12}>
          <Stat
            value={mode === "bank" ? PEERS.bank.roa : PEERS.cu.roa}
            label="Peer median ROA"
            tone="info"
          />
          <Stat
            value={mode === "bank" ? PEERS.bank.nim : PEERS.cu.nim}
            label="Peer median NIM"
            tone="info"
          />
          <Stat
            value={
              mode === "bank" ? PEERS.bank.efficiency : PEERS.cu.efficiency
            }
            label="Peer median efficiency"
            tone="info"
          />
        </Grid>
      )}

      <Divider />

      <Stack gap={8}>
        <H2>{modeTitle}</H2>
        <Row gap={8} wrap>
          {PERSPECTIVES.map((p) => (
            <span key={p}>
              <Pill
                active={perspective === p}
                onClick={() => setPerspective(p)}
              >
                {p}
              </Pill>
            </span>
          ))}
        </Row>
      </Stack>

      <Grid columns={3} gap={12}>
        {filtered.map((m) => {
          const active = selected.id === m.id;
          return (
            <div
              key={m.id}
              style={{
                outline: active
                  ? `2px solid ${theme.accent.primary}`
                  : undefined,
                borderRadius: 8,
              }}
            >
              <Card>
                <CardHeader
                  trailing={
                    <Row gap={4}>
                      <Pill size="sm">{m.perspective}</Pill>
                      <Pill
                        size="sm"
                        tone={
                          m.scope === "shared"
                            ? "info"
                            : m.scope === "bank"
                              ? "warning"
                              : "success"
                        }
                      >
                        {scopeLabel(m.scope)}
                      </Pill>
                    </Row>
                  }
                >
                  {m.name}
                </CardHeader>
                <CardBody>
                  <Stack gap={10}>
                    <Stat
                      value={sampleFor(m, mode)}
                      label={`Target ${targetFor(m, mode)}`}
                      tone={toneFor(m, mode)}
                    />
                    <Text size="small" tone="tertiary">
                      Peer {peerFor(m, mode)} · CAMELS {m.camels}
                    </Text>
                    <Pill active={active} onClick={() => setSelectedId(m.id)}>
                      {active ? "Showing detail" : "Show detail"}
                    </Pill>
                  </Stack>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </Grid>

      <Divider />

      <H2>Metric inspector</H2>
      <Card>
        <CardHeader
          trailing={
            <Row gap={4}>
              <Pill size="sm">{selected.perspective}</Pill>
              <Pill size="sm">{scopeLabel(selected.scope)}</Pill>
            </Row>
          }
        >
          {selected.name}
        </CardHeader>
        <CardBody>
          <Stack gap={12}>
            <Grid columns={3} gap={12}>
              <Stack gap={4}>
                <Text size="small" tone="tertiary">
                  Sample
                </Text>
                <Text weight="semibold">{sampleFor(selected, mode)}</Text>
              </Stack>
              <Stack gap={4}>
                <Text size="small" tone="tertiary">
                  Target / limit
                </Text>
                <Text weight="semibold">{targetFor(selected, mode)}</Text>
              </Stack>
              <Stack gap={4}>
                <Text size="small" tone="tertiary">
                  Peer
                </Text>
                <Text weight="semibold">{peerFor(selected, mode)}</Text>
              </Stack>
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
              <H3>Why bank and CU versions differ (or do not)</H3>
              <Text tone="secondary">{selected.whyDiffers}</Text>
            </Stack>
          </Stack>
        </CardBody>
      </Card>

      <H2>Strategy map (causal chains)</H2>
      <Text size="small" tone="secondary">
        {mode === "credit_union"
          ? "Credit union chains emphasize member value → relationship depth → capital retention."
          : mode === "bank"
            ? "Community bank chains emphasize commercial capability → franchise depth → shareholder returns inside risk limits."
            : "Showing community bank chains. Switch to Credit union mode for cooperative chains."}
      </Text>
      <Table
        headers={["Capability / leading", "Process / franchise", "Financial outcome"]}
        rows={strategy}
      />

      {mode === "compare" ? (
        <>
          <H2>Side-by-side charter differences</H2>
          <Table
            stickyHeader
            striped
            headers={["Topic", "Community bank", "Credit union"]}
            rows={[
              [
                "Owner / purpose",
                "Shareholders; profit within safety & soundness",
                "Members; cooperative value & access",
              ],
              [
                "Primary earnings KPI",
                "ROA, ROE, EPS growth",
                "ROA (capital build), member benefit capacity",
              ],
              [
                "Capital metric",
                "Tier 1 / CET1 / CBLR",
                "Net worth ratio (well cap ≥ 7%)",
              ],
              [
                "Funding language",
                "Deposits · LTD · core deposits",
                "Shares · LTS · core shares",
              ],
              [
                "Relationship depth",
                "Products per household",
                "Average member relationship / products per member",
              ],
              [
                "Commercial constraint",
                "CRE concentration guidance; broader C&I",
                "MBL statutory cap (~12.25% assets)",
              ],
              [
                "Peer source",
                "FDIC UBPR / FFIEC",
                "NCUA FPR / Callahan-style CU peers",
              ],
              [
                "Tax",
                "Federal income tax",
                "Federal tax-exempt (most CUs)",
              ],
              [
                "Efficiency peer bar (Q1 2026)",
                PEERS.bank.efficiency,
                PEERS.cu.efficiency,
              ],
              ["ROA peer bar (Q1 2026)", PEERS.bank.roa, PEERS.cu.roa],
            ]}
          />
        </>
      ) : null}

      <H2>Catalog coverage in this canvas</H2>
      <Table
        stickyHeader
        striped
        headers={["Metric", "Perspective", "Scope", "CAMELS"]}
        columnAlign={["left", "left", "left", "center"]}
        rows={filtered.map((m) => [
          m.name,
          m.perspective,
          scopeLabel(m.scope),
          m.camels,
        ])}
      />

      <Callout tone="neutral" title="Full catalog">
        This canvas embeds the executive subset. The full 47-metric dictionary
        with formulas, inputs, frequencies, and bank/CU notes lives in
        data/metric_catalog.json and data/metric_catalog.csv. Implementation
        steps are in docs/BSC_IMPLEMENTATION_GUIDE.md; philosophy in
        docs/BANK_VS_CU_FRAMEWORK.md.
      </Callout>
    </Stack>
  );
}
