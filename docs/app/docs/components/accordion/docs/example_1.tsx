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

const AccordionExample = () => ( 
  <div style={{ width: "400px" }}>
    <Accordion items={items} />
  </div>
)

export default AccordionExample;