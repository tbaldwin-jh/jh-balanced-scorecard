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

type StepId =
  | "objectives"
  | "metrics"
  | "targets"
  | "peers"
  | "calcQa"
  | "publish";

type Objective = {
  id: string;
  code: string;
  name: string;
  perspective: string;
  owner: string;
  description: string;
  metricCode: string;
  metricName: string;
  formula: string;
  inputs: string[];
  target: string;
  peerMedian: string;
  peerSource: string;
  calcCheck: {
    engineValue: string;
    replayValue: string;
    match: boolean;
    notes: string;
  };
};

const STEPS: { id: StepId; label: string; question: string }[] = [
  {
    id: "objectives",
    label: "1. Objectives",
    question: "What outcomes does leadership own this year?",
  },
  {
    id: "metrics",
    label: "2. Metrics",
    question: "Which KPI proves each objective, and what is the formula?",
  },
  {
    id: "targets",
    label: "3. Targets",
    question: "What plan / limit do we commit to?",
  },
  {
    id: "peers",
    label: "4. Peers",
    question: "What peer median or percentile is the external bar?",
  },
  {
    id: "calcQa",
    label: "5. Calc QA",
    question: "Does the engine match a hand replay from source grains?",
  },
  {
    id: "publish",
    label: "6. Publish",
    question: "Promote locked defs into the executive scorecard.",
  },
];

const OBJECTIVES: Objective[] = [
  {
    id: "fin_roa",
    code: "FIN_ROA",
    name: "Deliver target return on assets",
    perspective: "Financial",
    owner: "CEO / CFO",
    description:
      "Translate margin and fee income into sustainable ROA without stretching credit or wholesale funding.",
    metricCode: "roa",
    metricName: "Return on assets",
    formula: "ROA = Net Income / Average Total Assets",
    inputs: [
      "GL net income (YTD annualized)",
      "Average total assets (daily or monthly avg)",
    ],
    target: "1.05%",
    peerMedian: "0.95%",
    peerSource: "Assets $1B-$3B peer median (sample)",
    calcCheck: {
      engineValue: "0.98%",
      replayValue: "0.98%",
      match: true,
      notes:
        "Replay: $21.756M NI / $2.220B avg assets = 0.980%. Annualization method locked to ALCO policy.",
    },
  },
  {
    id: "fin_nim",
    code: "FIN_NIM",
    name: "Sustain net interest margin",
    perspective: "Financial",
    owner: "CFO / ALCO",
    description:
      "Protect earning-asset yield and funding cost discipline through the rate cycle.",
    metricCode: "nim",
    metricName: "Net interest margin",
    formula: "NIM = (Interest Income - Interest Expense) / Average Earning Assets",
    inputs: [
      "Interest income",
      "Interest expense",
      "Average earning assets",
    ],
    target: "3.50%",
    peerMedian: "3.35%",
    peerSource: "Assets $1B-$3B peer median (sample)",
    calcCheck: {
      engineValue: "3.42%",
      replayValue: "3.42%",
      match: true,
      notes: "NII / AEA run-rate matches GL extract for Jul 2026 sample month.",
    },
  },
  {
    id: "rsk_credit",
    code: "RSK_CREDIT",
    name: "Maintain credit quality",
    perspective: "Risk",
    owner: "CRO / Credit",
    description:
      "Keep criticized and past-due levels inside board limits while growing loans.",
    metricCode: "criticized",
    metricName: "Criticized assets",
    formula:
      "Criticized = (SM + Substandard + Doubtful + Loss) / Gross Loans",
    inputs: [
      "Risk ratings from LOS",
      "Gross loans HFI",
      "Special mention included (not classified-only)",
    ],
    target: "<= 4.0% of loans",
    peerMedian: "3.4%",
    peerSource: "Assets $1B-$3B peer median (sample)",
    calcCheck: {
      engineValue: "3.1%",
      replayValue: "3.1%",
      match: true,
      notes:
        "Definition check: criticized includes special mention. Classified-only would read lower and fail peer compare.",
    },
  },
  {
    id: "cap_cycle",
    code: "CAP_CYCLE",
    name: "Shorten loan decision cycle time",
    perspective: "Capability",
    owner: "Lending Ops",
    description:
      "Reduce median time from application to decision for competitive speed.",
    metricCode: "decision_cycle",
    metricName: "Loan decision cycle time",
    formula: "Median(Decision Timestamp - Application Received Timestamp)",
    inputs: [
      "LOS application received",
      "LOS decision timestamp",
      "Clock-stop rules documented",
    ],
    target: "<= 5.0 days median",
    peerMedian: "5.8 days",
    peerSource: "Assets $1B-$3B peer median (sample)",
    calcCheck: {
      engineValue: "6.5 days",
      replayValue: "6.5 days",
      match: true,
      notes:
        "Median (not mean). Borrower doc gaps pause the clock per policy version 2026-03.",
    },
  },
];

