import { test, expect } from '@playwright/test';
import { checkA11y, injectAxe } from '@axe-core/playwright';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SSRSelect } from './ssr-components';
import { bundleForSSR } from './utils';

test('Select SSR hydrates without warnings', async ({ page }) => {
  const html = ReactDOMServer.renderToString(React.createElement(SSRSelect));
  const script = await bundleForSSR('SSRSelect');
  const messages: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'warning' || msg.type() === 'error') {
      messages.push(msg.text());
    }
  });
  await page.setContent(`<div id="root">${html}</div><script type="module">${script}</script>`);
  await page.waitForFunction(() => (window as any).__HYDRATED__ === true);
  expect(messages).toEqual([]);
  await injectAxe(page);
  await checkA11y(page, '#root');
});
