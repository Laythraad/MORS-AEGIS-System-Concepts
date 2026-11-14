import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { filterNavEntries } from '../public/lib/navigation.js';

const entries = [
  ['Overview', 'Challenge overview'],
  ['Chart Guide', 'Chart purposes, variables & limits'],
  ['3D Models', 'Interactive models and scenario controls'],
];
const aliases = { Overview: 'نظرة عامة', 'Chart Guide': 'دليل المخططات', '3D Models': 'النماذج ثلاثية الأبعاد' };

test('navigation search matches page names, descriptions, and Arabic labels', () => {
  assert.deepEqual(filterNavEntries(entries, 'overview', aliases), [entries[0]]);
  assert.deepEqual(filterNavEntries(entries, 'scenario', aliases), [entries[2]]);
  assert.deepEqual(filterNavEntries(entries, 'دليل المخططات', aliases), [entries[1]]);
  assert.deepEqual(filterNavEntries(entries, 'no matching page', aliases), []);
});

test('empty navigation query returns all entries without mutation', () => {
  assert.deepEqual(filterNavEntries(entries, '  ', aliases), entries);
  assert.equal(entries.length, 3);
});

test('navigation search has a labelled, keyboard-operable interface and empty state', async () => {
  const app = await readFile(new URL('../public/app.js', import.meta.url), 'utf8');
  const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
  const css = await readFile(new URL('../public/navigation.css', import.meta.url), 'utf8');
  assert.match(html, /id="navSearch" type="search"/);
  assert.match(app, /filterNavEntries\(nav, search\.value, navArabic\)/);
  assert.match(app, /event\.key === 'Enter'/);
  assert.match(app, /event\.key === 'Escape'/);
  assert.match(app, /nav-empty/);
  assert.match(css, /:focus-visible/);
});
