import Text from "@radui/ui/Text"
import Heading from "@radui/ui/Heading"
import Link from "@radui/ui/Link"
import Separator from "@radui/ui/Separator"
import Badge from "@radui/ui/Badge"
import Table from "@radui/ui/Table"

import CodeBlock from "./helpers/CodeBlock"
import ComponentHero from "./helpers/ComponentHero/ComponentHero"
import ComponentFeatures from "./helpers/ComponentFeatures/ComponentFeatures"

import DOCS_SEO from '@/app/docs/docsIndex';

const LeftArrow = () => {
    return <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
}

const RightArrow = () => {
    return <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
}

const Documentation = ({ title = "", description = "", currentPage = undefined, children }) => {
    const previous = DOCS_SEO.getPrevious(currentPage)
    const next = DOCS_SEO.getNext(currentPage)
    const NEXT_PAGE_TITLE = next?.basic_title || "";


    return <div>
        <div>
            <div className='flex items-center space-x-4'>
                <Heading>{title}</Heading>
            </div>
            {description && <Text className="mb-4 text-gray-900 font-light">{description}</Text>}
        </div>
        <div className='mt-4'>
            {children}
        </div>
        <Separator />
        <div className='flex justify-between'>
            <div>
                {previous && <span className='flex items-center space-x-2'><Link className="flex items-center space-x-2" href={`${previous?.url}`}><LeftArrow /> <span> {previous?.basic_title}</span></Link></span>}
            </div>
            {next && <span className='flex items-center space-x-2'><Link className="flex items-center space-x-2" href={`${next?.url}`}><span> {next?.basic_title}</span><RightArrow /> </Link></span>}
        </div>
    </div>
}

const DocsTable = ({ children , columns=[], data=[]}) => {

   
    return <div className='mb-20'>
        <Heading as="h6" className="mb-4">API Documentation</Heading>
        <Table columns={columns} data={data} >
        {children}
    </Table>
    </div>
}

const Section = ({ title = "", children }) => {
    return <div>
        <Heading as="h6" className="mb-2 mt-8">{title}</Heading>
        <div className='mb-10'>
            {children}
        </div>
    </div>
}

const UnderConstruction = ({ children }) => {
    return <div className='bg-gray-200 text-gray-1000 p-4 rounded-md'>
        <Text className="mb-2 text-gray-1000 font-bold">
            Docs Under Construction
        </Text>
        <Text className="mb-2 text-gray-1000 font-light !text-sm">
            Check Back soon!
        </Text>
    </div>
}


Documentation.UnderConstruction = UnderConstruction;
Documentation.Section = Section;
Documentation.ComponentHero = ComponentHero;
Documentation.ComponentFeatures = ComponentFeatures;
Documentation.CodeBlock = CodeBlock;
Documentation.Table = DocsTable;


export default Documentation;