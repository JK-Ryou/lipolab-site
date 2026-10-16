# 리포랩 3기 학습 사이트

날짜(DAY)별 요약본과 워크북을 왼쪽 메뉴로 오가며 보는 정적 사이트입니다. 빌드 과정이 없고 파일만 올리면 됩니다.

## 구조

```
lipolab-site/
├─ index.html          # 사이드 내비게이션이 있는 사이트 틀
├─ days.js             # 날짜 목록 (여기에 DAY를 추가)
├─ design-system.html  # 디자인 시스템 안내(컴포넌트 예시)
├─ assets/lipolab.css  # 모든 페이지가 공유하는 단 하나의 스타일
└─ days/
   └─ day1/
      ├─ summary.html  # DAY 1 요약본
      └─ workbook.html # DAY 1 워크북
```

## 디자인 시스템

- 모든 DAY 페이지는 `assets/lipolab.css` 하나만 링크합니다. 페이지 안에 자체 `<style>`을 두지 않습니다.
- 클래스 없이 쓴 일반 태그(h1~h4, p, ul, table, pre, details, blockquote)도 같은 디자인이 됩니다.
- 페이지가 CSS를 링크하지 않았거나 태그를 다르게 달았더라도, 사이트(`index.html`) 안에서 열리면 같은 CSS가 자동으로 덧붙습니다.
  (웹 서버로 배포했을 때 동작합니다. 파일을 더블클릭해 로컬로 열면 브라우저 보안 때문에 자동 적용이 되지 않을 수 있어, 페이지에 직접 링크하는 방식을 기본으로 합니다.)
- 컴포넌트 목록과 예시는 `design-system.html`에서 볼 수 있습니다.
- 색·폭·글자 크기를 바꾸려면 `assets/lipolab.css` 한 곳만 고치면 모든 DAY에 반영됩니다.

## 새 DAY 추가하기

1. `days/day2/` 폴더를 만들고 `summary.html`, `workbook.html`을 넣습니다.
2. `days.js`의 `days` 배열에 항목을 추가합니다. 날짜는 `YYMMDD` 형식입니다.
   (파일 안에 주석 처리된 DAY 2 예시가 있습니다.)
3. 메뉴에는 `DAY 2 (261016)`처럼 표시됩니다.

## 같은 DAY의 요약본과 워크북을 서로 연결하려면

요약본과 워크북 안의 링크는 사이트 틀을 유지하도록 아래 형식으로 씁니다.

```html
<a href="../../index.html#day2/workbook" target="_top">DAY 2 워크북</a>
```

## 주소 규칙

`index.html#day1/summary`, `index.html#day1/workbook` 처럼 주소로 바로 열 수 있습니다.
이 주소를 공유하면 해당 페이지가 열립니다.

## 올릴 때 알아둘 점

- 모든 페이지가 정적 파일이라 GitHub Pages, Cloudflare Pages, S3 + CloudFront 등에 그대로 올릴 수 있습니다.
- 로컬에서 `index.html`을 더블클릭해도 열립니다.
- 폴더 전체를 올려야 합니다. `index.html`만 올리면 내용이 보이지 않습니다.
- 사내 자료가 섞여 있다면 공개 호스팅 전에 보안 지침을 확인하세요.

## 웹 게시 현황 (GitHub Pages)

- **사이트 주소**: https://jk-ryou.github.io/lipolab-site/
- **저장소**: https://github.com/JK-Ryou/lipolab-site
- **배포 브랜치**: `main` 브랜치 루트 → push 시 자동 재배포 (보통 1~2분 소요)

공개 설정에 대해 알아둘 점:
- 각 페이지의 `meta robots`로 검색엔진 노출 차단(`noindex, nofollow, noarchive`)이 들어 있습니다. 주소를 아는 사람은 누구나 볼 수 있으므로 **비공개가 아닙니다.**
- 새 DAY를 추가할 때 민감한 장소·기관명은 넣지 않는 것을 권장합니다.
- 한 번 게시한 내용은 캐시에 남을 수 있으니, 올리기 전에 한 번 더 확인하세요.

## 콘텐츠 업데이트 방법

파일을 수정한 뒤 아래 3단계를 터미널에서 실행합니다.
`lipolab-site` 폴더 안에서 실행해야 합니다.

```bash
# 1. 변경된 파일을 스테이징
git add days/day3/summary.html days/day3/workbook.html days.js
#   (수정한 파일 이름으로 바꿔 쓰세요. 전체를 올리려면 git add . )

# 2. 커밋 (변경 내용을 한 줄로 요약)
git commit -m "Day 3 추가: 주제명"

# 3. 배포 (push하면 GitHub Pages가 자동으로 재배포)
git push
```

배포 진행 상태: https://github.com/JK-Ryou/lipolab-site/actions

### 자주 쓰는 명령어 모음

| 명령어 | 설명 |
|---|---|
| `git status` | 수정된 파일 목록 확인 |
| `git diff` | 변경 내용 미리 보기 |
| `git log --oneline` | 커밋 이력 확인 |
| `git add .` | 모든 변경 파일 스테이징 |

### Claude Code로 수정할 때

Claude Code에서 파일을 수정한 경우, 터미널에서 위 3단계만 실행하면 됩니다.
커밋 메시지는 무엇을 바꿨는지 한 줄로 간단히 씁니다. 예: `"Day 3 요약본 QnA 섹션 추가"`
