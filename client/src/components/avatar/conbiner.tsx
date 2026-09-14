import { getAvatarParams, getColor } from '@/lib/avatar/read'

import AvatarPart from './avatar-part'

export default async function AvatarCombiner() {
  const params = await getAvatarParams()
  if (params) {
    const background = await getColor(params.backgroundColor)
    const foreground = await getColor(params.foregroundColor)

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
        <AvatarPart type={params.hair} row={0} foreground={foreground} />
        <AvatarPart type={params.forehead} row={1} foreground={foreground} />
        <AvatarPart type={params.nose} row={2} foreground={foreground} />
        <AvatarPart type={params.mouth} row={3} foreground={foreground} />
        <AvatarPart type={params.chin} row={4} foreground={foreground} />
      </svg>
    )
  } else {
    return <></>
  }
}
