---
aliases:
일시: 26년 10월 16일 09:00~18:00
장소: 센터필드 EAST 18층
---
## 1. Agentic AI
#### 1. 서론 "팀장이 똑똑해야 팀원을 잘 시킨다."
- User = 팀장 / Agent = 팀원 >> keyword정도는 알아야 잘 시킬 수 있음
#### 2. Foundation Model vs Agent
- 가르치는 것에 한계가 존재. 결국 인간의 인지과정과 학습이 필요해짐 > 'learning'
- 기존에는 학습한 내용을 바탕으로 예측까지 = Machine/Deep Learning
- 현재 이에 대한 내용으로 생성까지 = Generative AI > '확률'을 기반으로
  #질문 ***그럼 앞의 내용이 정해지지 않으면 뒤의 데이터가 확정되지 않는가?
  ![[Pasted image 20261015102314.png|599]]
#### 3. Context
- 도구에 설명을 붙이고, 이 설명에 기반해서 도구를 쓸지 정하는 것은 모델![[Pasted image 20261015103902.png|604]]
	- 사용자 질문 = 프롬프트: 모델에 내리는 명령
	- 시스템 프롬프트 = 모델에 역할을 부여하는 것
	- 도구 정보: 명령을 수행하기 위해 도구에 설명을 붙이는 것 = schema, spec,..
	- RAG문서: 명령에 대한 답안지 참고
	- 장/단기 메모리: chatbot은 singleturn > multi-turn을 위해서는 메모리 필요
		- 장기: 세션대화를 계속 기억하기에는 context 한계가 있음
		- 단기: 세션대화를 기억 = context window > confection
- RAG
	- RAG는 근거/domain knowledge를 보완
	  ![[Pasted image 20261015105004.png|617]]
	- RAG동작구조 > 내용을 찾고 근거를 남겨야 함![[Pasted image 20261016091229.png|618]]
		- 약관/FAQ 문서 저장소: VectorDB
	  
#### 4. Agent
- 도구를 조율하기 위해 Agent가 필요 (실제 Action등이 필요하다면 > delegation)
- 다만 Agent가 작업한 일에 대한 검토/검수 loop 필요 (=Human Role)![[Pasted image 20261015105147.png|630]]
- Agent의 구성요소, %%이중 도구+컨텍스트 = harness%% 라고도 함.
	>AWS의 AgentCore = harness 역할을 전담
![[Pasted image 20261015105318.png|653]]
- Agent에 요청이 들어갔을 때, output이 나오는 방식![[Pasted image 20261015105609.png]]
	- 도구를 어떤 것을 쓸지 결정하기 위한 loop
	- Agent의 목표 = 사용자의 요청(목표) 달성 > 명령 수행까지 무한호출 = 토큰 과금

#### 5. MCP
- MCP = Agent의 통합규격 (표준)![[Pasted image 20261015110532.png]]

# 2. AWS 소개
![[Pasted image 20261015111232.png]]

#### 1. AWS Services
- EC2, S3 : Computing server / Storage
- Bedrock : 
- Polly : 
- Rekognition : Image
- Textract : Text 추출
#### 2. Bedrock
- Model Catalog![[Pasted image 20261015133623.png]]
	- Model ID로 모델만 바꿀 수 있음
	- Input/Output : data 형태
- Knowledge Bases: 지식체계 (RAG)
- Guardrails: 규칙
- AgentCore: Build 도구
	- gateway : 외부의 mcp 등 도구 사용 시
	- runtime: agent를 서버로 배포
	- harness: 소스코드 없이 설정하여 agent 배포
	- policy & identity: 인증/권한(인가)에 대한 내용
	- payments: 외부도구 과금에 관한 도구
	  ![[Pasted image 20261015134443.png|212]]

#### 2. EC2 : Elastic Compute Cloud
#### 3. Lambda
- Serverless > 서버는있으나 알아서(사용자가 직접 관리 X)
- AgentCore뒤에 붙이기
#### 4. S3 : Storage sv
-  비슷한 DB
	- DynamoDB
	- Opensearch : VectorDB
- 다양한 데이터 저장하는 storage > bucket 1개 50TB (무제한)

# 3. Claude Code 실습
#### 1. Claude code 사용 환경
![[Pasted image 20261015141357.png]]
 - CLI 가 기능이 조금 더 많음
#### 2. Claude code 핵심 기능
![[Pasted image 20261015141514.png]]
- skills: 표준. 잘 만들었다면 조금 revise해서 codex에 바로 사용가능
- mcp: 표준.
#### 3. S3로 웹사이트 만들기
- claude code "S3사용해서 정적 웹사이트 만들어줘."
	- 정적 웹사이트: 호출할 때마다 동일한 정보 보여짐
	  <> 동적 웹사이트: 호출할 때마다 다른 데이터 노출됨![[Pasted image 20261015141802.png]]
#### 4. Claude 설정
- Claude.md 파일 설정
	- 어떤 폴더 내에 넣는지에 따라 적용 범위 달라짐
