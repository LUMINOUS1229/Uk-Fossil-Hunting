"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Risk = "LOW" | "MODERATE" | "HIGH";
type Language = "en" | "zh";
type IntroPhase = "loading" | "reveal" | "done";

type Find = {
  glyph: string;
  category: string;
  name: string;
  zh: string;
  rarity: string;
  size: string;
  tip: string;
};

type GeologyUnit = {
  name: string;
  age: string;
  environment: string;
  description: string;
  fossils: string;
};

type GeologyProfile = {
  intro: string;
  units: GeologyUnit[];
  beds: string[];
  fieldNote: string;
  sourceLabel: string;
  sourceLink: string;
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
  findRating: number;
  accessRating: number;
  familyRating: number;
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
  geology?: Record<Language, GeologyProfile>;
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
    level: "Easy · Beginner welcome",
    findRating: 5,
    accessRating: 3,
    familyRating: 3,
    mapX: 86.2,
    mapY: 87.7,
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
    geology: {
      en: {
        intro: "Folkestone exposes a compact Early Cretaceous story: shallow green sand below, fossil-rich blue marine clay in the middle, and grey chalk above. Most loose foreshore finds come from the Gault Clay.",
        units: [
          {
            name: "Folkestone Sand Formation",
            age: "Late Aptian–Early Albian · c. 115 Ma",
            environment: "Shallow inshore sea",
            description: "Medium to coarse, glauconite-rich green sand and soft sandstone forming the lower part of the succession.",
            fossils: "Fossils are uncommon; look for echinoids, oysters, gastropods and ammonites.",
          },
          {
            name: "Gault Clay Formation",
            age: "Albian · c. 100 Ma",
            environment: "Calm, relatively deep sea",
            description: "Stiff blue clay visible around Copt Point. Weathering and waves release most of Folkestone's collectible foreshore fossils.",
            fossils: "Bivalves, ammonites, belemnites and crinoids are common; crabs, fish and shark remains are less frequent; marine reptiles are rare.",
          },
          {
            name: "Lower Chalk",
            age: "Cenomanian",
            environment: "Moderately deep sea",
            description: "Grey chalk caps the Gault Clay and continues west toward Samphire Hoe.",
            fossils: "Marine invertebrates are common; fish and reptile remains are rare.",
          },
        ],
        beds: [
          "Mammillatum beds · Early Albian",
          "Beds I–VII · Middle Albian · Lower Gault",
          "Beds VIII–XIII · Late Albian · Upper Gault",
        ],
        fieldNote: "Collect only loose, wave-washed material. Do not dig into the Gault cliff or bedrock: Folkestone Warren is an SSSI. If provenance matters, record the bed number and exact loose-find context.",
        sourceLabel: "Folkestone Fossils · The Geology",
        sourceLink: "https://www.folkestonefossils.co.uk/the-geology",
      },
      zh: {
        intro: "Folkestone 的海岸剖面浓缩了早白垩世的一段环境变化：下部是浅海绿砂，中部是富含化石的蓝色海相黏土，上部则被灰色白垩层覆盖。潮间带的大多数松散化石来自 Gault Clay。",
        units: [
          {
            name: "Folkestone Sand Formation · 福克斯通砂层",
            age: "晚阿普第期–早阿尔布期 · 约 1.15 亿年前",
            environment: "近岸浅海",
            description: "由富含海绿石的中粗粒绿砂和松软砂岩组成，位于剖面的下部。",
            fossils: "化石较少，可留意海胆、牡蛎、腹足类和菊石。",
          },
          {
            name: "Gault Clay Formation · 高尔特黏土层",
            age: "阿尔布期 · 约 1 亿年前",
            environment: "平静、相对较深的海洋",
            description: "Copt Point 一带可见的坚硬蓝色黏土。风化和海浪会释放 Folkestone 潮间带中大多数可采集化石。",
            fossils: "双壳类、菊石、箭石和海百合较常见；螃蟹、鱼类和鲨鱼遗骸较少；海生爬行动物非常罕见。",
          },
          {
            name: "Lower Chalk · 下部白垩层",
            age: "森诺曼期",
            environment: "中等深度海洋",
            description: "灰色白垩层覆盖在 Gault Clay 上方，并向西延伸至 Samphire Hoe。",
            fossils: "海生无脊椎动物常见，鱼类和爬行动物遗骸罕见。",
          },
        ],
        beds: [
          "Mammillatum 层 · 早阿尔布期",
          "第 I–VII 层 · 中阿尔布期 · 下部 Gault",
          "第 VIII–XIII 层 · 晚阿尔布期 · 上部 Gault",
        ],
        fieldNote: "只采集海浪冲刷出的松散材料。Folkestone Warren 属 SSSI，不要挖掘 Gault 悬崖或敲击基岩。若标本需要科学产地信息，请记录层位编号与松散发现环境。",
        sourceLabel: "Folkestone Fossils · 地质学资料",
        sourceLink: "https://www.folkestonefossils.co.uk/the-geology",
      },
    },
    finds: [
      { glyph: "◎", category: "Ammonites & Heteromorphs", name: "Ammonite", zh: "菊石", rarity: "Common", size: "2–15 cm", tip: "Look for ribbed coils or pearly shell." },
      { glyph: "│", category: "Other Cephalopods", name: "Belemnite", zh: "箭石", rarity: "Common", size: "2–8 cm", tip: "Bullet-shaped guards in dark clay." },
      { glyph: "✣", category: "Echinoderms", name: "Echinoid", zh: "海胆", rarity: "Occasional", size: "2–6 cm", tip: "Five-fold petal pattern on the test." },
      { glyph: "⌁", category: "Crabs", name: "Crab", zh: "蟹", rarity: "Uncommon", size: "1–8 cm", tip: "Nodular carapace inside clay concretions." },
      { glyph: "◒", category: "Bivalves & Brachiopods", name: "Bivalve", zh: "双壳类", rarity: "Common", size: "1–8 cm", tip: "Fine ribs and paired shell symmetry in blue clay." },
      { glyph: "✣", category: "Echinoderms", name: "Crinoid ossicle", zh: "海百合茎节", rarity: "Common", size: "2–15 mm", tip: "Tiny discs or star-centred stem segments." },
      { glyph: "◉", category: "Other Cephalopods", name: "Nautiloid", zh: "鹦鹉螺类", rarity: "Rare", size: "1–5 cm", tip: "A smoother, more robust coil than most ammonites." },
      { glyph: "▲", category: "Shark Teeth", name: "Shark or fish remain", zh: "鲨鱼或鱼类遗骸", rarity: "Rare", size: "3–30 mm", tip: "Check for glossy enamel teeth, scales and vertebrae." },
      { glyph: "◇", category: "Reptile", name: "Marine reptile fragment", zh: "海生爬行动物碎片", rarity: "Very rare", size: "Varies", tip: "Record the context and ask a museum before preparing it." },
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
    accent: "#36c7d7",
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
    findRating: 5,
    accessRating: 4,
    familyRating: 4,
    mapX: 85.8,
    mapY: 82.8,
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
      { glyph: "▲", category: "Shark Teeth", name: "Shark tooth", zh: "鲨鱼牙", rarity: "Common", size: "3–35 mm", tip: "Dark enamel points against pale shingle." },
      { glyph: "▰", category: "Fish", name: "Ray plate", zh: "鳐鱼齿板", rarity: "Common", size: "2–20 mm", tip: "Flat ridged crushing surfaces." },
      { glyph: "◈", category: "Fish", name: "Fish remain", zh: "鱼类遗骸", rarity: "Occasional", size: "2–30 mm", tip: "Glossy teeth, spines and vertebrae." },
      { glyph: "▱", category: "Reptile", name: "Turtle fragment", zh: "龟甲碎片", rarity: "Rare", size: "1–5 cm", tip: "Fine pitted texture, unlike flint." },
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
    accent: "#68ded2",
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
    findRating: 5,
    accessRating: 3,
    familyRating: 4,
    mapX: 87,
    mapY: 76.5,
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
      { glyph: "▲", category: "Shark Teeth", name: "Shark tooth", zh: "鲨鱼牙", rarity: "Occasional", size: "5–45 mm", tip: "Blue-black enamel among pyrite and wood." },
      { glyph: "⌇", category: "Plant Fossils", name: "Fossil wood", zh: "化石木", rarity: "Common", size: "1–20 cm", tip: "Grain-like texture; often pyritised." },
      { glyph: "◒", category: "Bivalves & Brachiopods", name: "Red Crag shell", zh: "红砂层贝类", rarity: "Common", size: "1–8 cm", tip: "Fragile orange-brown shells in loose sand." },
      { glyph: "✦", category: "Vertebrates", name: "Bird bone", zh: "鸟类骨骼", rarity: "Very rare", size: "1–6 cm", tip: "Thin-walled; report rather than prepare." },
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
    accent: "#52b9e0",
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
    findRating: 5,
    accessRating: 2,
    familyRating: 1,
    mapX: 64.4,
    mapY: 81.8,
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
      { glyph: "│", category: "Other Cephalopods", name: "Belemnite", zh: "箭石", rarity: "Common", size: "1–8 cm", tip: "Smooth bullet-shaped calcite guards." },
      { glyph: "◎", category: "Ammonites & Heteromorphs", name: "Ammonite", zh: "菊石", rarity: "Common", size: "1–8 cm", tip: "Small pyritised coils in washed sediment." },
      { glyph: "▲", category: "Shark Teeth", name: "Fish & shark tooth", zh: "鱼与鲨鱼牙", rarity: "Occasional", size: "1–12 mm", tip: "Use a fine sieve; most are tiny." },
      { glyph: "◒", category: "Bivalves & Brachiopods", name: "Mollusc", zh: "软体动物", rarity: "Common", size: "2–40 mm", tip: "Delicate shells may retain original form." },
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
    accent: "#87d7ee",
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
    findRating: 5,
    accessRating: 5,
    familyRating: 5,
    mapX: 71.8,
    mapY: 89.8,
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
      { glyph: "▲", category: "Shark Teeth", name: "Shark tooth", zh: "鲨鱼牙", rarity: "Common", size: "3–35 mm", tip: "Black triangular enamel on wet sand." },
      { glyph: "▰", category: "Fish", name: "Ray tooth", zh: "鳐鱼牙", rarity: "Common", size: "3–20 mm", tip: "Low rectangular ridged plates." },
      { glyph: "◒", category: "Bivalves & Brachiopods", name: "Bivalve", zh: "双壳类", rarity: "Common", size: "1–10 cm", tip: "Fine shell ribs; lift delicate examples gently." },
      { glyph: "●", category: "Microfossils", name: "Nummulite", zh: "货币虫", rarity: "Very common", size: "5–25 mm", tip: "Coin-shaped single-celled fossils." },
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
    accent: "#2dc4bd",
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
    findRating: 5,
    accessRating: 4,
    familyRating: 4,
    mapX: 57.4,
    mapY: 90.2,
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
      { glyph: "◎", category: "Ammonites & Heteromorphs", name: "Ammonite", zh: "菊石", rarity: "Common", size: "1–30 cm", tip: "Ribbed coils inside split nodules or shingle." },
      { glyph: "│", category: "Other Cephalopods", name: "Belemnite", zh: "箭石", rarity: "Common", size: "2–10 cm", tip: "Dark bullet-like guards among grey shale." },
      { glyph: "⌁", category: "Trace Fossils", name: "Coprolite", zh: "粪化石", rarity: "Occasional", size: "1–8 cm", tip: "Irregular dense forms, often with inclusions." },
      { glyph: "◇", category: "Vertebrates", name: "Vertebrate bone", zh: "脊椎动物骨骼", rarity: "Rare", size: "Varies", tip: "Porous structure; record important finds." },
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
    accent: "#64b9dd",
  },
  {
    id: "weymouth",
    name: "Weymouth / Bowleaze Cove",
    shortName: "Weymouth",
    region: "Dorset · Jurassic Coast",
    period: "Late Jurassic",
    age: "c. 160–155 million years",
    type: "Cliff & rocky foreshore",
    risk: "HIGH",
    level: "Confident beginners · adults",
    findRating: 4,
    accessRating: 3,
    familyRating: 2,
    mapX: 62.5,
    mapY: 89.4,
    departure: "London Waterloo",
    station: "Weymouth",
    local: "Local bus or taxi to Bowleaze Cove",
    walk: "5–10 min from the cove stop; 40–50 min from Weymouth station",
    duration: "3 hr 15–4 hr",
    railLink: "https://www.nationalrail.co.uk/destinations/trains-from-london-to-weymouth/",
    mapsLink: "https://www.google.com/maps/dir/Weymouth+Station/Bowleaze+Cove",
    tideLink: "https://www.tidetimes.org.uk/weymouth-tide-times",
    route: [
      "Reach Bowleaze Cove and check the tide and weather before entering the beach.",
      "Use the main beach access and walk east toward Ham Cliff only on a falling tide.",
      "Search loose shingle and weathered fallen Corallian blocks, keeping clear of cliffs and slips.",
      "Return the same way well before the tide rises; never rely on the steep Redcliff rope exit.",
    ],
    terrain: "Shingle · boulders · soft mud · active landslips",
    exit: "Bowleaze Cove main beach access; return the same way",
    tideWindow: "Start around 2 hours before low water",
    season: "Autumn–spring in settled weather",
    conditions: "Best after safe beach scour; wait for cliffs and slips to settle",
    geology: {
      en: {
        intro: "Bowleaze Cove crosses Upper Jurassic Oxford Clay and younger Corallian rocks. The change from marine mud to shallower, higher-energy sand and limestone is written into the fossils and abundant burrows.",
        units: [
          {
            name: "Oxford Clay Formation · Weymouth Member",
            age: "Late Oxfordian · around 160 million years",
            environment: "Warm shallow marine mud",
            description: "Organic-rich grey clay exposed around Redcliff and Furzy Cliff, locally folded, faulted and affected by major landslides.",
            fossils: "Ammonites, belemnites, Gryphaea and occasional vertebrate remains",
          },
          {
            name: "Corallian Group",
            age: "Late Oxfordian · around 158–155 million years",
            environment: "Shallow, higher-energy sea",
            description: "Sandstone and limestone units including the Nothe and Preston Grits; fallen blocks commonly preserve conspicuous burrow systems.",
            fossils: "Trace fossils, bivalves, gastropods and ammonite fragments",
          },
        ],
        beds: ["Oxford Clay mudstone", "Nothe Grit", "Preston Grit", "Corallian limestone and sandstone"],
        fieldNote: "Loose blocks are the safest place to read the succession. Large in-situ trace-fossil slabs should be photographed and left where they are.",
        sourceLabel: "Southampton Wessex Coast Geology · UK Fossils",
        sourceLink: "https://wessexcoastgeology.soton.ac.uk/Bowleaze-Redcliff.htm",
      },
      zh: {
        intro: "Bowleaze Cove 横跨上侏罗统牛津黏土与较年轻的 Corallian 岩层。从海相软泥到浅水、高能砂岩与石灰岩的环境变化，记录在化石和密集生痕中。",
        units: [
          {
            name: "牛津黏土组 · Weymouth 段",
            age: "晚牛津期 · 约 1.60 亿年前",
            environment: "温暖浅海软泥",
            description: "Redcliff 与 Furzy Cliff 一带出露富有机质灰色黏土，局部受褶皱、断层和大型滑坡影响。",
            fossils: "菊石、箭石、Gryphaea 牡蛎及偶见脊椎动物遗骸",
          },
          {
            name: "Corallian 群",
            age: "晚牛津期 · 约 1.58–1.55 亿年前",
            environment: "浅水、高能海洋",
            description: "包含 Nothe Grit 与 Preston Grit 等砂岩和石灰岩；坠落岩块上常保存醒目的洞穴生痕。",
            fossils: "遗迹化石、双壳类、腹足类和菊石碎片",
          },
        ],
        beds: ["牛津黏土泥岩", "Nothe Grit", "Preston Grit", "Corallian 石灰岩与砂岩"],
        fieldNote: "观察松散岩块最安全。大型原位遗迹化石板应拍照记录并留在原处。",
        sourceLabel: "Southampton Wessex Coast Geology · UK Fossils",
        sourceLink: "https://wessexcoastgeology.soton.ac.uk/Bowleaze-Redcliff.htm",
      },
    },
    finds: [
      { glyph: "◒", category: "Bivalves & Brachiopods", name: "Gryphaea oyster", zh: "魔鬼趾牡蛎", rarity: "Very common", size: "3–12 cm", tip: "Thick, curved oyster shells weather from the clay." },
      { glyph: "◎", category: "Ammonites & Heteromorphs", name: "Ammonite", zh: "菊石", rarity: "Common", size: "2–20 cm", tip: "Look for ribbed coils or fragments in clay and concretions." },
      { glyph: "⌁", category: "Trace Fossils", name: "Burrow trace", zh: "洞穴遗迹化石", rarity: "Common", size: "5–60 cm", tip: "Branching tubes stand out on fallen sandstone blocks." },
      { glyph: "│", category: "Other Cephalopods", name: "Belemnite", zh: "箭石", rarity: "Occasional", size: "2–10 cm", tip: "Smooth bullet-shaped guards occur in loose clay." },
      { glyph: "◉", category: "Gastropods", name: "Gastropod", zh: "腹足类", rarity: "Occasional", size: "1–8 cm", tip: "Spiralled shells occur in weathered Corallian blocks." },
      { glyph: "◇", category: "Reptile", name: "Marine reptile remain", zh: "海生爬行动物遗骸", rarity: "Very rare", size: "Varies", tip: "Record the exact context and report bone or teeth before preparation." },
    ],
    required: ["Robust boots", "Tide plan", "Gloves", "Water", "Eye protection"],
    useful: ["Hand lens", "Sample boxes", "Small soft brush"],
    avoid: ["Climbing cliffs", "Using the Redcliff rope route", "Heavy hammering near slips"],
    hazards: ["Incoming tide can cut off the route", "Irregular boulders", "Quicksand-like soft mud", "Active landslides and rock movement"],
    safetyLead: "Return by Bowleaze Cove before the tide rises. Do not use the steep rope exit, and keep well clear of cliffs, fresh falls and moving landslips.",
    sssi: "South Dorset Coast SSSI · Jurassic Coast World Heritage Site",
    rules: ["Collect loose material only; do not excavate the cliff.", "Do not remove or hammer large in-situ trace-fossil blocks.", "Keep clear of active slips and never climb the cliff.", "Record and report unusual vertebrate material."],
    source: "UK Fossils · Southampton Wessex Coast Geology",
    sourceLink: "https://ukfossils.co.uk/bowleaze-cove/",
    verified: "11 Aug 2026",
    accent: "#f2b35f",
  },
  {
    id: "peterborough",
    name: "Peterborough / King’s Dyke",
    shortName: "Peterborough",
    region: "Cambridgeshire · The Fens",
    period: "Middle Jurassic",
    age: "c. 165–163 million years",
    type: "Managed fossil area",
    risk: "MODERATE",
    level: "Permit required · beginner friendly",
    findRating: 5,
    accessRating: 2,
    familyRating: 4,
    mapX: 76.5,
    mapY: 68.2,
    departure: "London King’s Cross",
    station: "Peterborough",
    local: "Train or taxi toward Whittlesey, then taxi to King’s Dyke",
    walk: "Short walk from the locked reserve entrance",
    duration: "1 hr 35–2 hr 10",
    railLink: "https://www.nationalrail.co.uk/destinations/trains-from-london-to-peterborough/",
    mapsLink: "https://www.google.com/maps/dir/Peterborough+Station/Kings+Dyke+Nature+Reserve",
    route: [
      "Apply for free reserve membership at least one week before travelling and wait for the gate code.",
      "Travel from Peterborough toward Whittlesey and reach 222 Peterborough Road, PE7 1PD.",
      "Use only the designated fossil-hunting area, which is replenished with Oxford Clay.",
      "Stay on reserve paths, close the locked gate and leave the collecting area tidy.",
    ],
    terrain: "Managed paths · clay surface · deep mud after rain",
    exit: "Locked membership gate; keep the access code available",
    tideWindow: "Tide not applicable",
    season: "All year with a permit; avoid after heavy rain",
    conditions: "Clay becomes very muddy; check the latest reserve notice",
    geology: {
      en: {
        intro: "King’s Dyke gives controlled access to fossil-rich Oxford Clay excavated near Whittlesey. These Callovian marine mudstones preserve the animals of a warm Jurassic sea, from tiny shells to giant pliosaurs.",
        units: [
          {
            name: "Oxford Clay Formation · Peterborough Member",
            age: "Callovian · around 165–163 million years",
            environment: "Offshore marine mud",
            description: "Brown-grey, organic-rich mudstone with shell beds and locally crushed ammonites, brought into a purpose-built collecting area.",
            fossils: "Ammonites, belemnites, bivalves, fish, sharks, marine reptiles and fossil wood",
          },
        ],
        beds: ["Organic-rich mudstone", "Gryphaea shell beds", "Calcareous concretions"],
        fieldNote: "The fossil area is regularly replenished, so specimens are no longer in their exact quarry layer. Label finds as King’s Dyke fossil area rather than inventing bed-level provenance.",
        sourceLabel: "British Geological Survey · King’s Dyke Nature Reserve",
        sourceLink: "https://webapps.bgs.ac.uk/lexicon/lexicon.cfm?pub=PET",
      },
      zh: {
        intro: "King’s Dyke 提供受控的牛津黏土化石采集区，材料来自 Whittlesey 附近。卡洛夫期海相泥岩保存了温暖侏罗纪海洋中的动物，从微小贝类到巨型上龙。",
        units: [
          {
            name: "牛津黏土组 · Peterborough 段",
            age: "卡洛夫期 · 约 1.65–1.63 亿年前",
            environment: "离岸海相软泥",
            description: "富有机质的棕灰色泥岩，夹贝壳层和常被压扁的菊石；材料会运入专门设置的采集区。",
            fossils: "菊石、箭石、双壳类、鱼类、鲨鱼、海生爬行动物和化石木",
          },
        ],
        beds: ["富有机质泥岩", "Gryphaea 贝壳层", "钙质结核"],
        fieldNote: "采集区会定期补充材料，因此标本已不在原始采石层位。标签应写 King’s Dyke fossil area，不要推测具体层位。",
        sourceLabel: "英国地质调查局 · King’s Dyke Nature Reserve",
        sourceLink: "https://webapps.bgs.ac.uk/lexicon/lexicon.cfm?pub=PET",
      },
    },
    finds: [
      { glyph: "◎", category: "Ammonites & Heteromorphs", name: "Ammonite", zh: "菊石", rarity: "Common", size: "1–12 cm", tip: "Ribbed or smooth coils are abundant in the clay." },
      { glyph: "│", category: "Other Cephalopods", name: "Belemnite", zh: "箭石", rarity: "Common", size: "2–12 cm", tip: "Dark bullet-like guards are robust and easy to recognise." },
      { glyph: "◒", category: "Bivalves & Brachiopods", name: "Bivalve shell", zh: "双壳类", rarity: "Common", size: "1–8 cm", tip: "Shells and moulds may be compressed in the soft clay." },
      { glyph: "▥", category: "Plant Fossils", name: "Fossil wood", zh: "化石木", rarity: "Common", size: "1–20 cm", tip: "Look for grain-like structure rather than simple dark clay." },
      { glyph: "▲", category: "Shark Teeth", name: "Shark or fish remain", zh: "鲨鱼或鱼类遗骸", rarity: "Rare", size: "3–40 mm", tip: "Check small dark pieces for glossy enamel, scales or vertebrae." },
      { glyph: "◇", category: "Reptile", name: "Marine reptile fragment", zh: "海生爬行动物碎片", rarity: "Rare", size: "Varies", tip: "Ichthyosaur, plesiosaur or crocodile material should be recorded and reported." },
      { glyph: "✦", category: "Crabs", name: "Crustacean", zh: "甲壳类", rarity: "Uncommon", size: "1–6 cm", tip: "Small carapace or claw fragments may sit inside concretions." },
    ],
    required: ["Confirmed permit and gate code", "Wellington boots", "Gloves", "Sample boxes", "Water"],
    useful: ["Small trowel", "Hand lens", "Kneeling mat"],
    avoid: ["Bringing dogs", "Selling collected fossils", "Entering the active quarry", "Visiting without a confirmed permit"],
    hazards: ["Locked access", "Very sticky or deep mud", "Uneven clay surface", "Active quarry boundary"],
    safetyLead: "Access is for current members only. Apply at least one week ahead, wait for confirmation and remain inside the designated fossil area.",
    sssi: "King’s Dyke Nature Reserve · members-only access",
    rules: ["Carry a current permit and use the issued gate code.", "Casual collecting is free, but selling fossils from the reserve is prohibited.", "No dogs; keep out of the active quarry.", "Record and report marine reptile or other significant finds."],
    source: "King’s Dyke Nature Reserve · Peterborough Museum",
    sourceLink: "https://www.kingsdykenaturereserve.com/fossils/",
    verified: "11 Aug 2026",
    accent: "#9fd1a8",
  },
];

