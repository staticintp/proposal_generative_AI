'use client';
import { useState } from 'react';

export default function InputForm({
  idea,
  setIdea,
  template,
  setTemplate,
  onSubmit,
  loading,
  templates,
  structurePreview,
  audience,
  setAudience,
  situation,
  setSituation,
  background,
  setBackground,
  extra,
  setExtra,
  mode,
  setMode
}) {
  return (
    <div>
      {/* 템플릿 선택 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {templates.map((tpl) => (
          <button
            key={tpl.key}
            onClick={() => setTemplate(tpl.key)}
            className={`px-3 py-1 text-sm rounded border ${
              template === tpl.key ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
            }`}
            title={tpl.desc}
          >
            {tpl.label}
          </button>
        ))}
      </div>

      {/* 구성 항목 예시 */}
      <div className="text-sm text-gray-600 mb-4">
        <strong>구성 항목 예시:</strong> {structurePreview[template].join(' → ')}
      </div>

      {/* 모드 전환 */}
      <div className="mb-4">
        <label className="text-sm font-medium mr-2">입력 모드:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="simple">간단 입력</option>
          <option value="advanced">고급 입력</option>
        </select>
      </div>

      {/* 간단 입력 */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">아이디어 입력</label>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="예: 반려동물 산책 대행 앱"
          className="w-full p-4 border border-gray-300 rounded-lg resize-none h-36 text-sm"
        />
      </div>

      {/* 고급 입력 */}
      {mode === 'advanced' && (
        <div className="space-y-5 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">제안 대상</label>
            <textarea
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="예: 스타트업 투자자, 사내 전략 회의 등"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-28 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">현재 상황</label>
            <textarea
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="예: 베타 버전 런칭 완료, 팀 5명 구성 등"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-28 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">기획 배경 및 목적</label>
            <textarea
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="예: 사용자 불편 해소를 위한 솔루션 기획"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-28 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">추가 요청사항</label>
            <textarea
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              placeholder="예: 친근한 어조, 발표용 요약 포함 등"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-28 resize-none"
            />
          </div>
        </div>
      )}

      {/* 버튼 */}
      <button
        onClick={onSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? '생성 중...' : '기획서 생성'}
      </button>
    </div>
  );
}
