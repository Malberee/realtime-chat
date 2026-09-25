import { type Virtualizer } from '@tanstack/react-virtual'
import { useLayoutEffect, useRef } from 'react'

type UseAutoScrollOptions = {
  latestMessageId: string | undefined
  virtualizer: Virtualizer<HTMLDivElement, Element>
  onReachStart: () => void
}

export function useAutoScroll({
  latestMessageId,
  virtualizer,
  onReachStart,
}: UseAutoScrollOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isAtBottomRef = useRef(true)

  const handleScroll = () => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight

    isAtBottomRef.current = distanceFromBottom <= 50

    if (container.scrollTop <= 200) {
      onReachStart()
    }
  }

  useLayoutEffect(() => {
    if (!isAtBottomRef.current || !latestMessageId) {
      return
    }

    requestAnimationFrame(() => {
      virtualizer.scrollToEnd()
    })
  }, [latestMessageId, virtualizer])

  return {
    containerRef,
    onScroll: handleScroll,
  }
}
