/* L1 suite engine — sample data bound to Phase 1 Riverbend objectives. */
const MONTHS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const BANK_PEERS = ["Lakeshore Community", "Northridge State", "Twin Ports National", "Harbor Trust"];
const CU_PEERS = ["North Shore CU", "Harborlight FCU", "Lakeside Members CU", "Pioneer Community CU"];
const BANK_PEER_POOL = ["Prairie Heritage", "Summit National", "Metro First (out of band)"];
const CU_PEER_POOL = ["River Valley CU", "Summit Members CU", "Metro First CU (out of band)"];

const DEFAULT_PERIOD = "month";

const PERIODS = {
  month: {
    id: "month",
    label: "Month",
    default: true,
    legend: "Jul 2026",
    asof: "As-of 31 Jul 2026 · month · sample · not calc-QA’d"
  },
  quarter: {
    id: "quarter",
    label: "Quarter",
    legend: "Q2 2026 (last closed)",
    asof: "As-of 31 Jul 2026 · last closed quarter Q2 · sample · not calc-QA’d"
  },
  ytd: {
    id: "ytd",
    label: "YTD",
    legend: "YTD through Jul 2026",
    asof: "As-of 31 Jul 2026 · YTD · sample · not calc-QA’d"
  },
  py: {
    id: "py",
    label: "vs prior year",
    legend: "Jul 2026 vs Jul 2025",
    asof: "As-of 31 Jul 2026 · vs prior year · sample · not calc-QA’d"
  }
};

const REPORTS = {
  "l1-1": {
    file: "l1_1_enterprise_strategy.html",
    name: "Enterprise Strategy Scorecard",
    owner: "ELT (CEO chairs)",
    decision: "Are we executing the plan as a leadership team, and which objective needs a course correction this period?",
    home: true
  },
  "l1-2": {
    file: "l1_2_financial.html",
    name: "Financial Performance and Earnings",
    owner: "CFO",
    decision: "Is growth producing acceptable, sustainable returns — and where do we reprice, cut, or invest?"
  },
  "l1-3": {
    file: "l1_3_franchise.html",
    name: "Customer Franchise",
    cuName: "Member Franchise",
    owner: "CMO (franchise, not marketing-only)",
    decision: "Franchise value — growth, engagement, and depth — not a marketing-mix score. Are we deepening the relationships that fund the institution, or buying volume?"
  },
  "l1-4": {
    file: "l1_4_risk_capital.html",
    name: "Balance Sheet, Risk and Capital",
    owner: "CRO",
    decision: "Is risk accumulating faster than capital, liquidity, and controls can absorb?"
  },
  "l1-5": {
    file: "l1_5_process.html",
    name: "Process, Service and Production",
    owner: "COO / CBO",
    decision: "Can operations run the book at acceptable cost and speed — and is production converting the plan?"
  },
  "l1-6": {
    file: "l1_6_people.html",
    name: "People and Organizational Capacity",
    owner: "CHRO",
    decision: "Do we have the people to run the strategy safely for the next 12–24 months?"
  }
};

const PLAN_UNITS = [
  { value: "%", label: "% · percent" },
  { value: "$MM", label: "$MM · millions" },
  { value: "$", label: "$ · dollars" },
  { value: "score", label: "score" },
  { value: "n", label: "n · count" },
  { value: "x", label: "x · coverage" },
  { value: "bps", label: "bps · basis points" },
  { value: "days", label: "days" },
  { value: "min", label: "min · minutes" },
  { value: "hrs", label: "hrs · hours" }
];

const PLAN_OWNERS = [
  "ELT (CEO chairs)",
  "CEO / CFO",
  "CFO",
  "CFO / COO",
  "CFO / ALM",
  "CFO / Credit",
  "COO",
  "COO / CBO",
  "COO / Lending",
  "CBO",
  "CMO",
  "CRO",
  "Chief Credit",
  "Chief Credit / CRO",
  "Treasurer",
  "CHRO",
  "BSA Officer",
  "ALCO"
];

