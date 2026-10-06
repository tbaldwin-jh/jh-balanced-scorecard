/* L1 JHConnect suite engine — copy of l1/l1_shared.js with tiles limited to metrics Jack Henry can inform (see .cursor/plans/jh_l1_data_coverage_e6f2a73c.plan.md). */
const JH_CANNOT_INFORM = new Set(["csi", "irr", "bsa", "engagement", "ttf", "training", "succession", "skill_board"]);
/* L1 suite engine — sample data bound to Phase 1 Riverbend objectives. */
const MONTHS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const BANK_PEERS = ["Lakeshore Community", "Northridge State", "Twin Ports National", "Harbor Trust"];
const CU_PEERS = ["North Shore CU", "Harborlight FCU", "Lakeside Members CU", "Pioneer Community CU"];

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
    file: "l1_1_enterprise_strategy_JHConnect.html",
    name: "Enterprise Strategy Scorecard",
    owner: "ELT (CEO chairs)",
    decision: "Are we executing the plan as a leadership team, and which objective needs a course correction this period?",
    home: true
  },
  "l1-2": {
    file: "l1_2_financial_JHConnect.html",
    name: "Financial Performance and Earnings",
    owner: "CFO",
    decision: "Is growth producing acceptable, sustainable returns — and where do we reprice, cut, or invest?"
  },
  "l1-3": {
    file: "l1_3_franchise_JHConnect.html",
    name: "Customer / Member Franchise",
    owner: "CMO (franchise, not marketing-only)",
    decision: "Franchise value — growth, engagement, and depth — not a marketing-mix score. Are we deepening the relationships that fund the institution, or buying volume?"
  },
  "l1-4": {
    file: "l1_4_risk_capital_JHConnect.html",
    name: "Balance Sheet, Risk and Capital",
    owner: "CRO",
    decision: "Is risk accumulating faster than capital, liquidity, and controls can absorb?"
  },
  "l1-5": {
    file: "l1_5_process_JHConnect.html",
    name: "Process, Service and Production",
    owner: "COO / CBO",
    decision: "Can operations run the book at acceptable cost and speed — and is production converting the plan?"
  },
  "l1-6": {
    file: "l1_6_people_JHConnect.html",
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
    bank: { metric: "ROE", objective: "Deliver competitive shareholder return", target: 12.0, peer: 11.2, series: [10.4, 10.8, 11.1, 11.3, 11.5, 11.6], prior: [9.8, 10.1, 10.4, 10.6, 10.8, 11.0] },
    cu: { metric: "Net worth growth", objective: "Retain earnings to grow net worth", target: 8.0, peer: 6.5, series: [6.2, 6.5, 6.8, 7.0, 7.2, 7.4], prior: [5.8, 6.0, 6.2, 6.4, 6.5, 6.6] },
    drivers: [{ title: "Net income", meta: "Earnings engine" }, { title: "Capital actions", meta: "Bank: no buyback this year" }],
    action: { what: "Hold dividend / patronage inside the capital plan", owner: "CFO", due: "Q4 2026" } },
  { id: "nim", reports: ["l1-2"], perspective: "Financial", map: "l1-2", unit: "%", direction: "higher", owner: "CFO / ALM",
    bank: { metric: "NIM", objective: "Hold spread quality", target: 3.50, peer: 3.35, series: [3.28, 3.30, 3.32, 3.34, 3.36, 3.42], prior: [3.40, 3.38, 3.36, 3.34, 3.33, 3.32] },
    cu: { metric: "NIM", objective: "Hold spread while returning member value", target: 3.50, peer: 3.69, series: [3.40, 3.42, 3.44, 3.46, 3.48, 3.49], prior: [3.52, 3.50, 3.48, 3.47, 3.46, 3.45] },
    drivers: [{ title: "Cost of funds", meta: "Deposit specials lifting COF" }, { title: "Loan yields", meta: "New-money yield vs book" }],
    action: { what: "Reprice specials; protect core DDA", owner: "Treasurer", due: "Oct 2026" } },
  { id: "efficiency", reports: ["l1-1", "l1-2"], perspective: "Financial", map: "l1-2", unit: "%", direction: "lower", owner: "CFO / COO",
    bank: { metric: "Efficiency", objective: "Operate at 52% efficiency or better", target: 52, peer: 63.2, series: [58.4, 57.6, 56.8, 56.1, 55.4, 54.8], prior: [60.1, 59.4, 58.8, 58.2, 57.6, 57.0] },
    cu: { metric: "Efficiency", objective: "Hold CU-peer efficiency, not a bank curve", target: 79, peer: 79.1, series: [82.0, 81.4, 80.9, 80.4, 80.0, 79.6], prior: [83.2, 82.6, 82.0, 81.5, 81.0, 80.6] },
    drivers: [{ title: "Noninterest expense", meta: "Staff and tech run-rate" }, { title: "Revenue", meta: "NII + fees in the denominator" }],
    action: { what: "Hold OpEx flat through year-end", owner: "COO", due: "Dec 2026" } },
  { id: "noi", reports: ["l1-2"], perspective: "Financial", map: "l1-2", unit: "$MM", direction: "higher", owner: "CFO",
    bank: { metric: "NOI vs budget", objective: "Hit the $19MM operating plan", target: 19.0, peer: 17.8, series: [15.2, 16.1, 16.8, 17.4, 18.1, 18.6], prior: [14.0, 14.6, 15.2, 15.8, 16.2, 16.4] },
    cu: { metric: "NOI vs budget", objective: "Fund member value and capital build", target: 12.5, peer: 11.2, series: [10.1, 10.6, 11.0, 11.4, 11.7, 12.0], prior: [9.4, 9.8, 10.1, 10.4, 10.6, 10.8] },
    drivers: [{ title: "Commercial yields", meta: "Capstone earnings engine" }, { title: "OpEx", meta: "Tied to efficiency" }],
    action: { what: "Recover $0.4MM to plan from commercial yields", owner: "CFO", due: "Q4 2026" } },
  { id: "loan_growth", reports: ["l1-1", "l1-2"], perspective: "Financial", map: "l1-2", unit: "%", direction: "higher", owner: "Chief Credit",
    bank: { metric: "Loan growth", objective: "Grow earning assets with credit discipline", target: 7.0, peer: 5.4, series: [4.8, 5.2, 5.6, 6.0, 6.3, 6.6], prior: [4.2, 4.5, 4.8, 5.0, 5.2, 5.3] },
    cu: { metric: "Loan growth", objective: "Grow the loan book inside MBL and credit limits", target: 6.0, peer: 5.0, series: [4.2, 4.5, 4.8, 5.1, 5.3, 5.5], prior: [3.8, 4.0, 4.2, 4.4, 4.5, 4.6] },
    drivers: [{ title: "Commercial pipeline", meta: "Conversion is the constraint" }, { title: "Past due", meta: "Quality gate on growth" }],
    action: { what: "Convert pipeline without lifting the past-due limit", owner: "Chief Credit", due: "Sep 2026" } },
  { id: "dep_growth", reports: ["l1-2"], perspective: "Financial", map: "l1-2", unit: "%", direction: "higher", owner: "Treasurer",
    bank: { metric: "Deposit growth", objective: "Grow the funding book", target: 6.0, peer: 4.2, series: [3.8, 4.1, 4.5, 4.8, 5.2, 5.5], prior: [3.4, 3.6, 3.8, 4.0, 4.1, 4.2] },
    cu: { metric: "Share growth", objective: "Grow member shares", target: 5.5, peer: 4.0, series: [3.4, 3.7, 4.0, 4.3, 4.6, 4.9], prior: [3.1, 3.3, 3.5, 3.6, 3.7, 3.8] },
    drivers: [{ title: "Core DDA / shares", meta: "Stickiness over specials" }, { title: "Outflows by tier", meta: "Watch rate-sensitive money" }],
    action: { what: "Add core balances; no wholesale substitution", owner: "Treasurer", due: "Dec 2026" } },
  { id: "fee_mix", reports: ["l1-2"], perspective: "Financial", map: "l1-2", unit: "%", direction: "higher", owner: "CFO",
    bank: { metric: "Noninterest income mix", objective: "Diversify off the spread", target: 22, peer: 24, series: [18.2, 18.6, 19.0, 19.4, 19.8, 20.1], prior: [17.8, 18.0, 18.2, 18.4, 18.6, 18.8] },
    cu: { metric: "Noninterest income mix", objective: "Fees consistent with member value", target: 16, peer: 15, series: [13.4, 13.7, 14.0, 14.2, 14.5, 14.7], prior: [13.0, 13.2, 13.4, 13.5, 13.6, 13.7] },
    drivers: [{ title: "Treasury / card / wealth", meta: "Bank fee engines" }, { title: "Member pricing", meta: "CU: do not maximize fees" }],
    action: { what: "Close 1–2 pts of fee mix without junk-fee risk", owner: "CFO", due: "Q4 2026" } },

  { id: "csi", reports: ["l1-1", "l1-3"], perspective: "Customer", map: "l1-3", unit: "score", direction: "higher", owner: "CMO",
    bank: { metric: "CSI / NPS", objective: "Keep CSI above the Capstone floor", target: 7.2, peer: 7.0, series: [6.8, 6.9, 7.0, 7.05, 7.08, 7.10], prior: [6.6, 6.7, 6.8, 6.85, 6.9, 6.95] },
    cu: { metric: "NPS", objective: "Hold member NPS above 70", target: 70, peer: 68, series: [64, 65, 66, 67, 68, 69], prior: [62, 63, 64, 65, 66, 66] },
    drivers: [{ title: "Loan decision time", meta: "Top CSI complaint theme" }, { title: "Account opening", meta: "Branch SLA" }],
    action: { what: "Cut commercial cycle time to lift CSI", owner: "CMO / COO", due: "Sep 2026" } },
  { id: "retention", reports: ["l1-1", "l1-3"], perspective: "Customer", map: "l1-3", unit: "%", direction: "higher", owner: "CMO",
    bank: { metric: "Retention", objective: "Hold household retention at 92%", target: 92, peer: 90, series: [90.2, 90.5, 90.8, 91.0, 91.2, 91.4], prior: [89.6, 89.8, 90.0, 90.2, 90.3, 90.4] },
    cu: { metric: "Retention", objective: "Hold member retention at 93%", target: 93, peer: 91, series: [91.4, 91.6, 91.8, 92.0, 92.1, 92.3], prior: [90.8, 91.0, 91.2, 91.3, 91.4, 91.5] },
    drivers: [{ title: "7-year CIF attrition", meta: "Long relationships leaving" }, { title: "Rate shoppers", meta: "Specials not stickiness" }],
    action: { what: "Outreach on households with one product only", owner: "CMO", due: "Oct 2026" } },
  { id: "hh_growth", reports: ["l1-3"], perspective: "Customer", map: "l1-3", unit: "%", direction: "higher", owner: "CMO",
    bank: { metric: "Customer growth", objective: "Grow households, not account records", target: 4.0, peer: 2.8, series: [2.4, 2.6, 2.8, 3.0, 3.2, 3.4], prior: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6] },
    cu: { metric: "Member growth", objective: "Grow net members inside FOM", target: 3.5, peer: 2.5, series: [2.1, 2.3, 2.5, 2.7, 2.8, 3.0], prior: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3] },
    drivers: [{ title: "Net new CIF / members", meta: "Adds minus closes" }, { title: "FOM / market", meta: "CU field-of-membership" }],
    action: { what: "Add primary relationships, not CD specials", owner: "CMO", due: "Dec 2026" } },
  { id: "core_mix", reports: ["l1-1", "l1-3"], perspective: "Customer", map: "l1-3", unit: "%", direction: "higher", owner: "Treasurer",
    bank: { metric: "Core funding mix", objective: "Improve funding stickiness", target: 78, peer: 74, series: [73.2, 73.6, 74.0, 74.4, 74.8, 75.2], prior: [72.0, 72.4, 72.8, 73.0, 73.2, 73.4] },
    cu: { metric: "Core share mix", objective: "Grow sticky member shares", target: 80, peer: 77, series: [75.0, 75.4, 75.8, 76.2, 76.6, 77.0], prior: [74.2, 74.5, 74.8, 75.0, 75.2, 75.4] },
    drivers: [{ title: "DDA + savings + MMDA", meta: "Core definition locked" }, { title: "Brokered / specials", meta: "Pulls mix down" }],
    action: { what: "Shift 200 bps into core before year-end", owner: "Treasurer", due: "Dec 2026" } },
  { id: "depth", reports: ["l1-3"], perspective: "Customer", map: "l1-3", unit: "n", direction: "higher", owner: "CMO",
    bank: { metric: "Products per household", objective: "Deepen the household franchise", target: 3.10, peer: 2.85, series: [2.72, 2.76, 2.80, 2.84, 2.88, 2.92], prior: [2.64, 2.66, 2.68, 2.70, 2.72, 2.74] },
    cu: { metric: "AMR", objective: "Deepen average member relationship", target: 18.5, peer: 16.8, series: [16.2, 16.5, 16.8, 17.1, 17.3, 17.6], prior: [15.4, 15.6, 15.8, 16.0, 16.1, 16.2] },
    drivers: [{ title: "Cross-sell conversion", meta: "Second product attach" }, { title: "Primary-FI share", meta: "Loan + deposit in same CIF" }],
    action: { what: "Campaign households with deposits only", owner: "CMO", due: "Nov 2026" } },
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
    bank: { metric: "CAC", objective: "Acquire without buying volume", target: 285, peer: 310, series: [340, 330, 322, 314, 308, 302], prior: [350, 345, 340, 336, 332, 328] },
    cu: { metric: "CAC", objective: "Keep member acquisition cost inside plan", target: 240, peer: 260, series: [278, 270, 264, 258, 254, 250], prior: [286, 280, 274, 270, 266, 262] },
    drivers: [{ title: "Paid media", meta: "Cost per funded household" }, { title: "Branch vs digital mix", meta: "Digital cheaper" }],
    action: { what: "Shift 15% of acquisition spend to digital", owner: "CMO", due: "Oct 2026" } },

  { id: "capital", reports: ["l1-1", "l1-4"], perspective: "Risk", map: "l1-4", unit: "%", direction: "higher", owner: "CFO",
    bank: { metric: "Tier 1 leverage", objective: "Stay well capitalized", target: 9.5, peer: 9.8, series: [9.10, 9.14, 9.18, 9.22, 9.26, 9.30], prior: [8.90, 8.95, 9.00, 9.04, 9.08, 9.10] },
    cu: { metric: "Net worth ratio", objective: "Hold well-capitalized net worth", target: 10.5, peer: 10.8, series: [10.10, 10.16, 10.22, 10.28, 10.32, 10.36], prior: [9.90, 9.96, 10.00, 10.04, 10.08, 10.10] },
    drivers: [{ title: "Retained earnings", meta: "ROA is the fuel" }, { title: "Asset growth", meta: "Dilutes the ratio" }],
    action: { what: "Keep the capital floor inside the growth plan", owner: "CFO", due: "monthly ALCO" } },
  { id: "past_due", reports: ["l1-1", "l1-4"], perspective: "Risk", map: "l1-4", unit: "%", direction: "lower", owner: "CRO",
    bank: { metric: "Past due 30+", objective: "Keep credit inside appetite", target: 1.10, peer: 1.05, series: [1.02, 1.06, 1.10, 1.14, 1.16, 1.18], prior: [0.92, 0.94, 0.96, 0.98, 0.99, 1.00] },
    cu: { metric: "Past due 30+", objective: "Hold consumer delinquency inside limit", target: 0.90, peer: 0.85, series: [0.78, 0.82, 0.86, 0.88, 0.90, 0.93], prior: [0.70, 0.72, 0.74, 0.76, 0.77, 0.78] },
    drivers: [{ title: "30/60/90 mix", meta: "Watch 60+ migration" }, { title: "Consumer auto / card", meta: "CU lead book" }],
    action: { what: "Tighten early-stage collections on 30–59", owner: "Chief Credit", due: "Sep 2026" } },
  { id: "criticized", reports: ["l1-4"], perspective: "Risk", map: "l1-4", unit: "%", direction: "lower", owner: "Chief Credit",
    bank: { metric: "Criticized assets", objective: "Surface problem credits early", target: 4.0, peer: 3.6, series: [3.4, 3.5, 3.6, 3.7, 3.8, 3.9], prior: [3.1, 3.2, 3.2, 3.3, 3.3, 3.4] },
    cu: { metric: "Criticized assets", objective: "Keep classified / criticized inside limit", target: 3.5, peer: 3.2, series: [2.9, 3.0, 3.1, 3.2, 3.25, 3.30], prior: [2.7, 2.75, 2.8, 2.85, 2.9, 2.95] },
    drivers: [{ title: "Special mention inflows", meta: "Label criticized vs classified" }, { title: "CRE watchlist", meta: "Bank concentration" }],
    action: { what: "Work the SM list before it rolls to substandard", owner: "Chief Credit", due: "Oct 2026" } },
  { id: "acl", reports: ["l1-4"], perspective: "Risk", map: "l1-4", unit: "x", direction: "higher", owner: "CFO / Credit",
    bank: { metric: "ACL coverage", objective: "Cover expected loss", target: 1.25, peer: 1.18, series: [1.20, 1.21, 1.22, 1.22, 1.23, 1.23], prior: [1.16, 1.17, 1.17, 1.18, 1.18, 1.19] },
    cu: { metric: "ACL coverage", objective: "Hold CECL coverage vs NPL", target: 1.20, peer: 1.15, series: [1.14, 1.15, 1.16, 1.16, 1.17, 1.17], prior: [1.10, 1.11, 1.12, 1.12, 1.13, 1.13] },
    drivers: [{ title: "NPL stock", meta: "Denominator" }, { title: "Provision", meta: "Earnings echo on L1-2" }],
    action: { what: "Refresh CECL qualitative overlay", owner: "CFO", due: "Q3 close" } },
  { id: "ltd", reports: ["l1-4"], perspective: "Risk", map: "l1-4", unit: "%", direction: "band", owner: "Treasurer",
    bank: { metric: "LTD", objective: "Run utilization in the 80–90 band", target: 86, peer: 84, series: [88.4, 88.8, 89.1, 89.4, 89.6, 89.8], prior: [86.0, 86.4, 86.8, 87.0, 87.2, 87.4], band: [80, 90] },
    cu: { metric: "LTS", objective: "Run utilization in the 75–88 band", target: 82, peer: 80, series: [84.0, 84.4, 84.8, 85.0, 85.2, 85.4], prior: [81.5, 81.8, 82.0, 82.2, 82.4, 82.6], band: [75, 88] },
    drivers: [{ title: "Loan growth vs deposits", meta: "Both moving" }, { title: "Wholesale", meta: "Fills the gap" }],
    action: { what: "Bring LTD/LTS back inside the band via core funding", owner: "Treasurer", due: "Nov 2026" } },
  { id: "irr", reports: ["l1-4"], perspective: "Risk", map: "l1-4", unit: "%", direction: "higher", owner: "Treasurer",
    bank: { metric: "IRR NII +200 bp", objective: "Stay inside the −8% NII floor", target: -6.0, peer: -7.0, series: [-7.4, -7.2, -7.1, -7.0, -6.9, -6.8], prior: [-6.4, -6.5, -6.6, -6.7, -6.7, -6.8] },
    cu: { metric: "IRR NII +200 bp", objective: "Stay inside the −8% NII floor", target: -5.5, peer: -6.5, series: [-6.6, -6.5, -6.4, -6.3, -6.2, -6.1], prior: [-5.8, -5.9, -6.0, -6.0, -6.1, -6.1] },
    drivers: [{ title: "Duration of funding", meta: "Specials shortening" }, { title: "Loan coupons", meta: "Fixed vs floating mix" }],
    action: { what: "Stay inside the −8% NII floor", owner: "ALCO", due: "monthly" } },
  { id: "wholesale", reports: ["l1-4"], perspective: "Risk", map: "l1-4", unit: "%", direction: "lower", owner: "Treasurer",
    bank: { metric: "Wholesale reliance", objective: "Limit wholesale funding", target: 12, peer: 14, series: [13.8, 13.6, 13.4, 13.2, 13.1, 13.0], prior: [12.4, 12.6, 12.8, 12.9, 13.0, 13.1] },
    cu: { metric: "Wholesale reliance", objective: "Limit borrowed funds", target: 10, peer: 11, series: [11.4, 11.2, 11.0, 10.9, 10.8, 10.7], prior: [10.2, 10.3, 10.4, 10.5, 10.5, 10.6] },
    drivers: [{ title: "FHLB / brokers", meta: "Fills LTD gap" }, { title: "Core mix", meta: "L1-3 leading indicator" }],
    action: { what: "Replace $15MM wholesale with core", owner: "Treasurer", due: "Dec 2026" } },
  { id: "bsa", reports: ["l1-4"], perspective: "Risk", map: "l1-4", unit: "days", direction: "lower", owner: "BSA Officer",
    bank: { metric: "BSA aging", objective: "Close alerts inside SLA", target: 18, peer: 16, series: [22, 21, 21, 20, 20, 19.5], prior: [18, 18, 19, 19, 19, 20] },
    cu: { metric: "BSA aging", objective: "Close alerts inside SLA", target: 16, peer: 15, series: [19, 18.5, 18, 17.6, 17.2, 17.0], prior: [16, 16, 16.5, 16.5, 17, 17] },
    drivers: [{ title: "Aged >30 share", meta: "Exam talking point" }, { title: "Staffing", meta: "Time-to-fill on L1-6" }],
    action: { what: "Clear the >30-day bucket", owner: "BSA Officer", due: "Sep 2026" } },

  { id: "cycle", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "ops", unit: "days", direction: "lower", owner: "COO / Lending",
    bank: { metric: "Decision cycle", objective: "Decide commercial credits inside SLA", target: 45, peer: 52, series: [62, 58, 55, 53, 51, 50], prior: [68, 66, 64, 62, 60, 58] },
    cu: { metric: "Decision cycle", objective: "Decide consumer credits same week", target: 12, peer: 14, series: [16, 15, 14.5, 14, 13.6, 13.2], prior: [18, 17, 16.5, 16, 15.5, 15] },
    drivers: [{ title: "Credit memo queue", meta: "Officer capacity" }, { title: "Exceptions", meta: "STP rate" }],
    action: { what: "Cut median cycle to 45 days", owner: "COO", due: "Sep 2026" } },
  { id: "funnel", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "prod", unit: "%", direction: "higher", owner: "CBO",
    bank: { metric: "Funnel conversion", objective: "Convert applications to booked loans", target: 38, peer: 34, series: [30, 31, 32, 33, 33.5, 34.2], prior: [28, 29, 29.5, 30, 30.5, 31] },
    cu: { metric: "Funnel conversion", objective: "Convert applications to booked loans", target: 42, peer: 38, series: [36, 37, 37.5, 38, 38.5, 39], prior: [34, 34.5, 35, 35.5, 36, 36] },
    drivers: [{ title: "Approval rate", meta: "Credit box" }, { title: "Accept rate", meta: "Price / cycle" }],
    action: { what: "Raise conversion 4 pts without loosening the box", owner: "CBO", due: "Oct 2026" } },
  { id: "new_yield", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "prod", unit: "%", direction: "higher", owner: "CBO",
    bank: { metric: "Yield on new originations", objective: "Price new money above the book", target: 6.80, peer: 6.55, series: [6.40, 6.46, 6.50, 6.54, 6.58, 6.62], prior: [6.20, 6.24, 6.28, 6.32, 6.36, 6.38] },
    cu: { metric: "Yield on new originations", objective: "Price new money vs member value", target: 6.40, peer: 6.20, series: [6.05, 6.10, 6.14, 6.18, 6.21, 6.24], prior: [5.90, 5.94, 5.98, 6.00, 6.02, 6.04] },
    drivers: [{ title: "Exception pricing", meta: "Below-grid deals" }, { title: "Mix", meta: "Auto vs commercial" }],
    action: { what: "Cap below-grid exceptions at 10% of volume", owner: "CBO", due: "Sep 2026" } },
  { id: "orig_vol", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "prod", unit: "$MM", direction: "higher", owner: "CBO",
    bank: { metric: "Origination volume", objective: "Keep monthly originations on plan", target: 48, peer: 42, series: [38, 40, 41, 43, 44, 45], prior: [36, 37, 38, 39, 40, 40] },
    cu: { metric: "Origination volume", objective: "Keep monthly originations on plan", target: 22, peer: 19, series: [17, 18, 18.5, 19, 19.5, 20], prior: [16, 16.4, 16.8, 17.0, 17.2, 17.4] },
    drivers: [{ title: "Applications in", meta: "Flow, not stock" }, { title: "Cycle time", meta: "Locks leak if slow" }],
    action: { what: "Restore $3MM monthly volume via cycle time", owner: "CBO", due: "Oct 2026" } },
  { id: "cpt", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "ops", unit: "$", direction: "lower", owner: "COO",
    bank: { metric: "Cost per transaction", objective: "Lower unit servicing cost", target: 2.40, peer: 2.65, series: [2.82, 2.76, 2.70, 2.66, 2.62, 2.58], prior: [2.90, 2.86, 2.82, 2.78, 2.74, 2.70] },
    cu: { metric: "Cost per transaction", objective: "Lower unit servicing cost", target: 2.10, peer: 2.30, series: [2.42, 2.36, 2.32, 2.28, 2.24, 2.22], prior: [2.50, 2.46, 2.42, 2.38, 2.36, 2.34] },
    drivers: [{ title: "Teller vs digital mix", meta: "Self-service is the lever" }, { title: "Exception items", meta: "STP" }],
    action: { what: "Move 5 pts of volume to self-service", owner: "COO", due: "Nov 2026" } },
  { id: "self_svc", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "ops", unit: "%", direction: "higher", owner: "COO",
    bank: { metric: "Digital self-service", objective: "Move work off the lobby", target: 71, peer: 66, series: [62, 63, 64, 65, 66, 67], prior: [58, 59, 60, 61, 62, 63] },
    cu: { metric: "Digital self-service", objective: "Move work off the lobby", target: 68, peer: 64, series: [58, 59, 60, 61, 62, 63], prior: [54, 55, 56, 57, 58, 59] },
    drivers: [{ title: "Deposit / transfer STP", meta: "Ops lens, not franchise adoption" }, { title: "Core availability", meta: "Blocks self-service" }],
    action: { what: "Turn on more deposit STP paths", owner: "COO", due: "Oct 2026" } },
  { id: "pipeline", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "prod", unit: "mixed", direction: "higher", owner: "CBO",
    bank: { metric: "Commercial pipeline", objective: "Convert C&I pipeline", target: 32, peer: 28, series: [24, 25, 26, 27, 27.5, 28], prior: [22, 23, 23.5, 24, 24.5, 25], unit: "%" },
    cu: { metric: "Onboarding cycle", objective: "Same-week member onboarding", target: 1.2, peer: 1.6, series: [2.1, 1.9, 1.8, 1.7, 1.6, 1.55], prior: [2.4, 2.3, 2.2, 2.1, 2.0, 1.95], unit: "days", direction: "lower" },
    drivers: [{ title: "Bank: C&I conversion", meta: "Skill coverage on L1-6" }, { title: "CU: FOM checks", meta: "Onboarding quality" }],
    action: { what: "Bank: lift pipeline conversion. CU: cut onboarding to 1.2 days", owner: "CBO", due: "Oct 2026" } },
  { id: "teller_sla", reports: ["l1-5"], perspective: "Internal Process", map: "l1-5", group: "ops", unit: "min", direction: "lower", owner: "COO",
    bank: { metric: "Teller SLA", objective: "Keep lobby waits under 2 minutes", target: 1.8, peer: 2.1, series: [2.20, 2.12, 2.06, 2.00, 1.96, 1.92], prior: [2.30, 2.24, 2.18, 2.14, 2.10, 2.06] },
    cu: { metric: "Teller SLA", objective: "Keep lobby waits under 2 minutes", target: 1.8, peer: 2.0, series: [2.10, 2.04, 1.98, 1.94, 1.90, 1.88], prior: [2.20, 2.14, 2.10, 2.06, 2.02, 1.98] },
    drivers: [{ title: "Staffing vs traffic", meta: "L2 branch view" }, { title: "Teller turnover", meta: "L1-6" }],
    action: { what: "Align teller schedules to peak traffic", owner: "COO", due: "Sep 2026" } },

  { id: "engagement", reports: ["l1-1", "l1-6"], perspective: "Learning Growth", map: "l1-6", unit: "score", direction: "higher", owner: "CHRO",
    bank: { metric: "Engagement", objective: "Keep Emplify in the Engaged band", target: 74, peer: 70, series: [69, 70, 70.5, 71, 71.5, 72], prior: [67, 67.5, 68, 68.5, 69, 69] },
    cu: { metric: "Engagement", objective: "Keep engagement in the Engaged band", target: 76, peer: 72, series: [71, 72, 72.5, 73, 73.5, 74], prior: [69, 69.5, 70, 70.5, 71, 71] },
    drivers: [{ title: "Participation", meta: "Need ≥80%" }, { title: "Frontline items", meta: "Teller disengagement" }],
    action: { what: "Manager action plans on the bottom-quartile teams", owner: "CHRO", due: "Oct 2026" } },
  { id: "turnover", reports: ["l1-6"], perspective: "Learning Growth", map: "l1-6", unit: "%", direction: "lower", owner: "CHRO",
    bank: { metric: "Voluntary turnover", objective: "Cut regretted exits", target: 11, peer: 13, series: [14.2, 13.8, 13.4, 13.1, 12.8, 12.6], prior: [15.0, 14.6, 14.2, 13.8, 13.6, 13.4] },
    cu: { metric: "Voluntary turnover", objective: "Cut regretted exits", target: 12, peer: 14, series: [15.0, 14.6, 14.2, 13.9, 13.6, 13.4], prior: [15.6, 15.2, 14.8, 14.6, 14.4, 14.2] },
    drivers: [{ title: "Regretted vs total", meta: "Focus regretted" }, { title: "Pay / career path", meta: "Stay interviews" }],
    action: { what: "Stay interviews on examiner-sensitive roles", owner: "CHRO", due: "Sep 2026" } },
  { id: "teller_to", reports: ["l1-6"], perspective: "Learning Growth", map: "l1-6", unit: "%", direction: "lower", owner: "CHRO",
    bank: { metric: "Teller / frontline turnover", objective: "Cut teller turnover toward 20%", target: 20, peer: 28, series: [32, 30, 29, 28, 27, 26], prior: [36, 35, 34, 33, 32, 31] },
    cu: { metric: "Teller / frontline turnover", objective: "Cut frontline turnover toward 18%", target: 18, peer: 24, series: [26, 25, 24, 23.5, 23, 22.5], prior: [28, 27, 26.5, 26, 25.5, 25] },
    drivers: [{ title: "Capstone pain point", meta: "12% actively disengaged" }, { title: "Scheduling", meta: "Tied to teller SLA" }],
    action: { what: "Supervisor training + schedule stability", owner: "CHRO", due: "Nov 2026" } },
  { id: "ttf", reports: ["l1-6"], perspective: "Learning Growth", map: "l1-6", unit: "days", direction: "lower", owner: "CHRO",
    bank: { metric: "Time-to-fill critical roles", objective: "Fill examiner-sensitive seats faster", target: 45, peer: 55, series: [62, 60, 58, 56, 54, 52], prior: [66, 64, 62, 60, 58, 57] },
    cu: { metric: "Time-to-fill critical roles", objective: "Fill examiner-sensitive seats faster", target: 50, peer: 58, series: [64, 62, 60, 58, 57, 56], prior: [68, 66, 64, 62, 61, 60] },
    drivers: [{ title: "BSA / credit / CFO-1", meta: "Named seats" }, { title: "Offer accept", meta: "Comp band" }],
    action: { what: "Open the BSA backup seat this month", owner: "CHRO", due: "Sep 2026" } },
  { id: "training", reports: ["l1-6"], perspective: "Learning Growth", map: "l1-6", unit: "%", direction: "higher", owner: "CHRO",
    bank: { metric: "Required training completion", objective: "Complete required risk/compliance training", target: 98, peer: 95, series: [93, 94, 94.5, 95, 95.5, 96], prior: [91, 92, 92.5, 93, 93.5, 94] },
    cu: { metric: "Required training completion", objective: "Complete required risk/compliance training", target: 98, peer: 96, series: [94, 94.5, 95, 95.5, 96, 96.4], prior: [92, 92.5, 93, 93.5, 94, 94.2] },
    drivers: [{ title: "BSA / info-sec modules", meta: "Exam evidence" }, { title: "New hires", meta: "Lag to complete" }],
    action: { what: "Close the last 2 pts before exam window", owner: "CHRO", due: "Oct 2026" } },
  { id: "succession", reports: ["l1-6"], perspective: "Learning Growth", map: "l1-6", unit: "%", direction: "higher", owner: "CHRO",
    bank: { metric: "Succession coverage", objective: "Cover CEO-1, BSA, credit, CFO", target: 80, peer: 70, series: [60, 62, 64, 66, 68, 70], prior: [55, 56, 58, 58, 60, 60] },
    cu: { metric: "Succession coverage", objective: "Cover CEO-1, BSA, credit, CFO", target: 75, peer: 65, series: [55, 58, 60, 62, 64, 66], prior: [50, 52, 54, 55, 56, 58] },
    drivers: [{ title: "Ready-now vs ready-2yr", meta: "Named backups" }, { title: "Board education", meta: "CU governance" }],
    action: { what: "Name ready-now backups for BSA and credit", owner: "CHRO", due: "Nov 2026" } },
  { id: "skill_board", reports: ["l1-6"], perspective: "Learning Growth", map: "l1-6", unit: "mixed", direction: "higher", owner: "CHRO",
    bank: { metric: "Commercial skill coverage", objective: "Credential the commercial bench", target: 70, peer: 62, series: [54, 56, 58, 60, 61, 63], prior: [50, 51, 52, 53, 54, 55], unit: "%" },
    cu: { metric: "Board education hours", objective: "Meet volunteer board education policy", target: 12, peer: 10, series: [7, 8, 8.5, 9, 9.5, 10], prior: [6, 6.5, 7, 7.5, 8, 8], unit: "hrs" },
    drivers: [{ title: "Bank: C&I credentials", meta: "Feeds pipeline conversion" }, { title: "CU: board hours", meta: "CAMELS M" }],
    action: { what: "Bank: two more lenders credentialed. CU: complete board hours", owner: "CHRO", due: "Dec 2026" } }
];
for (let i = METRICS.length - 1; i >= 0; i--) {
  if (JH_CANNOT_INFORM.has(METRICS[i].id)) METRICS.splice(i, 1);
}

