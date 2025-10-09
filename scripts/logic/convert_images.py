# scripts/logic/convert_images.py
#!/usr/bin/env python3
import os
import sys
import shlex
import pathlib
import datetime
from typing import Iterable, List, Tuple

try:
    from PIL import Image, ImageOps
except Exception:
    print("Pillow is required. Install with:  pip install pillow")
    sys.exit(1)

SUPPORTED_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tif", ".tiff"}
WEBP_QUALITY = int(os.environ.get("WEBP_QUALITY", "82"))
WEBP_METHOD = int(os.environ.get("WEBP_METHOD", "6"))
WEBP_LOSSLESS = os.environ.get("WEBP_LOSSLESS", "").lower() in {"1", "true", "yes"}


def supports_color() -> bool:
    if os.name == "nt":
        return False
    return sys.stdout.isatty()


B = "\033[1m" if supports_color() else ""
OK = "\033[32m" if supports_color() else ""
ERR = "\033[31m" if supports_color() else ""
CY = "\033[36m" if supports_color() else ""
RST = "\033[0m" if supports_color() else ""


def hr() -> str:
    return "-" * 62


def banner(out_dir: pathlib.Path) -> None:
    print()
    print(f"{B}Image Optimizer - WebP converter{RST}")
    print(hr())
    print("Drag & drop files or folders into this window, then press Enter.")
    print(f"Outputs will be written to: {CY}{out_dir}{RST}")
    print(hr())
    exts = ", ".join(sorted([e.lstrip(".") for e in SUPPORTED_EXTS]))
    print(f"Supported formats: {exts}")
    print()


def parse_dropped_paths(line: str) -> List[pathlib.Path]:
    parts = shlex.split(line, posix=False)
    paths: List[pathlib.Path] = []
    for p in parts:
        if p:
            paths.append(pathlib.Path(p).expanduser())
    return paths


def collect_supported(paths: Iterable[pathlib.Path]) -> List[pathlib.Path]:
    files: List[pathlib.Path] = []
    for p in paths:
        if p.is_dir():
            for ext in SUPPORTED_EXTS:
                files.extend(sorted(p.glob(f"*{ext}")))
        elif p.is_file():
            files.append(p)
    return [f for f in files if f.suffix.lower() in SUPPORTED_EXTS]


def normalize_mode(img: Image.Image) -> Image.Image:
    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        return img.convert("RGBA")
    if img.mode == "CMYK":
        return img.convert("RGB")
    return img


def next_available_path(base: pathlib.Path) -> pathlib.Path:
    if not base.exists():
        return base
    stem, suffix, parent = base.stem, base.suffix, base.parent
    i = 1
    while True:
        cand = parent / f"{stem}({i}){suffix}"
        if not cand.exists():
            return cand
        i += 1


def optimize_to_webp(
    src: pathlib.Path, out_dir: pathlib.Path
) -> Tuple[pathlib.Path, int, int]:
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)
        im = normalize_mode(im)

        out_name = f"{src.stem}.webp"
        out_path = next_available_path(out_dir / out_name)

        save_kwargs = {
            "format": "WEBP",
            "quality": WEBP_QUALITY,
            "method": WEBP_METHOD,
            "lossless": WEBP_LOSSLESS,
        }

        icc = im.info.get("icc_profile")
        if isinstance(icc, (bytes, bytearray)):
            save_kwargs["icc_profile"] = icc

        exif = im.info.get("exif")
        if isinstance(exif, (bytes, bytearray)):
            save_kwargs["exif"] = exif

        im.save(out_path, **save_kwargs)

    in_size = src.stat().st_size if src.exists() else 0
    out_size = out_path.stat().st_size if out_path.exists() else 0
    return out_path, in_size, out_size


def fmt_kb(n: int) -> str:
    return f"{n/1024:.1f}KB"


def summarize(results: List[Tuple[pathlib.Path, int, int]]) -> str:
    if not results:
        return "No files processed.\n"
    total_in = sum(i for _, i, _ in results)
    total_out = sum(o for _, _, o in results)
    saved = max(0, total_in - total_out)
    pct = (saved / total_in * 100.0) if total_in > 0 else 0.0
    lines = []
    lines.append("\nSummary\n")
    lines.append(hr() + "\n")
    for out_path, in_size, out_size in results:
        diff = max(0, in_size - out_size)
        pct_item = (diff / in_size * 100.0) if in_size > 0 else 0.0
        lines.append(
            f"{out_path.name}: {fmt_kb(in_size)} -> {fmt_kb(out_size)}  (-{fmt_kb(diff)}, {pct_item:.1f}%)\n"
        )
    lines.append(hr() + "\n")
    lines.append(
        f"Total: {fmt_kb(total_in)} -> {fmt_kb(total_out)}  (-{fmt_kb(saved)}, {pct:.1f}%)\n"
    )
    return "".join(lines)


def ask_yes_no(prompt: str, default_no: bool = True) -> bool:
    suffix = " [y/N]: " if default_no else " [Y/n]: "
    while True:
        ans = input(prompt + suffix).strip().lower()
        if not ans:
            return not default_no
        if ans in {"y", "yes"}:
            return True
        if ans in {"n", "no"}:
            return False


def process_once(
    inputs: List[pathlib.Path], out_dir: pathlib.Path, log_lines: List[str]
) -> None:
    if not inputs:
        print("No supported image files found.\n")
        return

    if not out_dir.exists():
        out_dir.mkdir(parents=True, exist_ok=True)

    print(f"{B}Processing {len(inputs)} file(s)...{RST}")
    results: List[Tuple[pathlib.Path, int, int]] = []
    for src in inputs:
        try:
            out, in_size, out_size = optimize_to_webp(src, out_dir)
            line = f"{OK}OK{RST} {src.name} -> {out.name}  ({fmt_kb(in_size)} -> {fmt_kb(out_size)})"
            print(line)
            log_lines.append(line + "\n")
            results.append((out, in_size, out_size))
        except Exception as e:
            line = f"{ERR}ERROR{RST} {src} — {e}"
            print(line)
            log_lines.append(line + "\n")

    summary = summarize(results)
    print(summary, end="")
    log_lines.append(summary)
    print(f"Output directory: {CY}{out_dir.resolve()}{RST}\n")


def main() -> None:
    cwd = pathlib.Path.cwd()
    out_dir = cwd / "output"
    banner(out_dir)

    log_lines: List[str] = []
    initial_args = [pathlib.Path(a) for a in sys.argv[1:] if a.strip()]

    if initial_args:
        files = collect_supported(initial_args)
        process_once(files, out_dir, log_lines)
    else:
        while True:
            line = input(
                f"{B}> Drop files or folders here, then press Enter (or just Enter to quit):{RST}\n"
            ).strip()
            if not line:
                print("Bye.")
                break
            paths = parse_dropped_paths(line)
            files = collect_supported(paths)
            if not files:
                print("No supported images detected. Try again.\n")
                continue
            process_once(files, out_dir, log_lines)
            if ask_yes_no("Process more files?", default_no=True):
                continue
            break

    if ask_yes_no("Save a session log file in the current directory?", default_no=True):
        ts = datetime.datetime.now().strftime("%Y-%m-%dT%H-%M-%S")
        log_path = cwd / f"image_opt_{ts}.log"
        log_path.write_text("".join(log_lines), encoding="utf-8")
        print(f"Saved log: {CY}{log_path}{RST}")


if __name__ == "__main__":
    main()
