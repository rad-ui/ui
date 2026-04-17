import fs from 'fs';
import path from 'path';

const STYLE_COMPONENT_FOLDER_EXCEPTIONS: Record<string, string> = {
    blockquote: 'BlockQuote',
    radiocards: 'RadioCards',
    textarea: 'TextArea'
};

const toComponentFolderName = (fileName: string) => {
    return STYLE_COMPONENT_FOLDER_EXCEPTIONS[fileName]
        || fileName
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
};

const normalizeSourcePath = (sourcePath: string) => {
    const themedComponentMatch = sourcePath.match(/^styles\/themes\/components\/(.+)\.scss$/);

    if (!themedComponentMatch) {
        return sourcePath;
    }

    // TODO: Bulk-update docs `codeUsage.js` files to point at the new
    // `src/components/ui/*/*.clarity.scss` paths, then remove this compatibility mapping.
    const componentFileName = themedComponentMatch[1];
    const componentFolder = toComponentFolderName(componentFileName);

    return `src/components/ui/${componentFolder}/${componentFileName}.clarity.scss`;
};

const getProjectRoot = () => {
    // For local development
    if(process.env.ENVIRONMENT === 'VERCEL') {
        return "https://raw.githubusercontent.com/rad-ui/ui/refs/heads/main/";
    }
    const localRootPath = process.cwd()+'/../';
    return localRootPath;
}



export const getSourceCodeFromPath = async (sourcePath: string) => {
    // This is used for development purposes
    // If you're rendering, say for example, ROOT + docs/app/docs/components/accordion/docs/example_1.tsx, the path should be
    // docs/app/docs/components/accordion/docs/example_1.tsx 
    // ** Where ROOT is the root of the repo


    // Check if its local DEV server or on ENVIRONMENT = "VERCEL"
    // If its local DEV server, then the path is automatically set here in this function
    // If vercel, this returns an response made from an API call to github
    // We just need to be consistent with the path

    const normalizedSourcePath = normalizeSourcePath(sourcePath);

    if(process.env.ENVIRONMENT === 'VERCEL') {
        // Return the response from github
        return readGithubSourceCode(normalizedSourcePath);
    }

    // If its local DEV server, then the path is automatically set here in this function
    const projectRoot = await getProjectRoot();
    const finalSourcePath = path.join(
        projectRoot,
        normalizedSourcePath
    );
    // console.log('PATH: ', finalSourcePath);

    const LOG = false;

    if(LOG) {
        // if(process.env.ENVIRONMENT === 'VERCEL') {
        //     console.log('VERCEL ENV PATH DETECTED: WILL RETURN GITHUB SOURCE CODE PATH');
        // } else {
        //     console.log('LOCAL ENV PATH DETECTED: WILL RETURN LOCAL SOURCE CODE PATH');
        // }

        console.log('PROJECT ROOT: ', projectRoot);
        console.log('SOURCE PATH: ', normalizedSourcePath);
        console.log('PATH TO JSX: ', finalSourcePath);
    }

    const sourceCode = fs.readFileSync(
        finalSourcePath,
        'utf8'
    );


    return sourceCode;
}


const readGithubSourceCode = async (componentPath: string) => {
    const root_Path = getProjectRoot(); 
    const fullPath = `${root_Path}${componentPath}`;
    const response = await fetch(fullPath);

    if (!response.ok) {
        throw new Error(
            `Failed to load GitHub source (${response.status}) for ${componentPath}`
        );
    }

    const sourceCode = await response.text();
    return sourceCode;
}
