import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("ships the bounded community photo workflow", async () => {
  const [component, css, route, hosting, schema] = await Promise.all([
    read("../app/FossilMap.tsx"),
    read("../app/globals.css"),
    read("../app/api/community/route.ts"),
    read("../.openai/hosting.json"),
    read("../db/schema.ts"),
  ]);

  assert.match(component, /function CommunityView/);
  assert.match(component, /nav: "探险笔记"/);
  assert.match(component, /咦？捡到一份奇怪的笔记。/);
  assert.match(component, /Max 的笔记/);
  assert.match(component, /错过最后一班晚间巴士/);
  assert.match(component, /role="dialog"/);
  assert.match(css, /\.community-stamp[\s\S]*cursor:\s*pointer/);
  assert.match(css, /\.max-notebook-backdrop/);
  assert.match(css, /\.location-record-link\s*\{[\s\S]*?background: transparent;[\s\S]*?color: #fff;/);
  assert.match(component, /maxEdge = 1600/);
  assert.match(component, /photos\.length < 3/);
  assert.match(route, /const MAX_IMAGES = 3/);
  assert.match(route, /const MAX_IMAGE_BYTES = 1_572_864/);
  assert.match(route, /const MAX_POSTS_PER_DAY = 4/);
  assert.match(hosting, /"r2": "UPLOADS"/);
  assert.match(schema, /communityPosts/);
});

test("adds locality discoveries sourced from Adventure Notes and the supplied ammonite reference", async () => {
  const [component, css] = await Promise.all([
    read("../app/FossilMap.tsx"),
    read("../app/globals.css"),
  ]);

  assert.match(component, /function LocationDiscoveries/);
  assert.match(component, /locationId: location\.id/);
  assert.match(component, /id="discoveries"/);
  assert.match(component, /<LocationDiscoveries location=\{activeLocation\}/);
  assert.match(component, /\/specimens\/ammonite-fan-shicheng\.jpg/);
  assert.match(component, /来源：樊士丞/);
  assert.match(component, /来自探险笔记/);
  assert.match(css, /\.discoveries-section/);
  assert.match(css, /\.discoveries-grid/);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*\.discoveries-grid \{ grid-template-columns: 1fr; \}/);
});

test("keeps the guide focused and adds the requested discovery play", async () => {
  const [component, css, museumCards] = await Promise.all([
    read("../app/FossilMap.tsx"),
    read("../app/globals.css"),
    read("../app/museum-cards.css"),
  ]);

  assert.doesNotMatch(component, /tidmoor/i);
  assert.match(component, /referencePhotos/);
  assert.match(component, /collectionFilter/);
  assert.match(component, /Nori 的探险任务系统/);
  assert.match(component, /五彩螺已解锁！/);
  assert.match(component, /badgeCount === 3 \? "is-rainbow"/);
  assert.match(component, /nori-field-note-recorded/);
  assert.match(component, /nori-geology-learned/);
  assert.match(component, /SAFETY_CHECK_IDS/);
  assert.match(component, /nori-guide-minimized-v1/);
  assert.match(component, /function answerNoriEquipmentQuestion/);
  assert.match(component, /function answerNoriCuriousQuestion/);
  assert.match(component, /第一次建议轻装：防滑靴、耐磨手套、饮水/);
  assert.match(component, /不要舔，也不要尝螺/);
  assert.match(component, /什么都没捡到算失败吗？/);
  assert.match(component, /equipmentInvite/);
  assert.match(component, /onOpenEquipment=\{openEquipmentView\}/);
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
  assert.match(component, /五彩稀有 · 5★/);
  assert.match(museumCards, /@keyframes museum-rainbow-border/);
  assert.match(museumCards, /rarity-tier-gold \.starfish-rating > span\.filled:nth-child\(5\)/);
  assert.match(css, /\.nori-quest-menu/);
  assert.match(css, /\.nautilus-guide\.is-rainbow/);
  assert.match(css, /@keyframes nori-rainbow-shell/);
  assert.match(css, /\.geology-learn-button/);
  assert.match(css, /\.map-viewport\.is-dragging/);
  assert.match(css, /\.isle-hatchling/);
  assert.match(css, /height:\s*104px/);
});

test("adds the Xiuxiu and Max Nori easter eggs without changing their exact voice lines", async () => {
  const component = await read("../app/FossilMap.tsx");

  assert.match(component, /function answerNoriEasterEgg/);
  assert.match(component, /query\.includes\("修修"\).*修修最棒螺！/);
  assert.match(component, /who\\s\+is\\s\+max[\s\S]*是一只傲娇的小鳄鱼螺。/);
  assert.match(component, /if \(\/螺\[。！？!\?\]\?\$\/\.test\(trimmed\)\) return trimmed/);
  assert.match(component, /const easterEgg = answerNoriEasterEgg\(query\)/);
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

test("adds whale and mammoth finds and labels Weymouth clay as Kimmeridge Clay", async () => {
  const [component, documentLocations, documentZh, notes] = await Promise.all([
    read("../app/FossilMap.tsx"),
    read("../app/document-locations.ts"),
    read("../app/document-location-zh.ts"),
    read("../app/locality-notes.ts"),
  ]);

  const waltonStart = component.indexOf('id: "walton"');
  const waltonEnd = component.indexOf('id: "wootton-bassett"', waltonStart);
  const walton = component.slice(waltonStart, waltonEnd);
  const weymouthStart = component.indexOf('id: "weymouth"');
  const weymouthEnd = component.indexOf('id: "peterborough"', weymouthStart);
  const weymouth = component.slice(weymouthStart, weymouthEnd);
  const suffolkStart = documentLocations.indexOf('id: "nacton"');
  const suffolkEnd = documentLocations.indexOf('id: "fort-victoria"', suffolkStart);
  const suffolk = documentLocations.slice(suffolkStart, suffolkEnd);

  assert.match(walton, /name: "Whale bone"/);
  assert.match(walton, /name: "Mammoth bone or tusk fragment"/);
  assert.match(suffolk, /name: "Whale bone"/);
  assert.match(suffolk, /name: "Mammoth bone or tusk fragment"/);
  assert.match(component, /Mammals: "哺乳动物"/);
  assert.match(documentZh, /猛犸象骨或象牙碎片/);
  assert.match(notes, /鲸骨并不少见/);
  assert.match(notes, /鲸骨也有不少/);
  assert.match(weymouth, /Kimmeridge Clay Formation/);
  assert.doesNotMatch(weymouth, /Oxford Clay/);
});

test("adds supplied locality notes with a hover-reveal M Teacher label", async () => {
  const [component, css, notes, documentLocations] = await Promise.all([
    read("../app/FossilMap.tsx"),
    read("../app/globals.css"),
    read("../app/locality-notes.ts"),
    read("../app/document-locations.ts"),
  ]);

  assert.match(component, /hero-locality-note/);
  assert.match(component, /place-tags[\s\S]*hero-locality-note[\s\S]*field-profile/);
  assert.match(component, /language === "zh" \? "简介" : "Introduction"/);
  assert.match(component, /mteacher-secret/);
  assert.match(component, /（非常个人风格）/);
  assert.match(css, /\.mteacher-secret:hover/);
  assert.match(css, /color:\s*#ffffff/);
  assert.match(css, /\.hero-locality-note\s*\{[\s\S]*color:\s*#ffffff/);
  assert.match(css, /\.hero-locality-note \.locality-note-summary\s*\{[\s\S]*color:\s*#ffffff/);
  assert.match(notes, /title: "Suffolk"/);
  assert.match(notes, /孩子们，情报是假的，这里怎么成农场了？/);
  assert.match(documentLocations, /name: "Suffolk · Nacton Shore"/);
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
