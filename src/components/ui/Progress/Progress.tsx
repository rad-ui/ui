import React, {useState, useEffect} from 'react';

export type ProgressProps = {
  value: number;
  maxValue: number;
  label: string;
}

const Progress: React.FC<ProgressProps> = ({value, maxValue, label}) => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const calculatedPercentage = (value / maxValue) * 100;
        setPercentage(calculatedPercentage);
    }, [value, maxValue]);

    return (
        <div className="bg-gray-300 rounded-md">
            <div
                role="progressbar"
                className='bg-red-800 rounded-md text-right'
                aria-valuenow={value}
                aria-valuemax={maxValue}
                aria-valuemin={0}
                style={{width: `${percentage}%`}}
            >
                <span className='text-gray-1000 p-2 text-sm'>{label}</span>
            </div>
        </div>
    );
};

export default Progress;
