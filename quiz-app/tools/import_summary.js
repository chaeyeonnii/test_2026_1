// 요약정리 HTML의 예상문제를 원문 그대로 가져와 data/<과목>.sum.js로 저장하고,
// 기존 문제은행에서 같은 내용을 다듬어 옮긴 문항은 지운다(중복 방지).
// 사용법: node tools/import_summary.js <자료 폴더>
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = process.argv[2];
const CIRCLED = ["①", "②", "③", "④", "⑤"];

const unesc = s => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#x27;/g, "'").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
const text = s => unesc(s.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "")).replace(/[ \t]+\n/g, "\n").trim();

// ── 컴퓨터구조: <div class="q"> 블록 ──
function parseCa(html) {
  const start = html.indexOf("<h2>③ 예상문제");
  const end = html.indexOf("<h2>컴퓨터구조 · 답안지");
  const chunks = html.slice(start, end).split('<div class="q">');
  const out = [];
  let sec = (chunks[0].match(/<span class="qsec (\w+)">/) || [])[1] || "ox";
  chunks.slice(1).forEach(b => {
    const qt = (b.match(/<div class="qt">([\s\S]*?)<\/div>/) || [])[1] || "";
    const star = /★★★/.test(qt);
    const q = text(qt.replace(/<span class="qn">.*?<\/span>/, "").replace(/<span class="qtag">.*?<\/span>/, ""));
    const org = text((b.match(/<span class="src">([\s\S]*?)<\/span>/) || [])[1] || "");
    const code = (b.match(/<pre class="qcode">([\s\S]*?)<\/pre>/) || [])[1];
    const box = (b.match(/<div class="choices">([\s\S]*?)<\/div><\/div>/) || [])[1] || "";
    const choices = box.split("<div>").slice(1).map(x => text(x).replace(/^[①②③④⑤]\s*/, "")).filter(Boolean);
    const ans = b.match(/<b class="a">정답:\s*([\s\S]*?)<\/b><br>([\s\S]*?)<\/div>/);
    if (q && ans) out.push(build(sec, q, code && unesc(code), choices, text(ans[1]), text(ans[2]), star, org));
    // 이 블록 뒤에 다음 구간 제목이 있으면 유형을 바꾼다
    const next = b.match(/<span class="qsec (\w+)">/);
    if (next) sec = next[1];
  });
  return out;
}

// ── 인공지능기초: <div class="qitem"> 블록 ──
function parseAi(html) {
  const s = html.indexOf('<section class="page screen-only questions">');
  const body = html.slice(s, html.indexOf("</section>", s));
  const out = [];
  const items = body.split(/<div class="qitem /).slice(1);
  items.forEach(raw => {
    const sec = raw.slice(0, raw.indexOf('"'));
    const qt = (raw.match(/<div class="qtext">([\s\S]*?)<\/div>/) || [])[1] || "";
    const q = text(qt.replace(/<span class="qno">.*?<\/span>/, "")).replace(/\(\s*\)\s*$/, "").trim();
    const opts = [...raw.matchAll(/<(?:li|div)[^>]*>\s*([①②③④][\s\S]*?)<\/(?:li|div)>/g)].map(x => text(x[1]).replace(/^[①②③④]\s*/, ""));
    const ra = text((raw.match(/<div class="ra">([\s\S]*?)<\/div>/) || [])[1] || "").replace(/^(정답|모범 답안)\s*:\s*/, "");
    const ex = text((raw.match(/<div class="ex">([\s\S]*?)<\/div>/) || [])[1] || "");
    if (!q || !ra) return;
    out.push(build(sec, q, null, opts, ra, ex, false, ""));
  });
  return out;
}

// ── 자료구조·파이썬: 스크립트 안의 문항 배열 ──
function parseJsData(html, kind) {
  const js = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).join("\n");
  const out = [];
  if (kind === "ds") {
    const DATA = eval("(()=>{" + js.split("const META")[0] + ";return DATA})()");
    for (const [sec, list] of Object.entries(DATA)) list.forEach(it => {
      const choices = it.c || [];
      const a = sec === "mc" ? CIRCLED[it.a - 1] + " " + choices[it.a - 1] : it.a;
      out.push(build(sec, it.q, null, choices, a, it.e, false, ""));
    });
  } else {
    const d = eval("(()=>{" + js.split("/* ── 렌더링")[0] + ";return {ox:OX,mc:MC,sa:SA,fb:FB}})()");
    for (const [sec, list] of Object.entries(d)) list.forEach(it => {
      out.push(build(sec, text(it.q), null, (it.o || []).map(text), text(it.a), text(it.e), false, ""));
    });
  }
  return out;
}

