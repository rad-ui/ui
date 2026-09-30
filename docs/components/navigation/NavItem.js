

import Link from 'next/link'

import Badge from "@radui/ui/Badge"


const NavItem = ({ item, path, setIsDocsNavOpen }) => {


    const isCurrentPath = path === item?.path;
    const baseItemClasses = "mb-0.5 block rounded-md border px-3 py-1.5 text-[0.84rem] font-medium transition-colors"
    const activeClasses = isCurrentPath
        ? 'border-green-500 bg-green-100 text-green-1000'
        : 'border-transparent text-gray-900 hover:bg-gray-100 hover:text-gray-1000'

    return <Link className={`${baseItemClasses} ${activeClasses}`} href={item?.path} prefetch={true}>
        <div className='flex items-center space-x-2'>
            <div>
            {item?.title}
            </div>
            {item.is_new?<div style={{fontSize:'10px'}}><Badge color="red" customRootClass="rad-ui-docs" className="rounded-full bg-red-100 text-red-1000">New</Badge></div>:null}
            {item.is_preview?<div style={{fontSize:'10px'}}><Badge color="orange" customRootClass="rad-ui-docs" className="rounded-full bg-orange-100 text-orange-1000">Preview</Badge></div>:null}
        </div>
       </Link>

}

export default NavItem;
