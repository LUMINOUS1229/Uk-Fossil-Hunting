"use client";

import { useEffect, useMemo, useState } from "react";

type Risk = "LOW" | "MODERATE" | "HIGH";
type Language = "en" | "zh";

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
    findRating: 5,
    accessRating: 3,
    familyRating: 3,
    mapX: 86,
    mapY: 90,
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
    findRating: 5,
    accessRating: 4,
    familyRating: 4,
    mapX: 82,
    mapY: 84,
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
    findRating: 5,
    accessRating: 3,
    familyRating: 4,
    mapX: 84,
    mapY: 76,
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
    findRating: 5,
    accessRating: 2,
    familyRating: 1,
    mapX: 44,
    mapY: 80,
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
    findRating: 5,
    accessRating: 5,
    familyRating: 5,
    mapX: 64,
    mapY: 92,
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
    findRating: 5,
    accessRating: 4,
    familyRating: 4,
    mapX: 41,
    mapY: 94,
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
    level: "有一定经验的新手",
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
    findTips: ["寻找带肋纹的螺旋或珍珠光泽外壳。", "深色黏土中的子弹状鞘。", "壳体上可见五瓣花纹。", "黏土结核中呈瘤状的甲壳。"],
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
};

const rarityZh: Record<string, string> = {
  Common: "常见",
  Occasional: "偶见",
  Uncommon: "少见",
  Rare: "罕见",
  "Very rare": "非常罕见",
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
      rarity: rarityZh[find.rarity] ?? find.rarity,
      tip: translation.findTips[index],
    })),
  };
};

const copy = {
  en: {
    returnMap: "Return to UK map", about: "About", safetyFirst: "Safety first",
    heroEyebrow: "6 FIELD SITES · ROUTES FROM LONDON", heroTitle: "UK Fossil Hunters", heroSubtitle: "Let’s go exploring.",
    scopeSites: "FIELD SITES", scopeStart: "STARTING FROM", scopeStartValue: "LONDON", scopeCheck: "CHECK BEFORE", scopeCheckValue: "TIDE & ACCESS",
    northSea: "NORTH SEA", channel: "ENGLISH CHANNEL", london: "London", open: "Open",
    fromLondon: "from London", fieldSites: "FIELD SITES · 06", close: "Close", explore: "Explore 6 field sites", findShort: "Finds", accessShort: "Access",
    routeToggle: "From London routes", fieldSite: "Field site", research: "In research", railRoute: "Rail route",
    mapCredit: "Map data © OpenStreetMap contributors", researchLabel: "IN RESEARCH", dismiss: "Dismiss",
    aboutEyebrow: "About this field map", aboutTitle: "A route planner, not a promise.",
    aboutBody: "This map turns scattered fossil guides into six practical journeys from London. Each field sheet combines the train, last-mile walk, approximate collecting zone, likely finds and the rules that matter on the day.",
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
    returnMap: "返回英国总览地图", about: "关于", safetyFirst: "安全须知",
    heroEyebrow: "6 个重点地点 · 从伦敦出发", heroTitle: "英国化石猎人", heroSubtitle: "一起去探险吧。",
    scopeSites: "收录地点", scopeStart: "默认出发地", scopeStartValue: "伦敦", scopeCheck: "出发前确认", scopeCheckValue: "潮汐与通行",
    northSea: "北海", channel: "英吉利海峡", london: "伦敦", open: "打开",
    fromLondon: "从伦敦出发", fieldSites: "重点地点 · 06", close: "关闭", explore: "探索 6 个重点地点", findShort: "发现", accessShort: "通行",
    routeToggle: "显示伦敦出发路线", fieldSite: "完整地点", research: "调研中", railRoute: "铁路路线",
    mapCredit: "地图数据 © OpenStreetMap 贡献者", researchLabel: "调研中", dismiss: "关闭",
    aboutEyebrow: "关于这张野外地图", aboutTitle: "它是路线计划，不是安全承诺。",
    aboutBody: "这张地图把分散的化石攻略整理成六条从伦敦出发的实际行程。每张地点卡都结合了火车、最后一段步行、大致采集区、常见化石和当天必须遵守的规则。",
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
    locationDetails: "Location details", navRoute: "Route", navFinds: "Finds", navKit: "Kit", navRules: "Rules",
    section1: "How to get there", section2: "Recommended route", section3: "What you may find", section4: "Best time to visit",
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
  },
  zh: {
    risk: "风险", lowWater: "低潮水位", collectingArea: "大致采集区域", hazard: "危险区域", rail: "铁路",
    nearestStation: "最近火车站", access: "海滩 / 现场入口", recommendedStart: "推荐起点", exitPoint: "撤离点",
    cafe: "咖啡馆", onFoot: "步行", actionMap: "行动地图 · 坐标为近似位置",
    walkingRoute: "步行路线", collectingKey: "采集区域", hazardKey: "危险区域", allSites: "返回英国全部地点",
    locationDetails: "地点信息", navRoute: "路线", navFinds: "化石", navKit: "装备", navRules: "规则",
    section1: "如何抵达", section2: "推荐现场路线", section3: "可能找到什么", section4: "最佳前往时间",
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
  },
} as const;

