"use client"

import Link from 'next/link'

import Badge from "@radui/ui/Badge"


import { useRouter } from 'next/navigation'

const NavItem = ({ item, path,setIsDocsNavOpen }) => {
    const router = useRouter()

    const isCurrentPath = path === item?.path;
    const baseItemClasses = "block px-3 py-2 text-sm l mb-0.5 cursor-pointer mb-1 border-l-4 "
    const activeClasses = isCurrentPath ? 'bg-plum-300 font-medium text-gray-1000 border-plum-800' : 'border-gray-50 font-light text-gray-950 hover:bg-plum-100 hover:border-gray-1000'

    return <Link className={`${baseItemClasses} ${activeClasses}`} href={item?.path} prefetch={true}>
        <div className='flex items-center space-x-2'>
            <div>
            {item?.title}
            </div>
            {item.is_new?<div className='text-xs'><Badge color="purple">New!</Badge></div>:null}
        </div>
       </Link>

}

export default NavItem;