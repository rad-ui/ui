import NavItem from './NavItem'

const Category = ({ categoryItem, pathname, setIsDocsNavOpen }) => {
    return <div className="px-2">
        <div className='px-2 py-2 font-medium text-xs text-gray-1000'>{categoryItem.title}</div>
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