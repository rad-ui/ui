import baseConfig from './jest.config.ts';

const coverageCiConfig = {
    ...baseConfig,
    coverageThreshold: {
        global: {
            statements: 0,
            lines: 0,
            branches: 0,
            functions: 0
        }
    }
};

export default coverageCiConfig;
