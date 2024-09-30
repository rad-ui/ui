const code = {
    javascript: {
        code: `import Accordion from "@radui/ui/Accordion"

const AccordionExample = () => {        
let items = [
    {
        title: "React",
        content: "React is a JavaScript library for building user interfaces."
    },
    {
        title: "Angular",
        content: "Angular is a platform and framework for building single-page client applications using HTML and TypeScript."
    },
    {
        title: "Vue",
        content: "Vue.js is a progressive framework for building user interfaces."
    },


]   

return <div style={{width:"400px"}}>
    <Accordion items={items}>
    </Accordion>
</div>

    }
`
    },
    scss: {
        code: `.rad-ui-accordion-root{
            width: 100%;
            border: 1px solid var(--rad-ui-color-gray-1000);
            border-radius: 4px;
            overflow: hidden;
        
        
        
            .rad-ui-accordion-item {
                background-color: var(--rad-ui-color-gray-50);
                // not last child
                &:not(:last-child){
                    border-bottom: 1px solid var(--rad-ui-color-gray-1000);
                }
        
                
                &:focus{
                    outline: none;
                    border: none;
                    color:black;
                }
                &:focus-within{
                    color: var(--rad-ui-color-gray-1000);
                }
        
                .rad-ui-accordion-trigger{
                    width: 100%;
                    text-align: left;
                    padding:16px;
                    font-size: 1em;
                    font-weight: 600;
                    color: var(--rad-ui-color-gray-1000);
                    background-color: var(--rad-ui-color-accent-100);
        
                    &:focus{
                        outline: none;
                        color: var(--rad-ui-color-accent-900);
                    
                    }
                }
        
                .rad-ui-accordion-content {
                    padding: 16px;
                    font-size: 1em;
                    background-color: var(--rad-ui-color-gray-100);
                    color: var(--rad-ui-color-gray-1000);
                    border-top: 1px solid var(--rad-ui-color-gray-1000);
                }
            }
        }`
    },
}

export default code;