type LocationTranslation = Pick<Location,
  "region" | "period" | "type" | "level" | "local" | "walk" | "duration" |
  "route" | "terrain" | "exit" | "tideWindow" | "season" | "conditions" |
  "required" | "useful" | "avoid" | "hazards" | "safetyLead" | "sssi" |
  "rules" | "source"
> & { findTips: string[] };

const locationZh: Record<string, LocationTranslation> = {
  folkestone: {
    region: "肯特郡 · 英格兰东南海岸",
    period: "早白垩世",
    type: "悬崖与潮间带",
    level: "简单 · 欢迎新手",
    local: "当地出租车或开往 East Cliff 方向的市内巴士",
    walk: "步行 25–35 分钟至 Warren 入口",
    duration: "1小时45分–2小时15分",
    route: [
      "从 Folkestone Central 出站，向港口一侧前行。",
      "找到有标识的 Warren 步道，并使用正式的海滩入口。",
      "退潮时在 Copt Point 以东的松散 Gault Clay 与砾石中搜索。",
      "潮水回涨、巨石区通道变窄前原路返回。",
    ],
    terrain: "陡坡 · 湿滑黏土 · 大型巨石",
    exit: "主要出口：Warren 入口台阶",
    tideWindow: "低潮前 2 小时抵达",
    season: "春至秋；冬季仅限天气稳定时",
    conditions: "安全的海滩冲刷后较佳；避开近期崖体坍塌",
    findTips: [
      "寻找带肋纹的螺旋或珍珠光泽外壳。",
      "深色黏土中的子弹状鞘。",
      "壳体上可见五瓣花纹。",
      "黏土结核中呈瘤状的甲壳。",
      "蓝色黏土中可见细肋和成对的壳体对称。",
      "寻找微小圆片，中心有时呈星形。",
      "外壳通常比菊石更平滑、更厚实。",
      "留意有光泽的牙釉质、鳞片和椎骨。",
      "记录发现环境，处理前先咨询博物馆。",
    ],
    required: ["防滑结实靴", "手套", "护目镜", "饮用水", "包裹纸巾"],
    useful: ["小型地质镐", "标本盒", "护膝"],
    avoid: ["在悬崖附近使用重锤", "停留在新鲜崩塌物下方"],
    hazards: ["涨潮可能限制出口", "不稳定悬崖与落石", "大型湿滑巨石", "脆弱化石需要立即包裹"],
    safetyLead: "不要在悬崖下逗留。潮间带湿滑且行进缓慢，返程时间应比地图估算留得更充裕。",
    sssi: "Folkestone Warren 特别科学价值地点",
    rules: ["只采集松散材料。", "不得敲击基岩或挖掘悬崖。", "远离新鲜滑坡和植被恢复区。", "发现异常脊椎动物材料时请向当地博物馆报告。"],
    source: "UK Fossils · Natural England 地点指南",
  },
  "herne-bay": {
    region: "肯特郡 · 英格兰北海岸",
    period: "古新世–始新世",
    type: "潮间带前滩",
    level: "适合耐心的新手",
    local: "当地巴士或出租车前往 Beltinge 的 Reculver Drive",
    walk: "从崖顶停车处步行 10 分钟；从车站步行 35 分钟",
    duration: "1小时50分–2小时20分",
    route: [
      "使用 Reculver Drive 下方的正式混凝土入口。",
      "向西往 Herne Bay，找到两侧防波堤之间的潮间带。",
      "极低潮时，在浅排水沟旁的卵石边界仔细搜索。",
      "一旦潮水开始回涨，立即离开低位前滩。",
    ],
    terrain: "混凝土步道 · 泥地 · 砾石 · 积水",
    exit: "沿岸有多处台阶；记住自己使用的入口",
    tideWindow: "极低潮（约 0.8 米或更低）；提前 1 小时抵达",
    season: "全年大潮时段",
    conditions: "微风和强退潮更有利于鱼类化石层出露",
    findTips: ["浅色砾石中寻找深色珐琅质尖端。", "扁平且带脊的碾压面。", "有光泽的小牙齿、棘和椎骨。", "表面细密凹点，与燧石不同。"],
    required: ["防水长靴", "保暖衣物", "小标本罐", "潮汐计划", "镊子"],
    useful: ["2 毫米筛网", "护膝", "手持放大镜"],
    avoid: ["使用地质锤", "涨潮时继续向外行走"],
    hazards: ["最佳化石层仅在极低潮时出露", "泥地与积水", "寒冷向岸风", "涨潮会迅速缩短返程窗口"],
    safetyLead: "采集窗口由潮位高度决定，而不仅是低潮时间。如果前滩没有出露，不要继续向外冒险。",
    sssi: "Herne Bay–Reculver 受保护海岸线",
    rules: ["只拾取少量松散表面标本。", "不得挖掘悬崖或破坏前滩地层。", "避免惊扰栖息和筑巢鸟类。", "罕见脊椎动物发现应交由博物馆记录。"],
    source: "UK Fossils 野外指南",
  },
  walton: {
    region: "埃塞克斯郡 · 北海海岸",
    period: "始新世与上新世",
    type: "悬崖与潮间带",
    level: "新手友好",
    local: "乘出租车前往 Naze Tower，或步行穿过小镇",
    walk: "步行 35–45 分钟至 Naze Tower 海滩台阶",
    duration: "2小时–2小时30分",
    route: [
      "从 Naze Tower 沿有标识的台阶下到海滩。",
      "沿开阔潮间带向北走，并把台阶始终作为返程出口。",
      "在富含黄铁矿的砾石和松散滑落的 Red Crag 材料中搜索。",
      "提前返回；高潮时海滩台阶无法使用。",
    ],
    terrain: "台阶 · 砾石 · 松软滑坡物",
    exit: "Naze Tower 台阶；高潮时无法通行",
    tideWindow: "退潮时前往；为返程预留 2 小时余量",
    season: "秋至春，在安全冲刷后前往",
    conditions: "风暴后可能丰富，但必须等待悬崖稳定",
    findTips: ["在黄铁矿和化石木之间寻找蓝黑色珐琅质。", "可见木纹，常被黄铁矿化。", "松散沙层中的脆弱橙褐色贝壳。", "薄壁骨骼；先报告，不要自行处理。"],
    required: ["结实靴", "潮汐计划", "饮用水", "硬质标本盒", "纸巾"],
    useful: ["护膝", "小铲", "手持放大镜"],
    avoid: ["攀爬悬崖", "挖掘 Red Crag 崖壁", "敲击基岩"],
    hazards: ["高潮时海滩出口被淹", "频繁滑坡与崖体坍塌", "松软滑坡物可能陷住鞋靴", "贝壳材料非常脆弱"],
    safetyLead: "海滩出口会在高潮时消失。始终让 Naze Tower 台阶保持可见，并在通道仍然宽阔时离开。",
    sssi: "The Naze 特别科学价值地点",
    rules: ["可以拾取松散、原位以外的化石。", "不得挖掘悬崖或敲击基岩。", "不要攀爬松软悬崖或滑坡体。", "罕见鸟类或脊椎动物材料应予以记录。"],
    source: "UK Fossils · The Naze 野外指南",
  },
  "wootton-bassett": {
    region: "威尔特郡 · 内陆",
    period: "晚侏罗世",
    type: "内陆溪流",
    level: "仅建议有经验的成人",
    local: "当地巴士或出租车前往 Royal Wootton Bassett",
    walk: "经运河纤道和公共步道步行 25–40 分钟",
    duration: "2小时–2小时40分",
    route: [
      "从镇南侧进入 Wilts & Berks Canal 纤道。",
      "沿有标识的公共步道前往溪流边缘。",
      "只在远离喷口、安全且浅的可通行水域湿筛。",
      "如水位上升、地面不稳或通行权不明确，立即折返。",
    ],
    terrain: "沼泽地 · 浅溪 · 粗糙纤道",
    exit: "沿运河纤道原路返回；切勿翻越围栏",
    tideWindow: "不受潮汐影响",
    season: "晚春至初秋较干燥的时段",
    conditions: "长时间降雨后或泥泉有活动迹象时不要前往",
    findTips: ["光滑的子弹状方解石鞘。", "冲洗沉积物中的小型黄铁矿化螺旋。", "使用细筛；多数牙齿非常小。", "精细贝壳有时保留原始形态。"],
    required: ["防水长靴", "手套", "饮用水", "OS 地图", "装入防水袋的手机"],
    useful: ["细筛", "小铲", "带盖水桶"],
    avoid: ["携带儿童", "进入围栏内泥泉", "翻越围栏", "强降雨后前往"],
    hazards: ["泥泉可能突然喷发", "地表下存在深软泥", "铁丝网与私人田地", "雨后溪流水深变化"],
    safetyLead: "切勿进入或靠近围栏内的泥泉喷口。通行条件和土地许可可能变化；留在公共步道上，有疑问就折返。",
    sssi: "Wootton Bassett Mud Spring 特别科学价值地点",
    rules: ["不得进入围栏内的泥泉区域。", "留在公共通行权范围内，不得翻越私人围栏。", "只从可进入的沉积物中取少量松散化石。", "出发前确认最新当地通行信息。"],
    source: "UK Fossils · Natural England 地点指定信息",
  },
  bracklesham: {
    region: "西萨塞克斯郡 · 英格兰南海岸",
    period: "中始新世",
    type: "沙质潮间带",
    level: "非常适合第一次体验",
    local: "当地巴士前往 Bracklesham / East Wittering",
    walk: "从海滨巴士站步行 5 分钟",
    duration: "2小时20分–3小时",
    route: [
      "从 Bracklesham Lane 尽头进入海滩。",
      "退潮时沿宽阔沙滩向东走。",
      "在湿沙和出露黏土斑块中寻找深色牙齿与贝壳。",
      "如果鞋靴开始陷入软黏土，立即离开。",
    ],
    terrain: "平坦沙地 · 浅水 · 偶有软黏土",
    exit: "海滨有多个出口；主出口靠近咖啡馆和洗手间",
    tideWindow: "退潮时；低潮前 1 小时最佳",
    season: "春季和初秋冲刷潮期",
    conditions: "海滩冲刷后较佳；平静天气适合家庭",
    findTips: ["湿沙上的黑色三角形珐琅质。", "低矮矩形、有脊的齿板。", "细密贝壳肋纹；轻拿脆弱标本。", "硬币状的大型单细胞化石。"],
    required: ["沙滩鞋或靴子", "潮汐计划", "饮用水", "小容器", "防晒或防风外层"],
    useful: ["长柄小铲", "筛网", "护膝"],
    avoid: ["使用地质锤", "深挖", "独自进入软黏土区"],
    hazards: ["软黏土可能陷住鞋靴", "涨潮", "风筝冲浪活动", "沙滩宽阔时风险相对较低"],
    safetyLead: "这里相对友好，但软黏土与涨潮叠加仍可能危险。带儿童时，让他们始终位于队伍靠近干沙的一侧。",
    sssi: "Bracklesham Bay 特别科学价值地点",
    rules: ["只采集松散的表面化石。", "不得敲击或破坏基岩。", "回填筛选或小铲留下的小坑。", "只取少量代表性标本，不要成袋带走重复品。"],
    source: "UK Fossils 野外指南",
  },
  charmouth: {
    region: "多塞特郡 · 侏罗纪海岸",
    period: "早侏罗世",
    type: "悬崖与砾石海滩",
    level: "谨慎的新手可前往",
    local: "乘 Jurassic Coaster 巴士或出租车前往 Charmouth",
    walk: "从村中心步行 5 分钟至 Heritage Centre",
    duration: "3小时–3小时45分",
    route: [
      "先到 Charmouth Heritage Coast Centre 获取当天建议。",
      "使用有标识的海滩入口，仅在潮汐允许时向西往 Black Ven。",
      "远离崖壁，在松散砾石和浪洗材料中搜索。",
      "海滩开始变窄前返回，并使用同一有标识入口。",
    ],
    terrain: "砾石 · 泥地 · 河口通行状况可能变化",
    exit: "Heritage Centre 海滩入口；不要依赖崖壁路线",
    tideWindow: "退潮时开始，约低潮前 2 小时",
    season: "秋至春，风暴过后且坡体稳定时",
    conditions: "新鲜冲刷物可能丰富；避开活动滑坡",
    findTips: ["裂开的结核或砾石中寻找带肋纹螺旋。", "灰色页岩中的深色子弹状鞘。", "不规则致密形态，有时含有夹杂物。", "多孔结构；重要发现请记录。"],
    required: ["结实靴", "潮汐计划", "防水外层", "包裹纸巾", "饮用水"],
    useful: ["护目镜", "小型地质锤", "标本盒"],
    avoid: ["挖掘悬崖", "停留在滑坡体下方", "使用超大地质锤"],
    hazards: ["大型崖体坍塌与泥石滑坡", "涨潮会切断部分海滩", "脚下砾石不稳定", "冬季天气变化迅速"],
    safetyLead: "最安全的搜索区域是海滩上的松散材料，而不是悬崖。前往 Black Ven 前，请先查看 Heritage Centre 当天的建议。",
    sssi: "West Dorset Coast 特别科学价值地点 · 化石采集守则区域",
    rules: ["可采集松散海滩化石；未经许可不得挖掘原位悬崖。", "遵守 West Dorset Fossil Collecting Code。", "具有科学价值的重要标本应在 Heritage Centre 登记。", "出售重要发现前，应先提供给英国认可博物馆。"],
    source: "Charmouth Heritage Coast Centre · 化石采集守则",
  },
  weymouth: {
    region: "多塞特郡 · 侏罗纪海岸",
    period: "晚侏罗世",
    type: "悬崖与岩石潮间带",
    level: "适合有信心的新手 · 建议成人",
    local: "乘当地巴士或出租车前往 Bowleaze Cove",
    walk: "从海湾车站步行 5–10 分钟；从 Weymouth 车站步行 40–50 分钟",
    duration: "3小时15分–4小时",
    route: [
      "抵达 Bowleaze Cove 后，进入海滩前先核对潮汐与天气。",
      "使用主海滩入口，仅在退潮时向东往 Ham Cliff 行进。",
      "在松散砾石和风化坠落的 Corallian 岩块中搜索，并远离崖壁和滑坡体。",
      "涨潮前留出充足时间原路返回；绝不能依赖 Redcliff 陡峭的绳索出口。",
    ],
    terrain: "砾石 · 巨石 · 软泥 · 活动滑坡",
    exit: "Bowleaze Cove 主海滩入口；必须原路返回",
    tideWindow: "约在低潮前 2 小时开始",
    season: "秋至春的稳定天气时段",
    conditions: "安全的海滩冲刷后较佳；等崖壁和滑坡稳定后再前往",
    findTips: [
      "厚实弯曲的牡蛎壳会从黏土中风化出来。",
      "在黏土与结核中寻找带肋纹的螺旋或碎片。",
      "坠落砂岩块上的分叉管状构造非常醒目。",
      "松散黏土中偶见光滑的子弹状鞘。",
      "风化 Corallian 岩块中可见螺旋壳体。",
      "处理前记录准确发现环境，并报告骨骼或牙齿。",
    ],
    required: ["结实防滑靴", "潮汐计划", "手套", "饮用水", "护目镜"],
    useful: ["手持放大镜", "标本盒", "小软刷"],
    avoid: ["攀爬悬崖", "使用 Redcliff 绳索路线", "在滑坡附近用重锤"],
    hazards: ["涨潮可能切断路线", "不规则巨石", "类似流沙的软泥", "活动滑坡与岩块移动"],
    safetyLead: "涨潮前从 Bowleaze Cove 原路返回。不要使用陡峭绳索出口，并远离崖壁、新鲜坍塌和移动中的滑坡。",
    sssi: "South Dorset Coast 特别科学价值地点 · 侏罗纪海岸世界遗产",
    rules: ["只采集松散材料，不得挖掘悬崖。", "不得移走或敲击大型原位遗迹化石岩块。", "远离活动滑坡，绝不攀爬崖壁。", "异常脊椎动物材料应记录并报告。"],
    source: "UK Fossils · Southampton Wessex Coast Geology",
  },
  peterborough: {
    region: "剑桥郡 · 芬地区",
    period: "中侏罗世",
    type: "管理型化石采集区",
    level: "需要许可 · 新手友好",
    local: "乘火车或出租车往 Whittlesey，再搭出租车前往 King’s Dyke",
    walk: "从上锁的保护区入口步行一小段",
    duration: "1小时35分–2小时10分",
    route: [
      "至少提前一周申请免费保护区会员，并等待收到大门密码。",
      "从 Peterborough 往 Whittlesey 行进，到达 222 Peterborough Road, PE7 1PD。",
      "只使用会定期补充牛津黏土的指定化石采集区。",
      "留在保护区路径内，关好上锁大门并保持采集区整洁。",
    ],
    terrain: "管理步道 · 黏土表面 · 雨后深泥",
    exit: "上锁的会员入口；随身保存门禁密码",
    tideWindow: "不受潮汐影响",
    season: "持许可全年开放；大雨后避免前往",
    conditions: "黏土会变得非常泥泞；出发前查看保护区最新通知",
    findTips: [
      "带肋或光滑的螺旋壳体在黏土中很常见。",
      "深色子弹状鞘体坚硬，容易辨认。",
      "壳体与铸模可能在软黏土中被压扁。",
      "寻找类似木纹的结构，不要把普通深色黏土误认成化石木。",
      "检查细小深色碎片上是否有光泽牙釉质、鳞片或椎骨结构。",
      "鱼龙、蛇颈龙或鳄类材料应记录并报告。",
      "小型背甲或螯碎片可能藏在结核内。",
    ],
    required: ["已确认的许可与门禁密码", "防水长靴", "手套", "标本盒", "饮用水"],
    useful: ["小铲", "手持放大镜", "跪垫"],
    avoid: ["携带犬只", "出售采集的化石", "进入活动采石场", "未确认许可就前往"],
    hazards: ["上锁入口", "非常黏或较深的泥地", "不平整黏土表面", "活动采石场边界"],
    safetyLead: "只允许当前会员进入。至少提前一周申请，等待确认，并始终留在指定化石采集区内。",
    sssi: "King’s Dyke Nature Reserve · 仅限会员进入",
    rules: ["携带有效许可并使用发放的门禁密码。", "休闲采集免费，但严禁出售保护区化石。", "不得带狗，不得进入活动采石场。", "海生爬行动物或其他重要发现应记录并报告。"],
    source: "King’s Dyke Nature Reserve · Peterborough Museum",
  },
};

