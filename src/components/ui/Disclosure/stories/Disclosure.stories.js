import Disclosure from '../Disclosure'
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Components/Disclosure',
    component: Disclosure,
    render: (args) => <SandboxEditor>
         
            <div>
                <Disclosure {...args} />
            </div>
        
    </SandboxEditor>
}

export const All = {
     args: {
        className: '',
        items: [
            {
              title: "Why can't I access certain websites?",
              content: "Clear your browser's cache and cookies."
            },

            {
              title: "Why do I keep getting disconnected from the network?",
              content: "Ensure that your network drivers are up-to-date."
            }
        ]
     }
}
