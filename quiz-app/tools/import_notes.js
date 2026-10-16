// 요약정리 HTML의 장별 요약을 표·코드·강조 상자까지 그대로 가져와 data/<과목>.notes.js로 저장한다.
// 허용한 태그와 클래스만 남기고(스크립트·이벤트·인라인 스타일 제거), 잘린 태그는 짝을 맞춘다.
// 사용법: node tools/import_notes.js <자료 폴더>
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = process.argv[2];

const FILES = {
  ca: "컴퓨터구조_시험_요약정리.html",
  ai: "인공지능기초_시험_요약정리.html",
  bd: "bigd.html",
  ds: "자료구조_시험_요약정리.html",
  py: "데이터과학을위한파이썬 중간.html"
};

// 장 머리말: 장 번호 배지 + 제목이 들어 있는 div
const HEAD_RE = /<div class="(?:wk|wk-head|ch-head|week-head)">([\s\S]*?)<\/div>/g;

// 남길 태그와, 원본 클래스 → 앱 클래스 변환
const ALLOWED = new Set(["p", "ul", "ol", "li", "table", "thead", "tbody", "tr", "th", "td", "b", "strong", "em", "i", "code", "pre", "br", "span", "div", "small", "sup", "sub", "h2", "h3", "h4", "h5"]);
const VOID = new Set(["br"]);
const CLASS_MAP = [
  [/\bstar-box\b/, "n-star"],
  [/\bnote-box\b/, "n-note"],
  [/^hl-red$/, "n-red"],
  [/^hl$/, "n-hl"],
  [/\b(sec|sec-title|sb-title|st|t|tt|lb|lbl|nl|note-label|sb|kw)\b/, "n-sub"],
  [/\b(bd|star-tag|star-badge)\b/, "n-badge"],
  [/^fm$/, "n-formula"],
  [/\bsbox\b|\bcard\b/, "n-box"]
];
const HEADING = { h2: "h4", h3: "h4", h4: "h5", h5: "h5" };

function mapClass(cls) {
  if (!cls) return "";
  for (const [re, out] of CLASS_MAP) if (re.test(cls)) return out;
  return "";
}

// 간단한 토크나이저로 허용 태그만 다시 쓰고, 열고 닫기 짝을 맞춘다
function sanitize(html) {
  html = html.replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|button|svg)[\s\S]*?<\/\1>/gi, "");
  const out = [];
  const stack = [];
  const re = /<\/?([a-zA-Z0-9]+)([^>]*)>|([^<]+)/g;
  let m;
  while ((m = re.exec(html))) {
    if (m[3] !== undefined) { out.push(m[3]); continue; }
    const closing = m[0][1] === "/";
    let tag = m[1].toLowerCase();
    if (!ALLOWED.has(tag)) continue;
    const outTag = HEADING[tag] || tag;
    if (closing) {
      const i = stack.lastIndexOf(outTag);
      if (i < 0) continue; // 짝 없는 닫는 태그는 버린다
      while (stack.length > i) {
        const t = stack.pop();
        out.push("</" + t + ">");
        if (t === "table") out.push("</div>");
      }
      continue;
    }
    const cls = mapClass((m[2].match(/class="([^"]*)"/) || [])[1]);
    if (tag === "table") out.push('<div class="n-tbl">');
    out.push("<" + outTag + (cls ? ' class="' + cls + '"' : "") + ">");
    if (!VOID.has(tag) && !/\/\s*$/.test(m[2])) stack.push(outTag);
  }
  while (stack.length) {
    const t = stack.pop();
    out.push("</" + t + ">");
    if (t === "table") out.push("</div>");
  }
  return out.join("")
    .replace(/<(p|li|div|span|b)( class="[^"]*")?>\s*<\/\1>/g, "") // 빈 요소 정리
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

for (const [id, file] of Object.entries(FILES)) {
  let html = fs.readFileSync(path.join(SRC, file), "utf8");
  html = html.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<script[\s\S]*?<\/script>/gi, "");
  const heads = [...html.matchAll(HEAD_RE)];
  // 장 요약이 끝나는 곳: 예상문제(화면 전용) 영역이 시작되는 지점
  const firstHead = heads.length ? heads[0].index : 0;
  const endAt = html.indexOf("screen-only", firstHead);
  const stop = endAt > 0 ? html.lastIndexOf("<", endAt) : html.length;

  global.BANK = [];
  eval(fs.readFileSync(path.join(ROOT, "data", id + ".js"), "utf8"));
  const chapters = BANK[0].chapters;

  const notes = {};
  heads.forEach((h, i) => {
    if (h.index >= stop) return;
    const badge = (h[1].match(/<span[^>]*>([\s\S]*?)<\/span>/) || [])[1] || "";
    const num = (badge.match(/\d+/) || [])[0];
    if (num === undefined) return;
    const ch = String(Number(num));
    if (!(ch in chapters)) { console.log(`  ${id}: ${ch}장은 문제은행에 없는 장이라 건너뜀`); return; }
    const start = h.index + h[0].length;
    const end = Math.min(i + 1 < heads.length ? heads[i + 1].index : stop, stop);
    const body = sanitize(html.slice(start, end));
    if (body.replace(/<[^>]+>/g, "").trim().length < 20) return;
    notes[ch] = body;
  });

  const out = "// 요약정리 HTML의 장별 요약 (tools/import_notes.js로 생성)\n" +
    "BANK.find(b => b.id === \"" + id + "\").notesHtml = " + JSON.stringify(notes, null, 1) + ";\n";
  fs.writeFileSync(path.join(ROOT, "data", id + ".notes.js"), out);
  const sizes = Object.entries(notes).map(([c, s]) => c + "장 " + Math.round(s.length / 100) / 10 + "k");
  console.log(id, "장", Object.keys(notes).length, "/", Object.keys(chapters).length, "·", sizes.join(", "));
}
