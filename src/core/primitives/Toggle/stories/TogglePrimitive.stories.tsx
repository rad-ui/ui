import React from "react";
import TogglePrimitive from "../index";
import SandboxEditor from "~/components/tools/SandboxEditor/SandboxEditor";

export default {
    title: 'Primitives/TogglePrimitive',
    component: TogglePrimitive,
    render: (args:any) => <SandboxEditor>

       <TogglePrimitive.Root {...args}>
         </TogglePrimitive.Root>
    </SandboxEditor>
}

export const All = {
    args: {
      className: ''
    }
}