"use client";

import { useEffect, useMemo, useState } from "react";

type Risk = "LOW" | "MODERATE" | "HIGH";

type Find = {
  glyph: string;
  name: string;
  zh: string;
  rarity: string;
  size: string;
  tip: string;
};

type Location = {
  id: string;
  name: string;
  shortName: string;
  region: string;
  period: string;
  age: string;
  type: string;
  risk: Risk;
  level: string;
  mapX: number;
  mapY: number;
  departure: string;
  station: string;
  local: string;
  walk: string;
  duration: string;
  railLink: string;
  mapsLink: string;
  tideLink?: string;
  route: string[];
  terrain: string;
  exit: string;
  tideWindow: string;
  season: string;
  conditions: string;
  finds: Find[];
  required: string[];
  useful: string[];
  avoid: string[];
  hazards: string[];
  safetyLead: string;
  sssi: string;
  rules: string[];
  source: string;
  sourceLink: string;
  verified: string;
  accent: string;
};

const locations: Location[] = [
  {
    id: "folkestone",
    name: "Folkestone Warren",
    shortName: "Folkestone",
    region: "Kent · South-east coast",
    period: "Early Cretaceous",
    age: "c. 110 million years",
    type: "Cliff & foreshore",
    risk: "HIGH",
    level: "Confident beginner+",
    mapX: 76,
    mapY: 75,
    departure: "London St Pancras",
    station: "Folkestone Central",
    local: "Local taxi or town bus toward East Cliff",
    walk: "25–35 min to the Warren access",
    duration: "1 hr 45–2 hr 15",
    railLink: "https://www.nationalrail.co.uk/destinations/trains-from-london-to-folkestone-central/",
    mapsLink: "https://www.google.com/maps/dir/Folkestone+Central/Folkestone+Warren",
    tideLink: "https://www.tidetimes.org.uk/folkestone-tide-times",
    route: [
      "Leave Folkestone Central toward the harbour side of town.",
      "Reach the signed Warren footpath and use the formal beach access.",
      "Search loose Gault Clay and shingle east of Copt Point on a falling tide.",
      "Turn back before the incoming tide narrows the route around the boulders.",
    ],
    terrain: "Steep path · slick clay · large boulders",
    exit: "Primary exit: Warren access steps",
    tideWindow: "Arrive 2 hours before low tide",
    season: "Spring–autumn; winter only in settled weather",
    conditions: "Best after safe beach scouring; avoid recent cliff falls",
    finds: [
      { glyph: "◎", name: "Ammonite", zh: "菊石", rarity: "Common", size: "2–15 cm", tip: "Look for ribbed coils or pearly shell." },
      { glyph: "│", name: "Belemnite", zh: "箭石", rarity: "Common", size: "2–8 cm", tip: "Bullet-shaped guards in dark clay." },
      { glyph: "✣", name: "Echinoid", zh: "海胆", rarity: "Occasional", size: "2–6 cm", tip: "Five-fold petal pattern on the test." },
      { glyph: "⌁", name: "Crab", zh: "蟹", rarity: "Uncommon", size: "1–8 cm", tip: "Nodular carapace inside clay concretions." },
    ],
    required: ["Sturdy grippy boots", "Gloves", "Eye protection", "Water", "Wrapping tissue"],
    useful: ["Small pick", "Sample boxes", "Knee pads"],
    avoid: ["Heavy hammer near cliffs", "Working beneath fresh falls"],
    hazards: ["Incoming tide can restrict exits", "Unstable cliffs and rockfall", "Large, slippery boulders", "Fragile fossils need immediate wrapping"],
    safetyLead: "Do not linger below the cliffs. The foreshore is slow and slippery, so leave more return time than the map suggests.",
    sssi: "Folkestone Warren SSSI",
    rules: ["Collect loose material only.", "Do not hammer bedrock or dig into the cliff.", "Keep clear of fresh slips and vegetation restoration.", "Report unusual vertebrate material to a local museum."],
    source: "UK Fossils · Natural England site guidance",
    sourceLink: "https://ukfossils.co.uk/folkestone/",
    verified: "01 Aug 2026",
    accent: "#c75b36",
  },
  {
    id: "herne-bay",
    name: "Herne Bay / Beltinge",
    shortName: "Herne Bay",
    region: "Kent · North coast",
    period: "Palaeocene–Eocene",
    age: "c. 56–54 million years",
    type: "Tidal foreshore",
    risk: "MODERATE",
    level: "Patient beginner",
    mapX: 77,
    mapY: 67,
    departure: "London St Pancras or Victoria",
    station: "Herne Bay",
    local: "Local bus or taxi to Reculver Drive, Beltinge",
    walk: "10 min from cliff-top parking; 35 min from station",
    duration: "1 hr 50–2 hr 20",
    railLink: "https://www.nationalrail.co.uk/destinations/trains-from-london-to-herne-bay/",
    mapsLink: "https://www.google.com/maps/dir/Herne+Bay+Station/Beltinge+Beach",
    tideLink: "https://www.tidetimes.org.uk/herne-bay-tide-times",
    route: [
      "Use the formal concrete access below Reculver Drive.",
      "Turn west toward Herne Bay and locate the foreshore between the groynes.",
      "At very low tide, scan the pebbly boundary beside the shallow drainage channel.",
      "Leave the lower foreshore as soon as the water turns.",
    ],
    terrain: "Concrete path · mud · shingle · standing water",
    exit: "Multiple promenade steps; mark the one you used",
    tideWindow: "Very low tide (around 0.8 m or less); arrive 1 hour early",
    season: "Spring tides throughout the year",
    conditions: "Light wind and a strong falling tide expose the fish bed",
    finds: [
      { glyph: "▲", name: "Shark tooth", zh: "鲨鱼牙", rarity: "Common", size: "3–35 mm", tip: "Dark enamel points against pale shingle." },
      { glyph: "▰", name: "Ray plate", zh: "鳐鱼齿板", rarity: "Common", size: "2–20 mm", tip: "Flat ridged crushing surfaces." },
      { glyph: "◈", name: "Fish remain", zh: "鱼类遗骸", rarity: "Occasional", size: "2–30 mm", tip: "Glossy teeth, spines and vertebrae." },
      { glyph: "▱", name: "Turtle fragment", zh: "龟甲碎片", rarity: "Rare", size: "1–5 cm", tip: "Fine pitted texture, unlike flint." },
    ],
    required: ["Wellington boots", "Warm layers", "Small specimen pot", "Tide plan", "Tweezers"],
    useful: ["2 mm sieve", "Knee pads", "Hand lens"],
    avoid: ["Hammering", "Walking out on a rising tide"],
    hazards: ["The best bed is only exposed on exceptional lows", "Mud and standing water", "Cold onshore wind", "Rising water shortens the return window"],
    safetyLead: "The collecting window is governed by tide height, not just the printed low-tide time. If the foreshore does not expose, do not push farther out.",
    sssi: "Herne Bay–Reculver protected coastline",
    rules: ["Take small loose surface finds only.", "Do not dig into cliffs or damage the foreshore beds.", "Avoid disturbing roosting and nesting birds.", "Record rare vertebrate finds with a museum."],
    source: "UK Fossils field guide",
    sourceLink: "https://ukfossils.co.uk/herne-bay/",
    verified: "01 Aug 2026",
    accent: "#3f6e6b",
  },
  {
    id: "walton",
    name: "Walton-on-the-Naze",
    shortName: "Walton-on-the-Naze",
    region: "Essex · North Sea coast",
    period: "Eocene & Pliocene",
    age: "c. 54 & 3 million years",
    type: "Cliff & foreshore",
    risk: "MODERATE",
    level: "Beginner friendly",
    mapX: 79,
    mapY: 57,
    departure: "London Liverpool Street",
    station: "Walton-on-the-Naze",
    local: "Taxi to Naze Tower or walk through town",
    walk: "35–45 min to Naze Tower beach steps",
    duration: "2–2 hr 30",
    railLink: "https://www.nationalrail.co.uk/destinations/trains-from-london-to-walton-on-the-naze/",
    mapsLink: "https://www.google.com/maps/dir/Walton-on-the-Naze+Station/Naze+Tower",
    tideLink: "https://www.tidetimes.org.uk/walton-on-the-naze-tide-times",
    route: [
      "From Naze Tower, take the signed steps to the beach.",
      "Walk north on the open foreshore, keeping the steps behind you as an exit.",
      "Search pyrite-rich shingle and loose slumped Red Crag material.",
      "Return early; the beach steps are inaccessible at high tide.",
    ],
    terrain: "Steps · shingle · soft slump material",
    exit: "Naze Tower steps; no high-tide access",
    tideWindow: "Falling tide; give yourself a 2-hour return margin",
    season: "Autumn–spring after safe scouring",
    conditions: "Productive after storms, but only once cliffs have settled",
    finds: [
      { glyph: "▲", name: "Shark tooth", zh: "鲨鱼牙", rarity: "Occasional", size: "5–45 mm", tip: "Blue-black enamel among pyrite and wood." },
      { glyph: "⌇", name: "Fossil wood", zh: "化石木", rarity: "Common", size: "1–20 cm", tip: "Grain-like texture; often pyritised." },
      { glyph: "◒", name: "Red Crag shell", zh: "红砂层贝类", rarity: "Common", size: "1–8 cm", tip: "Fragile orange-brown shells in loose sand." },
      { glyph: "✦", name: "Bird bone", zh: "鸟类骨骼", rarity: "Very rare", size: "1–6 cm", tip: "Thin-walled; report rather than prepare." },
    ],
    required: ["Sturdy boots", "Tide plan", "Water", "Rigid sample boxes", "Tissue"],
    useful: ["Knee pads", "Small trowel", "Hand lens"],
    avoid: ["Climbing the cliff", "Digging the Red Crag face", "Bedrock hammering"],
    hazards: ["Beach exit covered at high tide", "Frequent landslips and cliff falls", "Soft slump can trap footwear", "Fragile shell material"],
    safetyLead: "Your beach exit disappears at high tide. Keep the Naze Tower steps in sight and leave while the route is still wide.",
    sssi: "The Naze SSSI",
    rules: ["Loose, ex-situ fossils may be picked up.", "No digging into cliffs or hammering bedrock.", "Do not climb the soft cliff or slumps.", "Record rare bird or vertebrate material."],
    source: "UK Fossils · The Naze field guide",
    sourceLink: "https://ukfossils.co.uk/walton-on-the-naze/",
    verified: "01 Aug 2026",
    accent: "#b9643d",
  },
  {
    id: "wootton-bassett",
    name: "Royal Wootton Bassett",
    shortName: "Wootton Bassett",
    region: "Wiltshire · Inland",
    period: "Late Jurassic",
    age: "c. 160 million years",
    type: "Inland stream",
    risk: "HIGH",
    level: "Experienced adults",
    mapX: 50,
    mapY: 64,
    departure: "London Paddington",
    station: "Swindon",
    local: "Local bus or taxi to Royal Wootton Bassett",
    walk: "25–40 min via canal towpath and public paths",
    duration: "2–2 hr 40",
    railLink: "https://www.nationalrail.co.uk/destinations/trains-from-london-to-swindon-wilts/",
    mapsLink: "https://www.google.com/maps/dir/Swindon+Station/Royal+Wootton+Bassett",
    route: [
      "Join the Wilts & Berks Canal towpath from the south side of town.",
      "Stay on signed public paths toward the stream margins.",
      "Wet-sieve only in safe, shallow accessible water away from the vents.",
      "Turn back if water rises, ground becomes unstable or access is unclear.",
    ],
    terrain: "Boggy ground · shallow stream · rough towpath",
    exit: "Return by the canal towpath; never cross fenced land",
    tideWindow: "Tide not applicable",
    season: "Drier spells in late spring–early autumn",
    conditions: "Avoid after prolonged rain or any sign of spring activity",
    finds: [
      { glyph: "│", name: "Belemnite", zh: "箭石", rarity: "Common", size: "1–8 cm", tip: "Smooth bullet-shaped calcite guards." },
      { glyph: "◎", name: "Ammonite", zh: "菊石", rarity: "Common", size: "1–8 cm", tip: "Small pyritised coils in washed sediment." },
      { glyph: "▲", name: "Fish & shark tooth", zh: "鱼与鲨鱼牙", rarity: "Occasional", size: "1–12 mm", tip: "Use a fine sieve; most are tiny." },
      { glyph: "◒", name: "Mollusc", zh: "软体动物", rarity: "Common", size: "2–40 mm", tip: "Delicate shells may retain original form." },
    ],
    required: ["Wellington boots", "Gloves", "Water", "OS map", "Phone in dry bag"],
    useful: ["Fine sieve", "Trowel", "Lidded bucket"],
    avoid: ["Children", "Entering the fenced spring", "Crossing fences", "Visiting after heavy rain"],
    hazards: ["Mud spring can erupt unpredictably", "Deep soft mud below the surface", "Barbed wire and private fields", "Stream depth changes after rain"],
    safetyLead: "Never enter or approach the fenced mud-spring vents. Access conditions and land permissions can change; remain on public paths and turn back if uncertain.",
    sssi: "Wootton Bassett Mud Spring SSSI",
    rules: ["Do not enter the fenced spring area.", "Stay on public rights of way and do not cross private fences.", "Take only small loose fossils from accessible sediment.", "Check current local access before travel."],
    source: "UK Fossils · Natural England site designation",
    sourceLink: "https://ukfossils.co.uk/wootton-bassett/",
    verified: "01 Aug 2026",
    accent: "#6d5b3f",
  },
  {
    id: "bracklesham",
    name: "Bracklesham Bay",
    shortName: "Bracklesham Bay",
    region: "West Sussex · South coast",
    period: "Middle Eocene",
    age: "c. 46 million years",
    type: "Sandy foreshore",
    risk: "LOW",
    level: "First-time friendly",
    mapX: 61,
    mapY: 78,
    departure: "London Victoria",
    station: "Chichester",
    local: "Local bus toward Bracklesham / East Wittering",
    walk: "5 min from the seafront stop",
    duration: "2 hr 20–3 hr",
    railLink: "https://www.nationalrail.co.uk/destinations/trains-from-london-to-chichester/",
    mapsLink: "https://www.google.com/maps/dir/Chichester+Station/Bracklesham+Bay",
    tideLink: "https://www.tidetimes.org.uk/bracklesham-bay-tide-times",
    route: [
      "Enter the beach from the end of Bracklesham Lane.",
      "Walk east on the broad sand as the tide falls.",
      "Scan the wet sand and exposed clay patches for dark teeth and shells.",
      "Leave soft clay immediately if boots begin to sink.",
    ],
    terrain: "Flat sand · shallow water · occasional soft clay",
    exit: "Frequent seafront access; main exit by café and toilets",
    tideWindow: "Falling tide; best in the hour before low water",
    season: "Spring and early autumn scouring tides",
    conditions: "Good after beach scouring; calm weather suits families",
    finds: [
      { glyph: "▲", name: "Shark tooth", zh: "鲨鱼牙", rarity: "Common", size: "3–35 mm", tip: "Black triangular enamel on wet sand." },
      { glyph: "▰", name: "Ray tooth", zh: "鳐鱼牙", rarity: "Common", size: "3–20 mm", tip: "Low rectangular ridged plates." },
      { glyph: "◒", name: "Bivalve", zh: "双壳类", rarity: "Common", size: "1–10 cm", tip: "Fine shell ribs; lift delicate examples gently." },
      { glyph: "●", name: "Nummulite", zh: "货币虫", rarity: "Very common", size: "5–25 mm", tip: "Coin-shaped single-celled fossils." },
    ],
    required: ["Beach shoes or boots", "Tide plan", "Water", "Small containers", "Sun / wind layer"],
    useful: ["Long-handled trowel", "Sieve", "Knee pads"],
    avoid: ["Hammering", "Deep digging", "Entering soft clay alone"],
    hazards: ["Soft clay can hold boots", "Incoming tide", "Kitesurfing activity", "Few hazards when the beach is broad"],
    safetyLead: "A forgiving beach, but soft exposed clay and a rising tide can still combine badly. Keep children close to the dry sand side of the group.",
    sssi: "Bracklesham Bay SSSI",
    rules: ["Surface collect loose fossils only.", "No hammering or damage to bedrock.", "Fill any small sieve or trowel holes.", "Take a representative few, not bags of duplicates."],
    source: "UK Fossils field guide",
    sourceLink: "https://ukfossils.co.uk/bracklesham-bay/",
    verified: "01 Aug 2026",
    accent: "#47766b",
  },
  {
    id: "charmouth",
    name: "Charmouth / Lyme Regis",
    shortName: "Charmouth",
    region: "Dorset · Jurassic Coast",
    period: "Early Jurassic",
    age: "c. 190 million years",
    type: "Cliff & shingle beach",
    risk: "MODERATE",
    level: "Beginner with care",
    mapX: 41,
    mapY: 79,
    departure: "London Waterloo",
    station: "Axminster",
    local: "Jurassic Coaster bus or taxi to Charmouth",
    walk: "5 min from village centre to the Heritage Centre",
    duration: "3–3 hr 45",
    railLink: "https://www.nationalrail.co.uk/destinations/trains-from-london-to-axminster/",
    mapsLink: "https://www.google.com/maps/dir/Axminster+Station/Charmouth+Heritage+Coast+Centre",
    tideLink: "https://www.tidetimes.org.uk/lyme-regis-tide-times",
    route: [
      "Start at Charmouth Heritage Coast Centre for current advice.",
      "Use the signed beach access and turn west toward Black Ven only when the tide allows.",
      "Search loose shingle and wave-washed material well away from cliff faces.",
      "Return before the beach pinches out; use the same signed access.",
    ],
    terrain: "Shingle · mud · river crossing may vary",
    exit: "Heritage Centre beach access; do not rely on cliff routes",
    tideWindow: "Start on a falling tide, around 2 hours before low water",
    season: "Autumn–spring, after storms once slopes settle",
    conditions: "Fresh wash-outs can be productive; avoid active slips",
    finds: [
      { glyph: "◎", name: "Ammonite", zh: "菊石", rarity: "Common", size: "1–30 cm", tip: "Ribbed coils inside split nodules or shingle." },
      { glyph: "│", name: "Belemnite", zh: "箭石", rarity: "Common", size: "2–10 cm", tip: "Dark bullet-like guards among grey shale." },
      { glyph: "⌁", name: "Coprolite", zh: "粪化石", rarity: "Occasional", size: "1–8 cm", tip: "Irregular dense forms, often with inclusions." },
      { glyph: "◇", name: "Vertebrate bone", zh: "脊椎动物骨骼", rarity: "Rare", size: "Varies", tip: "Porous structure; record important finds." },
    ],
    required: ["Sturdy boots", "Tide plan", "Waterproof layer", "Wrapping tissue", "Water"],
    useful: ["Safety goggles", "Small geological hammer", "Sample boxes"],
    avoid: ["Digging into cliffs", "Standing below landslides", "Oversized hammers"],
    hazards: ["Major cliff falls and mudslides", "Incoming tide cuts off beach sections", "Unstable shingle underfoot", "Winter weather changes quickly"],
    safetyLead: "The safest search area is loose material on the beach, not the cliff. Check the Heritage Centre’s same-day advice before walking toward Black Ven.",
    sssi: "West Dorset Coast SSSI · Fossil Collecting Code area",
    rules: ["Collect loose beach fossils; do not dig in situ cliffs without permission.", "Follow the West Dorset Fossil Collecting Code.", "Record scientifically important specimens at the Heritage Centre.", "If selling an important find, offer it first to an accredited UK museum."],
    source: "Charmouth Heritage Coast Centre · Fossil Collecting Code",
    sourceLink: "https://charmouth.org/chcc/the-fossil-collecting-code/",
    verified: "01 Aug 2026",
    accent: "#765341",
  },
];

