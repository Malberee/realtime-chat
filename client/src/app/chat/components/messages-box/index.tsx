'use client'

import { useVirtualizer } from '@tanstack/react-virtual'

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
  const messageGroups = groupConsecutiveMessages(messages).reverse()

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: messageGroups.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 60,
    overscan: 5,
  })

  const { containerRef, onScroll } = useAutoScroll(
    messageGroups.length,
    rowVirtualizer,
  )

  return (
    <div
      className="scroll-fade scrollbar-none overflow-y-auto px-10 py-6"
      onScroll={onScroll}
      ref={containerRef}
    >
      <div
        className="relative w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const group = messageGroups[virtualItem.index]

          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={rowVirtualizer.measureElement}
              className="absolute top-0 left-0 w-full pb-4"
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <MessageGroup messages={group} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
