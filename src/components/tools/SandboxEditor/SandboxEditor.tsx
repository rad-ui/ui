
import React, {PropsWithChildren, useEffect, useState} from 'react';
import Button from '~/components/ui/Button/Button';
import Separator from '~/components/ui/Separator/Separator';
import Heading from '~/components/ui/Heading/Heading';
import Text from '~/components/ui/Text/Text';

import colors from '~/colors';

const SunIcon = () => {
    return <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const MoonIcon = () => {
    return <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756 7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.37201 6.82247 11.0878 3.69887 11.6097C3.45736 11.65 3.20988 11.6772 2.96008 11.6906C2.74563 11.702 2.62729 11.9535 2.77721 12.1072C2.84551 12.1773 2.91535 12.2458 2.98667 12.3128L3.05883 12.3795L3.31883 12.6045L3.50684 12.7532L3.62796 12.8433L3.81491 12.9742L3.99079 13.089C4.11175 13.1651 4.23536 13.2375 4.36157 13.3059L4.62496 13.4412L4.88553 13.5607L5.18837 13.6828L5.43169 13.7686C5.56564 13.8128 5.70149 13.8529 5.83857 13.8885C5.94262 13.9155 6.04767 13.9401 6.15405 13.9622C6.27993 13.9883 6.40713 14.0109 6.53544 14.0298L6.85241 14.0685L7.11934 14.0892C7.24637 14.0965 7.37436 14.1002 7.50322 14.1002C11.1483 14.1002 14.1032 11.1453 14.1032 7.50023C14.1032 7.25044 14.0893 7.00389 14.0623 6.76131L14.0255 6.48407C13.991 6.26083 13.9453 6.04129 13.8891 5.82642C13.8213 5.56709 13.7382 5.31398 13.6409 5.06881L13.5279 4.80132L13.4507 4.63542L13.3766 4.48666C13.2178 4.17773 13.0353 3.88295 12.8312 3.60423L12.6782 3.40352L12.4793 3.16432L12.3157 2.98361L12.1961 2.85951L12.0355 2.70246L11.8134 2.50184L11.4925 2.24191L11.2483 2.06498L10.9562 1.87446L10.6346 1.68894L10.3073 1.52378L10.1938 1.47176L9.95488 1.3706L9.67791 1.2669L9.42566 1.1846L9.10075 1.09489L8.83599 1.03486L8.54406 0.98184ZM10.4032 5.30023C10.4032 4.27588 10.2002 3.29829 9.83244 2.40604C11.7623 3.28995 13.1032 5.23862 13.1032 7.50023C13.1032 10.593 10.596 13.1002 7.50322 13.1002C6.63646 13.1002 5.81597 12.9036 5.08355 12.5522C6.5419 12.0941 7.81081 11.2082 8.74322 10.0416C8.87963 10.2284 9.10028 10.3497 9.34928 10.3497C9.76349 10.3497 10.0993 10.0139 10.0993 9.59971C10.0993 9.24256 9.84965 8.94373 9.51535 8.86816C9.57741 8.75165 9.63653 8.63334 9.6926 8.51332C9.88358 8.63163 10.1088 8.69993 10.35 8.69993C11.0403 8.69993 11.6 8.14028 11.6 7.44993C11.6 6.75976 11.0406 6.20024 10.3505 6.19993C10.3853 5.90487 10.4032 5.60464 10.4032 5.30023Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const RadUILogo = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 211 109" fill="none"><path d="M15.0469 77H4.17188C3.92188 77 3.79688 76.8438 3.79688 76.5312L3.98438 10.5781C3.98438 10.3281 4.10938 10.2031 4.35938 10.2031H23.7656C27.2344 10.2031 30.4219 11.0469 33.3281 12.7344C36.2344 14.4219 38.5469 16.6875 40.2656 19.5312C42.0156 22.375 42.8906 25.5937 42.8906 29.1875C42.8906 31.5312 42.5312 33.6562 41.8125 35.5625C41.0938 37.4688 40.25 39.0781 39.2812 40.3906C38.3438 41.7031 37.4844 42.6719 36.7031 43.2969C40.1719 47.1406 41.9062 51.6562 41.9062 56.8438L42 76.5312C42 76.8438 41.8438 77 41.5312 77H30.6562C30.4062 77 30.2812 76.9062 30.2812 76.7188V56.8438C30.2812 54.5312 29.4688 52.5312 27.8438 50.8438C26.2188 49.1562 24.2188 48.3125 21.8438 48.3125H15.5156L15.4219 76.5312C15.4219 76.8438 15.2969 77 15.0469 77ZM23.7656 21.6875H15.5156V36.7812H23.7656C25.7344 36.7812 27.4844 36.0469 29.0156 34.5781C30.5781 33.1094 31.3594 31.3125 31.3594 29.1875C31.3594 27.1563 30.6094 25.4062 29.1094 23.9375C27.6094 22.4375 25.8281 21.6875 23.7656 21.6875ZM46.875 76.5312L58.7812 10.5781C58.8438 10.3281 59 10.2031 59.25 10.2031H73.1719C73.4219 10.2031 73.5781 10.3281 73.6406 10.5781L85.0781 76.5312C85.1094 76.8438 84.9844 77 84.7031 77H74.0625C73.75 77 73.5781 76.8438 73.5469 76.5312L72.5156 69.5H59.4375L58.4062 76.5312C58.375 76.8438 58.2188 77 57.9375 77H47.25C47 77 46.875 76.8438 46.875 76.5312ZM65.6719 32.2812L61.3594 59.2344H70.5938L66.6562 32.2812L66.0938 28.7188L65.6719 32.2812ZM108.75 76.9062L91.5469 77C91.2344 77 91.0781 76.8438 91.0781 76.5312L91.2656 10.5781C91.2656 10.3281 91.3906 10.2031 91.6406 10.2031L109.594 10.1094C113.156 10.0156 116.375 10.8281 119.25 12.5469C122.156 14.2656 124.469 16.5937 126.188 19.5312C127.938 22.4375 128.812 25.6563 128.812 29.1875V56.75C128.812 60.4375 127.922 63.8125 126.141 66.875C124.328 69.9062 121.922 72.3281 118.922 74.1406C115.922 75.9219 112.531 76.8438 108.75 76.9062ZM109.594 21.5938L102.891 21.6875L102.797 65.1875H108.75C111.125 65.1875 113.125 64.3594 114.75 62.7031C116.375 61.0469 117.188 59.0625 117.188 56.75V29.0938C117.188 27.0625 116.438 25.2969 114.938 23.7969C113.438 22.2656 111.656 21.5313 109.594 21.5938Z" fill="currentColor"></path><rect x="5" y="84" width="128" height="19" fill="currentColor"></rect><path d="M167.469 100.938C164.094 100.938 160.969 100.062 158.094 98.3125C155.219 96.5625 152.922 94.2188 151.203 91.2812C149.516 88.3125 148.672 85.0781 148.672 81.5781L148.859 33.5781C148.859 33.3281 148.984 33.2031 149.234 33.2031H160.016C160.266 33.2031 160.391 33.3281 160.391 33.5781V81.5781C160.391 83.7344 161.078 85.5781 162.453 87.1094C163.828 88.6094 165.5 89.3594 167.469 89.3594C169.531 89.3594 171.25 88.6094 172.625 87.1094C174 85.5781 174.688 83.7344 174.688 81.5781V33.5781C174.688 33.3281 174.812 33.2031 175.062 33.2031H185.844C186.094 33.2031 186.219 33.3281 186.219 33.5781L186.406 81.5781C186.406 85.1094 185.562 88.3594 183.875 91.3281C182.156 94.2656 179.875 96.6094 177.031 98.3594C174.188 100.078 171 100.938 167.469 100.938ZM205.297 100H194.422C194.109 100 193.953 99.8438 193.953 99.5312L194.047 33.5781C194.047 33.3281 194.172 33.2031 194.422 33.2031H205.203C205.453 33.2031 205.578 33.3281 205.578 33.5781L205.672 99.5312C205.672 99.8438 205.547 100 205.297 100Z" fill="currentColor"></path><path d="M148 10H209V23H148V10Z" fill="currentColor"></path></svg>;
};

type ColorSelectProps = {color:typeof colors[keyof typeof colors], colorName: string, changeAccentColor: (colorName: string)=>void}

const ColorSelect = ({color, colorName, changeAccentColor}: ColorSelectProps) => {
    const dimensions = 32;
    return <div
        onClick={() => changeAccentColor(colorName)}
        className='cursor-pointer rounded-full hover:border-gray-700 border'
        style={{width: dimensions, height: dimensions, backgroundColor: color['light']['900']}}></div>;
};

type SandboxProps = {className: string} & PropsWithChildren

const SandboxEditor = ({children, className} : SandboxProps) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    type AvailableColors = keyof typeof colors

    const [colorName, setColorName] = useState<AvailableColors>('plum');

    useEffect(() => {

    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return <div data-accent-color={colorName} className={`p-4 shadow-sm text-gray-900 h-screen border border-gray-300 bg-gray-50 ${isDarkMode ? 'rad-ui-dark-theme' : ''}`}>
        <div className='mb-4'>
            {/* @ts-ignore */}
            <div className='flex items-center space-x-4'>
                <div className='text-gray-1000'>
                    <RadUILogo/>
                </div>
                <Separator orientation='vertical' />
                <Button variant="outline" onClick={toggleDarkMode}>{isDarkMode ? <SunIcon/> : <MoonIcon/>}</Button>
            </div>
            <Separator />
            <div>
                <div className="flex items-center space-x-2">
                    <Heading as='h1' className="text-gray-1000">Sandbox Editor</Heading>
                    <Separator orientation='vertical' />
                    <Text className="font-normal text-gray-950">
                        Customize the colors of the Radix UI components by clicking on the color swatches below.
                    </Text>
                </div>
                <Separator />
                <div className='flex space-x-2 my-1'>
                    {Object.keys(colors).map((color, idx) => {
                        const colorName = color as AvailableColors;
                        return <ColorSelect changeAccentColor={() => setColorName(colorName)} colorName={color} color={colors[colorName]} key={idx} />;
                    },
                    )}

                </div>
            </div>
        </div>
        <Separator/>
        <div className={`${className}`} >
            {children}
        </div>
    </div>;
};

export default SandboxEditor;
