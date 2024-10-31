
import Heading from "@radui/ui/Heading"
import Separator from "@radui/ui/Separator"

const ShowCase = ({children})=>{
    return <div className='p-4 text-gray-1000 flex flex-col'>
        <Heading as="h6" className='my-4'>
            Music App
        </Heading>
        <Separator/>
        <div className='overflow-hidden shadow-xl border border-gray-200 bg-gray-50 px-4 py-4 rounded'>
            {children}
        </div>
    </div>
}

export default ShowCase