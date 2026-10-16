// Vercel 미들웨어: 비밀번호를 입력해야 퀴즈 페이지에 들어갈 수 있게 한다.
// 비밀번호는 코드에 적지 않고 Vercel 환경변수 QUIZ_PASSWORD 로 넣는다(공개 저장소라서).
// 맞게 입력하면 30일 동안 유지되는 쿠키를 준다.

export const config = { matcher: "/:path*" };

const COOKIE = "quiz_auth";
const LOGIN_PATH = "/__login";

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// 쿠키에는 비밀번호 자체가 아니라 해시만 담는다
function tokenFor(password) {
  return sha256("midterm-quiz:" + password);
}

function readCookie(request, name) {
  const raw = request.headers.get("cookie") || "";
  const hit = raw.split(/;\s*/).find((c) => c.startsWith(name + "="));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null;
}

function loginPage(message) {
  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>중간고사 퀴즈</title>
<style>
:root{--bg:#f4f6fa;--card:#fff;--text:#1c2230;--sub:#687083;--line:#e2e6ee;--primary:#3d6df2;--ng:#e5484d}
@media (prefers-color-scheme:dark){:root{--bg:#12151b;--card:#1b1f27;--text:#e9ecf2;--sub:#9aa2b2;--line:#2c3240;--primary:#6b8ff7;--ng:#ff6b6f;color-scheme:dark}}
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--bg);color:var(--text);
font-family:"Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif;padding:16px}
form{width:100%;max-width:340px;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:14px}
h1{margin:0;font-size:20px}p{margin:0;color:var(--sub);font-size:14px}
input{font:inherit;font-size:22px;letter-spacing:.3em;text-align:center;padding:12px;border:1px solid var(--line);border-radius:12px;background:var(--bg);color:var(--text)}
input:focus{outline:2px solid var(--primary);outline-offset:1px}
button{font:inherit;font-size:16px;font-weight:700;height:50px;border:0;border-radius:12px;background:var(--primary);color:#fff;cursor:pointer}
.err{color:var(--ng);font-size:14px}
</style></head><body>
<form method="post" action="${LOGIN_PATH}">
<h1>중간고사 퀴즈</h1><p>비밀번호를 입력하세요.</p>
<label for="pw" style="position:absolute;left:-9999px">비밀번호</label>
<input id="pw" name="password" type="password" inputmode="numeric" autocomplete="current-password" autofocus required>
${message ? `<span class="err">${message}</span>` : ""}
<button type="submit">들어가기</button>
</form></body></html>`;
  return new Response(html, {
    status: 401,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}

export default async function middleware(request) {
  const password = process.env.QUIZ_PASSWORD;
  if (!password) {
    return new Response("QUIZ_PASSWORD 환경변수가 설정되지 않았습니다.", { status: 500 });
  }
  const url = new URL(request.url);
  const expected = await tokenFor(password);

  // 로그인 폼 제출
  if (url.pathname === LOGIN_PATH && request.method === "POST") {
    const form = await request.formData();
    if (String(form.get("password") || "") === password) {
      return new Response(null, {
        status: 303,
        headers: {
          location: "/",
          "set-cookie": `${COOKIE}=${expected}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }
    return loginPage("비밀번호가 틀렸습니다.");
  }

  // 이미 로그인했으면 그대로 통과
  if (readCookie(request, COOKIE) === expected) return;

  return loginPage("");
}
