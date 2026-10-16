---
aliases:
일시: 26년 10월 16일 09:00~18:00
장소: 센터필드 EAST 18층
---
# 1. MCP 연결과 구축

###### 1. 일반 Application <> Agent Application과의 차이
![[Pasted image 20261016092614.png]]
- 기존: 모델을 사용하지 않음
- 에이전트: 모델을 사용한다는 것, 이때 모델이 사용할 도구를 마련해줘야함
	- 도구를 내부에서 만들어서 제공할 수도 있으나
	- 외부에서 만들어진 도구를 사용할 수도 있음 = **MCP**
- 따라서 에이전트를 만드려면 직접만들면서도 기존의 MCP를 잘 활용해야 함

###### 2. MCP 구성요소
1. 도구 명세 = MCP에 대한 설명
2. 실행 코드 = MCP 그 자체
3. 인증정보 = DB를 불러오거나 할 때 인가된 사용자인지 확인하기 위해 (내부용이라면 필수요소)
4. 전송방식
	- 원격 vs 로컬![[Pasted image 20261016093440.png]]
	- 로컬 (stdio): 개인 노트북 자체의 리소스를 사용 > 많이 돌리면 컴퓨터가 느려질 수도 있음
		- 다만 다른 사람에게 전달하거나, 내 data를 활용할 때 필요함
		- ex. Kiro = 도구가 50개 넘어가면 warning "MCP서버 off 필요"
	- 원격 (streamable HTTP)
		- ex. AgentCore Gateway: 원격 MCP서버를 만들어주는 것
###### 3. MCP 서버 연결
1. 로컬 연결![[Pasted image 20261016093615.png]]
2. 원격 연결![[Pasted image 20261016093628.png]]

###### 4. MCP 서버 구현
- MCP 서버 구조: 직접 만들 때![[Pasted image 20261016093829.png]]
	- MCP서버를 만들고, 개인 claude code에 연결해서, 개인 pc에서 실행하면 > 업무에도 활용 가능함
	- 나만 쓸거면 stdio로 만들어도 됨
	- 다같이 쓰려면 streamable http 형식으로 만들어야 > AgentCore Gateway![[Pasted image 20261016094625.png]]
- MCP 서버 만들기 단계
	1. 서버 파일 만들기: "FastMCP써서 엑셀 파일을 MCP서버로 만들어줘."
	2. Claude Code에 등록: "내가 만든 MCP서버를 연결해줘" > 한번 껐다 켜야함

# 2. DB & SQL
###### 1. DB의 종류
- 엑셀 = 데이터 파일 1개, 내 PC에만 존재, 동시 편집 안됨
- 데이터베이스 = 이전에는 RDB만, 최근에는 Graph DB, Vector DB 등 많아짐
	- RDB => 일반적으로 사용
	- Graph DB => Ontology 구축 시
	- Vector DB => RAG 구축 시
###### 2. RDB, 관계형 데이터베이스
- 개념
	- 데이터: 실제 저장된 값
	- 스키마: 데이터의 구조와 규칙 정의 (값들을 위한 데이터 = 메타데이터) > 뒤에서 한번 더
	- SQL: 데이터의 CRUD를 위한 언어 (Query Language)
- 데이터유형
	- 정형 / 반정형(.json) / 비정형
	- 데이터레이크: 정형, 반정형, 비정형을 모두 담는 DB![[Pasted image 20261016101505.png]]
- 테이블간 관계연결
	- 테이블간 관계는 key로 연결, 이 key를 통해 테이블간의 연결관계를 파악
	- ex. Key(=product_id)로 연결되는 Customers, Products 테이블![[Pasted image 20261016101655.png]]
- 스키마(Schema)![[Pasted image 20261016101949.png]]
	- PK(Primary Key, 기본키): 데이터 식별을 위한 값 (ex. 주민번호, 학번, 계좌번호 등..)
	- 데이터 일관성, 효율 등을 위해 스키마를 설정하는 것이 매우 중요
	- 다만 한번 스키마를 만들면, 추가가 쉽지 않으므로 처음 작성하는 것이 중요함
	  (스키마를 중간에 추가하면, 이전의 데이터들에 null이 생김)
- DB 연결정보![[Pasted image 20261016102357.png]]
	- 엔드포인트: 어떤 데이터베이스에 접속할 것인지? (서버주소, 호스트)
	- 포트: 접속할 통로의 번호
	- 사용자 정보: 접속하는 사용자의 정보 (인가를 위해 중요)
	- DB/table 이름: 필요한 데이터가 있는 곳
###### 3. SQL
- 기본 기능: CRUD
- C (Create): 데이터 생성 - INSERT![[Pasted image 20261016102807.png]]
- R (Read): 데이터 조회 - SELECT![[Pasted image 20261016103055.png]]
- U (Update): 데이터 수정 - UPDATE![[Pasted image 20261016103102.png]]
- D (Delete): 데이터 삭제 - DELETE![[Pasted image 20261016103114.png]]
###### 4. MCP를 활용한 자연어 질의
- 자연어 질의를 위해, Claude code에 지시 > MCP서버를 통해 데이터 조회하는 구조![[Pasted image 20261016103338.png]]

