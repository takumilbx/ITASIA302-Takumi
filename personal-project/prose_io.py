#!/usr/bin/env python3
"""
Round-trip the prose of second_brain_final.html through plain markdown.

    python3 prose_io.py extract        # HTML  -> _drafts/live/bNN_*.md
    python3 prose_io.py bake           # _drafts/live/*.md -> HTML
    python3 prose_io.py bake --check   # report what would change, write nothing
    python3 prose_io.py bake --allow-move   # permit moving a citation between beats

Written so the prose can be rewritten by hand without touching markup. The bake
step never regenerates a panel: it substitutes text inside elements it already
found, and it refuses to write a slot whose citation tokens changed, so a
verified attribution cannot be dropped by accident.

Inline grammar, the only markup you need in the markdown:

    *word*        italic emphasis
    {{word}}      the accent colour (the headline highlight, the kick separator)
    **word**      bold, used inside ledger and card labels
    ~~word~~      the smaller trailing line inside the alloy row
    [[(Foo, 2020, p. 4)]]   a citation. Keep these exactly as they are.

Lists (bullets, ledger rows, references) are edited as markdown lists, so items
can be added or removed freely.
"""

import html
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PAGE = os.path.join(HERE, "second_brain_final.html")
OUTDIR = os.path.join(HERE, "_drafts", "live")

BEAT_NAMES = ["hero", "context", "pkm", "second_brain", "glossary", "hype", "trap", "building", "zettelkasten", "method", "stack", "interface", "case_study", "pipeline", "thesis", "end",
              "works_cited"]


# ---------------------------------------------------------------- inline grammar

BR = "[br]"   # the one hard line break, in the hero headline


def to_md(frag, kind="text"):
    """Inner HTML -> markdown. Raises if it meets markup the grammar cannot carry.

    `kind` disambiguates <i>, which means the accent colour in a kick and an
    italic journal title in the reference list. Nothing else uses it."""
    s = frag
    s = re.sub(r'<span class="cite">(.*?)</span>', r'[[\1]]', s, flags=re.S)
    s = re.sub(r'<span class="sig">(.*?)</span>', r'{{\1}}', s, flags=re.S)
    if kind == "kick":
        s = re.sub(r'<i>(.*?)</i>', r'{{\1}}', s, flags=re.S)
    else:
        s = re.sub(r'<i>(.*?)</i>', r'*\1*', s, flags=re.S)
    s = re.sub(r'<em>(.*?)</em>', r'*\1*', s, flags=re.S)
    s = re.sub(r'<b>(.*?)</b>', r'**\1**', s, flags=re.S)
    s = re.sub(r'<small>(.*?)</small>', r'~~\1~~', s, flags=re.S)
    s = re.sub(r'<br\s*/?>', BR, s)
    leftover = re.search(r'<[^>]+>', s)
    if leftover:
        raise ValueError("unsupported markup: " + leftover.group(0))
    s = html.unescape(s)
    return re.sub(r'\s+', ' ', s).strip()


def to_html(md, kind="text"):
    """Markdown -> inner HTML, the exact inverse of to_md for the same `kind`."""
    s = html.escape(md, quote=False)
    s = s.replace('&lt;', '<').replace('&gt;', '>')          # no raw tags survive extract
    s = re.sub(r'\[\[(.+?)\]\]', r'<span class="cite">\1</span>', s, flags=re.S)
    s = re.sub(r'~~(.+?)~~', r'<small>\1</small>', s, flags=re.S)
    s = re.sub(r'\{\{(.+?)\}\}',
               (r'<i>\1</i>' if kind == "kick" else r'<span class="sig">\1</span>'), s, flags=re.S)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s, flags=re.S)
    em = r'<i>\1</i>' if kind == "refs" else r'<em>\1</em>'
    s = re.sub(r'(?<!\*)\*([^*]+?)\*(?!\*)', em, s, flags=re.S)
    return s.replace(html.escape(BR, quote=False), "<br>").replace(BR, "<br>")


