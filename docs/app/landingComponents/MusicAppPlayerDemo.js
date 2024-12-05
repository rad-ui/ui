'use client';

import Button from '@radui/ui/Button';
import Heading from '@radui/ui/Heading';
import Text from '@radui/ui/Text';

const LeftArrow = () => {
    return <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const ShuffleIcon = () => {
    return <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.3536 1.14645C12.1583 0.951184 11.8417 0.951184 11.6464 1.14645C11.4512 1.34171 11.4512 1.65829 11.6464 1.85355L12.7929 3H12C10.7037 3 9.71111 3.58423 8.87248 4.38931C8.20065 5.03427 7.59349 5.85684 6.99461 6.6682C6.86287 6.84668 6.73154 7.02462 6.6 7.2C5.10874 9.18835 3.49037 11 0.5 11C0.223858 11 0 11.2239 0 11.5C0 11.7761 0.223858 12 0.5 12C4.00963 12 5.89126 9.81165 7.4 7.8C7.54367 7.60845 7.6832 7.41962 7.81996 7.23454L7.82005 7.23443L7.82006 7.23441C8.41674 6.42695 8.96069 5.69085 9.56502 5.11069C10.2889 4.41577 11.0463 4 12 4H12.7929L11.6464 5.14645C11.4512 5.34171 11.4512 5.65829 11.6464 5.85355C11.8417 6.04882 12.1583 6.04882 12.3536 5.85355L14.3536 3.85355C14.5488 3.65829 14.5488 3.34171 14.3536 3.14645L12.3536 1.14645ZM0.5 3C3.35278 3 5.12992 4.44588 6.50548 6.06746L6.3762 6.24266C6.2483 6.4161 6.12293 6.58609 6 6.75C5.96397 6.79804 5.92798 6.84581 5.892 6.89331C4.57348 5.29306 3.02637 4 0.5 4C0.223858 4 0 3.77614 0 3.5C0 3.22386 0.223858 3 0.5 3ZM8.87248 10.6107C8.37284 10.131 7.90897 9.55314 7.45767 8.95468C7.64688 8.71693 7.82704 8.48061 8 8.25L8.08987 8.12987C8.58412 8.79402 9.05288 9.39766 9.56502 9.88931C10.2889 10.5842 11.0463 11 12 11H12.7929L11.6464 9.85355C11.4512 9.65829 11.4512 9.34171 11.6464 9.14645C11.8417 8.95118 12.1583 8.95118 12.3536 9.14645L14.3536 11.1464C14.5488 11.3417 14.5488 11.6583 14.3536 11.8536L12.3536 13.8536C12.1583 14.0488 11.8417 14.0488 11.6464 13.8536C11.4512 13.6583 11.4512 13.3417 11.6464 13.1464L12.7929 12H12C10.7037 12 9.71111 11.4158 8.87248 10.6107Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const ThreeDots = () => {
    return <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const MusicBars = ({ index }) => {
    const randomHeight = Math.floor(Math.random() * 100) + 1;
    return <div className={`h-4  rounded-md ${index === 12 ? 'bg-gray-950 w-1.5' : 'bg-gray-700 w-1'}`} style={{ height: `${randomHeight}px` }}></div>;
};

const MusicAppPlayerDemo = () => {
    return <div>
        <div style={{ maxWidth: '400px' }}>
            <div className='border border-gray-400 p-4 bg-gray-100 bg-gradient-to-b from-green-200 to-red-100 rounded-md shadow'>
                <div className='flex justify-between items-center'>
                    <div className='text-gray-900'>
                        <LeftArrow />
                    </div>
                    <div>
                        <div className='text-green-900 flex items-center space-x-2'>
                            <ShuffleIcon />
                            <ThreeDots />
                        </div>
                    </div>
                </div>

                <div className='px-4 py-8'>

                    <img className='rounded-xl' src="https://assets.audiomack.com/anqel_bb/92e74f4e8a77630b791eb79758196c0753224bc13f8046517c6b5e608e140290.jpeg?width=1000&height=1000&max=true" alt="" />
                    <div className='flex flex-col items-center my-4 space-x-2'>
                        <Text className="font-bold text-gray-1000" >Won't Bite</Text>
                        <Text className="text-gray-800">Doja Cat</Text>
                    </div>
                    <div className='flex items-center w-full justify-between text-xs text-gray-950'>
                        <span>02:22</span>
                        <div className='flex-1 flex items-center space-x-1 justify-center'>
                            {
                                // 25 bars
                                Array.from(Array(25)).map((_, i) => {
                                    return <MusicBars index={i} key={i} />;
                                })

                            }
                        </div>
                        <span>0:19</span>
                    </div>

                </div>

            </div>
        </div>
    </div>;
};

export default MusicAppPlayerDemo;
