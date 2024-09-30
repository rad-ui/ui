"use client"


import Avatar from "@radui/ui/Avatar"
import Text from "@radui/ui/Text"
import Link from "@radui/ui/Link"
import Separator from "@radui/ui/Separator"

const MenuIcon = () => {
    return <svg height="18" width="18" viewBox="0 0 24 24">
        <path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
    </svg>
}

const UserItem = ({ name = "", src = "", ...props }) => {
    const initials = name.split(' ').map(n => n[0]).join('')
    return <div className='flex items-center justify-between' {...props}>
        <div className="flex items-center space-x-2">
            <Avatar src={src} fallback={initials} />
            <Text className="font-light !text-sm hover:underline cursor-pointer text-blue-950">{name}</Text>
        </div>
        <span className='cursor-pointer'>
            <MenuIcon />
        </span>
    </div>
}

const YourTeamDemo = () => {
    return <div className='p-4 border border-gray-400 text-gray-1000 rounded-md bg-gray-100'>
        <div className='flex items-center justify-between'>
            <Text className="font-bold">Your Team</Text>
            <Link>Edit</Link>

        </div>
        <Separator />
        <div className='my-4 space-y-4'>
            <UserItem src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJqIVJmQ3hq3adzrQYZVTqTxKSxyY2zbZNaw&usqp=CAU"} name="Mike Shinoda" />
            <UserItem name="Chester Bennington" data-accent-color="blue" />
            <UserItem name="Rob Bourdon" data-accent-color="green" />
            <UserItem name="Brad Delson" data-accent-color="gold" />
            <UserItem name="Joe Hahn" data-accent-color="gray" />
            <UserItem name="Dave Farrell" data-accent-color="crimson" />
        </div>

    </div>
}

export default YourTeamDemo