const METRICS = [
  { id: "roa", reports: ["l1-1", "l1-2"], perspective: "Financial", map: "l1-2", unit: "%", direction: "higher", owner: "CEO / CFO",
    bank: { metric: "ROA", objective: "Deliver top-quartile peer ROA", target: 1.50, peer: 1.19, series: [1.21, 1.28, 1.32, 1.35, 1.37, 1.39], prior: [1.10, 1.14, 1.18, 1.20, 1.23, 1.26] },
    cu: { metric: "ROA", objective: "Earn ROA sufficient to fund net-worth growth", target: 0.75, peer: 0.66, series: [0.58, 0.60, 0.62, 0.64, 0.66, 0.68], prior: [0.52, 0.54, 0.56, 0.58, 0.60, 0.61] },
    drivers: [{ title: "NII run-rate", meta: "Primary earnings driver" }, { title: "Fee income mix", meta: "Below plan" }, { title: "Average assets", meta: "Dilutes ROA if earnings lag" }],
    action: { what: "Close the ROA gap via NII, not asset stretch", owner: "CFO", due: "Sep 2026" } },
  { id: "roe_nwg", reports: ["l1-2"], perspective: "Financial", map: "l1-2", unit: "%", direction: "higher", owner: "CFO",
    bank: { metric: "ROE", objective: "Deliver competitive shareholder return", target: 12.0, peer: 11.2, series: [10.4, 10.8, 11.1, 11.3, 11.5, 11.6], prior: [9.8, 10.1, 10.4, 10.6, 10.8, 11.0],
      drivers: [{ title: "Net income", meta: "Earnings engine" }, { title: "Capital actions", meta: "No buyback this year" }],
      action: { what: "Hold the dividend inside the capital plan", owner: "CFO", due: "Q4 2026" } },
    cu: { metric: "Net worth growth", objective: "Retain earnings to grow net worth", target: 8.0, peer: 6.5, series: [6.2, 6.5, 6.8, 7.0, 7.2, 7.4], prior: [5.8, 6.0, 6.2, 6.4, 6.5, 6.6],
      drivers: [{ title: "Net income", meta: "Earnings engine" }, { title: "Retained earnings", meta: "Patronage stays inside the capital plan" }],
      action: { what: "Hold patronage inside the capital plan", owner: "CFO", due: "Q4 2026" } } },
  { id: "nim", reports: ["l1-2"], perspective: "Financial", map: "l1-2", unit: "%", direction: "higher", owner: "CFO / ALM",
    bank: { metric: "NIM", objective: "Hold spread quality", target: 3.50, peer: 3.35, series: [3.28, 3.30, 3.32, 3.34, 3.36, 3.42], prior: [3.40, 3.38, 3.36, 3.34, 3.33, 3.32],
      drivers: [{ title: "Cost of funds", meta: "Deposit specials lifting COF" }, { title: "Loan yields", meta: "New-money yield vs book" }],
      action: { what: "Reprice specials; protect core DDA", owner: "Treasurer", due: "Oct 2026" } },
    cu: { metric: "NIM", objective: "Hold spread while returning member value", target: 3.50, peer: 3.69, series: [3.40, 3.42, 3.44, 3.46, 3.48, 3.49], prior: [3.52, 3.50, 3.48, 3.47, 3.46, 3.45],
      drivers: [{ title: "Cost of funds", meta: "Share specials lifting COF — ARCU WAR on shares" }, { title: "Book loan yield", meta: "ARCU weighted average rate on the loan book" }],
      action: { what: "Reprice share specials; protect regular shares", owner: "Treasurer", due: "Oct 2026" } } },
  { id: "efficiency", reports: ["l1-1", "l1-2"], perspective: "Financial", map: "l1-2", unit: "%", direction: "lower", owner: "CFO / COO",
    bank: { metric: "Efficiency", objective: "Operate at 52% efficiency or better", target: 52, peer: 63.2, series: [58.4, 57.6, 56.8, 56.1, 55.4, 54.8], prior: [60.1, 59.4, 58.8, 58.2, 57.6, 57.0],
      drivers: [{ title: "Noninterest expense", meta: "Staff and tech run-rate" }, { title: "Revenue", meta: "NII + fees in the denominator" }],
      action: { what: "Hold OpEx flat through year-end", owner: "COO", due: "Dec 2026" } },
    cu: { metric: "OpEx / average assets", objective: "Hold operating expense inside the FPR load", target: 3.20, peer: 3.40, series: [3.52, 3.48, 3.44, 3.40, 3.36, 3.32], prior: [3.60, 3.56, 3.52, 3.48, 3.44, 3.42],
      drivers: [{ title: "Operating expense", meta: "Staff, occupancy, and tech run-rate" }, { title: "Average assets", meta: "NCUA / ARCU denominator — not the bank efficiency ratio" }],
      action: { what: "Hold OpEx flat through year-end", owner: "COO", due: "Dec 2026" } } },
  { id: "noi", reports: ["l1-2"], perspective: "Financial", map: "l1-2", unit: "$MM", direction: "higher", owner: "CFO",
    bank: { metric: "NOI vs budget", objective: "Hit the $19MM operating plan", target: 19.0, peer: 17.8, series: [15.2, 16.1, 16.8, 17.4, 18.1, 18.6], prior: [14.0, 14.6, 15.2, 15.8, 16.2, 16.4],
      drivers: [{ title: "Commercial yields", meta: "Capstone earnings engine" }, { title: "OpEx", meta: "Tied to efficiency" }],
      action: { what: "Recover $0.4MM to plan from commercial yields", owner: "CFO", due: "Q4 2026" } },
    cu: { metric: "Net income vs plan", objective: "Fund member value and net-worth build", target: 12.5, peer: 11.2, series: [10.1, 10.6, 11.0, 11.4, 11.7, 12.0], prior: [9.4, 9.8, 10.1, 10.4, 10.6, 10.8],
      drivers: [{ title: "Net interest income", meta: "Member-loan yield vs cost of shares" }, { title: "Operating expense", meta: "Tied to OpEx / average assets" }],
      action: { what: "Recover $0.4MM to plan from NII, not fee stretch", owner: "CFO", due: "Q4 2026" } } },
  { id: "loan_growth", reports: ["l1-1", "l1-2"], perspective: "Financial", map: "l1-2", unit: "%", direction: "higher", owner: "Chief Credit",
    bank: { metric: "Loan growth", objective: "Grow earning assets with credit discipline", target: 7.0, peer: 5.4, series: [4.8, 5.2, 5.6, 6.0, 6.3, 6.6], prior: [4.2, 4.5, 4.8, 5.0, 5.2, 5.3],
      drivers: [{ title: "Commercial pipeline", meta: "Conversion is the constraint" }, { title: "Past due", meta: "Quality gate on growth" }],
      action: { what: "Convert pipeline without lifting the past-due limit", owner: "Chief Credit", due: "Sep 2026" } },
    cu: { metric: "Loan growth", objective: "Grow the loan book inside MBL and credit limits", target: 6.0, peer: 5.0, series: [4.2, 4.5, 4.8, 5.1, 5.3, 5.5], prior: [3.8, 4.0, 4.2, 4.4, 4.5, 4.6],
      drivers: [{ title: "Consumer / auto flow", meta: "Primary book" }, { title: "MBL inside policy", meta: "Do not grow through the NCUA MBL ceiling" }],
      action: { what: "Grow consumer originations without lifting the past-due or MBL limit", owner: "Chief Credit", due: "Sep 2026" } } },
  { id: "dep_growth", reports: ["l1-2"], perspective: "Financial", map: "l1-2", unit: "%", direction: "higher", owner: "Treasurer",
    bank: { metric: "Deposit growth", objective: "Grow the funding book", target: 6.0, peer: 4.2, series: [3.8, 4.1, 4.5, 4.8, 5.2, 5.5], prior: [3.4, 3.6, 3.8, 4.0, 4.1, 4.2],
      drivers: [{ title: "Core DDA", meta: "Stickiness over specials" }, { title: "Outflows by tier", meta: "Watch rate-sensitive money" }],
      action: { what: "Add core balances; no wholesale substitution", owner: "Treasurer", due: "Dec 2026" } },
    cu: { metric: "Share growth", objective: "Grow member shares", target: 5.5, peer: 4.0, series: [3.4, 3.7, 4.0, 4.3, 4.6, 4.9], prior: [3.1, 3.3, 3.5, 3.6, 3.7, 3.8],
      drivers: [{ title: "Core shares", meta: "Stickiness over specials" }, { title: "Outflows by tier", meta: "Watch rate-sensitive money" }],
      action: { what: "Add core member shares; do not substitute borrowed funds", owner: "Treasurer", due: "Dec 2026" } } },
  { id: "fee_mix", reports: ["l1-2"], perspective: "Financial", map: "l1-2", unit: "%", direction: "higher", owner: "CFO",
    bank: { metric: "Noninterest income mix", objective: "Diversify off the spread", target: 22, peer: 24, series: [18.2, 18.6, 19.0, 19.4, 19.8, 20.1], prior: [17.8, 18.0, 18.2, 18.4, 18.6, 18.8],
      drivers: [{ title: "Treasury / card / wealth", meta: "Fee engines" }, { title: "Pricing discipline", meta: "Grow mix without junk-fee risk" }],
      action: { what: "Close 1–2 pts of fee mix without junk-fee risk", owner: "CFO", due: "Q4 2026" } },
    cu: { metric: "Noninterest income mix", objective: "Fees consistent with member value", target: 16, peer: 15, series: [13.4, 13.7, 14.0, 14.2, 14.5, 14.7], prior: [13.0, 13.2, 13.4, 13.5, 13.6, 13.7],
      drivers: [{ title: "Card / interchange", meta: "Member-value fee engines" }, { title: "Member pricing", meta: "Do not maximize fees" }],
      action: { what: "Lift fee mix without adding junk fees", owner: "CFO", due: "Q4 2026" } } },

  { id: "csi", reports: ["l1-1", "l1-3"], perspective: "Customer", map: "l1-3", unit: "score", direction: "higher", owner: "CMO",
    bank: { metric: "CSI / NPS", objective: "Keep CSI above the Capstone floor", target: 7.2, peer: 7.0, series: [6.8, 6.9, 7.0, 7.05, 7.08, 7.10], prior: [6.6, 6.7, 6.8, 6.85, 6.9, 6.95],
      drivers: [{ title: "Loan decision time", meta: "Top CSI complaint theme" }, { title: "Account opening", meta: "Branch SLA" }],
      action: { what: "Cut commercial cycle time to lift CSI", owner: "CMO / COO", due: "Sep 2026" } },
    cu: { metric: "NPS", objective: "Hold member NPS above 70", target: 70, peer: 68, series: [64, 65, 66, 67, 68, 69], prior: [62, 63, 64, 65, 66, 66],
      drivers: [{ title: "Loan decision time", meta: "Top NPS complaint theme" }, { title: "Account opening", meta: "Branch service" }],
      action: { what: "Cut consumer cycle time to lift NPS", owner: "CMO / COO", due: "Sep 2026" } } },
  { id: "retention", reports: ["l1-1", "l1-3"], perspective: "Customer", map: "l1-3", unit: "%", direction: "higher", owner: "CMO",
    bank: { metric: "Retention", objective: "Hold household retention at 92%", target: 92, peer: 90, series: [90.2, 90.5, 90.8, 91.0, 91.2, 91.4], prior: [89.6, 89.8, 90.0, 90.2, 90.3, 90.4],
      leadingSignals: [
        { title: "Deflection 64% of at-risk", meta: "Saved 41 of 64 households after outreach" },
        { title: "Top close reason: Rate / fees", meta: "Operations · deceased · out-of-area on drill 3" }
      ] },
    cu: { metric: "Retention", objective: "Hold member retention at 93%", target: 93, peer: 91, series: [91.4, 91.6, 91.8, 92.0, 92.1, 92.3], prior: [90.8, 91.0, 91.2, 91.3, 91.4, 91.5],
      leadingSignals: [
        { title: "Deflection 64% of at-risk", meta: "Saved 41 of 64 members after outreach" },
        { title: "Top close reason: Rate / fees", meta: "Operations · deceased · out-of-area on drill 3" }
      ] },
    drivers: [
      { title: "Attempted vs deflected", meta: "64 outreach · 41 saved · 23 still closed" },
      { title: "Rate / fees", meta: "Primary close code this period" },
      { title: "Operations", meta: "Service / error-driven closes" },
      { title: "Deceased", meta: "Not a save play" },
      { title: "Out-of-area", meta: "Moved — not rate shopping" }
    ],
    action: { what: "Outreach on rate-shoppers before they close", owner: "CMO", due: "Oct 2026" } },
  { id: "hh_growth", reports: ["l1-3"], perspective: "Customer", map: "l1-3", unit: "%", direction: "higher", owner: "CMO",
    bank: { metric: "Customer growth", objective: "Grow households, not account records", target: 4.0, peer: 2.8, series: [2.4, 2.6, 2.8, 3.0, 3.2, 3.4], prior: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6],
      drivers: [{ title: "Net new CIF", meta: "Adds minus closes" }, { title: "Market", meta: "Primary-household growth, not account records" }],
      action: { what: "Add primary relationships, not CD specials", owner: "CMO", due: "Dec 2026" } },
    cu: { metric: "Member growth", objective: "Grow net members inside FOM", target: 3.5, peer: 2.5, series: [2.1, 2.3, 2.5, 2.7, 2.8, 3.0], prior: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3],
      drivers: [{ title: "Net new members", meta: "Adds minus closes" }, { title: "Field of membership", meta: "Growth inside FOM" }],
      action: { what: "Add primary member relationships, not share specials", owner: "CMO", due: "Dec 2026" } } },
  { id: "core_mix", reports: ["l1-1", "l1-3"], perspective: "Customer", map: "l1-3", unit: "%", direction: "higher", owner: "Treasurer",
    bank: { metric: "Core funding mix", objective: "Improve funding stickiness", target: 78, peer: 74, series: [73.2, 73.6, 74.0, 74.4, 74.8, 75.2], prior: [72.0, 72.4, 72.8, 73.0, 73.2, 73.4],
      drivers: [{ title: "DDA + savings + MMDA", meta: "Core definition locked" }, { title: "Brokered / specials", meta: "Pulls mix down" }] },
    cu: { metric: "Core share mix", objective: "Grow sticky member shares", target: 80, peer: 77, series: [75.0, 75.4, 75.8, 76.2, 76.6, 77.0], prior: [74.2, 74.5, 74.8, 75.0, 75.2, 75.4],
      drivers: [{ title: "Regular shares + MMDA", meta: "Core definition locked" }, { title: "Specials", meta: "Pulls mix down" }] },
    action: { what: "Shift 200 bps into core before year-end", owner: "Treasurer", due: "Dec 2026" } },
  { id: "depth", reports: ["l1-3"], perspective: "Customer", map: "l1-3", unit: "n", direction: "higher", owner: "CMO",
    bank: { metric: "Products per household", objective: "Deepen the household franchise", target: 3.10, peer: 2.85, series: [2.72, 2.76, 2.80, 2.84, 2.88, 2.92], prior: [2.64, 2.66, 2.68, 2.70, 2.72, 2.74],
      drivers: [{ title: "Cross-sell conversion", meta: "Second product attach" }, { title: "Primary-FI share", meta: "Loan + deposit in same CIF" }],
      action: { what: "Campaign households with deposits only", owner: "CMO", due: "Nov 2026" } },
    cu: { metric: "AMR", objective: "Deepen average member relationship", target: 18.5, peer: 16.8, series: [16.2, 16.5, 16.8, 17.1, 17.3, 17.6], prior: [15.4, 15.6, 15.8, 16.0, 16.1, 16.2],
      drivers: [{ title: "Cross-sell conversion", meta: "Second product attach" }, { title: "Primary relationship", meta: "Loan + share in the same membership" }],
      action: { what: "Campaign members with shares only", owner: "CMO", due: "Nov 2026" } } },
  { id: "digital", reports: ["l1-3"], perspective: "Customer", map: "l1-3", unit: "%", direction: "higher", owner: "CMO",
    bank: { metric: "Digital active", objective: "Shift eligible customers to digital", target: 62, peer: 58, series: [54, 55, 56, 57, 58, 59], prior: [50, 51, 52, 53, 54, 55] },
    cu: { metric: "Digital active", objective: "Raise member digital-active rate", target: 58, peer: 55, series: [50, 51, 52, 53, 54, 55], prior: [47, 48, 49, 50, 51, 52] },
    drivers: [{ title: "Enrollment vs eligible", meta: "Denominator locked" }, { title: "Mobile logins", meta: "Active = 90-day use" }],
    action: { what: "Activate 4 pts of enrolled-but-inactive users", owner: "Digital", due: "Oct 2026" } },
  { id: "cross_sell", reports: ["l1-3"], perspective: "Customer", map: "l1-3", unit: "%", direction: "higher", owner: "CMO",
    bank: { metric: "Cross-sell", objective: "Increase wallet share", target: 18, peer: 15, series: [13.2, 13.6, 14.0, 14.4, 14.8, 15.1], prior: [12.4, 12.6, 12.8, 13.0, 13.1, 13.2] },
    cu: { metric: "Cross-sell", objective: "Lift products per member via referrals", target: 16, peer: 14, series: [12.0, 12.3, 12.6, 12.9, 13.1, 13.4], prior: [11.4, 11.6, 11.8, 12.0, 12.1, 12.2] },
    drivers: [{ title: "Referral conversion", meta: "Branch + banker" }, { title: "Digital offers", meta: "Attach at login" }],
    action: { what: "Stand up a weekly referral huddle", owner: "CMO", due: "Sep 2026" } },
  { id: "cac", reports: ["l1-3"], perspective: "Customer", map: "l1-3", unit: "$", direction: "lower", owner: "CMO",
    bank: { metric: "CAC", objective: "Acquire without buying volume", target: 285, peer: 310, series: [340, 330, 322, 314, 308, 302], prior: [350, 345, 340, 336, 332, 328],
      drivers: [{ title: "Paid media", meta: "Cost per funded household" }, { title: "Branch vs digital mix", meta: "Digital cheaper" }] },
    cu: { metric: "CAC", objective: "Keep member acquisition cost inside plan", target: 240, peer: 260, series: [278, 270, 264, 258, 254, 250], prior: [286, 280, 274, 270, 266, 262],
      drivers: [{ title: "Paid media", meta: "Cost per funded membership" }, { title: "Branch vs digital mix", meta: "Digital cheaper" }] },
    action: { what: "Shift 15% of acquisition spend to digital", owner: "CMO", due: "Oct 2026" } },

  { id: "capital", reports: ["l1-1", "l1-4"], perspective: "Risk", map: "l1-4", unit: "%", direction: "higher", owner: "CFO",
    bank: { metric: "Tier 1 leverage", objective: "Stay well capitalized", target: 9.5, peer: 9.8, series: [9.10, 9.14, 9.18, 9.22, 9.26, 9.30], prior: [8.90, 8.95, 9.00, 9.04, 9.08, 9.10] },
    cu: { metric: "Net worth ratio", objective: "Hold well-capitalized net worth", target: 10.5, peer: 10.8, series: [10.10, 10.16, 10.22, 10.28, 10.32, 10.36], prior: [9.90, 9.96, 10.00, 10.04, 10.08, 10.10] },
    drivers: [{ title: "Retained earnings", meta: "ROA is the fuel" }, { title: "Asset growth", meta: "Dilutes the ratio" }],
    action: { what: "Keep the capital floor inside the growth plan", owner: "CFO", due: "monthly ALCO" } },
  { id: "past_due", reports: ["l1-1", "l1-4"], perspective: "Risk", map: "l1-4", unit: "%", direction: "lower", owner: "CRO",
    bank: { metric: "Past due 30+", objective: "Keep credit inside appetite", target: 1.10, peer: 1.05, series: [1.02, 1.06, 1.10, 1.14, 1.16, 1.18], prior: [0.92, 0.94, 0.96, 0.98, 0.99, 1.00],
      drivers: [{ title: "30/60/90 mix", meta: "Watch 60+ migration" }, { title: "C&I / CRE watch", meta: "Commercial lead book" }],
      l14Signals: [
        { title: "OD 30+ is 12% of overdraft balances", meta: "$0.30MM — charge-off risk. Buckets on drill 3." },
        { title: "21–30 day OD at 18%", meta: "Migration into 30+ this month" }
      ],
      odAging: {
        title: "Overdraft aging",
        shareHeader: "Share of OD",
        caption: "Deposit overdraft balances by days negative — not loan past due. Shown on L1-4 only.",
        buckets: [
          { band: "1–10 days", share: 42, dollars: "$1.05MM", status: "ok" },
          { band: "11–20 days", share: 28, dollars: "$0.70MM", status: "watch" },
          { band: "21–30 days", share: 18, dollars: "$0.45MM", status: "watch" },
          { band: "30+ days", share: 12, dollars: "$0.30MM", status: "bad" }
        ]
      } },
    cu: { metric: "Past due 30+", objective: "Hold consumer delinquency inside limit", target: 0.90, peer: 0.85, series: [0.78, 0.82, 0.86, 0.88, 0.90, 0.93], prior: [0.70, 0.72, 0.74, 0.76, 0.77, 0.78],
      drivers: [{ title: "30/60/90 mix", meta: "Watch 60+ migration" }, { title: "Consumer auto / card", meta: "Lead book" }],
      l14Signals: [
        { title: "Courtesy pay 30+ is 11% of courtesy-pay balances", meta: "$0.22MM — charge-off risk. Buckets on drill 3." },
        { title: "21–30 day courtesy pay at 17%", meta: "Migration into 30+ this month" }
      ],
      odAging: {
        title: "Courtesy pay / overdraft aging",
        shareHeader: "Share of courtesy pay",
        caption: "Courtesy pay and NSF balances by days negative — not loan delinquency. Shown on L1-4 only.",
        buckets: [
          { band: "1–10 days", share: 46, dollars: "$0.88MM", status: "ok" },
          { band: "11–20 days", share: 26, dollars: "$0.50MM", status: "watch" },
          { band: "21–30 days", share: 17, dollars: "$0.33MM", status: "watch" },
          { band: "30+ days", share: 11, dollars: "$0.22MM", status: "bad" }
        ]
      } },
    action: { what: "Tighten early-stage collections on 30–59", owner: "Chief Credit", due: "Sep 2026" } },
  { id: "criticized", reports: ["l1-4"], perspective: "Risk", map: "l1-4", unit: "%", direction: "lower", owner: "Chief Credit",
    bank: { metric: "Criticized assets", objective: "Surface problem credits early", target: 4.0, peer: 3.6, series: [3.4, 3.5, 3.6, 3.7, 3.8, 3.9], prior: [3.1, 3.2, 3.2, 3.3, 3.3, 3.4],
      drivers: [{ title: "Special mention inflows", meta: "Label criticized vs classified" }, { title: "CRE concentration", meta: "Limits live on the CRE tile — not this one" }],
      action: { what: "Work the SM list before it rolls to substandard", owner: "Chief Credit", due: "Oct 2026" } },
    cu: { metric: "Net charge-offs", objective: "Hold realized losses inside the NCUA / FPR limit", target: 0.35, peer: 0.28, series: [0.26, 0.28, 0.30, 0.32, 0.34, 0.36], prior: [0.20, 0.21, 0.22, 0.23, 0.24, 0.25],
      leadingSignals: [
        { title: "Card NCO 0.55% of avg card", meta: "$0.22MM — fastest leak" },
        { title: "Auto 0.42%", meta: "Largest dollar book" }
      ],
      drivers: [
        { title: "Charge-offs", meta: "Gross charge-offs this period — ARCU collections" },
        { title: "Recoveries", meta: "CHARGEOFFAMOUNT minus remaining balance" },
        { title: "Average loans", meta: "NCUA denominator" }
      ],
      action: { what: "Work card and auto charge-off inflows before they lift the ratio", owner: "Chief Credit", due: "Oct 2026" },
      drillTable: {
        title: "Net charge-offs by book",
        caption: "NCUA / ARCU realized-loss split. Delinquency stays on Past due 30+. Not classified / criticized.",
        columns: ["Book", "NCO / avg loans", "Amount"],
        rows: [
          { cells: ["Consumer auto", "0.42%", "$0.48MM"], status: "watch" },
          { cells: ["Card", "0.55%", "$0.22MM"], status: "bad" },
          { cells: ["MBL", "0.18%", "$0.08MM"], status: "ok" }
        ]
      } } },
  { id: "cre_conc", reports: ["l1-4"], perspective: "Risk", map: "l1-4", unit: "%", direction: "lower", owner: "Chief Credit / CRO",
    bank: { metric: "CRE / concentration", objective: "Stay inside the 300% watch / 400% CRE limit", target: 300, peer: 278, series: [298, 302, 305, 308, 310, 312], prior: [286, 288, 290, 292, 294, 296],
      leadingSignals: [
        { title: "Construction nearest the limit", meta: "268% of risk-based capital" },
        { title: "Hotel / motel +180 bps this quarter", meta: "Bucket-shift alert — not a live monitor" }
      ],
      drivers: [
        { title: "CRE / RBC", meta: "Proving number — 300% watch · 400% regulatory limit" },
        { title: "Construction", meta: "Nearest sub-limit" },
        { title: "Multifamily", meta: "Inside policy" },
        { title: "Hotel / motel", meta: "Fastest bucket shift this quarter" }
      ],
      action: { what: "Pause new hotel/motel commitments until CRE is back under 300%", owner: "Chief Credit", due: "Oct 2026" } },
    cu: { metric: "MBL concentration", objective: "Hold member-business loans inside policy", target: 10.0, peer: 9.2, series: [9.2, 9.5, 9.8, 10.0, 10.2, 10.4], prior: [8.6, 8.8, 9.0, 9.1, 9.2, 9.3],
      leadingSignals: [
        { title: "Construction nearest the limit", meta: "Construction MBL 4.1% of assets" },
        { title: "MBL +40 bps this quarter", meta: "Bucket-shift alert — not a live monitor" }
      ],
      drivers: [
        { title: "MBL / assets", meta: "Proving number — 10% policy · NCUA 12.25% ceiling" },
        { title: "Construction", meta: "Nearest sub-limit" },
        { title: "Member business other", meta: "Inside policy" }
      ],
      action: { what: "Pause new construction MBL until concentration is back under 10%", owner: "Chief Credit", due: "Oct 2026" } } },
  { id: "acl", reports: ["l1-4"], perspective: "Risk", map: "l1-4", unit: "x", direction: "higher", owner: "CFO / Credit",
    bank: { metric: "ACL coverage", objective: "Cover expected loss", target: 1.25, peer: 1.18, series: [1.20, 1.21, 1.22, 1.22, 1.23, 1.23], prior: [1.16, 1.17, 1.17, 1.18, 1.18, 1.19],
      drivers: [{ title: "NPL stock", meta: "Denominator" }, { title: "Provision", meta: "Earnings echo on L1-2" }],
      action: { what: "Refresh CECL qualitative overlay", owner: "CFO", due: "Q3 close" } },
    cu: { metric: "Allowance / delinquent", objective: "Cover delinquent loans at the NCUA ratio", target: 1.20, peer: 1.15, series: [1.14, 1.15, 1.16, 1.16, 1.17, 1.17], prior: [1.10, 1.11, 1.12, 1.12, 1.13, 1.13],
      drivers: [{ title: "Allowance", meta: "GL allowance for loan losses" }, { title: "Delinquent loans", meta: "NCUA denominator — not bank NPL / CECL wording" }],
      action: { what: "Refresh the allowance vs the delinquent book", owner: "CFO", due: "Q3 close" } } },
  { id: "loan_assets", reports: ["l1-4"], perspective: "Risk", map: "l1-4", unit: "%", direction: "band", owner: "Treasurer",
    bank: { metric: "Loans-to-assets", objective: "Hold loan book near the ~75% liquidity target", target: 75, peer: 73, series: [72.8, 73.2, 73.8, 74.2, 74.6, 75.0], prior: [71.5, 72.0, 72.4, 72.8, 73.2, 73.6], band: [72, 78],
      drivers: [{ title: "Pipeline vs balance sheet", meta: "LTD removed — pipeline swings distort deposit ratios" }, { title: "Securities & cash", meta: "Non-loan asset mix" }],
      action: { what: "Rebalance toward ~75% loans-to-assets without chasing pipeline noise", owner: "Treasurer", due: "Nov 2026" } },
    cu: { metric: "Loans-to-shares", objective: "Hold loans funded by member shares inside the board band", target: 82, peer: 80, series: [83.2, 83.8, 84.4, 85.0, 85.6, 86.2], prior: [80.0, 80.4, 80.8, 81.2, 81.6, 82.0], band: [75, 90],
      leadingSignals: [
        { title: "Loans-to-assets 74.8%", meta: "Context only — not the proving number. Split on drill 3." },
        { title: "Borrowed funds 10.7% of shares", meta: "LTS tightness shows up as borrowed-funds pressure" }
      ],
      drivers: [
        { title: "Loans-to-shares", meta: "Proving number — NCUA / ARCU liquidity" },
        { title: "Loans-to-assets", meta: "Context only — not a second tile" },
        { title: "Cash and investments", meta: "Non-loan asset mix" }
      ],
      action: { what: "Rebalance toward ~82% loans-to-shares without borrowed-fund substitution", owner: "Treasurer", due: "Nov 2026" },
      drillTable: {
        title: "Liquidity mix",
        caption: "Proving number is loans-to-shares (NCUA / ARCU). Loans-to-assets is context — not a second tile.",
        columns: ["Ratio", "Actual", "Board"],
        rows: [
          { cells: ["Loans-to-shares", "86.2%", "75–90%"], status: "ok" },
          { cells: ["Loans-to-assets", "74.8%", "Context"], status: "ok" }
        ]
      } } },
  { id: "irr", reports: ["l1-4"], perspective: "Risk", map: "l1-4", unit: "%", direction: "higher", owner: "Treasurer",
    bank: { metric: "IRR NII +200 bp", objective: "Stay inside the −8% NII floor", target: -6.0, peer: -7.0, series: [-7.4, -7.2, -7.1, -7.0, -6.9, -6.8], prior: [-6.4, -6.5, -6.6, -6.7, -6.7, -6.8] },
    cu: { metric: "IRR NII +200 bp", objective: "Stay inside the −8% NII floor", target: -5.5, peer: -6.5, series: [-6.6, -6.5, -6.4, -6.3, -6.2, -6.1], prior: [-5.8, -5.9, -6.0, -6.0, -6.1, -6.1] },
    drivers: [{ title: "Duration of funding", meta: "Specials shortening" }, { title: "Loan coupons", meta: "Fixed vs floating mix" }],
    action: { what: "Stay inside the −8% NII floor", owner: "ALCO", due: "monthly" } },
  { id: "wholesale", reports: ["l1-4"], perspective: "Risk", map: "l1-4", unit: "%", direction: "lower", owner: "Treasurer",
    bank: { metric: "Wholesale reliance", objective: "Limit wholesale funding", target: 12, peer: 14, series: [13.8, 13.6, 13.4, 13.2, 13.1, 13.0], prior: [12.4, 12.6, 12.8, 12.9, 13.0, 13.1],
      drivers: [{ title: "FHLB / brokers", meta: "Non-core funding if loan assets run hot" }, { title: "Core mix", meta: "L1-3 leading indicator" }],
      action: { what: "Replace $15MM wholesale with core", owner: "Treasurer", due: "Dec 2026" } },
    cu: { metric: "Borrowed funds / shares", objective: "Limit borrowed funds vs member shares", target: 10, peer: 11, series: [11.4, 11.2, 11.0, 10.9, 10.8, 10.7], prior: [10.2, 10.3, 10.4, 10.5, 10.5, 10.6],
      drivers: [{ title: "FHLB / other borrowed", meta: "Non-share funding if LTS runs hot" }, { title: "Core share mix", meta: "L1-3 leading indicator" }],
      action: { what: "Replace $15MM borrowed funds with member shares", owner: "Treasurer", due: "Dec 2026" } } },
  { id: "bsa", reports: ["l1-4"], perspective: "Risk", map: "l1-4", unit: "days", direction: "lower", owner: "BSA Officer",
    bank: { metric: "BSA aging", objective: "Close alerts inside SLA", target: 18, peer: 16, series: [22, 21, 21, 20, 20, 19.5], prior: [18, 18, 19, 19, 19, 20] },
    cu: { metric: "BSA aging", objective: "Close alerts inside SLA", target: 16, peer: 15, series: [19, 18.5, 18, 17.6, 17.2, 17.0], prior: [16, 16, 16.5, 16.5, 17, 17] },
    drivers: [{ title: "Aged >30 share", meta: "Exam talking point" }, { title: "Staffing", meta: "Time-to-fill on L1-6" }],
    action: { what: "Clear the >30-day bucket", owner: "BSA Officer", due: "Sep 2026" } },
  { id: "runoff", reports: ["l1-4"], perspective: "Risk", map: "l1-4", riskGroup: "book", unit: "%", direction: "lower", owner: "Treasurer",
    bank: { metric: "Runoff / payoffs", objective: "Hold unexpected loan runoff inside plan", target: 1.80, peer: 1.55, series: [1.48, 1.56, 1.64, 1.72, 1.80, 1.86], prior: [1.22, 1.26, 1.30, 1.34, 1.38, 1.42],
      leadingSignals: [
        { title: "4 open payoff tickets · $6.10MM", meta: "Servicing / JH ticketing — table on drill 3" },
        { title: "Pipeline payoffs $2.80MM this month", meta: "LOS scheduled exits, not yet ticketed" }
      ],
      drivers: [
        { title: "Scheduled vs unexpected payoffs", meta: "Proving number is total runoff / beginning loans" },
        { title: "Pipeline payoffs", meta: "LOS scheduled exits this month" },
        { title: "Open payoff tickets", meta: "Servicing / ticketing — work the queue" }
      ],
      action: { what: "Clear the open CRE / C&I payoff tickets before they hit the book", owner: "Treasurer", due: "Sep 2026" },
      drillTable: {
        title: "Payoff alerts · ticketing",
        caption: "Servicing / LOS tickets for scheduled and requested payoffs. Sample — not a live ticketing feed.",
        columns: ["Ticket", "Relationship", "Amount", "Days out"],
        rows: [
          { cells: ["TKT-1842", "Oak Street CRE", "$2.40MM", "12"], status: "bad" },
          { cells: ["TKT-1838", "Riverside C&I", "$1.85MM", "21"], status: "watch" },
          { cells: ["TKT-1821", "Downtown CRE refi", "$1.20MM", "6"], status: "watch" },
          { cells: ["TKT-1794", "Northside HELOC", "$0.65MM", "—"], status: "ok" }
        ]
      } },
    cu: { metric: "Runoff / payoffs", objective: "Hold unexpected member-loan payoffs inside plan", target: 1.50, peer: 1.35, series: [1.32, 1.38, 1.42, 1.46, 1.52, 1.56], prior: [1.12, 1.16, 1.20, 1.24, 1.28, 1.30],
      leadingSignals: [
        { title: "3 open payoff tickets · $2.07MM", meta: "Servicing / ticketing — table on drill 3" },
        { title: "Pipeline payoffs $1.10MM this month", meta: "LOS scheduled member-loan exits" }
      ],
      drivers: [
        { title: "Scheduled vs unexpected payoffs", meta: "Proving number is total runoff / beginning loans" },
        { title: "Pipeline payoffs", meta: "LOS scheduled member-loan exits this month" },
        { title: "Open payoff tickets", meta: "Servicing / ticketing — work the queue" }
      ],
      action: { what: "Clear the open member-loan payoff tickets before they hit the book", owner: "Treasurer", due: "Sep 2026" },
      drillTable: {
        title: "Payoff alerts · ticketing",
        caption: "Servicing / LOS tickets for scheduled and requested member-loan payoffs. Sample — not a live ticketing feed.",
        columns: ["Ticket", "Relationship", "Amount", "Days out"],
        rows: [
          { cells: ["TKT-902", "Member auto — Oak Street", "$0.42MM", "9"], status: "bad" },
          { cells: ["TKT-887", "MBL — Riverside", "$1.10MM", "18"], status: "watch" },
          { cells: ["TKT-871", "HELOC — Downtown", "$0.55MM", "24"], status: "watch" },
          { cells: ["TKT-840", "Member auto — Northside", "$0.28MM", "—"], status: "ok" }
        ]
      } } },
  { id: "txn_yield", reports: ["l1-4"], perspective: "Risk", map: "l1-4", riskGroup: "book", unit: "bps", direction: "higher", owner: "ALCO",
    bank: { metric: "New vs renewal spread", objective: "Keep new-loan coupons above renewals", target: 55, peer: 48, series: [62, 58, 55, 53, 51, 50], prior: [70, 68, 66, 64, 62, 60],
      leadingSignals: [
        { title: "New loans 6.62% · $26.1MM (59%)", meta: "Weighted average note rate this period — also the L1-5 proving coupon" },
        { title: "Renewals 6.12% · $18.2MM (41%)", meta: "50 bps inside new — concession on the book we already have" }
      ],
      drivers: [
        { title: "New-loan WA", meta: "6.62% on $26.1MM — production coupon (L1-5)" },
        { title: "Renewal WA", meta: "6.12% on $18.2MM — concession check" },
        { title: "Mix", meta: "Renewals 41% of booked volume" }
      ],
      action: { what: "Cap renewal concessions so the new-minus-renewal spread stays ≥ 55 bps", owner: "ALCO", due: "Sep 2026" },
      drillTable: {
        title: "Yields by transaction type",
        caption: "Weighted average note rate on booked principal this period. New vs renewal only — not a product-line yield cube.",
        columns: ["Type", "WA rate", "Volume", "Share"],
        rows: [
          { cells: ["New loans", "6.62%", "$26.1MM", "59%"], status: "watch" },
          { cells: ["Renewals", "6.12%", "$18.2MM", "41%"], status: "bad" }
        ]
      } },
    cu: { metric: "New vs renewal spread", objective: "Keep new-loan coupons above member renewals", target: 40, peer: 34, series: [48, 44, 42, 40, 38, 36], prior: [52, 50, 48, 46, 44, 42],
      leadingSignals: [
        { title: "New loans 6.24% · $12.4MM (62%)", meta: "Weighted average note rate this period — also the L1-5 proving coupon" },
        { title: "Renewals 5.88% · $7.6MM (38%)", meta: "36 bps inside new — concession on the member book" }
      ],
      drivers: [
        { title: "New-loan WA", meta: "6.24% on $12.4MM — production coupon (L1-5)" },
        { title: "Renewal WA", meta: "5.88% on $7.6MM — concession check" },
        { title: "Mix", meta: "Renewals 38% of booked volume" }
      ],
      action: { what: "Cap renewal concessions so the new-minus-renewal spread stays ≥ 40 bps", owner: "ALCO", due: "Sep 2026" },
      drillTable: {
        title: "Yields by transaction type",
        caption: "Weighted average note rate on booked member-loan principal this period. New vs renewal only — not a product-line yield cube.",
        columns: ["Type", "WA rate", "Volume", "Share"],
        rows: [
          { cells: ["New loans", "6.24%", "$12.4MM", "62%"], status: "watch" },
          { cells: ["Renewals", "5.88%", "$7.6MM", "38%"], status: "watch" }
        ]
      } } },
  { id: "maturities", reports: ["l1-4"], perspective: "Risk", map: "l1-4", riskGroup: "book", unit: "%", direction: "lower", owner: "Treasurer",
    bank: { metric: "Maturing loans (180d)", objective: "See the 180-day maturity wall before it becomes runoff", target: 7.50, peer: 7.10, series: [6.90, 7.10, 7.28, 7.46, 7.64, 7.82], prior: [6.20, 6.32, 6.44, 6.56, 6.68, 6.80],
      leadingSignals: [
        { title: "0–30 day wall $8.4MM (1.40% of book)", meta: "Nearest refinance / payoff risk" },
        { title: "Three notes ≥ $2MM in 31–90 days", meta: "Call list for retain or reprice" }
      ],
      drivers: [
        { title: "0–30 days", meta: "Nearest wall — retain or reprice this week" },
        { title: "31–90 days", meta: "Next call window" },
        { title: "91–180 days", meta: "Look-ahead ceiling — not beyond 180" }
      ],
      action: { what: "Call the 0–30 day wall this week — retain or reprice before payoff", owner: "Treasurer", due: "Sep 2026" },
      drillTable: {
        title: "Upcoming maturities · 180-day look-ahead",
        caption: "Share of the loan book with a contractual maturity inside 180 days. Windows stop at 180 — this is not a full ALM gap report.",
        columns: ["Window", "Balance", "Share of book"],
        rows: [
          { cells: ["0–30 days", "$8.4MM", "1.40%"], status: "watch" },
          { cells: ["31–90 days", "$17.1MM", "2.85%"], status: "ok" },
          { cells: ["91–180 days", "$21.4MM", "3.57%"], status: "ok" }
        ]
      } },
    cu: { metric: "Maturing loans (180d)", objective: "See the 180-day member-loan maturity wall before it becomes runoff", target: 6.50, peer: 6.20, series: [6.10, 6.28, 6.42, 6.58, 6.76, 6.95], prior: [5.60, 5.70, 5.80, 5.90, 6.00, 6.08],
      leadingSignals: [
        { title: "0–30 day wall $3.2MM (1.15% of book)", meta: "Nearest refinance / payoff risk" },
        { title: "Two large member notes in 31–90 days", meta: "Call list for retain or reprice" }
      ],
      drivers: [
        { title: "0–30 days", meta: "Nearest wall — retain or reprice this week" },
        { title: "31–90 days", meta: "Next call window" },
        { title: "91–180 days", meta: "Look-ahead ceiling — not beyond 180" }
      ],
      action: { what: "Call the 0–30 day member-loan wall this week — retain or reprice before payoff", owner: "Treasurer", due: "Sep 2026" },
      drillTable: {
        title: "Upcoming maturities · 180-day look-ahead",
        caption: "Share of the member-loan book with a contractual maturity inside 180 days. Windows stop at 180 — this is not a full ALM gap report.",
        columns: ["Window", "Balance", "Share of book"],
        rows: [
          { cells: ["0–30 days", "$3.2MM", "1.15%"], status: "watch" },
          { cells: ["31–90 days", "$7.4MM", "2.65%"], status: "ok" },
          { cells: ["91–180 days", "$8.8MM", "3.15%"], status: "ok" }
        ]
      } } },

  { id: "cycle", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "ops", unit: "days", direction: "lower", owner: "COO / Lending",
    bank: { metric: "Decision cycle", objective: "Decide commercial credits inside SLA", target: 45, peer: 52, series: [62, 58, 55, 53, 51, 50], prior: [68, 66, 64, 62, 60, 58],
      action: { what: "Cut median cycle to 45 days", owner: "COO", due: "Sep 2026" } },
    cu: { metric: "Decision cycle", objective: "Decide consumer credits same week", target: 12, peer: 14, series: [16, 15, 14.5, 14, 13.6, 13.2], prior: [18, 17, 16.5, 16, 15.5, 15],
      action: { what: "Cut median cycle to 12 days", owner: "COO", due: "Sep 2026" } },
    drivers: [{ title: "Credit memo queue", meta: "Officer capacity" }, { title: "Exceptions", meta: "STP rate" }] },
  { id: "funnel", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "prod", unit: "%", direction: "higher", owner: "CBO",
    bank: { metric: "Funnel conversion", objective: "Convert applications to booked loans", target: 38, peer: 34, series: [30, 31, 32, 33, 33.5, 34.2], prior: [28, 29, 29.5, 30, 30.5, 31] },
    cu: { metric: "Funnel conversion", objective: "Convert applications to booked loans", target: 42, peer: 38, series: [36, 37, 37.5, 38, 38.5, 39], prior: [34, 34.5, 35, 35.5, 36, 36] },
    drivers: [{ title: "Approval rate", meta: "Credit box" }, { title: "Accept rate", meta: "Price / cycle" }],
    action: { what: "Raise conversion 4 pts without loosening the box", owner: "CBO", due: "Oct 2026" } },
  { id: "new_yield", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "prod", unit: "%", direction: "higher", owner: "CBO",
    bank: { metric: "Yield on new originations", objective: "Price new money above the book", target: 6.80, peer: 6.55, series: [6.40, 6.46, 6.50, 6.54, 6.58, 6.62], prior: [6.20, 6.24, 6.28, 6.32, 6.36, 6.38] },
    cu: { metric: "Yield on new originations", objective: "Price new money vs member value", target: 6.40, peer: 6.20, series: [6.05, 6.10, 6.14, 6.18, 6.21, 6.24], prior: [5.90, 5.94, 5.98, 6.00, 6.02, 6.04] },
    leadingSignals: [
      { title: "Renewals ~50 bps inside new", meta: "Concession — New vs renewal spread is a proving tile on L1-4" },
      { title: "Renewals 41% of volume", meta: "Mix pulls the blended coupon. Full split lives on L1-4." }
    ],
    drivers: [
      { title: "New loans", meta: "Proving number — weighted average note rate this period" },
      { title: "Renewals", meta: "Concession check — full new vs renewal tile is on L1-4" },
      { title: "Exception pricing", meta: "Below-grid deals" },
      { title: "Mix", meta: "Auto vs commercial" }
    ],
    action: { what: "Cap below-grid exceptions at 10% of volume", owner: "CBO", due: "Sep 2026" } },
  { id: "orig_vol", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "prod", unit: "$MM", direction: "higher", owner: "CBO",
    bank: { metric: "Origination volume", objective: "Keep monthly originations on plan", target: 48, peer: 42, series: [38, 40, 41, 43, 44, 45], prior: [36, 37, 38, 39, 40, 40] },
    cu: { metric: "Origination volume", objective: "Keep monthly originations on plan", target: 22, peer: 19, series: [17, 18, 18.5, 19, 19.5, 20], prior: [16, 16.4, 16.8, 17.0, 17.2, 17.4] },
    drivers: [{ title: "Applications in", meta: "Flow, not stock" }, { title: "Cycle time", meta: "Locks leak if slow" }],
    action: { what: "Restore $3MM monthly volume via cycle time", owner: "CBO", due: "Oct 2026" } },
  { id: "self_svc", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "ops", unit: "%", direction: "higher", owner: "COO",
    bank: { metric: "Digital self-service", objective: "Move work off the lobby", target: 71, peer: 66, series: [62, 63, 64, 65, 66, 67], prior: [58, 59, 60, 61, 62, 63] },
    cu: { metric: "Digital self-service", objective: "Move work off the lobby", target: 68, peer: 64, series: [58, 59, 60, 61, 62, 63], prior: [54, 55, 56, 57, 58, 59] },
    drivers: [{ title: "Deposit / transfer STP", meta: "Ops lens, not franchise adoption" }, { title: "Core availability", meta: "Blocks self-service" }],
    action: { what: "Turn on more deposit STP paths", owner: "COO", due: "Oct 2026" } },
  { id: "pipeline", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "prod", unit: "mixed", direction: "higher", owner: "CBO",
    bank: { metric: "Commercial pipeline", objective: "Convert C&I pipeline", target: 32, peer: 28, series: [24, 25, 26, 27, 27.5, 28], prior: [22, 23, 23.5, 24, 24.5, 25], unit: "%",
      drivers: [{ title: "C&I conversion", meta: "Learning paths on L1-6" }, { title: "Credit box", meta: "Do not loosen to buy volume" }],
      action: { what: "Lift commercial pipeline conversion", owner: "CBO", due: "Oct 2026" } },
    cu: { metric: "Onboarding cycle", objective: "Same-week member onboarding", target: 1.2, peer: 1.6, series: [2.1, 1.9, 1.8, 1.7, 1.6, 1.55], prior: [2.4, 2.3, 2.2, 2.1, 2.0, 1.95], unit: "days", direction: "lower",
      drivers: [{ title: "FOM checks", meta: "Onboarding quality" }, { title: "Membership ops", meta: "Same-week funded membership" }],
      action: { what: "Cut onboarding to 1.2 days", owner: "CBO", due: "Oct 2026" } } },
  { id: "teller_sla", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "ops", unit: "dep/hr", direction: "higher", owner: "COO",
    bank: { metric: "Teller Efficiency", objective: "Raise deposits per hour without extra overrides", target: 22, peer: 19, series: [17.4, 18.0, 18.6, 19.2, 19.8, 20.4], prior: [16.2, 16.6, 17.0, 17.4, 17.8, 18.0] },
    cu: { metric: "Teller Efficiency", objective: "Raise deposits per hour without extra overrides", target: 22, peer: 20, series: [17.8, 18.4, 19.0, 19.6, 20.0, 20.6], prior: [16.6, 17.0, 17.4, 17.8, 18.2, 18.4] },
    leadingSignals: [
      { title: "Oak Street 16.2 dep/hr", meta: "J. Patel at 15.4 — well below the 22 target" },
      { title: "Overrides 4.8 / 100 txns", meta: "Policy opt-outs also elevated on Oak Street" }
    ],
    drivers: [
      { title: "Deposits per hour", meta: "Proving number — window throughput" },
      { title: "Procedure adherence", meta: "SOP / dual-control exceptions at the drawer" },
      { title: "Override frequency / opt-outs", meta: "Supervisor overrides and policy opt-outs per 100 txns" }
    ],
    action: { what: "Coach Oak Street on overrides and recover deposits per hour", owner: "COO", due: "Sep 2026" } },

  { id: "engagement", reports: ["l1-1", "l1-6"], perspective: "Learning Growth", map: "l1-6", unit: "score", direction: "higher", owner: "CHRO", peopleGroup: "workforce",
    bank: { metric: "Engagement", objective: "Keep Emplify in the Engaged band", target: 74, peer: 70, series: [69, 70, 70.5, 71, 71.5, 72], prior: [67, 67.5, 68, 68.5, 69, 69] },
    cu: { metric: "Engagement", objective: "Keep engagement in the Engaged band", target: 76, peer: 72, series: [71, 72, 72.5, 73, 73.5, 74], prior: [69, 69.5, 70, 70.5, 71, 71] },
    leadingSignals: [
      { title: "Survey participation 77%", meta: "Floor is 80% — sample is not yet a valid index" },
      { title: "79 in the Questionable band", meta: "Need Coaching 15 · not four L1 tiles" }
    ],
    drivers: [
      { title: "Participation", meta: "Need ≥80% before we trust the index" },
      { title: "Frontline items", meta: "Teller disengagement · Oak Street and Riverside" },
      { title: "Performance buckets (HR ops)", meta: "Questionable 79 · Need coaching 15 · Contributor 12 · Top 14 — drill 3 only" },
      { title: "Bottom-quartile teams", meta: "N. Ortiz (Oak Street) and P. Singh (Riverside) need manager action plans" }
    ],
    action: { what: "Manager action plans on the bottom-quartile teams", owner: "CHRO", due: "Oct 2026" } },
  { id: "turnover", reports: ["l1-6"], perspective: "Learning Growth", map: "l1-6", unit: "%", direction: "lower", owner: "CHRO", peopleGroup: "workforce",
    bank: { metric: "Voluntary turnover", objective: "Cut regretted exits", target: 11, peer: 13, series: [14.2, 13.8, 13.4, 13.1, 12.8, 12.6], prior: [15.0, 14.6, 14.2, 13.8, 13.6, 13.4] },
    cu: { metric: "Voluntary turnover", objective: "Cut regretted exits", target: 12, peer: 14, series: [15.0, 14.6, 14.2, 13.9, 13.6, 13.4], prior: [15.6, 15.2, 14.8, 14.6, 14.4, 14.2] },
    leadingSignals: [
      { title: "Regretted 38 of 54 · 3 LATL", meta: "Least Affordable to Lose — stay interviews first" },
      { title: "Top reason: More money", meta: "Career change and Unhappy next — full list on drill 3" }
    ],
    drivers: [
      { title: "Regretted vs total", meta: "38 regretted of 54 separations · focus stay interviews" },
      { title: "LATL exits", meta: "M. Chen (C&I RM) · A. Brooks (BSA backup) · P. Singh (Riverside lead)" },
      { title: "By role", meta: "Tellers 26% · Bankers 14% · Managers 8% — teller_to is the frontline tile" },
      { title: "Termination reasons", meta: "More money · Career change · Unhappy (HR treemap — not an L1 tile)" },
      { title: "Pay / career path", meta: "Stay interviews on examiner-sensitive and LATL roles" }
    ],
    action: { what: "Stay interviews on examiner-sensitive roles", owner: "CHRO", due: "Sep 2026" } },
  { id: "teller_to", reports: ["l1-6"], perspective: "Learning Growth", map: "l1-6", unit: "%", direction: "lower", owner: "CHRO", peopleGroup: "workforce",
    bank: { metric: "Teller / frontline turnover", objective: "Cut teller turnover toward 20%", target: 20, peer: 28, series: [32, 30, 29, 28, 27, 26], prior: [36, 35, 34, 33, 32, 31] },
    cu: { metric: "Teller / frontline turnover", objective: "Cut frontline turnover toward 18%", target: 18, peer: 24, series: [26, 25, 24, 23.5, 23, 22.5], prior: [28, 27, 26.5, 26, 25.5, 25] },
    leadingSignals: [
      { title: "<1 yr exits: 20 of 58", meta: "Early-tenure leak — 1–2 yrs 23 · 2–3 yrs 15" },
      { title: "Oak Street exits lead the book", meta: "Highest frontline turnover in the sample" }
    ],
    drivers: [
      { title: "Tenure at exit", meta: "<1 yr: 20 · 1–2 yrs: 23 · 2–3 yrs: 15" },
      { title: "Capstone pain point", meta: "12% actively disengaged on the front line" },
      { title: "Scheduling", meta: "Staff vs peak traffic" },
      { title: "Oak Street leak", meta: "Highest frontline turnover" }
    ],
    action: { what: "Supervisor training + schedule stability", owner: "CHRO", due: "Nov 2026" } },
  { id: "ttf", reports: ["l1-6"], perspective: "Learning Growth", map: "l1-6", unit: "days", direction: "lower", owner: "CHRO", peopleGroup: "talent",
    bank: { metric: "Time-to-fill critical roles", objective: "Fill examiner-sensitive seats faster", target: 45, peer: 55, series: [62, 60, 58, 56, 54, 52], prior: [66, 64, 62, 60, 58, 57] },
    cu: { metric: "Time-to-fill critical roles", objective: "Fill examiner-sensitive seats faster", target: 50, peer: 58, series: [64, 62, 60, 58, 57, 56], prior: [68, 66, 64, 62, 61, 60] },
    leadingSignals: [
      { title: "Offer acceptance 67%", meta: "Comp band is the first lever" },
      { title: "Top decline: Salary 56.4%", meta: "Technical 25.8% · Culture 19.8% — full list on drill 3" }
    ],
    drivers: [
      { title: "Hires vs plan", meta: "82 hires this period (−1.5%) · headcount 220" },
      { title: "Offer accept", meta: "67% · BSA / credit / CFO-1 seats still open" },
      { title: "Decline reasons", meta: "Salary 56.4% · Technical 25.8% · Culture 19.8% · Other 12.7%" },
      { title: "Named seats", meta: "BSA backup is the exam talking point this month" }
    ],
    action: { what: "Open the BSA backup seat this month", owner: "CHRO", due: "Sep 2026" } },
  { id: "training", reports: ["l1-6"], perspective: "Learning Growth", map: "l1-6", unit: "%", direction: "higher", owner: "CHRO", peopleGroup: "learning",
    bank: { metric: "Required training completion", objective: "Complete required risk/compliance training", target: 98, peer: 95, series: [93, 94, 94.5, 95, 95.5, 96], prior: [91, 92, 92.5, 93, 93.5, 94] },
    cu: { metric: "Required training completion", objective: "Complete required risk/compliance training", target: 98, peer: 96, series: [94, 94.5, 95, 95.5, 96, 96.4], prior: [92, 92.5, 93, 93.5, 94, 94.2] },
    leadingSignals: [
      { title: "33 sessions completed", meta: "Volume behind the completion rate — not a second tile" },
      { title: "New-hire lag", meta: "BSA / info-sec modules still open on Oak Street" }
    ],
    drivers: [
      { title: "Sessions vs completion", meta: "33 completed sessions this period" },
      { title: "Training type mix", meta: "Internal 36% · External 64% — LMS reporting, not an L1 tile" },
      { title: "BSA / info-sec modules", meta: "Exam evidence — close the last 2 pts" },
      { title: "New hires", meta: "Lag to complete assigned modules" }
    ],
    action: { what: "Close the last 2 pts before exam window", owner: "CHRO", due: "Oct 2026" } },
  { id: "learning_paths", reports: ["l1-6"], perspective: "Learning Growth", map: "l1-6", unit: "%", direction: "higher", owner: "CHRO", peopleGroup: "learning",
    bank: { metric: "Learning paths", objective: "Succession and commercial credential paths on plan", target: 75, peer: 66, series: [58, 61, 64, 67, 70, 72], prior: [54, 56, 58, 60, 62, 64],
      leadingSignals: [
        { title: "Succession ready-now 70%", meta: "CEO-1, BSA, credit, CFO — still short of 75% on-plan" },
        { title: "Commercial credentials 63%", meta: "C&I bench feeds pipeline conversion" }
      ],
      drivers: [
        { title: "Succession ready-now", meta: "Named backups for CEO-1, BSA, credit, CFO" },
        { title: "Commercial credentials", meta: "C&I bench feeds L1-5 pipeline conversion" },
        { title: "Performance stack (context)", meta: "Contributor 12 · Top 14 — talent review, not L1 tiles" }
      ] },
    cu: { metric: "Learning paths", objective: "Succession, board education, and credential paths on plan", target: 75, peer: 66, series: [56, 59, 62, 65, 68, 70], prior: [52, 54, 56, 58, 60, 62],
      leadingSignals: [
        { title: "Succession ready-now 70%", meta: "CEO-1, BSA, credit, CFO — still short of 75% on-plan" },
        { title: "Board education hours", meta: "Volunteer board path still short of plan" }
      ],
      drivers: [
        { title: "Succession ready-now", meta: "Named backups for CEO-1, BSA, credit, CFO" },
        { title: "Board education hours", meta: "Volunteer board path" },
        { title: "Performance stack (context)", meta: "Contributor 12 · Top 14 — talent review, not L1 tiles" }
      ] },
    action: { what: "Close named path gaps before year-end talent review", owner: "CHRO", due: "Dec 2026" } }
];

