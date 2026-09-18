'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'

export async function getMessages() {
  const supabase = await createClient()

  const { data: messages, error } = await supabase
    .from('messages')
    .select(
      `
    id,
    text,
    created_at,
    author:profiles (
      id,
      username,
      avatar
    )
  `,
    )
    .order('created_at', { ascending: true })

  if (error) {
    throw error
  }

  return messages
}

export async function createMessage(message: string) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) throw userError
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase.from('messages').insert({
    text: message,
    author_id: user.id,
  })

  if (error) throw error

  revalidatePath('/chat')
}
