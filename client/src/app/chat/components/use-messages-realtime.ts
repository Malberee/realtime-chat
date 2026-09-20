import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { MessageType } from '@/types/database'

export function useMessagesRealtime(initialMessages: MessageType[]) {
  const [messages, setMessages] = useState(initialMessages)

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
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

          setMessages((prev) => {
            if (prev.some((message) => message.id === newMessage.id)) {
              return prev
            }

            return [...prev, newMessage]
          })
        },
      )

    let cancelled = false

    async function subscribe() {
      await supabase.realtime.setAuth()

      if (!cancelled) {
        channel.subscribe()
      }
    }

    subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [])

  return messages
}
