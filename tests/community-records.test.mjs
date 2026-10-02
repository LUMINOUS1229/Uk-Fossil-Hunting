import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
import { listRecords, locationRecordCounts } from '../db/community-records.ts';

function fixture() {
  const sqlite = new DatabaseSync(':memory:');
  for (const file of readdirSync(new URL('../drizzle/', import.meta.url)).filter(name => name.endsWith('.sql')).sort()) {
    sqlite.exec(readFileSync(new URL(`../drizzle/${file}`, import.meta.url), 'utf8'));
  }
  const db = { prepare(sql) { return { bind(...values) { return { async all() { return { results: sqlite.prepare(sql).all(...values) }; } }; } }; } };
  const insert = (id, place, images = '["photo.jpg"]') => sqlite.prepare('INSERT INTO community_posts (id, profile_id, author, body, location_id, image_keys, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)').run(id, 'test-profile', 'Tester', 'A field note', place, images, '2026-10-02T12:00:00.000Z');
  return { sqlite, db, insert };
}

test('counts all historical records once per post, excluding private and unknown locations', async () => {
  const { sqlite, db, insert } = fixture();
  try {
    assert.deepEqual(await locationRecordCounts(db), {});
    for (let i = 0; i < 53; i++) insert(`a${String(i).padStart(3, '0')}`, 'folkestone', '["one.jpg","two.jpg","three.jpg"]');
    insert('other', 'whitby'); insert('private', null); insert('unknown', 'invalid');
    assert.deepEqual(await locationRecordCounts(db), { folkestone: 53, whitby: 1 });
    assert.deepEqual(await locationRecordCounts(db), { folkestone: 53, whitby: 1 });
    sqlite.prepare('DELETE FROM community_posts WHERE id = ?').run('a000');
    assert.equal((await locationRecordCounts(db)).folkestone, 52);
  } finally { sqlite.close(); }
});

test('region pagination covers every post without duplicates, including tied timestamps and new arrivals', async () => {
  const { sqlite, db, insert } = fixture();
  try {
    for (let i = 0; i < 53; i++) insert(`a${String(i).padStart(3, '0')}`, 'folkestone');
    insert('other', 'whitby');
    const first = await listRecords(db, 'folkestone', null);
    assert.equal(first.rows.length, 24);
    insert('z-new', 'folkestone');
    const second = await listRecords(db, 'folkestone', first.nextCursor);
    const third = await listRecords(db, 'folkestone', second.nextCursor);
    assert.equal(third.nextCursor, null);
    const ids = [...first.rows, ...second.rows, ...third.rows].map(row => row.id);
    assert.equal(ids.length, 53); assert.equal(new Set(ids).size, 53);
    assert.ok(!ids.includes('other')); assert.ok(!ids.includes('z-new'));
    assert.equal((await listRecords(db, 'whitby', null)).rows.length, 1);
    assert.equal((await listRecords(db, 'charmouth', null)).rows.length, 0);
    assert.equal((await listRecords(db, "' OR 1=1 --", null)).rows.length, 0);
    assert.equal((await listRecords(db, '', null)).rows.length, 24);
  } finally { sqlite.close(); }
});
