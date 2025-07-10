// build.js
import { rollup, watch } from 'rollup';
import rollupConfig from './rollup.config.js';
import cssConfig from './rollup-css.config.js';
import tokensConfig from './rollup-tokens.config.js';
import path from 'path';

async function buildWithConfig(config, name) {
  const start = Date.now();
  const memStart = process.memoryUsage().heapUsed;
  let bundle;
  try {
    bundle = await rollup(config);
    for (const output of (Array.isArray(config.output) ? config.output : [config.output])) {
      await bundle.write(output);
    }
    await bundle.close();
    const memEnd = process.memoryUsage().heapUsed;
    console.log(`${name} build complete in ${(Date.now() - start) / 1000}s, memory used: ${((memEnd - memStart) / 1024 / 1024).toFixed(2)}MB`);
  } catch (e) {
    console.error(`${name} build failed:`, e);
    if (bundle) await bundle.close();
    process.exit(1);
  }
}

async function main() {
  console.log('Starting parallel build...');
  const t0 = Date.now();
  const mem0 = process.memoryUsage().heapUsed;

  // rollup.config.cjs exports an async function
  const componentConfigs = await rollupConfig();

  await Promise.all([
    ...componentConfigs.map((cfg, i) => buildWithConfig(cfg, `Component[${i}]`)),
    buildWithConfig(cssConfig, 'CSS'),
    buildWithConfig(tokensConfig, 'Tokens')
  ]);

  const t1 = Date.now();
  const mem1 = process.memoryUsage().heapUsed;
  console.log(`\nTotal build time: ${(t1 - t0) / 1000}s`);
  console.log(`Total memory used: ${((mem1 - mem0) / 1024 / 1024).toFixed(2)}MB`);
}

main(); 