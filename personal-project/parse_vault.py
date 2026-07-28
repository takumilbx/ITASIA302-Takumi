import os
import re
import json
import yaml
import math
import networkx as nx
import numpy as np
import binascii

# Absolute path to the user's Obsidian vault
vault_path = "/Users/takumyii/Desktop/10-Academic/30-Resources/Obsidian/Takumi's Vault"

nodes = {}
edges = []

def clean_link(link_str):
    link_str = link_str.strip()
    if "|" in link_str:
        link_str = link_str.split("|")[0]
    return link_str.strip("[] ")

# Recursively scan all markdown files under vault_path
print("Scanning vault recursively...")
all_md_files = []
for root, dirs, files in os.walk(vault_path):
    # Skip hidden directories (like .obsidian) and templates
    dirs[:] = [d for d in dirs if not d.startswith('.') and d != '_templates']
    for f in files:
        if f.endswith('.md'):
            all_md_files.append((root, f))

print(f"Found {len(all_md_files)} markdown files.")

# First pass: Create all nodes
for root, filename in all_md_files:
    filepath = os.path.join(root, filename)
    basename = filename[:-3]  # remove .md
    
    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        continue
            
    # Parse frontmatter
    frontmatter = {}
    if content.startswith("---"):
        parts = content.split("---")
        if len(parts) >= 3:
            try:
                frontmatter = yaml.safe_load(parts[1]) or {}
            except Exception as e:
                pass
            
    tags = frontmatter.get("tags", [])
    if isinstance(tags, str):
        tags = [tags]
    elif not isinstance(tags, list):
        tags = []
        
    title = frontmatter.get("title", basename)
    author = frontmatter.get("author", "Unknown")
    year = frontmatter.get("year", "")
    
    # Determine the node group/category based on directory path
    rel_dir = os.path.relpath(root, vault_path)
    group = "atom"
    
    if rel_dir.startswith("Authors"):
        group = "author"
    elif rel_dir.startswith("Class Notes"):
        group = "class"
    elif rel_dir.startswith("audit"):
        group = "audit"
    elif rel_dir.startswith("NotebookLM Atom Sources"):
        group = "notebooklm"
    elif rel_dir.startswith("Sources"):
        group = "citation"
    else:
        # Fallback to tag checks
        if any(t in ["TPACK", "teacher-knowledge"] for t in tags):
            group = "theory"
        elif any(t in ["Thailand", "GIGA", "Japan"] for t in tags):
            group = "policy"
        elif "methodology" in tags:
            group = "tool"
            
    # Clean description from content body
    parts = content.split("---")
    body = parts[2].strip() if (len(parts) >= 3 and content.startswith("---")) else content
    body_cleaned = re.sub(r">.*", "", body)  # remove blockquotes
    body_cleaned = re.sub(r"%%.*?%%", "", body_cleaned, flags=re.DOTALL)  # remove comments
    body_cleaned = body_cleaned.strip()
    
    lines = [line.strip() for line in body_cleaned.split("\n") if line.strip()]
    desc = lines[0][:180] if lines else f"Obsidian note under {rel_dir}"
    
    if group == "citation":
        desc = f"Literature source by {author} ({year}). {desc[:120]}..."
        
    # Generate deterministic CRC32 address to prevent hex shifts on every run
    addr_val = binascii.crc32(basename.encode('utf-8')) & 0xFFFF
    
    nodes[basename] = {
        "id": len(nodes),
        "key": basename,
        "title": title,
        "group": group,
        "author": author,
        "year": str(year),
        "tags": tags,
        "desc": desc,
        "addr": f"0x{addr_val:04X}"
    }

# Reindex ids densely: duplicate basenames across folders overwrite their dict
# entry but keep the stale id, leaving holes that break node_list construction.
for _i, _key in enumerate(nodes):
    nodes[_key]["id"] = _i

# Second pass: Extract links from content
print("Extracting connections...")
link_pattern = re.compile(r"\[\[(.*?)\]\]")
for root, filename in all_md_files:
    basename = filename[:-3]
    if basename not in nodes:
        continue
        
    filepath = os.path.join(root, filename)
    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
    except Exception:
        continue
            
    found_links = link_pattern.findall(content)
    for link in found_links:
        target_key = clean_link(link)
        if basename.lower() == "index" or target_key.lower() == "index":
            continue
        if target_key in nodes:
            edges.append({
                "source": basename,
                "target": target_key
            })
        elif "@" + target_key in nodes:
            edges.append({
                "source": basename,
                "target": "@" + target_key
            })

