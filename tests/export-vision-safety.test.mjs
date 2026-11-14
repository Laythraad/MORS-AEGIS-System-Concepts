import test from 'node:test';
import assert from 'node:assert/strict';
import { csvCell } from '../public/csv-safe.js';

test('CSV export neutralizes spreadsheet formulas while retaining ordinary numbers',()=>{
  assert.equal(csvCell('=HYPERLINK("https://invalid.example")'),'"\'=HYPERLINK(""https://invalid.example"")"');
  assert.equal(csvCell('  @SUM(1,2)'), '"\'  @SUM(1,2)"');
  assert.equal(csvCell(-3),'"-3"');
  assert.equal(csvCell('NASA'),'"NASA"');
});
