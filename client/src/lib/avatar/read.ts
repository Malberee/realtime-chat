'use server'

import { createClient } from '@/lib/supabase/server'

export async function getAvatarParams() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      chin: 0,
      hair: 0,
      nose: 0,
      mouth: 0,
      forehead: 0,
      backgroundColor: 0,
      foregroundColor: 0,
    }
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('avatar')
    .eq('id', user.id)
    .single()

  if (profileError) {
    return profileError.message
  }

  return profile.avatar
}

export async function getColor(color: number) {
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
