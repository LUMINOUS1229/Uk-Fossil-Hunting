import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mapLabels, coastGroups, mapLabelFor } from "../app/map-layout.ts";

const sites = ["../app/FossilMap.tsx", "../app/document-locations.ts"].flatMap((path) => {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  return [...source.matchAll(/id: "([^"]+)",(?:(?!\bid:)[\s\S])*?mapX: ([\d.]+),\s+mapY: ([\d.]+)/g)]
    .map((m) => ({ id: m[1], mapX: +m[2], mapY: +m[3] }));
});
const side = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

test("offshore leaders do not cross and every site retains a label", () => {
  assert.equal(sites.length, 21);
  const segments = sites.map((site) => {
    assert.ok(mapLabels[site.id], site.id);
    return { id: site.id, a: { x: site.mapX, y: site.mapY }, b: mapLabelFor(site) };
  });
  for (let i = 0; i < segments.length; i++) for (let j = i + 1; j < segments.length; j++) {
    const p = segments[i], q = segments[j];
    const crossing = side(p.a, p.b, q.a) * side(p.a, p.b, q.b) < 0 && side(q.a, q.b, p.a) * side(q.a, q.b, p.b) < 0;
    assert.ok(!crossing, `${p.id} crosses ${q.id}`);
  }
});

test("coastal groups cover real, non-duplicated sites with their actual counts", () => {
  const members = coastGroups.flatMap((group) => group.members);
  assert.equal(new Set(members).size, members.length);
  assert.deepEqual(coastGroups.map((group) => group.members.length), [3, 5, 4]);
  for (const id of members) assert.ok(sites.some((site) => site.id === id), id);
});
