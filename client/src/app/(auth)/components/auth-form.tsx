'use client'

import {
  ArrowRight04FreeIcons,
  Envelope,
  LockPasswordIcon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'
import { useReducer } from 'react'

import { Button } from '@/components/primitives/button'
import { Field, FieldLabel } from '@/components/primitives/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/primitives/input-group'

import { AuthModes } from '../constants'

enum FormField {
  username = 'username',
  email = 'email',
  password = 'password',
}
type FormState = Record<FormField, string>
type FormAction = {
  type: FormField
  payload: string
}

type FieldConfig = {
  label: FormField
  icon: IconSvgElement
}

type AuthFormProps = {
  mode: AuthModes
}

function formReducer(state: FormState, action: FormAction): FormState {
  return {
    ...state,
    [action.type]: action.payload,
  }
}

const initialValues: FormState = {
  username: '',
  email: '',
  password: '',
}

const formFields: FieldConfig[] = [
  {
    label: FormField.username,
    icon: UserIcon,
  },
  {
    label: FormField.email,
    icon: Envelope,
  },
  {
    label: FormField.password,
    icon: LockPasswordIcon,
  },
]

export function AuthForm({ mode }: AuthFormProps) {
  const [values, dispatch] = useReducer(formReducer, initialValues)

  const isSignUp = mode === AuthModes.signUp

  const fields = isSignUp
    ? formFields
    : formFields.filter(({ label }) => label !== FormField.username)

  function handleSubmit() {
    if (isSignUp) {
      console.log('Sign up:', values)
    } else {
      console.log('Sign in:', {
        email: values.email,
        password: values.password,
      })
    }
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit()
      }}
    >
      <div className="flex flex-col gap-2">
        {fields.map(({ label, icon }) => (
          <Field key={label}>
            <FieldLabel htmlFor="inline-end-input" className="capitalize">
              {label}
            </FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <HugeiconsIcon icon={icon} />
              </InputGroupAddon>
              <InputGroupInput
                placeholder={`Enter ${label}`}
                onChange={(event) =>
                  dispatch({ type: label, payload: event.target.value })
                }
              />
            </InputGroup>
          </Field>
        ))}
      </div>
      <Button type="submit" className="w-full">
        Start chatting
        <HugeiconsIcon icon={ArrowRight04FreeIcons} data-icon="inline-end" />
      </Button>
    </form>
  )
}
