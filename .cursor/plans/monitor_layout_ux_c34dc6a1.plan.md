---
name: Monitor Layout UX
overview: "Keep all current tools on the combined monitor, but re-layout for a working session: compact chrome, unified filters, denser cards, and a sticky side drill so leaders never scroll past 17 tiles to see the answer."
todos:
  - id: compact-chrome
    content: Move modes into topbar; shrink Monitor hero; counts sit with the exception strip
    status: completed
  - id: filters-exceptions
    content: Unify map + All pills as the perspective filter; compact exception rows with selected state
    status: completed
  - id: work-pane-drill
    content: "Two-pane work area: denser cards left, sticky drill right; Escape to close; no scroll jump"
    status: completed
  - id: card-sort-aggs
    content: Sort cards exceptions-first; collapse aggregates behind a roll-up toggle
    status: completed
isProject: false
---

# Improve layout and friendliness (working session)

Edit only [`community_fi_objective_monitor.html`](c:\Users\TBaldwin\OneDrive - Jack Henry\Desktop\Executive Dashboarding\community_fi_objective_monitor.html). Do not add KPIs, do not remove the exception strip, strategy map, aggregates, or 3-level drill. The original bank monitor stays untouched.

The page is hard to work in because **everything is a vertical stack**. A click on a card or exception row jumps to a drill **below 17 cards**. Hero copy, four count tiles, map, tabs, and four aggregate charts all compete before the work starts.

## Target layout

```text
Topbar     Brand · Bank/CU · Monitor/Edit/Add
Briefing   Exceptions (compact) · counts inline
Map+tabs   Cause-and-effect boxes = the perspective filter (tabs become a thin echo)
Work area  Cards (left) | sticky drill (right, opens on select)
Optional   Aggregates collapsed by default under “Roll-up”
```

Widen `.wrap` slightly (about 1280–1360px) so the two-pane work area fits.

## 1. Chrome: shrink the hero

- Move **Monitor / Edit / Add** into the topbar next to Bank / CU. Label the charter control **Viewing as** so it is not a mystery toggle.
- Drop the large “How am I trending…” panel in Monitor mode. Counts (objectives / on track / at risk / off track) sit on one row with the exception strip.
- Keep a one-line hint only in Edit/Add. Instructional lede is not a working-session UI.

## 2. Exceptions: compact working list

Keep `#exceptionStrip` first. Make rows tighter (metric · badge · owner · vs plan · vs peer). Highlight the row that matches `selectedId`. Click still opens drill level 1, but the drill is now beside the cards — no page jump.

## 3. One filter, not two

Strategy map already sets `activePerspective`. Stacking full tabs under it is duplicate chrome.

- Keep map cards as the **primary** perspective filter (including the Risk rail).
- Reduce `#perspectiveTabs` to a single compact row of pills under the map (All + current), or style tabs as small pills in the same `map-wrap` so map + All sit together.
- Clicking All (pill) clears the map selection.

Do not turn the map into a KPI grid.

## 4. Work area: cards left, drill right

This is the highest-impact friendliness change.

- Wrap `#cardGrid` and `#detailPanel` in a two-column `.work` grid (`1.15fr / 0.95fr` above ~1100px; stacked on smaller screens).
- When nothing is selected, the right pane shows a short empty state: “Select an exception or a card.”
- When selected, `#detailPanel` is `position: sticky; top: 12px` (or a right drawer) so KPI & gaps / Trend & peers / Drivers & action stay on screen while scrolling cards.
- Stop `scrollIntoView` on the detail panel (that is the current jump).
- Close still clears `selectedId`. Escape key closes.

## 5. Cards: denser and easier to scan

- Three columns at wide width, two at mid, one on small.
- Sort the visible grid **exceptions first** (off-track, then at-risk, then on-track) so the working list matches the strip.
- Selected card already has a ring; also dim non-selected slightly.
- Leave sparkline / progress / peer chip — those are the working tools. Do not hide them.

## 6. Aggregates: available, not in the way

Keep `#aggStrip` (status mix, by perspective, attainment, % on track). Default **collapsed** behind a “Show roll-up charts” control so they do not sit between filters and cards. Remember the toggle in `sessionStorage` for the demo session only.

## 7. Drill header

Keep the three level buttons. Make the selected level obvious; keep labels `1 · KPI & gaps`, `2 · Trend & peers`, `3 · Drivers & action`. Edit fields stay inside the sticky pane when mode is Edit.

## Out of scope

- New metrics, period context, formula tooltips
- Removing Bank/CU, map, exceptions, or the third drill
- Redesigning [`community_bank_objective_monitor.html`](c:\Users\TBaldwin\OneDrive - Jack Henry\Desktop\Executive Dashboarding\community_bank_objective_monitor.html)
