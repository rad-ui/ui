const { spawn } = require('child_process');

const children = [];
let isShuttingDown = false;

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

const shutdown = (exitCode = 0) => {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;

    for (const child of children) {
        if (!child.killed) {
            child.kill('SIGTERM');
        }
    }

    process.exit(exitCode);
};

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

start('npm', ['run', 'generate-tokens:watch'], 'Token watcher');
start('npm', ['run', 'storybook:server'], 'Storybook');
