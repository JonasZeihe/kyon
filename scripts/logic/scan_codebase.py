import os
import sys
import datetime

SRC_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "src"
)
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))


def build_tree(path, prefix=""):
    entries = sorted(os.listdir(path))
    tree_lines = []
    for index, entry in enumerate(entries):
        full_path = os.path.join(path, entry)
        connector = "└── " if index == len(entries) - 1 else "├── "
        tree_lines.append(f"{prefix}{connector}{entry}")
        if os.path.isdir(full_path):
            extension = "    " if index == len(entries) - 1 else "│   "
            tree_lines.extend(build_tree(full_path, prefix + extension))
    return tree_lines


def find_directory_by_name(base_path, target_name):
    if target_name == "src":
        return base_path
    for root, dirs, _ in os.walk(base_path):
        for d in dirs:
            if d == target_name:
                return os.path.join(root, d)
    return None


def collect_file_contents(path):
    entries = []
    for root, _, files in os.walk(path):
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


def write_output_file(data, folder_name):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M")
    filename = f"{timestamp}-{folder_name}.txt"
    output_path = os.path.join(OUTPUT_DIR, filename)
    with open(output_path, "w", encoding="utf-8") as f:
        for entry in data:
            f.write(entry + "\n\n")
    print(f"\n✅ Written {len(data)} files to {output_path}")


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
        folder_name = input(
            "\n🔍 Enter folder name to scan (or 'exit' to quit): "
        ).strip()
        if folder_name.lower() == "exit":
            break

        target_path = find_directory_by_name(SRC_DIR, folder_name)
        if not target_path:
            print(f"⚠️ Folder '{folder_name}' not found. Try again.")
            continue

        print(f"\n📄 Scanning files under '{folder_name}'...\n")
        entries = collect_file_contents(target_path)
        for entry in entries:
            header = entry.split("\n", 1)[0]
            print(f" - {header}")
        write_output_file(entries, folder_name)


if __name__ == "__main__":
    main()
