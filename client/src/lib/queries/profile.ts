'use server'

import { createClient } from '@/lib/supabase/server'

export async function getUserProfile(userId: string) {
  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, username, avatar')
    .eq('id', userId)
    .single()

  if (error) {
    throw error
  }

  return profile
}
