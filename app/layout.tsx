import './globals.css'

export const metadata = {
  title: 'TinyLink',
  description: 'TinyLink - URL shortener'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div >
          <header >
            <div >
              <h1 >TinyLink</h1>
            </div>
          </header>
          <main >{children}</main>
          <footer >Built with Next.js + Prisma</footer>
        </div>
      </body>
    </html>
  )
}
