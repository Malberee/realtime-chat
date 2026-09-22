import { useEffect, useRef } from 'react'

export function useAutoScroll<T>(observableList: T[]) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isAtBottomRef = useRef(true)

  const handleScroll = () => {
    const container = containerRef.current

    if (!container) {
      return
    }

    isAtBottomRef.current = container.scrollTop >= -50
  }

  useEffect(() => {
    const container = containerRef.current

    if (!container || !isAtBottomRef.current) {
      return
    }

    container.scrollTo({
      top: 0,
    })
  }, [observableList])

  return {
    containerRef,
    onScroll: handleScroll,
  }
}
