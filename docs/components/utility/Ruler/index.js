'use client';

import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const Ruler = ({ orientation = 'horizontal', length = 'full', className = '' }) => {
    const isHorizontal = orientation === 'horizontal';
    const lengthClass = length === 'full' ? (isHorizontal ? 'w-full' : 'h-full') : '';
    
    return (
        <div className={`relative flex items-center justify-center ${isHorizontal ? 'flex-row' : 'flex-col'} ${lengthClass} ${className}`}>
            {/* Start arrow */}
            {isHorizontal ? (
                <ArrowLeft className="w-4 h-4 text-gray-600 flex-shrink-0" />
            ) : (
                <ArrowUp className="w-4 h-4 text-gray-600 flex-shrink-0" />
            )}
            
            {/* Dotted line */}
            <div 
                className={`flex-1 bg-gray-600 ${isHorizontal ? 'h-[1px]' : 'w-[1px]'}`}
            />
            
            {/* End arrow */}
            {isHorizontal ? (
                <ArrowRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
            ) : (
                <ArrowDown className="w-4 h-4 text-gray-600 flex-shrink-0" />
            )}
        </div>
    );
}

export default Ruler;