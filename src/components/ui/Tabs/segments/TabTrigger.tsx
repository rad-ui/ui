'use client'

import React from 'react'
import { customClassSwitcher } from '~/core'
import { Tab } from '../types'

const COMPONENT_NAME = 'TabTrigger'

export type TabTriggerProps = {
  tab: Tab
  setActiveTab: React.Dispatch<Tab>
  activeTab: Tab
  className?: string
  customRootClass?: string
  index: number
  props?: Record<string, any>[]
}

const TabTrigger = ({
  tab,
  setActiveTab,
  activeTab,
  className,
  customRootClass,
  index,
  ...props
}: TabTriggerProps) => {
  const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)

  const isActive = activeTab === tab.value

  const handleClick = (currentTab: Tab) => {
    setActiveTab(currentTab.value)
  }

  return (
    <button
      role="tab"
      key={`tab-${tab.value}`}
      className={`${rootClass} ${isActive ? 'active' : ''} ${className}`}
      {...props}
      onClick={() => handleClick(tab)}
    >
      <span className={`${rootClass}-inner`}>{tab.label}</span>
    </button>
  )
}

TabTrigger.displayName = 'TabTrigger'

export default TabTrigger
