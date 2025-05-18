"use client"
import Tabs from "@radui/ui/Tabs";
import { useState } from "react";

const items = [
  {
    id: "react",
    title: "React",
    content: "React is a JavaScript library for building user interfaces."
  },
  {
    id: "angular",
    title: "Angular",
    content: "Angular is a platform and framework for building single-page client applications using HTML and TypeScript."
  },
  {
    id: "vue",
    title: "Vue",
    content: "Vue.js is a progressive framework for building user interfaces."
  }
]

const TabsExample = () => {
  const [activeTab, setActiveTab] = useState(items[0].id);
  return  <div className="w-64 md:w-96">
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List>
          {items.map((item) => (
            <Tabs.Trigger key={item.id} value={item.id}>{item.title}</Tabs.Trigger>
          ))}
        </Tabs.List>
        {items.map((item) => (
          <Tabs.Content key={item.id} value={item.id}>{item.content}</Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
}

export default TabsExample;