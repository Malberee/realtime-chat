'use client'

import { getAvatarColorByNumber } from '@/lib/utils'
import { Avatar } from '@/types/database'

import { AvatarPart } from './avatar-part'

interface AvatarProps {
  avatar: Avatar
}

export function AvatarCombiner({ avatar }: AvatarProps) {
  const background = getAvatarColorByNumber(avatar.backgroundColor)
  const foreground = getAvatarColorByNumber(avatar.foregroundColor)

  return (
    <svg className="size-full rounded-full" viewBox="0 0 50 50">
      <rect
        x="0"
        y="0"
        width="50"
        height="50"
        stroke="black"
        fill={background}
      />
      <AvatarPart type={avatar.hair} row={0} foreground={foreground} />
      <AvatarPart type={avatar.forehead} row={1} foreground={foreground} />
      <AvatarPart type={avatar.nose} row={2} foreground={foreground} />
      <AvatarPart type={avatar.mouth} row={3} foreground={foreground} />
      <AvatarPart type={avatar.chin} row={4} foreground={foreground} />
    </svg>
  )
}
