import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  LineChart,
  Pill,
  Row,
  Select,
  Spacer,
  Stack,
  Stat,
  Text,
  TextInput,
  TextArea,
  useCanvasState,
} from "cursor/canvas";

type Direction = "higher" | "lower";
type Perspective =
  | "Financial"
  | "Customer"
  | "Internal Process"
  | "Learning & Development";

type Objective = {
  id: string;
  perspective: Perspective;
  metric: string;
  unit: string;
  objective: string;
  owner: string;
  target: number;
  direction: Direction;
  series: number[];
};

type Status = "ok" | "watch" | "bad";

const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];

const DEFAULT_OBJECTIVES: Objective[] = [
  {
    id: "roa",
    perspective: "Financial",
    metric: "ROA",
    unit: "%",
    objective: "Deliver top-quartile peer ROA",
    owner: "CEO / CFO",
    target: 1.5,
    direction: "higher",
    series: [1.21, 1.28, 1.32, 1.35, 1.37, 1.39],
  },
  {
    id: "noi",
    perspective: "Financial",
    metric: "Net Operating Income",
    unit: "$MM",
    objective: "Grow operating income to plan",
    owner: "CFO",
    target: 19,
    direction: "higher",
    series: [15.2, 16.1, 16.8, 17.4, 18.1, 18.6],
  },
  {
    id: "csi",
    perspective: "Customer",
    metric: "Customer Satisfaction Index",
    unit: "score",
    objective: "Enhance customer experience (CSI > 7)",
    owner: "COO / Retail",
    target: 7,
    direction: "higher",
    series: [6.4, 6.5, 6.7, 6.8, 6.9, 7.1],
  },
  {
    id: "retention",
    perspective: "Customer",
    metric: "Customer Retention",
    unit: "%",
    objective: "Keep CIF retention at or above 92%",
    owner: "Retail Banking",
    target: 92,
    direction: "higher",
    series: [90.2, 90.5, 90.8, 91.0, 91.4, 91.6],
  },
  {
    id: "efficiency",
    perspective: "Internal Process",
    metric: "Efficiency Ratio",
    unit: "%",
    objective: "Operate at 52% efficiency or better",
    owner: "COO / CFO",
    target: 52,
    direction: "lower",
    series: [58.2, 57.1, 56.4, 55.2, 54.6, 53.8],
  },
  {
    id: "loan_sla",
    perspective: "Internal Process",
    metric: "Commercial Loan SLA",
    unit: "days",
    objective: "Close commercial loans in 60 days or less",
    owner: "Credit Admin",
    target: 60,
    direction: "lower",
    series: [78, 74, 71, 68, 66, 64],
  },
  {
    id: "emplify",
    perspective: "Learning & Development",
    metric: "Emplify Participation",
    unit: "%",
    objective: "Reach 80% associate survey participation",
    owner: "HR",
    target: 80,
    direction: "higher",
    series: [61, 64, 68, 71, 74, 77],
  },
  {
    id: "teller_to",
    perspective: "Learning & Development",
    metric: "Teller Turnover",
    unit: "%",
    objective: "Reduce teller turnover from 40% toward 20%",
    owner: "HR / Branch Ops",
    target: 20,
    direction: "lower",
    series: [38, 36, 34, 32, 30, 28],
  },
];

const FILTERS = [
  "All",
  "Financial",
  "Customer",
  "Internal Process",
  "Learning & Development",
] as const;

function actual(o: Objective): number {
  return o.series[o.series.length - 1];
}

function statusOf(o: Objective): Status {
  const a = actual(o);
  const t = o.target;
  if (o.direction === "higher") {
    if (a >= t) return "ok";
    if (a >= t * 0.95) return "watch";
    return "bad";
  }
  if (a <= t) return "ok";
  if (a <= t * 1.05) return "watch";
  return "bad";
}

function statusLabel(s: Status): string {
  return s === "ok" ? "On track" : s === "watch" ? "At risk" : "Off track";
}

function pillTone(s: Status): "success" | "warning" | "info" {
  return s === "ok" ? "success" : s === "watch" ? "warning" : "info";
}

function statTone(s: Status): "success" | "warning" | "danger" {
  return s === "ok" ? "success" : s === "watch" ? "warning" : "danger";
}

function formatValue(v: number, unit: string): string {
  if (unit === "$MM" || unit === "$B") return v.toFixed(2);
  if (unit === "days" || unit === "min" || unit === "score") return v.toFixed(1);
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(2);
}

function gapText(o: Objective): string {
  const gap = actual(o) - o.target;
  const sign = gap > 0 ? "+" : "";
  return `${sign}${formatValue(gap, o.unit)} ${o.unit}`;
}

