'use client';
import { useState } from 'react';
import InputForm from '../components/InputForm';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import jsPDF from 'jspdf';

// 템플릿 목록 + 설명
const TEMPLATES = [
  { key: 'service', label: '서비스 기획', desc: '시장분석, 수익모델, 전략 포함' },
  { key: 'appweb', label: '앱·웹 기획', desc: 'UX 흐름, 화면 구조, 기능정의 포함' },
  { key: 'marketing', label: '마케팅', desc: '채널 전략, KPI, 콘텐츠 예시 포함' },
  { key: 'content', label: '콘텐츠 기획', desc: '콘셉트, 유통 전략, 스토리보드 포함' },
  { key: 'project', label: '프로젝트 제안', desc: '문제정의, 예산, 인력계획 포함' },
  { key: 'pitchdeck', label: '피치덱', desc: '문제–해결–시장–팀–투자 구성' },
  { key: 'strategy', label: '전략 기획', desc: 'SWOT, KPI, 전략 과제 포함' },
  { key: 'ops', label: '운영 기획', desc: '운영 프로세스, 리스크 관리 포함' },
  { key: 'market', label: '시장 조사', desc: '조사 범위, 분석, 인사이트 포함' },
  { key: 'budget', label: '예산 기획', desc: '예산 항목, 비용 근거 포함' },
  { key: 'govsupport', label: '지원사업', desc: 'R&D, 정부과제 연계 구성' },
];

// 구성 항목 프리뷰 (요약)
const STRUCTURE_PREVIEW = {
  service: ['시장/트렌드 분석', '핵심 기능', '수익모델'],
  appweb: ['사용자 시나리오', '화면 흐름도', '기술 스택'],
  marketing: ['STP 분석', '채널 전략', 'KPI'],
  content: ['콘셉트', '콘텐츠 구조', '유통 전략'],
  project: ['문제점', '세부 추진 전략', '예산'],
  pitchdeck: ['문제 정의', '시장 규모', '투자 요청'],
  strategy: ['SWOT', '전략 과제', '성과 지표'],
  ops: ['운영 절차', '리스크 관리', '인력 구성'],
  market: ['조사 범위', '경쟁사 분석', '인사이트'],
  budget: ['예산 항목', '재원 계획', 'KPI'],
  govsupport: ['정책 연계', '정량 목표', '성과 방안'],
};

export default function Home() {
  const [idea, setIdea] = useState('');
  const [template, setTemplate] = useState('service');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // 고급 입력용 상태
  const [audience, setAudience] = useState('');
  const [situation, setSituation] = useState('');
  const [background, setBackground] = useState('');
  const [extra, setExtra] = useState('');
  const [mode, setMode] = useState('simple'); // 'simple' or 'advanced'

  const handleGenerate = async () => {
    if (!idea.trim()) {
      alert('아이디어를 입력해주세요!');
      return;
    }

    setLoading(true);
    setResult('');
    setCopied(false);
    setExpanded(false);

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idea,
        template,
        audience: mode === 'advanced' ? audience : '',
        situation: mode === 'advanced' ? situation : '',
        background: mode === 'advanced' ? background : '',
        extra: mode === 'advanced' ? extra : '',
      }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(result, 180);
    doc.text(lines, 15, 20);
    doc.save('기획서.pdf');
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* 헤더 */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">AI 기획 도우미 ✍️</h1>
        <p className="text-gray-600">아이디어만 입력하면 템플릿에 맞는 기획서를 자동 생성합니다.</p>
      </header>

      {/* 입력폼 */}
      <InputForm
        idea={idea}
        setIdea={setIdea}
        template={template}
        setTemplate={setTemplate}
        onSubmit={handleGenerate}
        loading={loading}
        templates={TEMPLATES}
        structurePreview={STRUCTURE_PREVIEW}
        audience={audience}
        setAudience={setAudience}
        situation={situation}
        setSituation={setSituation}
        background={background}
        setBackground={setBackground}
        extra={extra}
        setExtra={setExtra}
        mode={mode}
        setMode={setMode}
      />

      {/* 결과 */}
      {loading && <LoadingSpinner />}
      {result && (
        <ResultCard
          result={result}
          onCopy={handleCopy}
          onDownload={handleDownload}
          copied={copied}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      )}

      {/* 푸터 */}
      <footer className="text-center text-sm text-gray-400 mt-12">
        © 2025 AI 기획서 도우미 — 만든이: 박재희
      </footer>
    </main>
  );
}
