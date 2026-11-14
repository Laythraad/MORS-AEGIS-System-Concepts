import test from 'node:test';
import assert from 'node:assert/strict';
import { challengeEvidenceCatalog } from '../ms02-connectors/challenge-data/catalog.mjs';
import { judgingTrail } from '../public/lib/judging-trail.js';

test('the overview presents a concise, evidence-bounded live demo path in both languages', async () => {
  const evidence = await challengeEvidenceCatalog();
  for (const lang of ['en', 'ar']) {
    const html = judgingTrail(evidence, lang);
    assert.equal((html.match(/class="judging-trail-step"/g) || []).length, 3);
    assert.match(html, /data-go="Challenge Evidence"/);
    assert.match(html, /data-go="Chart Guide"/);
    assert.match(html, /data-go="Safety Insights"/);
    assert.match(html, /data-go="3D Models"/);
    assert.match(html, /verified hashes|بصمات تحقق/);
    assert.match(html, /testable|قابل للاختبار/);
  }
});
