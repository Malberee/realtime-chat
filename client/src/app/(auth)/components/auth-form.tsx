'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight04FreeIcons,
  Envelope,
  EyeClosedIcon,
  EyeIcon,
  LockPasswordIcon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'
import { HTMLInputTypeAttribute, useState } from 'react'
import { type Resolver, useForm } from 'react-hook-form'

import { Button } from '@/components/primitives/button'
import { Field, FieldError, FieldLabel } from '@/components/primitives/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/primitives/input-group'
import { Spinner } from '@/components/primitives/spinner'

import { AuthModes } from '../constants'
import { authSchema, type AuthSchema } from '../schemas/auth'

enum FormField {
  username = 'username',
  email = 'email',
  password = 'password',
}

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
  const [showPassword, setShowPassword] = useState(false)

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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema) as unknown as Resolver<AuthSchema>,
  })

  async function handleSubmitForm(data: AuthSchema) {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    if (isSignUp) {
      console.log('Sign up:', data)
    } else {
      console.log('Sign in:', {
        email: data.email,
        password: data.password,
      })
    }
  }

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className="flex flex-col gap-2">
        {fields.map(({ name, type, icon }) => {
          const fieldId = `auth-${name}`
          const error = errors[name]
          const errorId = `${fieldId}-error`

          return (
            <Field key={name} data-invalid={Boolean(error)}>
              <FieldLabel htmlFor={fieldId} className="capitalize">
                {name}
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <HugeiconsIcon icon={icon} />
                </InputGroupAddon>
                <InputGroupInput
                  id={fieldId}
                  placeholder={`Enter ${name}`}
                  type={
                    type === FormField.password && showPassword ? 'text' : type
                  }
                  aria-describedby={error ? errorId : undefined}
                  aria-invalid={Boolean(error)}
                  {...register(name)}
                />
                {type === FormField.password && (
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    >
                      <HugeiconsIcon
                        icon={showPassword ? EyeClosedIcon : EyeIcon}
                      />
                    </InputGroupButton>
                  </InputGroupAddon>
                )}
              </InputGroup>
              <FieldError id={errorId} errors={[error]} />
            </Field>
          )
        })}
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
