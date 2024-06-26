'use client'

import React from 'react'
import { customClassSwitcher } from '~/core'
import { Tab } from '../types'

const COMPONENT_NAME = 'TabContent'

export type TabContentProps = {
  tabs?: Tab[]
  activeTab: Tab
  className?: string
  customRootClass?: string
}

const TabContent = ({
  tabs = [],
  activeTab,
  className,
  customRootClass
}: TabContentProps) => {
  const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)

  return (
    <div className={`${rootClass} ${className}`}>
      {tabs.map((tab) => {
        if (tab.value === activeTab) {
          return <div key={`content-${tab.value}`}>{tab.content}</div>
        }
        return null
      })}
    </div>
  )
}

TabContent.displayName = COMPONENT_NAME

export default TabContent
