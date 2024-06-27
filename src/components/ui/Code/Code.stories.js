import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor'
import Code from './Code'

const Code_TEXT = 'console.log()'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Typography/Code',
  component: Code,
  render: (args) => (
    <SandboxEditor>
      <div>
        <div className="flex space-x-2">
          <Code className="space-x-1">requestAnimationFrame()</Code>

          <Code className="space-x-1">{Code_TEXT}</Code>
        </div>
      </div>
    </SandboxEditor>
  )
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
  args: {
    className: ''
  }
}
