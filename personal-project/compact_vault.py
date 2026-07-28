#!/usr/bin/env python3
"""Compact vault_graph.json into the small inline payload for second_brain_final.html.

Output: sb_final_data.js defining window.__SBF = {
  n     node count
  g     group names (index = grp value)
  pos   n*3 floats, 1-decimal, flat [x,y,z,...]
  grp   n uint group indices
  deg   n uint degrees (unique-edge degree)
  lc    n uint linksCount (same as deg here, kept for engine compatibility)
  addr  n hex address strings
  lbl   {index: label} sparse, author/citation nodes only
  e     flat edge index pairs [s,t,s,t,...], deduped
  spine flat edge pairs, high-degree subset (LOD fallback)
  md    max degree
  stats {files, atoms, lit, molecules, alloys, links, edges, generated}
}
Usage: python3 compact_vault.py [--cap K]
"""
import json, os, sys, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
VAULT = "/Users/takumyii/Desktop/10-Academic/30-Resources/Obsidian/Takumi's Vault"
SPINE_SIZE = 4000  # LOD spine keeps the top-K edges by degree sum

def count_md(sub):
    p = os.path.join(VAULT, sub)
    try:
        return sum(1 for f in os.listdir(p) if f.endswith(".md"))
    except OSError:
        return 0

def count_links():
    total = 0
    for root, dirs, files in os.walk(VAULT):
        dirs[:] = [d for d in dirs if not d.startswith(".") and d != "_templates" and d != "graphify-out"]
        for f in files:
            if f.endswith(".md"):
                try:
                    with open(os.path.join(root, f), encoding="utf-8", errors="ignore") as fh:
                        total += fh.read().count("[[")
                except OSError:
                    pass
    return total

def main():
    cap = None
    if "--cap" in sys.argv:
        cap = int(sys.argv[sys.argv.index("--cap") + 1])

    with open(os.path.join(HERE, "vault_graph.json"), encoding="utf-8") as f:
        data = json.load(f)
    nodes, edges = data["nodes"], data["edges"]

    if cap and cap < len(nodes):
        keep = sorted(range(len(nodes)), key=lambda i: -nodes[i]["linksCount"])[:cap]
        keepset = set(keep)
        remap = {old: new for new, old in enumerate(keep)}
        nodes = [nodes[i] for i in keep]
        edges = [{"source": remap[e["source"]], "target": remap[e["target"]]}
                 for e in edges if e["source"] in keepset and e["target"] in keepset]

    groups = sorted({nd["group"] for nd in nodes})
    gidx = {g: i for i, g in enumerate(groups)}

    pos, grp, deg, addr = [], [], [], []
    lbl = {}
    for i, nd in enumerate(nodes):
        pos += [round(nd["x"], 1), round(nd["y"], 1), round(nd["z"], 1)]
        grp.append(gidx[nd["group"]])
        deg.append(nd["linksCount"])
        addr.append(nd["addr"][2:])
        if nd["group"] in ("author", "citation"):
            lbl[i] = nd["title"][:40]

    e = []
    for ed in edges:
        e += [ed["source"], ed["target"]]
    ranked = sorted(edges, key=lambda ed: -(deg[ed["source"]] + deg[ed["target"]]))
    spine = []
    for ed in ranked[:SPINE_SIZE]:
        spine += [ed["source"], ed["target"]]

    stats = {
        "files": len(data["nodes"]),
        "atoms": count_md("Atoms"),
        "lit": count_md("Sources/Literature Sources"),
        "molecules": count_md("Molecules"),
        "alloys": count_md("Alloys"),
        "links": count_links(),
        "edges": len(edges),
        "generated": datetime.date.today().isoformat(),
    }

    payload = {"n": len(nodes), "g": groups, "pos": pos, "grp": grp, "deg": deg,
               "lc": deg, "addr": addr, "lbl": lbl, "e": e, "spine": spine,
               "md": max(deg) if deg else 0, "stats": stats}
    out = os.path.join(HERE, "sb_final_data.js")
    with open(out, "w", encoding="utf-8") as f:
        f.write("window.__SBF = " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";")
    kb = os.path.getsize(out) / 1024
    print(f"n={payload['n']} edges={len(edges)} spine={len(spine)//2} md={payload['md']} "
          f"stats={stats} -> sb_final_data.js ({kb:.0f} KB)")

if __name__ == "__main__":
    main()
