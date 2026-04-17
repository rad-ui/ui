const { spawn } = require('child_process');

const children = [];
let isShuttingDown = false;

const waitForExit = (child) => new Promise((resolve) => {
    if (child.exitCode !== null || child.killed) {
        resolve();
        return;
    }

    const done = () => resolve();
    child.once('exit', done);
    child.once('close', done);
});

const run = (command, args, name) => new Promise((resolve, reject) => {
    const child = spawn(command, args, {
        stdio: 'inherit',
        shell: true
    });

    child.on('exit', (code, signal) => {
        if (signal) {
            reject(new Error(`${name} exited with signal ${signal}`));
            return;
        }

        if (code && code !== 0) {
            reject(new Error(`${name} exited with code ${code}`));
            return;
        }

        resolve();
    });
});

const start = (command, args, name) => {
    const child = spawn(command, args, {
        stdio: 'inherit',
        shell: true
    });

    child.on('exit', (code, signal) => {
        if (isShuttingDown) {
            return;
        }

        if (signal) {
            shutdown(0);
            return;
        }

        if (code && code !== 0) {
            console.error(`${name} exited with code ${code}`);
        }

        shutdown(code || 0);
    });

    children.push(child);
    return child;
};

const shutdown = async(exitCode = 0) => {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;

    for (const child of children) {
        if (!child.killed) {
            child.kill('SIGTERM');
        }
    }

    await Promise.race([
        Promise.all(children.map((child) => waitForExit(child))),
        new Promise((resolve) => setTimeout(resolve, 4000))
    ]);

    process.exit(exitCode);
};

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

const main = async() => {
    try {
        await run('npm', ['run', 'generate-tokens'], 'Token generation');
    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        process.exit(1);
    }

    start('npm', ['run', 'generate-tokens:watch'], 'Token watcher');
    start('npm', ['run', 'storybook:server'], 'Storybook');
};

main();
