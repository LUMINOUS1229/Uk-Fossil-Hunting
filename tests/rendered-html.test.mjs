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
  assert.match(component, /Nori 的探险任务系统/);
  assert.match(component, /nori-field-note-recorded/);
  assert.match(component, /nori-geology-learned/);
  assert.match(component, /SAFETY_CHECK_IDS/);
  assert.match(component, /nori-guide-minimized-v1/);
  assert.doesNotMatch(component, /locationRoasts|location-roast|诺里锐评|Nori's verdict/);
  assert.doesNotMatch(css, /\.location-roast/);
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
  assert.match(css, /\.nori-quest-menu/);
  assert.match(css, /\.geology-learn-button/);
  assert.match(css, /\.map-viewport\.is-dragging/);
  assert.match(css, /\.isle-hatchling/);
  assert.match(css, /height:\s*104px/);
});

test("offers distinct Weymouth field sheets and station routes", async () => {
  const [component, css] = await Promise.all([
    read("../app/FossilMap.tsx"),
    read("../app/globals.css"),
  ]);

  assert.match(component, /Weymouth · Bowleaze \+ Smallmouth/);
  assert.match(component, /Smallmouth Sands/);
  assert.match(component, /Navigate from Weymouth station/);
  assert.match(component, /Weymouth\+Station\/Sandsfoot\+Castle/);
  assert.match(component, /activeLocation\.finds\.map/);
  assert.match(component, /Kimmeridge Clay Formation · lower succession/);
  assert.match(css, /\.weymouth-site-picker/);
  assert.match(css, /\.weymouth-site-options article\.is-selected/);
});

test("adds private smart location matching and a basic trip profile", async () => {
  const [component, css] = await Promise.all([
    read("../app/FossilMap.tsx"),
    read("../app/globals.css"),
  ]);

  assert.match(component, /function SmartFinderView/);
  assert.match(component, /function finderLocationScore/);
  assert.match(component, /function finderGoalMatches/);
  assert.match(component, /仅在本页即时分析 · 不保存你的选择/);
  assert.match(component, /你是什么类型的猎人？/);
  assert.match(component, /locations\.length\} \{language === "zh" \? "个野外地点/);
  assert.doesNotMatch(component, /<b>N\+<\/b>/);
  assert.match(css, /\.finder-workbench/);
  assert.match(css, /\.finder-result-grid/);
  assert.match(css, /\.finder-profile-card/);
  assert.match(css, /@media \(max-width: 560px\)[\s\S]*\.finder-result-grid \{ grid-template-columns: minmax\(0, 1fr\); \}/);
});

test("adds a museum specimen-care guide and removes the standalone safety notice", async () => {
  const [component, css] = await Promise.all([
    read("../app/FossilMap.tsx"),
    read("../app/globals.css"),
  ]);

  assert.match(component, /捡到化石后怎么办？/);
  assert.match(component, /黄铁矿化标本/);
  assert.match(component, /不要自行涂胶/);
  assert.match(component, /className="museum-care" open/);
  assert.match(component, /careMuseumBody/);
  assert.doesNotMatch(component, /setModal\("safety"\)/);
  assert.doesNotMatch(component, /className="safety-link"/);
  assert.match(css, /\.museum-care-steps/);
  assert.match(css, /\.museum-care-special/);
  assert.match(css, /\.museum-care-museum-note/);
});

test("adds the Folkestone packing game with two realistic load strategies", async () => {
  const [component, css] = await Promise.all([
    read("../app/FossilMap.tsx"),
    read("../app/globals.css"),
  ]);

  assert.match(component, /function FolkestonePackingGame/);
  assert.match(component, /带地质锤路线/);
  assert.match(component, /不带锤纯捡路线/);
  assert.match(component, /hardWeight: 7/);
  assert.match(component, /hardVolume: 16/);
  assert.match(component, /comfortableWeight: 5/);
  assert.match(component, /scene === "night"/);
  assert.match(component, /id: "headlamp"/);
  assert.match(component, /夜间返程/);
  assert.match(component, /onDragStart=/);
  assert.match(component, /onDrop=/);
  assert.match(component, /status === "ready"/);
  assert.match(component, /className="equipment-safety"[\s\S]*<FolkestonePackingGame language=\{language\}/);
  assert.match(css, /\.pixel-hunter-hair/);
  assert.match(css, /\.pixel-hunter-hat-fish/);
  assert.match(component, /鱼纹渔夫帽、穿蓝色外套的像素男生/);
  assert.match(css, /\.packing-stage\.scene-night/);
  assert.match(css, /\.pixel-hunter\.has-headlamp/);
  assert.match(css, /\.packing-stage\.status-over/);
  assert.match(css, /\.packing-item\.is-packed/);
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
  assert.match(css, /\.map-location-dock \{[^}]*top: max\(300px, calc\(50svh - 170px\)\)/);
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
