import postcss from 'rollup-plugin-postcss';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createThemeConfig = (input, file) => ({
    input,
    output: {
        file
    },
    onwarn(warning, warn) {
        // Suppress CSS file overwrite warnings
        if (warning.code === 'FILE_NAME_CONFLICT') {
            return;
        }
        warn(warning);
    },
    plugins: [
        postcss({
            extract: true,
            minimize: true,
            use: {
                sass: {
                    includePaths: [__dirname],
                    importer: [
                        function(url) {
                            if (url.startsWith('~')) {
                                return {
                                    file: path.resolve(__dirname, url.substring(1))
                                };
                            }
                            return null;
                        }
                    ]
                }
            }
        })
    ]
});

export default [
    createThemeConfig('src/design-systems/clarity/default.scss', 'dist/themes/default.css'),
    createThemeConfig('src/design-systems/baremetal/default.scss', 'dist/themes/baremetal.css')
];