export default function BscPlanningMockup() {
  const theme = useHostTheme();
  const [step, setStep] = useCanvasState<StepId>("bsc-plan-step", "objectives");
  const [objId, setObjId] = useCanvasState("bsc-plan-obj", "fin_roa");

  const stepMeta = STEPS.find((s) => s.id === step)!;
  const obj = OBJECTIVES.find((o) => o.id === objId) ?? OBJECTIVES[0];
  const qaPass = OBJECTIVES.filter((o) => o.calcCheck.match).length;

  return (
    <Stack gap={20}>
      <Stack gap={6}>
        <H1>Community Bank | BSC Planning Workspace</H1>
        <Text tone="secondary">
          Mockup of how planning works before the executive scorecard goes live:
          enter objectives, bind metrics, set targets, attach peer benchmarks,
          then pass calculation QA.
        </Text>
      </Stack>

      <Callout tone="info" title="How to enter a plan">
        Work the steps in order for each objective you own. (1) Create or update
        the objective (name, perspective, owner, intent). (2) Bind the proving
        metric and lock its formula and source inputs. (3) Enter the bank plan
        target or limit and cadence. (4) Attach the peer benchmark (peer set,
        median or percentile, as-of date). (5) Run calc QA and confirm engine
        value matches your source-grain replay. (6) Publish only after QA passes
        so the executive scorecard shows Actual, Target, and Peer correctly.
      </Callout>

      <Row gap={8} wrap>
        {STEPS.map((s) => (
          <span key={s.id}>
            <Pill active={step === s.id} onClick={() => setStep(s.id)}>
              {s.label}
            </Pill>
          </span>
        ))}
      </Row>

      <Card>
        <CardHeader>Planning step</CardHeader>
        <CardBody>
          <Stack gap={6}>
            <Text weight="semibold">{stepMeta.label}</Text>
            <Text tone="secondary">{stepMeta.question}</Text>
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={4} gap={12}>
        <Stat value={String(OBJECTIVES.length)} label="Sample objectives" />
        <Stat value="12" label="Scorecard metrics catalog" tone="info" />
        <Stat
          value={`${qaPass} / ${OBJECTIVES.length}`}
          label="Calc QA passed"
          tone="success"
        />
        <Stat value="Draft" label="Plan cycle FY2026" tone="warning" />
      </Grid>

      <Divider />

      <H2>Objective library (enter / edit)</H2>
      <Text size="small" tone="secondary">
        Select an objective to see metric binding, target, peer, and calc QA in
        the inspector. This is the planning side, not the president monitor.
      </Text>

      <Grid columns={2} gap={12}>
        {OBJECTIVES.map((o) => {
          const active = obj.id === o.id;
          return (
            <div
              key={o.id}
              style={{
                outline: active
                  ? `2px solid ${theme.accent.primary}`
                  : undefined,
                borderRadius: 8,
              }}
            >
              <Card>
                <CardHeader trailing={<Pill size="sm">{o.perspective}</Pill>}>
                  {o.code}
                </CardHeader>
                <CardBody>
                  <Stack gap={8}>
                    <Text weight="semibold">{o.name}</Text>
                    <Text size="small" tone="secondary">
                      Owner: {o.owner}
                    </Text>
                    <Text size="small" tone="tertiary">
                      Metric: {o.metricName}
                    </Text>
                    <Pill active={active} onClick={() => setObjId(o.id)}>
                      {active ? "Inspecting" : "Open in inspector"}
                    </Pill>
                  </Stack>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </Grid>

      <H2>Inspector: {obj.name}</H2>
      <Card>
        <CardHeader trailing={<Pill size="sm">{obj.perspective}</Pill>}>
          {obj.code}
        </CardHeader>
        <CardBody>
          <Stack gap={14}>
            <Text tone="secondary">{obj.description}</Text>

            {(step === "objectives" || step === "publish") && (
              <Stack gap={4}>
                <H3>Objective fields</H3>
                <Table
                  headers={["Field", "Value"]}
                  rows={[
                    ["Code", obj.code],
                    ["Name", obj.name],
                    ["Perspective", obj.perspective],
                    ["Owner", obj.owner],
                    ["Status", step === "publish" ? "Ready to publish" : "Draft"],
                  ]}
                />
              </Stack>
            )}

            {(step === "metrics" ||
              step === "calcQa" ||
              step === "publish") && (
              <Stack gap={4}>
                <H3>Metric binding</H3>
                <Text
                  style={{
                    whiteSpace: "pre-wrap",
                    background: theme.fill.tertiary,
                    padding: 12,
                    borderRadius: 6,
                  }}
                >
                  {obj.formula}
                </Text>
                <Table
                  headers={["Input", "Required"]}
                  rows={obj.inputs.map((i) => [i, "Yes"])}
                />
              </Stack>
            )}

            {(step === "targets" || step === "peers" || step === "publish") && (
              <Grid columns={2} gap={12}>
                <Stack gap={4}>
                  <H3>Plan target</H3>
                  <Stat value={obj.target} label="Board / ALCO plan" />
                </Stack>
                <Stack gap={4}>
                  <H3>Peer benchmark</H3>
                  <Stat
                    value={obj.peerMedian}
                    label={obj.peerSource}
                    tone="info"
                  />
                </Stack>
              </Grid>
            )}

            {step === "peers" && (
              <Callout tone="neutral" title="Peer use in planning">
                Peers do not replace targets. Use peer median to pressure-test
                whether the plan is ambitious or soft, then lock the bank target
                separately. The executive scorecard later shows Actual vs both.
              </Callout>
            )}

            {(step === "calcQa" || step === "publish") && (
              <Stack gap={8}>
                <H3>Calculation QA</H3>
                <Grid columns={3} gap={12}>
                  <Stat
                    value={obj.calcCheck.engineValue}
                    label="Scorecard engine"
                  />
                  <Stat
                    value={obj.calcCheck.replayValue}
                    label="Source-grain replay"
                  />
                  <Stat
                    value={obj.calcCheck.match ? "PASS" : "FAIL"}
                    label="Match"
                    tone={obj.calcCheck.match ? "success" : "danger"}
                  />
                </Grid>
                <Text tone="secondary">{obj.calcCheck.notes}</Text>
                <Callout
                  tone={obj.calcCheck.match ? "success" : "danger"}
                  title="Gate before publish"
                >
                  Do not promote an objective to the Bank President scorecard
                  until formula, grain, annualization, and peer definition all
                  pass QA for the same as-of date.
                </Callout>
              </Stack>
            )}

            {step === "publish" && (
              <Callout tone="info" title="Publish checklist">
                Objective owner signed · Metric formula locked · Target locked ·
                Peer source cited · Calc QA pass · Appears on Executive
                Scorecard next refresh.
              </Callout>
            )}
          </Stack>
        </CardBody>
      </Card>

      <H2>Planning vs monitoring</H2>
      <Table
        headers={["Mode", "Primary job", "Key screens"]}
        rows={[
          [
            "Planning (this mockup)",
            "Enter objectives, bind metrics, set targets, attach peers, prove calcs",
            "Objective editor, metric catalog, peer attach, calc QA gate",
          ],
          [
            "Monitoring (executive HTML / canvas)",
            "Read Actual vs Target vs Peer and drill drivers",
            "President scorecard, variance table, ROA drill",
          ],
        ]}
      />

      <H2>Recommended control loop</H2>
      <Table
        headers={["Order", "Action", "Exit criteria"]}
        rows={[
          [
            "1",
            "Enter / refresh objectives by BSC perspective",
            "Owner, description, and success intent clear",
          ],
          [
            "2",
            "Bind metric(s) and lock formula + inputs",
            "Single dictionary definition; no competing formulas",
          ],
          [
            "3",
            "Set plan target or limit",
            "Numeric target with cadence (month-end, YTD, etc.)",
          ],
          [
            "4",
            "Attach peer benchmark",
            "Peer set, percentile, and as-of date documented",
          ],
          [
            "5",
            "Run calc QA (engine vs replay)",
            "Match within tolerance; definition notes filed",
          ],
          [
            "6",
            "Publish to executive scorecard",
            "Appears as Actual / Target / Peer on president view",
          ],
        ]}
      />

      <Callout tone="neutral" title="Mockup note">
        Illustrative planning UX for Community Bank balanced scorecard work.
        Sample objectives align to the existing scorecard pack. Not a live
        workflow app.
      </Callout>
    </Stack>
  );
}
