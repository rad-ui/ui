import fs from 'fs';
import path from 'path';


const getProjectRoot = () => {
    // For Vercel deployment
    if (process.env.ENVIRONMENT === 'VERCEL') {
        return path.join(process.cwd(), '.next/server/app');
    }
    // For local development
    return process.cwd();
}


export const getComponentScssSourceCode = (componentName: string) => {
    // This function is only meant to be used for scss files inside the styles/themes/components folder
    try {   
        const component_name = componentName.toLowerCase();
        const path_to_scss = path.join(getProjectRoot(), '../styles/themes/components', `${component_name}.scss`);
        const scss_SourceCode = fs.readFileSync(
        path_to_scss,
        'utf8'
    );
    return scss_SourceCode;
    } catch (error) {
        console.error('Error reading SCSS file: ', componentName, error);
        return null;
    }
}

export const getComponentJsxSourceCode = (componentPath: string) => {
    // This function is only meant to be used for jsx files inside the app/docs/components folder
    const path_to_jsx = path.join(
        getProjectRoot(),
        process.env.ENVIRONMENT === 'VERCEL' ? 'docs/components' : 'app/docs/components',
        componentPath
    );
    
    const jsx_SourceCode = fs.readFileSync(
        path_to_jsx,
        'utf8'
    );
    return jsx_SourceCode;
}