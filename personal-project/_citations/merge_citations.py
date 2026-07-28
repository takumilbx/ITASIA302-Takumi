#!/usr/bin/env python3
"""Merge per-source verification JSONs into manifest.json + REPORT.md.

Reads every *.json in this directory except claims_manifest.json and
manifest.json, joins verdicts back onto the claim registry, and writes:
  manifest.json  claim id -> {status, quote, page/locator, inline, note, citekey}
  REPORT.md      human-readable, grouped by status, plus the APA reference pool
"""
import json, glob, os

HERE = os.path.dirname(os.path.abspath(__file__))
SKIP = {"claims_manifest.json", "manifest.json"}

def main():
    with open(os.path.join(HERE, "claims_manifest.json"), encoding="utf-8") as f:
        registry = {c["id"]: c for c in json.load(f)["claims"]}

    merged, refs = {}, {}
    for path in sorted(glob.glob(os.path.join(HERE, "*.json"))):
        if os.path.basename(path) in SKIP:
            continue
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        if "apa" in data:
            refs[data["citekey"]] = data["apa"]
        for k in ("apa_translation", "apa_secondary"):
            if data.get(k):
                refs[data["citekey"] + ":" + k] = data[k]
        for ck, apa in (data.get("refs") or {}).items():
            if apa:
                refs[ck] = apa
        for cl in data.get("claims", []):
            cl["citekey"] = data["citekey"]
            merged[cl["id"]] = cl

    order = ["verified", "corrected", "unsupported", "needs_user_pdf"]
    lines = ["# Citation Verification Report", ""]
    missing = [cid for cid in registry if cid not in merged
               and registry[cid]["status"] != "verified"]
    for status in order:
        group = [c for c in merged.values() if c.get("status") == status]
        if not group:
            continue
        lines.append(f"## {status.upper()} ({len(group)})\n")
        for c in sorted(group, key=lambda x: x["id"]):
            reg = registry.get(c["id"], {})
            lines.append(f"- **{c['id']}** [{c['citekey']}] {reg.get('claim','')[:110]}")
            if c.get("quote"):
                lines.append(f"  - quote: \"{c['quote']}\" ({c.get('page') or c.get('locator') or '?'})")
            if c.get("inline"):
                lines.append(f"  - inline: {c['inline']}")
            if c.get("note"):
                lines.append(f"  - note: {c['note']}")
        lines.append("")
    if missing:
        lines.append(f"## NOT YET VERIFIED ({len(missing)})\n")
        for cid in missing:
            lines.append(f"- {cid}: {registry[cid]['claim'][:110]}")
        lines.append("")
    lines.append("## APA reference pool\n")
    for ck in sorted(refs):
        lines.append(f"- `{ck}`: {refs[ck]}")

    with open(os.path.join(HERE, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump({"claims": merged, "refs": refs}, f, ensure_ascii=False, indent=1)
    with open(os.path.join(HERE, "REPORT.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    counts = {s: sum(1 for c in merged.values() if c.get("status") == s) for s in order}
    print(f"merged {len(merged)} claims, {len(refs)} refs, missing {len(missing)}; {counts}")

if __name__ == "__main__":
    main()
