import type { UseFormSetError } from 'react-hook-form'

import { FormField } from './auth-field'

type FieldNames = Record<FormField, string>

export function handleAuthError(
  errorMessage: string,
  setError: UseFormSetError<FieldNames>,
) {
  switch (errorMessage) {
    case 'User already registered':
      setError(FormField.email, {
        message: 'This email address is already taken',
      })
      break
    case 'Invalid login credentials':
      setError('root', { message: 'Incorrect email or password' })
      break
    case 'Username is already taken':
      setError(FormField.username, {
        message: 'This username is already taken',
      })
      break
    default:
      setError('root', { message: 'Something went wrong. Please try again' })
      break
  }
}
