import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from '@/components/provider/theme-provider'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/components/provider/modal-provider'
import { SocketProvider } from '@/components/provider/socket-provider'
import { QueryProvider } from '@/components/provider/query-provider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ciscord',
  description: 'Communicate with people through text, audio and video channels.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className,
        "bg-light dark:bg-[#313338]"
        )}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          storageKey='ciscord-theme'
        >
          <SocketProvider>
            <ModalProvider />
            <QueryProvider>
            {children}
            </QueryProvider>
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
