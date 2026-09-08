"""Instantiate static Manrope / EB Garamond weights for pdfmake VFS."""
from __future__ import annotations

from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

FONTS_DIR = Path(__file__).resolve().parent / "fonts"

JOBS = [
    ("Manrope-Variable.ttf", "Manrope-Regular.ttf", {"wght": 400}),
    ("Manrope-Variable.ttf", "Manrope-SemiBold.ttf", {"wght": 600}),
    ("EBGaramond-Variable.ttf", "EBGaramond-Medium.ttf", {"wght": 500}),
    ("EBGaramond-Variable.ttf", "EBGaramond-SemiBold.ttf", {"wght": 600}),
]


def main() -> None:
    FONTS_DIR.mkdir(parents=True, exist_ok=True)
    for src_name, dest_name, axes in JOBS:
        src = FONTS_DIR / src_name
        if not src.exists():
            raise SystemExit(f"Missing variable font: {src}")
        font = TTFont(str(src))
        out_font = instancer.instantiateVariableFont(font, axes)
        dest = FONTS_DIR / dest_name
        out_font.save(str(dest))
        print(f"Wrote {dest.name} ({dest.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
