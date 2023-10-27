const RENDER_AS_ENUMS = [
    {
        label: 'H1',
        tag: 'h1',
    },
    {
        label: 'H2',
        tag: 'h2',
    },
    {
        label: 'H3',
        tag: 'h3',
    },
    {
        label: 'H4',
        tag: 'h4',
    },
    {
        label: 'H5',
        tag: 'h5',
    },
    {
        label: 'H6',
        tag: 'h6',
    },
];

const Heading = ({children})=>{
    return <h1>{children}</h1>;
};

export default Heading;
