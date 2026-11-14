import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const css = await readFile(path.join(root, 'public', 'app.css'), 'utf8');

function rgb(hex) {
  return hex.match(/[\da-f]{2}/gi).slice(0, 3).map((channel) => parseInt(channel, 16) / 255);
}

function luminance(hex) {
  const channels = rgb(hex).map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a, b) {
  const x = luminance(a);
  const y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

test('theme text color is recomputed where the selected body theme sets its variables', () => {
  assert.match(css, /body\{margin:0;background:var\(--bg\);color:var\(--ink\)\}/);
  assert.match(css, /\.theme-space\{[^}]*--ink:#e5f1fa/);
});

test('dark-theme body and muted text meet WCAG AA contrast on content surfaces', () => {
  const space = css.match(/\.theme-space\{([^}]+)\}/)?.[1];
  assert.ok(space, 'Deep Space theme variables must exist');
  const token = (name) => space.match(new RegExp(`${name}:(#[\\da-f]{6})`, 'i'))?.[1];
  const ink = token('--ink');
  const muted = token('--muted');
  for (const background of [token('--bg'), token('--surface'), token('--surface2')]) {
    assert.ok(contrast(ink, background) >= 7, `primary text contrast must be at least 7:1 on ${background}`);
    assert.ok(contrast(muted, background) >= 4.5, `secondary text contrast must be at least 4.5:1 on ${background}`);
  }
});
