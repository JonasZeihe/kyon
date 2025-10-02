import os
import sys
import fnmatch
import hashlib
import datetime

PROJECT_ROOT = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
SRC_DIR = os.path.join(PROJECT_ROOT, "src")
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
IGNORE_DIRS = {
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    "out",
    "coverage",
    ".turbo",
    ".cache",
}

LOCKFILES = {"package-lock.json", "yarn.lock", "pnpm-lock.yaml"}
CONFIG_NAME_PATTERNS = [
    "package.json",
    "tsconfig*.json",
    "jsconfig*.json",
    "next.config.*",
    "vite.config.*",
    "webpack.config.*",
    "rollup.config.*",
    "babel.config.*",
    "postcss.config.*",
    "tailwind.config.*",
    "tsup.config.*",
    "esbuild.*",
    ".eslintrc*",
    "eslint.config.*",
    ".prettierrc*",
    "prettier.config.*",
    ".stylelintrc*",
    "stylelint.config.*",
    ".editorconfig",
    ".npmrc",
    ".nvmrc",
    ".node-version",
    ".browserslistrc",
    ".commitlintrc*",
    "commitlint.config.*",
    ".lintstagedrc*",
    "lint-staged.config.*",
    "renovate.*",
    ".renovaterc*",
    "dependabot.yml",
    "turbo.json",
    "nx.json",
    "pnpm-workspace.yaml",
    "Dockerfile*",
    "docker-compose.*",
    "Makefile",
]
CONFIG_PATH_PATTERNS = [
    ".github/workflows/*.yml",
    ".github/workflows/*.yaml",
    ".husky/*",
    ".gitlab-ci.yml",
    "azure-pipelines.yml",
]

SOFT_LIMIT = 70 * 1024
HARD_LIMIT = 80 * 1024
BLOCK_SEP = "\n\n"
BINARY_EXTS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".ico",
    ".svgz",
    ".pdf",
    ".zip",
    ".gz",
    ".bz2",
    ".xz",
    ".7z",
    ".rar",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    ".otf",
    ".mp3",
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
    ".webm",
    ".wasm",
    ".webp",
}


def utf8_len(s):
    return len(s.encode("utf-8"))


def build_tree(path, prefix=""):
    entries = sorted([e for e in os.listdir(path) if e not in IGNORE_DIRS])
    tree_lines = []
    for index, entry in enumerate(entries):
        full_path = os.path.join(path, entry)
        connector = "└── " if index == len(entries) - 1 else "├── "
        tree_lines.append(f"{prefix}{connector}{entry}")
        if os.path.isdir(full_path):
            extension = "    " if index == len(entries) - 1 else "│   "
            tree_lines.extend(build_tree(full_path, prefix + extension))
    return tree_lines


def resolve_path_query(base_path, q):
    norm = q.strip().replace("\\", "/").strip("/")
    if not norm:
        return None
    parts = [p for p in norm.split("/") if p and p != "."]
    if not parts:
        return None
    if parts and parts[0].lower() == "src":
        parts = parts[1:]
    candidate = os.path.join(base_path, *parts)
    if os.path.isdir(candidate):
        return candidate
    return None


def find_directory_by_name(base_path, target_name):
    if target_name == "src":
        return base_path
    for root, dirs, _ in os.walk(base_path):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for d in dirs:
            if d == target_name:
                return os.path.join(root, d)
    return None


def collect_file_contents(path):
    entries = []
    for root, dirs, files in os.walk(path):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for fname in sorted(files):
            abs_path = os.path.join(root, fname)
            rel_path = os.path.relpath(abs_path, SRC_DIR)
            try:
                with open(abs_path, "r", encoding="utf-8") as f:
                    content = f.read()
            except Exception as e:
                content = f"<< Error reading file: {e} >>"
            entries.append(f"// --- {rel_path} ---\n{content.strip()}\n")
    return entries


