// app/layout.js
import '../styles/globals.css'; // Tailwind CSS 불러오기

export const metadata = {
  title: 'AI 기획서 도우미',
  description: '아이디어로 기획서를 자동으로 기획서 형태로 변환해주는 도우미 서비스입니다',
   icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head />
      <body>{children}</body>
    </html>
  );
}