# Deduplicate edges and format them with integer indices
print("Deduplicating and indexing edges...")
dedup_edges = set()
formatted_edges = []
for e in edges:
    pair = tuple(sorted([e["source"], e["target"]]))
    if pair[0] != pair[1] and pair not in dedup_edges:
        dedup_edges.add(pair)
        formatted_edges.append({
            "source": nodes[pair[0]]["id"],
            "target": nodes[pair[1]]["id"]
        })

# Compute 3D Spring Layout component by component
print("Computing 3D Spring Layout component by component...")
G = nx.Graph()
# Add all nodes
for key in nodes.keys():
    G.add_node(key)
# Add all edges
for pair in dedup_edges:
    G.add_edge(pair[0], pair[1])

# Find connected components sorted by size descending
components = sorted(list(nx.connected_components(G)), key=len, reverse=True)
print(f"Total connected components: {len(components)}")

pos_3d = {}

# 1. Largest component (central cluster)
c0 = components[0]
subG0 = G.subgraph(c0)
print(f"Layouting Central Component: {len(c0)} nodes...")
pos_sub0 = nx.spring_layout(subG0, dim=3, k=1.2 / math.sqrt(len(c0)), iterations=100, seed=42)
for key, coord in pos_sub0.items():
    pos_3d[key] = coord * 45.0  # Scale to [-45.0, 45.0] range for high readability

# 2. Remaining components (satellites and constellations)
rem_components = components[1:]
total_rem = len(rem_components)

for idx, comp in enumerate(rem_components):
    size = len(comp)
    subG = G.subgraph(comp)
    
    # Run spring layout for this component
    pos_sub = nx.spring_layout(subG, dim=3, k=1.0 / math.sqrt(size) if size > 1 else 1.0, iterations=60, seed=42)
    
    # Determine center and scale of this satellite component
    if idx == 0:
        # Component 1 (second largest): place on positive X side
        center = np.array([60.0, 0.0, 15.0])
        scale = 10.0
        print(f"Layouting Satellite Component 1: {size} nodes at {center}...")
    elif idx == 1:
        # Component 2 (third largest): place on negative X side
        center = np.array([-60.0, 0.0, -15.0])
        scale = 10.0
        print(f"Layouting Satellite Component 2: {size} nodes at {center}...")
    else:
        # Outer shell components
        # Distribute their centers using Fibonacci sphere
        small_idx = idx - 2
        total_small = total_rem - 2
        
        if total_small > 1:
            phi = math.pi * (math.sqrt(5.0) - 1.0)  # golden angle
            y = 1.0 - (small_idx / float(total_small - 1)) * 2.0
            radius_y = math.sqrt(1.0 - y * y)
            theta = phi * small_idx
            x = math.cos(theta) * radius_y
            z = math.sin(theta) * radius_y
            dir_vec = np.array([x, y, z])
        else:
            dir_vec = np.array([0.0, 1.0, 0.0])
            
        center = dir_vec * 75.0
        scale = 1.5 + 0.5 * math.sqrt(size)
        
    for key, coord in pos_sub.items():
        pos_3d[key] = center + coord * scale

# Set position coordinates in nodes dictionary
for key, coord in pos_3d.items():
    nodes[key]["x"] = float(coord[0])
    nodes[key]["y"] = float(coord[1])
    nodes[key]["z"] = float(coord[2])

# Convert nodes dictionary to list sorted by internal ID
node_list = [None] * len(nodes)
for key, val in nodes.items():
    node_list[val["id"]] = val

# Compute degrees for dynamic sizes
for node in node_list:
    node["linksCount"] = 0

for e in formatted_edges:
    node_list[e["source"]]["linksCount"] += 1
    node_list[e["target"]]["linksCount"] += 1

print(f"Total Nodes extracted: {len(node_list)}")
print(f"Total Edges extracted: {len(formatted_edges)}")

# Output files in the script directory
script_dir = os.path.dirname(os.path.abspath(__file__))
output_js_path = os.path.join(script_dir, "vault_data.js")
output_json_path = os.path.join(script_dir, "vault_graph.json")

# 1. Save to JS file (window.VAULT_DATA = ...)
js_content = f"window.VAULT_DATA = {json.dumps({'nodes': node_list, 'edges': formatted_edges}, ensure_ascii=False)};"
with open(output_js_path, "w", encoding="utf-8") as f:
    f.write(js_content)
print(f"Graph JS file exported to: {output_js_path}")

# 2. Save to raw JSON file
with open(output_json_path, "w", encoding="utf-8") as f:
    json.dump({"nodes": node_list, "edges": formatted_edges}, f, indent=2, ensure_ascii=False)
print(f"Graph JSON file exported to: {output_json_path}")
