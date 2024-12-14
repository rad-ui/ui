import Documentation from '@/components/layout/Documentation/Documentation';

import Text from '@radui/ui/Text';
import Heading from '@radui/ui/Heading';
import Link from '@radui/ui/Link';

import SEO from '../../docsIndex';

const PAGE_NAME = 'USAGE';
export const metadata = SEO.getMetadata(PAGE_NAME);

const Usage = () => {
    return <Documentation currentPage={PAGE_NAME} title="Usage">
        <Documentation.Section title="Importing Rad UI">
            <Text className="mb-2 text-gray-1000 font-light">
                Let's take a look at how you can use Rad UI in your project. Importing Rad UI components is super easy. You can import the components you want to use from the library and use them.
                We encourage you to write wrappers around the components and make use of the APIs to create your own components and abstract away the features you don't need.
            </Text>
            <Documentation.CodeBlock>
                {
                    `import Button from "@radui/ui/Button"

const MyButtonComponent = () => {
    return <Button>Click Me</Button>
}

export default MyButtonComponent
`}
            </Documentation.CodeBlock>
        </Documentation.Section>

        <Documentation.Section title="Importing base styles">
            <Text className="mb-2 text-gray-1000 font-light">  Rad UI is headless, meaning it doesn't come with any styles. But we do ship a default theme that you can use to get quickly started off the ground.</Text>
            <Documentation.CodeBlock>
                {'import "@radui/ui/themes/default.css";'}
            </Documentation.CodeBlock>
        </Documentation.Section>

        <Documentation.Section title="Importing tailwind presets">
            <Text className="mb-2 text-gray-1000 font-light">If you need the default theme and would like to plugin Rad UI tokens into your tailwind project. You can import default presets that you can directly use.</Text>
            <Documentation.CodeBlock>
                {` // tailwind.config.js

const config = {
  presets:[
    require("@radui/ui/themes/tailwind-presets/default.js") // import this
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
`}
            </Documentation.CodeBlock>
        </Documentation.Section>

    </Documentation>;
};

export default Usage;
