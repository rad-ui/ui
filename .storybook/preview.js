/** @type { import('@storybook/react').Preview } */

// .storybook/preview.js

import '../src/styles/main.css'; // replace with the name of your tailwind css file


const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
