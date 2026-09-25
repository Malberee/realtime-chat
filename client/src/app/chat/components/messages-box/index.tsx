'use client'

import { useVirtualizer } from '@tanstack/react-virtual'
import { useCallback, useMemo } from 'react'

import { MessageType } from '@/types/database'

import { groupConsecutiveMessages } from '../../utils'
import { MessageGroup } from '../message-group'
import { useAutoScroll } from './hooks'
import { useMessagesRealtime } from './hooks/use-messages-realtime'

type MessagesBoxProps = {
  initialMessages: MessageType[]
  initialHasMore: boolean
}

export function MessagesBox({
  initialMessages,
  initialHasMore,
}: MessagesBoxProps) {
  const { messages, isLoadingOlder, loadOlderMessages, paginationBoundaryIds } =
    useMessagesRealtime(initialMessages, initialHasMore)

  const messageGroups = useMemo(
    () => groupConsecutiveMessages(messages, paginationBoundaryIds).reverse(),
    [messages, paginationBoundaryIds],
  )

  const getMessageGroupKey = useCallback(
    (index: number) => messageGroups[index]!.at(-1)!.id,
    [messageGroups],
  )

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: messageGroups.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 60,
    overscan: 5,
    anchorTo: 'end',
    getItemKey: getMessageGroupKey,
  })

  const { containerRef, onScroll } = useAutoScroll({
    latestMessageId: messages[0]?.id,
    virtualizer: rowVirtualizer,
    onReachStart: loadOlderMessages,
  })

  return (
    <div
      className="scroll-fade scrollbar-thumb-secondary scrollbar-thin gap-4 overflow-y-auto px-10 py-6"
      onScroll={onScroll}
      ref={containerRef}
    >
      <div
        className="relative w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {isLoadingOlder && (
          <div className="text-muted-foreground absolute top-2 left-0 w-full text-center text-sm">
            Loading older messages…
          </div>
        )}

        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={rowVirtualizer.measureElement}
            className="absolute top-0 left-0 w-full pb-4"
            style={{
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <MessageGroup messages={messageGroups[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  )
}
