import Link from 'next/link'

import { Button } from '@/components/primitives/button'
import { routes } from '@/constants/routes'

import { AuthModes } from '../constants'

type AuthSwitchLinkProps = {
  mode: AuthModes
}

export function AuthSwitchLink({ mode }: AuthSwitchLinkProps) {
  const isSignUp = mode === AuthModes.signUp
  const href = isSignUp ? routes.signIn : routes.signUp
  const text = isSignUp
    ? 'Already have an account? Sign in'
    : "Don't have an account? Sign up"

  return (
    <Button
      variant="link"
      className="mt-4"
      nativeButton={false}
      render={<Link href={href}>{text}</Link>}
    />
  )
}