const upcoming = [
  { name: "Whitby", x: 68, y: 48, note: "Jurassic ammonites · route risk review", noteZh: "侏罗纪菊石 · 路线风险审核中" },
  { name: "West Runton", x: 91, y: 65, note: "Mammal remains · collecting restrictions", noteZh: "哺乳动物遗存 · 采集限制审核中" },
  { name: "Warden Point", x: 78, y: 81, note: "London Clay · coming soon", noteZh: "伦敦黏土层 · 即将上线" },
  { name: "Abbey Wood", x: 69, y: 82, note: "Permission required", noteZh: "需要事先获得许可" },
  { name: "Yaverland", x: 69, y: 94, note: "Dinosaur remains · coming soon", noteZh: "恐龙遗存 · 即将上线" },
  { name: "Samphire Hoe", x: 89, y: 91, note: "Chalk fossils · coming soon", noteZh: "白垩化石 · 即将上线" },
];

const londonPoint = { x: 70, y: 84 };

const riskClass = (risk: Risk) => `risk-${risk.toLowerCase()}`;
const riskLabel = (risk: Risk, language: Language) => language === "en" ? risk : ({ LOW: "低", MODERATE: "中", HIGH: "高" }[risk]);

function AmmoniteMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`ammonite-mark ${small ? "small" : ""}`} aria-hidden="true">
      <span />
    </span>
  );
}

