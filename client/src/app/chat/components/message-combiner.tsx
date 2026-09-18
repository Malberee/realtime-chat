'use client'

import { SendIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { KeyboardEvent, SubmitEvent, useRef, useState } from 'react'

import { Button } from '@/components/primitives/button'
import { Textarea } from '@/components/primitives/textarea'
import { sendMessage } from '@/lib/queries/messages'

export function MessageCombiner() {
  const [text, setText] = useState('')
  const formRef = useRef<HTMLFormElement | null>(null)

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()

      formRef.current?.requestSubmit()
    }
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()

    const message = text.trim()

    if (message) {
      await sendMessage(message)
      setText('')
    }
  }

  return (
    <form className="flex gap-2" ref={formRef} onSubmit={handleSubmit}>
      <Textarea
        name="text"
        placeholder="Enter message"
        className="max-h-40 min-h-9 resize-none scrollbar-none"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKeyDown}
      />
      <Button type="submit" size="icon-lg" className="size-9.5">
        <HugeiconsIcon icon={SendIcon} />
      </Button>
    </form>
  )
}
