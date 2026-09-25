import type { MessageType } from '@/types/database'

export function groupConsecutiveMessages(
  messages: MessageType[],
  paginationBoundaryIds: Set<string>,
) {
  const groups: MessageType[][] = []

  for (const message of messages) {
    const lastGroup = groups.at(-1)

    const isPaginationBoundary = paginationBoundaryIds.has(message.id)

    if (
      !isPaginationBoundary &&
      lastGroup?.[0].author.id === message.author.id
    ) {
      lastGroup.unshift(message)
    } else {
      groups.push([message])
    }
  }

  return groups
}
