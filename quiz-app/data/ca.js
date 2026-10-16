// 컴퓨터구조 문제은행
// 출처: 컴퓨터구조.pdf, 컴퓨터구조_시험_요약정리.html (2024·2025 기출 반영), 2018~2025 중간고사 시험지
// 형식: t=유형(ox|mc|sa|bl), c=장, q=문제, k=코드블록, o=보기, a=정답, e=해설, s=1이면 빈출
BANK.push({
  id: "ca",
  name: "컴퓨터구조",
  short: "컴구조",
  line: "2",
  chapters: {
    1: "어셈블리 언어·피연산자",
    2: "기계어",
    3: "논리·시프트·상수",
    4: "분기와 제어문",
    5: "배열과 ASCII",
    6: "프로시저와 스택",
    7: "프로그램 실행·메모리 맵",
    8: "마이크로아키텍처·성능",
    9: "단일 사이클 데이터패스"
  },
  notes: {
    1: [
      "아키텍처 = 프로그래머 관점(명령어 집합 + 피연산자 위치). 마이크로아키텍처 = 그걸 하드웨어로 <b>어떻게 구현</b>할지",
      "피연산자 출처 3가지: 레지스터 / 메모리 / 상수(즉치)",
      "MIPS: 32비트 레지스터 32개 → 32비트 아키텍처. $0은 항상 0",
      "$v0–$v1 반환값 · $a0–$a3 인자 · $t 임시 · $s 저장 · $sp 29 · $ra 31",
      "lw = 메모리 → 레지스터, sw = 레지스터 → 메모리. 주소 = base + offset",
      "바이트 주소 지정: 워드 n의 주소 = n × 4 (워드 10 → 40 = 0x28)",
      "리틀엔디안: LSB 쪽부터 바이트 번호 / 빅엔디안: MSB 쪽부터",
      "즉치는 16비트 2의 보수 → subi 없음, addi에 음수",
      "syscall: $v0=1 정수 출력($a0) · 4 문자열 출력 · 5 정수 입력 · 8 문자열 입력 · 9 sbrk · 10 종료"
    ],
    2: [
      "명령어는 모두 32비트. 형식 3가지: R / I / J",
      "R: op(6) rs(5) rt(5) rd(5) shamt(5) funct(6)",
      "I: op(6) rs(5) rt(5) imm(16) · J: op(6) addr(26)",
      "어셈블리 순서: add rd, rs, rt / addi rt, rs, imm / lw rt, imm(rs)",
      "opcode: R-type 0 (add funct 32, sub funct 34) · addi 8 · lw 35 · sw 43",
      "해석 순서: opcode 먼저 → 0이면 funct로 판별",
      "저장 프로그램: 명령어·데이터 모두 메모리. PC가 현재 명령어 추적. 시작 0x00400000, +4씩"
    ],
    3: [
      "and = 마스킹, or = 결합, nor = 반전 (A NOR $0 = NOT A)",
      "andi·ori·xori 즉치는 <b>0 확장</b> (부호 확장 아님)",
      "sll·srl·sra는 R-type. 왼쪽 n칸 = ×2ⁿ",
      "32비트 상수 = lui(상위 16비트, 하위 0) + ori(하위 16비트)",
      "mult: 64비트 결과 → hi(상위)·lo(하위) · div: 몫 lo, 나머지 hi"
    ],
    4: [
      "조건 분기 beq·bne / 무조건 j·jr·jal",
      "어셈블리는 고급 언어 조건의 <b>반대</b>를 검사 (if i==j → bne)",
      "slt $t1,$s0,$t0 → $s0 < $t0 이면 1",
      "분기 주소 = (PC + 4) + offset × 4",
      "레이블은 콜론(:)으로 끝남, 예약어 불가"
    ],
    5: [
      "array[i] 주소 = base + 4 × i → sll $t0,$s1,2로 i×4",
      "base 0x12348000이면 array[3] = 0x1234800C",
      "ASCII: 대·소문자 차이 0x20(32). A = 0x41, a = 0x61"
    ],
    6: [
      "호출 jal, 복귀 jr $ra, 인자 $a0–$a3, 반환 $v0",
      "jal = PC+4를 $ra에 저장 후 점프 (0x00400200 jal → $ra 0x00400204)",
      "스택 = LIFO, 높은 주소 → 낮은 주소로 성장. $sp가 top",
      "레지스터 3개 저장: addi $sp,$sp,-12 → sw … → lw … → addi $sp,$sp,12",
      "중첩 호출은 $ra를 스택에 저장하지 않으면 덮어써져 복귀 불가"
    ],
    7: [
      "Compiler → Assembler → Linker → Loader",
      "메모리 맵: Text 0x00400000 · Static 0x10000000 · Heap 0x10010000(위로) · Stack 0x7FFFFFFC(아래로)",
      "전역 변수는 $gp 기준 접근"
    ],
    8: [
      "구현 방식: 단일 사이클 / 다중 사이클 / 파이프라인(여러 명령 동시 실행)",
      "실행 시간 = 명령어 수 × CPI × 클럭 주기",
      "IPC = 1/CPI, 클수록 좋다",
      "아키텍처 상태: PC, 레지스터 32개, 메모리",
      "상태 요소: PC · 명령어 메모리 · 레지스터 파일 · 데이터 메모리"
    ],
    9: [
      "lw 6단계: Fetch → rs 읽기 → 즉치 부호확장 → 주소 계산(ALU 010 덧셈) → 메모리 읽어 rt에 쓰기(RegWrite 1) → PC+4",
      "Logisim: 둘 중 하나 선택 = MUX, 명령어 필드 쪼개기 = Splitter",
      "beq 제어신호: RegWrite 0, RegDst X, ALUSrc 0, Branch 1, MemWrite 0, MemtoReg X",
      "j 제어신호: RegWrite 0, MemWrite 0, Jump 1, 나머지 X",
      "꼭 기억할 숫자: 명령어 32비트 · 레지스터 32개 · 번호 5비트 · 즉치 16비트"
    ]
  },
  qs: [
    // ── OX ──
    {t:"ox", c:3, q:"andi, ori, xori의 16비트 즉치는 부호 확장(sign extension)된다.", a:"X", e:"논리 즉치 명령은 0 확장(zero extension)이다."},
    {t:"ox", c:2, q:"MIPS의 모든 명령어 길이는 32비트이다.", a:"O", e:"‘규칙성이 단순성을 낳는다’. R·I·J 모두 32비트."},
    {t:"ox", c:6, q:"스택은 높은 주소에서 낮은 주소 방향으로 자란다.", a:"O", e:"grows down. 스택 시작 근처는 0x7FFFFFFC."},
    {t:"ox", c:3, q:"`div $s0, $s1`을 실행하면 몫은 hi, 나머지는 lo에 저장된다.", a:"X", e:"몫(quotient)은 lo, 나머지(remainder)는 hi."},
    {t:"ox", c:1, q:"MIPS에는 즉치를 빼는 subi 명령어가 따로 필요하다.", a:"X", e:"즉치가 2의 보수라서 addi에 음수를 넣으면 된다. 예: addi $s1,$s0,-12"},
    {t:"ox", c:3, q:"`nor $t0, $s0, $0`은 $s0의 모든 비트를 반전한다.", a:"O", e:"A NOR 0 = NOT A. 그래서 nori는 필요 없다."},
    {t:"ox", c:2, q:"MIPS 프로그램은 보통 주소 0x00400000에서 시작한다.", a:"O", e:"Text 세그먼트 시작 주소. 명령어 1개마다 +4."},
    {t:"ox", c:1, q:"리틀엔디안은 워드 안에서 MSB(최상위) 쪽부터 바이트 번호를 붙인다.", a:"X", e:"리틀엔디안은 LSB 쪽부터, 빅엔디안이 MSB 쪽부터."},
    {t:"ox", c:6, q:"jal 명령어는 PC+4를 $ra에 저장하고 대상 주소로 점프한다.", a:"O", e:"복귀는 jr $ra."},
    {t:"ox", c:8, q:"IPC(instructions per cycle)는 작을수록 성능이 좋다.", a:"X", e:"IPC = 1/CPI. 한 클럭에 더 많은 명령을 처리할수록 좋으니 클수록 좋다."},
    {t:"ox", c:8, q:"단일 사이클 프로세서는 여러 명령어를 동시에 실행해 성능을 높인다.", a:"X", e:"여러 명령어를 동시에 실행하는 건 파이프라인. 단일 사이클은 명령어 하나를 한 사이클에 실행."},
    {t:"ox", c:9, q:"lw 실행 시 메모리 주소 계산을 위해 ALUControl은 010(덧셈)이다.", a:"O", e:"주소 = base + offset이므로 덧셈."},
    {t:"ox", c:2, q:"sll은 I-type 명령어이다.", a:"X", e:"sll·srl·sra는 R-type(op=0). 시프트 양은 shamt 필드."},
    {t:"ox", c:4, q:"`if (i == j)`를 어셈블리로 바꿀 때는 보통 bne로 반대 조건을 검사한다.", a:"O", e:"조건이 거짓이면 건너뛰도록 반대를 검사한다. while(pow!=128) → beq."},
    {t:"ox", c:4, q:"레이블은 반드시 콜론(:)으로 끝나야 한다.", a:"O", e:"예약어는 레이블로 쓸 수 없다."},
    {t:"ox", c:8, q:"MIPS의 상태 요소는 PC, 명령어 메모리, 레지스터 파일, 데이터 메모리다.", a:"O", e:"상태 요소 == 메모리 요소. ALU는 상태 요소가 아니다."},
    {t:"ox", c:6, q:"중첩 호출에서 proc1이 $ra를 저장하지 않고 proc2를 jal로 부르면 proc1은 원래 자리로 돌아갈 수 없다.", a:"O", e:"jal이 $ra를 덮어쓴다. 그래서 $ra를 스택에 저장했다가 복원한다."},
    {t:"ox", c:5, q:"ASCII에서 대문자와 소문자의 코드 차이는 0x20이다.", a:"O", e:"A = 0x41, a = 0x61. 차이 0x20 = 32."},

    // ── 객관식 ──
    {t:"mc", c:6, q:"프로시저에 인자를 넘길 때 쓰는 레지스터는?", o:["$v0–$v1","$a0–$a3","$t0–$t7","$s0–$s7"], a:1, e:"인자 $a0–$a3, 반환값 $v0."},
    {t:"mc", c:3, q:"32비트 상수 0xFEDC8765를 레지스터에 넣는 두 명령은?", o:["addi, addi","lui, ori","lw, sw","sll, or"], a:1, e:"lui $s0,0xFEDC → ori $s0,$s0,0x8765."},
    {t:"mc", c:3, q:"0xF234012F AND 0x000000FF의 결과는?", o:["0xF2340100","0x0000002F","0xF23401FF","0x000000FF"], a:1, e:"AND는 마스킹. 하위 8비트만 남는다."},
    {t:"mc", c:3, q:"$s1 = 0x000000FF일 때 `ori $t0, $s1, 0xFA34`의 결과는?", o:["0x00000034","0x0000FAFF","0x0000FACB","0xFFFFFAFF"], a:1, e:"0 확장 후 OR → 0x0000FAFF. (andi는 0x34, xori는 0xFACB)"},
    {t:"mc", c:3, q:"`sll $t0, $s1, 2`가 하는 계산은?", o:["$s1 + 2","$s1 × 2","$s1 × 4","$s1 ÷ 4"], a:2, e:"왼쪽 2칸 = ×2² = ×4."},
    {t:"mc", c:7, q:"프로그램 실행 과정의 순서로 옳은 것은?", o:["Assembler → Compiler → Linker → Loader","Compiler → Assembler → Linker → Loader","Compiler → Linker → Assembler → Loader","Loader → Compiler → Assembler → Linker"], a:1, e:"고급 언어 → 어셈블리 → 오브젝트 파일 → 실행 파일 → 메모리."},
    {t:"mc", c:7, q:"MIPS 메모리 맵에서 정적 데이터(전역 변수) 영역의 시작 주소는?", o:["0x00400000","0x10000000","0x10010000","0x7FFFFFFC"], a:1, e:"Text 0x00400000, Static 0x10000000, Heap 0x10010000, Stack 0x7FFFFFFC."},
    {t:"mc", c:1, q:"바이트 주소 지정 메모리에서 워드 11의 주소는?", o:["0x0B","0x2C","0x28","0x30"], a:1, e:"11 × 4 = 44 = 0x2C."},
    {t:"mc", c:1, q:"$t0 = 0x23456789를 `sw $t0, 0($0)` 한 뒤 `lb $s0, 1($0)` 하면 리틀엔디안에서 $s0는?", o:["0x00000023","0x00000045","0x00000067","0x00000089"], a:2, e:"리틀엔디안은 LSB 쪽부터: 0번지 89, 1번지 67. (빅엔디안이면 0x45)"},
    {t:"mc", c:8, q:"MIPS 상태 요소가 아닌 것은?", o:["PC","레지스터 파일","ALU","데이터 메모리"], a:2, e:"ALU는 조합 회로. 상태 요소는 PC·명령어 메모리·레지스터 파일·데이터 메모리."},
    {t:"mc", c:8, q:"프로그램 실행 시간 공식으로 옳은 것은?", o:["명령어 수 × CPI × 클럭 주기","명령어 수 × IPC × 클럭 주기","명령어 수 ÷ CPI × 클럭 주파수","CPI × 클럭 주파수"], a:0, e:"(# instructions) × (cycles/instruction) × (seconds/cycle)."},
    {t:"mc", c:8, q:"명령어를 여러 단계로 쪼개고 여러 명령어를 동시에 실행하는 방식은?", o:["단일 사이클","다중 사이클","파이프라인","인터프리터"], a:2, e:"파이프라인은 여러 명령어를 겹쳐 실행해 성능을 높인다."},
    {t:"mc", c:2, q:"`0x2237FFF1`을 해석한 명령어는?", o:["addi $s7, $s1, -15","addi $s1, $s7, -15","lw $s7, -15($s1)","sub $s7, $s1, $t7"], a:0, e:"op 001000(8)=addi, rs 10001(17=$s1), rt 10111(23=$s7), imm 0xFFF1 = -15."},
    {t:"mc", c:2, q:"opcode 값이 올바르게 짝지어진 것은?", o:["addi 35, lw 8","addi 8, lw 35, sw 43","lw 43, sw 35","R-type 32"], a:1, e:"R-type은 op 0 + funct(add 32, sub 34)."},
    {t:"mc", c:5, q:"배열 base 주소가 0x12348000일 때 array[3]의 주소는?", o:["0x12348003","0x12348006","0x1234800C","0x12348012"], a:2, e:"base + 3 × 4 = base + 12 = 0x1234800C."},
    {t:"mc", c:6, q:"레지스터 3개를 스택에 저장하기 전 $sp를 조정하는 명령은?", o:["addi $sp,$sp,3","addi $sp,$sp,-3","addi $sp,$sp,-12","addi $sp,$sp,12"], a:2, e:"3개 × 4바이트 = 12, 아래로 자라므로 -12. 끝나면 +12로 해제."},
    {t:"mc", c:9, q:"lw 실행 6단계 중 세 번째는?", o:["메모리 주소 계산","즉치 부호 확장","레지스터 파일에서 base 읽기","PC+4 결정"], a:1, e:"① Fetch ② rs 읽기 ③ 부호 확장 ④ 주소 계산 ⑤ 메모리 읽어 rt에 쓰기 ⑥ PC+4."},
    {t:"mc", c:4, q:"`slt $t1, $s0, $t0`의 의미는?", o:["$s0 < $t0이면 $t1 = 1","$s0 > $t0이면 $t1 = 1","$s0 = $t0이면 분기","$t1 = $s0 - $t0"], a:0, e:"set less than. 아니면 0."},

    // ── 단답 ──
    {t:"sa", c:9, s:1, q:"단일 사이클 MIPS에서 j의 제어 신호 RegWrite, RegDst, ALUSrc, Branch, MemWrite, MemtoReg, Jump 값은?", a:"0 X X X 0 X 1", e:"쓰기 없음(RegWrite·MemWrite 0), Jump 1, 나머지는 영향 없음."},
    {t:"sa", c:3, q:"mult $s0, $s1의 64비트 결과가 저장되는 두 특수 레지스터는?", a:"hi(상위 32비트), lo(하위 32비트)", e:"div는 몫 lo, 나머지 hi."},
    {t:"sa", c:2, q:"`0x02F34022`를 어셈블리로 해석하시오.", a:"sub $t0, $s7, $s3", e:"op 0 → funct 34(sub). rs 23($s7), rt 19($s3), rd 8($t0)."},
    {t:"sa", c:2, q:"`lw $t2, 32($0)`의 기계어는? (lw op = 35)", a:"0x8C0A0020", e:"100011 00000 01010 0000000000100000."},
    {t:"sa", c:2, q:"`sub $t0, $t3, $t5`의 기계어는? (funct 34)", a:"0x016D4022", e:"rs 11, rt 13, rd 8, funct 100010."},
    {t:"sa", c:8, q:"CPI의 뜻과 IPC와의 관계를 쓰시오.", a:"CPI = 명령어당 클럭 사이클 수, IPC = 1/CPI", e:"IPC가 클수록 좋다."},
    {t:"sa", c:9, q:"lw 명령어 실행 6단계를 순서대로 쓰시오.", a:"① 명령어 Fetch ② 레지스터 파일에서 rs(base) 읽기 ③ 즉치 부호 확장 ④ ALU로 주소 계산 ⑤ 메모리에서 읽어 rt에 쓰기 ⑥ PC+4", e:"ALUControl 010, RegWrite 1."},
    {t:"sa", c:6, q:"중첩 호출을 하는 proc1이 jal 전에 해야 할 일과 그 이유는?", a:"$ra를 스택에 저장(addi $sp,$sp,-4; sw $ra,0($sp))하고 끝나면 복원. jal이 $ra를 덮어쓰기 때문", e:"복원: lw $ra,0($sp); addi $sp,$sp,4; jr $ra."},

    // ── 빈칸 ──
    {t:"bl", c:7, q:"MIPS 메모리 맵: Text는 0x(가)에서, 정적 데이터는 0x(나)에서 시작하고, 스택은 0x7FFFFFFC 근처에서 (다) 방향으로 자란다.", a:"(가) 00400000  (나) 10000000  (다) 아래(낮은 주소)", e:"Heap은 0x10010000부터 위로 자란다."},
    {t:"bl", c:8, q:"실행 시간 = (가) × (나) × (다)", a:"(가) 명령어 수 (나) CPI (다) 클럭 주기(seconds/cycle)", e:"클럭 주기 = 1 / 클럭 주파수."},
    {t:"bl", c:6, q:"MIPS 호출 규약: 호출은 (가), 복귀는 (나), 인자는 (다), 반환값은 (라)", a:"(가) jal (나) jr $ra (다) $a0–$a3 (라) $v0", e:"jal은 $ra에 PC+4 저장."},

    // ── 중간고사 기출 (2018·2020·2022·2023·2024·2025) ──
    // 요약정리 기출(ca.sum.js)에 이미 있는 문항은 빼고 넣었다. 정답지가 없는 해(2018·2022)는 직접 풀어 확인한 답이다.
    // 1장
    {t:"mc", c:1, src:"기출", org:"2020 중간", q:"다음 중 MIPS 프로세서에서 데이터를 저장하는 곳이 아닌 것은?", o:["네트워크(Network)","레지스터(Register)","메인 메모리(Main Memory)","즉치 상수(Immediate Constant)"], a:0, e:"피연산자 출처는 레지스터 · 메모리 · 즉치(상수) 3가지."},
    {t:"mc", c:1, src:"기출", org:"2020·2022·2023 중간", s:1, q:"프로세서 내부에 위치한 메모리로 접근 속도가 가장 빠른 메모리는?", o:["레지스터 메모리","캐시 메모리","메인 메모리","SSD 메모리"], a:0, e:"레지스터 > 캐시 > 메인 메모리 > SSD·하드 디스크 순으로 빠르다."},
    {t:"ox", c:1, src:"기출", org:"2020 중간", q:"레지스터 $0에는 값을 쓸 수 있다.", a:"X", e:"$0($zero)은 항상 0. 써도 무시된다."},
    {t:"ox", c:1, src:"기출", org:"2022·2023 중간", s:1, q:"레지스터 $0에서 값을 읽을 때 읽히는 값은 항상 0만 가능하다.", a:"O", e:"$zero는 읽기만 가능하고 값은 언제나 0."},
    {t:"sa", c:1, src:"기출", org:"2020 중간", q:"subi(즉치값을 이용한 뺄셈) 명령어가 없는 이유는 무엇인가?", a:"addi 명령어의 즉치 값에 음수 값을 넣어 구현 가능하기 때문", e:"예: addi $t0, $t0, -5 = t0 - 5. 즉치는 16비트 2의 보수."},
    {t:"ox", c:1, src:"기출", org:"2022·2023 중간", s:1, q:"Word Addressable Memory에서는 바이트 단위의 주소 접근이 불가능하다.", a:"O", e:"워드 주소 지정은 주소 하나가 워드 하나. 바이트 단위로 접근하려면 Byte Addressable Memory여야 한다."},
    {t:"bl", c:1, src:"기출", org:"2020 중간", s:1, q:"C 코드 aa = bb + cc - dd; 를 MIPS로 구현할 때 빈칸 ①~④에 들어갈 명령어를 쓰시오.", k:"main:\n    la $t0, aa      # aa의 주소\n    la $t1, bb\n    la $t2, cc\n    la $t3, dd\n    lw $t4, 0($t1)  # bb 값을 $t4로\n    ①              # cc 값을 $t5로\n    ②              # dd 값을 $t6로\n    ③              # $t7 = bb + cc\n    ④              # $t9 = $t7 - dd\n    sw $t9, 0($t0)  # 결과를 aa에 저장\n\n    .data\naa: .word 0\nbb: .word 5\ncc: .word 3\ndd: .word 2", a:"① lw $t5, 0($t2) ② lw $t6, 0($t3) ③ add $t7, $t4, $t5 ④ sub $t9, $t7, $t6", e:"메모리 값은 lw로 레지스터에 올린 뒤에만 연산할 수 있다(load/store 구조). 결과 aa = 5 + 3 - 2 = 6."},
    {t:"bl", c:1, src:"기출", org:"2018 중간", q:"시스템이 빅엔디안인지 리틀엔디안인지 검출하는 코드의 빈칸을 채우시오. (①·②는 피연산자, ③은 명령어 이름)", k:"    addi $t0, $0, 1       # $t0 ← 0x00000001\n    sw   ①\n    lb   ②\n    ③    $t1, $t0, LITTLE_ENDIAN\nBIG_ENDIAN:\n    ...                   # 빅엔디안입니다\n    j    END\nLITTLE_ENDIAN:\n    ...                   # 리틀엔디안입니다\nEND:", a:"① $t0, 0($0) ② $t1, 0($0) ③ beq", e:"1을 워드로 저장한 뒤 같은 주소의 바이트 0을 lb로 읽는다. 리틀엔디안이면 바이트 0이 LSB라 1, 빅엔디안이면 0. 주소는 같기만 하면 0($0)이 아니어도 된다."},
    // 2장
    {t:"bl", c:2, src:"기출", org:"2018 중간", q:"수업에서 배운 명령어 타입 3가지와 예: ① (  )-type 예 add · ② (  )-type 예 addi, lw · ③ (  )-type 예 j", a:"① R ② I ③ J", e:"R = 레지스터 3개, I = 즉치 16비트 포함, J = 26비트 점프 주소."},
    {t:"sa", c:2, src:"기출", org:"2018 중간", q:"\"add $15, $16, $18\"의 기계어 코드는? (add: op 0, funct 32)", a:"0x02127820", e:"000000 10000(rs 16) 10010(rt 18) 01111(rd 15) 00000 100000."},
    {t:"sa", c:2, src:"기출", org:"2018 중간", q:"\"addi $14, $15, -1\"의 기계어 코드는? (addi opcode 8)", a:"0x21EEFFFF", e:"001000 01111(rs 15) 01110(rt 14) 1111111111111111(-1)."},
    {t:"sa", c:2, src:"기출", org:"2020 중간", s:1, q:"\"addi $1, $2, -3\"의 기계어 코드는? (addi opcode 8)", a:"0x2041FFFD", e:"001000 00010(rs 2) 00001(rt 1) 1111111111111101(-3)."},
    {t:"sa", c:2, src:"기출", org:"2022 중간", q:"\"addi $1, $0, -1\"의 기계어 코드는? (addi opcode를 1로 가정)", a:"0x0401FFFF", e:"000001 00000(rs 0) 00001(rt 1) 1111111111111111(-1)."},
    {t:"sa", c:2, src:"기출", org:"2023 중간", s:1, q:"\"add $7, $8, $9\"의 기계어 코드는? (add: op 0, funct 32)", a:"0x01093820", e:"000000 01000(rs 8) 01001(rt 9) 00111(rd 7) 00000 100000. 어셈블리 순서는 rd, rs, rt."},
    {t:"sa", c:2, src:"기출", org:"2023 중간", s:1, q:"\"lw $7, -4($8)\"의 기계어 코드는? (lw opcode 35)", a:"0x8D07FFFC", e:"100011 01000(rs 8) 00111(rt 7) 1111111111111100(-4)."},
    {t:"sa", c:2, src:"기출", org:"2024 중간", s:1, q:"\"lw $9, -4($8)\"의 기계어 코드는? (lw opcode 35)", a:"0x8D09FFFC", e:"100011 01000(rs 8) 01001(rt 9) 1111111111111100(-4)."},
    {t:"ox", c:2, src:"기출", org:"2020·2022 중간", s:1, q:"R-type 명령어는 add, sub, and, or 등의 산술 논리 명령어를 포함하지만 시프트 명령어는 R-type에 포함되지 않는다.", a:"X", e:"sll·srl·sra도 R-type. 시프트 양은 shamt 필드에 들어간다."},
    {t:"ox", c:2, src:"기출", org:"2022 중간", q:"JR(Jump Register) 명령어는 J-type 포맷으로 구현한다.", a:"X", e:"jr은 R-type(op 0, funct 8). 점프할 주소를 레지스터 rs에서 읽는다."},
    // 3장
    {t:"bl", c:3, src:"기출", org:"2018 중간", q:"int a = 0x1234ABCD; 를 MIPS로 바꾸시오. ($s0가 a)", a:"① lui $s0, 0x1234 ② ori $s0, $s0, 0xABCD", e:"즉치는 16비트라 32비트 상수는 lui(상위 16비트) + ori(하위 16비트) 두 번에 나눠 넣는다."},
    {t:"bl", c:3, src:"기출", org:"2022 중간", q:"C 코드 aa = bb + cc × dd; 를 MIPS로 구현할 때 빈칸 ①~⑤를 채우시오.", k:"    la $t0, aa\n    la $t1, bb\n    la $t2, cc\n    la $t3, dd\n    lw $t4, 0($t1)  # bb\n    ①              # cc → $t5\n    ②              # dd → $t6\n    ③              # cc × dd (64비트 결과는 hi·lo)\n    ④              # 하위 32비트를 $t7로\n    ⑤              # $t9 = bb + $t7\n    sw $t9, 0($t0)", a:"① lw $t5, 0($t2) ② lw $t6, 0($t3) ③ mult $t5, $t6 ④ mflo $t7 ⑤ add $t9, $t4, $t7", e:"mult 결과는 hi(상위)·lo(하위)에 들어가므로 mflo로 꺼낸다. 결과 aa = 5 + 3 × 2 = 11."},
    {t:"mc", c:3, src:"기출", org:"2022 중간", q:"4비트로 \"-3\"을 2의 보수로 표현할 때 올바른 이진수는?", o:["1110","1101","1010","1111"], a:1, e:"3 = 0011 → 반전 1100 → +1 = 1101."},
    {t:"sa", c:3, src:"기출", org:"2023 중간", q:"4비트로 \"-2\"를 2의 보수로 표현한 이진수는?", a:"1110", e:"2 = 0010 → 반전 1101 → +1 = 1110."},
    {t:"sa", c:3, src:"기출", org:"2025 중간", q:"6비트로 \"-1\"을 2의 보수로 표현한 이진수는?", a:"111111", e:"1 = 000001 → 반전 111110 → +1 = 111111. -1은 비트 수와 상관없이 모두 1."},
    {t:"sa", c:3, src:"기출", org:"2023 중간", q:"아래 코드에서 andi 명령어가 수행될 때 16비트 값을 32비트로 확장하는 방법은?", k:"li   $t0, 0x25\nandi $t1, $t0, 0xF2", a:"0 확장(Zero Extension)", e:"andi·ori·xori 같은 논리 명령은 0 확장, addi는 부호 확장."},
    {t:"sa", c:3, src:"기출", org:"2024 중간", q:"아래 코드에서 addi 수행 후 $t1의 값은? (16진수)", k:"    lw   $t0, MyDATA\n    addi $t1, $t0, 0xFFF2\n    ...\n    .data\nMyDATA: .word 0x00000001", a:"0xFFFFFFF3", e:"0xFFF2를 부호 확장하면 0xFFFFFFF2(-14). 1 + (-14) = -13 = 0xFFFFFFF3."},
    {t:"sa", c:3, src:"기출", org:"2025 중간", q:"아래 코드에서 addi 수행 후 $t1의 값은? (10진수)", k:"    lw   $t0, MyDATA\n    addi $t1, $t0, 0xFFFF\n    ...\n    .data\nMyDATA: .word 0x00000001", a:"0", e:"0xFFFF를 부호 확장하면 0xFFFFFFFF(-1). 1 + (-1) = 0."},
    // 4장
    {t:"bl", c:4, src:"기출", org:"2020 중간", s:1, q:"아래 C 코드를 MIPS로 바꿀 때 빈칸 ①~③을 채우시오.", k:"// if (i == j) f = g + h;\n// else        f = f - i;\n# $s0 = f, $s1 = g, $s2 = h, $s3 = i, $s4 = j\n    ①\n    ②\n    ③\nL1: sub $s0, $s0, $s3\ndone:", a:"① bne $s3, $s4, L1 ② add $s0, $s1, $s2 ③ j done", e:"if 조건의 반대(i != j)일 때 else(L1)로 건너뛴다. then 부분이 끝나면 j done으로 else를 건너뛴다."},
    {t:"bl", c:4, src:"기출", org:"2018·2020 중간", s:1, q:"for (i = 1; i < 101; i = i * 2) sum = sum + i; 를 MIPS로 바꿀 때 빈칸 ①~④를 채우시오.", k:"# $s0 = i, $s1 = sum\n      addi $s1, $0, 0      # sum = 0\n      addi $s0, $0, 1      # i = 1\n      addi $t0, $0, 101    # $t0 = 101\nloop:\n      ①                   # if (i < 101) $t1 = 1, else $t1 = 0\n      ②                   # if $t1 == 0 branch to done\n      ③                   # sum = sum + i\n      ④                   # i = i * 2\n      j loop\ndone:", a:"① slt $t1, $s0, $t0 ② beq $t1, $0, done ③ add $s1, $s1, $s0 ④ sll $s0, $s0, 1", e:"i * 2는 왼쪽으로 1칸 시프트. $0 대신 $zero도 같다."},
    {t:"bl", c:4, src:"기출", org:"2022 중간", q:"for (i = 1; i <= 101; i = i * 2) sum = sum + i; 를 MIPS로 바꿀 때 빈칸 ①~④를 채우시오.", k:"# $s0 = i, $s1 = sum\n      addi $s1, $0, 0      # sum = 0\n      addi $s0, $0, 1      # i = 1\n      addi $t0, $0, 101    # $t0 = 101\nloop:\n      ①                   # if (i > 101) $t1 = 1, else $t1 = 0\n      ②                   # if $t1 != 0 branch to done\n      ③                   # sum = sum + i\n      ④                   # i = i * 2\n      j loop\ndone:", a:"① slt $t1, $t0, $s0 ② bne $t1, $0, done ③ add $s1, $s1, $s0 ④ sll $s0, $s0, 1", e:"i > 101은 101 < i이므로 slt의 두 피연산자 순서를 바꾼다. 조건이 참(1)이면 끝나므로 bne."},
    {t:"bl", c:4, src:"기출", org:"2023 중간 (2018 중간은 x <= 10)", s:1, q:"아래 while 문을 MIPS로 바꿀 때 빈칸 ①~④를 채우시오.", k:"// int pow = 1; int x = 1;\n// while (x < 10) { pow = pow * 2; x = x + 1; }\n      addi $t0, $0, 1    # pow = 1\n      addi $t1, $0, 1    # x = 1\n      addi $t2, $0, 10\nWHILE:\n      ①\n      ②\n      ③                 # pow = pow * 2\n      ④                 # x = x + 1\n      j WHILE\nDONE:", a:"① slt $t3, $t1, $t2 ② beq $t3, $0, DONE ③ sll $t0, $t0, 1 ④ addi $t1, $t1, 1", e:"2018년처럼 x <= 10이면 $t2를 11로 두거나, slt $t3, $t2, $t1 + bne $t3, $0, DONE으로 바꾼다."},
    {t:"bl", c:4, src:"기출", org:"2020 중간", s:1, q:"아래 프로그램을 수행하면 (가) 실행되는 명령어 수 (나) $t1 (다) $t3 (라) 메모리 4번지에 저장된 값은?", k:"LLL: addi $sp, $0, 8\n     lw   $t0, 4($sp)\n     lw   $t1, 4($sp)\n     sub  $t2, $t0, $t1\n     bne  $t2, $zero, LLL\n     addi $t2, $t2, 1\n     sll  $t3, $t2, 2\n     addi $t1, $t2, 8\n     sub  $t3, $t2, $t1\n     sw   $t1, -4($sp)\n     sw   $t3, -8($sp)", a:"(가) 11 (나) 9 (다) -8 (라) 9", e:"$t0 = $t1(같은 주소) → $t2 = 0이라 bne 안 함 → 11개 모두 실행. $t2 = 1, $t1 = 9, $t3 = 1 - 9 = -8. sw $t1, -4($sp)는 8 - 4 = 4번지에 9를 저장."},
    {t:"bl", c:4, src:"기출", org:"2022 중간 (메모리 초기값 0 가정)", q:"메모리 초기값이 모두 0일 때 아래 프로그램을 수행하면 (가) 실행되는 명령어 수 (나) $t1 (다) $t3 (라) 메모리 4번지에 저장된 값은?", k:"      addi $t0, $0, 8\n      lw   $t0, 4($t0)\n      lw   $t1, 4($t0)\n      slt  $t2, $t0, $t1\n      bne  $t2, $zero, LLL\n      addi $t2, $t2, 1\n      sll  $t3, $t2, 2\nLLL:  addi $t1, $t2, 8\n      sub  $t3, $t2, $t1\n      addi $t0, $0, 4\n      sw   $t1, -4($t0)\n      sw   $t3, 0($t0)", a:"(가) 12 (나) 9 (다) -8 (라) -8", e:"$t0 = 0, $t1 = 0 → slt 결과 0이라 bne 안 함 → 12개 모두 실행. $t2 = 1, $t1 = 9, $t3 = -8. 0번지에 9, 4번지에 -8 저장."},
    // 5장
    {t:"bl", c:5, src:"기출", org:"2018 중간", q:"for (i = 0; i < 100; i++) array[i] = array[i] * 4; 를 MIPS로 바꿀 때 ①~⑤에 들어갈 명령어 이름을 쓰시오.", k:"# $s0 = array base address, $s1 = i\n      addi $s1, $0, 0        # i = 0\n      addi $t2, $0, 100      # $t2 ← 100\n      addi $t3, $0, 1        # $t3 ← 1\nLOOP: slt  $t0, $s1, $t2     # i < 100 ?\n      ①   $t0, $t3, done    # if not then done\n      ②   $t0, $s1, 2       # $t0 ← i * 4\n      ③   $t0, $t0, $s0     # array[i]의 주소\n      ④   $t1, 0($t0)\n      ⑤   $t1, $t1, 2       # array[i] * 4\n      sw   $t1, 0($t0)\n      addi $s1, $s1, 1\n      j    LOOP\ndone:", a:"① bne ② sll ③ add ④ lw ⑤ sll", e:"$t3 = 1이므로 slt 결과($t0)가 1이 아니면(bne) 끝. 워드 배열이라 인덱스 × 4 = sll 2. ×4도 sll 2."},
    // 6장
    {t:"ox", c:6, src:"기출", org:"2022 중간", q:"JAL(Jump and Link) 명령어는 돌아올 주소로 현재의 PC 값을 저장한다.", a:"X", e:"현재 PC가 아니라 다음 명령어 주소 PC + 4를 $ra에 저장한다."},
    {t:"bl", c:6, src:"기출", org:"2024 중간", s:1, q:"main의 시작 주소가 0x00400000이고 명령어당 4바이트(Byte Addressable)일 때, 아래 jal my_function 수행 후 ① PC ② $ra 값은?", k:"main:\n    li  $t0, 10          # 0x00400000\n    li  $t1, 20          # 0x00400004\n    jal my_function      # 0x00400008\n    add $t2, $t0, $t1    # 0x0040000C\nmy_function:\n    li  $t0, 30          # 0x00400010\n    jr  $ra              # 0x00400014", a:"① 0x00400010 ② 0x0040000C", e:"PC는 my_function 주소, $ra는 jal 다음 명령어 주소(jal 주소 + 4)."},
    {t:"bl", c:6, src:"기출", org:"2023 중간", q:"main → func1 → func2 순으로 호출할 때 func1의 빈칸 ①~⑥을 채우시오. (힌트: 스택 사용)", k:"func1:\n    ①        # 스택 한 칸 확보\n    ②        # $ra 저장\n    ③        # func2 호출\n    ④        # $ra 복원\n    ⑤        # 스택 반환\n    ⑥        # 복귀\nfunc2:\n    jr $ra", a:"① addi $sp, $sp, -4 ② sw $ra, 0($sp) ③ jal func2 ④ lw $ra, 0($sp) ⑤ addi $sp, $sp, 4 ⑥ jr $ra", e:"jal func2가 $ra를 덮어쓰므로 미리 스택에 저장했다가 복원해야 원래 호출한 곳으로 돌아간다. main도 운영체제가 부른 함수라 같은 패턴을 쓴다."},
    // 8장
    {t:"bl", c:8, src:"기출", org:"2018 중간", s:1, q:"CPI가 add/sub/addi = 1, lw/sw = 2, beq = 3이고 클럭이 2GHz인 프로세서가 아래 프로그램을 실행한다. (가) 실행되는 명령어 수 (나) 클럭 사이클 수 (다) 실행 시간(ns) (라) $t1 (마) $t3 (바) 메모리 4번지의 값은? ($zero = 0, add $t1, $t2, 8은 addi로 본다)", k:"     addi $sp, $zero, 8\n     lw   $t0, -8($sp)\n     lw   $t1, -8($sp)\n     sub  $t2, $t0, $t1\n     beq  $t2, $zero, LLL\n     add  $t2, $s0, $s1\n     sub  $t3, $s0, $s1\nLLL: add  $t1, $t2, 8\n     sub  $t3, $t2, $t1\n     sw   $t1, -4($sp)\n     sw   $t3, -8($sp)", a:"(가) 9 (나) 15 (다) 7.5ns (라) 8 (마) -8 (바) 8", e:"$t0 = $t1 → $t2 = 0 → beq로 LLL. 실행: addi·lw·lw·sub·beq·add·sub·sw·sw = 9개. 사이클 1+2+2+1+3+1+1+2+2 = 15. 시간 15 × 0.5ns = 7.5ns. $t1 = 8, $t3 = 0 - 8 = -8, 4번지에 $t1(8)."},
    {t:"bl", c:9, src:"기출", org:"2018 중간", s:1, q:"바로 앞 문제와 같은 프로그램에서 (가) beq $t2, $zero, LLL의 offset (나) 평균 CPI (분수) (다) single cycle MIPS의 ALU 덧셈 횟수 (라) ALU 뺄셈 횟수 (마) lw/sw의 CPI가 2 → 1이 되면 몇 배 빨라지는가 (분수)", a:"(가) 2 (나) 15/9(5/3) (다) 6 (라) 3 (마) 15/11", e:"offset = LLL까지 거리 - 1 = (PC+4) 기준 2칸. 평균 CPI = 15/9. 덧셈: addi, lw 2, add(LLL), sw 2 = 6(lw·sw는 주소 계산). 뺄셈: sub 2 + beq 비교 1 = 3. lw/sw 4개가 1씩 줄어 11사이클 → 15/11배."}
  ]
});
