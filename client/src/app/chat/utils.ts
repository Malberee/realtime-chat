import type { MessageType } from '@/types/database'

export function groupConsecutiveMessages(messages: MessageType[]) {
  const groups: MessageType[][] = []

  for (const message of messages) {
    const lastGroup = groups.at(-1)

    if (lastGroup?.[0].author.id === message.author.id) {
      lastGroup.unshift(message)
    } else {
      groups.push([message])
    }
  }

  return groups
}
