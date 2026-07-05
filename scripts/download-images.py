#!/usr/bin/env python3
"""Download real property images from image search and update seed data."""

import json, subprocess, urllib.request, os

OUT_DIR = "/home/z/my-project/public/images/properties"
BLOG_DIR = "/home/z/my-project/public/images/blog"

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(BLOG_DIR, exist_ok=True)

def search_images(query, count=3):
    """Search for images and return URLs."""
    result = subprocess.run(
        ["z-ai", "image-search", "-q", query, "-c", str(count), "--no-rank"],
        capture_output=True, text=True, timeout=120
    )
    # Extract JSON from output (skip the emoji/status lines)
    lines = result.stdout.strip().split('\n')
    json_start = None
    for i, line in enumerate(lines):
        if line.strip().startswith('{'):
            json_start = i
            break
    if json_start is None:
        return []
    json_str = '\n'.join(lines[json_start:])
    data = json.loads(json_str)
    return data.get('results', [])

def download_image(url, filepath):
    """Download image to filepath."""
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=30) as resp:
        with open(filepath, 'wb') as f:
            f.write(resp.read())
    print(f"  Downloaded: {filepath}")

# Real Sera Property apartment images
print("=== Downloading Residential Images ===")
apt_queries = [
    "luxury apartment living room modern Bangladesh",
    "modern apartment bedroom interior design",
    "luxury apartment kitchen interior Bangladesh",
    "modern apartment balcony city view Dhaka",
    "luxury apartment bathroom interior marble",
    "spacious apartment dining area modern",
    "modern apartment interior night city view",
    "luxury flat interior Bangladesh Gulshan",
]
apt_urls = []
for q in apt_queries:
    print(f"  Searching: {q}")
    results = search_images(q, 2)
    for r in results:
        apt_urls.append(r['original_url'])

# Download up to 11 apartment images
for i, url in enumerate(apt_urls[:11]):
    filepath = os.path.join(OUT_DIR, f"apt{i+1}.png")
    try:
        download_image(url, filepath)
    except Exception as e:
        print(f"  Failed apt{i+1}: {e}")

# Commercial images
print("\n=== Downloading Commercial Images ===")
comm_queries = [
    "modern office interior open plan Dhaka",
    "commercial office space interior Bangladesh",
    "corporate office meeting room glass wall",
]
comm_urls = []
for q in comm_queries:
    print(f"  Searching: {q}")
    results = search_images(q, 2)
    for r in results:
        comm_urls.append(r['original_url'])

for i, url in enumerate(comm_urls[:4]):
    filepath = os.path.join(OUT_DIR, f"comm{i+1}.png")
    try:
        download_image(url, filepath)
    except Exception as e:
        print(f"  Failed comm{i+1}: {e}")

# Blog images
print("\n=== Downloading Blog Images ===")
blog_queries = [
    "Dhaka city skyline apartment buildings",
    "Bangladesh real estate market analysis",
]
blog_urls = []
for q in blog_queries:
    print(f"  Searching: {q}")
    results = search_images(q, 2)
    for r in results:
        blog_urls.append(r['original_url'])

for i, url in enumerate(blog_urls[:3]):
    filepath = os.path.join(BLOG_DIR, f"blog{i+1}.png")
    try:
        download_image(url, filepath)
    except Exception as e:
        print(f"  Failed blog{i+1}: {e}")

print("\n=== DONE ===")