/* Sample L2 grain for coaching — not L1 tiles. Bank / CU sides stay on the same metric ids. */
const WHERE_GRAIN = {
  teller_sla: {
    bank: {
      unit: "dep/hr",
      role: "tellers",
      branches: [
        { name: "Oak Street", value: 16.2, status: "bad" },
        { name: "Riverside", value: 18.8, status: "watch" },
        { name: "Downtown", value: 20.4, status: "watch" },
        { name: "Northside", value: 23.1, status: "ok" }
      ],
      associates: [
        { name: "J. Patel · Oak Street teller", value: 15.4, status: "bad", coach: "Branch manager" },
        { name: "T. Nguyen · Riverside teller", value: 18.6, status: "watch", coach: "Branch manager" }
      ]
    },
    cu: {
      unit: "dep/hr",
      role: "tellers",
      branches: [
        { name: "Oak Street", value: 16.8, status: "bad" },
        { name: "Riverside", value: 19.2, status: "watch" },
        { name: "Downtown", value: 20.8, status: "watch" },
        { name: "Northside", value: 23.4, status: "ok" }
      ],
      associates: [
        { name: "J. Patel · Oak Street teller", value: 16.0, status: "bad", coach: "Branch manager" },
        { name: "T. Nguyen · Riverside teller", value: 19.0, status: "watch", coach: "Branch manager" }
      ]
    }
  },
  orig_vol: {
    bank: {
      unit: "$MM",
      role: "RMs",
      branches: [
        { name: "Downtown commercial", value: 6.2, status: "ok" },
        { name: "Oak Street", value: 4.1, status: "watch" },
        { name: "Riverside", value: 3.4, status: "bad" },
        { name: "Northside", value: 2.8, status: "bad" }
      ],
      associates: [
        { name: "M. Chen · C&I RM", value: 1.10, status: "bad", coach: "CBO" },
        { name: "K. Ward · C&I RM", value: 1.35, status: "watch", coach: "CBO" }
      ]
    },
    cu: {
      unit: "$MM",
      role: "lenders",
      branches: [
        { name: "Downtown", value: 3.1, status: "ok" },
        { name: "Oak Street", value: 2.0, status: "watch" },
        { name: "Riverside", value: 1.6, status: "bad" },
        { name: "Northside", value: 1.2, status: "bad" }
      ],
      associates: [
        { name: "M. Chen · consumer lender", value: 0.42, status: "bad", coach: "CBO" },
        { name: "K. Ward · consumer lender", value: 0.55, status: "watch", coach: "CBO" }
      ]
    }
  },
  funnel: {
    bank: {
      unit: "%",
      role: "RMs",
      branches: [
        { name: "Downtown commercial", value: 38.0, status: "ok" },
        { name: "Oak Street", value: 33.0, status: "watch" },
        { name: "Riverside", value: 29.0, status: "bad" },
        { name: "Northside", value: 28.0, status: "bad" }
      ],
      associates: [
        { name: "M. Chen · C&I RM", value: 26.0, status: "bad", coach: "CBO" },
        { name: "K. Ward · C&I RM", value: 31.0, status: "watch", coach: "CBO" }
      ]
    },
    cu: {
      unit: "%",
      role: "lenders",
      branches: [
        { name: "Downtown", value: 42.0, status: "ok" },
        { name: "Oak Street", value: 38.0, status: "watch" },
        { name: "Riverside", value: 34.0, status: "bad" },
        { name: "Northside", value: 33.0, status: "bad" }
      ],
      associates: [
        { name: "M. Chen · consumer lender", value: 32.0, status: "bad", coach: "CBO" },
        { name: "K. Ward · consumer lender", value: 36.0, status: "watch", coach: "CBO" }
      ]
    }
  },
  new_yield: {
    bank: {
      unit: "%",
      role: "RMs",
      branches: [
        { name: "Downtown commercial", value: 6.78, status: "ok" },
        { name: "Oak Street", value: 6.55, status: "watch" },
        { name: "Riverside", value: 6.42, status: "bad" },
        { name: "Northside", value: 6.38, status: "bad" }
      ],
      associates: [
        { name: "M. Chen · C&I RM", value: 6.35, status: "bad", coach: "CBO" },
        { name: "L. Brooks · C&I RM", value: 6.50, status: "watch", coach: "CBO" }
      ]
    },
    cu: {
      unit: "%",
      role: "lenders",
      branches: [
        { name: "Downtown", value: 6.38, status: "ok" },
        { name: "Oak Street", value: 6.20, status: "watch" },
        { name: "Riverside", value: 6.08, status: "bad" },
        { name: "Northside", value: 6.04, status: "bad" }
      ],
      associates: [
        { name: "M. Chen · consumer lender", value: 6.00, status: "bad", coach: "CBO" },
        { name: "L. Brooks · consumer lender", value: 6.16, status: "watch", coach: "CBO" }
      ]
    }
  },
  pipeline: {
    bank: {
      unit: "%",
      role: "RMs",
      branches: [
        { name: "Downtown commercial", value: 34.0, status: "ok" },
        { name: "Oak Street", value: 29.0, status: "watch" },
        { name: "Riverside", value: 24.0, status: "bad" },
        { name: "Northside", value: 22.0, status: "bad" }
      ],
      associates: [
        { name: "M. Chen · C&I RM", value: 18.0, status: "bad", coach: "CBO" },
        { name: "S. Okonkwo · C&I RM", value: 25.0, status: "watch", coach: "CBO" }
      ]
    },
    cu: {
      unit: "days",
      role: "onboarding staff",
      branches: [
        { name: "Downtown", value: 1.15, status: "ok" },
        { name: "Oak Street", value: 1.45, status: "watch" },
        { name: "Riverside", value: 1.80, status: "bad" },
        { name: "Northside", value: 1.95, status: "bad" }
      ],
      associates: [
        { name: "P. Ibarra · Oak Street MSR", value: 2.10, status: "bad", coach: "COO" },
        { name: "R. Cole · Riverside MSR", value: 1.70, status: "watch", coach: "COO" }
      ]
    }
  },
  retention: {
    bank: {
      unit: "%",
      role: "platform staff",
      branches: [
        { name: "Oak Street", value: 89.2, status: "bad" },
        { name: "Riverside", value: 90.4, status: "watch" },
        { name: "Downtown", value: 91.6, status: "watch" },
        { name: "Northside", value: 92.8, status: "ok" }
      ],
      associates: [
        { name: "A. Ruiz · Downtown platform", value: 88.5, status: "bad", coach: "CMO / branch manager" },
        { name: "D. Hale · Oak Street platform", value: 90.1, status: "watch", coach: "CMO / branch manager" }
      ]
    },
    cu: {
      unit: "%",
      role: "member service",
      branches: [
        { name: "Oak Street", value: 90.6, status: "bad" },
        { name: "Riverside", value: 91.4, status: "watch" },
        { name: "Downtown", value: 92.2, status: "watch" },
        { name: "Northside", value: 93.4, status: "ok" }
      ],
      associates: [
        { name: "A. Ruiz · Downtown member service", value: 90.2, status: "bad", coach: "CMO / branch manager" },
        { name: "D. Hale · Oak Street member service", value: 91.2, status: "watch", coach: "CMO / branch manager" }
      ]
    }
  },
  hh_growth: {
    bank: {
      unit: "%",
      role: "platform staff",
      branches: [
        { name: "Oak Street", value: 1.8, status: "bad" },
        { name: "Riverside", value: 2.4, status: "watch" },
        { name: "Downtown", value: 3.6, status: "watch" },
        { name: "Northside", value: 4.2, status: "ok" }
      ],
      associates: [
        { name: "S. Cole · Oak Street banker", value: 1.2, status: "bad", coach: "CMO" },
        { name: "A. Ruiz · Downtown platform", value: 2.1, status: "watch", coach: "CMO / branch manager" }
      ]
    },
    cu: {
      unit: "%",
      role: "member service",
      branches: [
        { name: "Oak Street", value: 1.6, status: "bad" },
        { name: "Riverside", value: 2.2, status: "watch" },
        { name: "Downtown", value: 3.1, status: "watch" },
        { name: "Northside", value: 3.6, status: "ok" }
      ],
      associates: [
        { name: "S. Cole · Oak Street MSR", value: 1.1, status: "bad", coach: "CMO" },
        { name: "A. Ruiz · Downtown member service", value: 2.0, status: "watch", coach: "CMO / branch manager" }
      ]
    }
  },
  depth: {
    bank: {
      unit: "n",
      role: "bankers",
      branches: [
        { name: "Oak Street", value: 2.55, status: "bad" },
        { name: "Riverside", value: 2.72, status: "watch" },
        { name: "Downtown", value: 2.95, status: "watch" },
        { name: "Northside", value: 3.15, status: "ok" }
      ],
      associates: [
        { name: "S. Cole · Oak Street banker", value: 2.40, status: "bad", coach: "CMO" },
        { name: "A. Ruiz · Downtown platform", value: 2.70, status: "watch", coach: "CMO / branch manager" }
      ]
    },
    cu: {
      unit: "$",
      role: "member service",
      branches: [
        { name: "Oak Street", value: 15.8, status: "bad" },
        { name: "Riverside", value: 16.6, status: "watch" },
        { name: "Downtown", value: 17.8, status: "watch" },
        { name: "Northside", value: 18.6, status: "ok" }
      ],
      associates: [
        { name: "S. Cole · Oak Street MSR", value: 15.2, status: "bad", coach: "CMO" },
        { name: "A. Ruiz · Downtown member service", value: 16.4, status: "watch", coach: "CMO / branch manager" }
      ]
    }
  },
  digital: {
    bank: {
      unit: "%",
      role: "platform staff",
      branches: [
        { name: "Oak Street", value: 50, status: "bad" },
        { name: "Riverside", value: 54, status: "watch" },
        { name: "Downtown", value: 58, status: "watch" },
        { name: "Northside", value: 63, status: "ok" }
      ],
      associates: [
        { name: "D. Hale · Oak Street platform", value: 48, status: "bad", coach: "Digital / branch manager" },
        { name: "A. Ruiz · Downtown platform", value: 55, status: "watch", coach: "Digital / branch manager" }
      ]
    },
    cu: {
      unit: "%",
      role: "member service",
      branches: [
        { name: "Oak Street", value: 48, status: "bad" },
        { name: "Riverside", value: 51, status: "watch" },
        { name: "Downtown", value: 54, status: "watch" },
        { name: "Northside", value: 58, status: "ok" }
      ],
      associates: [
        { name: "D. Hale · Oak Street MSR", value: 46, status: "bad", coach: "Digital / branch manager" },
        { name: "A. Ruiz · Downtown member service", value: 52, status: "watch", coach: "Digital / branch manager" }
      ]
    }
  },
  cross_sell: {
    bank: {
      unit: "%",
      role: "bankers",
      branches: [
        { name: "Oak Street", value: 11.5, status: "bad" },
        { name: "Riverside", value: 13.2, status: "watch" },
        { name: "Downtown", value: 15.0, status: "watch" },
        { name: "Northside", value: 17.5, status: "ok" }
      ],
      associates: [
        { name: "S. Cole · Oak Street banker", value: 10.8, status: "bad", coach: "CMO" },
        { name: "K. Ward · Riverside banker", value: 13.0, status: "watch", coach: "CMO" }
      ]
    },
    cu: {
      unit: "%",
      role: "member service",
      branches: [
        { name: "Oak Street", value: 10.6, status: "bad" },
        { name: "Riverside", value: 12.0, status: "watch" },
        { name: "Downtown", value: 13.4, status: "watch" },
        { name: "Northside", value: 15.8, status: "ok" }
      ],
      associates: [
        { name: "S. Cole · Oak Street MSR", value: 10.2, status: "bad", coach: "CMO" },
        { name: "K. Ward · Riverside MSR", value: 12.2, status: "watch", coach: "CMO" }
      ]
    }
  },
  dep_growth: {
    bank: {
      unit: "%",
      role: "branch managers",
      branches: [
        { name: "Oak Street", value: 3.1, status: "bad" },
        { name: "Riverside", value: 4.2, status: "watch" },
        { name: "Downtown", value: 5.8, status: "watch" },
        { name: "Northside", value: 6.4, status: "ok" }
      ],
      associates: [
        { name: "N. Ortiz · Oak Street BM", value: 2.8, status: "bad", coach: "Treasurer" },
        { name: "P. Singh · Riverside BM", value: 4.0, status: "watch", coach: "Treasurer" }
      ]
    },
    cu: {
      unit: "%",
      role: "branch managers",
      branches: [
        { name: "Oak Street", value: 2.8, status: "bad" },
        { name: "Riverside", value: 3.7, status: "watch" },
        { name: "Downtown", value: 5.1, status: "watch" },
        { name: "Northside", value: 5.8, status: "ok" }
      ],
      associates: [
        { name: "N. Ortiz · Oak Street BM", value: 2.5, status: "bad", coach: "Treasurer" },
        { name: "P. Singh · Riverside BM", value: 3.5, status: "watch", coach: "Treasurer" }
      ]
    }
  },
  cycle: {
    bank: {
      unit: "days",
      role: "RMs",
      branches: [
        { name: "Oak Street", value: 68, status: "bad" },
        { name: "Riverside", value: 58, status: "watch" },
        { name: "Downtown commercial", value: 48, status: "watch" },
        { name: "Northside", value: 42, status: "ok" }
      ],
      associates: [
        { name: "M. Chen · C&I RM", value: 72, status: "bad", coach: "COO / Lending" },
        { name: "K. Ward · C&I RM", value: 56, status: "watch", coach: "COO / Lending" }
      ]
    },
    cu: {
      unit: "days",
      role: "lenders",
      branches: [
        { name: "Oak Street", value: 17, status: "bad" },
        { name: "Riverside", value: 14, status: "watch" },
        { name: "Downtown", value: 12.5, status: "watch" },
        { name: "Northside", value: 11, status: "ok" }
      ],
      associates: [
        { name: "M. Chen · consumer lender", value: 18, status: "bad", coach: "COO / Lending" },
        { name: "K. Ward · consumer lender", value: 14, status: "watch", coach: "COO / Lending" }
      ]
    }
  },
  self_svc: {
    bank: {
      unit: "%",
      role: "tellers",
      branches: [
        { name: "Oak Street", value: 58, status: "bad" },
        { name: "Riverside", value: 63, status: "watch" },
        { name: "Downtown", value: 68, status: "watch" },
        { name: "Northside", value: 73, status: "ok" }
      ],
      associates: [
        { name: "J. Patel · Oak Street teller", value: 55, status: "bad", coach: "COO / branch manager" },
        { name: "T. Nguyen · Riverside teller", value: 62, status: "watch", coach: "COO / branch manager" }
      ]
    },
    cu: {
      unit: "%",
      role: "tellers",
      branches: [
        { name: "Oak Street", value: 54, status: "bad" },
        { name: "Riverside", value: 59, status: "watch" },
        { name: "Downtown", value: 63, status: "watch" },
        { name: "Northside", value: 69, status: "ok" }
      ],
      associates: [
        { name: "J. Patel · Oak Street teller", value: 52, status: "bad", coach: "COO / branch manager" },
        { name: "T. Nguyen · Riverside teller", value: 58, status: "watch", coach: "COO / branch manager" }
      ]
    }
  },
  engagement: {
    bank: {
      unit: "score",
      role: "team leads",
      branches: [
        { name: "Oak Street", value: 64, status: "bad" },
        { name: "Riverside", value: 69, status: "watch" },
        { name: "Downtown", value: 72, status: "watch" },
        { name: "Northside", value: 76, status: "ok" }
      ],
      associates: [
        { name: "N. Ortiz · Oak Street BM", value: 62, status: "bad", coach: "CHRO" },
        { name: "P. Singh · Riverside BM", value: 68, status: "watch", coach: "CHRO" }
      ]
    },
    cu: {
      unit: "score",
      role: "team leads",
      branches: [
        { name: "Oak Street", value: 66, status: "bad" },
        { name: "Riverside", value: 71, status: "watch" },
        { name: "Downtown", value: 74, status: "watch" },
        { name: "Northside", value: 78, status: "ok" }
      ],
      associates: [
        { name: "N. Ortiz · Oak Street BM", value: 65, status: "bad", coach: "CHRO" },
        { name: "P. Singh · Riverside BM", value: 70, status: "watch", coach: "CHRO" }
      ]
    }
  },
  turnover: {
    bank: {
      unit: "%",
      role: "team leads",
      branches: [
        { name: "Oak Street", value: 18.0, status: "bad" },
        { name: "Riverside", value: 14.0, status: "watch" },
        { name: "Downtown", value: 11.5, status: "watch" },
        { name: "Northside", value: 9.0, status: "ok" }
      ],
      associates: [
        { name: "N. Ortiz · Oak Street BM", value: 19.0, status: "bad", coach: "CHRO" },
        { name: "P. Singh · Riverside BM", value: 14.2, status: "watch", coach: "CHRO" }
      ]
    },
    cu: {
      unit: "%",
      role: "team leads",
      branches: [
        { name: "Oak Street", value: 17.5, status: "bad" },
        { name: "Riverside", value: 14.4, status: "watch" },
        { name: "Downtown", value: 12.2, status: "watch" },
        { name: "Northside", value: 10.0, status: "ok" }
      ],
      associates: [
        { name: "N. Ortiz · Oak Street BM", value: 18.0, status: "bad", coach: "CHRO" },
        { name: "P. Singh · Riverside BM", value: 14.6, status: "watch", coach: "CHRO" }
      ]
    }
  },
  teller_to: {
    bank: {
      unit: "%",
      role: "tellers",
      branches: [
        { name: "Oak Street", value: 38, status: "bad" },
        { name: "Riverside", value: 30, status: "watch" },
        { name: "Downtown", value: 24, status: "watch" },
        { name: "Northside", value: 18, status: "ok" }
      ],
      associates: [
        { name: "J. Patel · Oak Street teller", value: 40, status: "bad", coach: "CHRO / branch manager" },
        { name: "T. Nguyen · Riverside teller", value: 31, status: "watch", coach: "CHRO / branch manager" }
      ]
    },
    cu: {
      unit: "%",
      role: "tellers",
      branches: [
        { name: "Oak Street", value: 32, status: "bad" },
        { name: "Riverside", value: 25, status: "watch" },
        { name: "Downtown", value: 21, status: "watch" },
        { name: "Northside", value: 16, status: "ok" }
      ],
      associates: [
        { name: "J. Patel · Oak Street teller", value: 34, status: "bad", coach: "CHRO / branch manager" },
        { name: "T. Nguyen · Riverside teller", value: 26, status: "watch", coach: "CHRO / branch manager" }
      ]
    }
  },
  training: {
    bank: {
      unit: "%",
      role: "associates",
      branches: [
        { name: "Oak Street", value: 91, status: "bad" },
        { name: "Riverside", value: 94, status: "watch" },
        { name: "Downtown", value: 96, status: "watch" },
        { name: "Northside", value: 99, status: "ok" }
      ],
      associates: [
        { name: "J. Patel · Oak Street teller", value: 88, status: "bad", coach: "CHRO" },
        { name: "M. Chen · C&I RM", value: 94, status: "watch", coach: "CHRO" }
      ]
    },
    cu: {
      unit: "%",
      role: "associates",
      branches: [
        { name: "Oak Street", value: 92, status: "bad" },
        { name: "Riverside", value: 94.5, status: "watch" },
        { name: "Downtown", value: 96.2, status: "watch" },
        { name: "Northside", value: 99, status: "ok" }
      ],
      associates: [
        { name: "J. Patel · Oak Street teller", value: 90, status: "bad", coach: "CHRO" },
        { name: "M. Chen · consumer lender", value: 94, status: "watch", coach: "CHRO" }
      ]
    }
  },
  ttf: {
    bank: {
      unit: "days",
      role: "recruiters",
      branches: [
        { name: "BSA / AML", value: 68, status: "bad" },
        { name: "Credit admin", value: 58, status: "watch" },
        { name: "CFO-1 / finance", value: 51, status: "watch" },
        { name: "Retail ops", value: 42, status: "ok" }
      ],
      associates: [
        { name: "BSA Officer (open req)", value: 71, status: "bad", coach: "CHRO" },
        { name: "Credit analyst II (open req)", value: 56, status: "watch", coach: "CHRO" }
      ]
    },
    cu: {
      unit: "days",
      role: "recruiters",
      branches: [
        { name: "BSA / AML", value: 70, status: "bad" },
        { name: "Lending", value: 60, status: "watch" },
        { name: "CFO-1 / finance", value: 54, status: "watch" },
        { name: "Member ops", value: 46, status: "ok" }
      ],
      associates: [
        { name: "BSA Officer (open req)", value: 72, status: "bad", coach: "CHRO" },
        { name: "Consumer lender (open req)", value: 58, status: "watch", coach: "CHRO" }
      ]
    }
  },
  learning_paths: {
    bank: {
      unit: "%",
      role: "path owners",
      branches: [
        { name: "BSA succession", value: 50, status: "bad" },
        { name: "Credit succession", value: 62, status: "watch" },
        { name: "Commercial credentials", value: 63, status: "watch" },
        { name: "CFO / CEO-1", value: 80, status: "ok" }
      ],
      associates: [
        { name: "BSA backup (unnamed)", value: 40, status: "bad", coach: "CHRO" },
        { name: "M. Chen · C&I RM credentials", value: 60, status: "watch", coach: "CHRO / CBO" }
      ]
    },
    cu: {
      unit: "%",
      role: "path owners",
      branches: [
        { name: "BSA succession", value: 48, status: "bad" },
        { name: "Board education hours", value: 62, status: "watch" },
        { name: "Lending credentials", value: 66, status: "watch" },
        { name: "CFO / CEO-1", value: 78, status: "ok" }
      ],
      associates: [
        { name: "BSA backup (unnamed)", value: 40, status: "bad", coach: "CHRO" },
        { name: "Board secretary · hours log", value: 58, status: "watch", coach: "CHRO" }
      ]
    }
  },
  csi: {
    bank: {
      unit: "score",
      role: "platform staff",
      branches: [
        { name: "Oak Street", value: 6.40, status: "bad" },
        { name: "Riverside", value: 6.85, status: "watch" },
        { name: "Downtown", value: 7.05, status: "watch" },
        { name: "Northside", value: 7.35, status: "ok" }
      ],
      associates: [
        { name: "A. Ruiz · Downtown platform", value: 6.40, status: "bad", coach: "CMO / branch manager" },
        { name: "D. Hale · Oak Street platform", value: 6.55, status: "watch", coach: "CMO / branch manager" }
      ]
    },
    cu: {
      unit: "score",
      role: "member service",
      branches: [
        { name: "Oak Street", value: 64, status: "bad" },
        { name: "Riverside", value: 67, status: "watch" },
        { name: "Downtown", value: 69, status: "watch" },
        { name: "Northside", value: 73, status: "ok" }
      ],
      associates: [
        { name: "A. Ruiz · Downtown member service", value: 64, status: "bad", coach: "CMO / branch manager" },
        { name: "D. Hale · Oak Street member service", value: 66, status: "watch", coach: "CMO / branch manager" }
      ]
    }
  }
};