const rarityZh: Record<string, string> = {
  "Very common": "非常常见",
  Common: "常见",
  Occasional: "偶见",
  Uncommon: "少见",
  Rare: "罕见",
  "Very rare": "非常罕见",
};

const fossilCategoryZh: Record<string, string> = {
  "Ammonites & Heteromorphs": "菊石与异形菊石",
  "Other Cephalopods": "其他头足类",
  Echinoderms: "棘皮动物",
  Crabs: "螃蟹",
  "Bivalves & Brachiopods": "双壳类与腕足类",
  "Shark Teeth": "鲨鱼牙",
  Fish: "鱼类",
  Reptile: "爬行动物",
  Microfossils: "微化石",
  "Trace Fossils": "遗迹化石",
  "Plant Fossils": "植物化石",
  Gastropods: "腹足类",
  Vertebrates: "脊椎动物",
};

const localizeLocation = (location: Location, language: Language): Location => {
  if (language === "en") return location;
  const translation = locationZh[location.id];
  return {
    ...location,
    ...translation,
    finds: location.finds.map((find, index) => ({
      ...find,
      name: find.zh,
      zh: find.name,
      category: fossilCategoryZh[find.category] ?? find.category,
      rarity: rarityZh[find.rarity] ?? find.rarity,
      tip: translation.findTips[index],
    })),
  };
};

