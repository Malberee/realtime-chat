import type { Metadata } from 'next'

import { AuthForm, AuthSwitchLink } from '../components'
import { AuthModes } from '../constants'

export const metadata: Metadata = {
  title: 'Sign up',
}

export default function SignUp() {
  return (
    <div className="max-w-65">
      <AuthForm mode={AuthModes.signUp} />
      <AuthSwitchLink mode={AuthModes.signUp} />
    </div>
  )
}