export function FossilMap() {
  const [language, setLanguage] = useState<Language>("zh");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showLondon, setShowLondon] = useState(true);
  const [modal, setModal] = useState<"about" | "safety" | null>(null);
  const [comingSoon, setComingSoon] = useState<string | null>(null);
  const [mobileList, setMobileList] = useState(false);
  const localizedLocations = useMemo(() => locations.map((location) => localizeLocation(location, language)), [language]);
  const selected = useMemo(() => localizedLocations.find((location) => location.id === selectedId) ?? null, [localizedLocations, selectedId]);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

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
    <main className={`site-shell ${selected ? "detail-open" : ""} lang-${language}`}>
      <header className="topbar">
        <div className="header-left">
          <button className="brand" onClick={() => setSelectedId(null)} aria-label={t.returnMap}>
            <AmmoniteMark small />
            <span>UK FOSSIL HUNTING</span>
          </button>
          <div className="language-toggle" role="group" aria-label={language === "en" ? "Language" : "语言"}>
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
            <span>/</span>
            <button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")} aria-pressed={language === "zh"}>中文</button>
          </div>
        </div>
        <div className="top-actions">
          <button onClick={() => setModal("about")}>{t.about}</button>
          <button className="safety-link" onClick={() => setModal("safety")}>
            <span className="alert-dot" /> {t.safetyFirst}
          </button>
        </div>
      </header>

      <section className={`overview ${selected ? "is-zoomed" : ""}`} aria-hidden={Boolean(selected)}>
        <div className="overview-title">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="adventure-subtitle">{t.heroSubtitle}</p>
          <dl className="guide-scope">
            <div><dt>{t.scopeSites}</dt><dd>06</dd></div>
            <div><dt>{t.scopeStart}</dt><dd>{t.scopeStartValue}</dd></div>
            <div><dt>{t.scopeCheck}</dt><dd>{t.scopeCheckValue}</dd></div>
          </dl>
        </div>

        <div className="uk-map" aria-label={language === "en" ? "Interactive map of UK fossil locations" : "英国化石地点互动地图"}>
          <div className="north-sea-label">{t.northSea}</div>
          <div className="channel-label">{t.channel}</div>
          <div className="uk-plot">
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

            <div className="london-node" style={{ left: `${londonPoint.x}%`, top: `${londonPoint.y}%` }}>
              <span />
              <b>{t.london}</b>
            </div>

            {showLondon && localizedLocations.map((location) => {
              const dx = location.mapX - londonPoint.x;
              const dy = location.mapY - londonPoint.y;
              const left = Math.min(location.mapX, londonPoint.x);
              const top = Math.min(location.mapY, londonPoint.y);
              const width = Math.max(Math.abs(dx), 0.35);
              const height = Math.max(Math.abs(dy), 0.35);
              const direction = (dx >= 0 && dy >= 0) || (dx < 0 && dy < 0) ? "down-right" : "down-left";
              return (
                <span
                  key={`line-${location.id}`}
                  className={`london-route ${direction}`}
                  style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
                />
              );
            })}

            {localizedLocations.map((location, index) => (
              <button
                key={location.id}
                className={`map-marker ${location.risk === "HIGH" ? "high-risk" : ""}`}
                style={{ left: `${location.mapX}%`, top: `${location.mapY}%`, "--delay": `${index * 80}ms` } as React.CSSProperties}
                onClick={() => openLocation(location.id)}
                aria-label={`${t.open} ${location.name}`}
              >
                <span className="marker-pulse" />
                <AmmoniteMark small />
                <span className="marker-card">
                  <strong>{location.shortName}</strong>
                  <small>{location.period} · {location.finds[0].name}</small>
                  <small>{t.findShort} {location.findRating}/5 · {t.accessShort} {location.accessRating}/5</small>
                  <em>{location.duration} {t.fromLondon}</em>
                </span>
              </button>
            ))}

            {upcoming.map((place) => (
              <button
                key={place.name}
                className="future-marker"
                style={{ left: `${place.x}%`, top: `${place.y}%` }}
                onClick={() => setComingSoon(place.name)}
                aria-label={`${place.name}, ${t.research}`}
              >
                <span />
                <small>{place.name}</small>
              </button>
            ))}
          </div>
        </div>

        <aside className={`location-list ${mobileList ? "mobile-open" : ""}`}>
          <div className="list-heading">
            <span>{t.fieldSites}</span>
            <button className="list-close" onClick={() => setMobileList(false)}>{t.close}</button>
          </div>
          {localizedLocations.map((location) => (
            <button key={location.id} onClick={() => openLocation(location.id)}>
              <span className="list-index">{String(localizedLocations.indexOf(location) + 1).padStart(2, "0")}</span>
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

        <div className="map-controls">
          <label className="route-toggle">
            <input type="checkbox" checked={showLondon} onChange={(event) => setShowLondon(event.target.checked)} />
            <span className="toggle-track"><span /></span>
            {t.routeToggle}
          </label>
          <div className="legend">
            <span><i className="legend-site" /> {t.fieldSite}</span>
            <span><i className="legend-future" /> {t.research}</span>
            <span><i className="legend-rail" /> {t.railRoute}</span>
          </div>
          <small>{t.mapCredit}</small>
        </div>

        {comingSoon && (
          <div className="coming-toast" role="status">
            <span>{t.researchLabel}</span>
            <strong>{comingSoon}</strong>
            <p>{language === "zh" ? upcoming.find((place) => place.name === comingSoon)?.noteZh : upcoming.find((place) => place.name === comingSoon)?.note}</p>
            <button onClick={() => setComingSoon(null)}>{t.dismiss}</button>
          </div>
        )}
      </section>

      {selected && <LocationDetail location={selected} language={language} onBack={() => setSelectedId(null)} />}

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

  return (
    <section className="detail-view">
      <div className="detail-safety">
        <span className={`risk-pill ${riskClass(location.risk)}`}>{riskLabel(location.risk, language)} {t.risk}</span>
        <p>{location.safetyLead}</p>
      </div>

      <div className="field-map">
        <div className="field-water"><span>{t.lowWater}</span></div>
        <div className="field-land" />
        <div className="cliff-line" />
        <div className="collecting-zone">
          <span>{t.collectingArea}</span>
        </div>
        <div className="hazard-zone"><span>{t.hazard}</span></div>
        <div className="rail-track"><span>{t.rail}</span></div>
        <div className="walk-route route-one" />
        <div className="walk-route route-two" />
        <div className="exit-route" />
        <div className="map-node station-node"><i>◆</i><strong>{location.station}</strong><small>{t.nearestStation}</small></div>
        <div className="map-node access-node"><i>●</i><strong>{t.access}</strong><small>{t.recommendedStart}</small></div>
        <div className="map-node escape-node"><i>↗</i><strong>{t.exitPoint}</strong><small>{location.exit.split(/[;；]/)[0]}</small></div>
        <div className="map-amenity café">{t.cafe}</div>
        <div className="map-amenity toilets">WC</div>
        <div className="route-note"><span>{t.onFoot}</span><strong>{location.walk}</strong></div>
        <div className="field-map-title">
          <span>{t.actionMap}</span>
          <strong>{location.shortName.toUpperCase()}</strong>
        </div>
        <div className="field-legend">
          <span><i className="key-walk" /> {t.walkingRoute}</span>
          <span><i className="key-zone" /> {t.collectingKey}</span>
          <span><i className="key-hazard" /> {t.hazardKey}</span>
        </div>
        <small className="osm-credit">{copy[language].mapCredit}</small>
      </div>

      <aside className="info-panel">
        <button className="back-button" onClick={onBack}><span>←</span> {t.allSites}</button>
        <div className="place-heading" style={{ "--place-accent": location.accent } as React.CSSProperties}>
          <div className="place-number">{locationNumber}</div>
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

          <section className="info-section" id="finds">
            <SectionTitle number="03" title={t.section3} />
            <div className="finds-grid">
              {location.finds.map((find) => (
                <article key={find.name}>
                  <span className="find-glyph">{find.glyph}</span>
                  <div><h3>{find.name}</h3><p className="find-zh">{find.zh}</p></div>
                  <span className="rarity">{find.rarity}</span>
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
