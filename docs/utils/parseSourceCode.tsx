import fs from 'fs';
import path from 'path';


export const getComponentScssSourceCode = (componentName: string) => {
    // This function is only meant to be used for scss files inside the styles/themes/components folder
    try {   
        const component_name = componentName.toLowerCase();
        const path_to_scss = path.join(process.cwd(), '../styles/themes/components/' + component_name + '.scss');
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
    const path_to_jsx = path.join(process.cwd(), '/app/docs/components/' + componentPath);
    const jsx_SourceCode = fs.readFileSync(
        path_to_jsx,
        'utf8'
    );
    return jsx_SourceCode;
}