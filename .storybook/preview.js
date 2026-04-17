import '../main.tailwind.css';
import '../src/design-systems/clarity/default.scss';
import '../src/design-systems/baremetal/default.scss';

/** @type { import('@storybook/react-webpack5').Preview } */
const preview = {
    parameters: {
        layout: 'fullscreen',
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        }
    },

    decorators: [
        (Story) => {
            if (typeof document !== 'undefined') {
                document.body.setAttribute('data-rad-ui-design-system', 'clarity');
            }

            return Story();
        }
    ]
};

export default preview;
