import postcss from 'rollup-plugin-postcss';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    input: 'styles/themes/default.scss',
    output: {
        file: 'dist/themes/default.css'
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
};
