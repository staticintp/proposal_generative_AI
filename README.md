# ✨ AI 기획 도우미 (AI Planning Assistant) 
👉 배포 링크: https://proposal-generative-ai.vercel.app/

> ✍️ 단 하나의 아이디어로 완성도 높은 기획서를 자동 생성하는 AI 기반 웹 애플리케이션  
> 서비스 기획부터 피치덱까지, 단 1분 안에 템플릿 기반 기획서를 생성하고 PDF로 저장하세요.

---

## 🧠 프로젝트 개요

**AI 기획 도우미**는 누구나 손쉽게 기획서를 만들 수 있도록 돕는 1인 프로젝트입니다.  
기획서 작성에 어려움을 겪는 예비 창업자, 마케터, 대학생 등을 위한 생산성 도구로,  
**Google Gemini API** 기반 자연어 생성을 통해 기획 아이디어를 구조화된 문서로 자동 생성합니다.

---

## 🎯 주요 기능

- 다양한 템플릿 기반 자동 기획서 생성
- 간단 입력 / 고급 입력 모드 제공
- 생성된 결과 수정, 복사, PDF 저장 지원
- Gemini API 연동으로 자연스러운 문서 생성
- 반응형 UI 적용 (Tailwind CSS)
- Firebase 로그인 기능 (Google, Kakao 연동 예정)
- 사용자별 기획서 저장 및 히스토리 관리
- 관리자 대시보드 제공 (사용자 및 통계 관리)

---

## 🧭 사용자 흐름 (User Flow)

```
[1] 홈 접속
   ↓
[2] 템플릿 선택 (예: 서비스 기획 / 피치덱 / 마케팅)
   ↓
[3] 입력 모드 선택
    ├─ 간단 입력: 한 줄 아이디어
    └─ 고급 입력: 배경, 목적, 요구사항 등 상세 입력
   ↓
[4] '기획서 생성' 클릭
   ↓
[5] Gemini API 기반 기획서 자동 생성
   ↓
[6] 결과 활용
    ├─ 복사
    ├─ PDF 저장
    └─ 수정 및 피드백 요청 (로그인 시)
```

---

## 🔐 사용자 권한별 기능 요약

| 기능 | 비회원 | 로그인 회원 | 관리자 |
|------|--------|--------------|---------|
| 기획서 생성 (간단 입력) | ✅ | ✅ | ✅ |
| 고급 입력 모드 | ❌ | ✅ | ✅ |
| 결과 복사 | ✅ | ✅ | ✅ |
| PDF 저장 | ❌ | ✅ | ✅ |
| 기획서 수정/보완 | ❌ | ✅ | ✅ |
| 저장/히스토리 관리 | ❌ | ✅ | ✅ |
| 관리자 페이지 접근 | ❌ | ❌ | ✅ |
| 사용자 활동/통계 열람 | ❌ | ❌ | ✅ |

---

## ⚙️ 사용 기술 스택

| 구분 | 기술 |
|------|------|
| **Frontend** | Next.js 15 (App Router), React 19, Tailwind CSS |
| **Editor** | JSX + jsPDF, (추후 react-quill) |
| **Backend/API** | Next.js API Routes + Google Gemini API |
| **Auth** | Firebase Authentication (Google, Kakao) |
| **Database** | Firebase Firestore |
| **배포** | Vercel (무료) |
| **기타 도구** | .env.local, .gitignore, 환경변수 분리 |

---

## 🏛️ 프로젝트 구조

```
/app
  ├─ /api/generate          → Gemini API 호출
  ├─ /result                → 생성 결과 페이지
  ├─ /workspace/[id]        → 기획서 편집 및 피드백 페이지
  └─ /share/[id]            → 공유 가능한 결과 미리보기

/components
  ├─ InputForm.js           → 입력 모드 UI
  ├─ ResultCard.js          → 결과 렌더링
  ├─ LoadingSpinner.js      → 로딩 표시

/lib
  └─ gemini.js              → Gemini API 요청 처리

/public
  └─ favicon, og 이미지 등 정적 자산

.env.local                  → API 키 등 환경변수
```

---

## 🧪 향후 개선 예정 기능

- Kakao 로그인 연동
- 기획서 버전 히스토리 저장 및 비교 기능
- 관리자용 기획 통계 대시보드
- 템플릿 커스터마이징 기능
- 공유용 링크 생성 및 협업 편집 기능
- 다크모드 UI 적용

---

## 📌 마치며

처음 기획에서 결과 생성, 저장, 피드백까지  
기획의 시작과 끝을 함께하는 "AI 기획 파트너"를 목표로 만든 1인 프로젝트입니다.

---


