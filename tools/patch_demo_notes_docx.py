"""Apply instruction-list edits to L1_Executive_Dashboard_Suite_Demo_Notes.docx only."""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

from docx import Document

ROOT = Path(__file__).resolve().parents[1]
DOCX = ROOT / "L1_Executive_Dashboard_Suite_Demo_Notes.docx"

REPLACEMENTS = [
    (
        "Top bar: institution name, Bank / Credit union toggle, four page pills (Monitor, Add, Edit, Definitions), links out of the suite.",
        "Top bar: institution name, Bank / Credit union toggle, four page pills (Monitor, Add, Edit, Definitions).",
    ),
    (
        "The mockups are built to support this path, not a 47-metric tour.",
        "The mockups are built to support this path, not a 39-metric tour.",
    ),
    (
        "Avoid: walking all ~47 proving metrics",
        "Avoid: walking all 39 proving metrics",
    ),
    (
        "Are we executing the plan, and which objective needs capital or a course correction this period?",
        "Are we executing the plan as a leadership team, and which objective needs a course correction this period?",
    ),
    (
        "Is risk accumulating faster than capital, liquidity, and the control environment can absorb?",
        "Is risk accumulating faster than capital, liquidity, and controls can absorb?",
    ),
    (
        "Can the operating model originate, service, and fulfill the plan at acceptable cost, speed, and error rate?",
        "Can operations run the book at acceptable cost and speed — and is production converting the plan?",
    ),
    (
        "Owner in the mockup: Executive Leadership Team (Chief Executive Officer chairs).",
        "Owner in the mockup: ELT (CEO chairs).",
    ),
    (
        "Bank caption: Learning and Growth → Process → Customer → Financial (shareholder value).",
        "Bank caption: People → Process → Customer → Financial (shareholder value).",
    ),
    (
        "Credit-union caption: Learning and Growth → Process → Member → Financial (member value + net worth).",
        "Credit-union caption: People → Process → Member → Financial (member value + net worth).",
    ),
]

SECTION_10_ADDITION = (
    "There is no footer or top-bar link to planning, charter, or README on the six Level 1 pages "
    "(documentation lives in repo files only, if sponsors need it)."
)

TABLE_DECISIONS = {
    "Level 1-1 Enterprise Strategy Scorecard": (
        "Are we executing the plan as a leadership team, and which objective needs a course correction this period?"
    ),
    "Level 1-4 Balance Sheet, Risk and Capital": (
        "Is risk accumulating faster than capital, liquidity, and controls can absorb?"
    ),
    "Level 1-5 Process, Service and Production": (
        "Can operations run the book at acceptable cost and speed — and is production converting the plan?"
    ),
}

TABLE_OWNERS = {
    "Level 1-1 Enterprise Strategy Scorecard": "ELT (CEO chairs)",
}


def replace_in_paragraph(paragraph, old: str, new: str) -> bool:
    if old not in paragraph.text:
        return False
    runs = paragraph.runs
    if not runs:
        paragraph.add_run(paragraph.text.replace(old, new))
        return True
    full = "".join(r.text for r in runs)
    if old not in full:
        return False
    full = full.replace(old, new)
    runs[0].text = full
    for r in runs[1:]:
        r.text = ""
    return True


def replace_in_container(doc_part, old: str, new: str) -> int:
    n = 0
    for paragraph in doc_part.paragraphs:
        if replace_in_paragraph(paragraph, old, new):
            n += 1
    for table in doc_part.tables:
        for row in table.rows:
            for cell in row.cells:
                n += replace_in_container(cell, old, new)
    return n


def patch_summary_table(doc: Document) -> None:
    for table in doc.tables:
        if not table.rows:
            continue
        header = [c.text.strip() for c in table.rows[0].cells]
        if "Executive decision" not in header or "Report name" not in header:
            continue
        name_idx = header.index("Report name")
        decision_idx = header.index("Executive decision")
        owner_idx = header.index("Owner") if "Owner" in header else None
        for row in table.rows[1:]:
            name = row.cells[name_idx].text.strip()
            if name.startswith("Level 1-1 Enterprise Strategy"):
                row.cells[decision_idx].text = TABLE_DECISIONS["Level 1-1 Enterprise Strategy Scorecard"]
                if owner_idx is not None:
                    row.cells[owner_idx].text = TABLE_OWNERS["Level 1-1 Enterprise Strategy Scorecard"]
            elif name.startswith("Level 1-4 Balance Sheet"):
                row.cells[decision_idx].text = TABLE_DECISIONS["Level 1-4 Balance Sheet, Risk and Capital"]
            elif name.startswith("Level 1-5 Process"):
                row.cells[decision_idx].text = TABLE_DECISIONS["Level 1-5 Process, Service and Production"]
        return


def add_section_10_sentence(doc: Document) -> bool:
    if any(SECTION_10_ADDITION in p.text for p in doc.paragraphs):
        return False
    insert_after_idx = None
    for i, p in enumerate(doc.paragraphs):
        if "A live Call Report or BigQuery feed" in p.text:
            insert_after_idx = i
            break
    if insert_after_idx is None:
        return False
    anchor = doc.paragraphs[insert_after_idx]
    new_p = anchor.insert_paragraph_before(SECTION_10_ADDITION)
    new_p.style = anchor.style
    return True


def main() -> int:
    if not DOCX.exists():
        print(f"Missing {DOCX}", file=sys.stderr)
        return 1
    backup = DOCX.with_suffix(".docx.bak")
    if not backup.exists():
        shutil.copy2(DOCX, backup)
    doc = Document(DOCX)
    for old, new in REPLACEMENTS:
        c = replace_in_container(doc, old, new)
        print(f"replace {c}: {len(old)} char pattern")
    patch_summary_table(doc)
    print("patched summary table L1-1 owner and L1-1/L1-4/L1-5 decisions")
    if add_section_10_sentence(doc):
        print("added section 10 sentence")
    else:
        print("section 10 sentence skipped (missing anchor or already present)")
    doc.save(DOCX)
    print(f"Saved {DOCX}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
