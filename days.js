/*
  리포랩 3기 — 날짜별 콘텐츠 목록
  새로운 Day를 추가하려면:
  1) days/dayN/ 폴더를 만들고 summary.html, workbook.html 을 넣습니다.
  2) 아래 days 배열에 항목을 한 개 추가합니다. (date는 YYMMDD 형식)
*/
window.LIPOLAB_SITE = {
  title: "리포랩 3기",
  subtitle: "교육 요약 · 워크북",
  days: [
    {
      n: 1,
      date: "261015",
      title: "Agentic AI · AWS · Claude Code 실습",
      pages: [
        { key: "summary",  label: "요약본", file: "days/day1/summary.html" },
        { key: "workbook", label: "워크북", file: "days/day1/workbook.html" }
      ]
    },
    {
      n: 2,
      date: "261016",
      title: "MCP 연결과 구축 · DB & SQL · API",
      pages: [
        { key: "summary",  label: "요약본", file: "days/day2/summary.html" },
        { key: "workbook", label: "워크북", file: "days/day2/workbook.html" }
      ]
    }
    /* 예시 — Day 3를 추가할 때 위 항목 뒤에 쉼표를 붙이고 아래를 채웁니다.
    ,{
      n: 2,
      date: "261016",
      title: "주제",
      pages: [
        { key: "summary",  label: "요약본", file: "days/day2/summary.html" },
        { key: "workbook", label: "워크북", file: "days/day2/workbook.html" }
      ]
    }
    */
  ]
};
