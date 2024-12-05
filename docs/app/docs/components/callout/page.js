import Documentation from '@/components/layout/Documentation/Documentation';

import Callout from '@radui/ui/Callout';
import Text from '@radui/ui/Text';
import Avatar from '@radui/ui/Avatar';
import SEO from '../../docsIndex';

import codeUsage from './docs/codeUsage';
const PAGE_NAME = 'Card';
export const metadata = SEO.getMetadata(PAGE_NAME);

const Arrow = () => {
    return <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V13.5C3 13.6818 3.09864 13.8492 3.25762 13.9373C3.41659 14.0254 3.61087 14.0203 3.765 13.924L7.5 11.5896L11.235 13.924C11.3891 14.0203 11.5834 14.0254 11.7424 13.9373C11.9014 13.8492 12 13.6818 12 13.5V2.5C12 2.22386 11.7761 2 11.5 2H3.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const CalloutDocs = () => {
    return <div>
        <Documentation
            currentPage={PAGE_NAME} title='Callout' description={`
            Callout is a component that can be used to display a message or a notification to the user.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <Callout color="red">
                    <div className="flex items-start">
                        <Arrow/>
                        <div className="ml-2">
                            <Text className="font-bold">Error</Text>
                            <Text>Something went wrong. Please try again later.</Text>
                        </div>
                    </div>
                </Callout>
            </Documentation.ComponentHero>

        </Documentation>
    </div>;
};

export default CalloutDocs;