/* Sample L2 grain for coaching — not L1 tiles. Bank / CU sides stay on the same metric ids. */
const WHERE_GRAIN = {
  teller_sla: {
    bank: {
      unit: "min",
      role: "tellers",
      branches: [
        { name: "Oak Street", value: 2.41, status: "bad" },
        { name: "Riverside", value: 2.18, status: "watch" },
        { name: "Downtown", value: 1.94, status: "watch" },
        { name: "Northside", value: 1.62, status: "ok" }
      ],
      associates: [
        { name: "J. Patel · Oak Street teller", value: 2.64, status: "bad", coach: "Branch manager" },
        { name: "T. Nguyen · Riverside teller", value: 2.22, status: "watch", coach: "Branch manager" }
      ]
    },
    cu: {
      unit: "min",
      role: "tellers",
      branches: [
        { name: "Oak Street", value: 2.28, status: "bad" },
        { name: "Riverside", value: 2.06, status: "watch" },
        { name: "Downtown", value: 1.90, status: "watch" },
        { name: "Northside", value: 1.58, status: "ok" }
      ],
      associates: [
        { name: "J. Patel · Oak Street teller", value: 2.50, status: "bad", coach: "Branch manager" },
        { name: "T. Nguyen · Riverside teller", value: 2.12, status: "watch", coach: "Branch manager" }
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
  cpt: {
    bank: {
      unit: "$",
      role: "tellers",
      branches: [
        { name: "Oak Street", value: 2.95, status: "bad" },
        { name: "Riverside", value: 2.70, status: "watch" },
        { name: "Downtown", value: 2.50, status: "watch" },
        { name: "Northside", value: 2.28, status: "ok" }
      ],
      associates: [
        { name: "J. Patel · Oak Street teller", value: 3.10, status: "bad", coach: "Branch manager" },
        { name: "T. Nguyen · Riverside teller", value: 2.72, status: "watch", coach: "Branch manager" }
      ]
    },
    cu: {
      unit: "$",
      role: "tellers",
      branches: [
        { name: "Oak Street", value: 2.55, status: "bad" },
        { name: "Riverside", value: 2.34, status: "watch" },
        { name: "Downtown", value: 2.18, status: "watch" },
        { name: "Northside", value: 2.02, status: "ok" }
      ],
      associates: [
        { name: "J. Patel · Oak Street teller", value: 2.62, status: "bad", coach: "Branch manager" },
        { name: "T. Nguyen · Riverside teller", value: 2.36, status: "watch", coach: "Branch manager" }
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
    cu: { definition: "Earnings that fund net worth — capital-build fuel, not a failed bank ROA target.", formula: "ROA = Net Income / Average Total Assets", source: "5300 / FPR peer median — do not grade vs UBPR" } },
  roe_nwg: { camels: "E",
    bank: { definition: "Shareholder return on equity capital.", formula: "ROE = Net Income / Average Equity Capital", source: "GL / Call Report" },
    cu: { definition: "Growth in retained earnings / net worth — the CU substitute for ROE.", formula: "Net worth growth = (NW_t − NW_t-1) / |NW_t-1|", source: "5300 · retained earnings only" } },
  nim: { camels: "E",
    bank: { definition: "Spread between earning-asset yield and cost of funds.", formula: "NIM = Net Interest Income / Average Earning Assets", source: "GL / ALM · UBPR" },
    cu: { definition: "Spread while returning member value on loans and shares.", formula: "NIM = Net Interest Income / Average Earning Assets", source: "5300 / FPR" } },
  efficiency: { camels: "E",
    bank: { definition: "Cost to produce a dollar of revenue. Lower is better.", formula: "Efficiency = Noninterest Expense / (NII + Noninterest Income)", source: "GL · UBPR efficiency median — bank curve (~52% target)" },
    cu: { definition: "Cost to produce a dollar of revenue on the CU expense structure. Never grade vs bank 52%.", formula: "Efficiency = Noninterest Expense / (NII + Noninterest Income)", source: "GL · FPR efficiency median (~79%)" } },
  noi: { camels: "E",
    bank: { definition: "Operating profit after interest and operating expense, before extraordinary items.", formula: "NOI = NII + Noninterest Income − Noninterest Expense (annualized)", source: "GL · peer median annualized NOI" },
    cu: { definition: "Operating income retained to build net worth and support member value.", formula: "NOI = NII + Noninterest Income − Noninterest Expense (annualized)", source: "GL · CU peer annualized NOI" } },
  loan_growth: { camels: "A",
    bank: { definition: "Year-over-year growth in gross loans held for investment.", formula: "Loan growth = (Loans_t − Loans_t-1) / Loans_t-1", source: "Core / Call Report" },
    cu: { definition: "YoY loan growth inside MBL and credit limits.", formula: "Loan growth = (Loans_t − Loans_t-1) / Loans_t-1", source: "Core / 5300" } },
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
    bank: { definition: "Share of customer relationships that remain open over the period.", formula: "Retention = 1 − (Closed CIF / Beginning CIF)", source: "Core CIF · household retention" },
    cu: { definition: "Share of member-owners who remain on the books.", formula: "Retention = 1 − (Closed members / Beginning members)", source: "Core membership · CU peer retention" } },
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
    cu: { definition: "Net worth adequacy. NCUA well-capitalized ≥7%; many boards target 10%+.", formula: "Net Worth Ratio = Net Worth / Total Assets", source: "5300 / FPR · retained earnings only" } },
  past_due: { camels: "A",
    bank: { definition: "Early asset-quality signal: unpaid balance 30 or more days past due.", formula: "Past Due 30+ = UPB ≥ 30 DPD / Gross Loans", source: "Servicing / core · peer past-due / gross loans" },
    cu: { definition: "Delinquency 30+ as a share of gross loans — often tighter CU peer than banks.", formula: "Past Due 30+ = UPB ≥ 30 DPD / Gross Loans", source: "Servicing / core · CU peer" } },
  criticized: { camels: "A",
    bank: { definition: "Watchlist and classified credits as a share of loans or assets.", formula: "Criticized = (Special mention + Substandard + Doubtful) / Loans", source: "Credit admin / ALLL" },
    cu: { definition: "Classified and criticized assets vs CU policy limit.", formula: "Criticized = (Special mention + Classified) / Loans", source: "Credit admin" } },
  acl: { camels: "A",
    bank: { definition: "Allowance coverage of nonperforming loans (CECL).", formula: "ACL coverage = ACL / Nonperforming loans", source: "CECL / GL" },
    cu: { definition: "Allowance coverage of NPL under CECL.", formula: "ACL coverage = ACL / Nonperforming loans", source: "CECL / 5300" } },
  ltd: { camels: "L",
    bank: { definition: "How much of the deposit base is deployed in loans (liquidity utilization).", formula: "LTD = Total Loans / Total Deposits", source: "Core / Call Report · policy band 80–90%" },
    cu: { definition: "How much of member shares is deployed in loans.", formula: "LTS = Total Loans / Total Shares", source: "Core / 5300 · policy band 75–88%" } },
  irr: { camels: "S",
    bank: { definition: "Sensitivity of net interest income to a parallel +200 bp rate shock.", formula: "IRR NII shock = ΔNII under +200 bp / Base NII  (must stay ≥ ALCO floor −8%)", source: "ALM model · ALCO policy" },
    cu: { definition: "Sensitivity of NII to a +200 bp shock vs ALCO floor; use CU ALM peers, not bank ALM.", formula: "IRR NII shock = ΔNII under +200 bp / Base NII  (must stay ≥ ALCO floor −8%)", source: "ALM model · FPR / CU peer" } },
  wholesale: { camels: "L",
    bank: { definition: "Reliance on FHLB, brokers, and other non-core funding.", formula: "Wholesale = Wholesale liabilities / Total liabilities", source: "Treasury / Call Report" },
    cu: { definition: "Reliance on borrowed funds vs member shares.", formula: "Wholesale = Borrowed funds / Total liabilities", source: "Treasury / 5300" } },
  bsa: { camels: "M",
    bank: { definition: "Average age of open BSA/AML alerts — exam talking point.", formula: "BSA aging = Mean days open for unresolved alerts", source: "AML case system" },
    cu: { definition: "Average age of open BSA/AML alerts.", formula: "BSA aging = Mean days open for unresolved alerts", source: "AML case system" } },
  cycle: { camels: "M",
    bank: { definition: "Elapsed days from commercial application to credit decision.", formula: "Decision cycle = Median days (application → decision)", source: "LOS / credit admin" },
    cu: { definition: "Elapsed days from consumer/MBL application to decision.", formula: "Decision cycle = Median days (application → decision)", source: "LOS / credit admin" } },
  funnel: { camels: "M",
    bank: { definition: "Share of applications that become booked loans.", formula: "Funnel conversion = Booked loans / Applications", source: "LOS" },
    cu: { definition: "Share of applications that become booked loans.", formula: "Funnel conversion = Booked loans / Applications", source: "LOS" } },
  new_yield: { camels: "E",
    bank: { definition: "Coupon on newly originated loans vs the existing book.", formula: "New-money yield = Weighted average note rate on originations in period", source: "LOS / core" },
    cu: { definition: "Coupon on newly originated loans vs member-value pricing.", formula: "New-money yield = Weighted average note rate on originations in period", source: "LOS / core" } },
  orig_vol: { camels: "A",
    bank: { definition: "Dollar volume of loans booked in the period.", formula: "Origination volume = Sum of booked principal", source: "LOS" },
    cu: { definition: "Dollar volume of loans booked in the period.", formula: "Origination volume = Sum of booked principal", source: "LOS" } },
  cpt: { camels: "E",
    bank: { definition: "Fully loaded cost to process one customer transaction.", formula: "Cost / txn = Transaction-processing expense / Transaction count", source: "Ops / GL" },
    cu: { definition: "Fully loaded cost to process one member transaction.", formula: "Cost / txn = Transaction-processing expense / Transaction count", source: "Ops / GL" } },
  self_svc: { camels: "M",
    bank: { definition: "Share of eligible transactions completed without a banker (ops lens).", formula: "Self-service = STP / digital txns / Eligible txns", source: "Core / digital ops" },
    cu: { definition: "Share of eligible transactions completed without staff.", formula: "Self-service = STP / digital txns / Eligible txns", source: "Core / digital ops" } },
  pipeline: { camels: "A",
    bank: { definition: "Commercial pipeline conversion — applications that become booked C&I.", formula: "Pipeline conversion = Booked C&I / Weighted pipeline", source: "LOS / CRM" },
    cu: { definition: "Days to onboard a new member (FOM checks included).", formula: "Onboarding cycle = Median days (application → funded membership)", source: "Core / membership ops" } },
  teller_sla: { camels: "M",
    bank: { definition: "Time to complete a teller transaction at the window.", formula: "Teller SLA = Average minutes per teller transaction", source: "Branch ops / queue system" },
    cu: { definition: "Time to complete a teller transaction at the window.", formula: "Teller SLA = Average minutes per teller transaction", source: "Branch ops / queue system" } },
  engagement: { camels: "M",
    bank: { definition: "Associate engagement index (Emplify or successor) in the Engaged band.", formula: "Engagement = Vendor engagement index (participation ≥80%)", source: "HR survey (Emplify)" },
    cu: { definition: "Associate engagement index in the Engaged band.", formula: "Engagement = Vendor engagement index (participation ≥80%)", source: "HR survey" } },
  turnover: { camels: "M",
    bank: { definition: "Organization-wide voluntary turnover.", formula: "Voluntary turnover = Voluntary separations / Average headcount", source: "HRIS" },
    cu: { definition: "Organization-wide voluntary turnover.", formula: "Voluntary turnover = Voluntary separations / Average headcount", source: "HRIS" } },
  teller_to: { camels: "M",
    bank: { definition: "Annualized turnover in the teller / frontline job family.", formula: "Teller turnover = Teller separations / Average teller headcount", source: "HRIS · segment tellers vs rest of staff" },
    cu: { definition: "Annualized frontline turnover.", formula: "Frontline turnover = Frontline separations / Average frontline headcount", source: "HRIS" } },
  ttf: { camels: "M",
    bank: { definition: "Calendar days to fill examiner-sensitive seats (BSA, credit, CFO-1).", formula: "Time-to-fill = Offer accept date − Requisition open date", source: "ATS / HRIS" },
    cu: { definition: "Calendar days to fill examiner-sensitive seats.", formula: "Time-to-fill = Offer accept date − Requisition open date", source: "ATS / HRIS" } },
  training: { camels: "M",
    bank: { definition: "Completion of required risk and compliance modules.", formula: "Training completion = Completed required modules / Assigned modules", source: "LMS" },
    cu: { definition: "Completion of required risk and compliance modules.", formula: "Training completion = Completed required modules / Assigned modules", source: "LMS" } },
  succession: { camels: "M",
    bank: { definition: "Ready-now backup coverage for CEO-1, BSA, credit, and CFO.", formula: "Succession coverage = Named ready-now seats / Critical seats", source: "Talent review" },
    cu: { definition: "Ready-now backup coverage for CEO-1, BSA, credit, and CFO.", formula: "Succession coverage = Named ready-now seats / Critical seats", source: "Talent review" } },
  skill_board: { camels: "M",
    bank: { definition: "Share of commercial lenders holding required credentials.", formula: "Skill coverage = Credentialed commercial lenders / Commercial lenders", source: "LMS / credit admin" },
    cu: { definition: "Volunteer board education hours vs policy.", formula: "Board education = Sum of documented board training hours (YTD)", source: "Board secretary / LMS" } }
};

const MAP_HOME = {
  "l1-2": { perspective: "Financial", label: "Financial · L1-2" },
  "l1-3": { perspective: "Customer", label: "Customer / Member · L1-3" },
  "l1-4": { perspective: "Risk", label: "Risk / Capital · L1-4" },
  "l1-5": { perspective: "Internal Process", label: "Process / Production · L1-5" },
  "l1-6": { perspective: "Learning Growth", label: "People · L1-6" }
};

const state = {
  charter: "bank",
  period: DEFAULT_PERIOD,
  report: "l1-1",
  selectedId: null,
  drillLevel: 1,
  mode: "monitor",
  editId: null
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

function viewOf(m) {
  const side = state.charter === "cu" ? m.cu : m.bank;
  const direction = side.direction || m.direction;
  const unit = side.unit || m.unit;
  const sliced = sliceForPeriod(side.series, side.prior);
  const spec = periodSpec();
  return {
    ...m,
    metric: side.metric,
    objective: side.objective,
    target: side.target,
    peer: side.peer,
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
    peerSeries: towardPeer(sliced.series, side.peer, direction),
    peerSource: state.charter === "cu" ? "FPR peer median, assets $1B–$3B" : "UBPR peer median, assets $1B–$3B"
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
  if (unit === "days" || unit === "min" || unit === "score" || unit === "hrs" || unit === "x") return Number(val).toFixed(1);
  if (unit === "%") return Number(val).toFixed(2);
  return Number(val).toFixed(2);
}

function gapAmount(v, abs) {
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

function metricsForReport() {
  if (state.report === "l1-1") return METRICS.filter((m) => m.reports.includes("l1-1"));
  return METRICS.filter((m) => m.reports.includes(state.report));
}

function processGroup(m) {
  if (m.id === "pipeline") return state.charter === "cu" ? "ops" : "prod";
  return m.group || "ops";
}

function camelsLetter(id) {
  return (METRIC_DEFS[id] && METRIC_DEFS[id].camels) || "";
}

function showCamels(m) {
  return state.report === "l1-4" || (state.report === "l1-1" && (m.id === "capital" || m.id === "past_due"));
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
  document.title = "Riverbend | " + r.name;
  const h1 = document.getElementById("reportTitle");
  if (h1) h1.textContent = r.name;
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
  caption.textContent = state.charter === "cu"
    ? "Formulas lock for this credit union · FPR / 5300 sample. CAMELS letters are tags, not weights — the score is still Actual vs your target. Peer context is 5300 via FPR; never mix UBPR and FPR."
    : "Formulas lock for this bank · UBPR / Call Report sample. CAMELS letters are tags, not weights — the score is still Actual vs your target. Peer context is Call Report via UBPR; never mix UBPR and FPR.";
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
  el.querySelector("#planMap").innerHTML = Object.keys(MAP_HOME).map((id) =>
    `<option value="${id}">${MAP_HOME[id].label}</option>`
  ).join("");
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
  document.getElementById("brandTitle").textContent = fi + " | " + r.name;
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
        <p class="caption">CBO owns pipeline and originations. Loan and deposit growth stay on L1-2. Branch and associate exceptions for production and operations sit under Needs attention.</p>
        <div class="cards">${prod.map(cardMarkup).join("")}</div>
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
    <span><i class="dot ${v.comparePrior ? "prior" : "peer"}"></i>${v.comparePrior ? "Prior year" : "Peer median"}</span>
  </div>`;
}

function peerRows(v) {
  const names = state.charter === "cu" ? CU_PEERS : BANK_PEERS;
  const spread = Math.abs(v.peer) * 0.08 + 0.02;
  const vals = [v.peer - spread * 1.1, v.peer - spread * 0.3, v.peer + spread * 0.4, v.peer + spread * 1.0];
  const rows = names.map((name, i) => ({ name, value: Number(vals[i].toFixed(2)), ours: false }));
  rows.push({ name: state.charter === "cu" ? "Riverbend CU (us)" : "Riverbend Bank (us)", value: v.actual, ours: true });
  rows.sort((a, b) => v.direction === "lower" ? a.value - b.value : b.value - a.value);
  return rows;
}

function renderDrillBody(m, v) {
  const s = statusOf(v);
  const vsT = gapLabel(v, v.target);
  const vsP = gapLabel(v, v.peer);
  const vsY = gapLabel(v, v.priorVal);
  const body = document.getElementById("drillBody");
  if (state.drillLevel === 1) {
    const story = s === "ok"
      ? (beatsPeer(v) ? "Winning both: at/above plan and ahead of peers." : "On plan, but behind the peer median.")
      : (beatsPeer(v) ? "Ahead of peers, still short of our own target." : "Behind both plan and peers — priority for attention.");
    const tt = targetTypeOf(v);
    body.innerHTML = `<div class="detail-grid">
      <div>
        <p class="target-type"><span class="type-chip">${tt.label}</span> ${tt.detail} · ${directionCopy(v)}</p>
        <div class="gap-card"><div class="k">Vs target (plan)</div><div class="v ${vsT.favorable ? "ok" : "bad"}">${vsT.text}</div>
          <div class="caption">Actual ${formatValue(v.actual, v.unit)} ${v.unit} · Target ${formatValue(v.target, v.unit)} ${v.unit}</div></div>
        <div class="gap-card"><div class="k">Vs peer median</div><div class="v ${vsP.favorable ? "ok" : "bad"}">${vsP.text}</div>
          <div class="caption">${v.peerSource}</div></div>
        <div class="gap-card"><div class="k">Vs prior year</div><div class="v ${vsY.favorable ? "ok" : "bad"}">${vsY.text}</div>
          <div class="caption">Prior ${formatValue(v.priorVal, v.unit)} ${v.unit}</div></div>
        <p class="close-gap"><span class="k">Close the gap</span>${closeTheGapLine(v)}</p>
        <p class="lede">${story}</p>
        <p class="hint">Owner: ${v.owner} · ${v.periodLegend}.</p>
      </div>
    </div>`;
  } else if (state.drillLevel === 2) {
    const rows = peerRows(v);
    body.innerHTML = `<div class="detail-grid">
      <div class="chart-wrap drill-chart" style="padding:12px">${trendSvg(v)}</div>
      <div>
        <h2 class="section">Named peers (sample)</h2>
        <table>
          <thead><tr><th>Institution</th><th>${v.metric}</th></tr></thead>
          <tbody>${rows.map((r) => `<tr class="${r.ours ? "ours" : ""}"><td>${r.name}</td><td>${formatValue(r.value, v.unit)} ${v.unit}</td></tr>`).join("")}</tbody>
        </table>
        <p class="caption">${v.peerSource}. Ranked ${v.direction === "lower" ? "low to high" : "high to low"}. Curves stay inside charter.</p>
      </div>
    </div>`;
  } else {
    body.innerHTML = `<div class="detail-grid">
      <div>
        <h2 class="section">Why it moved</h2>
        <ul class="driver-list">
          ${m.drivers.map((d) => `<li><div class="d-title">${d.title}</div><div class="d-meta">${d.meta}</div></li>`).join("")}
        </ul>
      </div>
      <div>
        <h2 class="section">Named action</h2>
        <div class="gap-card action-card">
          <div class="k">What we are doing</div>
          <div class="v">${m.action.what}</div>
          <div class="caption">Owner: ${m.action.owner} · Due: ${m.action.due}</div>
        </div>
        <p class="hint">Board conversation stops here — no fourth drill.</p>
      </div>
    </div>${whereTableHtml(m, v)}`;
  }
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

function boot(reportId) {
  state.period = DEFAULT_PERIOD;
  const fromHash = (window.location.hash || "").replace("#", "");
  state.report = REPORTS[fromHash] ? fromHash : reportId;
  const start = REPORTS[state.report];
  if (start) {
    document.title = "Riverbend | " + start.name;
    const h1 = document.getElementById("reportTitle");
    if (h1) h1.textContent = start.name;
  }
  document.querySelectorAll(".charter button").forEach((b) => {
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
    b.addEventListener("click", () => { state.drillLevel = Number(b.dataset.level); render(); });
  });
  document.getElementById("closeDetail").addEventListener("click", () => { state.selectedId = null; render(); });
  bindNav();
  render();
}
