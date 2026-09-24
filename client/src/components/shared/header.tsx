import type { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

type HeaderProps = { className?: string } & PropsWithChildren

export function Header({ className, children }: HeaderProps) {
  return (
    <header
      className={cn(
        'bg-background/50 absolute top-0 left-0 z-10 flex w-full items-center justify-between p-4 backdrop-blur-sm',
        className,
      )}
    >
      <span className="text-xl select-none">Realtime Chat</span>
      {children}
    </header>
  )
}
