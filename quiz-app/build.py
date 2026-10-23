"""문제은행(data/*.js)을 src/app.html에 끼워 넣어 한 파일짜리 dist/quiz.html을 만든다."""
from pathlib import Path

ROOT = Path(__file__).parent
ORDER = ["ca", "ai", "bd", "ds", "py"]


def main():
    src = (ROOT / "src" / "app.html").read_text(encoding="utf-8")
    blocks = []
    for name in ORDER:
        # 과목 문제은행 다음에 요약정리 원문 문항(.sum.js)과 장별 상세 요약(.notes.js), 암기카드(.cards.js)가 있으면 이어서 넣는다
        for path in (ROOT / "data" / f"{name}.js", ROOT / "data" / f"{name}.sum.js", ROOT / "data" / f"{name}.notes.js", ROOT / "data" / f"{name}.cards.js"):
            if not path.exists():
                continue
            js = path.read_text(encoding="utf-8")
            # 데이터 안에 </script>가 섞이면 페이지가 깨지므로 막아 둔다
            assert "</script" not in js.lower(), f"{path.name}에 </script>가 있습니다"
            blocks.append(f"<script>\n{js}\n</script>")
    out = src.replace("/*@@DATA@@*/", "\n".join(blocks))
    dist = ROOT / "dist"
    dist.mkdir(exist_ok=True)
    (dist / "quiz.html").write_text(out, encoding="utf-8")
    # 로컬 브라우저 미리보기용: 문서 뼈대를 씌운 index.html
    page = (
        '<!doctype html><html lang="ko"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
        "</head><body>\n" + out + "\n</body></html>"
    )
    (dist / "index.html").write_text(page, encoding="utf-8")
    print(f"dist/quiz.html {len(out.encode('utf-8')) / 1024:.0f} KB")


if __name__ == "__main__":
    main()
