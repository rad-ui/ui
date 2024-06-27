import React from 'react'

type TextAreaInputProps = {
  children: React.ReactNode
  placeholder?: string
}

function TextAreaInput({ children, placeholder = '' }: TextAreaInputProps) {
  return <textarea placeholder={placeholder}>{children}</textarea>
}

export default TextAreaInput
