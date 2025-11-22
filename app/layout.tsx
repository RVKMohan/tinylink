import '../styles/globals.css'

export const metadata = {
  title: 'TinyLink',
  description: 'TinyLink - URL shortener'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="bg-white shadow">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-semibold">TinyLink</h1>
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
          <footer className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">Built with Next.js + Prisma</footer>
        </div>
      </body>
    </html>
  )
}