const copy = {
  en: {
    returnMap: "Return to UK map", museum: "Fossil museum", about: "About", safetyFirst: "Safety first",
    heroEyebrow: "N+ FIELD SITES · ROUTES FROM LONDON", heroTitle: "Fossil Hunters", heroSubtitle: "Let’s go exploring.",
    scopeSites: "FIELD SITES", scopeStart: "STARTING FROM", scopeStartValue: "LONDON", scopeCheck: "CHECK BEFORE", scopeCheckValue: "TIDE & ACCESS",
    northSea: "NORTH SEA", channel: "ENGLISH CHANNEL", london: "London", open: "Open",
    fromLondon: "from London", fieldSites: "FIELD SITES · N+", sitesHint: "Hover for field sites", close: "Close", explore: "Explore N+ field sites", findShort: "Finds", accessShort: "Access",
    routeToggle: "From London routes", fieldSite: "Field site", research: "In research", railRoute: "Rail route",
    questLabel: "MAIN QUEST", questTitle: "FOSSIL TRAIL", questHint: "Choose a fossil marker to begin", questSites: "SITES TO EXPLORE",
    mapCredit: "Pixel map · locations approximate", researchLabel: "IN RESEARCH", dismiss: "Dismiss",
    aboutEyebrow: "About this field map", aboutTitle: "A route planner, not a promise.",
    aboutBody: "This map turns scattered fossil guides into eight practical journeys from London. Each field sheet combines the train, last-mile walk, approximate collecting zone, likely finds and the rules that matter on the day.",
    thanksTitle: "Acknowledgements",
    thanksBody: "Thank you to everyone in the UK Fossil Hunting group—from QMUL, UCL, UAL and friends across many different disciplines. Your shared love of the ocean and fossils inspired me to build and keep updating this site. Special thanks to the group organiser for bringing everyone together.",
    approxStrong: "Coordinates stay approximate.", approxBody: "The goal is to guide safe access—not publish sensitive or rare specimen locations.",
    changing: "Travel, tide and access conditions change. Re-check the linked operator, tide table and local guidance before every trip.",
    beforeTrip: "Before every trip", tideDeadline: "The tide is a deadline.",
    safetyCards: [
      ["Check twice", "Read the tide table and the weather forecast. Set a turnaround time."],
      ["Look up", "Stay well clear of cliff bases, fresh falls, cracks and active slips."],
      ["Leave early", "Do not wait for the water to reach you. Keep a known exit in sight."],
      ["Collect lightly", "Prefer loose material, follow the local code and report important finds."],
    ],
    emergencyStrong: "Emergency: call 999 and ask for Coastguard.", emergencyBody: "Do not attempt a cliff or sea rescue yourself.",
  },
  zh: {
    returnMap: "返回英国总览地图", museum: "化石图鉴博物馆", about: "关于", safetyFirst: "安全须知",
    heroEyebrow: "N+ 个重点地点 · 从伦敦出发", heroTitle: "Fossil Hunters", heroSubtitle: "一起去探险吧。",
    scopeSites: "收录地点", scopeStart: "默认出发地", scopeStartValue: "伦敦", scopeCheck: "出发前确认", scopeCheckValue: "潮汐与通行",
    northSea: "北海", channel: "英吉利海峡", london: "伦敦", open: "打开",
    fromLondon: "从伦敦出发", fieldSites: "重点地点 · N+", sitesHint: "悬停查看地点", close: "关闭", explore: "探索 N+ 个重点地点", findShort: "发现", accessShort: "通行",
    routeToggle: "显示伦敦出发路线", fieldSite: "完整地点", research: "调研中", railRoute: "铁路路线",
    questLabel: "主线任务", questTitle: "寻找英国化石", questHint: "选择一个化石图标开始", questSites: "个探索地点",
    mapCredit: "像素底图 · 地点为近似位置", researchLabel: "调研中", dismiss: "关闭",
    aboutEyebrow: "关于这张野外地图", aboutTitle: "它是路线计划，不是安全承诺。",
    aboutBody: "这张地图把分散的化石攻略整理成八条从伦敦出发的实际行程。每张地点卡都结合了火车、最后一段步行、大致采集区、常见化石和当天必须遵守的规则。",
    thanksTitle: "致谢",
    thanksBody: "感谢 UK Fossil Hunting 的群友们——来自 QMUL、UCL、UAL 等学校、不同专业的朋友们。正是大家对海洋与化石的热爱，带动我制作并持续更新这个网站。也特别感谢群主一直以来的组织，让大家相聚并共同探索。",
    approxStrong: "坐标始终保持近似。", approxBody: "目标是引导安全抵达，而不是公开敏感地点或稀有标本的精确位置。",
    changing: "交通、潮汐和通行条件都会变化。每次出发前请重新查看交通运营方、潮汐表和当地指南。",
    beforeTrip: "每次出发前", tideDeadline: "潮水就是截止时间。",
    safetyCards: [
      ["检查两次", "查看潮汐表和天气预报，并提前设定折返时间。"],
      ["抬头观察", "远离崖脚、新鲜落石、裂缝和活动滑坡。"],
      ["提前离开", "不要等潮水到脚边。始终让已知出口保持可见。"],
      ["适量采集", "优先拾取松散材料，遵守当地守则并报告重要发现。"],
    ],
    emergencyStrong: "紧急情况：拨打 999 并要求 Coastguard 海岸警卫队。", emergencyBody: "不要自行实施悬崖或海上救援。",
  },
} as const;

const detailCopy = {
  en: {
    risk: "RISK", lowWater: "LOW WATER", collectingArea: "APPROX. COLLECTING AREA", hazard: "HAZARD", rail: "RAIL",
    nearestStation: "nearest station", access: "Beach / field access", recommendedStart: "recommended start", exitPoint: "Exit point",
    cafe: "Café", onFoot: "ON FOOT", actionMap: "ACTION MAP · COORDINATES APPROXIMATE",
    walkingRoute: "walking route", collectingKey: "collecting area", hazardKey: "hazard", allSites: "All UK sites",
    locationDetails: "Location details", navRoute: "Route", navGeology: "Geology", navFinds: "Field guide", navKit: "Kit", navRules: "Rules",
    section1: "How to get there", section2: "Recommended route", section3: "Collector's field guide", section4: "Best time to visit",
    section5: "Equipment", section6: "Safety", section7: "Environment & collecting rules", typicalTotal: "Typical total",
    london: "LONDON", recommendedDeparture: "recommended departure", train: "TRAIN", checkService: "check same-day service", local: "LOCAL",
    planRail: "Plan on National Rail", openMaps: "Open route in maps", terrain: "TERRAIN", exit: "EXIT", typical: "TYPICAL",
    recommendedWindow: "RECOMMENDED WINDOW", season: "SEASON", conditions: "CONDITIONS", checkTide: "Check current tide table",
    tideNA: "Tide not applicable at this inland site", caveat: "Always check current tide, weather and access conditions. This map does not provide live safety advice.",
    bring: "BRING", useful: "USEFUL", avoid: "AVOID", fieldRisk: "FIELD RISK",
    coastguardA: "In a coastal emergency, call", coastguardB: "and ask for", status: "STATUS",
    siteSpecific: "Rules are site-specific. Check current designation and access notices.", source: "SOURCE", reviewed: "LAST REVIEWED",
    precision: "Location precision: approximate · Guidance may change",
    findFrequency: "FIND FREQUENCY", accessRating: "ACCESS", familyRating: "FAMILY",
    geologyTitle: "Site geology", formations: "FORMATIONS", environment: "ENVIRONMENT", typicalFossils: "TYPICAL FOSSILS",
    bedContext: "GAULT BED CONTEXT", fieldRule: "FIELD NOTE", reference: "REFERENCE", category: "CATEGORY",
  },
  zh: {
    risk: "风险", lowWater: "低潮水位", collectingArea: "大致采集区域", hazard: "危险区域", rail: "铁路",
    nearestStation: "最近火车站", access: "海滩 / 现场入口", recommendedStart: "推荐起点", exitPoint: "撤离点",
    cafe: "咖啡馆", onFoot: "步行", actionMap: "行动地图 · 坐标为近似位置",
    walkingRoute: "步行路线", collectingKey: "采集区域", hazardKey: "危险区域", allSites: "返回英国全部地点",
    locationDetails: "地点信息", navRoute: "路线", navGeology: "地质", navFinds: "图鉴", navKit: "装备", navRules: "规则",
    section1: "如何抵达", section2: "推荐现场路线", section3: "可收集化石图鉴", section4: "最佳前往时间",
    section5: "装备清单", section6: "安全信息", section7: "环境与采集规则", typicalTotal: "典型总耗时",
    london: "伦敦", recommendedDeparture: "推荐出发站", train: "火车", checkService: "出发当天再次确认班次", local: "当地交通",
    planRail: "在 National Rail 规划行程", openMaps: "在地图中打开路线", terrain: "地形", exit: "撤离", typical: "典型尺寸",
    recommendedWindow: "推荐时间窗口", season: "季节", conditions: "现场条件", checkTide: "查看当前潮汐表",
    tideNA: "此内陆地点不受潮汐影响", caveat: "请始终核对当天潮汐、天气与通行条件。本地图不提供实时安全判断。",
    bring: "必须携带", useful: "建议携带", avoid: "避免使用", fieldRisk: "现场风险",
    coastguardA: "发生海岸紧急情况时，请拨打", coastguardB: "并要求联系", status: "保护状态",
    siteSpecific: "不同地点的规则各不相同。请核对最新保护地指定信息和通行告示。", source: "信息来源", reviewed: "最后核验",
    precision: "地点精度：近似 · 指南可能更新",
    findFrequency: "发现频率", accessRating: "通行难度", familyRating: "亲子适合度",
    geologyTitle: "地点地质剖面", formations: "地层单元", environment: "沉积环境", typicalFossils: "典型化石",
    bedContext: "GAULT 层位线索", fieldRule: "现场采集提示", reference: "参考资料", category: "类别",
  },
} as const;

const museumCopy = {
  en: {
    back: "Back to the map", eyebrow: "FIELD COLLECTION · PERSONAL ARCHIVE", title: "Fossil Field Museum",
    intro: "Browse collectible fossils by field region and biological group, then build your own field record.",
    allRegions: "All regions", allCategories: "All groups", regionFilter: "REGIONS", categoryFilter: "FOSSIL GROUPS",
    trackerTitle: "My collection log", trackerIntro: "Visited regions and collected specimens are restored automatically for this anonymous profile.",
    regionsProgress: "Regions visited", speciesProgress: "Specimens collected", loading: "Loading collection…", saving: "Saving…",
    saved: "Collection saved", syncError: "Could not sync. Try reloading the collection.", reload: "Reload collection",
    exportCard: "Export collection card", exportHint: "Download PNG", cardTitle: "FOSSIL FIELD COLLECTION",
    cardSubtitle: "Personal museum record", visitedList: "VISITED REGIONS", collectionList: "COLLECTED SPECIMENS",
    noneYet: "None recorded yet", more: "more",
    markVisited: "Mark region visited", visited: "Region visited", collected: "Collected", addCollection: "Add to collection",
    categoryIntro: "GROUP NOTE", rarity: "RARITY", size: "TYPICAL SIZE", starScale: "1–5 starfish rarity scale",
    entries: "museum entries", openSite: "Open field guide", empty: "No specimens match these filters.", progress: "COLLECTION PROGRESS",
  },
  zh: {
    back: "返回地图", eyebrow: "野外收藏 · 个人档案", title: "化石图鉴博物馆",
    intro: "按采集地区与生物门类浏览可收集化石，并建立属于自己的野外收藏记录。",
    allRegions: "全部地区", allCategories: "全部门类", regionFilter: "采集地区", categoryFilter: "化石门类",
    trackerTitle: "我的收集档案", trackerIntro: "到访地区与已拥有标本会保存到匿名档案，并在下次打开时自动恢复。",
    regionsProgress: "已走过地区", speciesProgress: "已收集品种", loading: "正在加载收藏…", saving: "正在保存…",
    saved: "收藏进度已保存", syncError: "同步失败，请重新加载收藏。", reload: "重新加载收藏",
    exportCard: "导出图鉴收藏卡", exportHint: "下载 PNG", cardTitle: "化石野外收藏卡",
    cardSubtitle: "个人图鉴博物馆记录", visitedList: "已到访地区", collectionList: "已拥有标本",
    noneYet: "暂未记录", more: "项未显示",
    markVisited: "点亮到访地区", visited: "已到访", collected: "已拥有", addCollection: "加入收藏",
    categoryIntro: "门类介绍", rarity: "稀有度", size: "典型尺寸", starScale: "1–5 枚海星稀有度等级",
    entries: "项地区图鉴", openSite: "打开地区攻略", empty: "当前筛选下没有对应标本。", progress: "收集进度",
  },
} as const;

