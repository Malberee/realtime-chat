import { AuthForm, AuthSwitchLink } from '../components'
import { AuthModes } from '../constants'

export default function SignUp() {
  return (
    <div className="max-w-65">
      <AuthForm mode={AuthModes.signUp} />
      <AuthSwitchLink mode={AuthModes.signUp} />
    </div>
  )
}