def collect_file_contents_by_types(base_path, extensions):
    exts = {e.lower() if e.startswith(".") else f".{e.lower()}" for e in extensions}
    entries = []
    for root, dirs, files in os.walk(base_path):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for fname in sorted(files):
            name_lower = fname.lower()
            if any(name_lower.endswith(ext) for ext in exts):
                abs_path = os.path.join(root, fname)
                rel_path = os.path.relpath(abs_path, SRC_DIR)
                try:
                    with open(abs_path, "r", encoding="utf-8") as f:
                        content = f.read()
                except Exception as e:
                    content = f"<< Error reading file: {e} >>"
                entries.append(f"// --- {rel_path} ---\n{content.strip()}\n")
    return entries


def write_output_file(data, label):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M")
    filename = f"{timestamp}-{label}.txt"
    output_path = os.path.join(OUTPUT_DIR, filename)
    with open(output_path, "w", encoding="utf-8") as f:
        for entry in data:
            f.write(entry + "\n\n")
    print(f"\n✅ Written {len(data)} files to {output_path}")


def is_type_query(q):
    return q.startswith(".") or any(
        part.startswith(".") for part in q.replace(" ", "").split(",")
    )


def parse_extensions(q):
    parts = [p.strip() for p in q.split(",") if p.strip()]
    norm = []
    for p in parts:
        norm.append(p if p.startswith(".") else f".{p}")
    return norm


def is_env_example(name):
    n = name.lower()
    if not n.startswith(".env"):
        return False
    return any(k in n for k in ("example", "sample", "template"))


def collect_config_files(project_root):
    entries = []
    ignore_dirs_cfg = set(IGNORE_DIRS) | {"scripts", "public"}
    for root, dirs, files in os.walk(project_root):
        dirs[:] = [d for d in dirs if d not in ignore_dirs_cfg]
        rel_root = os.path.relpath(root, project_root).replace("\\", "/")
        for fname in sorted(files):
            if fname in LOCKFILES:
                continue
            if fname.lower().startswith(".env") and not is_env_example(fname):
                continue
            rel_path = (
                os.path.normpath(os.path.join(rel_root, fname))
                .lstrip("./")
                .replace("\\", "/")
            )
            name_match = any(
                fnmatch.fnmatch(fname, pat) for pat in CONFIG_NAME_PATTERNS
            )
            path_match = any(
                fnmatch.fnmatch(rel_path, pat) for pat in CONFIG_PATH_PATTERNS
            )
            if not (name_match or path_match):
                continue
            abs_path = os.path.join(root, fname)
            try:
                with open(abs_path, "r", encoding="utf-8") as f:
                    content = f.read()
            except Exception as e:
                content = f"<< Error reading file: {e} >>"
            entries.append(f"// --- {rel_path} ---\n{content.strip()}\n")
    entries.sort(key=lambda s: s.split("\n", 1)[0].lower())
    return entries


def is_binary_path(path):
    lower = path.lower()
    for ext in BINARY_EXTS:
        if lower.endswith(ext):
            return True
    return False


def normalize_rel(rel_path):
    return rel_path.replace("\\", "/")


def iter_src_files():
    for root, dirs, files in os.walk(SRC_DIR):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        files_sorted = sorted(files)
        for fname in files_sorted:
            abs_path = os.path.join(root, fname)
            rel_path = normalize_rel(os.path.relpath(abs_path, SRC_DIR))
            yield rel_path, abs_path


def read_text_lines(abs_path):
    try:
        with open(abs_path, "r", encoding="utf-8") as f:
            return f.read().splitlines(), None
    except Exception as e:
        return [f"<< Error reading file: {e} >>"], str(e)


def block_bytes(text):
    return utf8_len(text + BLOCK_SEP)


