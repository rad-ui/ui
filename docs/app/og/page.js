"use client";
import Card from "@radui/ui/Card";
import Heading from "@radui/ui/Heading";
import Text from "@radui/ui/Text";
import { useSearchParams } from 'next/navigation'

export default function Page() {
    const searchParams = useSearchParams()
    const title = searchParams.get('title')
    const description = searchParams.get('description')
    return (
        <Card className='p-4 m-4'>
            <Heading as='h2' className='text-gray-1000'>{title}</Heading>
            <Text className='text-gray-950'>{description}</Text>
        </Card>

    );
}