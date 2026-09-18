'use client'

import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { MessageType } from '@/types/database'

import { groupConsecutiveMessages } from '../utils'
import { MessageGroup } from './message-group'

type MessagesBoxProps = {
  messages: MessageType[]
}

export function MessagesBox({ messages }: MessagesBoxProps) {
  const [currentMessages, setCurrentMessages] = useState(messages)

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
        async (payload) => {
          const { data: author } = await supabase
            .from('profiles')
            .select('id, username, avatar')
            .eq('id', payload.new.author_id)
            .single()

          if (!author) {
            return
          }

          const newMessage: MessageType = {
            id: payload.new.id,
            text: payload.new.text,
            created_at: payload.new.created_at,
            author,
          }

          setCurrentMessages((prev) => [...prev, newMessage])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const messageGroups = groupConsecutiveMessages(currentMessages)

  return (
    <div className="scroll-fade flex scrollbar-none flex-col gap-4 overflow-y-auto px-10 py-6">
      {messageGroups.map((group, index) => (
        <MessageGroup key={group[0].author.id + index} messages={group} />
      ))}
    </div>
  )
}
