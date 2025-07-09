import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { Toaster } from '@/components/ui/toaster'
import { EdgeStoreProvider } from '@/lib/edgestore'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hotion - Enhanced Notion Clone',
  description: 'A powerful workspace for notes, docs, and collaboration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <EdgeStoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  )
}
