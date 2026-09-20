'use client'
import { RealtimeChannel } from '@supabase/supabase-js'
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

    let channel: RealtimeChannel

    const subscribe = async () => {
      await supabase.realtime.setAuth()

      channel = supabase
        .channel('messages', {
          config: {
            private: true,
          },
        })
        .on(
          'broadcast',
          {
            event: 'message_created',
          },
          ({ payload }) => {
            const newMessage = payload as MessageType

            setCurrentMessages((prev) => {
              if (prev.some((message) => message.id === newMessage.id)) {
                return prev
              }

              return [...prev, newMessage]
            })
          },
        )
        .subscribe()
    }

    subscribe()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [])
  const messageGroups = groupConsecutiveMessages(currentMessages)

  return (
    <div className="scroll-fade flex scrollbar-none flex-col gap-4 overflow-y-auto px-10 py-6">
      {messageGroups.map((group) => (
        <MessageGroup key={group[0].id} messages={group} />
      ))}
    </div>
  )
}
