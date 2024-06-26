'use client'

import React, { useState } from 'react'

import TabList from './segments/TabList'
import TabContent from './segments/TabContent'
import TabRoot from './segments/TabRoot'

import { Tab } from './types'

export type TabsProps = {
  tabs?: Tab[]
  props?: Record<string, any>[]
}

const Tabs = ({ tabs = [], ...props }: TabsProps) => {
  // This should be a value <`tabs.value`> that is passed in from the parent component
  const [activeTab, setActiveTab] = useState(tabs[0].value || '')

  return (
    <TabRoot {...props}>
      <TabList activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <TabContent activeTab={activeTab} tabs={tabs} />
    </TabRoot>
  )
}

Tabs.List = TabList
Tabs.Content = TabContent
Tabs.Root = TabRoot

export default Tabs
