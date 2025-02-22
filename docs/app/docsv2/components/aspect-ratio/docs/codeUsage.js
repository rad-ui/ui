const code = {
    javascript: {
        code: `import AspectRatio from "@radui/ui/AspectRatio"

const AspectRatioExample = () => (
    <AspectRatio ratio='16/9'>
        <img
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        className="Image"
        src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?cs=srgb&dl=pexels-bri-schneiter-28802-346529.jpg&fm=jpg"
        alt="Landscape photograph"
            />
    </AspectRatio>
)`
    
}
}

export const AspectRatioTable = {
     columns : [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ],

     data :[
        {prop: 'ratio', type: 'string', default: '1', description: 'Used to set desired ratio', id: 'ratio'},
        
    ]
}


export default code;