def cites(text):
    return sorted(re.findall(r'\[\[(.+?)\]\]', text))


# ---------------------------------------------------------------- slot discovery

# (key, regex over the beat's HTML, accent kind). Order here is only for labelling;
# slots are emitted in document order.
LEAF = [
    ("kick",    r'<p class="kick">(.*?)</p>',                       "kick"),
    ("h2",      r'<h2>(.*?)</h2>',                                  "text"),
    ("body",    r'<p class="body"[^>]*>(.*?)</p>',                  "text"),
    ("ghost",   r'<p class="ghost">(.*?)</p>',                      "text"),
    ("note",    r'<p class="note">(.*?)</p>',                       "text"),
    ("aclaim",  r'<p class="aclaim"[^>]*>(.*?)</p>',                "text"),
    ("ak",      r'<span class="ak">(.*?)</span>',                   "text"),
    ("qsrc",    r'<span class="qsrc">(.*?)</span>',                 "text"),
    ("refnote", r'<p class="refnote">(.*?)</p>',                    "text"),
    ("gk",      r'<span class="gk">(.*?)</span>',                   "text"),
    ("gd",      r'<p class="gd">(.*?)</p>',                         "text"),
    ("uicap",   r'<figcaption class="uicap">(.*?)</figcaption>',    "text"),
    ("uinote",  r'<p class="uinote">(.*?)</p>',                     "text"),
]
# blockquote text is everything before its <span class="qsrc">
QUOTE = r'<blockquote class="q"[^>]*>(.*?)\s*(?=<span class="qsrc">)'
ESSAY = r'<div class="essay"><span class="elabel">(.*?)</span>(.*?)</div>'

LISTS = [
    ("blist",  r'<ul class="blist">(.*?)</ul>',   r'<li>(.*?)</li>'),
    ("refs",   r'<ol class="refs">(.*?)</ol>',    r'<li>(.*?)</li>'),
]
LEDGER_ROW = r'<div class="lrow([^"]*)"><span class="lk">(.*?)</span><p class="lc">(.*?)</p></div>'


def find_slots(beat_html):
    """Return [(pos, kind, payload)] in document order."""
    out = []
    for kind, pat, accent in LEAF:
        for m in re.finditer(pat, beat_html, re.S):
            out.append((m.start(), kind, {"span": m.span(1), "text": m.group(1), "kind": accent}))
    for m in re.finditer(QUOTE, beat_html, re.S):
        out.append((m.start(), "quote", {"span": m.span(1), "text": m.group(1), "kind": "text"}))
    for m in re.finditer(ESSAY, beat_html, re.S):
        out.append((m.start(), "essay", {"span": m.span(2), "text": m.group(2),
                                         "kind": "text", "label": m.group(1)}))
    for kind, outer, inner in LISTS:
        for m in re.finditer(outer, beat_html, re.S):
            items = [(im.span(1), im.group(1)) for im in re.finditer(inner, m.group(1), re.S)]
            base = m.start(1)
            out.append((m.start(), kind, {"outer": m.span(1), "items": items, "base": base}))
    rows = [(m.span(), m.group(1), m.group(2), m.group(3)) for m in re.finditer(LEDGER_ROW, beat_html, re.S)]
    if rows:
        out.append((rows[0][0][0], "ledger", {"rows": rows}))
    out.sort(key=lambda t: t[0])
    return out


def split_beats(page):
    beats = {}
    for m in re.finditer(r'(<section class="panel[^"]*" id="b(\d+)"[^>]*>)(.*?)(</section>)', page, re.S):
        beats[int(m.group(2))] = {"span": m.span(3), "html": m.group(3)}
    return beats


# ---------------------------------------------------------------- extract

