"use client"

import Link from "@radui/ui/Link"

const LinkExample = () => {
    return (
        <div className="flex flex-col gap-3">
            <Link href="#">Default link</Link>
            <Link href="#" color="blue">Blue link</Link>
            <Link href="#" color="red">Red link</Link>
            <Link href="#" size="lg">Large link</Link>
        </div>
    )
}

export default LinkExample
