import type { PropsWithChildren } from 'react'

import { Header } from '@/components/shared'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-1 items-center justify-center">
      <Header />
      {children}
    </main>
  )
}
