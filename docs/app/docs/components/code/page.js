import Documentation from '@/components/layout/Documentation/Documentation';
import Code from '@radui/ui/Code';
import SEO from '../../docsIndex';
import codeUsage from './docs/codeUsage';

const PAGE_NAME = 'CODE_DOCS';
export const metadata = SEO.getMetadata(PAGE_NAME);

const CodeDocs = () => {
    return <div>
        <Documentation
            currentPage={PAGE_NAME} title='Code' description={`
           Code is used to display inline code.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div className='bg-gray-100 p-5 flex items-center rounded-md shadow'>
                    <Code className="space-x-2" style={{ margin: 0 }}>console.log('This is some code')</Code>
                </div>
            </Documentation.ComponentHero>

        </Documentation>
    </div>;
};

export default CodeDocs;
