'use client'

import React from 'react'

export type CodeProps = {
  children: React.ReactNode
}

const Code = ({ children }: CodeProps) => {
  return <code className="rui-code-root">{children}</code>
}

export default Code
