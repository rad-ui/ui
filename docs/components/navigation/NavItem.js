"use client"

import Link from 'next/link'

import Badge from "@radui/ui/Badge"


const NavItem = ({ item, path, setIsDocsNavOpen }) => {


    const isCurrentPath = path === item?.path;
    const baseItemClasses = "block px-2 py-1 text-sm l mb-0.5 cursor-pointer mb-1 border-l-4 rounded-sm "
    const activeClasses = isCurrentPath ? 'bg-gray-300 font-medium text-gray-1000 border-gray-1000' : 'border-gray-50 font-light text-gray-950 hover:bg-gray-100 hover:border-gray-800'

    return <Link className={`${baseItemClasses} ${activeClasses}`} href={item?.path} prefetch={true}>
        <div className='flex items-center space-x-2'>
            <div>
            {item?.title}
            </div>
            {item.is_new?<div style={{fontSize:'10px'}}><Badge color="orange" customRootClass="rad-ui-docs" className="bg-green-500 px-2 py-1 rounded-lg text-green-950">New</Badge></div>:null}
        </div>
       </Link>

}

export default NavItem;