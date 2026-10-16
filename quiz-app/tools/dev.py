"""개발 서버: dist 폴더를 http://localhost:5173 으로 띄우고, src·data가 바뀌면 자동으로 다시 빌드한다."""
import functools
import http.server
import sys
import threading
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
import build  # noqa: E402

PORT = 5173


def snapshot():
    files = list((ROOT / "src").glob("*")) + list((ROOT / "data").glob("*.js"))
    return {p: p.stat().st_mtime for p in files}


def watch():
    last = snapshot()
    while True:
        time.sleep(1)
        now = snapshot()
        if now != last:
            last = now
            try:
                build.main()
                print("다시 빌드했습니다. 브라우저를 새로고침하세요.")
            except Exception as e:  # 빌드 오류가 나도 서버는 계속 돈다
                print("빌드 오류:", e)


def main():
    build.main()
    threading.Thread(target=watch, daemon=True).start()
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT / "dist"))
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler) as server:
        print(f"개발 서버: http://localhost:{PORT}  (끄려면 Ctrl+C)")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