def split_large_file(lines, rel_path):
    blocks = []
    start = 0
    n = len(lines)
    while start < n:
        header = f"// --- {rel_path} ---"
        end = start
        last_blank = None
        while end < n:
            if (
                block_bytes(header + "\n" + "\n".join(lines[start : end + 1]))
                > HARD_LIMIT
            ):
                break
            if not lines[end].strip():
                last_blank = end
            end += 1
        if end == start:
            end = min(start + 1, n)
        elif last_blank is not None and last_blank >= start + 1:
            end = last_blank + 1
        blocks.append({"file": rel_path, "lines": (start + 1, end)})
        start = end
    total = len(blocks)
    normalized = []
    for i, b in enumerate(blocks, start=1):
        a, e = b["lines"]
        tag = f"// --- {rel_path} [part {i}/{total}, lines {a}–{e}] ---"
        text = "\n".join([tag] + lines[a - 1 : e])
        normalized.append(
            {"file": rel_path, "header": tag, "text": text, "bytes": block_bytes(text)}
        )
    return normalized


def collect_codebase_blocks():
    blocks = []
    for rel_path, abs_path in iter_src_files():
        if is_binary_path(rel_path):
            continue
        lines, err = read_text_lines(abs_path)
        header = f"// --- {rel_path} ---"
        full_text = (
            "\n".join([header] + lines) if not err else "\n".join([header, lines[0]])
        )
        if block_bytes(full_text) <= HARD_LIMIT:
            blocks.append(
                {
                    "file": rel_path,
                    "header": header,
                    "text": full_text,
                    "bytes": block_bytes(full_text),
                }
            )
        else:
            blocks.extend(split_large_file(lines, rel_path))
    blocks.sort(key=lambda b: b["file"].lower())
    return blocks


def write_codebase_parts():
    blocks = collect_codebase_blocks()
    if not blocks:
        print("⚠️ No files in src.")
        return
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M")
    part_idx = 1
    current_payloads = []
    current_headers = []
    current_bytes = 0
    written = 0

    def flush_part():
        nonlocal current_payloads, current_headers, current_bytes, part_idx, written
        if not current_payloads:
            return
        payload = BLOCK_SEP.join(current_payloads)
        part_name = f"{timestamp}-codebase-part-{part_idx:03d}.txt"
        out_path = os.path.join(OUTPUT_DIR, part_name)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(payload)
        print(f"✅ Wrote {out_path}")
        part_idx += 1
        written += 1
        current_payloads.clear()
        current_headers.clear()
        current_bytes = 0

    print("\n📄 Scanning entire src as codebase...\n")
    for b in blocks:
        if current_bytes and current_bytes + b["bytes"] > SOFT_LIMIT:
            flush_part()
        if current_bytes + b["bytes"] > HARD_LIMIT:
            flush_part()
        current_payloads.append(b["text"])
        current_headers.append(b["header"])
        current_bytes += b["bytes"]
        print(f" - {b['header'].splitlines()[0]}")
    flush_part()
    print(f"\n✅ Codebase written in {written} part(s)\n")


def tokenize_commalist(q):
    if "," not in q:
        return None
    tokens = [t.strip() for t in q.split(",")]
    tokens = [t for t in tokens if t]
    if not tokens:
        return None
    ext_like = all(t.startswith(".") and len(t) > 1 for t in tokens)
    if ext_like:
        return None
    plaus = any(
        "/" in t
        or "\\" in t
        or (("." in os.path.basename(t)) and not os.path.basename(t).startswith("."))
        for t in tokens
    )
    if not plaus:
        return None
    return tokens


def list_all_src_paths():
    paths = []
    for root, dirs, files in os.walk(SRC_DIR):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for f in files:
            rel = normalize_rel(os.path.relpath(os.path.join(root, f), SRC_DIR))
            paths.append(rel)
    paths.sort(key=lambda p: p.lower())
    return paths


def resolve_single_file(token, all_paths):
    t = token.strip().replace("\\", "/")
    if t.lower().startswith("src/"):
        cand = t[4:]
        if cand in all_paths:
            return cand, None
        return None, f"not-found: {token}"
    if "/" in t:
        if t in all_paths:
            return t, None
        return None, f"not-found: {token}"
    base = os.path.basename(t)
    matches = [p for p in all_paths if p.split("/")[-1] == base]
    if not matches:
        return None, f"not-found: {token}"
    if len(matches) > 1:
        return matches[0], f"ambiguous:{len(matches)}:{base}"
    return matches[0], None


