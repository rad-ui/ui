export const BookMarkLink = ({ children, id }) => {
    return <div id={id}><a href={`#${id}`}>{children}</a></div>
}

