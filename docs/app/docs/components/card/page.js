import Documentation from '@/components/layout/Documentation/Documentation';

import Card from '@radui/ui/Card';
import Avatar from '@radui/ui/Avatar';
import SEO from '../../docsIndex';

import codeUsage from './docs/codeUsage';
const PAGE_NAME = 'Card';
export const metadata = SEO.getMetadata(PAGE_NAME);

const CardDocs = () => {
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
        </Documentation>
    </div>;
};

export default CardDocs;
