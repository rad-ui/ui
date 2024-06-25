import React from 'react'

import { customClassSwitcher } from '~/core'

import type { ProgressProps } from '../Progress'

interface ProgressRootProps extends Partial<ProgressProps> {}

const COMPONENT_NAME = 'Progress'

export default function ProgressRoot({
  children,
  customRootClass
}: ProgressRootProps) {
  const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)

  return <div className={rootClass}>{children}</div>
}
