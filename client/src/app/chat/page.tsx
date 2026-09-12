import { Button } from '@/components/primitives/button'
import { signOut } from '@/lib/actions/auth'

export default function Chat() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <p>/chat</p>
      <Button onClick={signOut}>Sign out</Button>
    </main>
  )
}
