"use client"

import type { ComponentProps } from "react"
import Accordion from "@radui/ui/Accordion"
import { ChevronDown } from "lucide-react"

// Mirrors `WithAnimation` in `src/components/ui/Accordion/stories/Accordion.stories.tsx`
const items = [
  {
    title: "The Matrix (1999)",
    content: (
      <div>
        <ul>
          <li>Summary: A hacker discovers the true nature of reality and his role in the war against its controllers.</li>
          <li>Key Characters: Neo, Morpheus, Trinity, Agent Smith</li>
          <li>Memorable Quote: &quot;There is no spoon.&quot;</li>
        </ul>
      </div>
    )
  },
  {
    title: "The Dark Knight (2008)",
    content: (
      <div>
        <ul>
          <li>Summary: Batman faces his greatest challenge yet as the Joker wreaks havoc on Gotham City.</li>
          <li>Key Characters: Batman, Joker, Harvey Dent, Alfred</li>
          <li>Memorable Quote: &quot;Why so serious?&quot;</li>
        </ul>
      </div>
    )
  },
  {
    title: "Inception (2010)",
    content: (
      <div>
        <ul>
          <li>Summary: A thief who enters people&apos;s dreams to steal their secrets must plant an idea in someone&apos;s mind.</li>
          <li>Key Characters: Cobb, Ariadne, Mal, Saito</li>
          <li>Memorable Quote: &quot;You mustn&apos;t be afraid to dream a little bigger, darling.&quot;</li>
        </ul>
      </div>
    )
  },
  {
    title: "The Shawshank Redemption (1994)",
    content: (
      <div>
        <ul>
          <li>Summary: A banker is wrongly convicted</li>
          <li>Key Characters: Andy Dufresne, Red, Warden Norton, Tommy</li>
          <li>Memorable Quote: &quot;Get busy living or get busy dying.&quot;</li>
        </ul>
      </div>
    )
  }
]

type AccordionExampleProps = ComponentProps<typeof Accordion.Root>

const AccordionExample = ({ ...args }: AccordionExampleProps) => {
  return (
    <div className="mx-auto mt-10 w-full max-w-[600px]">
      <Accordion.Root collapsible transitionDuration={200} {...args}>
        {items.map((item, index) => (
          <Accordion.Item key={index} value={index}>
            <Accordion.Header>
              <Accordion.Trigger>
                {item.title}
                <ChevronDown />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>{item.content}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}

export default AccordionExample