def collect_selected_blocks(tokens):
    all_paths = list_all_src_paths()
    ordered = []
    notices = []
    for tok in tokens:
        rel, err = resolve_single_file(tok, all_paths)
        if rel:
            ordered.append(rel)
            if err and err.startswith("ambiguous"):
                notices.append(f"⚠️ {tok} -> {rel} ({err})")
        else:
            notices.append(f"⚠️ {err}")
    blocks = []
    for rel in ordered:
        abs_path = os.path.join(SRC_DIR, rel)
        if is_binary_path(rel):
            continue
        lines, err = read_text_lines(abs_path)
        header = f"// --- {rel} ---"
        full_text = (
            "\n".join([header] + lines) if not err else "\n".join([header, lines[0]])
        )
        if block_bytes(full_text) <= HARD_LIMIT:
            blocks.append(
                {
                    "file": rel,
                    "header": header,
                    "text": full_text,
                    "bytes": block_bytes(full_text),
                }
            )
        else:
            blocks.extend(split_large_file(lines, rel))
    return blocks, notices


def write_selected_files(tokens):
    blocks, notices = collect_selected_blocks(tokens)
    if notices:
        for n in notices:
            print(n)
    if not blocks:
        print("⚠️ No matching files.")
        return
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M")
    part_idx = 1
    current_payloads = []
    current_headers = []
    current_bytes = 0
    written = 0

    def flush_part():
        nonlocal current_payloads, current_headers, current_bytes, part_idx, written
        if not current_payloads:
            return
        payload = BLOCK_SEP.join(current_payloads)
        name = (
            f"{timestamp}-files.txt"
            if part_idx == 1 and written == 0
            else f"{timestamp}-files-part-{part_idx:03d}.txt"
        )
        out_path = os.path.join(OUTPUT_DIR, name)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(payload)
        print(f"✅ Wrote {out_path}")
        part_idx += 1
        written += 1
        current_payloads.clear()
        current_headers.clear()
        current_bytes = 0

    print("\n📄 Concatenating selected files...\n")
    for b in blocks:
        if current_bytes and current_bytes + b["bytes"] > SOFT_LIMIT:
            flush_part()
        if current_bytes + b["bytes"] > HARD_LIMIT:
            flush_part()
        current_payloads.append(b["text"])
        current_headers.append(b["header"])
        current_bytes += b["bytes"]
        print(f" - {b['header'].splitlines()[0]}")
    flush_part()
    print(f"\n✅ Files written in {written} part(s)\n")


def is_single_basename_query(q):
    if "," in q:
        return None
    if "/" in q or "\\" in q:
        return None
    name = q.strip()
    if not name:
        return None
    if name.startswith(".") and name.count(".") == 1:
        return None
    if "." not in os.path.basename(name):
        return None
    return os.path.basename(name)


def find_paths_by_basename(basename):
    matches = []
    for root, dirs, files in os.walk(SRC_DIR):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for f in files:
            if f == basename:
                rel = normalize_rel(os.path.relpath(os.path.join(root, f), SRC_DIR))
                matches.append(rel)
    matches.sort(key=lambda p: p.lower())
    return matches


def collect_blocks_for_paths(paths):
    blocks = []
    for rel in paths:
        abs_path = os.path.join(SRC_DIR, rel)
        if is_binary_path(rel):
            continue
        lines, err = read_text_lines(abs_path)
        header = f"// --- {rel} ---"
        full_text = (
            "\n".join([header] + lines) if not err else "\n".join([header, lines[0]])
        )
        if block_bytes(full_text) <= HARD_LIMIT:
            blocks.append(
                {
                    "file": rel,
                    "header": header,
                    "text": full_text,
                    "bytes": block_bytes(full_text),
                }
            )
        else:
            blocks.extend(split_large_file(lines, rel))
    return blocks


