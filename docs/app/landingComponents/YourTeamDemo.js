"use client"


import Avatar from "@radui/ui/Avatar"
import Text from "@radui/ui/Text"
import Link from "@radui/ui/Link"
import Separator from "@radui/ui/Separator"
import { motion } from "motion/react"


const MenuIcon = () => {
    return <svg height="18" width="18" viewBox="0 0 24 24">
        <path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
    </svg>
}

const UserItem = ({ name = "", src = null, ...props }) => {
    const initials = name.split(' ').map(n => n[0]).join('')
    return <div className='flex items-center justify-between' {...props}>
        <div className="flex items-center space-x-2">
            <Avatar.Root>
                <Avatar.Image src={src} />
                <Avatar.Fallback>{initials}</Avatar.Fallback>
            </Avatar.Root>
            <Text className="font-light !text-sm hover:underline cursor-pointer text-blue-950">{name}</Text>
        </div>
        <span className='cursor-pointer'>
            <MenuIcon />
        </span>
    </div>
}

const YourTeamDemo = () => {
    return <motion.div className='p-4 border border-gray-400 text-gray-1000 rounded-md bg-gray-100'
        initial={{ opacity: 0.8, x: 100, y: 0 }}
        animate={{ opacity: 1, x: 0, y: -60 }}
        transition={{ duration: 36, repeat: Infinity, repeatType: 'reverse', type: 'linear' }}
    >
        <div className='flex items-center justify-between'>
            <Text className="font-bold">Your Team</Text>
            <Link>Edit</Link>
        </div>
        <Separator />
        <div className='my-4 space-y-4'>
            <UserItem src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJqIVJmQ3hq3adzrQYZVTqTxKSxyY2zbZNaw&usqp=CAU"} name="John Doe" />
            <UserItem name="Jane Smith" data-accent-color="blue" />
            <UserItem name="Alice Johnson" data-accent-color="green" />
            <UserItem name="Bob Brown" data-accent-color="gold" />
        </div>
    </motion.div>
}

export default YourTeamDemo