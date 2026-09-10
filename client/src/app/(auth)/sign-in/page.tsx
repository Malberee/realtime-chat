import { AuthForm, AuthSwitchLink } from '../components'
import { AuthModes } from '../constants'

export default function SignIn() {
  return (
    <div className="max-w-65">
      <AuthForm mode={AuthModes.signIn} />
      <AuthSwitchLink mode={AuthModes.signIn} />
    </div>
  )
}
