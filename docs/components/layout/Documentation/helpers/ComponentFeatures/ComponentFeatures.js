

import Heading from "@radui/ui/Heading"

const ComponentFeatures = ({ features }) => {
    return <div>
        <Heading as="h6" className="mb-2 text-gray-1000 font-bold">
            Features
        </Heading>
        <div className='mb-10'>
            <ul className='list-disc list-inside'>
                {
                    features.map((feature, index) => <li key={index}>{feature}</li>)
                }
            </ul>
        </div>
    </div>
}

export default ComponentFeatures;