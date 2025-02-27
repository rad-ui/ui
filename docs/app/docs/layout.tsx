import PageDetails from "@/components/seo/PageDetails";
import Navigation from '@/components/navigation/Navigation';
import docsNavigationSections from "./docsNavigationSections";
import EditPageOnGithub from "@/components/docsHelpers/EditPageOnGithub";


type Doc = {
	children: React.ReactNode;
};


const Layout = ({  children }: Doc) => {



    return (
        <div className= "md:flex max-h-screen overflow-y-auto">
             <div className='md:flex hidden'>
                <Navigation customSections={docsNavigationSections} hideOnDesktop={false} />
            </div>
            <div className='lg:px-4 text-gray-1000 flex-1 flex flex-col gap-4 overflow-y-scroll pt-2' id="docs-content">
                <div className=' p-4 md:mx-auto md:max-w-[1440px] w-full'>
                    <PageDetails  />
                    {children}
                    <EditPageOnGithub />
                </div>
            </div>
        </div>
    )
}

export default Layout;