const categoryDescriptions: Record<string, Record<Language, string>> = {
  "Ammonites & Heteromorphs": {
    en: "Coiled or uncoiled ammonoid shells. Ribs, keels and suture patterns help separate groups.",
    zh: "包括盘卷与异形菊石。壳体肋纹、腹棱和缝合线是辨认不同类群的重要线索。",
  },
  "Other Cephalopods": {
    en: "Belemnite guards and nautiloid shells record several very different cephalopod body plans.",
    zh: "箭石的坚硬鞘体与鹦鹉螺类外壳，展示了头足动物截然不同的身体结构。",
  },
  Echinoderms: {
    en: "Echinoids and crinoids often show five-fold symmetry, plates or star-centred stem segments.",
    zh: "海胆与海百合常保留五辐对称、骨板或中心呈星形的茎节。",
  },
  Crabs: {
    en: "Crustacean carapaces and claws are often preserved inside concretions rather than loose clay.",
    zh: "甲壳与螯常保存在结核内部，而不是直接散落在黏土表面。",
  },
  "Bivalves & Brachiopods": {
    en: "Paired shells preserve ribs, growth lines and hinge shapes that reveal how the animal lived.",
    zh: "成对壳体上的肋纹、生长线与铰合结构，可以反映动物生前的生活方式。",
  },
  "Shark Teeth": {
    en: "Durable enamel makes shark teeth common vertebrate finds; crown shape reflects feeding style.",
    zh: "坚硬牙釉质使鲨鱼牙成为常见脊椎动物化石；齿冠形状常对应不同取食方式。",
  },
  Fish: {
    en: "Teeth, crushing plates, scales, spines and vertebrae are more likely to survive than whole fish.",
    zh: "牙齿、齿板、鳞片、棘与椎骨比完整鱼体更容易被保存下来。",
  },
  Reptile: {
    en: "Turtle and marine-reptile fragments are scientifically important; record context before preparation.",
    zh: "龟类与海生爬行动物碎片具有较高科研价值，处理前应先记录发现环境。",
  },
  Microfossils: {
    en: "Small fossils such as nummulites may be abundant but usually need a hand lens for close study.",
    zh: "货币虫等微化石数量可能很多，但通常需要借助手持放大镜观察结构。",
  },
  "Trace Fossils": {
    en: "Burrows, tracks and coprolites preserve behaviour rather than the animal's body itself.",
    zh: "洞穴、足迹与粪化石保存的是动物活动行为，而不是动物身体本身。",
  },
  "Plant Fossils": {
    en: "Wood grain, growth structure and mineral replacement help distinguish fossil wood from rock.",
    zh: "木纹、生长构造和矿物交代特征，可以帮助区分化石木与普通岩石。",
  },
  Gastropods: {
    en: "Coiled snail shells preserve whorls, apertures and ornament that reflect life on or within the seabed.",
    zh: "腹足类螺旋壳会保存壳环、壳口与表面纹饰，反映其在海床表面或内部的生活方式。",
  },
  Vertebrates: {
    en: "Porous or thin-walled bones can be fragile and significant; unusual finds should be recorded.",
    zh: "多孔或薄壁骨骼通常脆弱且可能具有科研价值，异常发现应及时记录。",
  },
};

const rarityStars = (rarity: string) => {
  if (/very rare|非常罕见/i.test(rarity)) return 5;
  if (/rare|罕见/i.test(rarity)) return 4;
  if (/uncommon|少见/i.test(rarity)) return 3;
  if (/occasional|偶见/i.test(rarity)) return 2;
  return 1;
};

const rarityTier = (stars: number) => stars >= 5 ? "gold" : stars >= 3 ? "silver" : "bronze";

const museumFindKey = (location: Location, find: Find) => `${location.id}:${find.name}`;

type GuideTurn = {
  id: number;
  role: "guide" | "user";
  text: string;
  locationId?: string;
};

const guideCopy = {
  en: {
    name: "Nori · site guide",
    status: "SEARCHING THIS SITE ONLY",
    ask: "Ask Nori",
    close: "Close guide",
    placeholder: "Ask about routes, tides, kit or finds…",
    send: "Ask",
    source: "Answers use the route and safety notes on this site.",
    welcome: "Hello! I’m Nori, your slightly confused nautilus guide. I know routes, tides, kit and fossils—luo.",
    openSite: "Open site details",
    presets: ["How do I get to Folkestone?", "What should I check before fossil collecting?", "Which site is best for beginners?", "Nori, can you swim?"],
    hover: [
      "Need a route? Ask me—luo.",
      "The tide is a deadline. Very rude of it—luo.",
      "I can search all six guides. That’s almost seven—luo.",
      "Loose fossils first. Cliffs are not supermarket shelves—luo.",
      "My shell has no Wi-Fi, but the site notes do—luo.",
      "I’m 90% shell and 10% unsolicited advice—luo.",
    ],
  },
  zh: {
    name: "诺里 · 站内向导",
    status: "仅检索本站资料",
    ask: "问问诺里",
    close: "关闭向导",
    placeholder: "询问路线、潮汐、装备或化石……",
    send: "提问",
    source: "回答来自本站的路线与安全资料。",
    welcome: "你好螺！我是有点呆、很会吐槽的鹦鹉螺诺里。路线、潮汐、装备和化石都可以问我螺。",
    openSite: "打开地点详情",
    presets: ["如何去 Folkestone？", "化石采集前我应该注意什么？", "哪个地点最适合新手？", "诺里，你会游泳吗？"],
    hover: [
      "想查路线？问我螺！",
      "潮水是截止时间，真是一点面子都不给螺。",
      "我能检索本站全部六份地点指南，差一点就是七份螺。",
      "先找松散化石，悬崖可不是超市货架螺！",
      "我的壳里没有 Wi-Fi，但本站资料里有答案螺。",
      "本人百分之九十是壳，百分之十是多管闲事螺。",
      "你盯着我看，是想听冷知识还是冷笑话螺？",
      "慢慢问，我游得慢，脑子转得也不算快螺。",
    ],
  },
} as const;

const locationAliases: Record<string, string[]> = {
  folkestone: ["folkestone", "folkestone warren", "福克斯通"],
  "herne-bay": ["herne bay", "beltinge", "赫恩湾"],
  walton: ["walton", "walton-on-the-naze", "naze", "沃尔顿"],
  "wootton-bassett": ["wootton", "wootton bassett", "royal wootton bassett", "伍顿巴西特"],
  bracklesham: ["bracklesham", "bracklesham bay", "布拉克勒舍姆"],
  charmouth: ["charmouth", "lyme regis", "black ven", "查茅斯", "莱姆里吉斯"],
  weymouth: ["weymouth", "bowleaze", "bowleaze cove", "redcliff", "韦茅斯"],
  peterborough: ["peterborough", "king s dyke", "kings dyke", "king’s dyke", "whittlesey", "彼得伯勒"],
};

const normalizeGuideQuery = (value: string) => value.toLocaleLowerCase().replace(/[？?！!，,。.、:：'’“”"()（）-]/g, " ").replace(/\s+/g, " ").trim();

const pickGuideReply = (lines: readonly string[]) => lines[Math.floor(Math.random() * lines.length)] ?? lines[0];

const finishWithNoriVoice = (text: string, language: Language) => {
  const trimmed = text.trim();
  if (language === "zh") {
    if (/螺[。！？!?]?$/.test(trimmed)) return trimmed;
    return `${trimmed.replace(/[。！？!?]+$/, "")}螺。`;
  }
  if (/luo[.!?]?$/.test(trimmed.toLocaleLowerCase())) return trimmed;
  return `${trimmed.replace(/[.!?]+$/, "")}—luo.`;
};

function answerNoriSmallTalk(query: string, language: Language): string | null {
  const isZh = language === "zh";

  if (/^(诺里 ?)?(你好|您好|嗨|哈喽|hello|hi|hey|早上好|早安|晚上好|在吗|在不在)( ?诺里)?$/.test(query)) {
    return pickGuideReply(isZh
      ? ["你好螺！今天也要安全地捡石头螺。", "嗨螺！先说好，我只懂化石，不懂老板为什么还不下班螺。", "在的螺！壳有点重，回复慢半拍也很合理螺。"]
      : ["Hello! Let’s look for fossils safely—luo.", "Hi! I know fossils, not why Mondays exist—luo.", "I’m here. The shell makes loading slightly slower—luo."]);
  }

  if (/^(谢谢|感谢|多谢|thank you|thanks|thx)$/.test(query)) {
    return pickGuideReply(isZh
      ? ["不客气螺，记得把好看的石头和垃圾分开螺。", "应该的螺，我收取的咨询费是一句夸奖螺。", "谢什么螺，安全回来再谢我也不迟螺。"]
      : ["You’re welcome. My consultation fee is one compliment—luo.", "Any time. Come back safely and we’re even—luo."]);
  }

  if (/(你是谁|你叫什么|你的名字|介绍一下自己|who are you|what.*your name)/.test(query)) {
    return isZh
      ? "我是诺里，一只负责站内检索、潮汐提醒和偶尔胡说八道的鹦鹉螺。重点是前两项螺。"
      : "I’m Nori: site searcher, tide nagger and occasional nonsense generator. Focus on the first two—luo.";
  }

  if (/(你好吗|最近怎么样|心情怎么样|开心吗|how are you|how.*going)/.test(query)) {
    return pickGuideReply(isZh
      ? ["挺好螺，今天的壳光泽度有八分螺。", "精神不错螺，就是每次转身都要连壳一起转，有点累螺。", "还行螺，没有被潮水冲走就是好日子螺。"]
      : ["Pretty good. Shell shine is eight out of ten today—luo.", "Not swept away by the tide, so I call that a good day—luo."]);
  }

  if (/(可爱|好萌|喜欢你|爱你|想你|cute|adorable|love you|miss you)/.test(query)) {
    return pickGuideReply(isZh
      ? ["知道螺，但你再说一遍我也不会拦着螺。", "别夸了螺，壳都要红了——虽然它本来是黄色的螺。", "眼光不错螺，本站最稀有的发现可能就是我螺。"]
      : ["I know, but I won’t stop you saying it again—luo.", "Excellent taste. I may be the rarest find on this site—luo."]);
  }

  if (/(几岁|多大|年龄|活了多久|how old)/.test(query)) {
    return isZh
      ? "这个问题不礼貌螺。只能告诉你，鹦鹉螺家族比恐龙资格老，但我本人坚持按壳的年轮保密螺。"
      : "Rude question. My family predates dinosaurs, but my personal shell rings are classified—luo.";
  }

  if (/(吃什么|爱吃什么|喜欢吃|饿不饿|食物|what.*eat|hungry|favourite food|favorite food)/.test(query)) {
    return isZh
      ? "我吃小虾小蟹，偶尔也吃自己刚说过的话螺。"
      : "Small shrimp, little crabs and occasionally my own words—luo.";
  }

  if (/(会游泳|怎么游|游得快|swim|fast.*water)/.test(query)) {
    return isZh
      ? "会游螺，主要靠喷水推进。速度不快，但倒车技术在海里算一流螺。"
      : "I jet-propel myself. Not fast, but my reverse parking is elite—luo.";
  }

  if (/(讲.*笑话|来.*笑话|笑话|逗我|搞笑|joke|make me laugh)/.test(query)) {
    return pickGuideReply(isZh
      ? ["为什么菊石从不迷路？因为它一直在原地绕圈螺。", "地质锤去面试，老板问它擅长什么。它说：我特别会敲重点螺。", "潮水问我为什么走得慢。我说：你背个房子试试螺。"]
      : ["Why don’t ammonites get lost? They keep going around in circles—luo.", "The tide asked why I was slow. I said: try carrying your house—luo."]);
  }

  if (/(今天天气|明天天气|天气怎么样|实时天气|weather today|weather tomorrow|forecast)/.test(query)) {
    return isZh
      ? "我不会看实时天气螺，壳里的气象台还没通电。出发前请查看当地预报、风力和降雨螺。"
      : "I can’t see live weather; the forecast desk in my shell has no electricity. Check local rain and wind before travelling—luo.";
  }

  if (/(再见|拜拜|下次见|晚安|goodbye|bye|see you)/.test(query)) {
    return isZh ? "再见螺！记得带水、查潮汐、别站崖下螺。" : "Bye! Bring water, check the tide and stay away from cliff bases—luo.";
  }

  return null;
}

function answerGuideQuestion(question: string, siteLocations: Location[], language: Language): Omit<GuideTurn, "id" | "role"> {
  const query = normalizeGuideQuery(question);
  const smallTalk = answerNoriSmallTalk(query, language);
  if (smallTalk) return { text: smallTalk };
  const location = siteLocations.find((item) =>
    [item.id, item.name, item.shortName, ...(locationAliases[item.id] ?? [])]
      .some((alias) => query.includes(normalizeGuideQuery(alias))),
  );
  const isZh = language === "zh";
  const asksRoute = /(怎么去|如何去|怎样去|路线|交通|抵达|到达|how.*(get|go)|route|train|travel)/i.test(query);
  const asksSafety = /(注意|安全|危险|风险|准备|采集前|safe|safety|hazard|risk|before.*collect)/i.test(query);
  const asksTide = /(潮|时间|什么时候|季节|weather|tide|when|season)/i.test(query);
  const asksKit = /(装备|带什么|工具|穿什么|equipment|kit|bring|wear|tool)/i.test(query);
  const asksFinds = /(化石|找到|发现|有什么|find|fossil|tooth|ammonite|belemnite|shell|牙|菊石|箭石|贝壳)/i.test(query);
  const asksRules = /(规则|允许|可以带走|能带走|敲|挖|rule|allowed|collecting code|hammer|dig)/i.test(query);
  const asksBeginner = /(新手|第一次|亲子|孩子|家庭|简单|beginner|first time|family|children|easy)/i.test(query);

  if (asksSafety && !location) {
    return {
      text: isZh
        ? "化石采集前先做四件事：①核对当天潮汐和天气，设定折返时间；②确认正式入口与已知出口；③远离崖脚、新鲜落石、裂缝和活动滑坡；④只拾取少量松散材料并遵守当地规则。海岸紧急情况拨打 999，并要求 Coastguard。"
        : "Before collecting: 1) check the same-day tide and weather and set a turnaround time; 2) confirm the formal access and a known exit; 3) stay clear of cliff bases, fresh falls, cracks and active slips; 4) take only a few loose finds and follow local rules. In a coastal emergency, call 999 and ask for Coastguard.",
    };
  }

  if (asksBeginner && !location) {
    const beginner = [...siteLocations].sort((a, b) => (b.familyRating + b.accessRating) - (a.familyRating + a.accessRating))[0];
    return {
      text: isZh
        ? `本站最适合第一次体验的是 ${beginner.name}：通行与亲子评分都是 ${beginner.accessRating}/5 和 ${beginner.familyRating}/5，现场风险为${riskLabel(beginner.risk, language)}。${beginner.safetyLead}`
        : `${beginner.name} is the strongest first-trip option on this site: access ${beginner.accessRating}/5, family ${beginner.familyRating}/5, with ${riskLabel(beginner.risk, language)} field risk. ${beginner.safetyLead}`,
      locationId: beginner.id,
    };
  }

  if (location && asksRoute) {
    return {
      text: isZh
        ? `从 ${location.departure} 出发，乘火车到 ${location.station}，典型总耗时约 ${location.duration}。到站后${location.local}，${location.walk}。现场建议：${location.tideWindow}。出发当天请重新确认班次、潮汐与通行。`
        : `Leave from ${location.departure} and take the train to ${location.station}; typical total time is ${location.duration}. Then ${location.local}; ${location.walk}. Field timing: ${location.tideWindow}. Re-check same-day rail, tide and access conditions.`,
      locationId: location.id,
    };
  }

  if (location && asksSafety) {
    return {
      text: isZh
        ? `${location.name} 的现场风险为${riskLabel(location.risk, language)}。${location.safetyLead} 主要危险包括：${location.hazards.slice(0, 3).join("；")}。`
        : `${location.name} has ${riskLabel(location.risk, language)} field risk. ${location.safetyLead} Main hazards: ${location.hazards.slice(0, 3).join("; ")}.`,
      locationId: location.id,
    };
  }

  if (location && asksTide) {
    return {
      text: isZh
        ? `${location.name}：${location.tideWindow}。推荐季节为${location.season}；现场条件建议：${location.conditions}。潮汐和通行会变化，请在出发当天再次核对。`
        : `${location.name}: ${location.tideWindow}. Best season: ${location.season}. Conditions: ${location.conditions}. Tide and access change, so check again on the day.`,
      locationId: location.id,
    };
  }

  if (location && asksKit) {
    return {
      text: isZh
        ? `${location.name} 必须携带：${location.required.join("、")}。建议携带：${location.useful.join("、")}。避免：${location.avoid.join("、")}。`
        : `${location.name} essentials: ${location.required.join(", ")}. Useful: ${location.useful.join(", ")}. Avoid: ${location.avoid.join(", ")}.`,
      locationId: location.id,
    };
  }

  if (location && asksRules) {
    return {
      text: isZh
        ? `${location.name} 的采集规则：${location.rules.join("；")} 最新现场告示优先于本站资料。`
        : `${location.name} collecting rules: ${location.rules.join(" ")} Current on-site notices take priority over this guide.`,
      locationId: location.id,
    };
  }

  if (location && asksFinds) {
    return {
      text: isZh
        ? `${location.name} 常见发现包括：${location.finds.map((find) => `${find.name}（${find.rarity}，${find.size}）`).join("、")}。`
        : `At ${location.name}, look for ${location.finds.map((find) => `${find.name} (${find.rarity}, ${find.size})`).join(", ")}.`,
      locationId: location.id,
    };
  }

  const fossilMatches = siteLocations.filter((item) => item.finds.some((find) => {
    const names = [find.name, find.zh].map(normalizeGuideQuery);
    return names.some((name) => name.length > 1 && query.includes(name));
  }));
  if (fossilMatches.length > 0) {
    return {
      text: isZh
        ? `本站记录这种化石的地点有：${fossilMatches.map((item) => item.name).join("、")}。告诉我具体地点，我可以继续查路线、时间和装备。`
        : `This fossil appears in the guides for ${fossilMatches.map((item) => item.name).join(", ")}. Name a location and I can narrow down the route, timing and kit.`,
    };
  }

  if (location) {
    return {
      text: isZh
        ? `${location.name} 位于${location.region}，地层为${location.period}，从伦敦出发约 ${location.duration}，现场风险为${riskLabel(location.risk, language)}。可继续问我这里的路线、潮汐、装备、化石或采集规则。`
        : `${location.name} is in ${location.region}, with ${location.period} geology. It is about ${location.duration} from London and has ${riskLabel(location.risk, language)} field risk. Ask me about its route, tide, kit, finds or rules.`,
      locationId: location.id,
    };
  }

  if (asksTide) {
    return {
      text: isZh
        ? "不同地点的潮汐窗口差异很大。请告诉我地点名，例如 Folkestone、Herne Bay、Weymouth 或 Charmouth，我会检索对应建议。Peterborough 不受潮汐影响螺。"
        : "Tide windows vary widely. Name a location—such as Folkestone, Herne Bay, Weymouth or Charmouth—and I’ll retrieve its guidance. Peterborough is not tidal—luo.",
    };
  }

  return {
    text: isZh
      ? "不知道螺。"
      : "No idea—luo.",
  };
}

const markerOffsets: Record<string, { x: number; y: number }> = {
  folkestone: { x: 38, y: 22 },
  "herne-bay": { x: 46, y: -8 },
  walton: { x: 28, y: -40 },
  "wootton-bassett": { x: -30, y: -32 },
  bracklesham: { x: 22, y: 40 },
  charmouth: { x: -38, y: 30 },
  weymouth: { x: -10, y: 44 },
  peterborough: { x: -42, y: -28 },
};

const markerStyle = (location: Location, index: number) => {
  const offset = markerOffsets[location.id] ?? { x: 0, y: 0 };
  const length = Math.hypot(offset.x, offset.y).toFixed(2);
  const angle = (Math.atan2(offset.y, offset.x) * 180 / Math.PI).toFixed(2);
  return {
    left: `${location.mapX}%`,
    top: `${location.mapY}%`,
    "--delay": `${index * 80}ms`,
    "--marker-x": `${offset.x}px`,
    "--marker-y": `${offset.y}px`,
    "--leader-length": `${length}px`,
    "--leader-angle": `${angle}deg`,
  } as React.CSSProperties;
};

const riskClass = (risk: Risk) => `risk-${risk.toLowerCase()}`;
const riskLabel = (risk: Risk, language: Language) => language === "en" ? risk : ({ LOW: "低", MODERATE: "中", HIGH: "高" }[risk]);
const rarityClass = (rarity: string) => {
  if (/very rare|非常罕见/i.test(rarity)) return "rarity-very-rare";
  if (/rare|罕见/i.test(rarity)) return "rarity-rare";
  if (/uncommon|少见/i.test(rarity)) return "rarity-uncommon";
  if (/occasional|偶见/i.test(rarity)) return "rarity-occasional";
  if (/very common|非常常见/i.test(rarity)) return "rarity-very-common";
  return "rarity-common";
};

function AmmoniteMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`ammonite-mark ${small ? "small" : ""}`} aria-hidden="true">
      <span className="ammonite-shell">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    </span>
  );
}

