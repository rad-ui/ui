import NavItem from './NavItem'

const Category = ({ categoryItem, pathname, setIsDocsNavOpen }) => {
    return <div className="mb-5">
        <div className='px-3 pb-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gray-1000'>{categoryItem.title}</div>
        <ul>
            {categoryItem.items.map((item, itemKey) => {
                return <li key={itemKey} onClick={() => setIsDocsNavOpen(false)}>
                    <NavItem item={item} path={pathname} setIsDocsNavOpen={setIsDocsNavOpen} />
                </li>
            })}
        </ul>
    </div>
}


export default Category;
