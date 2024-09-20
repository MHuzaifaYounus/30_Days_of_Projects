import "./globals.css"
export const metadata = {
  title: '30 Days of 30 Projects',
  description: 'Made by Huzaifa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