const METRIC_DEFS = {
  roa: { camels: "E",
    bank: { definition: "Earnings on the asset base — primary shareholder profitability KPI.", formula: "ROA = Net Income / Average Total Assets", source: "GL / Call Report · UBPR peer median $1B–$3B" },
    cu: { definition: "Earnings that fund net worth — capital-build fuel.", formula: "ROA = Net Income / Average Total Assets", source: "ARCU FactGLMonthlySnapshot · NCUA GL category · FPR peer median" } },
  roe_nwg: { camels: "E",
    bank: { definition: "Shareholder return on equity capital.", formula: "ROE = Net Income / Average Equity Capital", source: "GL / Call Report" },
    cu: { definition: "Growth in retained earnings / net worth — the CU substitute for ROE.", formula: "Net worth growth = (NW_t − NW_t-1) / |NW_t-1|", source: "ARCU FactGLMonthlySnapshot · NCUA GL · retained earnings only · FPR" } },
  nim: { camels: "E",
    bank: { definition: "Spread between earning-asset yield and cost of funds.", formula: "NIM = Net Interest Income / Average Earning Assets", source: "GL / ALM · UBPR" },
    cu: { definition: "Spread while returning member value on loans and shares. Cost of funds and book loan yield (ARCU WAR) explain the gap — not extra tiles.", formula: "NIM = NII / Average earning assets. Monitor: cost of shares; book loan WAR.", source: "ARCU NCUA GL · FactGLMonthlySnapshot · FPR" } },
  efficiency: { camels: "E",
    bank: { definition: "Cost to produce a dollar of revenue. Lower is better.", formula: "Efficiency = Noninterest Expense / (NII + Noninterest Income)", source: "GL · UBPR efficiency median — bank curve (~52% target)" },
    cu: { definition: "NCUA / ARCU management ratio: operating expense as a share of average assets. Not the bank efficiency ratio.", formula: "OpEx / average assets = Operating expense / Average total assets", source: "ARCU NCUA GL · FactGLMonthlySnapshot · FPR" } },
  noi: { camels: "E",
    bank: { definition: "Operating profit after interest and operating expense, before extraordinary items.", formula: "NOI = NII + Noninterest Income − Noninterest Expense (annualized)", source: "GL · peer median annualized NOI" },
    cu: { definition: "Net income vs the board plan — funds net worth and member value. Not bank NOI or commercial yields.", formula: "Net income (annualized) vs plan", source: "ARCU FactGLMonthlySnapshot · FP&A plan · FPR" } },
  loan_growth: { camels: "A",
    bank: { definition: "Year-over-year growth in gross loans held for investment.", formula: "Loan growth = (Loans_t − Loans_t-1) / Loans_t-1", source: "Core / Call Report" },
    cu: { definition: "YoY loan growth inside MBL and credit limits. Consumer / auto is the lead book; MBL is the ceiling — not a commercial pipeline story.", formula: "Loan growth = (Loans_t − Loans_t-1) / Loans_t-1", source: "ARCU FactLoanMonthlySnapshot · 5300 / FPR" } },
  dep_growth: { camels: "L",
    bank: { definition: "Year-over-year growth in the deposit franchise.", formula: "Deposit growth = (Deposits_t − Deposits_t-1) / Deposits_t-1", source: "Core / FDIC SOD" },
    cu: { definition: "Year-over-year growth in member shares.", formula: "Share growth = (Shares_t − Shares_t-1) / Shares_t-1", source: "Core / 5300" } },
  fee_mix: { camels: "E",
    bank: { definition: "Share of revenue that is not spread income.", formula: "Fee mix = Noninterest Income / (NII + Noninterest Income)", source: "GL" },
    cu: { definition: "Fee income consistent with member value — do not maximize junk fees.", formula: "Fee mix = Noninterest Income / (NII + Noninterest Income)", source: "GL / 5300" } },
  csi: { camels: "M",
    bank: { definition: "Customer experience score from the bank’s satisfaction survey (Capstone CSI / NPS).", formula: "CSI = Mean survey score (vendor scale; target > 7.2)", source: "Survey platform · community bank CSAT sample" },
    cu: { definition: "Member NPS — cooperative service identity.", formula: "NPS = % Promoters − % Detractors", source: "Survey platform · CU member sample" } },
  retention: { camels: "M",
    bank: { definition: "Share of customer relationships that remain open over the period. Deflection (saves after outreach) and close-reason codes explain the gap — they are not a second tile.", formula: "Retention = 1 − (Closed CIF / Beginning CIF). Monitor: deflected / at-risk outreach; close codes (rate/fees, operations, deceased, out-of-area).", source: "Core CIF · household retention · close-reason codes" },
    cu: { definition: "Share of member-owners who remain on the books. Deflection and close-reason codes explain the gap — not a second tile.", formula: "Retention = 1 − (Closed members / Beginning members). Monitor: deflected / at-risk outreach; close codes (rate/fees, operations, deceased, out-of-area).", source: "Core membership · close-reason codes" } },
  hh_growth: { camels: "M",
    bank: { definition: "Net growth in household relationships, not account records.", formula: "Customer growth = (CIF_t − CIF_t-1) / CIF_t-1", source: "Core CIF" },
    cu: { definition: "Net member growth inside field of membership.", formula: "Member growth = (Members_t − Members_t-1) / Members_t-1", source: "Core / FOM" } },
  core_mix: { camels: "L",
    bank: { definition: "Share of funding that is sticky core deposits (DDA + savings + MMDA).", formula: "Core mix = Core deposits / Total deposits", source: "Core / Treasury" },
    cu: { definition: "Share of funding that is sticky member shares.", formula: "Core share mix = Core shares / Total shares", source: "Core / Treasury" } },
  depth: { camels: "M",
    bank: { definition: "Products attached to each household relationship.", formula: "Products / HH = Open products / Households (CIF)", source: "Core CIF" },
    cu: { definition: "Average member relationship — balances and products per member.", formula: "AMR = Total member relationship value / Members", source: "Core / member analytics" } },
  digital: { camels: "M",
    bank: { definition: "Share of eligible customers with a 90-day digital login.", formula: "Digital active = 90-day active digital users / Eligible customers", source: "Digital analytics" },
    cu: { definition: "Share of eligible members with a 90-day digital login.", formula: "Digital active = 90-day active digital users / Eligible members", source: "Digital analytics" } },
  cross_sell: { camels: "M",
    bank: { definition: "Attach rate of a second (or additional) product to existing households.", formula: "Cross-sell = Households with 2+ products / Households", source: "Core / CRM" },
    cu: { definition: "Attach rate of additional products to existing members.", formula: "Cross-sell = Members with 2+ products / Members", source: "Core / CRM" } },
  cac: { camels: "M",
    bank: { definition: "Cost to acquire a funded household — do not buy volume.", formula: "CAC = Acquisition spend / Net new funded households", source: "Marketing + core" },
    cu: { definition: "Cost to acquire a new member inside plan.", formula: "CAC = Acquisition spend / Net new members", source: "Marketing + core" } },
  capital: { camels: "C",
    bank: { definition: "Leverage capital adequacy vs PCA / CBLR well-capitalized levels.", formula: "Tier 1 Leverage = Tier 1 Capital / Average Total Assets", source: "Call Report / capital calculator · UBPR" },
    cu: { definition: "Net worth adequacy. NCUA well-capitalized ≥7%; many boards target 10%+.", formula: "Net Worth Ratio = Net Worth / Total Assets", source: "ARCU FactGLMonthlySnapshot · NCUA GL category · FPR · retained earnings only" } },
  past_due: { camels: "A",
    bank: { definition: "Early asset-quality signal: unpaid loan balance 30 or more days past due. Overdraft aging (1–10 / 11–20 / 21–30 / 30+ days) is L1-4 drill grain — not a second tile and not on L1-1.", formula: "Past Due 30+ = UPB ≥ 30 DPD / Gross Loans. Monitor (L1-4): overdraft balances by days negative.", source: "Servicing / core · deposit OD aging" },
    cu: { definition: "Loan delinquency 30+ as a share of gross loans. Courtesy pay / overdraft aging (1–10 / 11–20 / 21–30 / 30+ days) is L1-4 drill grain — not a second tile and not on L1-1.", formula: "Past Due 30+ = UPB ≥ 30 DPD / Gross Loans. Monitor (L1-4): courtesy pay and NSF balances by days negative.", source: "Servicing / core · courtesy pay aging" } },
  criticized: { camels: "A",
    bank: { definition: "Watchlist and classified credits as a share of loans or assets.", formula: "Criticized = (Special mention + Substandard + Doubtful) / Loans", source: "Credit admin / ALLL" },
    cu: { definition: "NCUA / ARCU realized-loss ratio. Delinquency stays on Past due 30+. Not classified / criticized.", formula: "Net charge-offs = (Charge-offs − Recoveries) / Average loans", source: "ARCU collections / NCUA GL · FactLoanMonthlySnapshot · FPR" } },
  cre_conc: { camels: "A",
    bank: { definition: "Commercial real estate concentration vs the 300% watch and 400% regulatory limit (percent of total risk-based capital). Construction, multifamily, and hotel/motel are sub-limits — not extra tiles.", formula: "CRE / concentration = CRE loans / Total risk-based capital. Watch 300% · limit 400%.", source: "Call Report / credit admin · interagency CRE guidance" },
    cu: { definition: "Member-business loan concentration vs board policy (NCUA MBL ceiling 12.25% of assets).", formula: "MBL concentration = Member-business loans / Total assets", source: "5300 / credit admin · NCUA MBL" } },
  acl: { camels: "A",
    bank: { definition: "Allowance coverage of nonperforming loans (CECL).", formula: "ACL coverage = ACL / Nonperforming loans", source: "CECL / GL" },
    cu: { definition: "NCUA allowance coverage of delinquent loans — not CECL / NPL bank wording.", formula: "Allowance / delinquent = Allowance for loan losses / Delinquent loans", source: "ARCU NCUA GL · 5300 / FPR" } },
  loan_assets: { camels: "L",
    bank: { definition: "Share of total assets funded in loans — stable liquidity view vs LTD when pipeline moves deposits and loans at different speeds.", formula: "Loans-to-assets = Total Loans / Total Assets", source: "Core / Call Report · target ~75%" },
    cu: { definition: "NCUA / ARCU liquidity ratio: loans funded by member shares. Loans-to-assets is drill context — not the proving number.", formula: "LTS = Total loans / Total shares. Monitor: loans / assets.", source: "ARCU FactLoanMonthlySnapshot / FactShareMonthlySnapshot · FPR" } },
  irr: { camels: "S",
    bank: { definition: "Sensitivity of net interest income to a parallel +200 bp rate shock.", formula: "IRR NII shock = ΔNII under +200 bp / Base NII  (must stay ≥ ALCO floor −8%)", source: "ALM model · ALCO policy" },
    cu: { definition: "Sensitivity of NII to a +200 bp shock vs ALCO floor. Use FPR ALM peers.", formula: "IRR NII shock = ΔNII under +200 bp / Base NII  (must stay ≥ ALCO floor −8%)", source: "ALM model · FPR" } },
  wholesale: { camels: "L",
    bank: { definition: "Reliance on FHLB, brokers, and other non-core funding.", formula: "Wholesale = Wholesale liabilities / Total liabilities", source: "Treasury / Call Report" },
    cu: { definition: "Borrowed funds as a share of member shares — not wholesale / total liabilities.", formula: "Borrowed funds / shares = FHLB and other borrowed funds / Total shares", source: "ARCU FactShareMonthlySnapshot + GL borrowed · FPR" } },
  bsa: { camels: "M",
    bank: { definition: "Average age of open BSA/AML alerts — exam talking point.", formula: "BSA aging = Mean days open for unresolved alerts", source: "AML case system" },
    cu: { definition: "Average age of open BSA/AML alerts.", formula: "BSA aging = Mean days open for unresolved alerts", source: "AML case system" } },
  runoff: { camels: "L",
    bank: { definition: "Loan principal that left the book this period (scheduled plus unexpected payoffs) as a share of beginning loans. Pipeline payoffs and servicing / ticketing alerts explain the gap — they are not extra tiles.", formula: "Runoff = Payoffs and curtailments this period / Beginning loans. Monitor: open payoff tickets; LOS pipeline payoffs.", source: "Core / servicing · LOS · ticketing" },
    cu: { definition: "Member-loan principal that left the book this period (scheduled plus unexpected payoffs) as a share of beginning loans. Pipeline payoffs and servicing / ticketing alerts explain the gap — they are not extra tiles.", formula: "Runoff = Payoffs and curtailments this period / Beginning loans. Monitor: open payoff tickets; LOS pipeline payoffs.", source: "Core / servicing · LOS · ticketing" } },
  txn_yield: { camels: "E",
    bank: { definition: "Pricing honesty on the book: weighted-average note rate on new loans minus the weighted-average on renewals. The proving number is the spread. Both rates and volumes sit on drill 1 / 3. L1-5 Yield on new originations stays the production coupon.", formula: "New vs renewal spread (bps) = (WA new-loan rate − WA renewal rate) × 100. Track: WA new; WA renewal; volume mix.", source: "LOS / core · booked principal this period" },
    cu: { definition: "Pricing honesty on the member book: weighted-average note rate on new loans minus the weighted-average on renewals. The proving number is the spread. Both rates sit on drill 1 / 3. L1-5 stays the production coupon.", formula: "New vs renewal spread (bps) = (WA new-loan rate − WA renewal rate) × 100. Track: WA new; WA renewal; volume mix.", source: "LOS / core · booked member-loan principal this period" } },
  maturities: { camels: "S",
    bank: { definition: "Share of the loan book with a contractual maturity inside the next 180 days — the wall that becomes runoff if we do not retain or reprice. Windows are 0–30 / 31–90 / 91–180. Not a full ALM gap report and not jammed into IRR NII shock.", formula: "Maturing (180d) = UPB with contractual maturity ≤ 180 days / Gross loans.", source: "Core / servicing · note maturity date" },
    cu: { definition: "Share of the member-loan book with a contractual maturity inside the next 180 days. Windows are 0–30 / 31–90 / 91–180. Not a full ALM gap report and not jammed into IRR NII shock.", formula: "Maturing (180d) = UPB with contractual maturity ≤ 180 days / Gross loans.", source: "Core / servicing · note maturity date" } },
  cycle: { camels: "M",
    bank: { definition: "Elapsed days from commercial application to credit decision.", formula: "Decision cycle = Median days (application → decision)", source: "LOS / credit admin" },
    cu: { definition: "Elapsed days from consumer/MBL application to decision.", formula: "Decision cycle = Median days (application → decision)", source: "LOS / credit admin" } },
  funnel: { camels: "M",
    bank: { definition: "Share of applications that become booked loans.", formula: "Funnel conversion = Booked loans / Applications", source: "LOS" },
    cu: { definition: "Share of applications that become booked loans.", formula: "Funnel conversion = Booked loans / Applications", source: "LOS" } },
  new_yield: { camels: "E",
    bank: { definition: "Coupon on newly originated loans vs the existing book. The proving number is new loans. The new vs renewal split is an L1-4 proving tile (New vs renewal spread) — not a second L1-5 card.", formula: "New-money yield (proving) = Weighted average note rate on new originations.", source: "LOS / core" },
    cu: { definition: "Coupon on newly originated loans vs member-value pricing. Proving number is new loans. The new vs renewal split is an L1-4 proving tile — not a second L1-5 card.", formula: "New-money yield (proving) = Weighted average note rate on new originations.", source: "LOS / core" } },
  orig_vol: { camels: "A",
    bank: { definition: "Dollar volume of loans booked in the period.", formula: "Origination volume = Sum of booked principal", source: "LOS" },
    cu: { definition: "Dollar volume of loans booked in the period.", formula: "Origination volume = Sum of booked principal", source: "LOS" } },
  self_svc: { camels: "M",
    bank: { definition: "Share of eligible transactions completed without a banker (ops lens).", formula: "Self-service = STP / digital txns / Eligible txns", source: "Core / digital ops" },
    cu: { definition: "Share of eligible transactions completed without staff.", formula: "Self-service = STP / digital txns / Eligible txns", source: "Core / digital ops" } },
  pipeline: { camels: "A",
    bank: { definition: "Commercial pipeline conversion — applications that become booked C&I.", formula: "Pipeline conversion = Booked C&I / Weighted pipeline", source: "LOS / CRM" },
    cu: { definition: "Days to onboard a new member (FOM checks included).", formula: "Onboarding cycle = Median days (application → funded membership)", source: "Core / membership ops" } },
  teller_sla: { camels: "M",
    bank: { definition: "Teller-line efficiency: deposits per hour at the window, plus procedure adherence and override / opt-out frequency (not lobby wait time).", formula: "Teller Efficiency (proving) = Deposits posted / Teller hours worked. Monitor: SOP adherence %; overrides and policy opt-outs per 100 transactions.", source: "Teller / Vertex · supervisor override log · branch ops" },
    cu: { definition: "Teller-line efficiency: deposits per hour at the window, plus procedure adherence and override / opt-out frequency (not lobby wait time).", formula: "Teller Efficiency (proving) = Deposits posted / Teller hours worked. Monitor: SOP adherence %; overrides and policy opt-outs per 100 transactions.", source: "Teller · supervisor override log · branch ops" } },
  engagement: { camels: "M",
    bank: { definition: "Associate engagement index (Emplify or successor) in the Engaged band.", formula: "Engagement = Vendor engagement index (participation ≥80%)", source: "HR survey (Emplify)" },
    cu: { definition: "Associate engagement index in the Engaged band.", formula: "Engagement = Vendor engagement index (participation ≥80%)", source: "HR survey" } },
  turnover: { camels: "M",
    bank: { definition: "Organization-wide voluntary turnover. Least Affordable to Lose (LATL) and role split (tellers / bankers / managers) explain the leak — they are not extra tiles. Teller / frontline turnover stays its own proving metric.", formula: "Voluntary turnover = Voluntary separations / Average headcount. Monitor: LATL exits; voluntary turnover by role.", source: "HRIS · talent designation" },
    cu: { definition: "Organization-wide voluntary turnover. LATL and role split explain the leak — not extra tiles.", formula: "Voluntary turnover = Voluntary separations / Average headcount. Monitor: LATL exits; voluntary turnover by role.", source: "HRIS · talent designation" } },
  teller_to: { camels: "M",
    bank: { definition: "Annualized turnover in the teller / frontline job family.", formula: "Teller turnover = Teller separations / Average teller headcount", source: "HRIS · segment tellers vs rest of staff" },
    cu: { definition: "Annualized frontline turnover.", formula: "Frontline turnover = Frontline separations / Average frontline headcount", source: "HRIS" } },
  ttf: { camels: "M",
    bank: { definition: "Calendar days to fill examiner-sensitive seats (BSA, credit, CFO-1).", formula: "Time-to-fill = Offer accept date − Requisition open date", source: "ATS / HRIS" },
    cu: { definition: "Calendar days to fill examiner-sensitive seats.", formula: "Time-to-fill = Offer accept date − Requisition open date", source: "ATS / HRIS" } },
  training: { camels: "M",
    bank: { definition: "Completion of required risk and compliance modules.", formula: "Training completion = Completed required modules / Assigned modules", source: "LMS" },
    cu: { definition: "Completion of required risk and compliance modules.", formula: "Training completion = Completed required modules / Assigned modules", source: "LMS" } },
  learning_paths: { camels: "M",
    bank: { definition: "Unified progress on succession paths (critical seats) and commercial credential paths.", formula: "Learning paths = Weighted % of named paths on plan (succession + commercial credentials)", source: "Talent review · LMS / credit admin" },
    cu: { definition: "Unified progress on succession, board education, and required credential paths.", formula: "Learning paths = Weighted % of named paths on plan (succession + board education + credentials)", source: "Talent review · board secretary · LMS" } }
};

