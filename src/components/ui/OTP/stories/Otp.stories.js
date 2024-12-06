import OTP from '../OTP'; 
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/OTP",
  component: OTP,
  render: (args) => (
    <SandboxEditor>
      <div>
        <OTP {...args} />
      </div>
    </SandboxEditor>
  ),
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
  args: {
    length: 6,
    onComplete: (otp) => console.log("OTP Entered:", otp),
    className: "",
  },
};

