import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const modelsDir = path.join(root, 'public', 'models');
const [catalog, descriptions] = await Promise.all([
  readFile(path.join(modelsDir, 'catalog.json'), 'utf8').then(JSON.parse),
  readFile(path.join(modelsDir, 'descriptions.json'), 'utf8').then(JSON.parse),
]);

test('every listed 3D model has an existing GLB and a complete bilingual explanation', async () => {
  assert.equal(catalog.length, 41);
  assert.equal(new Set(catalog.map((model) => model.file)).size, catalog.length);
  assert.deepEqual(Object.keys(descriptions).sort(), catalog.map((model) => model.file).sort());

  for (const model of catalog) {
    assert.equal(path.basename(model.file), model.file, `${model.file} must be a direct catalogue filename`);
    const file = await stat(path.join(modelsDir, model.file));
    assert.ok(file.isFile(), `${model.file} must exist`);
    assert.equal(file.size, model.sizeBytes, `${model.file} size must match the catalogue`);
    const description = descriptions[model.file];
    for (const field of ['categoryEn', 'categoryAr', 'purposeEn', 'purposeAr', 'valueEn', 'valueAr'])
      assert.ok(description[field]?.trim(), `${model.file} needs ${field}`);
  }
});

test('gravity, fan, source, and mist scene states each have a matching visible style', async () => {
  const css = await readFile(path.join(root, 'public', '3d-experience.css'), 'utf8');
  const markup = await readFile(path.join(root, 'public', 'lib', 'flame-scene3d.js'), 'utf8');

  assert.match(markup, /class="scene3d-room" data-fire="on" data-gravity="earth" data-air="on" data-mist="off"/);
  for (const selector of [
    '.scene3d-room[data-gravity=micro] .scene-flame',
    '.scene3d-room[data-air=on] .scene-flame',
    '.scene3d-room[data-fire=off] .scene-flame',
    '.scene3d-room[data-mist=on] .scene-droplets',
  ])
    assert.ok(css.includes(selector), `missing visual response for ${selector}`);
  assert.ok(!css.includes('.scene-room['), 'scene selectors must match the rendered .scene3d-room element');
});