// 원문 형식 → 문제은행 형식
function build(sec, q, code, choices, ans, exp, star, org) {
  const t = { ox: "ox", mc: "mc", mcq: "mc", short: "sa", sa: "sa", fb: "bl", fill: "bl", blank: "bl" }[sec] || "sa";
  const it = { t, q };
  if (code) it.k = code.replace(/\s+$/, "");
  if (t === "mc") {
    it.o = choices;
    const i = CIRCLED.findIndex(c => ans.trim().startsWith(c));
    it.a = i;
  } else if (t === "ox") {
    it.a = ans.trim().startsWith("O") ? "O" : "X";
  } else {
    it.a = ans;
  }
  it.e = exp || "";
  if (star) it.s = 1;
  if (org) it.org = org;
  it.src = "요약정리";
  return it;
}

// ── 기존 문항과 대조 ──
const strip = s => String(s).replace(/[\s`'"“”‘’().,:;?!\-①②③④⑤]/g, "");
const big = s => { s = strip(s); const r = new Set(); for (let i = 0; i < s.length - 1; i++) r.add(s.slice(i, i + 2)); return r; };
const sim = (a, b) => { const A = big(a), B = big(b); let n = 0; for (const x of A) if (B.has(x)) n++; return n / Math.max(1, Math.min(A.size, B.size)); };

// 대조로 장을 못 찾은 문항은 직접 지정
const MANUAL_CH = {
  "함수 수행을 마치고 결과 값을 전달할 때": 6,
  "스택(Stack)의 확장 방향": 6,
  "입출력 장치를 프로세서가 접근하는 방법": 7,
  "배열이나 리스트의 중간 삽입·삭제 시간복잡도": 5
};

const SOURCES = {
  ca: ["컴퓨터구조_시험_요약정리.html", parseCa],
  ai: ["인공지능기초_시험_요약정리.html", parseAi],
  ds: ["자료구조_시험_요약정리.html", h => parseJsData(h, "ds")],
  py: ["데이터과학을위한파이썬 중간.html", h => parseJsData(h, "py")]
};

for (const [id, [file, parse]] of Object.entries(SOURCES)) {
  const html = fs.readFileSync(path.join(SRC, file), "utf8");
  const sumQs = parse(html);
  const dataPath = path.join(ROOT, "data", id + ".js");
  let src = fs.readFileSync(dataPath, "utf8");
  global.BANK = [];
  eval(src);
  const mine = BANK[0].qs.filter(q => q.src !== "요약정리");
  const drop = new Set();
  sumQs.forEach(sq => {
    let best = 0, bq = null;
    mine.forEach(q => { const s = sim(sq.q + (sq.k || ""), q.q + (q.k || "")); if (s > best) { best = s; bq = q; } });
    const manual = Object.entries(MANUAL_CH).find(([k]) => sq.q.includes(k));
    if (manual) sq.c = manual[1];
    else if (bq && best >= 0.45) sq.c = bq.c;
    else { sq.c = Object.keys(BANK[0].chapters)[0]; console.log("  장 미확인:", sq.q.slice(0, 40)); }
    if (bq && best >= 0.5 && !drop.has(bq)) { drop.add(bq); if (bq.s) sq.s = 1; }
  });
  // 겹치는 기존 문항 줄 삭제 (문항은 한 줄에 하나)
  let removed = 0;
  const lines = src.split("\n").filter(line => {
    for (const q of drop) {
      if (line.includes("q:" + JSON.stringify(q.q)) && (!q.k || line.includes(JSON.stringify(q.k)))) { removed++; drop.delete(q); return false; }
    }
    return true;
  });
  fs.writeFileSync(dataPath, lines.join("\n"));
  // 원문 문항 파일 쓰기
  const body = sumQs.map(q => "  " + JSON.stringify(q)).join(",\n");
  fs.writeFileSync(path.join(ROOT, "data", id + ".sum.js"),
    "// 요약정리 HTML 예상문제 원문 (tools/import_summary.js로 생성)\n" +
    "BANK.find(b => b.id === \"" + id + "\").qs.push(\n" + body + "\n);\n");
  console.log(id, "원문", sumQs.length, "· 겹쳐서 지운 기존 문항", removed, "/", drop.size);
}