const MAP_HOME = {
  "l1-2": { perspective: "Financial", label: "Financial · L1-2" },
  "l1-3": { perspective: "Customer", label: "Customer · L1-3", cuLabel: "Member · L1-3" },
  "l1-4": { perspective: "Risk", label: "Risk / Capital · L1-4" },
  "l1-5": { perspective: "Internal Process", label: "Process / Production · L1-5" },
  "l1-6": { perspective: "Learning Growth", label: "People · L1-6" }
};

const state = {
  charter: "bank",
  charterLocked: false,
  period: DEFAULT_PERIOD,
  report: "l1-1",
  selectedId: null,
  drillLevel: 1,
  mode: "monitor",
  editId: null,
  peerStat: "median",
  peerRosterBank: BANK_PEERS.slice(),
  peerRosterCu: CU_PEERS.slice()
};

function periodSpec() {
  return PERIODS[state.period] || PERIODS[DEFAULT_PERIOD];
}

function periodButtonLabel(periodId) {
  const p = PERIODS[periodId];
  if (!p) return "";
  return p.default ? `${p.label} (default)` : p.label;
}

function mean(arr) {
  return arr.reduce((s, x) => s + x, 0) / arr.length;
}

function runningMean(arr) {
  let sum = 0;
  return arr.map((v, i) => {
    sum += v;
    return sum / (i + 1);
  });
}

function quarterPoints(arr) {
  return [mean(arr.slice(0, 2)), mean(arr.slice(2, 5))];
}

function towardPeer(series, peer, direction) {
  return series.map((_, i) => {
    const t = series.length === 1 ? 1 : i / (series.length - 1);
    const start = peer * (direction === "lower" ? 1.08 : 0.94);
    return start + (peer - start) * t;
  });
}

function sliceForPeriod(monthly, priorMonthly) {
  if (state.period === "quarter") {
    const series = quarterPoints(monthly);
    const prior = quarterPoints(priorMonthly);
    return {
      series,
      prior,
      labels: ["Q1 '26", "Q2 '26"],
      actual: series[series.length - 1],
      priorVal: prior[prior.length - 1]
    };
  }
  if (state.period === "ytd") {
    const series = runningMean(monthly);
    const prior = runningMean(priorMonthly);
    return {
      series,
      prior,
      labels: MONTHS.map((m) => m + " YTD"),
      actual: series[series.length - 1],
      priorVal: prior[prior.length - 1]
    };
  }
  if (state.period === "py") {
    return {
      series: monthly,
      prior: priorMonthly,
      labels: MONTHS,
      actual: monthly[monthly.length - 1],
      priorVal: priorMonthly[priorMonthly.length - 1],
      comparePrior: true
    };
  }
  return {
    series: monthly,
    prior: priorMonthly,
    labels: MONTHS,
    actual: monthly[monthly.length - 1],
    priorVal: priorMonthly[priorMonthly.length - 1]
  };
}

function peerValueOf(side) {
  const median = side.peer;
  if (state.peerStat === "average") {
    return side.peerAvg != null ? side.peerAvg : Number((median * 1.02).toFixed(4));
  }
  return median;
}

function peerSourceLine() {
  const stat = state.peerStat === "average" ? "average" : "median";
  return state.charter === "cu"
    ? `FPR peer ${stat}, assets $1B–$3B · session roster (not a locked 80–120% screen)`
    : `UBPR peer ${stat}, assets $1B–$3B · session roster (not a locked 80–120% screen)`;
}

function activeRoster() {
  return state.charter === "cu" ? state.peerRosterCu : state.peerRosterBank;
}

function availablePeerPool() {
  const pool = state.charter === "cu" ? CU_PEER_POOL : BANK_PEER_POOL;
  const roster = activeRoster();
  return pool.filter((name) => !roster.includes(name));
}

function viewOf(m) {
  const side = state.charter === "cu" ? m.cu : m.bank;
  const direction = side.direction || m.direction;
  const unit = side.unit || m.unit;
  const sliced = sliceForPeriod(side.series, side.prior);
  const spec = periodSpec();
  const peer = peerValueOf(side);
  return {
    ...m,
    metric: side.metric,
    objective: side.objective,
    target: side.target,
    peer,
    series: sliced.series,
    prior: sliced.prior,
    band: side.band,
    direction,
    unit,
    actual: sliced.actual,
    priorVal: sliced.priorVal,
    labels: sliced.labels,
    comparePrior: Boolean(sliced.comparePrior),
    periodLegend: spec.legend,
    peerSeries: towardPeer(sliced.series, peer, direction),
    peerSource: peerSourceLine(),
    perspective: side.perspective || (m.perspective === "Customer" && state.charter === "cu" ? "Member" : m.perspective)
  };
}

function statusOf(v) {
  if (v.direction === "band" && v.band) {
    const [lo, hi] = v.band;
    if (v.actual >= lo && v.actual <= hi) return "ok";
    const near = v.actual < lo ? lo - v.actual : v.actual - hi;
    return near <= (hi - lo) * 0.15 ? "watch" : "bad";
  }
  if (v.direction === "higher") {
    if (v.actual >= v.target) return "ok";
    const slack = Math.abs(v.target) * 0.05 || 0.05;
    return v.actual >= v.target - slack ? "watch" : "bad";
  }
  if (v.actual <= v.target) return "ok";
  const slack = Math.abs(v.target) * 0.05 || 0.05;
  return v.actual <= v.target + slack ? "watch" : "bad";
}

function statusLabel(s) {
  return s === "ok" ? "On track" : s === "watch" ? "At risk" : "Off track";
}

function statusMixOf(views) {
  return views.reduce((a, v) => { a[statusOf(v)] += 1; return a; }, { ok: 0, watch: 0, bad: 0 });
}

function statusBarHtml(mix) {
  const n = mix.ok + mix.watch + mix.bad;
  if (!n) return "";
  const segs = ["ok", "watch", "bad"].filter((k) => mix[k] > 0).map((k) =>
    `<span class="${k}" style="width:${((mix[k] / n) * 100).toFixed(1)}%"></span>`
  ).join("");
  return `<div class="status-bar" role="img" aria-label="${mix.ok} on track, ${mix.watch} at risk, ${mix.bad} off track">${segs}</div>`;
}

function mapViews(rid) {
  return METRICS.filter((m) => m.map === rid).map(viewOf);
}

function pathStatusSeries(list) {
  const len = list.length && viewOf(list[0]).series ? viewOf(list[0]).series.length : 0;
  return Array.from({ length: len }, (_, i) => {
    const mix = { ok: 0, watch: 0, bad: 0 };
    list.forEach((m) => {
      const v = viewOf(m);
      mix[statusOf(Object.assign({}, v, { actual: v.series[i] }))] += 1;
    });
    return mix;
  });
}

function pathYTicks(maxN) {
  const hi = Math.max(maxN, 1);
  if (hi <= 5) return Array.from({ length: hi + 1 }, (_, i) => i);
  const step = hi <= 12 ? 3 : Math.ceil(hi / 3);
  const ticks = [0];
  for (let v = step; v < hi; v += step) ticks.push(v);
  if (ticks[ticks.length - 1] !== hi) ticks.push(hi);
  return ticks;
}

