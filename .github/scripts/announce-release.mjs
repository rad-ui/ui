// Posts a release announcement to Discord.
// Env: DISCORD_WEBHOOK_URL, PKG_NAME, PKG_VERSION, REPO. DRY_RUN=1 prints the payload instead.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const { DISCORD_WEBHOOK_URL: webhook, PKG_NAME: name, PKG_VERSION: version, REPO: repo, DRY_RUN } = process.env;

const SECTIONS = {
    'Major Changes': { title: 'Breaking changes', color: 0xe5484d },
    'Minor Changes': { title: 'New', color: 0x3e63dd },
    'Patch Changes': { title: 'Fixes', color: 0x30a46c }
};
const MAX_ITEM = 220;
const MAX_DESCRIPTION = 3800;

// This version's section of CHANGELOG.md: { 'Patch Changes': ['747344d: text', ...], ... }.
const readSections = () => {
    const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
    const lines = changelog.split('\n');
    const start = lines.findIndex((line) => line.trim() === `## ${version}`);
    if (start === -1) return {};
    const sections = {};
    let current = null;
    for (const line of lines.slice(start + 1)) {
        if (/^## /.test(line)) break;
        const heading = line.match(/^### (.+)$/);
        if (heading) {
            current = heading[1].trim();
            sections[current] = [];
        } else if (current && /^- /.test(line)) {
            sections[current].push(line.slice(2).trim());
        } else if (current && line.trim() && sections[current].length) {
            // Continuation of the previous entry.
            sections[current][sections[current].length - 1] += ` ${line.trim()}`;
        }
    }
    return sections;
};

// The PR a changeset commit came from, read from its squash-merge subject: "... (#2268)".
const prFor = (sha) => {
    try {
        const subject = execFileSync('git', ['log', '-1', '--format=%s', sha], { encoding: 'utf8' });
        return subject.match(/\(#(\d+)\)\s*$/)?.[1] ?? null;
    } catch {
        return null;
    }
};

// One short line per change: no commit hash, first sentence when long, linked to its PR.
const formatEntry = (entry) => {
    const match = entry.match(/^([0-9a-f]{7,40}):\s*(.*)$/);
    const sha = match?.[1];
    let text = (match ? match[2] : entry).trim();
    if (text.length > MAX_ITEM) {
        const sentence = text.match(/^.+?[.!?](?=\s|$)/)?.[0];
        text = sentence && sentence.length <= MAX_ITEM ? sentence : `${text.slice(0, MAX_ITEM - 1).trimEnd()}…`;
    }
    const pr = sha ? prFor(sha) : null;
    const link = pr ? ` ([#${pr}](https://github.com/${repo}/pull/${pr}))` : '';
    return `• ${text}${link}`;
};

// Docs-only entries don't change the package.
const isDocsOnly = (entry) => /^([0-9a-f]{7,40}:\s*)?docs(\(.*?\))?:/i.test(entry);

const sections = readSections();
const parts = [];
let color = SECTIONS['Patch Changes'].color;
let count = 0;
for (const key of ['Major Changes', 'Minor Changes', 'Patch Changes']) {
    const entries = (sections[key] ?? []).filter((entry) => !isDocsOnly(entry));
    if (!entries.length) continue;
    if (count === 0) color = SECTIONS[key].color;
    count += entries.length;
    parts.push(`**${SECTIONS[key].title}**\n${entries.map(formatEntry).join('\n')}`);
}

const npmUrl = `https://www.npmjs.com/package/${name}/v/${version}`;
const changelogUrl = `https://github.com/${repo}/blob/main/CHANGELOG.md#${version.replace(/\./g, '')}`;
let changes = parts.join('\n\n') || 'Maintenance release.';
const footer = `\`npm i ${name}@${version}\`\n[npm](${npmUrl}) · [Changelog](${changelogUrl}) · [Docs](https://rad-ui.com)`;
if (changes.length + footer.length + 2 > MAX_DESCRIPTION) {
    changes = `${changes.slice(0, MAX_DESCRIPTION - footer.length - 40).replace(/\n[^\n]*$/, '')}\n…and more in the changelog.`;
}

const payload = {
    username: 'Rad UI Release Bot',
    embeds: [{
        title: `${name} ${version}`,
        url: npmUrl,
        color,
        description: `${changes}\n\n${footer}`
    }]
};

if (DRY_RUN) {
    console.log(JSON.stringify(payload, null, 2));
    process.exit(0);
}

const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
});
if (!response.ok) {
    console.error(`Discord responded ${response.status}: ${await response.text()}`);
    process.exit(1);
}