def extract():
    page = open(PAGE, encoding="utf-8").read()
    beats = split_beats(page)
    os.makedirs(OUTDIR, exist_ok=True)
    written = []
    for n in sorted(beats):
        bh = beats[n]["html"]
        lines = [f"# b{n:02d} · {BEAT_NAMES[n].replace('_', ' ')}", ""]
        lines += ["<!-- Rewrite the text. Keep the ## [slot] headings, keep [[citations]] exactly.",
                  "     *italic*  {{accent}}  **bold**  -->", ""]
        for idx, (_, kind, p) in enumerate(find_slots(bh), 1):
            tag = f"{kind}{idx}"
            if kind in ("blist", "refs"):
                lines.append(f"## [{tag}] {kind}")
                for _, item in p["items"]:
                    lines.append("- " + to_md(item, kind))
            elif kind == "ledger":
                lines.append(f"## [{tag}] ledger")
                for _, cls, lk, lc in p["rows"]:
                    flag = cls.strip()
                    lines.append(f"- ({flag or 'row'}) {to_md(lk)} :: {to_md(lc)}")
            elif kind == "essay":
                lines.append(f"## [{tag}] essay · {p['label']}")
                lines.append(to_md(p["text"], p.get("kind", "text")))
            else:
                lines.append(f"## [{tag}] {kind}")
                lines.append(to_md(p["text"], p.get("kind", "text")))
            lines.append("")
        path = os.path.join(OUTDIR, f"b{n:02d}_{BEAT_NAMES[n]}.md")
        open(path, "w", encoding="utf-8").write("\n".join(lines).rstrip() + "\n")
        written.append(os.path.basename(path))
    print(f"extracted {len(written)} beats -> {os.path.relpath(OUTDIR, HERE)}/")
    for w in written:
        print("  " + w)


# ---------------------------------------------------------------- bake

def parse_md(path):
    slots, cur = {}, None
    for line in open(path, encoding="utf-8"):
        line = line.rstrip("\n")
        if line.startswith("<!--") or line.startswith("     *italic*"):
            continue
        m = re.match(r'^## \[([a-z]+\d+)\]', line)
        if m:
            cur = m.group(1)
            slots[cur] = []
            continue
        if line.startswith("# "):
            cur = None
            continue
        if cur is not None:
            slots[cur].append(line)
    return {k: "\n".join(v).strip() for k, v in slots.items()}


def doc_cites(page, from_markdown):
    """Every citation in the whole narrative, as a multiset.

    The per-slot guard protects against a citation being dropped while editing.
    It cannot tell that apart from a citation being moved to another beat on
    purpose, so this counts the document as a whole: a move leaves the totals
    untouched, a deletion does not."""
    from collections import Counter
    total = Counter()
    if from_markdown:
        for fn in sorted(os.listdir(OUTDIR)):
            if fn.endswith(".md"):
                for body in parse_md(os.path.join(OUTDIR, fn)).values():
                    total.update(cites(body))
    else:
        for n, b in split_beats(page).items():
            for _, kind, p in find_slots(b["html"]):
                if kind in ("blist", "refs"):
                    for _, item in p["items"]:
                        total.update(cites(to_md(item, kind)))
                elif kind == "ledger":
                    for _, _, _, lc in p["rows"]:
                        total.update(cites(to_md(lc)))
                else:
                    total.update(cites(to_md(p["text"], p.get("kind", "text"))))
    return total