function pathTrendChart(mixes, maxN, labels) {
  if (!mixes.length) return "";
  const okVals = mixes.map((m) => m.ok);
  const w = 360, h = 196;
  const padL = 52, padR = 16, padT = 24, padB = 42;
  const hi = Math.max(maxN, 1);
  const denom = Math.max(1, mixes.length - 1);
  const x = (i) => padL + (i / denom) * (w - padL - padR);
  const y = (n) => padT + (1 - n / hi) * (h - padT - padB);
  const ticks = pathYTicks(hi);
  const xLabels = (labels && labels.length === mixes.length ? labels : mixes.map((_, i) => MONTHS[i] || String(i + 1)))
    .map((s) => String(s).replace(/ YTD$/, ""));
  const font = xLabels.length > 8 ? 8 : 10;
  const yMid = ((padT + y(0)) / 2).toFixed(1);
  const line = (arr) => arr.map((n, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(n).toFixed(1)}`).join(" ");
  const dots = okVals.map((n, i) =>
    `<circle cx="${x(i).toFixed(1)}" cy="${y(n).toFixed(1)}" r="${i === okVals.length - 1 ? 4 : 3.1}" fill="#6eb6ff"></circle>`
  ).join("");
  const grid = ticks.map((t) => {
    const yy = y(t).toFixed(1);
    return `<line x1="${padL}" y1="${yy}" x2="${(w - padR).toFixed(1)}" y2="${yy}" stroke="#2a3140" stroke-width="1" />
      <text x="${padL - 8}" y="${(y(t) + 3.5).toFixed(1)}" text-anchor="end" fill="#9aa3b2" font-size="10">${t}</text>`;
  }).join("");
  const xTicks = xLabels.map((lab, i) =>
    `<text x="${x(i).toFixed(1)}" y="${(h - 18).toFixed(1)}" text-anchor="middle" fill="#9aa3b2" font-size="${font}">${lab}</text>`
  ).join("");
  const spoken = mixes.map((m, i) => `${xLabels[i]} ${m.ok} of ${hi} on track`).join("; ");
  return `<div class="chart-wrap drill-chart glance-trend-wrap">
    <svg viewBox="0 0 ${w} ${h}" class="glance-trend" role="img" aria-label="On-track tiles over the period. ${spoken}.">
      ${grid}
      <line x1="${padL}" y1="${y(hi).toFixed(1)}" x2="${(w - padR).toFixed(1)}" y2="${y(hi).toFixed(1)}" stroke="#f07178" stroke-width="1.4" stroke-dasharray="4 3" />
      <line x1="${padL}" y1="${y(0).toFixed(1)}" x2="${(w - padR).toFixed(1)}" y2="${y(0).toFixed(1)}" stroke="#9aa3b2" stroke-width="1.3" />
      <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${y(0).toFixed(1)}" stroke="#9aa3b2" stroke-width="1.3" />
      <text x="14" y="${yMid}" fill="#9aa3b2" font-size="10" text-anchor="middle" transform="rotate(-90 14 ${yMid})">Tiles on track</text>
      <text x="${((padL + w - padR) / 2).toFixed(1)}" y="${h - 4}" text-anchor="middle" fill="#9aa3b2" font-size="10">Period</text>
      <text x="${(w - padR).toFixed(1)}" y="${(y(hi) - 6).toFixed(1)}" text-anchor="end" fill="#f07178" font-size="10">All ${hi}</text>
      <path d="${line(okVals)}" fill="none" stroke="#6eb6ff" stroke-width="2.6" />
      ${dots}
      ${xTicks}
    </svg>
    <div class="chart-legend">
      <span><i class="dot actual"></i>On track</span>
      <span><i class="dot goal"></i>All ${hi} tiles</span>
    </div>
  </div>`;
}

function formatValue(val, unit) {
  if (unit === "$MM" || unit === "$B") return Number(val).toFixed(2);
  if (unit === "$") return Math.round(val).toString();
  if (unit === "bps") return String(Math.round(val));
  if (unit === "days" || unit === "min" || unit === "score" || unit === "hrs" || unit === "x" || unit === "dep/hr") return Number(val).toFixed(1);
  if (unit === "%") return Number(val).toFixed(2);
  return Number(val).toFixed(2);
}

function gapAmount(v, abs) {
  if (v.unit === "bps") return Math.round(abs) + " bps";
  if (v.unit === "%") {
    const bps = Math.round(abs * 100);
    return bps >= 100 ? abs.toFixed(2) + " pts" : bps + " bps";
  }
  return (formatValue(abs, v.unit) + " " + (v.unit === "n" ? "" : v.unit)).trim();
}

function gapLabel(v, compare) {
  const delta = v.actual - compare;
  const favorable = v.direction === "lower" ? delta <= 0 : v.direction === "band" ? statusOf(v) !== "bad" : delta >= 0;
  const abs = Math.abs(delta);
  if (abs < 0.0005) return { text: "In line", favorable: true };
  return { text: (favorable ? "Ahead " : "Behind ") + gapAmount(v, abs), favorable };
}

function targetTypeOf(v) {
  const plan = `${formatValue(v.target, v.unit)} ${v.unit}`.trim();
  if (v.direction === "band" && v.band) {
    return {
      kind: "band",
      label: "Band",
      detail: `${formatValue(v.band[0], v.unit)}–${formatValue(v.band[1], v.unit)} ${v.unit} · plan ${plan}`
    };
  }
  if (v.id === "irr") {
    return { kind: "floor", label: "Floor", detail: `ALCO −8% NII · plan ${plan}` };
  }
  if (v.id === "capital") {
    return { kind: "floor", label: "Floor", detail: `Well-capitalized · plan ${plan}` };
  }
  if (v.id === "csi") {
    return { kind: "floor", label: "Floor", detail: `Capstone · plan ${plan}` };
  }
  if (v.direction === "lower" && v.perspective === "Risk") {
    return { kind: "limit", label: "Limit", detail: `Plan ${plan}` };
  }
  return { kind: "goal", label: "Goal", detail: `Plan ${plan}` };
}

function closeTheGapLine(v) {
  const s = statusOf(v);
  const plan = `${formatValue(v.target, v.unit)} ${v.unit}`.trim();
  const clock = v.perspective === "Financial" ? " Five months remain in 2026." : "";

  if (v.direction === "band" && v.band) {
    const [lo, hi] = v.band;
    const band = `${formatValue(lo, v.unit)}–${formatValue(hi, v.unit)} ${v.unit}`;
    if (v.actual >= lo && v.actual <= hi) {
      return `Inside the ${band} band. Hold utilization here.`;
    }
    if (v.actual > hi) {
      return `Need to cut ${gapAmount(v, v.actual - hi)} to get back inside ${band}.`;
    }
    return `Need ${gapAmount(v, lo - v.actual)} more to get back inside ${band}.`;
  }

  if (v.id === "irr") {
    const floor = -8;
    if (v.actual < floor) {
      return `Below the ALCO −8% floor. Need ${gapAmount(v, floor - v.actual)} to get back inside policy.`;
    }
    if (s === "ok") {
      return `At or better than the ${plan} plan. Hold inside the −8% floor.`;
    }
    return `Inside the −8% floor. Need ${gapAmount(v, Math.abs(v.actual - v.target))} more to reach the ${plan} plan.`;
  }

  if (s === "ok" || Math.abs(v.actual - v.target) < 0.0005) {
    return `At or better than plan this period. Hold the run-rate.`;
  }
  if (v.direction === "lower") {
    return `Need to cut ${gapAmount(v, Math.abs(v.actual - v.target))} to reach ${plan}.${clock}`;
  }
  return `Need ${gapAmount(v, Math.abs(v.actual - v.target))} more to reach ${plan}.${clock}`;
}

function triangulationOf(v) {
  const s = statusOf(v);
  const vsT = gapLabel(v, v.target);
  const vsP = gapLabel(v, v.peer);
  const vsY = gapLabel(v, v.priorVal);
  let primary = "plan";
  let story;
  if (s === "ok") {
    if (vsP.favorable && vsY.favorable) {
      primary = "plan";
      story = "Winning the set: at or above plan, ahead of peer, and better than last year. Plan stays the score.";
    } else if (!vsP.favorable) {
      primary = "peer";
      story = "On plan, but behind the peer median — peer is context, not the grade. Next conversation is Trend & peers.";
    } else {
      primary = "prior";
      story = "On plan and ahead of peer, but behind last year. Hold the target; check the prior-year curve on drill 2.";
    }
  } else if (vsP.favorable) {
    primary = "plan";
    story = "Ahead of peers, still short of our own target. Target stays primary — do not celebrate the peer win.";
  } else {
    primary = "plan";
    story = "Behind both plan and peers — priority for attention. Open Drivers & action (3).";
  }
  return { s, vsT, vsP, vsY, primary, story };
}

function nextDrillHint(v) {
  const s = statusOf(v);
  if (s !== "ok") return "Next: open 3 · Drivers & action — name the leak and the owner. No fourth drill.";
  if (!beatsPeer(v)) return "Next: open 2 · Trend & peers — plan is holding; peer is the conversation. No fourth drill.";
  return "On plan and ahead of peer — no further drill required. Trend (2) is optional.";
}

function charterSide(m) {
  return state.charter === "cu" ? m.cu : m.bank;
}

function driversOf(m) {
  const side = charterSide(m);
  return (side && side.drivers) || m.drivers || [];
}

function actionOf(m) {
  const side = charterSide(m);
  return (side && side.action) || m.action || { what: "—", owner: m.owner || "—", due: "—" };
}

function leadingSignalsOf(m) {
  const side = charterSide(m);
  if (state.report === "l1-4" && side && Array.isArray(side.l14Signals) && side.l14Signals.length) {
    return side.l14Signals.slice(0, 2);
  }
  const list = (side && Array.isArray(side.leadingSignals) && side.leadingSignals.length)
    ? side.leadingSignals
    : (Array.isArray(m.leadingSignals) ? m.leadingSignals : []);
  return list.slice(0, 2);
}

function reportDisplayName(r) {
  if (!r) return "";
  return state.charter === "cu" && r.cuName ? r.cuName : r.name;
}

function leadingSignalsHtml(m) {
  const list = leadingSignalsOf(m);
  if (!list.length) return "";
  return `<h2 class="section">Leading signals</h2>
    <ul class="driver-list signal-list">
      ${list.map((d) => `<li><div class="d-title">${d.title}</div><div class="d-meta">${d.meta}</div></li>`).join("")}
    </ul>
    <p class="caption">Preview only — full list on drill 3.</p>`;
}

function compactDeltaRow(tri) {
  const cell = (label, gap) =>
    `<span class="delta-cell"><span class="k">${label}</span><span class="v ${gap.favorable ? "ok" : "bad"}">${gap.text}</span></span>`;
  return `<div class="delta-row" aria-label="Ranked gaps">
    ${cell("Plan (primary)", tri.vsT)}
    ${cell("Peer", tri.vsP)}
    ${cell("Prior year", tri.vsY)}
  </div>`;
}

function metricsForReport() {
  if (state.report === "l1-1") return METRICS.filter((m) => m.reports.includes("l1-1"));
  return METRICS.filter((m) => m.reports.includes(state.report));
}

function processGroup(m) {
  if (m.id === "pipeline") return state.charter === "cu" ? "ops" : "prod";
  return m.group || "ops";
}

function peopleGroupOf(m) {
  return m.peopleGroup || "workforce";
}

function camelsLetter(id) {
  return (METRIC_DEFS[id] && METRIC_DEFS[id].camels) || "";
}

function showCamels(m) {
  return Boolean(camelsLetter(m.id));
}

function whereGrainOf(id) {
  const pack = WHERE_GRAIN[id];
  if (!pack) return null;
  return pack[state.charter] || pack.bank;
}

function grainAssociates(grain) {
  if (!grain) return [];
  if (grain.associates && grain.associates.length) return grain.associates;
  return grain.associate ? [grain.associate] : [];
}

function grainExceptions(grain) {
  const branches = (grain.branches || []).filter((b) => b.status && b.status !== "ok");
  const associates = grainAssociates(grain).filter((a) => a.status && a.status !== "ok");
  const worst = branches.some((b) => b.status === "bad") || associates.some((a) => a.status === "bad")
    ? "bad"
    : branches.length || associates.length ? "watch" : "ok";
  return { branches, associates, worst };
}

function joinNames(items) {
  const names = items.map((x) => x.name.replace(/ commercial$/, ""));
  if (!names.length) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return names[0] + " and " + names[1];
  return names[0] + " and " + names[1];
}

function grainL2Lines(list) {
  return list.map((m) => {
    const grain = whereGrainOf(m.id);
    if (!grain) return null;
    const ex = grainExceptions(grain);
    if (!ex.branches.length && !ex.associates.length) return null;
    const v = viewOf(m);
    const off = ex.branches.filter((b) => b.status === "bad");
    const named = off.length ? off : ex.branches;
    const role = grain.role || (state.charter === "cu" ? "lenders" : "RMs");
    const nPeople = ex.associates.length;
    const peopleBit = nPeople
      ? nPeople + " " + role + " below floor"
      : "no named associates below floor";
    const branchBit = named.length
      ? joinNames(named) + " off " + v.metric.toLowerCase() + " plan"
      : v.metric + " branch mix is mixed";
    return { id: m.id, status: ex.worst, text: branchBit + " · " + peopleBit };
  }).filter(Boolean);
}

function beatsPeer(v) {
  if (v.direction === "lower") return v.actual <= v.peer;
  if (v.direction === "band") {
    return Math.abs(v.actual - v.target) <= Math.abs(v.peer - v.target);
  }
  return v.actual >= v.peer;
}

function directionCopy(v) {
  if (v.direction === "lower") return "Lower is better.";
  if (v.direction === "band") return "Stay inside the band.";
  return "Higher is better.";
}

function progressPct(v) {
  const a = v.actual, t = v.target;
  if (v.direction === "band" && v.band) {
    const [lo, hi] = v.band;
    if (a >= lo && a <= hi) return 100;
    const dist = a < lo ? lo - a : a - hi;
    return Math.max(0, Math.min(99, 100 - (dist / Math.max(hi - lo, 0.01)) * 100));
  }
  if (v.direction === "higher") {
    if (t < 0) {
      if (a >= t) return 100;
      return Math.max(0, Math.min(100, (1 - (t - a) / Math.abs(t)) * 100));
    }
    return Math.max(0, Math.min(100, (a / t) * 100));
  }
  if (a <= 0 && t > 0) return 100;
  return Math.max(0, Math.min(100, (t / a) * 100));
}

function cardTrend(v) {
  const series = v.series || [];
  if (!series.length) return "";
  const prior = v.comparePrior ? v.prior : null;
  const w = 340, h = 132;
  const padL = 44, padR = 12, padT = 18, padB = 26;
  const all = series.concat([v.target], prior || []);
  const min = Math.min(...all), max = Math.max(...all);
  const span = max - min || 1;
  const pad = span * 0.14;
  const lo = min - pad, hi = max + pad;
  const denom = Math.max(1, series.length - 1);
  const x = (i) => padL + (i / denom) * (w - padL - padR);
  const y = (val) => padT + (1 - (val - lo) / (hi - lo)) * (h - padT - padB);
  const xLabels = (v.labels && v.labels.length === series.length ? v.labels : MONTHS.slice(0, series.length))
    .map((s) => String(s).replace(/ YTD$/, ""));
  const font = xLabels.length > 8 ? 8 : 10;
  const yTicks = [lo, lo + (hi - lo) / 2, hi];
  const pathOf = (arr) => arr.map((val, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(val).toFixed(1)}`).join(" ");
  const ty = y(v.target);
  const tLabelY = ty - 5 < padT + 8 ? ty + 12 : ty - 4;
  const grid = yTicks.map((t) => {
    const yy = y(t).toFixed(1);
    return `<line x1="${padL}" y1="${yy}" x2="${(w - padR).toFixed(1)}" y2="${yy}" stroke="#2a3140" stroke-width="1" />
      <text x="${padL - 6}" y="${(y(t) + 3).toFixed(1)}" text-anchor="end" fill="#9aa3b2" font-size="9">${formatValue(t, v.unit)}</text>`;
  }).join("");
  const xTicks = xLabels.map((lab, i) =>
    `<text x="${x(i).toFixed(1)}" y="${h - 6}" text-anchor="middle" fill="#9aa3b2" font-size="${font}">${lab}</text>`
  ).join("");
  const priorPath = prior && prior.length
    ? `<path d="${pathOf(prior)}" fill="none" stroke="#9aa3b2" stroke-width="1.8" />`
    : "";
  const unitLabel = v.unit ? String(v.unit) : "Value";
  const spoken = series.map((n, i) => `${xLabels[i]} ${formatValue(n, v.unit)}`).join("; ");
  return `<svg viewBox="0 0 ${w} ${h}" class="card-trend-svg" role="img" aria-label="Trend ${spoken}. Target ${formatValue(v.target, v.unit)} ${unitLabel}.">
    ${grid}
    <line x1="${padL}" y1="${y(lo).toFixed(1)}" x2="${(w - padR).toFixed(1)}" y2="${y(lo).toFixed(1)}" stroke="#9aa3b2" stroke-width="1.2" />
    <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${y(lo).toFixed(1)}" stroke="#9aa3b2" stroke-width="1.2" />
    <text x="${padL - 6}" y="${padT - 5}" text-anchor="end" fill="#9aa3b2" font-size="9">${attrEscape(unitLabel)}</text>
    <line x1="${padL}" y1="${ty.toFixed(1)}" x2="${(w - padR).toFixed(1)}" y2="${ty.toFixed(1)}" stroke="#f07178" stroke-width="1.5" stroke-dasharray="4 3" />
    <text x="${(w - padR).toFixed(1)}" y="${tLabelY.toFixed(1)}" text-anchor="end" fill="#f07178" font-size="9">Target</text>
    ${priorPath}
    <path d="${pathOf(series)}" fill="none" stroke="#3b82f6" stroke-width="2.2" />
    ${series.map((n, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(n).toFixed(1)}" r="${i === series.length - 1 ? 3.4 : 2.6}" fill="#3b82f6"></circle>`).join("")}
    ${xTicks}
  </svg>`;
}

function markNav() {
  document.querySelectorAll("#l1nav [data-go]").forEach((el) => {
    const on = el.dataset.go === state.report;
    el.classList.toggle("active", on);
    el.setAttribute("aria-current", on ? "page" : "false");
    el.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function switchReport(id) {
  if (!REPORTS[id] || id === state.report) return;
  state.report = id;
  state.selectedId = null;
  state.drillLevel = 1;
  const r = REPORTS[id];
  document.title = "Riverbend | " + reportDisplayName(r);
  const h1 = document.getElementById("reportTitle");
  if (h1) h1.textContent = reportDisplayName(r);
  try {
    const url = new URL(window.location.href);
    url.hash = id;
    history.replaceState({ report: id }, "", url);
  } catch (e) { /* file:// / preview may block history */ }
  render();
}

function renderDefs() {
  const caption = document.getElementById("defsCaption");
  const table = document.getElementById("defsTable");
  if (!caption || !table) return;
  const base = state.charter === "cu"
    ? "Formulas lock for this credit union · FPR / 5300 sample. CAMELS letters are tags, not weights — the score is still Actual vs your target. Peer context is FPR only."
    : "Formulas lock for this bank · UBPR / Call Report sample. CAMELS letters are tags, not weights — the score is still Actual vs your target. Peer context is UBPR only.";
  caption.textContent = state.report === "l1-6"
    ? base + " HR operational metrics (headcount, absenteeism, DEI, training cost, occupancy) are catalog / drill 3 only — not executive tiles. LATL and role mix sit on voluntary turnover. See HR_METRICS_L1_6_MAPPING.md."
    : state.report === "l1-4"
      ? base + (state.charter === "cu"
        ? " MBL concentration is a proving tile. Liquidity proving number is loans-to-shares (LTS); loans-to-assets is drill context. Net charge-offs replace criticized assets. OpEx / average assets is the L1-2 operating tile. Runoff / payoffs, new vs renewal spread, and 180-day maturities are book-risk tiles. Courtesy pay / overdraft aging (1–10 / 11–20 / 21–30 / 30+) sits on Past due 30+ drill 1 and 3 — not a second tile and not on L1-1."
        : " CRE concentration is a proving tile. Runoff / payoffs, new vs renewal spread, and 180-day maturities are book-risk tiles — not jammed into IRR or Past due. Overdraft aging (1–10 / 11–20 / 21–30 / 30+) sits on Past due 30+ drill 1 and 3 — not a second tile and not on L1-1.")
      : state.report === "l1-2" && state.charter === "cu"
        ? base + " Operating load is OpEx / average assets (NCUA / ARCU) — not the bank efficiency ratio. Net income vs plan replaces NOI vs budget."
        : base;
  const list = metricsForReport();
  table.innerHTML = list.map((m) => {
    const pack = METRIC_DEFS[m.id];
    const side = pack ? (state.charter === "cu" ? pack.cu : pack.bank) : null;
    const v = viewOf(m);
    const d = side || { definition: "Bind formula in planning.", formula: "TBD", source: "TBD" };
    return `<tr>
      <td>${v.metric}</td>
      <td>${v.perspective}</td>
      <td>${pack && pack.camels ? pack.camels : "—"}</td>
      <td>${d.definition}</td>
      <td class="formula">${d.formula}</td>
      <td>${d.source}</td>
    </tr>`;
  }).join("");
}

function applySessionVisibility() {
  const defs = state.mode === "defs";
  const adding = state.mode === "add";
  const session = document.getElementById("monitorSession");
  const panel = document.getElementById("defsPanel");
  const plan = ensurePlanPanel();
  document.body.classList.toggle("mode-edit", state.mode === "edit");
  if (session) session.hidden = defs || adding;
  if (panel) panel.hidden = !defs;
  if (plan) plan.hidden = !adding;
  document.querySelectorAll(".mode-btn[data-mode]").forEach((b) => {
    b.classList.toggle("active", b.dataset.mode === state.mode);
  });
  syncModeHint();
  if (defs) renderDefs();
  if (adding) renderPlanPanel();
}

function syncModeHint() {
  let hint = document.getElementById("modeHint");
  if (!hint) {
    hint = document.createElement("p");
    hint.id = "modeHint";
    hint.className = "caption mode-hint";
    const session = document.getElementById("monitorSession");
    const toolbar = session && session.querySelector(".toolbar");
    if (!toolbar) return;
    toolbar.insertAdjacentElement("afterend", hint);
  }
  if (state.mode === "edit") {
    hint.hidden = false;
    hint.textContent = "Edit title, objective, owner, and target on the cards. Status and trend update immediately (session only — refresh restores the sample).";
  } else {
    hint.hidden = true;
  }
}

function setMode(next) {
  const allowed = { monitor: 1, defs: 1, add: 1, edit: 1 };
  state.mode = allowed[next] ? next : "monitor";
  if (state.mode === "add") {
    const plan = document.getElementById("planPanel");
    if (plan) delete plan.dataset.seedReport;
  }
  render();
}

function planEl(id) {
  return document.getElementById(id);
}

function ensurePlanPanel() {
  let el = document.getElementById("planPanel");
  if (el) return el;
  el = document.createElement("div");
  el.id = "planPanel";
  el.className = "defs-panel plan-panel";
  el.hidden = true;
  el.innerHTML = `
    <h2 class="section" id="planTitle" style="margin-bottom:6px">Add a proving metric</h2>
    <p class="caption" id="planCaption">Session only · refresh restores the sample catalog.</p>
    <div class="plan-grid">
      <div class="field-wide" id="planPickWrap" hidden>
        <label for="planMetricPick">Metric on this report</label>
        <select id="planMetricPick"></select>
      </div>
      <div class="field-wide" id="planMapWrap" hidden>
        <label for="planMap">Strategy map home</label>
        <select id="planMap"></select>
      </div>
      <div>
        <label for="planMetric">Metric name</label>
        <input id="planMetric" type="text" autocomplete="off" />
      </div>
      <div>
        <label for="planOwner">Owner</label>
        <select id="planOwner"></select>
      </div>
      <div class="field-wide">
        <label for="planObjective">Objective</label>
        <textarea id="planObjective"></textarea>
      </div>
      <div class="field-wide">
        <label for="planFormula">Formula</label>
        <textarea id="planFormula" placeholder="e.g. ROA = Net Income / Average Total Assets"></textarea>
      </div>
      <div>
        <label for="planTarget">Target</label>
        <input id="planTarget" type="number" step="any" />
      </div>
      <div>
        <label for="planPeer">Peer</label>
        <input id="planPeer" type="number" step="any" />
      </div>
      <div id="planActualWrap">
        <label for="planActual">Current actual (optional)</label>
        <input id="planActual" type="number" step="any" />
      </div>
      <div>
        <label for="planUnit">Unit</label>
        <select id="planUnit"></select>
      </div>
      <div>
        <label for="planDirection">Direction</label>
        <select id="planDirection">
          <option value="higher">Higher is better</option>
          <option value="lower">Lower is better</option>
          <option value="band">Stay inside a band</option>
        </select>
      </div>
      <div id="planGroupWrap" hidden>
        <label for="planGroup">L1-5 stack</label>
        <select id="planGroup">
          <option value="ops">Operations · cost, speed, service</option>
          <option value="prod">Production · sales and business development</option>
        </select>
      </div>
      <div id="planBandLoWrap" hidden>
        <label for="planBandLo">Band low</label>
        <input id="planBandLo" type="number" step="any" />
      </div>
      <div id="planBandHiWrap" hidden>
        <label for="planBandHi">Band high</label>
        <input id="planBandHi" type="number" step="any" />
      </div>
      <div class="field-wide" id="planAlsoWrap" hidden>
        <label class="check"><input id="planAlsoL1" type="checkbox" checked /> Also show on L1-1 Enterprise Strategy</label>
      </div>
    </div>
    <p class="plan-err" id="planErr" hidden></p>
    <p class="plan-note" id="planNote" hidden></p>
    <div class="plan-actions">
      <button class="btn-primary" type="button" data-plan-act="save" id="planSave">Create &amp; monitor</button>
      <button class="btn-ghost" type="button" data-plan-act="cancel">Cancel</button>
    </div>`;
  const defs = document.getElementById("defsPanel");
  if (defs && defs.parentNode) defs.after(el);
  else {
    const wrap = document.querySelector(".wrap");
    if (wrap) wrap.appendChild(el);
  }
  el.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-plan-act]");
    if (!btn) return;
    if (btn.dataset.planAct === "cancel") setMode("monitor");
    if (btn.dataset.planAct === "save") savePlanForm();
  });
  el.addEventListener("change", (e) => {
    if (e.target.id === "planMetricPick") {
      state.editId = e.target.value;
      fillPlanForm();
      syncPlanFieldVisibility();
    }
    if (e.target.id === "planDirection" || e.target.id === "planMap") syncPlanFieldVisibility();
  });
  el.querySelector("#planMap").innerHTML = Object.keys(MAP_HOME).map((id) => {
    const pack = MAP_HOME[id];
    const label = state.charter === "cu" && pack.cuLabel ? pack.cuLabel : pack.label;
    return `<option value="${id}">${label}</option>`;
  }).join("");
  el.querySelector("#planOwner").innerHTML = PLAN_OWNERS.map((name) =>
    `<option value="${attrEscape(name)}">${attrEscape(name)}</option>`
  ).join("");
  el.querySelector("#planUnit").innerHTML = PLAN_UNITS.map((u) =>
    `<option value="${attrEscape(u.value)}">${attrEscape(u.label)}</option>`
  ).join("");
  return el;
}

function homeReportOf() {
  if (state.report !== "l1-1") return state.report;
  const pick = planEl("planMap");
  return (pick && MAP_HOME[pick.value] ? pick.value : "l1-2");
}

function syncPlanFieldVisibility() {
  const adding = state.mode === "add";
  const home = adding ? homeReportOf() : (METRICS.find((m) => m.id === state.editId) || {}).map;
  planEl("planPickWrap").hidden = adding;
  planEl("planMapWrap").hidden = !(adding && state.report === "l1-1");
  planEl("planActualWrap").hidden = !adding;
  planEl("planAlsoWrap").hidden = !(adding && state.report !== "l1-1");
  planEl("planGroupWrap").hidden = home !== "l1-5";
  const band = planEl("planDirection").value === "band";
  planEl("planBandLoWrap").hidden = !band;
  planEl("planBandHiWrap").hidden = !band;
  planEl("planSave").textContent = adding ? "Create & monitor" : "Save changes";
  planEl("planTitle").textContent = adding ? "Add a proving metric" : "Edit a proving metric";
  const r = REPORTS[state.report];
  const fi = state.charter === "cu" ? "credit union" : "bank";
  planEl("planCaption").textContent = adding
    ? `New tile on ${r.name} · ${fi} · session only — refresh restores the sample catalog.`
    : `Edit the ${fi} side of a tile on ${r.name}. Session only — refresh restores the sample catalog.`;
}

function defaultPlanOwner() {
  const raw = (REPORTS[state.report] || {}).owner || "";
  if (PLAN_OWNERS.includes(raw)) return raw;
  if (raw.indexOf("CMO") === 0) return "CMO";
  return PLAN_OWNERS[0];
}

function seedAddForm() {
  planEl("planMetric").value = "";
  planEl("planObjective").value = "";
  planEl("planFormula").value = "";
  planEl("planOwner").value = defaultPlanOwner();
  planEl("planTarget").value = "";
  planEl("planPeer").value = "";
  planEl("planActual").value = "";
  planEl("planUnit").value = "%";
  planEl("planDirection").value = "higher";
  planEl("planBandLo").value = "";
  planEl("planBandHi").value = "";
  planEl("planGroup").value = "ops";
  planEl("planAlsoL1").checked = true;
  if (state.report === "l1-1") planEl("planMap").value = "l1-2";
  planEl("planErr").hidden = true;
  planEl("planNote").hidden = true;
}

function fillPlanForm() {
  const m = METRICS.find((x) => x.id === state.editId);
  if (!m) return;
  const v = viewOf(m);
  planEl("planMetric").value = v.metric;
  planEl("planObjective").value = v.objective;
  const pack = METRIC_DEFS[m.id];
  const defSide = pack ? (state.charter === "cu" ? pack.cu : pack.bank) : null;
  planEl("planFormula").value = defSide && defSide.formula ? defSide.formula : "";
  planEl("planOwner").value = v.owner;
  planEl("planTarget").value = v.target;
  planEl("planPeer").value = v.peer;
  planEl("planUnit").value = v.unit;
  planEl("planDirection").value = v.direction === "band" ? "band" : v.direction;
  planEl("planGroup").value = m.group === "prod" ? "prod" : "ops";
  if (v.band) {
    planEl("planBandLo").value = v.band[0];
    planEl("planBandHi").value = v.band[1];
  } else {
    planEl("planBandLo").value = "";
    planEl("planBandHi").value = "";
  }
  planEl("planErr").hidden = true;
}

function renderPlanPanel() {
  const el = ensurePlanPanel();
  if (state.mode === "edit") {
    const list = metricsForReport();
    const pick = planEl("planMetricPick");
    pick.innerHTML = list.map((m) => {
      const v = viewOf(m);
      return `<option value="${m.id}">${v.metric}</option>`;
    }).join("");
    if (!list.some((m) => m.id === state.editId) && list[0]) state.editId = list[0].id;
    if (state.editId) pick.value = state.editId;
    fillPlanForm();
  } else if (el.dataset.seedReport !== state.report) {
    seedAddForm();
    el.dataset.seedReport = state.report;
  }
  syncPlanFieldVisibility();
}

function planError(msg) {
  const err = planEl("planErr");
  const note = planEl("planNote");
  err.textContent = msg;
  err.hidden = !msg;
  if (note) note.hidden = true;
}

function uniqueMetricId(name) {
  const base = String(name || "metric").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "metric";
  let id = "custom_" + base;
  let n = 1;
  while (METRICS.some((m) => m.id === id)) id = "custom_" + base + "_" + (++n);
  return id;
}

function approachSeries(target, direction, actual) {
  const end = Number.isFinite(actual) ? actual : Number((target * 0.97).toFixed(4));
  let start;
  if (direction === "lower") start = end + Math.abs(end - target) * 0.7 + Math.abs(target || 1) * 0.04;
  else if (target < 0) start = end - Math.abs(end - target) * 0.7;
  else start = end - Math.abs(end - target) * 0.7 - Math.abs(target || 1) * 0.04;
  return Array.from({ length: 6 }, (_, i) => {
    const t = i / 5;
    return Number((start + (end - start) * t).toFixed(4));
  });
}

function priorFromSeries(series, direction) {
  return series.map((v) => Number((direction === "lower" ? v * 1.06 : v * 0.93).toFixed(4)));
}

function readPlanValues() {
  const metric = planEl("planMetric").value.trim();
  const objective = planEl("planObjective").value.trim();
  const formula = planEl("planFormula").value.trim() || "TBD — bind in planning";
  const owner = planEl("planOwner").value.trim() || "Owner TBD";
  const target = Number(planEl("planTarget").value);
  const peerRaw = planEl("planPeer").value;
  const actualRaw = planEl("planActual").value;
  const unit = planEl("planUnit").value.trim() || "units";
  const direction = planEl("planDirection").value;
  const group = planEl("planGroup").value === "prod" ? "prod" : "ops";
  const bandLo = Number(planEl("planBandLo").value);
  const bandHi = Number(planEl("planBandHi").value);
  if (!metric || !objective || Number.isNaN(target)) {
    planError("Fill metric name, objective, and a numeric target.");
    return null;
  }
  let peer = peerRaw === "" ? NaN : Number(peerRaw);
  if (Number.isNaN(peer)) peer = direction === "lower" ? Number((target * 1.08).toFixed(4)) : Number((target * 0.92).toFixed(4));
  const actual = actualRaw === "" ? NaN : Number(actualRaw);
  let band = null;
  if (direction === "band") {
    if (Number.isNaN(bandLo) || Number.isNaN(bandHi) || bandLo >= bandHi) {
      planError("Band direction needs a low and a high, with low below high.");
      return null;
    }
    band = [bandLo, bandHi];
  }
  return { metric, objective, formula, owner, target, peer, actual, unit, direction, group, band };
}

function writeSide(side, vals, series, prior) {
  side.metric = vals.metric;
  side.objective = vals.objective;
  side.target = vals.target;
  side.peer = vals.peer;
  side.unit = vals.unit;
  if (series) side.series = series;
  if (prior) side.prior = prior;
  if (vals.band) side.band = vals.band;
  else delete side.band;
}

function savePlanForm() {
  const vals = readPlanValues();
  if (!vals) return;
  if (state.mode === "edit") {
    const m = METRICS.find((x) => x.id === state.editId);
    if (!m) {
      planError("Pick a metric to edit.");
      return;
    }
    const side = state.charter === "cu" ? m.cu : m.bank;
    writeSide(side, vals);
    m.owner = vals.owner;
    m.direction = vals.direction;
    m.unit = vals.unit;
    if (m.map === "l1-5") m.group = vals.group;
    state.selectedId = m.id;
    setMode("monitor");
    openDetail(m.id);
    return;
  }
  const home = homeReportOf();
  const pack = MAP_HOME[home] || MAP_HOME["l1-2"];
  const reports = [home];
  if (state.report === "l1-1" || planEl("planAlsoL1").checked) {
    if (!reports.includes("l1-1")) reports.unshift("l1-1");
  }
  if (state.report !== "l1-1" && !reports.includes(state.report)) reports.push(state.report);
  const series = approachSeries(vals.target, vals.direction, Number.isFinite(vals.actual) ? vals.actual : NaN);
  const prior = priorFromSeries(series, vals.direction);
  const id = uniqueMetricId(vals.metric);
  const side = {};
  writeSide(side, vals, series, prior);
  const rec = {
    id,
    reports,
    perspective: pack.perspective,
    map: home,
    unit: vals.unit,
    direction: vals.direction,
    owner: vals.owner,
    bank: JSON.parse(JSON.stringify(side)),
    cu: JSON.parse(JSON.stringify(side)),
    drivers: [{ title: "Primary driver", meta: "Bind in planning" }],
    action: { what: "Name the action against this new objective", owner: vals.owner, due: "TBD" }
  };
  if (home === "l1-5") rec.group = vals.group;
  METRICS.push(rec);
  METRIC_DEFS[id] = {
    camels: "",
    bank: { definition: vals.objective, formula: vals.formula, source: "Session (not persisted)" },
    cu: { definition: vals.objective, formula: vals.formula, source: "Session (not persisted)" }
  };
  state.selectedId = id;
  setMode("monitor");
  openDetail(id);
}

function bindNav() {
  document.querySelectorAll("#l1nav [data-go]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      switchReport(el.dataset.go);
    });
  });
}

function renderChrome() {
  const r = REPORTS[state.report];
  const spec = periodSpec();
  const fi = state.charter === "cu" ? "Riverbend Community Credit Union" : "Riverbend Community Bank";
  document.getElementById("brandTitle").textContent = fi + " | " + reportDisplayName(r);
  const h1 = document.getElementById("reportTitle");
  if (h1) h1.textContent = reportDisplayName(r);
  document.title = "Riverbend | " + reportDisplayName(r);
  document.getElementById("brandSub").textContent = "L1 Balanced Scorecard · " + spec.legend + " · Actual vs Target vs Peer";
  document.getElementById("asof").textContent = spec.asof;
  markNav();
  document.getElementById("reportDecision").textContent = r.decision;
  document.getElementById("reportOwner").textContent = "Owner: " + r.owner + " · scored as " + spec.label;
  document.querySelectorAll(".charter button").forEach((b) => {
    b.classList.toggle("active", b.dataset.charter === state.charter);
  });
  const periodGroup = document.querySelector(".period-picks");
  if (periodGroup) {
    periodGroup.setAttribute("aria-label", "Time frame · Month is default on entry");
    if (!periodGroup.querySelector(".period-picks-caption")) {
      const cap = document.createElement("p");
      cap.className = "period-picks-caption";
      cap.textContent = "Time frame · Month opens by default (last closed month)";
      periodGroup.prepend(cap);
    }
  }
  document.querySelectorAll(".period-picks .tab").forEach((b) => {
    const pid = b.dataset.period;
    const p = PERIODS[pid];
    const on = pid === state.period;
    b.classList.toggle("active", on);
    b.classList.toggle("tab-default", !!(p && p.default));
    b.setAttribute("aria-pressed", on ? "true" : "false");
    b.textContent = periodButtonLabel(pid);
    if (p && p.default) {
      b.setAttribute("title", "Default time frame on entry · last closed month");
    } else {
      b.removeAttribute("title");
    }
  });
}

function pulseHeadline(mix) {
  if (mix.bad > 1) return "The room has work";
  if (mix.bad === 1) return "One objective is off";
  if (mix.watch > 1) return "Holding — edges are hot";
  if (mix.watch === 1) return "On plan, one at risk";
  return "The pack is on plan";
}

function multiRingChart(mix) {
  const n = mix.ok + mix.watch + mix.bad;
  const total = n || 1;
  const rings = [
    { cls: "ok", r: 52, val: mix.ok },
    { cls: "watch", r: 40, val: mix.watch },
    { cls: "bad", r: 28, val: mix.bad }
  ];
  const tracks = rings.map((ring) =>
    `<circle class="mr-track" cx="60" cy="60" r="${ring.r}"></circle>`
  ).join("");
  const arcs = rings.map((ring) => {
    const c = 2 * Math.PI * ring.r;
    const filled = (ring.val / total) * c;
    return `<circle class="mr ${ring.cls}" cx="60" cy="60" r="${ring.r}" stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${(c - filled).toFixed(2)}"></circle>`;
  }).join("");
  return `<div class="pulse-multi-wrap" role="img" aria-label="${mix.ok} on track, ${mix.watch} at risk, ${mix.bad} off track">
    <svg class="pulse-multi" viewBox="0 0 120 120" aria-hidden="true">
      <g transform="rotate(-90 60 60)">${tracks}${arcs}</g>
    </svg>
    <div class="pulse-hole">
      <div class="pulse-n">${mix.ok}</div>
      <div class="pulse-d">of ${n}</div>
    </div>
  </div>`;
}

