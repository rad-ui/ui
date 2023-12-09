'use client';

import React, {useState} from 'react';

const Accordion = ({items}) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    <button
                        onClick={() => handleClick(index)}
                        aria-expanded={activeIndex === index}
                        aria-controls={`content-${index}`}
                    >
                        {item.title}
                    </button>
                    <div
                        id={`content-${index}`}
                        role="region"
                        aria-labelledby={`section-${index}`}
                        hidden={activeIndex !== index}
                    >
                        <p>{item.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
