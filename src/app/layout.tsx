import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'DSA Learning Platform',
  description: 'Learn Data Structures, Algorithms and Programming Languages',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  
                  if (theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {
                  console.error('Failed to set initial theme:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} font-sans`}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <footer className="bg-dark text-white py-8 dark:bg-gray-900">
              <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <span className="text-2xl font-bold">CodeMaster</span>
                    <p className="text-gray-400 mt-2">Learn. Practice. Master.</p>
                  </div>
                  <div className="flex space-x-4">
                    <a href="#" className="hover:text-primary transition-colors">Home</a>
                    <a href="#" className="hover:text-primary transition-colors">Courses</a>
                    <a href="#" className="hover:text-primary transition-colors">Resources</a>
                    <a href="#" className="hover:text-primary transition-colors">About</a>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
                  © {new Date().getFullYear()} CodeMaster. All rights reserved.
                </div>
              </div>
            </footer>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 