export default function ObjectiveTrendScorecard() {
  const [objectives, setObjectives] = useCanvasState<Objective[]>(
    "objectives",
    DEFAULT_OBJECTIVES,
  );
  const [perspective, setPerspective] = useCanvasState<string>(
    "perspective",
    "All",
  );
  const [selectedId, setSelectedId] = useCanvasState<string>(
    "selectedId",
    DEFAULT_OBJECTIVES[0].id,
  );
  const [draftObjective, setDraftObjective] = useCanvasState(
    "draftObjective",
    DEFAULT_OBJECTIVES[0].objective,
  );
  const [draftTarget, setDraftTarget] = useCanvasState(
    "draftTarget",
    String(DEFAULT_OBJECTIVES[0].target),
  );
  const [draftOwner, setDraftOwner] = useCanvasState(
    "draftOwner",
    DEFAULT_OBJECTIVES[0].owner,
  );
  const [newMetric, setNewMetric] = useCanvasState("newMetric", "");
  const [newObjective, setNewObjective] = useCanvasState("newObjective", "");
  const [newTarget, setNewTarget] = useCanvasState("newTarget", "");
  const [newUnit, setNewUnit] = useCanvasState("newUnit", "%");
  const [newPerspective, setNewPerspective] = useCanvasState(
    "newPerspective",
    "Financial",
  );
  const [newDirection, setNewDirection] = useCanvasState(
    "newDirection",
    "higher",
  );
  const [newOwner, setNewOwner] = useCanvasState("newOwner", "");

  const counts = objectives.reduce(
    (acc, o) => {
      acc[statusOf(o)] += 1;
      return acc;
    },
    { ok: 0, watch: 0, bad: 0 } as Record<Status, number>,
  );

  const visible =
    perspective === "All"
      ? objectives
      : objectives.filter((o) => o.perspective === perspective);

  const selected =
    objectives.find((o) => o.id === selectedId) ??
    visible[0] ??
    objectives[0];

  const selectObjective = (o: Objective) => {
    setSelectedId(o.id);
    setDraftObjective(o.objective);
    setDraftTarget(String(o.target));
    setDraftOwner(o.owner);
  };

  const applyEdits = () => {
    if (!selected) return;
    const nextTarget = Number(draftTarget);
    if (Number.isNaN(nextTarget)) return;
    setObjectives((prev) =>
      prev.map((o) =>
        o.id === selected.id
          ? {
              ...o,
              objective: draftObjective.trim() || o.objective,
              target: nextTarget,
              owner: draftOwner.trim() || o.owner,
            }
          : o,
      ),
    );
  };

  const addObjective = () => {
    const target = Number(newTarget);
    if (!newMetric.trim() || !newObjective.trim() || Number.isNaN(target)) {
      return;
    }
    const direction = newDirection as Direction;
    const start = direction === "higher" ? target * 0.82 : target * 1.25;
    const series = Array.from({ length: 6 }, (_, i) => {
      const t = i / 5;
      return Number((start + (target * 0.96 - start) * t).toFixed(2));
    });
    const created: Objective = {
      id: `custom_${Date.now()}`,
      perspective: newPerspective as Perspective,
      metric: newMetric.trim(),
      unit: newUnit.trim() || "units",
      objective: newObjective.trim(),
      owner: newOwner.trim() || "Owner TBD",
      target,
      direction,
      series,
    };
    setObjectives((prev) => [...prev, created]);
    setPerspective(created.perspective);
    selectObjective(created);
    setNewMetric("");
    setNewObjective("");
    setNewTarget("");
    setNewOwner("");
  };

  return (
    <Stack gap={20}>
      <Stack gap={6}>
        <H1>Objective Monitor Scorecard</H1>
        <Text tone="secondary">
          Community Bank balanced scorecard — set objectives and targets, then
          see how actuals trend against your goals (Capstone KPIs, sample data).
        </Text>
      </Stack>

      <Callout tone="info">
        Select an objective, edit its wording and target, then Apply. Status is
        On track / At risk / Off track based on whether actual meets your goal
        (within 5% = at risk).
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat value={String(objectives.length)} label="Objectives" />
        <Stat value={String(counts.ok)} label="On track" tone="success" />
        <Stat value={String(counts.watch)} label="At risk" tone="warning" />
        <Stat value={String(counts.bad)} label="Off track" tone="danger" />
      </Grid>

      <Row gap={8} wrap>
        {FILTERS.map((p) => (
          <span key={p}>
            <Button
              variant={perspective === p ? "primary" : "secondary"}
              onClick={() => setPerspective(p)}
            >
              {p}
            </Button>
          </span>
        ))}
      </Row>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>Objectives</H2>
          {visible.map((o) => {
            const st = statusOf(o);
            const isSelected = selected?.id === o.id;
            return (
              <div key={o.id}>
                <Card>
                  <CardHeader
                    trailing={
                      <Pill size="sm" tone={pillTone(st)} active={isSelected}>
                        {statusLabel(st)}
                      </Pill>
                    }
                  >
                    {o.metric}
                  </CardHeader>
                  <CardBody>
                    <Stack gap={8}>
                      <Text size="small" tone="secondary">
                        {o.perspective} · {o.owner}
                      </Text>
                      <Text size="small">{o.objective}</Text>
                      <Row gap={16}>
                        <Stack gap={2}>
                          <Text tone="tertiary" size="small">
                            Actual
                          </Text>
                          <Text weight="semibold">
                            {formatValue(actual(o), o.unit)} {o.unit}
                          </Text>
                        </Stack>
                        <Stack gap={2}>
                          <Text tone="tertiary" size="small">
                            Target
                          </Text>
                          <Text weight="semibold">
                            {formatValue(o.target, o.unit)} {o.unit}
                          </Text>
                        </Stack>
                        <Stack gap={2}>
                          <Text tone="tertiary" size="small">
                            Gap
                          </Text>
                          <Text weight="semibold">{gapText(o)}</Text>
                        </Stack>
                        <Spacer />
                        <Button
                          variant={isSelected ? "primary" : "secondary"}
                          onClick={() => selectObjective(o)}
                        >
                          {isSelected ? "Selected" : "Inspect"}
                        </Button>
                      </Row>
                    </Stack>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </Stack>

        <Stack gap={12}>
          {selected ? (
            <>
              <H2>{selected.metric} — trending vs goal</H2>
              <Text tone="secondary" size="small">
                Source: Capstone sample series · Mar–Aug · reference line = your
                target
              </Text>
              <Stat
                value={statusLabel(statusOf(selected))}
                label={`Actual ${formatValue(actual(selected), selected.unit)} ${selected.unit} vs target ${formatValue(selected.target, selected.unit)} ${selected.unit}`}
                tone={statTone(statusOf(selected))}
              />
              <LineChart
                categories={MONTHS}
                series={[
                  {
                    name: "Actual",
                    data: selected.series,
                    tone: "info",
                  },
                ]}
                referenceLines={[
                  {
                    value: selected.target,
                    label: `Target ${formatValue(selected.target, selected.unit)}`,
                    tone: "warning",
                  },
                ]}
                beginAtZero={false}
                height={220}
              />

              <Divider />

              <H2>Edit objective & target</H2>
              <Stack gap={8}>
                <Text tone="secondary" size="small">
                  Objective
                </Text>
                <TextArea
                  value={draftObjective}
                  onChange={setDraftObjective}
                  rows={3}
                />
                <Row gap={12}>
                  <Stack gap={6} style={{ flex: 1 }}>
                    <Text tone="secondary" size="small">
                      Target ({selected.unit})
                    </Text>
                    <TextInput
                      type="number"
                      value={draftTarget}
                      onChange={setDraftTarget}
                    />
                  </Stack>
                  <Stack gap={6} style={{ flex: 1 }}>
                    <Text tone="secondary" size="small">
                      Owner
                    </Text>
                    <TextInput value={draftOwner} onChange={setDraftOwner} />
                  </Stack>
                </Row>
                <Row gap={8}>
                  <Button variant="primary" onClick={applyEdits}>
                    Apply changes
                  </Button>
                  <Pill size="sm" tone={pillTone(statusOf(selected))}>
                    {statusLabel(statusOf(selected))}
                  </Pill>
                </Row>
              </Stack>

              <Divider />

              <H2>Add objective</H2>
              <Stack gap={8}>
                <Select
                  value={newPerspective}
                  onChange={setNewPerspective}
                  options={[
                    { value: "Financial", label: "Financial" },
                    { value: "Customer", label: "Customer" },
                    { value: "Internal Process", label: "Internal Process" },
                    {
                      value: "Learning & Development",
                      label: "Learning & Development",
                    },
                  ]}
                />
                <TextInput
                  value={newMetric}
                  onChange={setNewMetric}
                  placeholder="Metric name"
                />
                <TextArea
                  value={newObjective}
                  onChange={setNewObjective}
                  placeholder="Strategic objective"
                  rows={2}
                />
                <Row gap={8}>
                  <TextInput
                    type="number"
                    value={newTarget}
                    onChange={setNewTarget}
                    placeholder="Target"
                    style={{ flex: 1 }}
                  />
                  <TextInput
                    value={newUnit}
                    onChange={setNewUnit}
                    placeholder="Unit"
                    style={{ width: 80 }}
                  />
                </Row>
                <Select
                  value={newDirection}
                  onChange={setNewDirection}
                  options={[
                    { value: "higher", label: "Higher is better" },
                    { value: "lower", label: "Lower is better" },
                  ]}
                />
                <TextInput
                  value={newOwner}
                  onChange={setNewOwner}
                  placeholder="Owner"
                />
                <Button variant="primary" onClick={addObjective}>
                  Create & monitor
                </Button>
              </Stack>
            </>
          ) : (
            <Text tone="secondary">Select an objective to inspect trends.</Text>
          )}

          <Text tone="tertiary" size="small">
            Browser HTML mockup: community_bank_objective_monitor.html
            (Executive Dashboarding folder)
          </Text>
        </Stack>
      </Grid>
    </Stack>
  );
}
