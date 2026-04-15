import '../main.tailwind.css';
import '../src/design-systems/clarity/default.scss';

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
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    ]
};

export default preview;
