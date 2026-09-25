import { useCallback, useEffect, useRef, useState } from 'react'

import { getMessagesPage } from '@/lib/queries/messages'
import { createClient } from '@/lib/supabase/client'
import { MessageType } from '@/types/database'

export function useMessagesRealtime(
  initialMessages: MessageType[],
  initialHasMore: boolean,
) {
  const [messages, setMessages] = useState(initialMessages)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoadingOlder, setIsLoadingOlder] = useState(false)

  const [paginationBoundaryIds, setPaginationBoundaryIds] = useState<
    Set<string>
  >(new Set())

  const isLoadingOlderRef = useRef(false)

  const loadOlderMessages = useCallback(async () => {
    if (!hasMore || isLoadingOlderRef.current) {
      return
    }

    const oldestMessage = messages.at(-1)

    if (!oldestMessage) {
      return
    }

    isLoadingOlderRef.current = true
    setIsLoadingOlder(true)

    try {
      const page = await getMessagesPage({
        id: oldestMessage.id,
        created_at: oldestMessage.created_at,
      })

      if (page.messages.length > 0) {
        setPaginationBoundaryIds((prev) => {
          const next = new Set(prev)
          next.add(page.messages[0]!.id)
          return next
        })
      }

      setMessages((prev) => [...prev, ...page.messages])
      setHasMore(page.hasMore)
    } finally {
      isLoadingOlderRef.current = false
      setIsLoadingOlder(false)
    }
  }, [hasMore, messages])

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

            return [newMessage, ...prev]
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

  return {
    messages,
    hasMore,
    isLoadingOlder,
    loadOlderMessages,
    paginationBoundaryIds,
  }
}
