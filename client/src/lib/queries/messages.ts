'use server'

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
