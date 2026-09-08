import { ArrowRight04FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Button } from '@/components/primitives/button'
import { Input } from '@/components/primitives/input'

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="max-w-65">
        <Input placeholder="Enter username" className="mb-2" />
        <Button className="w-full">
          Start chatting
          <HugeiconsIcon icon={ArrowRight04FreeIcons} data-icon="inline-end" />
        </Button>
      </div>
    </main>
  )
}
