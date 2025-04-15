import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CourseProvider } from './CourseContext'
import { CareerProvider } from './CareerContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Learning Platform',
  description: 'A platform for learning and career development',
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
        <ThemeProvider defaultTheme="system">
          <CourseProvider>
            <AuthProvider>
              <CareerProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">{children}</main>
                  <footer className="bg-white dark:bg-gray-900 py-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-4">
                      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} Learning Platform. All rights reserved.
                      </p>
                    </div>
                  </footer>
                </div>
              </CareerProvider>
            </AuthProvider>
          </CourseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 