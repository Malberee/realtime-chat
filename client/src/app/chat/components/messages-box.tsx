'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { createClient } from '@/lib/supabase/client'
import { MessageType } from '@/types/database'

import { groupConsecutiveMessages } from '../utils'
import { MessageGroup } from './message-group'

type MessagesBoxProps = {
  messages: MessageType[]
}

export function MessagesBox({ messages }: MessagesBoxProps) {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel('messages-inserts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        () => {
          router.refresh()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [router])

  const messageGroups = groupConsecutiveMessages(messages)

  return (
    <div className="scroll-fade flex scrollbar-none flex-col gap-4 overflow-y-auto px-10 py-6">
      {messageGroups.map((group, index) => (
        <MessageGroup key={group[0].author.id + index} messages={group} />
      ))}
    </div>
  )
}
