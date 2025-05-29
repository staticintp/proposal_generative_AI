export async function POST(req) {
  const { idea, template, audience, situation, background, extra } = await req.json();

  // 템플릿별 프롬프트 prefix
  const TEMPLATES = {
    service: '신규 서비스 기획서를 작성해줘.',
    appweb: '앱/웹 기획서를 작성해줘.',
    marketing: '마케팅 기획서를 작성해줘.',
    content: '콘텐츠/영상 기획서를 작성해줘.',
    project: '외주 제안용 프로젝트 기획서를 작성해줘.',
    pitchdeck: '스타트업 IR용 피치덱을 작성해줘.',
    strategy: '사업 전략 기획서를 작성해줘.',
    ops: '서비스 운영 기획서를 작성해줘.',
    market: '시장 조사 기획서를 작성해줘.',
    budget: '예산 포함 실행 기획서를 작성해줘.',
    govsupport: '정부지원/공모사업 기획서를 작성해줘.',
  };

  // 템플릿별 구성 항목
  const STRUCTURES = {
    service: [
      '기획 배경 및 목적',
      '시장/트렌드 분석',
      '타깃 고객 및 문제 정의',
      '서비스 개요 및 핵심 기능',
      '차별성 및 경쟁우위',
      '수익모델 및 비즈니스 모델',
      '추진 일정 및 전략',
      '기대 효과 및 결론',
    ],
    appweb: [
      '기획 목적 및 배경',
      '사용자 시나리오 (Use Case)',
      '핵심 기능 목록 (Feature List)',
      '화면 흐름도 (Flow Chart)',
      '와이어프레임/레이아웃',
      '기술 스택 및 API 계획',
      '일정 및 협업 구조',
      '유지보수 및 확장 고려사항',
    ],
    marketing: [
      '마케팅 목표',
      '시장 및 고객 분석 (STP)',
      '경쟁사 분석',
      '핵심 메시지 및 전략',
      '채널별 실행 방안 (SNS/광고/이벤트 등)',
      'KPI 및 성과 측정',
      '예산 및 일정 계획',
      '기대 효과',
    ],
    content: [
      '제작 목적 및 콘셉트',
      '타깃 및 유통 채널',
      '콘텐츠 구조 (시놉시스/시나리오/스토리보드)',
      '제작 일정 및 리소스',
      '협업 및 외주 계획',
      '유통 및 마케팅 방안',
      '예산 및 기대 효과',
    ],
    project: [
      '제안 배경 및 목적',
      '프로젝트 개요',
      '문제점 및 개선 방향',
      '목표 및 세부 추진 전략',
      '일정 및 단계별 계획',
      '참여 인력 및 역할',
      '예산 산정',
      '기대 효과 및 결론',
    ],
    pitchdeck: [
      '문제 정의',
      '솔루션 및 제품 개요',
      '시장 크기 및 성장성',
      '비즈니스 모델',
      '경쟁사 비교 및 차별점',
      '트랙션 및 성과',
      '팀 소개',
      '투자 요청 및 활용 계획',
    ],
    strategy: [
      '기업/서비스 개요',
      '외부 환경 분석 (시장, 트렌드)',
      '내부 역량 분석 (SWOT)',
      '전략 방향 설정 (Vision/Mission)',
      '전략 과제 및 실행 계획',
      '성과 측정 지표 (KPI)',
      '리스크 요인 및 대응 전략',
      '결론 및 요약',
    ],
    ops: [
      '서비스/시스템 개요',
      '운영 목적 및 범위',
      '프로세스 플로우',
      '운영 지표 및 모니터링 방안',
      '이슈 대응 및 리스크 관리',
      '인력 구성 및 역할',
      '일정/시프트 운영안',
      '결론 및 개선안 제언',
    ],
    market: [
      '조사 목적 및 배경',
      '조사 대상 및 범위',
      '조사 방법론 (정성/정량)',
      '경쟁사 및 유사 사례 분석',
      '주요 조사 결과',
      '인사이트 및 시사점',
      '전략 제안',
      '참고 문헌 및 부록',
    ],
    budget: [
      '사업 개요 및 목표',
      '실행 계획 및 전략',
      '세부 추진 일정',
      '인력 및 조직 구성',
      '세부 예산 항목 (항목별 Breakdown)',
      '재원 조달 계획',
      '성과 목표 및 KPI',
      '기대 효과 및 결론',
    ],
    govsupport: [
      '지원사업 개요 및 목적',
      '사업 필요성 및 정책 연계성',
      '추진 전략 및 기대 효과',
      '예산 계획',
      '정량 목표 및 정성 목표',
      '성과 측정 방안',
    ],
  };

  const structureList = STRUCTURES[template] || STRUCTURES['service'];
  const structureText = structureList.map((item, i) => `${i + 1}. ${item}`).join('\n');

  const promptParts = [
    `당신은 기획 전문가입니다. 실무용 ${template} 기획서를 아래 정보를 기반으로 작성해주세요.`,
    audience ? `- 제안 대상: ${audience}` : '',
    situation ? `- 현재 상황: ${situation}` : '',
    background ? `- 기획 배경 및 목적: ${background}` : '',
    extra ? `- 추가 요청사항: ${extra}` : '',
    '',
    '요청사항:',
    '- 각 항목은 현실적이고 구체적인 문장으로 구성해주세요.',
    '- 마크다운 기호 없이 일반적인 문서 형식으로 작성해주세요.',
    '- 제목 뒤에 설명을 줄바꿈하여 기술하고, 번호 또는 제목은 간단히만 표시해주세요.',
    '',
    `아이디어:\n${idea}`,
    '',
    `기획서는 아래 항목을 중심으로 구성해주세요:\n\n${structureText}`,
  ].filter(Boolean).join('\n');

  const body = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: promptParts }
        ]
      }
    ]
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
  );

  const data = await res.json();
  const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || '기획서 생성 실패';

  return Response.json({ result });
}
