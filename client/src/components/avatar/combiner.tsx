import { Avatar } from '@/types/database'

import { AvatarPart } from './avatar-part'

export function AvatarCombiner(avatar: Avatar) {
  if (avatar) {
    const background = getColor(avatar.backgroundColor)
    const foreground = getColor(avatar.foregroundColor)

    return (
      <svg width="100" height="100" viewBox="0 0 50 50">
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
  } else {
    return <></>
  }
}

function getColor(color: number) {
  const colors: Record<number, string> = {
    1: '#fe9a00',
    2: '#2b7fff',
    3: '#00b8db',
    4: '#00bc7d',
    5: '#e12afb',
    6: '#00c950',
    7: '#615fff',
    8: '#7ccf00',
    9: '#ff6900',
    10: '#f6329a',
    11: '#ad46ff',
    12: '#fb2c36',
    13: '#ff2056',
    14: '#00a6f4',
    15: '#00bba7',
    16: '#8e51ff',
    17: '#f0b100',
  }

  return colors[color] ?? '#ffffff'
}