function PixelSiteIcon({ id, compact = false }: { id: string; compact?: boolean }) {
  return (
    <span className={`site-pixel-icon icon-${id} ${compact ? "compact" : ""}`} aria-hidden="true">
      <i />
      <b />
      <em />
    </span>
  );
}

function fossilIconClass(find: Find) {
  const text = `${find.name} ${find.zh} ${find.category}`.toLowerCase();
  if (/belemnite|箭石/.test(text)) return "belemnite";
  if (/nautiloid|鹦鹉螺/.test(text)) return "nautiloid";
  if (/ammonite|菊石/.test(text)) return "ammonite";
  if (/crinoid|海百合/.test(text)) return "crinoid";
  if (/echinoid|海胆/.test(text)) return "echinoid";
  if (/crab|蟹/.test(text)) return "crab";
  if (/shark|tooth|ray|鲨|牙|鳐/.test(text)) return "tooth";
  if (/fish|鱼/.test(text)) return "fish";
  if (/bivalve|brachiopod|mollusc|gastropod|shell|双壳|腕足|贝|软体|腹足/.test(text)) return "shell";
  if (/wood|plant|木|植物/.test(text)) return "wood";
  if (/nummulite|microfossil|货币虫|微化石/.test(text)) return "micro";
  if (/coprolite|trace|粪|遗迹/.test(text)) return "trace";
  if (/bone|reptile|turtle|bird|vertebrate|骨|爬行|龟|鸟/.test(text)) return "bone";
  return "fossil";
}

function PixelFossilIcon({ find }: { find: Find }) {
  return (
    <span className={`pixel-fossil fossil-${fossilIconClass(find)}`} aria-hidden="true">
      <i />
      <b />
      <em />
    </span>
  );
}

