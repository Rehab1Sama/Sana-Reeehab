export const metadata = {
  title: 'سنا الآي - نظام إدارة المقرأة',
  description: 'نظام متابعة الحلقات والإنجازات القرآنية',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50 text-gray-900 min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
}