- 주요 command
	- /model : 모델설정 > opus - sonnet - haiku
	- /effort : 추론깊이 > 보통 새로나온 모델들만 적용
		- opus medium
		- 오히려 ex-high는 자가당착에 빠지는 경우 많음
	- /compact:
	- /clear: 세션 대화 삭제
- 참고: 세션간 대화 데이터가 공유되지 않음
	- 예를 들면 아래처럼 claude session 복수개 진행시, 왼쪽<>오른쪽 데이터 공유X![[Pasted image 20261015142642.png|530]]
	- 이 때는 A, B기능을 해볼때는 세션을 따로 열어서 해보는 것이 좋음
	- 또는 /clear 통해 세션을 삭제해서 진행
#### 5. 프롬프트 작성
- 구체적으로 작성필요하며, 역할부여 필요함.![[Pasted image 20261015142824.png]]
- 에러나면 claude에게 전달, 진행 가능

#### 6. 실습
- 테트리스 만들기
	- 서버?
		- CF에 진행한다는 의미 = S3에 저장하고, CF를 그 앞에 두었다는 의미
		- EC2에도 배포는 가능하지만, Agent용으로 사용하려면 session관리가 추가적으로 필요함
		- 원래 따로 개발해야하나, AgentCore를 이용해서 EC2에 Agent를 올릴 수 있음
- 포털 구축과 배포
	- React + TypeScript + Vite + Cloudscape 프로젝트를 만들어주세요.
	- 의존성 설치 후 개발 서버를 실행해주세요. = lib 설치
	  (https://cloudscape.design/)
- cf (Cloudfront)의 의미
	- CF = CDN서비스 => 캐시Cache 서버
	- CF제공하는 데이터센터 전세계에 800여개, 국내 10여개
		- 국내 서버에 caching
#### 7. Plugin
![[Pasted image 20261015152628.png]]
> **플러그인이란?**
	- 누군가가 만들어둔 스킬 등이 포함된 뭉텅이 > 설치해서 사용
	- 필요한 플러그인을 가져다쓰면 됨

###### 1. Claude.md
- 맥락 + 반복적인 규칙 등을 설정하기 위해 만드는 것 (개인정보삭제, NN줄 이내 등)
- md 파일 만들기 (중요함, 다만 이조차도 claude로 만들어낼 수 있음)	![[Pasted image 20261015152824.png]]
	- md파일의 위치에 따라 적용 범위가 달라짐![[Pasted image 20261015153014.png|565]]

###### 2. Hooks
- Claude.md vs Hook
	- Claude.md는 지침, Hook은 강제
	- Claude.md는 마크다운, Hook은 json 타입으로 작성![[Pasted image 20261015153325.png]]> 해석 | 도구를 사용한 후에, 파일을 쓰고 고치는 도구를 불러서, 개인정보 수정

- Hooks 이벤트와 적용시점 등 역시 Claude에게 조언을 얻으면서 만드는 방법으로
	- 이벤트 종류는 아래 참고![[Pasted image 20261015153714.png]]![[Pasted image 20261015153552.png]]

###### 3. Skills
- 도구들의 절차를 규칙으로 만드는 것 (ex. 웹서치 > 검증 > 초안 등..)
- /[Skills-name] 으로 호출
- skill은 markdown파일로 작성![[Pasted image 20261015154254.png]]
	- 프론트매터: name = skill의 호출 방법이 됨
	- 디스크립션: 이 skill을 언제쓰는 건지 작성해두는 것. 작성 잘해두면 굳이 호출하지 않아도 알아서 skill이 호출되어 작동하기도 함.
	- 즉, 호출 방법은 2가지 > 자연어 요청 (디스크립션 기반으로 자동호출) / 이름으로 호출

 ###### 4. Sub-Agents
- sub-agent와 main-agent의 모델설정을 다르게 할 수 있음
- Role 설정을 따로 할 수 있음
- 장점: Token 비용 효율화 + 동시작업 가능![[Pasted image 20261015154319.png]]
- 요즘은 에이전트 자체를 Multi-Agent 로 작업하여 진행함 (A2A)![[Pasted image 20261015154606.png]]
###### 5. **Mode**
- Plan mode
	- 현재 지시내리면 바로 동작 > 결과 수정 필요시 재작업 필요
	- Plan mode = 작업 진행 전 계획을 먼저 세우고 동작
	- 장점: 빠진 것 등에 대한 보정 후에 작업 진행 가능
- 권한모드
	- 최근의 defualt = auto mode (명령 자동수행) > 정보 수집, 정리 정도는 auto mode가 편함
	- 직접적인 수행이 위험한 작업같은 경우 권한모드로 진행하는 것이 안전

 ###### 6. Review
- /review: 바꾼 곳만 점검 (as-is, to-be 비교)

#Tip 실습 또는 작업을 전부 진행한 다음에 아래 프롬프트 작성

> 이번 실습에서 만들고 바꾼 파일과 그 이유를 정리해주세요. 
> 그리고 이번 실습 범위 안에서, 다음에도 지켜야 할 규칙은 CLAUDE.md에, 반복할 절차는 Skill로 남길 만한 것이 있는지 제안해주세요. 제안만 하고 아직 만들지는 마세요."



