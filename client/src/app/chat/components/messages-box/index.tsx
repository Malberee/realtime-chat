'use client'

import { MessageType } from '@/types/database'

import { groupConsecutiveMessages } from '../../utils'
import { MessageGroup } from '../message-group'
import { useMessagesRealtime } from './use-messages-realtime'

type MessagesBoxProps = {
  initialMessages: MessageType[]
}

export function MessagesBox({ initialMessages }: MessagesBoxProps) {
  const messages = useMessagesRealtime(initialMessages)

  const messageGroups = groupConsecutiveMessages(messages)

  return (
    <div className="scroll-fade flex scrollbar-none flex-col gap-4 overflow-y-auto px-10 py-6">
      {messageGroups.map((group) => (
        <MessageGroup key={group[0].id} messages={group} />
      ))}
    </div>
  )
}
