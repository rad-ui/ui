"use client"
import Accordion from "@radui/ui/Accordion";

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

const AccordionExample = () => {
  

  return (
  <div className="w-64 md:w-96">
    <Accordion.Root>
      {items.map((item) => (
        <Accordion.Item key={item.id} value={item.id}>
          <Accordion.Header>
            <Accordion.Trigger>{item.title}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>{item.content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  </div>)
}

export default AccordionExample;