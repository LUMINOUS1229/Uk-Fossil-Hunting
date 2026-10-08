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
  assert.doesNotMatch(component, /一起去探险吧|heroSubtitle|className="adventure-subtitle"/);
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

test("uses bright cyan map connectors while retaining the selected line emphasis", async () => {
  const css = await read("../app/coastal-map.css");
  assert.match(css, /\.coast-connection line \{ stroke: #78e9f8; stroke-width: 1; opacity: \.8;/);
  assert.match(css, /\.coast-connection\.is-active line \{ stroke: #78e9f8; stroke-width: 2; opacity: 1;/);
});

test("aligns the glass field notes and gates the one-time water reveal after the intro", async () => {
  const [component, css] = await Promise.all([
    read("../app/FossilMap.tsx"),
    read("../app/coastal-map.css"),
  ]);
  assert.match(component, /introPhase === "done" \? "hero-ripple-ready"/);
  assert.match(component, /className="hero-ripples" aria-hidden="true"/);
  assert.match(css, /\.overview-title \{ left: var\(--overview-copy-left\); \}/);
  assert.match(css, /\.map-location-dock \{[^}]*left: var\(--overview-copy-left\)/);
  assert.match(css, /backdrop-filter: blur\(20px\) saturate\(125%\)/);
  assert.match(css, /@keyframes hero-water-reveal/);
  assert.match(css, /@keyframes hero-water-ring/);
  assert.doesNotMatch(css, /hero-water-[^;]+infinite/);
  assert.match(css, /prefers-reduced-motion: reduce[\s\S]*\.overview-title \.hero-copy \{ animation: none; opacity: 1;/);
});

test("reveals field notes immediately after the title without replaying on location changes", async () => {
  const css = await read("../app/coastal-map.css");
  assert.match(css, /--hero-water-duration: 3\.4s/);
  assert.match(css, /hero-water-reveal var\(--hero-water-duration\)/);
  assert.match(css, /\.intro-done \.map-location-dock \{\s*animation: field-notes-water-reveal 2\.6s var\(--hero-water-duration\)[^;]*backwards;/);
  assert.match(css, /\.intro-loading \.map-location-dock, \.intro-reveal \.map-location-dock \{ opacity: 0; visibility: hidden; \}/);
  assert.match(css, /@keyframes field-notes-water-reveal[\s\S]*0% \{[^}]*visibility: hidden/);
  assert.doesNotMatch(css, /has-location[^}]*animation:/);
  assert.match(css, /prefers-reduced-motion: reduce[\s\S]*\.site-shell \.map-location-dock \{ animation: none; opacity: 1; visibility: visible;/);
});

test("keeps mobile notes before the map and page scrolling enabled by default", async () => {
  const [component, css] = await Promise.all([
    read("../app/FossilMap.tsx"), read("../app/coastal-map.css"),
  ]);
  assert.match(css, /\.map-location-dock \{\s*position: relative; top: auto; order: 1;/);
  assert.match(css, /\.overview \.map-viewport \{[^}]*order: 2;[^}]*touch-action: pan-y pinch-zoom/);
  assert.match(css, /\.overview \.map-viewport\.is-touch-active \{ touch-action: none;/);
  assert.doesNotMatch(css, /100svh \+ (225|370)px/);
  assert.match(component, /event\.pointerType === "touch"[^\n]+!mapTouchMode\) return/);
  assert.match(component, /className="map-touch-toggle" aria-pressed=\{mapTouchMode\}/);
  assert.match(component, /onClick=\{\(\) => selectMapLocation\(location\.id\)\}/);
  assert.match(component, /mapNotesRef\.current\?\.scrollIntoView/);
  assert.match(component, /aria-expanded=\{mapNotesExpanded\} aria-controls="map-dock-details"/);
  assert.match(css, /\.intro-done \.overview:not\(\.is-zoomed\) \{ transform: none; \}/);
});
