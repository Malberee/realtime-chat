import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { Header } from '@/components/shared'
import { routes } from '@/constants/routes'
import { getMessagesPage } from '@/lib/queries/messages'
import { getUserProfile } from '@/lib/queries/profile'
import { createClient } from '@/lib/supabase/server'
import { ProfileProvider } from '@/providers'

import { MessageCombiner, MessagesBox, Profile } from './components'

export const metadata: Metadata = {
  title: 'Chat',
}

export default async function Chat() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(routes.signIn)
  }

  const userProfile = await getUserProfile(user.id)
  const { messages, hasMore } = await getMessagesPage()

  if (!userProfile) {
    throw new Error('User profile not found')
  }

  return (
    <ProfileProvider profile={userProfile}>
      <Header>
        <Profile profile={userProfile} />
      </Header>
      <main className="size-full">
        <div className="mx-auto flex h-full max-w-130 flex-col justify-between pb-6">
          <MessagesBox initialMessages={messages} initialHasMore={hasMore} />
          <MessageCombiner />
        </div>
      </main>
    </ProfileProvider>
  )
}