def write_found_by_basename(basename):
    paths = find_paths_by_basename(basename)
    if not paths:
        print(f"⚠️ No files named '{basename}' under src.")
        return
    blocks = collect_blocks_for_paths(paths)
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M")
    part_idx = 1
    current_payloads = []
    current_bytes = 0
    written = 0

    def flush_part():
        nonlocal current_payloads, current_bytes, part_idx, written
        if not current_payloads:
            return
        payload = BLOCK_SEP.join(current_payloads)
        name = (
            f"{timestamp}-find-{basename}.txt"
            if part_idx == 1 and written == 0
            else f"{timestamp}-find-{basename}-part-{part_idx:03d}.txt"
        )
        out_path = os.path.join(OUTPUT_DIR, name)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(payload)
        print(f"✅ Wrote {out_path}")
        part_idx += 1
        written += 1
        current_payloads.clear()
        current_bytes = 0

    print(f"\n📄 Searching for '{basename}' under src ...\n")
    for rel in paths:
        print(f" - {rel}")
    for b in blocks:
        if current_bytes and current_bytes + b["bytes"] > SOFT_LIMIT:
            flush_part()
        if current_bytes + b["bytes"] > HARD_LIMIT:
            flush_part()
        current_payloads.append(b["text"])
        current_bytes += b["bytes"]
    flush_part()
    print(f"\n✅ Found {len(paths)} file(s) for '{basename}'\n")


def main():
    if not os.path.exists(SRC_DIR):
        print(f"❌ Source directory not found: {SRC_DIR}")
        sys.exit(1)
    print(f"📁 Project structure under:\n")
    print("src/")
    tree = build_tree(SRC_DIR, prefix="│   ")
    for line in tree:
        print(line)
    while True:
        q = input(
            "\n🔍 Enter folder name, file types (.js,.ts,...) or 'config', 'codebase' (or 'exit')\n"
            "    ➤ Path queries are supported, e.g. 'src/components', 'components/forms'\n> "
        ).strip()
        if q.lower() == "exit":
            break
        if q.lower() == "config":
            print("\n📄 Scanning repository configs...\n")
            entries = collect_config_files(PROJECT_ROOT)
            if not entries:
                print("⚠️ No config files found.")
                continue
            for entry in entries:
                header = entry.split("\n", 1)[0]
                print(f" - {header}")
            write_output_file(entries, "configs")
            continue
        if q.lower() == "codebase":
            write_codebase_parts()
            continue
        tokens = tokenize_commalist(q)
        if tokens:
            write_selected_files(tokens)
            continue
        basename = is_single_basename_query(q)
        if basename:
            write_found_by_basename(basename)
            continue
        if is_type_query(q):
            exts = parse_extensions(q)
            print(f"\n📄 Scanning by types {', '.join(exts)}...\n")
            entries = collect_file_contents_by_types(SRC_DIR, exts)
            if not entries:
                print("⚠️ No matching files found.")
                continue
            for entry in entries:
                header = entry.split("\n", 1)[0]
                print(f" - {header}")
            label = "types-" + "-".join(
                e.lstrip(".").replace("*", "star") for e in exts
            )
            write_output_file(entries, label)
        else:
            target_path = resolve_path_query(SRC_DIR, q)
            if not target_path:
                target_path = find_directory_by_name(SRC_DIR, q)
            if not target_path:
                print(f"⚠️ Folder '{q}' not found. Try again with a more specific path.")
                continue
            rel_label = os.path.relpath(target_path, SRC_DIR).replace(os.sep, "_")
            print(
                f"\n📄 Scanning files under '{os.path.relpath(target_path, SRC_DIR)}'...\n"
            )
            entries = collect_file_contents(target_path)
            if not entries:
                print("⚠️ No files found in this folder.")
                continue
            for entry in entries:
                header = entry.split("\n", 1)[0]
                print(f" - {header}")
            write_output_file(entries, rel_label)


if __name__ == "__main__":
    main()
