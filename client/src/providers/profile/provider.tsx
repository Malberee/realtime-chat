'use client'

import { createContext, PropsWithChildren, useContext } from 'react'

import type { Database } from '@/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

const ProfileContext = createContext<Profile | null>(null)

export function ProfileProvider({
  profile,
  children,
}: PropsWithChildren<{ profile: Profile }>) {
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)

  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider')
  }

  return context
}
