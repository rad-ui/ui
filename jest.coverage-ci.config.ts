import baseConfig from './jest.config.ts';

const config = {
    ...baseConfig,
    coverageThreshold: undefined
};

export default config;
