// 빅데이터개론 암기카드 (문제은행과 별개). q=앞면, k=코드, a=뒷면 정답, e=보충 설명
(window.CARDS = window.CARDS || {}).bd = [
  // ── 0장 강의 소개 ──
  {c:0,q:"데이터 파이프라인 5단계를 순서대로 말하고, 단계마다 이 수업에서 쓰는 기술을 짝지어 보세요.",a:"수집 → 저장 → 가공 → 시각화 → 확인",e:"수집 네이버 금융 API · 저장 Turso DB · 가공 파이썬/pandas · 시각화 matplotlib · 확인 텔레그램/Streamlit. 회사 데이터 일도 같은 다섯 칸을 지난다."},
  {c:0,q:"확인 단계에서 결과를 앱이 먼저 보내 주는 방식으로, 텔레그램 알림이 해당하는 것은?",a:"Push",e:"내가 열어서 확인하는 방식은 Pull(Streamlit 웹 대시보드)."},
  {c:0,q:"확인 단계에서 내가 직접 열어서 결과를 보는 방식으로, Streamlit 웹 대시보드가 해당하는 것은?",a:"Pull",e:"보내 주는 방식은 Push(텔레그램)."},

  // ── 1장 환경 세팅·Git/GitHub ──
  {c:1,q:"변경 내용을 내 컴퓨터에만 기록하는 Git 동작은?",a:"Commit",e:"GitHub에는 아직 올라가지 않는다."},
  {c:1,q:"Commit한 기록을 GitHub으로 올리는 VS Code 버튼은?",a:"Sync Changes",e:"Commit만 하고 Sync를 안 하면 GitHub에는 아무것도 없다."},
  {c:1,q:"GitHub(원격)와 내 컴퓨터(로컬)의 관계는?",a:"별개의 사본",e:"서로 자동으로 맞춰지지 않는다."},
  {c:1,q:"이 파일의 첫 줄에 적힌 내용은 무엇을 위한 것일까요?",k:`# 비밀정보 — 절대 커밋하지 말 것
.env`,a:".gitignore — 여기 적힌 파일(.env)은 Git이 추적하지 않아 GitHub에 올라가지 않는다",e:"토큰이 한 번 커밋되면 이력에 남아 되돌릴 수 없다. 그래서 .gitignore를 가장 먼저 만든다."},
  {c:1,q:"아래 두 줄은 각각 무슨 일을 하나요?",k:`git config --global user.name
git config --global user.name "hong-gildong"`,a:"첫 줄은 현재 설정된 이름을 조회, 둘째 줄은 커밋 작성자 이름을 hong-gildong으로 설정",e:"설정하지 않고 커밋하면 ‘Author identity unknown’ 오류가 난다. user.email도 같은 방식으로 설정한다."},
  {c:1,q:"이 한 줄은 무엇을 하고, 라이브러리 7개의 역할은 각각 무엇인가요?",k:`pip install requests python-dotenv pandas matplotlib holidays streamlit libsql-client`,a:"필요한 라이브러리 7개를 한 번에 설치. requests=API 호출, python-dotenv=.env 읽기, pandas=표 처리, matplotlib=그래프, holidays=휴장일, streamlit=웹 대시보드, libsql-client=Turso DB",e:"라이브러리 7개 이름과 역할을 짝으로 외워 두자."},
  {c:1,q:"watchlist.csv의 첫 줄 code,name은 어떤 역할인가요?",k:`code,name
005930,삼성전자
000660,SK하이닉스`,a:"열 이름(헤더). 이후 줄이 데이터 행이다",e:"코드가 쓰는 열은 code 하나뿐이다. pandas가 첫 줄을 열 이름으로 읽는다."},
  {c:1,q:"GitHub에 올릴 때 저장소 이름 입력 후 Enter를 치면 만들어지는 공개 범위는?",a:"private",e:"public은 마우스로 직접 고른다."},
  {c:1,q:"GitHub에 올릴 때 누르지 말아야 하는 VS Code 버튼은?",a:"Initialize Repository",e:"대신 아래 Publish to GitHub를 쓴다. 실수했다면 VS Code 닫기 → .git 삭제 → 다시 열기. 폴더 이름은 영문·숫자로."},

  // ── 2장 텔레그램 봇 ──
  {c:2,q:"이 두 줄은 무슨 일을 하고, 키가 없으면 어떻게 되나요?",k:`load_dotenv()
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")`,a:".env 파일의 값을 환경변수로 읽어 와 토큰을 변수에 담는다. 키가 없으면 오류가 아니라 None이 된다",e:"토큰을 코드에 직접 쓰지 않으려고 .env를 쓴다."},
  {c:2,q:"이 f-string이 만드는 주소의 의미와 보안상 주의점은?",k:`url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getUpdates"`,a:"내 봇이 받은 메시지를 가져오는 API 주소. 주소 안에 토큰이 그대로 들어가므로 노출하면 안 된다",e:"getUpdates = 받은 것 보기, sendMessage = 보내기. 마지막 경로만 바꾸면 기능이 바뀐다."},
  {c:2,q:"이 딕셔너리에서 chat_id, text, parse_mode는 각각 무엇을 정하나요?",k:`data = {"chat_id": TELEGRAM_CHAT_ID, "text": text, "parse_mode": "HTML"}`,a:"chat_id = 누구에게 보낼지, text = 보낼 내용, parse_mode = 메시지를 HTML 서식으로 해석",e:"requests.post(url, data=data)로 이 딕셔너리를 전송한다."},
  {c:2,q:"이 줄에서 timeout=15의 뜻은?",k:`response = requests.post(url, data=data, timeout=15)`,a:"응답을 최대 15초까지만 기다린다 (재시도 횟수가 아니다)",e:"post는 데이터를 보내는 요청, get은 데이터를 가져오는 요청이다."},
  {c:2,q:"이 return 문은 어떤 종류의 값을 돌려주고, 어떤 의미인가요?",k:`return response.status_code == 200`,a:"True/False(불리언). 응답 코드가 200(성공)이면 True",e:"호출부는 if send_telegram_message(...): 로 성공 여부에 따라 다른 문구를 출력한다."},
  {c:2,q:"이 except 블록이 하는 일과 함수가 돌려주는 값은?",k:`except Exception as e:
    print(f"❌ 텔레그램 메시지 전송 중 오류 발생: {e}")
    return False`,a:"전송 중 발생한 오류를 e로 받아 내용을 출력하고 False를 반환해 프로그램이 멈추지 않게 한다",e:"as e = 오류 내용을 e라는 이름으로 받아 둔다."},
  {c:2,q:"아래 출력에서 .env의 TELEGRAM_CHAT_ID에 넣을 숫자와 경로는?",k:`{'ok': True, 'result': [{'update_id': 870512345, 'message':
  {'message_id': 12, 'from': {'id': 987654321, ...},
   'chat': {'id': 123456789, 'first_name': '길동', 'type': 'private'},
   'date': 1757030400, 'text': '안녕'}}]}`,a:"123456789 — result → message → chat → id",e:"from.id(987654321)와 헷갈리지 말 것. 'result': [] 로 비어 있으면 오류가 아니라 봇에게 먼저 메시지를 안 보낸 것이다."},
  {c:2,q:"아래 두 줄 중 값이 제대로 읽히지 않는 것은 무엇이고 왜 그런가요?",k:`TELEGRAM_BOT_TOKEN=123456:ABCdef
TELEGRAM_BOT_TOKEN=“123456:ABCdef”`,a:"두 번째 줄 — 둥근(스마트) 따옴표가 값에 그대로 포함돼 토큰이 틀어진다",e:"401 = 토큰 값이 틀림, 404 = .env를 못 읽음."},
  {c:2,q:"텔레그램 토큰이 노출됐을 때 새 토큰을 발급받는 BotFather 명령어는?",a:"/revoke",e:"지우는 것이 아니라 바꾼다."},
  {c:2,q:"토큰을 재발급해도 바꿀 필요가 없는 .env 값은?",a:"TELEGRAM_CHAT_ID",e:"chat id는 토큰과 무관하다."},

  // ── 3장 API로 현재가 ──
  {c:3,q:"이 네 줄이 하는 일과 마지막 print가 긴 딕셔너리를 쏟아내는 이유는?",k:`import requests
url = "https://m.stock.naver.com/api/stock/005930/basic"
response = requests.get(url)
data = response.json()
print(data)`,a:"네이버 금융 API에서 삼성전자 정보를 받아 JSON을 딕셔너리로 바꿔 출력한다. 응답 안에 필드가 많아서 길게 나오는 것이 정상",e:"인증키가 필요 없다. 쓰는 필드: stockName, closePrice, fluctuationsRatio, marketStatus, localTradedAt."},
  {c:3,q:"closePrice를 2배 하면 어떤 값이 나오고 그 이유는? (closePrice가 \"223,000\")",k:`print(data["closePrice"] * 2)`,a:"\"223,000223,000\" — 문자열이라서 숫자 곱이 아니라 문자열 반복이 된다",e:"closePrice는 콤마가 들어간 문자열이다. 계산하려면 콤마를 지우고 int로 바꿔야 한다."},
  {c:3,q:"이 두 줄이 하는 일은? 한 줄을 빼면 어떻게 되나요?",k:`price_str = data["closePrice"].replace(",", "")  # "223000"
price = int(price_str)                           # 223000`,a:"문자열에서 콤마를 지우고 정수로 변환한다. replace를 빼고 int()에 넣으면 ValueError",e:"장중에는 closePrice가 현재가, 장 마감 후에는 종가다."},
  {c:3,q:"이 for 문과 retries=2는 무슨 뜻인가요?",k:`def fetch_naver_current_price(code: str, retries: int = 2) -> dict:
    for attempt in range(1, retries + 1):`,a:"최대 2번까지 조회를 시도한다 (1번째, 2번째 시도)",e:"timeout=3은 한 번의 요청을 3초까지만 기다린다는 뜻이다. 둘은 다른 개념."},
  {c:3,q:"이 두 줄은 왜 필요할까요?",k:`if attempt < retries:
    time.sleep(1)`,a:"마지막 시도가 아니면 1초 쉰 뒤 재시도 — 서버에 연달아 요청하지 않으려고 간격을 둔다",e:"마지막 시도 뒤에는 쉴 필요가 없어서 attempt < retries 조건이 붙는다."},
  {c:3,q:"조회에 모두 실패했을 때 0원 대신 None을 반환하는 이유와 호출부 코드의 의미는?",k:`info = fetch_naver_current_price(STOCK_CODE)
if info is None:
    print("❌ 현재가를 가져오지 못했습니다.")`,a:"0원은 실제 값처럼 보이지만 None은 ‘실패’를 분명히 구분한다. 호출부는 is None으로 실패를 걸러 낸다",e:"None 비교는 == 보다 is None이 관례."},
  {c:3,q:"format_rate_badge(208500, 1.24)가 돌려주는 문자열은?",k:`def format_rate_badge(price: int, rate: float) -> str:
    prefix = f"{price:,}원"
    if rate > 0:
        return f"{prefix} 🔺 +{rate}%"
    if rate < 0:
        return f"{prefix} ▼ {rate}%"
    return f"{prefix} ▫️ 0.0%"`,a:"\"208,500원 🔺 +1.24%\"",e:"{price:,}의 콤마는 천 단위 구분 기호. 상승 🔺 + / 하락 ▼ − / 보합 ▫️ 0.0%."},
  {c:3,q:"이 한 줄의 결과가 담기는 키 이름과 판단 기준은?",k:`"is_open": data.get("marketStatus") == "OPEN",`,a:"marketStatus가 \"OPEN\"이면 장이 열려 있다고 보고 True를 is_open에 담는다",e:"비교 결과(True/False)가 그대로 값이 된다."},
  {c:3,q:"삼성전자를 조회할 때 완성되는 실제 API 주소는?",k:`url = f"https://m.stock.naver.com/api/stock/{code}/basic"`,a:"https://m.stock.naver.com/api/stock/005930/basic",e:"{code} 자리에 종목코드가 들어간다. 확인 순서: ① API 호출(print(data)) → ② 텔레그램 전송."},

  // ── 4장 파이썬 문법 읽기 ──
  {c:4,q:"data.get(\"closePrice\", \"0\")과 data[\"closePrice\"]의 차이는?",k:`price_str = data.get("closePrice", "0").replace(",", "")
price_str = data["closePrice"]`,a:"[ ]는 키가 없으면 KeyError로 멈추고, .get(키, 기본값)은 키가 없을 때 기본값을 돌려준다",e:"dict.get은 이 코드에서 12회로 가장 자주 쓰였다. 기본값은 키가 없을 때만 쓰인다."},
  {c:4,q:"이 for 문 첫 줄의 쉼표와 items()는 무슨 뜻인가요?",k:`for code, info in current_prices.items():`,a:"딕셔너리에서 (키, 값) 짝을 하나씩 꺼내 code와 info로 나눠 받는다(언패킹)",e:"쉼표 = 짝으로 온 것을 나눠 받는 중이라는 표시."},
  {c:4,q:"이 데코레이터와 ttl=\"1m\"은 무슨 뜻인가요?",k:`@st.cache_data(ttl="1m")
def cached_current_price(code):
    return fetch_naver_current_price(code)`,a:"함수 결과를 1분 동안 저장해 같은 호출이 오면 다시 계산하지 않고 재사용한다",e:"ttl = Time To Live. 1m은 1개월이 아니라 1분."},
  {c:4,q:"이 한 줄은 무엇을 만드나요?",k:`watchlist_df.columns = [c.strip().lower() for c in watchlist_df.columns]`,a:"열 이름의 좌우 공백을 지우고 소문자로 바꾼 새 리스트를 만들어 기존 열 이름에 덮어쓴다",e:"리스트 컴프리헨션 한 줄. 대소문자·공백 때문에 열을 못 찾는 문제를 막는다."},
  {c:4,q:"with … as 블록의 장점은?",k:`with get_turso_client() as client:
    result = client.execute("SELECT code, date, close FROM …")`,a:"블록이 끝나면(오류가 나도) 연결을 자동으로 닫아 준다",e:"파일·DB 연결처럼 열고 닫아야 하는 자원에 쓴다."},
  {c:4,q:"이 코드가 만드는 결과는?",k:`dict(zip(["005930", "000660"], ["삼성전자", "SK하이닉스"]))`,a:"{\"005930\": \"삼성전자\", \"000660\": \"SK하이닉스\"} — 코드를 키, 종목명을 값으로 하는 딕셔너리",e:"zip은 두 목록을 같은 순서끼리 짝지어 준다."},
  {c:4,q:"date[4:6]은 무엇을 찍나요?",k:`date = "20260722"
print(date[4:6])`,a:"\"07\" — 인덱스 4 이상 6 미만, 즉 월 부분",e:"[6:]은 \"22\". 라벨은 f\"{date[4:6]}/{date[6:]}\" = \"07/22\"."},
  {c:4,q:"setdefault가 하는 일을 설명해 보세요.",k:`history.setdefault(code, []).append({"date": date, "close": close})`,a:"code 키가 없으면 빈 리스트를 만들어 넣고, 있으면 기존 리스트를 그대로 돌려준 뒤 그 리스트에 append한다",e:"기존 값을 덮어쓰지 않는 것이 핵심."},
  {c:4,q:"각 줄은 무엇을 출력하나요?",k:`print([] or "기본값")
print(0 if [] else 1)`,a:"\"기본값\" 과 1",e:"거짓으로 보는 값: 0, 빈 문자열, 빈 리스트, 빈 딕셔너리. 삼항은 가운데(조건) → 앞(참) → 뒤(거짓) 순서로 읽는다."},
  {c:4,q:"or \"0\"은 어떤 경우에 실제로 일을 하나요?",k:`float(data.get("fluctuationsRatio", "0") or "0")`,a:"값이 빈 문자열일 때 — 키가 없는 경우는 .get의 기본값이 처리한다",e:"float(\"\")은 오류이므로 빈 문자열을 \"0\"으로 바꿔 막는다."},
  {c:4,q:"중괄호 컴프리헨션에서 dict와 set은 어떻게 구분하나요? 아래 코드는 어느 쪽?",k:`{f.name for f in font_manager.fontManager.ttflist}`,a:"콜론(:)이 있으면 dict, 없으면 set. 위 코드는 콜론이 없으므로 set(집합)",e:"리스트 [ ] 순서·중복 O / 집합 { } 순서·중복 X / 딕셔너리 {키: 값} 키 중복 X."},
  {c:4,q:"이 코드에서 e에는 무엇이 담기고, 라벨은 어떤 모양인가요?",k:`daily_labels = [f"{e['date'][4:6]}/{e['date'][6:]}" for e in daily_closes]`,a:"e는 daily_closes의 항목(날짜·종가가 담긴 딕셔너리) 하나. 라벨은 \"MM/DD\" 형태",e:"날짜 문자열을 슬라이싱해서 월/일로 바꾼다."},
  {c:4,q:"삼항 연산자로 쓴 이 한 줄을 말로 풀어 보세요.",k:`return price if (is_open or intraday_minutes or not daily_closes) else None`,a:"장이 열려 있거나 분 단위 자료가 있거나 일별 종가가 없으면 price를 반환하고, 아니면 None을 반환한다",e:"조건이 참이면 앞의 값, 거짓이면 뒤의 값."},

  // ── 5장 pandas·matplotlib ──
  {c:5,q:"DataFrame과 Series의 차이, 그리고 .tolist()의 역할은?",k:`codes = watchlist_df["code"].tolist()
print(codes)`,a:"DataFrame = 표 전체, Series = 열 하나. tolist()는 Series를 평범한 파이썬 리스트로 바꾼다",e:"tolist()를 빼면 Series가 그대로 출력된다."},
  {c:5,q:"dtype 없이 read_csv로 읽으면 종목코드가 어떻게 되나요? 해결법은?",k:`watchlist_df = pd.read_csv("watchlist.csv")
watchlist_df = pd.read_csv("watchlist.csv", dtype={"code": str})`,a:"005930이 숫자 5930으로 읽혀 앞의 0이 사라진다(오류 없이). dtype={\"code\": str}로 문자열로 읽으면 해결",e:"5930으로 조회하면 네이버는 409를 돌려준다. 엑셀로 저장하면 파일 값 자체가 바뀌니 VS Code·메모장으로 편집한다."},
  {c:5,q:"이 다섯 줄이 만드는 것은?",k:`import matplotlib.pyplot as plt
prices = [71000, 70500, 71800, 72400, 71900]
fig, ax = plt.subplots()
ax.plot(prices)
fig.savefig("my_first_chart.png")`,a:"가격 5개를 꺾은선으로 그린 my_first_chart.png 이미지 파일",e:"흐름: subplots → plot → annotate → savefig."},
  {c:5,q:"matplotlib에서 도화지에 해당하며 저장(savefig)을 담당하는 객체는?",a:"fig",e:"그리는 곳은 ax."},
  {c:5,q:"matplotlib에서 실제로 그래프를 그리는 좌표축 객체는?",a:"ax",e:"흐름: subplots → plot → annotate → savefig."},
  {c:5,q:"ax.plot(prices)와 ax.plot(days, prices)의 차이는?",k:`ax.plot(prices)
ax.plot(days, prices)`,a:"앞은 x축이 0,1,2…(순번) 자동, 뒤는 x축을 days 값으로 지정",e:"annotate의 xytext=(0, 8)은 점에서 위로 8포인트 띄운 위치에 글자를 놓는다는 뜻."},
  {c:5,q:"이 반복문이 그래프에 하는 일은?",k:`for i, p in enumerate(prices):
    ax.annotate(f"{p:,}", (i, p), textcoords="offset points", xytext=(0, 8), ha="center")`,a:"각 점 위에 천 단위 콤마가 붙은 가격 글자를 점에서 8포인트 위, 가운데 정렬로 표시한다",e:"enumerate는 (순번, 값)을 함께 돌려준다."},
  {c:5,q:"봇·서버처럼 화면이 없는 환경에서 plt.show() 대신 그래프를 파일로 남기는 메서드는?",a:"fig.savefig()",e:"창을 띄울 화면이 없다."},
  {c:5,q:"한글이 네모로 깨지지 않으려면 폰트를 언제 설정해야 하는가?",a:"그래프를 그리기 전",e:"윈도우 Malgun Gothic, 맥 AppleGothic."},

  // ── 6장 관심종목 전부가 온다 ──
  {c:6,q:"함수 정의의 path: str = WATCHLIST_FILE는 무슨 뜻이고, 인자 없이 호출하면 어떻게 되나요?",k:`def read_watchlist(path: str = WATCHLIST_FILE) -> list:`,a:"path의 기본값이 WATCHLIST_FILE이라서 인자 없이 호출해도 오류가 없고 기본 파일을 읽는다",e:"실패하면(파일 없음·code 열 없음·읽기 오류) None을 반환한다."},
  {c:6,q:"continue 자리에 break를 쓰면 어떻게 달라지나요?",k:`for code in watchlist_codes:
    info = fetch_naver_current_price(code)
    if info is None:
        continue`,a:"continue는 그 종목만 건너뛰고 다음 종목을 계속 처리하지만, break는 반복을 끝내 뒤 종목이 모두 빠진다",e:"모든 종목이 실패해 found == 0이면 그때 실패로 처리한다."},
  {c:6,q:"이 블록을 통째로 지우고 python notify_stock_price.py로 실행하면 어떻게 될까요?",k:`if __name__ == "__main__":
    send_price_notification()`,a:"아무 일도 일어나지 않는다 — 함수는 정의만 되고 호출되지 않는다",e:"이 조건은 파일을 직접 실행할 때만 참이다. import 되는 경우에는 실행되지 않는다."},
  {c:6,q:"종목별 메시지를 한 통으로 보내려면 어떻게 이어 붙이나요?",k:`message = ""
for code in watchlist_codes:
    message += f"📈 {name} ({code})\\n"`,a:"+= 로 문자열을 계속 이어 붙인 뒤 반복이 끝나고 한 번만 전송한다",e:"6장의 진짜 학습은 리팩터링(코드를 함수로 묶기). 파일 나누기는 9장."},
  {c:6,q:"종가가 정해지는 동시호가 시간대는?",a:"15:20~15:30",e:"정규장은 09:00~15:30. 장 마감 후 closePrice는 종가, 장중에는 현재가."}
];
