import { useEffect, useRef } from 'react'

type Virtualizer = {
  scrollToIndex: (
    index: number,
    options?: {
      align?: 'start' | 'center' | 'end' | 'auto'
    },
  ) => void
}

export function useAutoScroll(itemCount: number, virtualizer: Virtualizer) {
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
  }

  useEffect(() => {
    if (!isAtBottomRef.current || itemCount === 0) {
      return
    }

    requestAnimationFrame(() => {
      virtualizer.scrollToIndex(itemCount - 1, {
        align: 'end',
      })
    })
  }, [itemCount, virtualizer])

  return {
    containerRef,
    onScroll: handleScroll,
  }
}
