import Dropdown from '~/components/ui/Dropdown/Dropdown';
import {Meta} from '@storybook/react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

const placeholderWords= ['Eternity', 'Wisdom', 'Truth', 'Love', 'Freedom', 'Serenity', 'Hope', 'Courage', 'Grace', 'Harmony', 'Solitude', 'Enlightenment', 'Peace', 'Joy', 'Unity', 'Transcendence', 'Mystery', 'Compassion', 'Faith', 'Destiny'].map((v) => (<div key={v}>{v}</div>));

const meta: Meta<typeof Dropdown['Root']> = {
    component: Dropdown.Root,
    title: 'UI/Input/Dropdown',
};

export default meta;

export const DefaultTrigger= () => {
    return (
        <section>
            <SandboxEditor>
                <Dropdown>
                    {placeholderWords}
                </Dropdown>
            </SandboxEditor>
        </section>
    );
};

export const Styled = () => {
    return (
        <section>
            <SandboxEditor>
                <Dropdown.Root defaultOpen={true}>
                    <Dropdown.Trigger
                        className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center bg-white shadow-[0_2px_10px] outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </Dropdown.Trigger>

                    <Dropdown.Content
                        className="shadow-[0_2px_10px] rounded-md mt-3 divide-y divide-solid"
                    >
                        {[['Bookmark', '⌘+B'],['New Private Tab', '⌘+P'],['New Tab', '⌘+T'],['Close Tab', '⌘+W'],['Mute Tab', '⌘+M'], []].map(([name,shortcut]) => (
                            <div
                                className="flex leading-8 px-4 py-1"
                                key={name}
                            >
                                {name}
                                <div className="ml-auto pl-8">
                                    {shortcut}
                                </div>
                            </div>
                        ))}

                    </Dropdown.Content>
                </Dropdown.Root>
            </SandboxEditor>
        </section>
    );
};
