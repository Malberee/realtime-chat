import type { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

type HeaderProps = { className?: string } & PropsWithChildren

export function Header({ className, children }: HeaderProps) {
  return (
    <header
      className={cn(
        'absolute top-0 left-0 flex w-full items-center justify-between p-6',
        className,
      )}
    >
      <span className="text-xl select-none">Realtime Chat</span>
      {children}
    </header>
  )
}
