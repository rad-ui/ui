"use client"


import Text from "@radui/ui/Text"
import Heading from "@radui/ui/Heading"
import Badge from "@radui/ui/Badge"
import Button from "@radui/ui/Button"

const HeartIcon = () => {
    return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.89346 2.35248C3.49195 2.35248 2.35248 3.49359 2.35248 4.90532C2.35248 6.38164 3.20954 7.9168 4.37255 9.33522C5.39396 10.581 6.59464 11.6702 7.50002 12.4778C8.4054 11.6702 9.60608 10.581 10.6275 9.33522C11.7905 7.9168 12.6476 6.38164 12.6476 4.90532C12.6476 3.49359 11.5081 2.35248 10.1066 2.35248C9.27059 2.35248 8.81894 2.64323 8.5397 2.95843C8.27877 3.25295 8.14623 3.58566 8.02501 3.88993C8.00391 3.9429 7.98315 3.99501 7.96211 4.04591C7.88482 4.23294 7.7024 4.35494 7.50002 4.35494C7.29765 4.35494 7.11523 4.23295 7.03793 4.04592C7.01689 3.99501 6.99612 3.94289 6.97502 3.8899C6.8538 3.58564 6.72126 3.25294 6.46034 2.95843C6.18109 2.64323 5.72945 2.35248 4.89346 2.35248ZM1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.0084 1.35248 6.73504 1.76049 7.20884 2.2953C7.32062 2.42147 7.41686 2.55382 7.50002 2.68545C7.58318 2.55382 7.67941 2.42147 7.79119 2.2953C8.265 1.76049 8.99164 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
}

const IconContainer = ({ children }) => {
    return <span className='p-2 border border-green-400 hover:bg-green-200 cursor-pointer text-green-900 rounded-md bg-green-200 inline-block'>
        {children}
    </span>
}


const AddToCartDemo = () => {
    return <div className='p-4 border border-gray-400 rounded-md bg-gray-100 flex space-x-4'>
        <img className='rounded-md' width={180} src="https://assets.myntassets.com/fl_progressive/h_960,q_80,w_720/v1/assets/images/1786273/2017/3/9/11489045721622-LINKIN-PARK-Men-Tshirts-6821489045721432-2.jpg" alt="" />

        <div className='flex-1'>
            <div className='flex space-x-2 items-center mb-2'>
                <Text className="text-gray-800">Linkin Park Underground</Text>
                <Badge color="crimson" >New</Badge>
            </div>
            <Heading as="h6" className="mb-4">Linkin Park - Rounded Tee</Heading>
            <div className='flex items-center space-x-2'>
                <Button color="gold" variant="soft">Add to Cart</Button>
                <IconContainer>
                    <HeartIcon />
                </IconContainer>
            </div>

            <Text className="text-gray-900 mt-4">
                Get comfortable in this amazing tee from Linkin Park. Team it with a pair of jeans and sneakers for a cool look.
            </Text>
        </div>

    </div>
}

export default AddToCartDemo