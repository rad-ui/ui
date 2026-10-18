#!/usr/bin/env node
// Tell IndexNow (Bing, Yandex, Seznam, Naver; Bing feeds ChatGPT search and Copilot) which public URLs
// changed, straight from the live sitemap. Google does not use IndexNow; submit the sitemap in Search
// Console for Google.
//
//   node scripts/indexnow.mjs --site https://example.com                   dry run: lists what would be sent
//   node scripts/indexnow.mjs --site https://example.com --since 2026-10-14 --send
//
// --since keeps URLs whose sitemap lastmod is on or after that date (URLs without a lastmod are
// included only without --since). The key is the 32-hex file in public/ (served at /<key>.txt).

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const site = (opt("site") ?? process.env.SITE_URL ?? "").replace(/\/$/, "");
const since = opt("since");
const send = args.includes("--send");
const publicDir = opt("public") ?? "public";

if (!/^https:\/\//.test(site)) {
  console.error("Pass the live site: --site https://example.com (https only).");
  process.exit(1);
}

const keyFile = readdirSync(publicDir).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error(`No IndexNow key file (32 hex characters + .txt) in ${publicDir}/.`);
  process.exit(1);
}
const key = readFileSync(join(publicDir, keyFile), "utf8").trim();
if (`${key}.txt` !== keyFile) {
  console.error(`${keyFile} must contain exactly its own name without .txt.`);
  process.exit(1);
}

const res = await fetch(`${site}/sitemap.xml`);
if (!res.ok) {
  console.error(`Could not read ${site}/sitemap.xml (${res.status}).`);
  process.exit(1);
}
const xml = await res.text();
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: m[1].match(/<loc>(.*?)<\/loc>/)?.[1]?.trim(),
  lastmod: m[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1]?.trim(),
}));
const host = new URL(site).host;
const urls = entries
  .filter((e) => e.loc && new URL(e.loc).host === host)
  .filter((e) => !since || (e.lastmod && e.lastmod.slice(0, 10) >= since))
  .map((e) => e.loc);

console.log(`${urls.length} of ${entries.length} sitemap URLs${since ? ` changed since ${since}` : ""}.`);
if (!send) {
  for (const u of urls.slice(0, 10)) console.log(`  ${u}`);
  if (urls.length > 10) console.log(`  … and ${urls.length - 10} more`);
  console.log("Dry run. Add --send to submit.");
  process.exit(0);
}

for (let i = 0; i < urls.length; i += 10000) {
  const batch = urls.slice(i, i + 10000);
  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation: `${site}/${keyFile}`, urlList: batch }),
  });
  console.log(`Submitted ${batch.length}: HTTP ${r.status}${r.status === 202 ? " (accepted, key check pending)" : ""}`);
  if (r.status >= 400) process.exit(1);
}
