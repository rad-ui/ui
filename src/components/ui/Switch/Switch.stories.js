import Switch from './Switch'
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
export default {
    title: 'UI/Input/Switch',
    component: Switch,
    render: (args) => <SandboxEditor>
        <div>
            <input type='checkbox' />
        </div>
    </SandboxEditor>,
};

export const All = {};