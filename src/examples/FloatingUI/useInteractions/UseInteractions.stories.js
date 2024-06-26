import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor'
import UserInteractionsExample from './UseInteractionsExample'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Examples/FloatingUI/UseInteractions',
  component: 'UseInteractions',
  render: () => (
    <SandboxEditor>
      <div>
        <UserInteractionsExample />
      </div>
    </SandboxEditor>
  )
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    className: ''
  }
}
