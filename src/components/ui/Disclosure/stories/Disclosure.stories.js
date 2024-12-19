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
              question: "Why can't I access certain websites?",
              answer: "Clear your browser's cache and cookies."
            },

            {
              question: "Why do I keep getting disconnected from the network?",
              answer: "Ensure that your network drivers are up-to-date."
            }
        ]
     }
}
