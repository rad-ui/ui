export const BookMarkLink = ({ children, id }) => {
    const sanitizedId = id.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    return (
        <div id={sanitizedId}>
            <a
                href={`#${sanitizedId}`}
                aria-label={`Direct link to ${id}`}
            >
                {children}
            </a>
        </div>
    );
}