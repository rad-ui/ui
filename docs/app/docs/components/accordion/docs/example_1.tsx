import Accordion from "@radui/ui/Accordion";

let items = [
  {
    title: "React",
    content: "React is a JavaScript library for building user interfaces."
  },
  {
    title: "Angular",
    content: "Angular is a platform and framework for building single-page client applications using HTML and TypeScript."
  },
  {
    title: "Vue",
    content: "Vue.js is a progressive framework for building user interfaces."
  }
]

const AccordionExample = () => {


  return (
  <div className="w-64 md:w-96">
    <Accordion.Root>
      {items.map((item, index) => (
        <Accordion.Item key={index} value={`item-${index}`}>
          <Accordion.Header>
            <Accordion.Trigger index={index}>{item.title}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content index={index}>{item.content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  </div>)
}

export default AccordionExample;