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
              question: "what is your full name?",
              answer: "[full name]"
            },

            {
                question: "what is your favourite game?",
                answer: "[game name]"
            }
        ]
     }
}
