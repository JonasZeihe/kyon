import os
import sys
import datetime
import fnmatch

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
        for file in sorted(files):
            abs_path = os.path.join(root, file)
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
        for file in sorted(files):
            name_lower = file.lower()
            if any(name_lower.endswith(ext) for ext in exts):
                abs_path = os.path.join(root, file)
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
        for file in sorted(files):
            if file in LOCKFILES:
                continue
            if file.lower().startswith(".env") and not is_env_example(file):
                continue
            rel_path = (
                os.path.normpath(os.path.join(rel_root, file))
                .lstrip("./")
                .replace("\\", "/")
            )
            name_match = any(fnmatch.fnmatch(file, pat) for pat in CONFIG_NAME_PATTERNS)
            path_match = any(
                fnmatch.fnmatch(rel_path, pat) for pat in CONFIG_PATH_PATTERNS
            )
            if not (name_match or path_match):
                continue
            abs_path = os.path.join(root, file)
            try:
                with open(abs_path, "r", encoding="utf-8") as f:
                    content = f.read()
            except Exception as e:
                content = f"<< Error reading file: {e} >>"
            entries.append(f"// --- {rel_path} ---\n{content.strip()}\n")
    entries.sort(key=lambda s: s.split("\n", 1)[0].lower())
    return entries


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
            "\n🔍 Enter folder name, file types (.js,.ts,...) or 'config' (or 'exit')\n"
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