- MCP서버를 통해 수행가능![[Pasted image 20261016103302.png]]![[Pasted image 20261016103419.png]]
# 3. API
###### 1. API 개념과 구조
- API란 = 프로그램의 창구 역할을 함![[Pasted image 20261016104037.png]]
- API를 쓰는 이유![[Pasted image 20261016103756.png]]
	- 실제 동작방식에 대한 이해없이 API 호출방식만 알면 원하는 데이터 검색, 조회 가능
	- 보안, 통제를 위해 정해진 방식으로만 지시 + 결과 리턴
- API를 포함하는 Web Application 구조![[Pasted image 20261016103959.png]]
###### 2. API 조회
- API의 기본 기능
	- Create: 데이터 추가 - POST
	- Read: 데이터 조회 - GET
	- Update: 데이터 수정 - PUT
	- Delete: 데이터 삭제 - DELETE
- API의 요청과 응답
	- API 명세 (약속 = HTTP)![[Pasted image 20261016104320.png]]
	- 요청![[Pasted image 20261016104245.png]]
	- 응답![[Pasted image 20261016104300.png]]
###### 3. API의 호출과 구성 - GET
- GET의 호출-응답![[Pasted image 20261016104516.png]]
- API 조회 엔드포인트(GET)![[Pasted image 20261016104705.png]]
- (개발자들이 해왔던) API를 포함하는 Web Application 구성![[Pasted image 20261016104613.png]]

###### 4. 자연어 질의
- 이전까지는 API부터는 개발자가, 다만 이제는 Claude Code를 토대로 자연어 질의 가능![[Pasted image 20261016110819.png]]
- 데이터 조회 흐름 변경: SQL을 직접 조회 > API를 통해 조회 > Agent를 통해 조회
	- SQL 직접 조회![[Pasted image 20261016111118.png]]
	- API를 통해 조회![[Pasted image 20261016111140.png]]
	- Agent를 통해 조회 <> 응답![[Pasted image 20261016111210.png]]![[Pasted image 20261016111234.png]]
###### 4. 작업
- AWS 버전으로 작업 시
![[Pasted image 20261016111733.png]]
###### 5. 검증, 안정성 평가
- Agent + RAG를 같이 쓴다고 하더라도 해결되지 않는 문제가 있음![[Pasted image 20261016112018.png]]
	- 할루시네이션
		- 누락되었을 때, 응답을 만들어낼 수 있음
		- 제대로 "모르면 모른다고 해"라는 가이드 필요
		- 산출물이 제대로 나왔는지 확인해야 함.
	- 데이터의 질(최신성 등) 관리
		- Data의 질이 중요함. 제대로된 데이터가 있는지 확인 필요
		- 데이터 분포/정책 등이 바뀔 수 있으며, 이때 결과가 크게 바뀔 수 있음
		- 지속적인 모니터링을 통해 개선작업 필요
- 제대로 질문하기![[Pasted image 20261016111947.png]]
- 결과 검증
  ![[Pasted image 20261016112223.png|371]]
	- GenAI = 확률로 나오는 결과. 따라서 늘 검증해야 함
# [실습]
![[Pasted image 20261016104918.png]]
>  Aurora MySQL = SQL콘솔 / API Gateway = API 콘솔 / AgentCore Gateway = MCP콘솔

###### 1. DB 연결 정보
![[Pasted image 20261016130526.png]]

###### 2. API 연결 정보![[Pasted image 20261016130557.png]]

###### 3. MCP 연결 정보![[Pasted image 20261016131050.png]]

실습 질문
- 실습내용: 자연어로 물어보면 모델이 도구(API)를 고르고, 그 도구가 SQL을 실행해 돌려준 결과에 답하는 순서를 보는 것
- 자연어 프롬프트: 학생 고객군 중 튼튼적금에 가입한 고객을 이름순으로 5명만 찾아줘
- 타임라인
	1. 질문-  학습자가 자연어로
		학생 고객군 중 튼튼적금에 가입한 고객을 이름순으로 5명만 찾아줘
	2. 요청
		POST https://lab-healthcare-lookup-gw-cbszicddkc.gateway.bedrock-agentcore.us-east-1.amazonaws.com/mcp
	3. 모델이 고른 도구, 입력
	   ![[Pasted image 20261016132002.png|384]]
	4. API 호출 - 도구는 HTTPS 요청![[Pasted image 20261016132025.png]]
	5. 도구가 실행한 SQL![[Pasted image 20261016132042.png]]
	6. 도구가 실행한 SQL![[Pasted image 20261016132102.png]]
	7. API 응답 - tools/call이 돌려준 본문![[Pasted image 20261016132123.png]]
	8. 결과 - 도구가 돌려준 데이터![[Pasted image 20261016132136.png]]
	9. 모델의 답![[Pasted image 20261016132147.png]]

#질문 5명만 보여줘라는 조건 > 왜 SQL에 포함되지 않았는지?
#질문 GET vs POST?