import { redirect } from 'next/navigation'

import { Button } from '@/components/primitives/button'
import { routes } from '@/constants/routes'
import { signOut } from '@/lib/actions/auth'
import { getMessages } from '@/lib/queries/messages'
import { getUserProfile } from '@/lib/queries/profile'
import { createClient } from '@/lib/supabase/server'
import { ProfileProvider } from '@/providers'

import { MessagesBox } from './components'

export default async function Chat() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(routes.signIn)
  }

  const userProfile = await getUserProfile(user.id)
  const messages = await getMessages()

  if (!userProfile) {
    throw new Error('User profile not found')
  }

  return (
    <main className="h-screen w-screen">
      <Button className="absolute" onClick={signOut}>
        Sign out
      </Button>
      <ProfileProvider profile={userProfile}>
        <div className="mx-auto flex size-full w-115 flex-col justify-between">
          <MessagesBox messages={messages} />
        </div>
      </ProfileProvider>
    </main>
  )
}
