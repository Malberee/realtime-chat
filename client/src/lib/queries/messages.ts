'use server'

import { createClient } from '@/lib/supabase/server'

const MESSAGES_PAGE_SIZE = 50

type MessagesCursor = {
  id: string
  created_at: string
}

export async function getMessagesPage(before?: MessagesCursor) {
  const supabase = await createClient()

  let query = supabase
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
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })
    .limit(MESSAGES_PAGE_SIZE + 1)

  if (before) {
    query = query.or(
      `created_at.lt.${before.created_at},and(created_at.eq.${before.created_at},id.lt.${before.id})`,
    )
  }

  const { data: messages, error } = await query

  if (error) {
    throw error
  }

  const hasMore = messages.length > MESSAGES_PAGE_SIZE

  return {
    messages: messages.slice(0, MESSAGES_PAGE_SIZE),
    hasMore,
  }
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
}
