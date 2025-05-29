export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center mt-6">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-3 text-blue-600 font-medium">생성 중입니다...</span>
    </div>
  );
}
