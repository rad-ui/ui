import Avatar from './Avatar';
import "./css.variables.mock.css"
import SandboxEditor from "@/components/tools/SandboxEditor/SandboxEditor"



 const BLOCKQUOTE_TEXT = `Avian carriers can provide high delay, low throughput, and low altitude
 service. The connection topology is limited to a single point-to-point path
 for each carrier, used with standard carriers, but many carriers can be used
 without significant interference with each other, outside early spring. This
 is because of the 3D ether space available to the carriers, in contrast to
 the 1D ether used by IEEE802.3. The carriers have an intrinsic collision
 avoidance system, which increases availability.`

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Data-Display/Avatar',
  component: Avatar,
  render: (args) => <SandboxEditor>
    <div >
      <div className='flex space-x-2'>
        <Avatar fallback="A" size={32} />
        <Avatar fallback="PK" size={32} />
        <Avatar src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" size={32} />
      </div>
    </div>
  </SandboxEditor>,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
  args: {
    className: ''
  },
};