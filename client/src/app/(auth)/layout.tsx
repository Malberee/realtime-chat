import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-1 items-center justify-center">{children}</main>
  )
}