function renderBriefing(list) {
  const counts = statusMixOf(list.map(viewOf));
  const n = counts.ok + counts.watch + counts.bad;
  const tone = counts.bad ? "bad" : counts.watch ? "watch" : "ok";
  document.getElementById("counts").innerHTML = `
    <div class="score-pulse tone-${tone}">
      ${multiRingChart(counts)}
      <div class="pulse-side">
        <div class="pulse-k">Status this period</div>
        <div class="pulse-head">${pulseHeadline(counts)}</div>
        <ul class="pulse-ticks">
          <li class="ok"><i></i><b>${counts.ok}</b> on track</li>
          <li class="watch"><i></i><b>${counts.watch}</b> at risk</li>
          <li class="bad"><i></i><b>${counts.bad}</b> off track</li>
        </ul>
      </div>
    </div>`;
  const ex = list.map(viewOf).filter((v) => statusOf(v) !== "ok");
  const box = document.getElementById("exceptions");
  const l2 = grainL2Lines(list);
  const l2Html = l2.length
    ? `<h2 class="section" style="margin-top:12px">Branch &amp; associate · L2 exceptions</h2>
      <p class="caption">Where the enterprise miss lives — click opens Drivers &amp; action. Not a roster.</p>`
      + l2.map((row) => `<button class="ex-row l2 ${row.status}" type="button" data-id="${row.id}" data-level="3">
        <span>${row.text}</span>
        <span class="badge ${row.status}">L2</span>
      </button>`).join("")
    : "";
  if (!ex.length && !l2.length) {
    box.innerHTML = `<h2 class="section">Needs attention</h2><p class="hint">All objectives on this report are on track this period.</p>`;
    return;
  }
  const kpiHtml = ex.length
    ? `<h2 class="section">Needs attention</h2>` + ex.map((v) => {
      const s = statusOf(v);
      const vsT = gapLabel(v, v.target);
      const vsP = gapLabel(v, v.peer);
      return `<button class="ex-row ${s}" type="button" data-id="${v.id}">
        <span><strong>${v.metric}</strong> · ${v.owner}</span>
        <span class="badge ${s}">${statusLabel(s)}</span>
        <span>${vsT.text} vs plan</span>
        <span>${vsP.text} vs peer</span>
      </button>`;
    }).join("")
    : `<h2 class="section">Needs attention</h2><p class="hint">All objectives on this report are on track this period.</p>`;
  box.innerHTML = kpiHtml + l2Html;
  box.querySelectorAll("[data-id]").forEach((el) => {
    el.addEventListener("click", () => openDetail(el.dataset.id, el.dataset.level ? Number(el.dataset.level) : 1));
  });
}

function renderMap() {
  const wrap = document.getElementById("mapWrap");
  if (!wrap) return;
  if (state.report !== "l1-1") {
    wrap.style.display = "none";
    return;
  }
  wrap.style.display = "block";
  const boxes = [
    { id: "l1-6", tier: "Leading", name: state.charter === "cu" ? "People" : "People" },
    { id: "l1-5", tier: "Leading", name: "Process / Production" },
    { id: "l1-3", tier: "Leading", name: state.charter === "cu" ? "Member" : "Customer" },
    { id: "l1-2", tier: "Lagging", name: "Financial" }
  ];
  const pulse = (rid) => {
    const views = mapViews(rid);
    const mix = statusMixOf(views);
    const worst = mix.bad ? "bad" : mix.watch ? "watch" : "ok";
    return { worst, mix, n: views.length, on: mix.ok };
  };
  document.getElementById("strategyMap").innerHTML = boxes.map((b) => {
    const p = pulse(b.id);
    return `<button class="map-card" type="button" data-go="${b.id}">
      <div class="tier">${b.tier}</div>
      <div class="name">${b.name}</div>
      ${statusBarHtml(p.mix)}
      <div class="pulse"><span class="badge ${p.worst}">${statusLabel(p.worst)}</span> ${p.on}/${p.n} on track</div>
    </button>`;
  }).join("");
  const rp = pulse("l1-4");
  document.getElementById("riskMapSlot").innerHTML = `<button class="map-card rail" type="button" data-go="l1-4">
    <div class="tier">Constraint</div>
    <div class="name">Risk / Capital</div>
    ${statusBarHtml(rp.mix)}
    <div class="pulse"><span class="badge ${rp.worst}">${statusLabel(rp.worst)}</span> ${rp.on}/${rp.n} on track</div>
  </button>`;
  wrap.querySelectorAll("[data-go]").forEach((el) => {
    el.addEventListener("click", () => switchReport(el.dataset.go));
  });
  document.getElementById("mapCaption").textContent = state.charter === "cu"
    ? "People → Process → Member → Financial (member value + net worth). Risk constrains. Bars are that report’s proving-metric mix."
    : "People → Process → Customer → Financial (shareholder value). Risk constrains. Bars are that report’s proving-metric mix.";
  document.getElementById("mapCausal").textContent = state.charter === "cu"
    ? "Sample chain: efficiency → capital retention → net worth"
    : "Sample chain: credit quality → provision → ROA";
}

function renderEnterpriseGlance(list) {
  const slot = document.getElementById("enterpriseGlance");
  if (!slot) return;
  if (state.report !== "l1-1") {
    slot.hidden = true;
    slot.innerHTML = "";
    return;
  }
  slot.hidden = false;
  const views = list.map(viewOf);
  const n = views.length;
  const ahead = views.reduce((a, v) => {
    if (gapLabel(v, v.target).favorable) a.plan += 1;
    if (gapLabel(v, v.peer).favorable) a.peer += 1;
    if (gapLabel(v, v.priorVal).favorable) a.year += 1;
    return a;
  }, { plan: 0, peer: 0, year: 0 });
  const spines = [
    { id: "l1-6", name: state.charter === "cu" ? "People" : "People" },
    { id: "l1-5", name: "Process" },
    { id: "l1-3", name: state.charter === "cu" ? "Member" : "Customer" },
    { id: "l1-2", name: "Financial" },
    { id: "l1-4", name: "Risk / Capital" }
  ].map((b) => {
    const mix = statusMixOf(mapViews(b.id));
    const total = mix.ok + mix.watch + mix.bad || 1;
    return Object.assign(b, { mix, pressure: (mix.bad * 2 + mix.watch) / total });
  });
  const weak = spines.slice().sort((a, b) => b.pressure - a.pressure)[0];
  const path = pathStatusSeries(list);
  const labels = views[0] && views[0].labels && views[0].labels.length === path.length
    ? views[0].labels
    : MONTHS.slice(0, path.length);
  const lastPath = path.length ? path[path.length - 1] : { ok: 0, watch: 0 };
  const l2n = grainL2Lines(list).length;
  slot.innerHTML = `
    <div class="glance-card">
      <h2 class="section">Versus plan, peer, last year</h2>
      <div class="glance-metrics">
        <div><div class="k">Ahead of plan</div><div class="v">${ahead.plan}<span> / ${n}</span></div></div>
        <div><div class="k">Ahead of peer</div><div class="v">${ahead.peer}<span> / ${n}</span></div></div>
        <div><div class="k">Ahead of last year</div><div class="v">${ahead.year}<span> / ${n}</span></div></div>
      </div>
      <p class="caption">Board-pack tiles only · ${views[0] ? views[0].periodLegend : ""}.</p>
    </div>
    <div class="glance-card">
      <h2 class="section">On-track path</h2>
      ${pathTrendChart(path, n, labels)}
      <p class="caption">${lastPath.ok} of ${n} on track this period${labels.length ? " · " + labels[labels.length - 1] : ""}.</p>
    </div>
    <div class="glance-card">
      <h2 class="section">Weakest link</h2>
      <div class="weak-name">${weak.name}</div>
      ${statusBarHtml(weak.mix)}
      <p class="caption">${weak.mix.ok}/${weak.mix.ok + weak.mix.watch + weak.mix.bad} on track on that report. ${l2n ? l2n + " branch/associate exception" + (l2n === 1 ? "" : "s") + " on this pack." : "No L2 exceptions on this pack."} Click the map box to open it.</p>
    </div>`;
}

