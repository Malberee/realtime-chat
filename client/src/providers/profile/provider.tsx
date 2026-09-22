'use client'

import { createContext, PropsWithChildren, useContext } from 'react'

import type { ProfileType } from '@/types/database'

const ProfileContext = createContext<ProfileType | null>(null)

export function ProfileProvider({
  profile,
  children,
}: PropsWithChildren<{ profile: ProfileType }>) {
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
