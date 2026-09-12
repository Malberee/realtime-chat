'use server'

import { redirect } from 'next/navigation'

import { routes } from '@/constants/routes'
import { AuthSchema } from '@/lib/schemas/auth'
import { createClient } from '@/lib/supabase/server'

export async function signUp({ email, password, username }: AuthSchema) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  })

  if (error) {
    return error.message
  }

  redirect(routes.chat)
}

export async function signIn({
  email,
  password,
}: Omit<AuthSchema, 'username'>) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return error.message
  }

  redirect(routes.chat)
}

export async function signOut() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  redirect(routes.signIn)
}
