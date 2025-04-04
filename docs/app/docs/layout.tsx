"use client"

import PageDetails from "@/components/seo/PageDetails";
import Navigation from '@/components/navigation/Navigation';
import EditPageOnGithub from "@/components/docsHelpers/EditPageOnGithub";


type Doc = {
	children: React.ReactNode;
};


const Layout = ({ children }: Doc) => {
    return (
        <div className= "md:flex max-h-screen overflow-y-auto">
             <div className='md:flex hidden overflow-y-auto'>
                <Navigation />
            </div>
            <div className='text-gray-1000 flex flex-col overflow-y-auto flex-1' id="docs-content">
                <div className=' p-4 md:mx-auto md:max-w-[1440px] w-full'>
                    <div className="w-full max-w-screen-lg mx-auto">
                    <PageDetails />
                    {children}
                    <EditPageOnGithub />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Layout;