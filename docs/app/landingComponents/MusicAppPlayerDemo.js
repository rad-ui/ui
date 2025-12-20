'use client';

import Button from '@radui/ui/Button';
import Heading from '@radui/ui/Heading';
import Text from '@radui/ui/Text';


import { motion } from "motion/react"
import Fade from "@radui/fx/Fade"
import Slide from "@radui/fx/Slide"


import { ArrowLeft as LeftArrow, Shuffle as ShuffleIcon, MoreVertical as ThreeDots } from 'lucide-react';

const MusicBars = ({ index }) => {
    const randomHeightBars = [
        'h-[30px]', 'h-[25px]', 'h-[40px]', 'h-[20px]', 'h-[35px]',
        'h-[45px]', 'h-[15px]', 'h-[30px]', 'h-[25px]', 'h-[35px]',
        'h-[90px]', 'h-[120px]', 'h-[95px]', 'h-[90px]', 'h-[85px]',
        'h-[75px]', 'h-[80px]', 'h-[70px]', 'h-[35px]', 'h-[25px]',
        'h-[30px]', 'h-[35px]', 'h-[25px]', 'h-[40px]', 'h-[30px]'
    ]
    return <div className='flex-1 flex items-center space-x-1 justify-center'
    >
        {randomHeightBars.map((bar, index) => {

            return <div key={index} className={`h-4 rounded-md ${bar} ${index === 12 ? 'bg-gray-950 w-1.5' : 'bg-gray-700 w-1'}`} ></div>
        })}
    </div>
};

const MusicAppPlayerDemo = () => {
    return <Slide duration={1} delay={5} type="spring" direction="down" distance={50}>
        <Fade initialOpacity={1} finalOpacity={0.8}  duration={1} type="spring">
            <div style={{ maxWidth: '400px' }}>
                <div className='border border-gray-400 p-4 bg-gray-100 bg-gradient-to-b from-green-200 to-red-100 rounded-md shadow'>
                    <div className='flex justify-between items-center'>
                        <div className='text-gray-900 w-6 h-6'>
                            <LeftArrow className="w-full h-full" />
                        </div>
                        <div>
                            <div className='text-green-900 flex items-center space-x-2'>
                                <div className="w-[18px] h-[18px]">
                                    <ShuffleIcon className="w-full h-full" />
                                </div>
                                <div className="w-[18px] h-[18px]">
                                    <ThreeDots className="w-full h-full" />
                                </div>
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
                                <MusicBars />;
                            </div>
                            <span>0:19</span>
                        </div>

                    </div>

                </div>
            </div>
        </Fade>
    </Slide>
};

export default MusicAppPlayerDemo;
