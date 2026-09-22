import { SignOut } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'

import { AvatarCombiner } from '@/components/avatar'
import { Avatar } from '@/components/primitives/avatar'
import { Button } from '@/components/primitives/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/primitives/dropdown-menu'
import { signOut } from '@/lib/actions/auth'
import { ProfileType } from '@/types/database'

type MenuItem = {
  name: string
  icon: IconSvgElement
  variant?: 'default' | 'destructive'
  onClick: () => void
}

type ProfileProps = {
  profile: ProfileType
}

const menuItems: MenuItem[] = [
  {
    name: 'Logout',
    icon: SignOut,
    variant: 'destructive',
    onClick: signOut,
  },
]

export function Profile({ profile }: ProfileProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="lg">
            {profile.username}
            <Avatar size="sm">
              <AvatarCombiner avatar={profile.avatar} />
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent>
        {menuItems.map(({ name, icon, variant, onClick }) => (
          <DropdownMenuItem variant={variant} key={name} onClick={onClick}>
            <HugeiconsIcon icon={icon} />
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
