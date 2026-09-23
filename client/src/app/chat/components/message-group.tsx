import { BubbleGroup } from '@/components/ui'
import { useProfile } from '@/providers'
import { MessageType } from '@/types/database'

import { Message, MessagePosition } from './message'

type MessageGroupProps = {
  messages: MessageType[]
}

export function MessageGroup({ messages }: MessageGroupProps) {
  const { id } = useProfile()

  function getMessagePosition(index: number) {
    if (messages.length === 1) return MessagePosition.single
    if (index === 0) return MessagePosition.first
    if (index === messages.length - 1) return MessagePosition.last
    return MessagePosition.middle
  }

  return (
    <BubbleGroup>
      {messages.map((message, index) => (
        <Message
          key={message.id}
          message={message}
          position={getMessagePosition(index)}
          isOwn={message.author.id === id}
        />
      ))}
    </BubbleGroup>
  )
}