const upcoming = [
  { name: "Whitby", x: 61, y: 32, note: "Jurassic ammonites · route risk review" },
  { name: "West Runton", x: 82, y: 44, note: "Mammal remains · collecting restrictions" },
  { name: "Warden Point", x: 76, y: 62, note: "London Clay · coming soon" },
  { name: "Abbey Wood", x: 70, y: 66, note: "Permission required" },
  { name: "Yaverland", x: 66, y: 82, note: "Dinosaur remains · coming soon" },
  { name: "Samphire Hoe", x: 78, y: 78, note: "Chalk fossils · coming soon" },
];

const riskClass = (risk: Risk) => `risk-${risk.toLowerCase()}`;

function AmmoniteMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`ammonite-mark ${small ? "small" : ""}`} aria-hidden="true">
      <span />
    </span>
  );
}

export function FossilMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showLondon, setShowLondon] = useState(true);
  const [modal, setModal] = useState<"about" | "safety" | null>(null);
  const [comingSoon, setComingSoon] = useState<string | null>(null);
  const [mobileList, setMobileList] = useState(false);
  const selected = useMemo(() => locations.find((location) => location.id === selectedId) ?? null, [selectedId]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (modal) setModal(null);
        else if (selectedId) setSelectedId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, selectedId]);

  const openLocation = (id: string) => {
    setComingSoon(null);
    setMobileList(false);
    setSelectedId(id);
  };

  return (
    <main className={`site-shell ${selected ? "detail-open" : ""}`}>
      <header className="topbar">
        <button className="brand" onClick={() => setSelectedId(null)} aria-label="Return to UK map">
          <AmmoniteMark small />
          <span>UK FOSSIL HUNTING</span>
        </button>
        <div className="top-actions">
          <button onClick={() => setModal("about")}>About</button>
          <button className="safety-link" onClick={() => setModal("safety")}>
            <span className="alert-dot" /> Safety first
          </button>
        </div>
      </header>

      <section className={`overview ${selected ? "is-zoomed" : ""}`} aria-hidden={Boolean(selected)}>
        <div className="overview-title">
          <p className="eyebrow">A field map for real days out</p>
          <h1>Find fossils.<br />Know the way back.</h1>
          <p className="intro">Six practical routes from London—mapped from the train platform to the safest place to search.</p>
        </div>

        <div className="uk-map" aria-label="Interactive map of UK fossil locations">
          <div className="north-sea-label">NORTH SEA</div>
          <div className="channel-label">ENGLISH CHANNEL</div>
          <div className="uk-silhouette" aria-hidden="true">
            <div className="land scotland" />
            <div className="land england" />
            <div className="land wales" />
            <div className="land cornwall" />
            <div className="land kent" />
            <div className="map-road road-a" />
            <div className="map-road road-b" />
            <div className="map-road road-c" />
          </div>

          <div className="london-node" style={{ left: "69%", top: "65%" }}>
            <span />
            <b>London</b>
          </div>

          {showLondon && locations.map((location) => {
            const dx = location.mapX - 69;
            const dy = location.mapY - 65;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            return (
              <span
                key={`line-${location.id}`}
                className="london-route"
                style={{ left: "69%", top: "65%", width: `${length}%`, transform: `rotate(${angle}deg)` }}
              />
            );
          })}

          {locations.map((location, index) => (
            <button
              key={location.id}
              className={`map-marker ${location.risk === "HIGH" ? "high-risk" : ""}`}
              style={{ left: `${location.mapX}%`, top: `${location.mapY}%`, "--delay": `${index * 80}ms` } as React.CSSProperties}
              onClick={() => openLocation(location.id)}
              aria-label={`Open ${location.name}`}
            >
              <span className="marker-pulse" />
              <AmmoniteMark small />
              <span className="marker-card">
                <strong>{location.shortName}</strong>
                <small>{location.period} · {location.finds[0].name}s</small>
                <em>{location.duration} from London</em>
              </span>
            </button>
          ))}

          {upcoming.map((place) => (
            <button
              key={place.name}
              className="future-marker"
              style={{ left: `${place.x}%`, top: `${place.y}%` }}
              onClick={() => setComingSoon(place.name)}
              aria-label={`${place.name}, coming soon`}
            >
              <span />
              <small>{place.name}</small>
            </button>
          ))}
        </div>

        <aside className={`location-list ${mobileList ? "mobile-open" : ""}`}>
          <div className="list-heading">
            <span>FIELD SITES · 06</span>
            <button className="list-close" onClick={() => setMobileList(false)}>Close</button>
          </div>
          {locations.map((location) => (
            <button key={location.id} onClick={() => openLocation(location.id)}>
              <span className="list-index">{String(locations.indexOf(location) + 1).padStart(2, "0")}</span>
              <span>
                <strong>{location.shortName}</strong>
                <small>{location.period} · {location.level}</small>
              </span>
              <span className={`list-risk ${riskClass(location.risk)}`}>{location.risk}</span>
            </button>
          ))}
        </aside>

        <button className="mobile-sites-button" onClick={() => setMobileList(true)}>
          Explore 6 field sites <span>↑</span>
        </button>

        <div className="map-controls">
          <label className="route-toggle">
            <input type="checkbox" checked={showLondon} onChange={(event) => setShowLondon(event.target.checked)} />
            <span className="toggle-track"><span /></span>
            From London routes
          </label>
          <div className="legend">
            <span><i className="legend-site" /> Field site</span>
            <span><i className="legend-future" /> In research</span>
            <span><i className="legend-rail" /> Rail route</span>
          </div>
          <small>Map data © OpenStreetMap contributors</small>
        </div>

        {comingSoon && (
          <div className="coming-toast" role="status">
            <span>IN RESEARCH</span>
            <strong>{comingSoon}</strong>
            <p>{upcoming.find((place) => place.name === comingSoon)?.note}</p>
            <button onClick={() => setComingSoon(null)}>Dismiss</button>
          </div>
        )}
      </section>

      {selected && <LocationDetail location={selected} onBack={() => setSelectedId(null)} />}

      {modal && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setModal(null)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => setModal(null)} aria-label="Close">×</button>
            {modal === "about" ? (
              <>
                <p className="eyebrow">About this field map</p>
                <h2 id="modal-title">A route planner, not a promise.</h2>
                <p>This map turns scattered fossil guides into six practical journeys from London. Each field sheet combines the train, last-mile walk, approximate collecting zone, likely finds and the rules that matter on the day.</p>
                <div className="modal-note"><strong>Coordinates stay approximate.</strong> The goal is to guide safe access—not publish sensitive or rare specimen locations.</div>
                <p className="fine-print">Travel, tide and access conditions change. Re-check the linked operator, tide table and local guidance before every trip.</p>
              </>
            ) : (
              <>
                <p className="eyebrow danger">Before every trip</p>
                <h2 id="modal-title">The tide is a deadline.</h2>
                <div className="safety-grid">
                  <div><b>01</b><strong>Check twice</strong><p>Read the tide table and the weather forecast. Set a turnaround time.</p></div>
                  <div><b>02</b><strong>Look up</strong><p>Stay well clear of cliff bases, fresh falls, cracks and active slips.</p></div>
                  <div><b>03</b><strong>Leave early</strong><p>Do not wait for the water to reach you. Keep a known exit in sight.</p></div>
                  <div><b>04</b><strong>Collect lightly</strong><p>Prefer loose material, follow the local code and report important finds.</p></div>
                </div>
                <div className="modal-note warning"><strong>Emergency: call 999 and ask for Coastguard.</strong> Do not attempt a cliff or sea rescue yourself.</div>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

function LocationDetail({ location, onBack }: { location: Location; onBack: () => void }) {
  return (
    <section className="detail-view">
      <div className="detail-safety">
        <span className={`risk-pill ${riskClass(location.risk)}`}>{location.risk} RISK</span>
        <p>{location.safetyLead}</p>
      </div>

      <div className="field-map">
        <div className="field-water"><span>LOW WATER</span></div>
        <div className="field-land" />
        <div className="cliff-line" />
        <div className="collecting-zone">
          <span>APPROX. COLLECTING AREA</span>
        </div>
        <div className="hazard-zone"><span>HAZARD</span></div>
        <div className="rail-track"><span>RAIL</span></div>
        <div className="walk-route route-one" />
        <div className="walk-route route-two" />
        <div className="exit-route" />
        <div className="map-node station-node"><i>◆</i><strong>{location.station}</strong><small>nearest station</small></div>
        <div className="map-node access-node"><i>●</i><strong>Beach / field access</strong><small>recommended start</small></div>
        <div className="map-node escape-node"><i>↗</i><strong>Exit point</strong><small>{location.exit.split(";")[0]}</small></div>
        <div className="map-amenity café">Café</div>
        <div className="map-amenity toilets">WC</div>
        <div className="route-note"><span>ON FOOT</span><strong>{location.walk}</strong></div>
        <div className="field-map-title">
          <span>ACTION MAP · COORDINATES APPROXIMATE</span>
          <strong>{location.shortName.toUpperCase()}</strong>
        </div>
        <div className="field-legend">
          <span><i className="key-walk" /> walking route</span>
          <span><i className="key-zone" /> collecting area</span>
          <span><i className="key-hazard" /> hazard</span>
        </div>
        <small className="osm-credit">Map data © OpenStreetMap contributors</small>
      </div>

      <aside className="info-panel">
        <button className="back-button" onClick={onBack}><span>←</span> All UK sites</button>
        <div className="place-heading" style={{ "--place-accent": location.accent } as React.CSSProperties}>
          <div className="place-number">{String(locations.indexOf(location) + 1).padStart(2, "0")}</div>
          <div>
            <p>{location.region}</p>
            <h2>{location.name}</h2>
            <div className="place-tags"><span>{location.period}</span><span>{location.type}</span><span>{location.level}</span></div>
          </div>
        </div>

        <nav className="section-nav" aria-label="Location details">
          <a href="#get-there">Route</a>
          <a href="#finds">Finds</a>
          <a href="#equipment">Kit</a>
          <a href="#rules">Rules</a>
        </nav>

        <div className="panel-content">
          <section className="info-section route-section" id="get-there">
            <SectionTitle number="01" title="How to get there" />
            <div className="journey-time"><span>Typical total</span><strong>{location.duration}</strong></div>
            <div className="journey-steps">
              <JourneyStep label="LONDON" value={location.departure} detail="recommended departure" />
              <JourneyStep label="TRAIN" value={location.station} detail="check same-day service" />
              <JourneyStep label="LOCAL" value={location.local} detail={location.walk} />
            </div>
            <div className="action-row">
              <a className="primary-action" href={location.railLink} target="_blank" rel="noreferrer">Plan on National Rail <span>↗</span></a>
              <a className="secondary-action" href={location.mapsLink} target="_blank" rel="noreferrer">Open route in maps</a>
            </div>
          </section>

          <section className="info-section" id="route">
            <SectionTitle number="02" title="Recommended route" />
            <ol className="route-list">
              {location.route.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}
            </ol>
            <div className="route-facts">
              <p><span>TERRAIN</span>{location.terrain}</p>
              <p><span>EXIT</span>{location.exit}</p>
            </div>
          </section>

          <section className="info-section" id="finds">
            <SectionTitle number="03" title="What you may find" />
            <div className="finds-grid">
              {location.finds.map((find) => (
                <article key={find.name}>
                  <span className="find-glyph">{find.glyph}</span>
                  <div><h3>{find.name}</h3><p className="find-zh">{find.zh}</p></div>
                  <span className="rarity">{find.rarity}</span>
                  <p>{find.tip}</p>
                  <small>TYPICAL · {find.size}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="info-section" id="time">
            <SectionTitle number="04" title="Best time to visit" />
            <div className="time-hero"><span>RECOMMENDED WINDOW</span><strong>{location.tideWindow}</strong></div>
            <div className="time-grid">
              <p><span>SEASON</span>{location.season}</p>
              <p><span>CONDITIONS</span>{location.conditions}</p>
            </div>
            {location.tideLink ? (
              <a className="tide-action" href={location.tideLink} target="_blank" rel="noreferrer">Check current tide table <span>↗</span></a>
            ) : <div className="not-applicable">Tide not applicable at this inland site</div>}
            <p className="caveat">Always check current tide, weather and access conditions. This map does not provide live safety advice.</p>
          </section>

          <section className="info-section" id="equipment">
            <SectionTitle number="05" title="Equipment" />
            <KitList title="BRING" symbol="✓" items={location.required} />
            <KitList title="USEFUL" symbol="+" items={location.useful} />
            <KitList title="AVOID" symbol="×" items={location.avoid} danger />
          </section>

          <section className="info-section safety-section" id="safety">
            <SectionTitle number="06" title="Safety" />
            <div className={`large-risk ${riskClass(location.risk)}`}><span>FIELD RISK</span><strong>{location.risk}</strong></div>
            <ul className="hazard-list">{location.hazards.map((hazard) => <li key={hazard}><span>!</span>{hazard}</li>)}</ul>
            <div className="coastguard-note">In a coastal emergency, call <strong>999</strong> and ask for <strong>Coastguard</strong>.</div>
          </section>

          <section className="info-section rules-section" id="rules">
            <SectionTitle number="07" title="Environment & collecting rules" />
            <div className="sssi-card"><span>STATUS</span><strong>{location.sssi}</strong><p>Rules are site-specific. Check current designation and access notices.</p></div>
            <ul>{location.rules.map((rule) => <li key={rule}><span>→</span>{rule}</li>)}</ul>
            <div className="source-block">
              <div><span>SOURCE</span><a href={location.sourceLink} target="_blank" rel="noreferrer">{location.source} ↗</a></div>
              <div><span>LAST REVIEWED</span><strong>{location.verified}</strong></div>
              <p>Location precision: approximate · Guidance may change</p>
            </div>
          </section>
        </div>
      </aside>
    </section>
  );
}

function SectionTitle({ number, title }: { number: string; title: string }) {
  return <div className="section-title"><span>{number}</span><h2>{title}</h2></div>;
}

function JourneyStep({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="journey-step"><span className="journey-dot" /><div><small>{label}</small><strong>{value}</strong><p>{detail}</p></div></div>;
}

function KitList({ title, symbol, items, danger = false }: { title: string; symbol: string; items: string[]; danger?: boolean }) {
  return <div className={`kit-group ${danger ? "danger" : ""}`}><span className="kit-title">{title}</span><div>{items.map((item) => <span key={item}><i>{symbol}</i>{item}</span>)}</div></div>;
}
