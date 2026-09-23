'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircleIcon,
  ArrowRight04FreeIcons,
  Envelope,
  LockPasswordIcon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'
import type { HTMLInputTypeAttribute } from 'react'
import { type Resolver, useForm } from 'react-hook-form'

import { Alert, AlertDescription, Button, Spinner } from '@/components/ui'
import { signIn, signUp } from '@/lib/actions/auth'
import { authSchema, type AuthSchema } from '@/lib/schemas/auth'

import { AuthModes } from '../../constants'
import { AuthField, FormField } from './auth-field'
import { handleAuthError } from './auth-form.funcs'

type FieldConfig = {
  name: FormField
  icon: IconSvgElement
  type: HTMLInputTypeAttribute
}

type AuthFormProps = {
  mode: AuthModes
}

const formFields: FieldConfig[] = [
  {
    name: FormField.username,
    icon: UserIcon,
    type: 'text',
  },
  {
    name: FormField.email,
    icon: Envelope,
    type: 'email',
  },
  {
    name: FormField.password,
    icon: LockPasswordIcon,
    type: 'password',
  },
]

export function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === AuthModes.signUp

  const fields = isSignUp
    ? formFields
    : formFields.filter(({ name }) => name !== FormField.username)

  const validationSchema = isSignUp
    ? authSchema
    : authSchema.omit({ username: true })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema) as unknown as Resolver<AuthSchema>,
  })

  async function handleSubmitForm(data: AuthSchema) {
    let error: string | undefined

    if (isSignUp) {
      error = await signUp(data)
    } else {
      error = await signIn({
        email: data.email,
        password: data.password,
      })
    }

    if (error) {
      handleAuthError(error, setError)
    }
  }

  function renderAlert(message: string) {
    return (
      <Alert
        variant="destructive"
        className="flex justify-center border-none bg-transparent p-0"
      >
        <HugeiconsIcon icon={AlertCircleIcon} />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      {errors.root?.message && renderAlert(errors.root.message)}
      <div className="flex flex-col gap-2">
        {fields.map((field) => (
          <AuthField
            key={field.name}
            register={register}
            error={errors[field.name]}
            {...field}
          />
        ))}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Starting...' : 'Start chatting'}
        {isSubmitting ? (
          <Spinner data-icon="inline-end" />
        ) : (
          <HugeiconsIcon icon={ArrowRight04FreeIcons} data-icon="inline-end" />
        )}
      </Button>
    </form>
  )
}
