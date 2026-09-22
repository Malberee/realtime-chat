'use client'

import { EyeClosedIcon, EyeIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import { type HTMLInputTypeAttribute, useState } from 'react'
import type {
  FieldError as FieldErrorType,
  FieldPath,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/components/primitives/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/primitives/input-group'

export enum FormField {
  username = 'username',
  email = 'email',
  password = 'password',
}

type AuthFieldProps<T extends FieldValues> = {
  name: FieldPath<T>
  type: HTMLInputTypeAttribute
  icon: IconSvgElement
  error?: FieldErrorType
  register: UseFormRegister<T>
}

export function AuthField<T extends FieldValues>({
  name,
  type,
  icon,
  error,
  register,
}: AuthFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false)

  const fieldId = `auth-${name}`
  const errorId = `${fieldId}-error`

  function renderToggleVisibility() {
    return (
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          onClick={() => setShowPassword((prevState) => !prevState)}
        >
          <HugeiconsIcon icon={showPassword ? EyeClosedIcon : EyeIcon} />
        </InputGroupButton>
      </InputGroupAddon>
    )
  }

  return (
    <Field data-invalid={Boolean(error)}>
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
          type={type === FormField.password && showPassword ? 'text' : type}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          {...register(name)}
        />
        {type === FormField.password && renderToggleVisibility()}
      </InputGroup>
      <FieldError id={errorId} errors={[error]} />
    </Field>
  )
}
