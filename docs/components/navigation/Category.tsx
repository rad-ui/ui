import NavItem from './NavItem'

const Category = ({ categoryItem, pathname, setIsDocsNavOpen }) => {
    return <div className="mb-6">
        <div className='px-3 pb-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gray-800'>{categoryItem.title}</div>
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