function NautilusSprite({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="nautilus-shell"><i /></div>
      <div className="nautilus-hood" />
      <div className="nautilus-eye" />
      <div className="nautilus-tentacles">
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function PixelCreatures() {
  return (
    <div className="dino-track" aria-hidden="true">
      <div className="pixel-dino">
        <div className="dino-tail" />
        <div className="dino-body" />
        <div className="dino-neck" />
        <div className="dino-head" />
        <div className="dino-snout" />
        <div className="dino-eye" />
        <div className="dino-arm" />
        <div className="dino-leg leg-front"><span /></div>
        <div className="dino-leg leg-back"><span /></div>
      </div>
      <div className="pixel-ichthyosaur">
        <div className="ichthy-tail" />
        <div className="ichthy-body" />
        <div className="ichthy-fin" />
        <div className="ichthy-head" />
        <div className="ichthy-snout" />
        <div className="ichthy-flipper" />
        <div className="ichthy-eye" />
        <div className="ichthy-highlight" />
        <div className="ichthy-bubbles" />
      </div>
      <NautilusSprite className="pixel-nautilus" />
    </div>
  );
}

function NautilusGuide({ language, siteLocations, onOpenLocation }: { language: Language; siteLocations: Location[]; onOpenLocation: (id: string) => void }) {
  const t = guideCopy[language];
  const [open, setOpen] = useState(false);
  const [hoverLine, setHoverLine] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [turns, setTurns] = useState<GuideTurn[]>([
    { id: 0, role: "guide", text: t.welcome },
  ]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const askQuestion = (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;
    const rawAnswer = answerGuideQuestion(cleanQuestion, siteLocations, language);
    const answer = { ...rawAnswer, text: finishWithNoriVoice(rawAnswer.text, language) };
    setTurns((current) => {
      const nextId = (current.at(-1)?.id ?? 0) + 1;
      return [
        ...current.slice(-6),
        { id: nextId, role: "user", text: cleanQuestion },
        { id: nextId + 1, role: "guide", ...answer },
      ];
    });
    setQuery("");
    setOpen(true);
  };

  const showRandomLine = () => {
    if (open) return;
    const choices = t.hover.filter((line) => line !== hoverLine);
    setHoverLine(choices[Math.floor(Math.random() * choices.length)] ?? t.hover[0]);
  };

  return (
    <aside className={`nautilus-guide ${open ? "is-open" : ""}`} aria-label={t.name}>
      {!open && hoverLine && <div className="guide-hover-line" role="status">{hoverLine}</div>}

      {open && (
        <section className="guide-panel" role="dialog" aria-label={t.name}>
          <header className="guide-panel-header">
            <div>
              <strong>{t.name}</strong>
              <span><i /> {t.status}</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={t.close}>×</button>
          </header>

          <div className="guide-turns" aria-live="polite">
            {turns.map((turn) => (
              <div key={turn.id} className={`guide-turn ${turn.role}`}>
                <span>{turn.role === "guide" ? "N" : language === "zh" ? "你" : "YOU"}</span>
                <div>
                  <p>{turn.text}</p>
                  {turn.locationId && (
                    <button type="button" onClick={() => { onOpenLocation(turn.locationId!); setOpen(false); }}>
                      {t.openSite} <b>→</b>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="guide-presets" aria-label={language === "zh" ? "推荐问题" : "Suggested questions"}>
            {t.presets.map((preset) => <button type="button" key={preset} onClick={() => askQuestion(preset)}>{preset}</button>)}
          </div>

          <form className="guide-form" onSubmit={(event) => { event.preventDefault(); askQuestion(query); }}>
            <label>
              <span className="sr-only">{t.placeholder}</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.placeholder} autoComplete="off" />
            </label>
            <button type="submit" disabled={!query.trim()}>{t.send} <span>↗</span></button>
          </form>
          <small className="guide-source">{t.source}</small>
        </section>
      )}

      <button
        type="button"
        className="guide-trigger"
        aria-expanded={open}
        aria-label={open ? t.close : t.ask}
        onClick={() => { setOpen((value) => !value); setHoverLine(null); }}
        onMouseEnter={showRandomLine}
        onMouseLeave={() => setHoverLine(null)}
        onFocus={showRandomLine}
        onBlur={() => setHoverLine(null)}
      >
        <NautilusSprite className="guide-nautilus-art" />
        <span>{t.ask}</span>
      </button>
    </aside>
  );
}

function IntroScreen({ phase }: { phase: Exclude<IntroPhase, "done"> }) {
  return (
    <div className={`intro-screen ${phase}`} role="status" aria-label="正在加载英国化石地图">
      <div className="intro-stage">
        <div className="intro-copy">
          <h1 className="fossil-title"><span>Fossil Hunters</span><small>in UK</small></h1>
          <p>一起去探险吧。</p>
        </div>
        <PixelCreatures />
      </div>
    </div>
  );
}

type MuseumProgress = {
  visitedLocations: string[];
  ownedFinds: string[];
};

type MuseumSyncState = "loading" | "saving" | "saved" | "error";

function StarfishRating({ value, label }: { value: number; label: string }) {
  return (
    <div className="starfish-rating" aria-label={`${label}: ${value} / 5`} title={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((star) => <span key={star} className={star <= value ? "filled" : ""}><i /></span>)}
    </div>
  );
}

function drawExportStarfish(context: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: string) {
  context.save();
  context.translate(x, y);
  context.beginPath();
  for (let point = 0; point < 10; point += 1) {
    const angle = -Math.PI / 2 + point * Math.PI / 5;
    const pointRadius = point % 2 === 0 ? radius : radius * .38;
    const px = Math.cos(angle) * pointRadius;
    const py = Math.sin(angle) * pointRadius;
    if (point === 0) context.moveTo(px, py);
    else context.lineTo(px, py);
  }
  context.closePath();
  context.fillStyle = fill;
  context.fill();
  context.beginPath();
  context.arc(0, 0, Math.max(1.5, radius * .13), 0, Math.PI * 2);
  context.fillStyle = "#043d55";
  context.fill();
  context.restore();
}

function MuseumView({
  language,
  onBack,
  onOpenLocation,
}: {
  language: Language;
  onBack: () => void;
  onOpenLocation: (id: string) => void;
}) {
  const t = museumCopy[language];
  const [regionFilter, setRegionFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [revealedCards, setRevealedCards] = useState<string[]>([]);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [progress, setProgress] = useState<MuseumProgress>({ visitedLocations: [], ownedFinds: [] });
  const [syncState, setSyncState] = useState<MuseumSyncState>("loading");
  const saveQueue = useRef<Promise<void>>(Promise.resolve());

  const categories = useMemo(() => [...new Set(locations.flatMap((location) => location.finds.map((find) => find.category)))], []);
  const localizedMuseumLocations = useMemo(() => locations.map((location) => ({
    original: location,
    localized: localizeLocation(location, language),
  })), [language]);
  const validFindKeys = useMemo(() => new Set(locations.flatMap((location) => location.finds.map((find) => museumFindKey(location, find)))), []);

  const loadProgress = async (id: string) => {
    setSyncState("loading");
    try {
      const response = await fetch(`/api/museum-progress?profile=${encodeURIComponent(id)}`, { cache: "no-store" });
      if (!response.ok) throw new Error("progress load failed");
      const data = await response.json() as Partial<MuseumProgress>;
      setProgress({
        visitedLocations: Array.isArray(data.visitedLocations) ? data.visitedLocations.filter((item): item is string => typeof item === "string") : [],
        ownedFinds: Array.isArray(data.ownedFinds) ? data.ownedFinds.filter((item): item is string => typeof item === "string") : [],
      });
      setSyncState("saved");
    } catch {
      setSyncState("error");
    }
  };

  useEffect(() => {
    const startTimer = window.setTimeout(() => {
      const profileKey = "fossil-museum-profile-v1";
      let id = window.localStorage.getItem(profileKey);
      if (!id || !/^[a-zA-Z0-9_-]{12,80}$/.test(id)) {
        const randomPart = typeof crypto.randomUUID === "function"
          ? crypto.randomUUID().replaceAll("-", "")
          : `${Date.now()}_${Math.random().toString(36).slice(2)}`;
        id = `museum_${randomPart}`;
        window.localStorage.setItem(profileKey, id);
      }
      setProfileId(id);
      void loadProgress(id);
    }, 0);
    return () => window.clearTimeout(startTimer);
  }, []);

  const saveProgress = (next: MuseumProgress) => {
    setProgress(next);
    if (!profileId) return;
    setSyncState("saving");
    saveQueue.current = saveQueue.current
      .catch(() => undefined)
      .then(async () => {
        setSyncState("saving");
        const response = await fetch("/api/museum-progress", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ profileId, ...next }),
        });
        if (!response.ok) throw new Error("progress save failed");
      })
      .then(() => setSyncState("saved"))
      .catch(() => setSyncState("error"));
  };

  const toggleVisited = (locationId: string) => {
    const active = progress.visitedLocations.includes(locationId);
    saveProgress({
      ...progress,
      visitedLocations: active
        ? progress.visitedLocations.filter((id) => id !== locationId)
        : [...progress.visitedLocations, locationId],
    });
  };

  const toggleOwned = (key: string) => {
    const active = progress.ownedFinds.includes(key);
    saveProgress({
      ...progress,
      ownedFinds: active ? progress.ownedFinds.filter((id) => id !== key) : [...progress.ownedFinds, key],
    });
  };

  const visitedCount = progress.visitedLocations.filter((id) => locations.some((location) => location.id === id)).length;
  const ownedCount = progress.ownedFinds.filter((id) => validFindKeys.has(id)).length;
  const totalFinds = validFindKeys.size;
  const visibleLocations = localizedMuseumLocations
    .filter(({ original }) => regionFilter === "all" || original.id === regionFilter)
    .map(({ original, localized }) => ({
      original,
      localized,
      entries: original.finds.map((find, index) => ({ original: find, localized: localized.finds[index] }))
        .filter(({ original: find }) => categoryFilter === "all" || find.category === categoryFilter),
    }))
    .filter(({ entries }) => entries.length > 0);
  const categoryDescription = categoryFilter === "all"
    ? t.intro
    : categoryDescriptions[categoryFilter]?.[language] ?? t.intro;
  const syncLabel = syncState === "loading" ? t.loading : syncState === "saving" ? t.saving : syncState === "error" ? t.syncError : t.saved;

  const exportCollectionCard = async () => {
    await document.fonts.ready;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 675;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.imageSmoothingEnabled = false;

    context.fillStyle = "#043d55";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "rgba(189,232,242,.08)";
    context.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += 24) {
      context.beginPath(); context.moveTo(x, 0); context.lineTo(x, canvas.height); context.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 24) {
      context.beginPath(); context.moveTo(0, y); context.lineTo(canvas.width, y); context.stroke();
    }
    context.strokeStyle = "#ffd166";
    context.lineWidth = 8;
    context.strokeRect(24, 24, 1152, 627);

    context.fillStyle = "#ffd166";
    context.font = "600 18px monospace";
    context.fillText("FOSSIL HUNTERS IN UK · COLLECTION ARCHIVE", 66, 78);
    context.fillStyle = "#f2fbff";
    context.font = language === "zh" ? "700 56px sans-serif" : "700 62px Georgia, serif";
    context.fillText(t.cardTitle, 64, 145, 820);
    context.fillStyle = "#bde8f2";
    context.font = language === "zh" ? "400 21px sans-serif" : "400 20px monospace";
    context.fillText(t.cardSubtitle, 68, 178);
    for (let star = 0; star < 5; star += 1) drawExportStarfish(context, 974 + star * 36, 112 + (star % 2) * 7, 17, "#ffd166");

    const drawMetric = (x: number, title: string, current: number, total: number) => {
      const percent = total ? Math.round(current / total * 100) : 0;
      context.fillStyle = "#096b8b";
      context.fillRect(x, 215, 500, 118);
      context.strokeStyle = "rgba(226,248,255,.28)";
      context.lineWidth = 2;
      context.strokeRect(x, 215, 500, 118);
      context.fillStyle = "#bde8f2";
      context.font = language === "zh" ? "600 18px sans-serif" : "600 16px monospace";
      context.fillText(title, x + 22, 246);
      context.fillStyle = "#ffd166";
      context.font = "700 43px monospace";
      context.fillText(`${current}/${total}`, x + 20, 295);
      context.textAlign = "right";
      context.font = "700 24px monospace";
      context.fillText(`${percent}%`, x + 476, 285);
      context.textAlign = "left";
      context.fillStyle = "#043d55";
      context.fillRect(x + 170, 298, 306, 10);
      context.fillStyle = "#ffd166";
      context.fillRect(x + 170, 298, 306 * percent / 100, 10);
    };
    drawMetric(64, t.regionsProgress, visitedCount, locations.length);
    drawMetric(636, t.speciesProgress, ownedCount, totalFinds);

    const visitedNames = localizedMuseumLocations
      .filter(({ original }) => progress.visitedLocations.includes(original.id))
      .map(({ localized }) => localized.shortName);
    const collectedEntries = localizedMuseumLocations.flatMap(({ original, localized }) => original.finds.map((originalFind, index) => ({
      key: museumFindKey(original, originalFind),
      label: `${localized.shortName} · ${localized.finds[index].name}`,
      stars: rarityStars(originalFind.rarity),
    }))).filter((entry) => progress.ownedFinds.includes(entry.key));

    context.fillStyle = "#ffd166";
    context.font = "600 16px monospace";
    context.fillText(t.visitedList, 66, 390);
    context.fillText(t.collectionList, 476, 390);

    const shownVisited = visitedNames.length ? visitedNames : [t.noneYet];
    shownVisited.slice(0, 6).forEach((name, index) => {
      const y = 424 + index * 35;
      context.fillStyle = visitedNames.length ? "#66ddd0" : "rgba(189,232,242,.45)";
      context.fillRect(68, y - 14, 16, 16);
      if (visitedNames.length) {
        context.fillStyle = "#043d55";
        context.font = "700 12px monospace";
        context.fillText("✓", 71, y - 2);
      }
      context.fillStyle = "#f2fbff";
      context.font = language === "zh" ? "500 18px sans-serif" : "500 17px monospace";
      context.fillText(name, 96, y, 330);
    });

    const shownCollected = collectedEntries.length ? collectedEntries.slice(0, 10) : [{ label: t.noneYet, stars: 0, key: "empty" }];
    shownCollected.forEach((entry, index) => {
      const column = index % 2;
      const row = Math.floor(index / 2);
      const x = 476 + column * 340;
      const y = 426 + row * 39;
      context.fillStyle = entry.stars === 0 ? "#087a9b" : entry.stars >= 5 ? "#6d5418" : entry.stars >= 3 ? "#465864" : "#684231";
      context.fillRect(x, y - 22, 320, 31);
      context.fillStyle = "#f2fbff";
      context.font = language === "zh" ? "500 14px sans-serif" : "500 13px monospace";
      const shortLabel = entry.label.length > 25 ? `${entry.label.slice(0, 24)}…` : entry.label;
      context.fillText(shortLabel, x + 10, y - 2, 190);
      for (let star = 0; star < 5; star += 1) {
        drawExportStarfish(context, x + 223 + star * 18, y - 7, 7, star < entry.stars ? "#ffd166" : "rgba(189,232,242,.2)");
      }
    });
    if (collectedEntries.length > shownCollected.length) {
      context.fillStyle = "#bde8f2";
      context.font = language === "zh" ? "400 13px sans-serif" : "400 12px monospace";
      context.fillText(`+ ${collectedEntries.length - shownCollected.length} ${t.more}`, 816, 632);
    }

    context.fillStyle = "#bde8f2";
    context.font = "400 12px monospace";
    context.fillText(`${new Date().toLocaleDateString(language === "zh" ? "zh-CN" : "en-GB")} · ${window.location.host}`, 66, 625);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fossil-collection-card-${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section className="museum-view" aria-label={t.title}>
      <div className="museum-shell">
        <button className="museum-back" onClick={onBack}><span>←</span> {t.back}</button>

        <header className="museum-hero">
          <div>
            <p>{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <span>{t.intro}</span>
          </div>
          <div className="museum-hero-mark" aria-hidden="true"><AmmoniteMark /><b>M</b></div>
        </header>

        <section className="museum-tracker" aria-label={t.trackerTitle}>
          <div className="museum-tracker-copy">
            <span>{t.progress}</span>
            <h2>{t.trackerTitle}</h2>
            <p>{t.trackerIntro}</p>
            <div className="museum-tracker-actions">
              <button className={`museum-sync sync-${syncState}`} onClick={() => profileId && void loadProgress(profileId)} disabled={!profileId || syncState === "loading" || syncState === "saving"}>
                <i /> {syncLabel}{syncState === "error" ? ` · ${t.reload}` : ""}
              </button>
              <button className="museum-export" onClick={() => void exportCollectionCard()} disabled={syncState === "loading"}>
                <i>↓</i><span>{t.exportCard}<small>{t.exportHint}</small></span>
              </button>
            </div>
          </div>
          <div className="museum-progress-grid">
            <div>
              <span>{t.regionsProgress}</span><strong>{visitedCount}<small> / {locations.length}</small></strong>
              <progress max={locations.length} value={visitedCount} />
            </div>
            <div>
              <span>{t.speciesProgress}</span><strong>{ownedCount}<small> / {totalFinds}</small></strong>
              <progress max={totalFinds} value={ownedCount} />
            </div>
          </div>
        </section>

        <section className="museum-filters">
          <div>
            <span>{t.regionFilter}</span>
            <div className="museum-chip-row">
              <button className={regionFilter === "all" ? "active" : ""} onClick={() => setRegionFilter("all")}>{t.allRegions}</button>
              {localizedMuseumLocations.map(({ original, localized }) => (
                <button key={original.id} className={regionFilter === original.id ? "active" : ""} onClick={() => setRegionFilter(original.id)}>
                  {localized.shortName}
                  {progress.visitedLocations.includes(original.id) && <i aria-label={t.visited}>✓</i>}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span>{t.categoryFilter}</span>
            <div className="museum-chip-row category-chips">
              <button className={categoryFilter === "all" ? "active" : ""} onClick={() => setCategoryFilter("all")}>{t.allCategories}</button>
              {categories.map((category) => (
                <button key={category} className={categoryFilter === category ? "active" : ""} onClick={() => setCategoryFilter(category)}>
                  {language === "zh" ? fossilCategoryZh[category] ?? category : category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="museum-category-note">
          <span>{t.categoryIntro}</span>
          <h2>{categoryFilter === "all" ? t.allCategories : language === "zh" ? fossilCategoryZh[categoryFilter] ?? categoryFilter : categoryFilter}</h2>
          <p>{categoryDescription}</p>
          <small><StarfishRating value={5} label={t.rarity} /> {t.starScale}</small>
        </aside>

        <div className="museum-regions">
          {visibleLocations.map(({ original, localized, entries }) => {
            const visited = progress.visitedLocations.includes(original.id);
            return (
              <section className="museum-region" key={original.id}>
                <header className="museum-region-head">
                  <div className="museum-region-title">
                    <PixelSiteIcon id={original.id} compact />
                    <div><span>{localized.region}</span><h2>{localized.name}</h2><p>{localized.period} · {entries.length} {t.entries}</p></div>
                  </div>
                  <div className="museum-region-actions">
                    <button className={visited ? "visited" : ""} aria-pressed={visited} onClick={() => toggleVisited(original.id)}>
                      <i>{visited ? "✓" : "+"}</i>{visited ? t.visited : t.markVisited}
                    </button>
                    <button onClick={() => onOpenLocation(original.id)}>{t.openSite} ↗</button>
                  </div>
                </header>

                <div className="museum-specimen-grid">
                  {entries.map(({ original: originalFind, localized: find }) => {
                    const key = museumFindKey(original, originalFind);
                    const owned = progress.ownedFinds.includes(key);
                    const stars = rarityStars(originalFind.rarity);
                    const revealed = revealedCards.includes(key);
                    return (
                      <article
                        className={`museum-specimen rarity-tier-${rarityTier(stars)} ${owned ? "is-owned" : ""} ${revealed ? "is-flipped" : ""}`}
                        key={key}
                        onMouseEnter={() => setRevealedCards((cards) => cards.includes(key) ? cards : [...cards, key])}
                        onFocus={() => setRevealedCards((cards) => cards.includes(key) ? cards : [...cards, key])}
                      >
                        <div className="museum-card-inner">
                          <button
                            type="button"
                            className="museum-card-back"
                            aria-label={`${language === "zh" ? "翻开卡牌" : "Reveal card"}: ${find.name}`}
                            aria-hidden={revealed}
                            tabIndex={revealed ? -1 : 0}
                            onClick={() => setRevealedCards((cards) => cards.includes(key) ? cards : [...cards, key])}
                          >
                            <span className="museum-card-back-logo"><PixelFossilIcon find={find} /></span>
                            <strong>{originalFind.zh}</strong>
                          </button>
                          <div className="museum-card-front" aria-hidden={!revealed}>
                            <div className="museum-specimen-top">
                              <PixelFossilIcon find={find} />
                              <div><span>{find.category}</span><h3>{find.name}</h3><p>{find.zh}</p></div>
                            </div>
                            <div className="museum-rarity"><span>{t.rarity}</span><StarfishRating value={stars} label={t.rarity} /><b>{stars}/5</b></div>
                            <p className="museum-specimen-tip">{find.tip}</p>
                            <small>{t.size} · {find.size}</small>
                            <button className="museum-collect" tabIndex={revealed ? 0 : -1} aria-pressed={owned} onClick={() => toggleOwned(key)}>
                              <i>{owned ? "✓" : "+"}</i>{owned ? t.collected : t.addCollection}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
          {visibleLocations.length === 0 && <p className="museum-empty">{t.empty}</p>}
        </div>
      </div>
    </section>
  );
}

export function FossilMap() {
  const [introPhase, setIntroPhase] = useState<IntroPhase>("loading");
  const [language, setLanguage] = useState<Language>("zh");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [museumOpen, setMuseumOpen] = useState(false);
  const [modal, setModal] = useState<"about" | "safety" | null>(null);
  const [mobileList, setMobileList] = useState(false);
  const localizedLocations = useMemo(() => locations.map((location) => localizeLocation(location, language)), [language]);
  const selected = useMemo(() => localizedLocations.find((location) => location.id === selectedId) ?? null, [localizedLocations, selectedId]);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedMotionTimer = window.setTimeout(() => setIntroPhase("done"), 0);
      return () => window.clearTimeout(reducedMotionTimer);
    }

    const revealTimer = window.setTimeout(() => setIntroPhase("reveal"), 2200);
    const doneTimer = window.setTimeout(() => setIntroPhase("done"), 3550);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (modal) setModal(null);
        else if (museumOpen) setMuseumOpen(false);
        else if (selectedId) setSelectedId(null);
        else if (mobileList) setMobileList(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, mobileList, museumOpen, selectedId]);

  const openLocation = (id: string) => {
    setMobileList(false);
    setMuseumOpen(false);
    setSelectedId(id);
  };

  return (
    <main className={`site-shell ${selected ? "detail-open" : ""} ${museumOpen ? "museum-open" : ""} lang-${language} intro-${introPhase}`}>
      {introPhase !== "done" && <IntroScreen phase={introPhase} />}
      <header className="topbar">
        <div className="header-left">
          <button className="brand" onClick={() => { setSelectedId(null); setMuseumOpen(false); }} aria-label={t.returnMap}>
            <AmmoniteMark small />
            <span className="brand-title">FOSSIL HUNTERS <small>IN UK</small></span>
          </button>
          <div className="language-toggle" role="group" aria-label={language === "en" ? "Language" : "语言"}>
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
            <span>/</span>
            <button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")} aria-pressed={language === "zh"}>中文</button>
          </div>
        </div>
        <div className="top-actions">
          <button className="museum-link" onClick={() => { setSelectedId(null); setMuseumOpen(true); }}>✦ {t.museum}</button>
          <button className="about-link" onClick={() => setModal("about")}>{t.about}</button>
          <button className="safety-link" onClick={() => setModal("safety")}>
            <span className="alert-dot" /> {t.safetyFirst}
          </button>
        </div>
      </header>

      <section className={`overview ${selected || museumOpen ? "is-zoomed" : ""}`} aria-hidden={Boolean(selected || museumOpen)}>
        <div className="overview-title">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1 className="fossil-title"><span>Fossil Hunters</span><small>in UK</small></h1>
          <p className="adventure-subtitle">{t.heroSubtitle}</p>
        </div>

        <div className="uk-map" aria-label={language === "en" ? "Interactive map of UK fossil locations" : "英国化石地点互动地图"}>
          <div className="north-sea-label">{t.northSea}</div>
          <div className="channel-label">{t.channel}</div>
          <div className="quest-hud" aria-hidden="true">
            <span>{t.questLabel}</span>
            <strong>{t.questTitle}</strong>
            <small>{t.questHint}</small>
            <div><b>N+</b><i>{t.questSites}</i></div>
          </div>
          <div className="uk-plot">
            <div className="uk-silhouette" aria-hidden="true">
              <img className="uk-silhouette-image" src="/uk-pixel-map.png" alt="" draggable={false} />
            </div>

            {localizedLocations.map((location, index) => (
              <button
                key={location.id}
                className={`map-marker ${location.risk === "HIGH" ? "high-risk" : ""} ${location.mapX > 75 ? "popup-left" : "popup-right"}`}
                style={markerStyle(location, index)}
                onClick={() => openLocation(location.id)}
                aria-label={`${t.open} ${location.name}`}
              >
                <span className="marker-pulse" />
                <span className="marker-anchor" />
                <span className="marker-leader" />
                <span className="marker-visual">
                  <PixelSiteIcon id={location.id} />
                  <span className="marker-card">
                    <strong>{location.shortName}</strong>
                    <small>{location.region}</small>
                    <small>{location.period} · {location.finds[0].name}</small>
                    <small>{t.findShort} {location.findRating}/5 · {t.accessShort} {location.accessRating}/5</small>
                    <em>{location.duration} {t.fromLondon}</em>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          className={`location-list-hint ${mobileList ? "is-open" : ""}`}
          type="button"
          aria-controls="field-site-list"
          aria-expanded={mobileList}
          aria-label={t.sitesHint}
          onClick={() => setMobileList((open) => !open)}
        >
          <span aria-hidden="true">››</span>
          <strong>{t.sitesHint}</strong>
        </button>

        <aside id="field-site-list" className={`location-list ${mobileList ? "mobile-open" : ""}`}>
          <div className="list-heading">
            <span>{t.fieldSites}</span>
            <button className="list-close" onClick={() => setMobileList(false)}>{t.close}</button>
          </div>
          {localizedLocations.map((location) => (
            <button key={location.id} onClick={() => openLocation(location.id)}>
              <span className="list-icon-wrap">
                <PixelSiteIcon id={location.id} compact />
                <i>{String(localizedLocations.indexOf(location) + 1).padStart(2, "0")}</i>
              </span>
              <span>
                <strong>{location.shortName}</strong>
                <small>{location.period} · {location.level}</small>
                <small className="list-profile">{t.findShort} {location.findRating}/5 · {t.accessShort} {location.accessRating}/5</small>
              </span>
              <span className={`list-risk ${riskClass(location.risk)}`}>{riskLabel(location.risk, language)}</span>
            </button>
          ))}
        </aside>

        <button className="mobile-sites-button" onClick={() => setMobileList(true)}>
          {t.explore} <span>↑</span>
        </button>

        <small className="map-credit-note">{t.mapCredit}</small>
      </section>

      {selected && <LocationDetail location={selected} language={language} onBack={() => setSelectedId(null)} />}

      {museumOpen && <MuseumView language={language} onBack={() => setMuseumOpen(false)} onOpenLocation={openLocation} />}

      <NautilusGuide key={language} language={language} siteLocations={localizedLocations} onOpenLocation={openLocation} />

      {modal && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setModal(null)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => setModal(null)} aria-label={t.close}>×</button>
            {modal === "about" ? (
              <>
                <p className="eyebrow">{t.aboutEyebrow}</p>
                <h2 id="modal-title">{t.aboutTitle}</h2>
                <p>{t.aboutBody}</p>
                <div className="modal-note"><strong>{t.approxStrong}</strong> {t.approxBody}</div>
                <div className="about-thanks">
                  <span aria-hidden="true">✦</span>
                  <div><h3>{t.thanksTitle}</h3><p>{t.thanksBody}</p></div>
                  <div className="about-fossil-pile" aria-hidden="true">
                    <span className="pixel-fossil fossil-ammonite fossil-piece piece-ammonite-one"><i /><b /><em /></span>
                    <span className="pixel-fossil fossil-shell fossil-piece piece-shell-one"><i /><b /><em /></span>
                    <span className="pixel-fossil fossil-ammonite fossil-piece piece-ammonite-two"><i /><b /><em /></span>
                    <span className="pixel-fossil fossil-shell fossil-piece piece-shell-two"><i /><b /><em /></span>
                    <span className="pixel-fossil fossil-ammonite fossil-piece piece-ammonite-three"><i /><b /><em /></span>
                    <span className="pixel-fossil fossil-shell fossil-piece piece-shell-three"><i /><b /><em /></span>
                    <i className="about-pearl pearl-one" /><i className="about-pearl pearl-two" /><i className="about-pearl pearl-three" />
                  </div>
                </div>
                <p className="fine-print">{t.changing}</p>
              </>
            ) : (
              <>
                <p className="eyebrow danger">{t.beforeTrip}</p>
                <h2 id="modal-title">{t.tideDeadline}</h2>
                <div className="safety-grid">
                  {t.safetyCards.map((card, index) => <div key={card[0]}><b>{String(index + 1).padStart(2, "0")}</b><strong>{card[0]}</strong><p>{card[1]}</p></div>)}
                </div>
                <div className="modal-note warning"><strong>{t.emergencyStrong}</strong> {t.emergencyBody}</div>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

function LocationDetail({ location, language, onBack }: { location: Location; language: Language; onBack: () => void }) {
  const t = detailCopy[language];
  const locationNumber = String(locations.findIndex((item) => item.id === location.id) + 1).padStart(2, "0");
  const geology = location.geology?.[language];

  return (
    <section className="detail-view detail-text-only">
      <div className="detail-safety">
        <span className={`risk-pill ${riskClass(location.risk)}`}>{riskLabel(location.risk, language)} {t.risk}</span>
        <p>{location.safetyLead}</p>
      </div>

      <aside className="info-panel">
        <button className="back-button" onClick={onBack}><span>←</span> {t.allSites}</button>
        <div className="place-heading" style={{ "--place-accent": location.accent } as React.CSSProperties}>
          <div className="place-symbol"><PixelSiteIcon id={location.id} /><span>{locationNumber}</span></div>
          <div>
            <p>{location.region}</p>
            <h2>{location.name}</h2>
            <div className="place-tags"><span>{location.period}</span><span>{location.type}</span><span>{location.level}</span></div>
            <div className="field-profile">
              <ProfileRating label={t.findFrequency} rating={location.findRating} />
              <ProfileRating label={t.accessRating} rating={location.accessRating} />
              <ProfileRating label={t.familyRating} rating={location.familyRating} />
            </div>
          </div>
        </div>

        <nav className="section-nav" aria-label={t.locationDetails}>
          <a href="#get-there">{t.navRoute}</a>
          {geology && <a href="#geology">{t.navGeology}</a>}
          <a href="#finds">{t.navFinds}</a>
          <a href="#equipment">{t.navKit}</a>
          <a href="#rules">{t.navRules}</a>
        </nav>

        <div className="panel-content">
          <section className="info-section route-section" id="get-there">
            <SectionTitle number="01" title={t.section1} />
            <div className="journey-time"><span>{t.typicalTotal}</span><strong>{location.duration}</strong></div>
            <div className="journey-steps">
              <JourneyStep label={t.london} value={location.departure} detail={t.recommendedDeparture} />
              <JourneyStep label={t.train} value={location.station} detail={t.checkService} />
              <JourneyStep label={t.local} value={location.local} detail={location.walk} />
            </div>
            <div className="action-row">
              <a className="primary-action" href={location.railLink} target="_blank" rel="noreferrer">{t.planRail} <span>↗</span></a>
              <a className="secondary-action" href={location.mapsLink} target="_blank" rel="noreferrer">{t.openMaps}</a>
            </div>
          </section>

          <section className="info-section" id="route">
            <SectionTitle number="02" title={t.section2} />
            <ol className="route-list">
              {location.route.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}
            </ol>
            <div className="route-facts">
              <p><span>{t.terrain}</span>{location.terrain}</p>
              <p><span>{t.exit}</span>{location.exit}</p>
            </div>
          </section>

          {geology && (
            <section className="info-section geology-section" id="geology">
              <SectionTitle number="GEO" title={t.geologyTitle} />
              <p className="geology-intro">{geology.intro}</p>
              <div className="geology-label">{t.formations}</div>
              <div className="geology-units">
                {geology.units.map((unit, index) => (
                  <article key={unit.name}>
                    <header>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div><h3>{unit.name}</h3><small>{unit.age}</small></div>
                    </header>
                    <p className="geology-environment"><span>{t.environment}</span>{unit.environment}</p>
                    <p>{unit.description}</p>
                    <p className="geology-fossils"><span>{t.typicalFossils}</span>{unit.fossils}</p>
                  </article>
                ))}
              </div>
              <div className="geology-notes">
                <div>
                  <span>{t.bedContext}</span>
                  <ol>{geology.beds.map((bed) => <li key={bed}>{bed}</li>)}</ol>
                </div>
                <aside><span>{t.fieldRule}</span><p>{geology.fieldNote}</p></aside>
              </div>
              <a className="geology-source" href={geology.sourceLink} target="_blank" rel="noreferrer">
                <span>{t.reference}</span>{geology.sourceLabel} ↗
              </a>
            </section>
          )}

          <section className="info-section" id="finds">
            <SectionTitle number="03" title={t.section3} />
            <div className="finds-grid">
              {location.finds.map((find) => (
                <article key={find.name}>
                  <div className="find-card-top">
                    <PixelFossilIcon find={find} />
                    <div><span className="find-category">{find.category}</span><h3>{find.name}</h3><p className="find-zh">{find.zh}</p></div>
                  </div>
                  <span className={`rarity ${rarityClass(find.rarity)}`}>{find.rarity}</span>
                  <p>{find.tip}</p>
                  <small>{t.typical} · {find.size}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="info-section" id="time">
            <SectionTitle number="04" title={t.section4} />
            <div className="time-hero"><span>{t.recommendedWindow}</span><strong>{location.tideWindow}</strong></div>
            <div className="time-grid">
              <p><span>{t.season}</span>{location.season}</p>
              <p><span>{t.conditions}</span>{location.conditions}</p>
            </div>
            {location.tideLink ? (
              <a className="tide-action" href={location.tideLink} target="_blank" rel="noreferrer">{t.checkTide} <span>↗</span></a>
            ) : <div className="not-applicable">{t.tideNA}</div>}
            <p className="caveat">{t.caveat}</p>
          </section>

          <section className="info-section" id="equipment">
            <SectionTitle number="05" title={t.section5} />
            <KitList title={t.bring} symbol="✓" items={location.required} />
            <KitList title={t.useful} symbol="+" items={location.useful} />
            <KitList title={t.avoid} symbol="×" items={location.avoid} danger />
          </section>

          <section className="info-section safety-section" id="safety">
            <SectionTitle number="06" title={t.section6} />
            <div className={`large-risk ${riskClass(location.risk)}`}><span>{t.fieldRisk}</span><strong>{riskLabel(location.risk, language)}</strong></div>
            <ul className="hazard-list">{location.hazards.map((hazard) => <li key={hazard}><span>!</span>{hazard}</li>)}</ul>
            <div className="coastguard-note">{t.coastguardA} <strong>999</strong> {t.coastguardB} <strong>Coastguard</strong>.</div>
          </section>

          <section className="info-section rules-section" id="rules">
            <SectionTitle number="07" title={t.section7} />
            <div className="sssi-card"><span>{t.status}</span><strong>{location.sssi}</strong><p>{t.siteSpecific}</p></div>
            <ul>{location.rules.map((rule) => <li key={rule}><span>→</span>{rule}</li>)}</ul>
            <div className="source-block">
              <div><span>{t.source}</span><a href={location.sourceLink} target="_blank" rel="noreferrer">{location.source} ↗</a></div>
              <div><span>{t.reviewed}</span><strong>{location.verified}</strong></div>
              <p>{t.precision}</p>
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

function ProfileRating({ label, rating }: { label: string; rating: number }) {
  return (
    <div className="profile-rating">
      <span>{label}</span>
      <div aria-label={`${label}: ${rating} / 5`}>
        {[1, 2, 3, 4, 5].map((value) => <i key={value} className={value <= rating ? "filled" : ""} />)}
      </div>
    </div>
  );
}
