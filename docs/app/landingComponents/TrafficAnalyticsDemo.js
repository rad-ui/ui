'use client';

import Text from '@radui/ui/Text';
import Link from '@radui/ui/Link';
import Separator from '@radui/ui/Separator';
import { motion } from "motion/react"


const LockIcon = () => {
    return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.4986 0C6.3257 0 5.36107 0.38943 4.73753 1.19361C4.23745 1.83856 4 2.68242 4 3.63325H5C5 2.84313 5.19691 2.23312 5.5278 1.80636C5.91615 1.30552 6.55152 1 7.4986 1C8.35683 1 8.96336 1.26502 9.35846 1.68623C9.75793 2.11211 10 2.76044 10 3.63601V6H3C2.44772 6 2 6.44772 2 7V13C2 13.5523 2.44772 14 3 14H12C12.5523 14 13 13.5523 13 13V7C13 6.44771 12.5523 6 12 6H11V3.63601C11 2.58135 10.7065 1.66167 10.0878 1.0021C9.46477 0.337871 8.57061 0 7.4986 0ZM3 7H12V13H3V7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const AnalyticsBar = ({ index }) => {
    // Define possible height classes (from h-8 to h-32 in increments of 4)
    const heightClasses = [
        'h-8', 'h-12', 'h-16', 'h-20', 'h-24', 'h-28', 'h-32'
    ];

    // Use index to get a deterministic but varied height
    const heightClass = heightClasses[index % heightClasses.length];

    return <div className={`w-2 rounded-md bg-blue-800 ml-1 ${heightClass}`} key={index}></div>;
};

const TrafficAnalyticsDemo = () => {
    return <motion.div className='p-4 border border-gray-400 text-gray-1000 rounded-md bg-gray-100'
        initial={{ opacity: 0.8, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 32, repeat: Infinity, repeatType: 'reverse', type: 'linear' }}
    >
        <div className='flex items-center justify-between'>
            <Text className="font-bold">Traffic this week</Text>
            <LockIcon />

        </div>
        <Separator />
        <div className='flex justify-between'>
            <div className='text-center'>
                <Text className="!text-2xl font-bold">1.2k</Text>
                <Text className="!text-sm">Total visitors</Text>
            </div>
            <div className='text-center'>
                <Text className="!text-2xl font-bold">220$</Text>
                <Text className="!text-sm">Total revenue</Text>
            </div>
            <div className='text-center'>
                <Text className="!text-2xl font-bold">200</Text>
                <Text className="!text-sm">Bounce rate</Text>
            </div>
        </div>
        <div>
            <div className='flex items-end space-x-2 justify-center my-8'>
                {
                    Array.from(Array(25)).map((_, i) => {
                        return <AnalyticsBar index={i} key={i} />;
                    })
                }
            </div>
        </div>

    </motion.div>;
};

export default TrafficAnalyticsDemo;
