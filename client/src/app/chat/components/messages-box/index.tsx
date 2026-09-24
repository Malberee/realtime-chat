'use client'

import { MessageType } from '@/types/database'

import { groupConsecutiveMessages } from '../../utils'
import { MessageGroup } from '../message-group'
import { useAutoScroll } from './hooks'
import { useMessagesRealtime } from './hooks/use-messages-realtime'

type MessagesBoxProps = {
  initialMessages: MessageType[]
}

export function MessagesBox({ initialMessages }: MessagesBoxProps) {
  const messages = useMessagesRealtime(initialMessages)
  const messageGroups = groupConsecutiveMessages(messages)
  const { containerRef, onScroll } = useAutoScroll(messages)

  return (
    <div
      className="scroll-fade scrollbar-thumb-secondary flex scrollbar-thin flex-col-reverse gap-4 overflow-y-auto px-10 py-6"
      onScroll={onScroll}
      ref={containerRef}
    >
      {messageGroups.map((group) => (
        <MessageGroup key={group[0].id} messages={group} />
      ))}
    </div>
  )
}
