import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

describe('generate-tailwind-preset', () => {
    let outputDirectory: string;

    beforeEach(() => {
        outputDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'rad-ui-tailwind-preset-'));
    });

    afterEach(() => {
        fs.rmSync(outputDirectory, { recursive: true, force: true });
    });

    it('keeps Tailwind black and white utilities literal across appearances', () => {
        execFileSync('npx', ['--no-install', 'tsx', './scripts/generate-tailwind-preset.ts', '--out', outputDirectory], {
            cwd: process.cwd(),
            stdio: 'pipe'
        });

        const preset = fs.readFileSync(path.join(outputDirectory, 'default.css'), 'utf8');

        expect(preset).not.toMatch(/^\s*--color-(?:black|white):/m);
    });
});