function attrEscape(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function applyCardEdit(input) {
  const m = METRICS.find((x) => x.id === input.dataset.id);
  if (!m) return;
  const side = state.charter === "cu" ? m.cu : m.bank;
  const field = input.dataset.field;
  if (field === "metric") {
    const name = input.value.trim();
    if (name) side.metric = name;
  } else if (field === "objective") {
    const text = input.value.trim();
    if (text) side.objective = text;
  } else if (field === "owner") {
    const owner = input.value.trim();
    if (owner) m.owner = owner;
  } else if (field === "target") {
    const n = Number(input.value);
    if (!Number.isNaN(n)) side.target = n;
  }
}

function bindCardEditors(root) {
  if (!root || state.mode !== "edit") return;
  root.querySelectorAll("input[data-field]").forEach((input) => {
    input.addEventListener("click", (e) => e.stopPropagation());
    input.addEventListener("keydown", (e) => e.stopPropagation());
    input.addEventListener("change", () => {
      applyCardEdit(input);
      render();
    });
  });
}

function cardMarkup(m) {
  const v = viewOf(m);
  const s = statusOf(v);
  const peerOk = beatsPeer(v);
  const letter = camelsLetter(m.id);
  const camels = showCamels(m) && letter
    ? `<span class="camels-chip" title="CAMELS tag, not a weight">${letter}</span>`
    : "";
  const editing = state.mode === "edit";
  const title = editing
    ? `<input class="card-title-input" data-field="metric" data-id="${m.id}" value="${attrEscape(v.metric)}" aria-label="Metric title" />`
    : `<h3>${v.metric}</h3>`;
  const meta = editing
    ? `<div class="meta">${v.perspective} · ${v.periodLegend}</div>
       <label class="card-owner-field">Owner
         <input class="card-owner-input" data-field="owner" data-id="${m.id}" value="${attrEscape(v.owner)}" aria-label="Owner" />
       </label>`
    : `<div class="meta">${v.perspective} · ${v.periodLegend} · ${v.owner}</div>`;
  const objective = editing
    ? `<input class="obj-input" data-field="objective" data-id="${m.id}" value="${attrEscape(v.objective)}" aria-label="Objective" />`
    : `<div class="objective">${v.objective}</div>`;
  const target = editing
    ? `<input class="card-target-input" data-field="target" data-id="${m.id}" type="number" step="any" value="${v.target}" aria-label="Your target" />`
    : `<div class="v">${formatValue(v.target, v.unit)} ${v.unit}</div>`;
  const gapCompare = v.comparePrior ? v.priorVal : v.target;
  const gap = gapLabel(v, gapCompare);
  return `<article class="card ${state.selectedId === m.id ? "selected" : ""}" data-id="${m.id}">
      <div class="card-head">
        <div>
          ${title}
          ${meta}
        </div>
        <div class="badges">${camels}<span class="badge ${s}">${statusLabel(s)}</span></div>
      </div>
      ${objective}
      <div class="metrics">
        <div class="metric-box"><div class="k">Actual</div><div class="v">${formatValue(v.actual, v.unit)} ${v.unit}</div></div>
        <div class="metric-box"><div class="k">Your target</div>${target}</div>
        <div class="metric-box"><div class="k">${v.comparePrior ? "vs last year" : "vs goal"}</div><div class="v" style="color:var(--${s === "ok" ? "ok" : s === "watch" ? "watch" : "bad"})">${gap.text}</div></div>
      </div>
      <div class="peer-chip">${peerOk ? "Ahead of peer" : "Behind peer"} · peer ${formatValue(v.peer, v.unit)} ${v.unit} · click to drill</div>
      <div class="progress"><span class="${s}" style="width:${progressPct(v).toFixed(1)}%"></span></div>
      <div class="chart-wrap card-trend">${cardTrend(v)}</div>
      <div class="chart-legend">
        <span><i class="dot actual"></i>Actual (${v.periodLegend})</span>
        <span><i class="dot goal"></i>Target ${formatValue(v.target, v.unit)} ${v.unit}</span>
        ${v.comparePrior ? `<span><i class="dot prior"></i>Prior year</span>` : ""}
        <span style="margin-left:auto">${directionCopy(v)}</span>
      </div>
    </article>`;
}

function renderCards(list) {
  const grid = document.getElementById("cards");
  const work = document.getElementById("workArea");
  if (work) work.classList.toggle("has-selection", Boolean(state.selectedId));
  if (state.report === "l1-5") {
    const ops = list.filter((m) => processGroup(m) === "ops");
    const prod = list.filter((m) => processGroup(m) === "prod");
    const opsLabel = state.charter === "cu" ? "Operations · COO (includes member onboarding)" : "Operations · COO";
    grid.className = "card-stack";
    grid.innerHTML = `
      <div>
        <h2 class="section">Operations · cost, speed, service</h2>
        <p class="caption">${opsLabel}</p>
        <div class="cards">${ops.map(cardMarkup).join("")}</div>
      </div>
      <div>
        <h2 class="section">Production · sales and business development</h2>
        <p class="caption">${state.charter === "cu"
          ? "CBO owns originations and the consumer funnel. Loan and share growth stay on L1-2. Branch and associate exceptions sit under Needs attention."
          : "CBO owns pipeline and originations. Loan and deposit growth stay on L1-2. Branch and associate exceptions for production and operations sit under Needs attention."}</p>
        <div class="cards">${prod.map(cardMarkup).join("")}</div>
      </div>`;
  } else if (state.report === "l1-4") {
    const core = list.filter((m) => (m.riskGroup || "core") === "core");
    const book = list.filter((m) => m.riskGroup === "book");
    grid.className = "card-stack";
    grid.innerHTML = `
      <div>
        <h2 class="section">Credit, capital, and liquidity</h2>
        <p class="caption">${state.charter === "cu"
          ? "Net worth, delinquency, net charge-offs, MBL, allowance / delinquent, loans-to-shares, IRR, borrowed funds / shares, and BSA. Courtesy-pay aging stays on Past due 30+."
          : "Capital, delinquency, criticized, CRE, ACL, loans-to-assets, IRR, wholesale, and BSA. Overdraft aging stays on Past due 30+."}</p>
        <div class="cards">${core.map(cardMarkup).join("")}</div>
      </div>
      <div>
        <h2 class="section">Book runoff, pricing, and maturities</h2>
        <p class="caption">${state.charter === "cu"
          ? "Member-loan payoffs with ticketing, new vs renewal coupons, and the 180-day maturity wall. Own tiles — not jammed into IRR or Past due."
          : "Pipeline payoffs with ticketing, new vs renewal coupons, and the 180-day maturity wall. Own tiles — not jammed into IRR or Past due."}</p>
        <div class="cards">${book.map(cardMarkup).join("")}</div>
      </div>`;
  } else if (state.report === "l1-6") {
    const workforce = list.filter((m) => peopleGroupOf(m) === "workforce");
    const talent = list.filter((m) => peopleGroupOf(m) === "talent");
    const learning = list.filter((m) => peopleGroupOf(m) === "learning");
    grid.className = "card-stack";
    grid.innerHTML = `
      <div>
        <h2 class="section">Workforce health</h2>
        <p class="caption">Engagement, regretted exits (incl. LATL), and the frontline leak. Role mix is drill 3 — not extra tiles.</p>
        <div class="cards">${workforce.map(cardMarkup).join("")}</div>
      </div>
      <div>
        <h2 class="section">Talent supply</h2>
        <p class="caption">Time-to-fill on examiner-sensitive seats. Offer accept and decline reasons preview on drill 1.</p>
        <div class="cards">${talent.map(cardMarkup).join("")}</div>
      </div>
      <div>
        <h2 class="section">Learning and compliance</h2>
        <p class="caption">Required modules and unified learning paths (succession + credentials). Session mix is drill 3.</p>
        <div class="cards">${learning.map(cardMarkup).join("")}</div>
      </div>`;
  } else {
    grid.className = "cards";
    grid.innerHTML = list.map(cardMarkup).join("");
  }
  grid.querySelectorAll(".card[data-id]").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.target.closest("input, textarea, select, label")) return;
      openDetail(el.dataset.id);
    });
  });
  bindCardEditors(grid);
}

function trendSvg(v) {
  const w = 520, h = 180, padX = 36, padY = 22;
  const ticks = v.series.map((_, i) => (v.labels.length === v.series.length ? v.labels[i] : MONTHS[i] || String(i + 1)));
  const compareLine = v.comparePrior ? v.prior : v.peerSeries;
  const all = [...v.series, ...compareLine, v.target];
  const min = Math.min(...all), max = Math.max(...all);
  const span = max - min || 1;
  const pad = span * 0.12;
  const lo = min - pad, hi = max + pad;
  const denom = Math.max(1, ticks.length - 1);
  const x = (i) => padX + (i / denom) * (w - padX * 2);
  const y = (n) => h - padY - ((n - lo) / (hi - lo)) * (h - padY * 2);
  const line = (arr) => arr.map((n, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(n).toFixed(1)}`).join(" ");
  const ty = y(v.target);
  const font = ticks.length > 8 ? 9 : 11;
  const labels = ticks.map((m, i) =>
    `<text x="${x(i).toFixed(1)}" y="${h - 4}" text-anchor="middle" fill="#9aa3b2" font-size="${font}">${m}</text>`
  ).join("");
  return `<svg viewBox="0 0 ${w} ${h}" style="height:180px">
    <line x1="${padX}" y1="${ty.toFixed(1)}" x2="${w - padX}" y2="${ty.toFixed(1)}" stroke="#f07178" stroke-width="1.8" stroke-dasharray="5 4" />
    <text x="${w - padX}" y="${(ty - 6).toFixed(1)}" text-anchor="end" fill="#f07178" font-size="11">Target ${formatValue(v.target, v.unit)}</text>
    <path d="${line(compareLine)}" fill="none" stroke="${v.comparePrior ? "#9aa3b2" : "#f5b942"}" stroke-width="2.2" />
    <path d="${line(v.series)}" fill="none" stroke="#6eb6ff" stroke-width="2.6" />
    ${v.series.map((n, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(n).toFixed(1)}" r="3.2" fill="#6eb6ff"></circle>`).join("")}
    ${labels}
  </svg>
  <div class="chart-legend">
    <span><i class="dot actual"></i>Actual (${v.periodLegend})</span>
    <span><i class="dot goal"></i>Target</span>
    <span><i class="dot ${v.comparePrior ? "prior" : "peer"}"></i>${v.comparePrior ? "Prior year" : "Peer " + (state.peerStat === "average" ? "average" : "median")}</span>
  </div>`;
}

function peerRows(v) {
  const names = activeRoster();
  const spread = Math.abs(v.peer) * 0.08 + 0.02;
  const rows = names.map((name, i) => {
    const t = names.length <= 1 ? 0 : (i / (names.length - 1)) * 2 - 1;
    return { name, value: Number((v.peer + spread * t).toFixed(2)), ours: false };
  });
  rows.push({ name: state.charter === "cu" ? "Riverbend CU (us)" : "Riverbend Bank (us)", value: v.actual, ours: true });
  rows.sort((a, b) => v.direction === "lower" ? a.value - b.value : b.value - a.value);
  return rows;
}

function setPeerStat(next) {
  state.peerStat = next === "average" ? "average" : "median";
  render();
}

function removeNamedPeer(name) {
  const key = state.charter === "cu" ? "peerRosterCu" : "peerRosterBank";
  if (state[key].length <= 2) return;
  state[key] = state[key].filter((n) => n !== name);
  render();
}

function addNamedPeer(name) {
  if (!name) return;
  const roster = activeRoster();
  if (roster.includes(name)) return;
  roster.push(name);
  render();
}

function bindPeerControls() {
  const body = document.getElementById("drillBody");
  if (!body) return;
  body.querySelectorAll("[data-peer-stat]").forEach((b) => {
    b.addEventListener("click", () => setPeerStat(b.dataset.peerStat));
  });
  body.querySelectorAll("[data-peer-remove]").forEach((b) => {
    b.addEventListener("click", () => removeNamedPeer(b.dataset.peerRemove));
  });
  const addBtn = body.querySelector("[data-peer-add]");
  const sel = body.querySelector("#peerAddSel");
  if (addBtn && sel) {
    addBtn.addEventListener("click", () => addNamedPeer(sel.value));
  }
}

function renderDrillBody(m, v) {
  const body = document.getElementById("drillBody");
  const level = state.drillLevel === 2 || state.drillLevel === 3 ? state.drillLevel : 1;
  if (level === 1) {
    const tri = triangulationOf(v);
    const tt = targetTypeOf(v);
    body.innerHTML = `<div class="detail-grid">
      <div>
        <p class="target-type"><span class="type-chip">${tt.label}</span> ${tt.detail} · ${directionCopy(v)}</p>
        <p class="lede verdict">${tri.story}</p>
        ${compactDeltaRow(tri)}
        <p class="close-gap"><span class="k">Close the gap</span>${closeTheGapLine(v)}</p>
        ${leadingSignalsHtml(m)}
        <p class="hint">${nextDrillHint(v)}</p>
        <p class="caption">This drill uses ${v.periodLegend}. Target is primary · peer is context. Owner: ${v.owner}.</p>
      </div>
    </div>`;
  } else if (level === 2) {
    const rows = peerRows(v);
    const pool = availablePeerPool();
    const canRemove = activeRoster().length > 2;
    const addOpts = pool.map((n) => `<option value="${n}">${n}</option>`).join("");
    body.innerHTML = `<div class="detail-grid">
      <div class="chart-wrap drill-chart" style="padding:12px">${trendSvg(v)}</div>
      <div>
        <h2 class="section">Named peers (sample)</h2>
        <div class="peer-controls">
          <div class="period-picks" role="group" aria-label="Peer statistic">
            <button class="tab ${state.peerStat === "median" ? "active" : ""}" type="button" data-peer-stat="median" aria-pressed="${state.peerStat === "median"}">Median (default)</button>
            <button class="tab ${state.peerStat === "average" ? "active" : ""}" type="button" data-peer-stat="average" aria-pressed="${state.peerStat === "average"}">Average</button>
          </div>
        </div>
        <table>
          <thead><tr><th>Institution</th><th>${v.metric}</th><th></th></tr></thead>
          <tbody>${rows.map((r) => `<tr class="${r.ours ? "ours" : ""}"><td>${r.name}</td><td>${formatValue(r.value, v.unit)} ${v.unit}</td><td>${r.ours ? "" : `<button class="ghost peer-remove" type="button" data-peer-remove="${r.name}" ${canRemove ? "" : "disabled"}>Remove</button>`}</td></tr>`).join("")}</tbody>
        </table>
        ${pool.length ? `<div class="peer-add"><label for="peerAddSel">Add peer</label><select id="peerAddSel">${addOpts}</select><button class="tab" type="button" data-peer-add>Add</button></div>` : ""}
        <p class="caption">${v.peerSource}. Ranked ${v.direction === "lower" ? "low to high" : "high to low"}. Target stays primary. Session only — refresh restores the sample four.</p>
      </div>
    </div>`;
    bindPeerControls();
  } else {
    body.innerHTML = `<div class="detail-grid">
      <div>
        <h2 class="section">Why it moved</h2>
        <ul class="driver-list">
          ${driversOf(m).map((d) => `<li><div class="d-title">${d.title}</div><div class="d-meta">${d.meta}</div></li>`).join("")}
        </ul>
      </div>
      <div>
        <h2 class="section">Named action</h2>
        <div class="gap-card action-card">
          <div class="k">What we are doing</div>
          <div class="v">${actionOf(m).what}</div>
          <div class="caption">Owner: ${actionOf(m).owner} · Due: ${actionOf(m).due}</div>
        </div>
        <p class="hint">Board conversation stops here — no fourth drill.</p>
      </div>
    </div>${odAgingHtml(m)}${drillTableHtml(m)}${whereTableHtml(m, v)}`;
  }
}

function drillTableOf(m) {
  const side = charterSide(m);
  return side && side.drillTable && Array.isArray(side.drillTable.rows) ? side.drillTable : null;
}

function drillTableHtml(m) {
  const pack = drillTableOf(m);
  if (!pack) return "";
  const heads = (pack.columns || []).map((c) => `<th>${c}</th>`).join("");
  const rows = pack.rows.map((r) => {
    const cells = (r.cells || []).map((c) => `<td>${c}</td>`).join("");
    const badge = r.status ? `<td><span class="badge ${r.status}">${statusLabel(r.status)}</span></td>` : "<td>—</td>";
    return `<tr class="${r.status || ""}">${cells}${badge}</tr>`;
  }).join("");
  return `<div class="where-block">
    <h2 class="section">${pack.title}</h2>
    <table>
      <thead><tr>${heads}<th>Status</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="caption">${pack.caption || ""}</p>
  </div>`;
}

function odAgingOf(m) {
  if (state.report !== "l1-4" || !m || m.id !== "past_due") return null;
  const side = charterSide(m);
  return side && side.odAging ? side.odAging : null;
}

function odAgingHtml(m) {
  const pack = odAgingOf(m);
  if (!pack || !Array.isArray(pack.buckets)) return "";
  const shareHead = pack.shareHeader || "Share";
  const rows = pack.buckets.map((b) =>
    `<tr class="${b.status}"><td>${b.band}</td><td>${b.share}%</td><td>${b.dollars}</td><td><span class="badge ${b.status}">${statusLabel(b.status)}</span></td></tr>`
  ).join("");
  return `<div class="where-block">
    <h2 class="section">${pack.title}</h2>
    <table>
      <thead><tr><th>Days</th><th>${shareHead}</th><th>Balance</th><th>Status</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="caption">${pack.caption}</p>
  </div>`;
}

function whereTableHtml(m, v) {
  const grain = whereGrainOf(m.id);
  if (!grain) return "";
  const unit = grain.unit || v.unit;
  const rows = grain.branches.map((b) =>
    `<tr class="${b.status}"><td>${b.name}</td><td>${formatValue(b.value, unit)} ${unit}</td><td><span class="badge ${b.status}">${statusLabel(b.status)}</span></td></tr>`
  ).join("");
  const people = grainAssociates(grain);
  const peopleRows = people.map((a) =>
    `<tr class="${a.status || ""}"><td>${a.name}</td><td>${formatValue(a.value, unit)} ${unit}</td><td>${a.coach}</td><td>${a.status ? `<span class="badge ${a.status}">${statusLabel(a.status)}</span>` : "—"}</td></tr>`
  ).join("");
  return `<div class="where-block">
    <h2 class="section">Where it is · sample L2 grain</h2>
    <table>
      <thead><tr><th>Branch</th><th>${v.metric}</th><th>Status</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <h2 class="section" style="margin-top:12px">Associates to coach</h2>
    <table>
      <thead><tr><th>Associate</th><th>${v.metric}</th><th>Coach</th><th>Status</th></tr></thead>
      <tbody>${peopleRows}</tbody>
    </table>
    <p class="caption">Exception branches and 1–2 associates for the named action. Sample L2 grain — not a seventh L1 report or a full roster.</p>
  </div>`;
}

function renderDetail() {
  const empty = document.getElementById("drillEmpty");
  const active = document.getElementById("drillActive");
  const m = METRICS.find((x) => x.id === state.selectedId);
  if (!m) {
    if (empty) empty.hidden = false;
    if (active) active.hidden = true;
    return;
  }
  if (empty) empty.hidden = true;
  if (active) active.hidden = false;
  const v = viewOf(m);
  const s = statusOf(v);
  document.getElementById("detailTitle").textContent = v.metric + " · " + v.objective;
  document.getElementById("drillBadge").className = "badge " + s;
  document.getElementById("drillBadge").textContent = statusLabel(s);
  document.querySelectorAll(".level-btn").forEach((b) => b.classList.toggle("active", Number(b.dataset.level) === state.drillLevel));
  renderDrillBody(m, v);
}

function openDetail(id, level) {
  state.selectedId = id;
  state.drillLevel = level === 2 || level === 3 ? level : 1;
  render();
}

function render() {
  const list = metricsForReport();
  renderChrome();
  if (state.mode === "defs" || state.mode === "add") {
    applySessionVisibility();
    return;
  }
  applySessionVisibility();
  renderBriefing(list);
  renderEnterpriseGlance(list);
  renderMap();
  renderCards(list);
  renderDetail();
}

function boot(reportId, charter) {
  state.period = DEFAULT_PERIOD;
  if (charter === "cu" || charter === "bank") {
    state.charter = charter;
    state.charterLocked = true;
    document.body.classList.add("charter-locked");
    document.body.dataset.charter = charter;
    document.querySelectorAll(".charter").forEach((el) => { el.hidden = true; });
  }
  const fromHash = (window.location.hash || "").replace("#", "");
  state.report = REPORTS[fromHash] ? fromHash : reportId;
  const start = REPORTS[state.report];
  if (start) {
    document.title = "Riverbend | " + reportDisplayName(start);
    const h1 = document.getElementById("reportTitle");
    if (h1) h1.textContent = reportDisplayName(start);
  }
  document.querySelectorAll(".charter button").forEach((b) => {
    if (state.charterLocked) return;
    b.addEventListener("click", () => { state.charter = b.dataset.charter; render(); });
  });
  document.querySelectorAll(".mode-btn[data-mode]").forEach((b) => {
    b.addEventListener("click", () => setMode(b.dataset.mode));
  });
  document.querySelectorAll(".period-picks .tab").forEach((b) => {
    b.addEventListener("click", () => {
      state.period = b.dataset.period;
      render();
    });
  });
  document.querySelectorAll(".level-btn").forEach((b) => {
    b.addEventListener("click", () => {
      const n = Number(b.dataset.level);
      state.drillLevel = n === 2 || n === 3 ? n : 1;
      render();
    });
  });
  document.getElementById("closeDetail").addEventListener("click", () => { state.selectedId = null; render(); });
  bindNav();
  render();
}