def bake(check_only=False, allow_move=False):
    page = open(PAGE, encoding="utf-8").read()
    if not os.path.isdir(OUTDIR):
        sys.exit(f"no {OUTDIR}. run: python3 prose_io.py extract")

    if allow_move:
        before, after = doc_cites(page, False), doc_cites(page, True)
        lost, gained = before - after, after - before
        if lost:
            print("REFUSED: --allow-move permits relocating a citation, not losing one.")
            for c, k in lost.items():
                print(f"  missing from the whole narrative: {c}" + (f" x{k}" if k > 1 else ""))
            sys.exit(1)
        if gained:
            print("note: citations new to the narrative (check they are in Works Cited):")
            for c, k in gained.items():
                print(f"  {c}" + (f" x{k}" if k > 1 else ""))
        print("citation totals unchanged across the narrative, per-slot guard relaxed")

    beats = split_beats(page)
    edits, refusals, changed = [], [], 0

    for n in sorted(beats):
        path = os.path.join(OUTDIR, f"b{n:02d}_{BEAT_NAMES[n]}.md")
        if not os.path.exists(path):
            continue
        md = parse_md(path)
        bh, bspan = beats[n]["html"], beats[n]["span"]
        for idx, (_, kind, p) in enumerate(find_slots(bh), 1):
            tag = f"{kind}{idx}"
            if tag not in md:
                continue
            new = md[tag]

            if kind in ("blist", "refs"):
                items = [l[2:].strip() for l in new.splitlines() if l.startswith("- ")]
                old_c = sorted(sum((cites(to_md(i, kind)) for _, i in p["items"]), []))
                new_c = sorted(sum((cites(i) for i in items), []))
                if old_c != new_c and not allow_move:
                    refusals.append((n, tag, old_c, new_c)); continue
                inner = "\n      ".join(f"<li>{to_html(i, kind)}</li>" for i in items)
                repl = "\n      " + inner + "\n    "
                if repl != bh[p["outer"][0]:p["outer"][1]]:
                    edits.append((bspan[0] + p["outer"][0], bspan[0] + p["outer"][1], repl)); changed += 1

            elif kind == "ledger":
                rows = []
                for l in new.splitlines():
                    m = re.match(r'^- \(([^)]*)\)\s*(.*?)\s*::\s*(.*)$', l)
                    if m:
                        rows.append((m.group(1), m.group(2), m.group(3)))
                if len(rows) != len(p["rows"]):
                    refusals.append((n, tag, f"{len(p['rows'])} rows", f"{len(rows)} rows")); continue
                for (span, cls, lk, lc), (ncls, nlk, nlc) in zip(p["rows"], rows):
                    if cites(to_md(lc)) != cites(nlc) and not allow_move:
                        refusals.append((n, tag, cites(to_md(lc)), cites(nlc))); continue
                    cls_out = "" if ncls == "row" else (" " + ncls.strip() if not ncls.startswith(" ") else ncls)
                    repl = (f'<div class="lrow{cls_out}"><span class="lk">{to_html(nlk)}</span>'
                            f'<p class="lc">{to_html(nlc)}</p></div>')
                    if repl != bh[span[0]:span[1]]:
                        edits.append((bspan[0] + span[0], bspan[0] + span[1], repl)); changed += 1

            else:
                if cites(to_md(p["text"], p.get("kind", "text"))) != cites(new) and not allow_move:
                    refusals.append((n, tag, cites(to_md(p["text"], p.get("kind", "text"))), cites(new))); continue
                repl = to_html(new, p.get("kind", "text"))
                if repl != p["text"]:
                    edits.append((bspan[0] + p["span"][0], bspan[0] + p["span"][1], repl)); changed += 1

    if refusals:
        print("REFUSED (citation tokens changed, nothing written for these slots):")
        for n, tag, old, new in refusals:
            print(f"  b{n:02d} [{tag}]  was {old}  now {new}")

    print(f"{changed} slot(s) changed" + (" (check only, nothing written)" if check_only else ""))
    if check_only or not edits:
        return
    for a, b, repl in sorted(edits, key=lambda e: -e[0]):
        page = page[:a] + repl + page[b:]
    open(PAGE, "w", encoding="utf-8").write(page)
    print(f"wrote {os.path.relpath(PAGE, HERE)}")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "extract"
    if cmd == "extract":
        extract()
    elif cmd == "bake":
        bake(check_only="--check" in sys.argv, allow_move="--allow-move" in sys.argv)
    else:
        sys.exit(__doc__)
