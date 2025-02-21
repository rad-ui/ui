import PageDetails from "@/components/seo/PageDetails";



type Doc = {
	children: React.ReactNode;
};


const Layout = ({  children }: Doc) => {
    return (
        <div className="p-4">
            <PageDetails  />
            {children}
        </div>
    )
}

export default Layout;