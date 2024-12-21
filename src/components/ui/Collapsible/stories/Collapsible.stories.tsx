import { Meta } from "@storybook/react";
import React, { useState } from "react";
import SandboxEditor from "~/components/tools/SandboxEditor/SandboxEditor";
import Collapsible from "~/components/ui/Collapsible/Collapsible";
import Button from "../../Button/Button";

const Items = [
  {
    content:
      "“One of the penalties for refusing to participate in politics is that you end up being governed by your inferiors.“ – Plato",
  },
  {
    content:
      "“The superior man understands what is right; the inferior man understands what will sell.” – Confucius",
  },
  {
    content: "“There are no secrets on the internet.” – Paul Babicki",
  },
];

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
  title: "WIP/Collapsible",
};

export default meta;

export const Default = () => {
  return (
    <section>
      <SandboxEditor className="">
        <Collapsible items={Items} disabled></Collapsible>
      </SandboxEditor>
    </section>
  );
};

export const WithTitle = () => {
  return (
    <section>
      <SandboxEditor className="">
        <Collapsible title="Hello World" items={Items} disabled></Collapsible>
      </SandboxEditor>
    </section>
  );
};

export const ExternalTrigger = () => {
  const [open, setOpen] = useState(true);

  const toggleHidden = () => setOpen((p) => !p);

  return (
    <section>
      <SandboxEditor className="">
        <Collapsible
          open={open}
          onOpenChange={setOpen}
          title="Quote"
          items={Items}
          defaultOpen={Items[0]}
          trigger={
            <Button onClick={toggleHidden} style={{ margin: "0" }}>
              {open ? "CLOSE" : "OPEN"}
            </Button>
          }
        />
      </SandboxEditor>
    </section>
  );
};
