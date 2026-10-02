import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("ships the bounded community photo workflow", async () => {
  const [component, route, hosting, schema] = await Promise.all([
    read("../app/FossilMap.tsx"),
    read("../app/api/community/route.ts"),
    read("../.openai/hosting.json"),
    read("../db/schema.ts"),
  ]);

  assert.match(component, /function CommunityView/);
  assert.match(component, /maxEdge = 1600/);
  assert.match(component, /photos\.length < 3/);
  assert.match(route, /const MAX_IMAGES = 3/);
  assert.match(route, /const MAX_IMAGE_BYTES = 1_572_864/);
  assert.match(route, /const MAX_POSTS_PER_DAY = 4/);
  assert.match(hosting, /"r2": "UPLOADS"/);
  assert.match(schema, /communityPosts/);
});

test("keeps the guide focused and adds the requested discovery play", async () => {
  const [component, css] = await Promise.all([
    read("../app/FossilMap.tsx"),
    read("../app/globals.css"),
  ]);

  assert.doesNotMatch(component, /tidmoor/i);
  assert.match(component, /referencePhotos/);
  assert.match(component, /collectionFilter/);
  assert.match(component, /feedNori/);
  assert.match(component, /nori-guide-minimized-v1/);
  assert.match(component, /nori-restore/);
  assert.match(component, /map-viewport-controls/);
  assert.match(component, /handleMapPointerMove/);
  assert.match(component, /handleMapWheel/);
  assert.match(component, /We collect fossils, and memories too\./);
  assert.match(component, /\["Explore", "Discover", "Learn", "Record", "Remember"\]/);
  assert.match(css, /@keyframes intro-keyword-rise/);
  assert.match(css, /@keyframes intro-tagline-rise/);
  assert.match(component, /特别感谢群主@古谣一直以来的组织，以及.*Maxwell Wang对大部分产地的探索和标记/);
  assert.match(component, /researchgate\.net\/profile\/Maxwell-Wang\?ev=brs_overview/);
  assert.match(component, /seenCount\}\/\{TOTAL_FOSSILS/);
  assert.match(component, /function IsleOfWightSurprise/);
  assert.match(component, /is-dinosaur-isle/);
  assert.match(css, /\.museum-reference-photo/);
  assert.match(css, /\.nori-food-menu/);
  assert.match(css, /\.map-viewport\.is-dragging/);
  assert.match(css, /\.isle-hatchling/);
  assert.match(css, /height:\s*104px/);
});
