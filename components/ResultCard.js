'use client';
import html2pdf from 'html2pdf.js';

export default function ResultCard({
  result,
  onCopy,
  copied,
  expanded,
  setExpanded,
}) {
  const handleDownload = () => {
    const element = document.getElementById('result-content');

    const opt = {
      margin: 0.5,
      filename: '기획서.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">📄 생성된 기획서</h2>

      {/* 다운로드 타겟이 되는 div */}
      <div id="result-content">
        <pre className={`whitespace-pre-wrap text-sm ${!expanded ? 'line-clamp-10 overflow-hidden' : ''}`}>
          {result}
        </pre>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-600 text-sm mt-2 underline"
      >
        {expanded ? '▲ 접기' : '▼ 더보기'}
      </button>

      <div className="mt-4 flex gap-3">
        <button
          onClick={onCopy}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          {copied ? '📋 복사됨!' : '📋 복사하기'}
        </button>
        <button
          onClick={handleDownload}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 text-sm"
        >
          📥 PDF 저장
        </button>
      </div>
    </div>
  );
}
