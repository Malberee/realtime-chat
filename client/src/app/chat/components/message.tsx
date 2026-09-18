'use client'

import { cn } from 'cn'
import dayjs from 'dayjs'

import { Avatar, AvatarFallback } from '@/components/primitives/avatar'
import { Bubble, BubbleContent } from '@/components/primitives/bubble'
import { MessageType } from '@/types/database'

export enum MessagePosition {
  first = 'first',
  middle = 'middle',
  last = 'last',
  single = 'single',
}

type MessageProps = {
  message: MessageType
  position: MessagePosition
  isOwn?: boolean
}

export function Message({ message, position, isOwn = false }: MessageProps) {
  const { text, created_at, author } = message

  const isFirst = position === MessagePosition.first
  const isLast = position === MessagePosition.last
  const isSingle = position === MessagePosition.single

  const showUsername = isFirst || isSingle
  const showAvatar = isLast || isSingle

  const formattedDate = dayjs(created_at).format('HH:mm')

  return (
    <div className="flex flex-col gap-2">
      {showUsername && (
        <span className={cn('text-sm', isOwn && 'self-end')}>
          {author.username}
        </span>
      )}
      <div
        className={cn(
          'relative flex items-end gap-2',
          isOwn && 'flex-row-reverse',
        )}
      >
        <Bubble
          variant={isOwn ? 'default' : 'secondary'}
          align={isOwn ? 'end' : 'start'}
        >
          <BubbleContent
            className={cn(
              'rounded-3xl',
              (isLast || isSingle) &&
                (isOwn ? 'rounded-ee-sm' : 'rounded-es-sm'),
            )}
          >
            {text}
            <span className="block text-right text-xs opacity-75">
              {formattedDate}
            </span>
          </BubbleContent>
        </Bubble>
        {showAvatar && (
          <Avatar
            className={cn(
              'absolute',
              isOwn
                ? '-inset-e-2 translate-x-full'
                : '-inset-s-2 -translate-x-full',
            )}
          >
            {/* Temp */}
            <AvatarFallback>CG</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  )
}
