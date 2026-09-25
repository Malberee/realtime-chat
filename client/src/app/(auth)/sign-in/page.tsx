import type { Metadata } from 'next'

import { AuthForm, AuthSwitchLink } from '../components'
import { AuthModes } from '../constants'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default function SignIn() {
  return (
    <div className="max-w-65">
      <AuthForm mode={AuthModes.signIn} />
      <AuthSwitchLink mode={AuthModes.signIn} />
    </div>
  )
}
