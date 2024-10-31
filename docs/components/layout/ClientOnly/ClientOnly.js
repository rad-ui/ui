"use client"
import { useState, useEffect } from 'react';

//https://stackoverflow.com/a/74244878
const Component = ({children}) => {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, [])
    return (
        <>
            {hydrated && <div>{children}</div>}
        </>
    )
}
export default Component;