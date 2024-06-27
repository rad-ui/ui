import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor'
import Text from './Text'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Typography/Text',
  component: Text,
  render: (args) => (
    <SandboxEditor>
      <div>
        <Text className="text-gray-950">
          {' '}
          {`I'm not a monkey
I will not dance even if the beat's funky`}{' '}
        </Text>
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
