import fs from 'fs';
import path from 'path';


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

    if(process.env.ENVIRONMENT === 'VERCEL') {
        // Return the response from github
        return readGithubSourceCode(sourcePath);
    }

    // If its local DEV server, then the path is automatically set here in this function
    const projectRoot = await getProjectRoot();
    const finalSourcePath = path.join(
        projectRoot,
        sourcePath
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
        console.log('SOURCE PATH: ', sourcePath);
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
    const sourceCode = await response.text();
    return sourceCode;
}