import Badge from './Badge';
import Separator from '../Separator/Separator';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const ArrowIcon = ({className}) => {
    return <svg className={className} width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Data Display/Badge',
    component: Badge,
    render: (args) => <SandboxEditor>
        <div className='flex space-x-2'>
            <Badge className='text-xs' >Plum</Badge>
            <Separator orientation="vertical" />
            <Badge className='text-xs' color="plum" >Plum</Badge>
            <Badge className='text-xs' color="red" >Red</Badge>
            <Badge className='text-xs' color="gray" >Gray</Badge>
            <Separator orientation="vertical" />
            <Badge className='text-xs space-x-1' >

                <div>
                    With Icon
                </div>
                <ArrowIcon/>
            </Badge>
        </div>
    </SandboxEditor>,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: '',
    },
};
