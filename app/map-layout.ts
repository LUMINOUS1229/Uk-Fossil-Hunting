// Label positions use the same percentage coordinate space as the existing map.
// Only the labels move: mapX/mapY remain the geographic anchors.
export const mapLabels: Record<string, { x: number; y: number }> = {
  "lyme-regis": { x: 40, y: 111 },
  charmouth: { x: 43, y: 100 },
  weymouth: { x: 57, y: 102 },
  "fort-victoria": { x: 59, y: 115 },
  "grange-chine": { x: 71, y: 118 },
  "barton-on-sea": { x: 72, y: 102 },
  "isle-of-wight": { x: 83, y: 115 },
  bracklesham: { x: 84, y: 101 },
  hastings: { x: 99, y: 106 },
  folkestone: { x: 109, y: 96 },
  "herne-bay": { x: 111, y: 85 },
  "warden-point": { x: 109, y: 74 },
  walton: { x: 98, y: 75 },
  nacton: { x: 98, y: 66 },
  "abbey-wood": { x: 80, y: 75 },
  "wootton-bassett": { x: 57, y: 81 },
  "ardley-quarry": { x: 62, y: 68 },
  "kirtlington-quarry": { x: 58, y: 75 },
  "woodeaton-quarry": { x: 72, y: 81 },
  peterborough: { x: 72, y: 64 },
  whitby: { x: 78, y: 42 },
};

export const coastGroups = [
  { id: "southwest", zh: "西南岸", en: "Dorset coast", x: 35, y: 108, members: ["lyme-regis", "charmouth", "weymouth"] },
  { id: "central", zh: "南岸", en: "South coast", x: 74, y: 130, members: ["fort-victoria", "grange-chine", "barton-on-sea", "isle-of-wight", "bracklesham"] },
  { id: "southeast", zh: "东南岸", en: "South-east", x: 97, y: 91, members: ["hastings", "folkestone", "herne-bay", "warden-point"] },
] as const;

export const COAST_CLUSTER_WIDTH = 470;

export function mapLabelFor(location: { id: string; mapX: number; mapY: number }) {
  return mapLabels[location.id] ?? { x: location.mapX, y: location.mapY };
}
