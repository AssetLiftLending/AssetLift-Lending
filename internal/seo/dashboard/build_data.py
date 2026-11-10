"""Build the JSON files behind the "AssetLift Search Rankings" dashboard.

Usage (from the repo root, with git history fetched back to 2026-08-01):
    git fetch --shallow-since=2026-08-01 origin main
    python3 internal/seo/dashboard/build_data.py OUT_DIR

Writes daily.json, queries.json, tracked.json, pages.json and changes.json to OUT_DIR.
Every number comes from internal/seo/data/opportunities.json as committed by the
SEO pipeline (Google Search Console), or from the repo's merge history.
"""
import json
import os
import re
import subprocess
import sys

OPP = "internal/seo/data/opportunities.json"
NEAR_PAGE_ONE = 20  # positions 1-20 count as "close to page 1"
CORE_TRACKED = [
    "hard money loans long branch", "hard money lenders babylon", "hard money jersey city",
    "dscr loan queens ny", "hard money lender yonkers", "hard money lender new rochelle",
    "business loans hoboken nj", "fix to rent loans nj", "hard money lenders near me",
]


def market(q: str) -> str:
    ql = q.lower()
    if re.search(r"\b(texas|tx|houston|dallas|austin|san antonio|fort worth|plano|arlington|el paso|tyler|harris county)\b", ql):
        return "Texas"
    if re.search(r"\b(georgia|ga|atlanta|savannah|augusta|athens|macon|brunswick|columbus ga)\b", ql):
        return "Georgia"
    if re.search(r"\b(nj|new jersey|jersey|hoboken|newark|long branch|monmouth|hudson|bergen|cape may|egg harbor|paterson|elizabeth|edison|toms river|lakewood|camden)\b", ql):
        return "New Jersey"
    if re.search(r"\b(ct|connecticut|stamford|bridgeport|new haven|hartford)\b", ql):
        return "Connecticut"
    if re.search(r"\b(ny|new york|nyc|queens|brooklyn|bronx|manhattan|staten|yonkers|new rochelle|mount vernon|babylon|westchester|nassau|suffolk|long island|valley stream|patchogue|kingston|peekskill|niagara)\b", ql):
        return "New York"
    return "National / other"


def snapshots():
    shas = subprocess.check_output(["git", "log", "--reverse", "--format=%H", "--", OPP]).decode().split()
    for sha in shas:
        try:
            yield json.loads(subprocess.check_output(["git", "show", f"{sha}:{OPP}"], stderr=subprocess.DEVNULL))
        except Exception:
            continue
    yield json.load(open(OPP))


def main(out: str) -> None:
    os.makedirs(out, exist_ok=True)
    latest = json.load(open(OPP))
    daily, history = {}, {}
    for snap in snapshots():
        for d in snap.get("dailyMetrics", []):
            daily[d["date"]] = d
        day = (snap.get("generatedAt") or "")[:10]
        for r in snap.get("topQueries", []):
            history.setdefault(r["query"], {})[day] = round(r["position"], 1)

    rows = [{"date": k, "clicks": v["clicks"], "impressions": v["impressions"], "position": round(v["position"], 1)}
            for k, v in sorted(daily.items())]
    queries = [{"query": r["query"], "impressions": r["impressions"], "clicks": r["clicks"],
                "position": round(r["position"], 1), "market": market(r["query"])} for r in latest["topQueries"]]

    tracked_names = set(CORE_TRACKED)
    for r in latest["topQueries"]:
        if r["position"] <= NEAR_PAGE_ONE and (market(r["query"]) != "National / other" or r["impressions"] >= 20):
            tracked_names.add(r["query"])
    tracked = [{"date": d, "query": q, "position": p}
               for q in sorted(tracked_names) for d, p in sorted(history.get(q, {}).items())]

    pages = [{"page": r["page"], "impressions": r["impressions"], "clicks": r["clicks"], "position": round(r["position"], 1)}
             for r in latest.get("weakCtrPages", [])]

    log = subprocess.check_output(["git", "log", "--since=2026-10-10", "--format=%ad\t%s", "--date=short"]).decode().splitlines()
    changes = []
    for line in log:
        date, subject = line.split("\t", 1)
        m = re.search(r"\(#(\d+)\)\s*$", subject)
        if subject.startswith("chore(seo)") or not m:
            continue
        text = re.sub(r"^(seo|fix\(seo\)|fix):\s*", "", re.sub(r"\s*\(#\d+\)\s*$", "", subject))
        changes.append({"date": date, "change": text, "pr": int(m.group(1))})

    for name, data in [("daily", rows), ("queries", queries), ("tracked", tracked), ("pages", pages), ("changes", changes)]:
        with open(os.path.join(out, f"{name}.json"), "w") as f:
            json.dump(data, f)
    print(f"daily {len(rows)} days ({rows[0]['date']} to {rows[-1]['date']}), queries {len(queries)}, "
          f"tracked {len(tracked_names)} searches, pages {len(pages)}, changes {len(changes)}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "dashboard-data")
