import Documentation from '@/components/layout/Documentation/Documentation';

import Card from '@radui/ui/Card';
import Avatar from '@radui/ui/Avatar';
import SEO from '../../docsIndex';

import codeUsage from './docs/codeUsage';
const PAGE_NAME = 'Card';
export const metadata = SEO.getMetadata(PAGE_NAME);

const CardDocs = () => {
    const columns = [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ];

    const data = [
        {prop: 'color', type: 'string', default: 'null', description: 'Accent Color of the card', id: 'color'},
    ];  
    return <div>
        <Documentation
            currentPage={PAGE_NAME} title='Card' description={`
            Cards are used to group related information and actions. They are used to display information in a structured way.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <Card data-accent-color="green" className="bg-gray-50 text-gray-950 flex items-center space-x-2">
                    <Avatar fallback="PP" />
                    <div>
                        <div className="font-medium">
                            Peter Parker
                        </div>
                        <div className="text-xs text-gray-800">
                            Biochemist
                        </div>
                    </div>
                </Card>
            </Documentation.ComponentHero>
            <div className="max-w-screen-md">
                <Documentation.Table columns={columns} data={data} />
            </div>
        </Documentation>
    </div>;
};

export default CardDocs;
