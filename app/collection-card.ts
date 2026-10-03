export type CollectionCardData = {
  language: "zh" | "en";
  visited: string[];
  specimens: { name: string; region: string; stars: number }[];
  totalRegions: number;
  totalSpecimens: number;
  date: string;
  host: string;
  displayFont?: string;
};

export const COLLECTION_CARD_WIDTH = 1080;
export const COLLECTION_CARD_HEIGHT = 1440;

/** A self-contained, portrait counterpart to the celestial museum card deck. */
export function drawCollectionCard(context: CanvasRenderingContext2D, data: CollectionCardData) {
  const zh = data.language === "zh";
  const c = { wine: "#63283c", deep: "#401e30", gold: "#d6b578", light: "#f6e0a9", paper: "#fff6e3", ink: "#4b2937", muted: "#795c55", line: "#dac69f" };
  const serif = `${data.displayFont || "Georgia"}, "Songti SC", "STSong", serif`;
  const sans = '"PingFang SC", "Microsoft YaHei", Arial, sans-serif';
  const metal = context.createLinearGradient(0, 0, 1080, 1440);
  [[0, "#a76c3c"], [.23, "#f6e0a9"], [.48, "#bf9554"], [.73, "#f6e0a9"], [1, "#a76c3c"]].forEach(([stop, color]) => metal.addColorStop(stop as number, color as string));
  const line = (x1: number, y1: number, x2: number, y2: number, color = c.gold, width = 1) => {
    context.beginPath(); context.moveTo(x1, y1); context.lineTo(x2, y2);
    context.strokeStyle = color; context.lineWidth = width; context.stroke();
  };
  const ellipse = (x: number, y: number, rx: number, ry: number, color = c.gold, rotation = 0) => {
    context.beginPath(); context.ellipse(x, y, rx, ry, rotation, 0, Math.PI * 2);
    context.strokeStyle = color; context.lineWidth = 1.5; context.stroke();
  };
  const sparkle = (x: number, y: number, radius: number, color = c.gold) => {
    context.beginPath();
    for (let p = 0; p < 8; p++) {
      const angle = -Math.PI / 2 + p * Math.PI / 4;
      const r = p % 2 ? radius * .23 : radius;
      if (!p) context.moveTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
      else context.lineTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
    }
    context.closePath(); context.fillStyle = color; context.fill();
  };
  // Fit by measurement, not Canvas's maxWidth, which distorts letterforms.
  const text = (value: string, x: number, y: number, size: number, color = c.ink, width = 880, align: CanvasTextAlign = "left", family = sans, weight = 400) => {
    context.font = `${weight} ${size}px ${family}`;
    let fitted = value;
    if (context.measureText(fitted).width > width) {
      const chars = Array.from(value);
      while (chars.length && context.measureText(`${chars.join("")}…`).width > width) chars.pop();
      fitted = `${chars.join("")}…`;
    }
    context.fillStyle = color; context.textAlign = align; context.fillText(fitted, x, y);
  };
  const more = (count: number) => zh ? `另有 ${count} 项未展示` : `+ ${count} more in the archive`;
  const section = (number: string, title: string, y: number, extra = "") => {
    text(number, 116, y, 20, c.muted, 50, "left", serif, 600);
    text(title, 159, y, 26, c.ink, 520, "left", zh ? sans : serif, 600);
    if (extra) text(extra, 964, y - 1, 18, c.muted, 270, "right");
    line(116, y + 18, 964, y + 18, c.line);
  };

  context.save();
  context.textBaseline = "alphabetic";
  const background = context.createLinearGradient(0, 0, 1080, 1440);
  background.addColorStop(0, c.wine); background.addColorStop(1, c.deep);
  context.fillStyle = background; context.fillRect(0, 0, 1080, 1440);
  context.strokeStyle = metal; context.lineWidth = 5; context.strokeRect(26, 26, 1028, 1388);
  context.lineWidth = 1; context.strokeRect(39, 39, 1002, 1362); context.strokeRect(47, 47, 986, 1346);
  [[58, 58], [1022, 58], [58, 1382], [1022, 1382]].forEach(([x, y]) => sparkle(x, y, 20, c.light));
  // The deck's sun crown and orbital rings become the archive's seal.
  ellipse(540, 110, 34, 34); ellipse(540, 110, 42, 42);
  ellipse(540, 110, 75, 22, c.gold, -.2);
  for (let p = 0; p < 16; p++) {
    const angle = p * Math.PI / 8;
    line(540 + Math.cos(angle) * 47, 110 + Math.sin(angle) * 47, 540 + Math.cos(angle) * (p % 2 ? 54 : 62), 110 + Math.sin(angle) * (p % 2 ? 54 : 62));
  }
  sparkle(540, 110, 24, c.light);
  line(115, 110, 420, 110); line(660, 110, 965, 110);
  sparkle(115, 110, 7); sparkle(965, 110, 7);
  text("F O S S I L   H U N T E R S   I N   U K", 540, 198, 18, c.light, 850, "center");
  text(zh ? "化石野外收藏卡" : "The Field Collection", 540, 263, zh ? 60 : 70, c.paper, 850, "center", serif, 600);
  text(zh ? "THE FIELD COLLECTION · 个人图鉴档案" : "A PERSONAL MUSEUM RECORD", 540, 305, 19, c.gold, 850, "center");

  context.fillStyle = c.paper;
  context.beginPath(); context.roundRect(76, 341, 928, 947, [70, 70, 8, 8]); context.fill();
  context.strokeStyle = metal; context.lineWidth = 2; context.stroke();
  context.strokeStyle = c.line; context.lineWidth = 1;
  context.beginPath(); context.roundRect(87, 352, 906, 925, [61, 61, 4, 4]); context.stroke();

  const metric = (x: number, value: number, total: number, label: string) => {
    const percent = total ? Math.round(value / total * 100) : 0;
    ellipse(x, 455, 83, 73, c.line); ellipse(x, 455, 92, 79, c.line, -.15);
    sparkle(x - 98, 455, 9, c.wine); sparkle(x + 98, 455, 9, c.wine);
    text(String(value).padStart(2, "0"), x, 478, 82, c.wine, 155, "center", serif, 600);
    text(`/ ${total}`, x, 517, 20, c.muted, 130, "center", serif);
    text(label, x, 565, 23, c.ink, 350, "center");
    context.fillStyle = "#e9dcc4"; context.fillRect(x - 120, 588, 192, 4);
    context.fillStyle = c.wine; context.fillRect(x - 120, 588, 192 * percent / 100, 4);
    text(`${percent}%`, x + 126, 596, 17, c.muted, 50, "right");
  };
  metric(326, data.visited.length, data.totalRegions, zh ? "已走过地区" : "Regions visited");
  metric(754, data.specimens.length, data.totalSpecimens, zh ? "已收集品种" : "Specimens collected");
  line(540, 395, 540, 573, c.line); sparkle(540, 601, 9, c.wine);

  section("I", zh ? "已到访地区" : "Places explored", 653, data.visited.length > 6 ? more(data.visited.length - 6) : "");
  if (data.visited.length) {
    data.visited.slice(0, 6).forEach((name, i) => {
      const x = 116 + (i % 3) * 291, y = 713 + Math.floor(i / 3) * 53;
      sparkle(x + 8, y - 7, 6, c.wine);
      text(name, x + 27, y, 22, c.ink, 247);
    });
  } else {
    text(zh ? "下一次出发，就是档案的第一页。" : "The next adventure starts the first page.", 540, 736, 25, c.muted, 830, "center", serif);
  }

  section("II", zh ? "已拥有标本" : "Collected specimens", 825, data.specimens.length > 8 ? more(data.specimens.length - 8) : "");
  const entries = data.specimens.slice(0, 8);
  if (entries.length) {
    entries.forEach((entry, i) => {
      const x = 116 + i % 2 * 434, y = 870 + Math.floor(i / 2) * 78;
      context.fillStyle = "#f4ead5"; context.fillRect(x, y, 414, 66);
      context.fillStyle = entry.stars >= 5 ? "#ae7d2d" : entry.stars >= 3 ? "#688294" : "#a76c3c";
      context.fillRect(x, y, 3, 66);
      text(entry.name, x + 15, y + 26, 22, c.ink, 380, "left", zh ? sans : serif, 600);
      text(entry.region, x + 15, y + 52, 17, c.muted, 260);
      for (let star = 0; star < 5; star++) drawExportStarfish(context, x + 320 + star * 18, y + 46, 7, star < entry.stars);
    });
  } else {
    ellipse(540, 989, 49, 49, c.line);
    sparkle(540, 989, 26, c.gold);
    text(zh ? "珍藏，始于一次发现。" : "Every collection begins with a discovery.", 540, 1081, 30, c.ink, 810, "center", serif);
    text(zh ? "在图鉴中记录已拥有的标本，再留下你的收藏卡。" : "Record a specimen in the museum to fill this card.", 540, 1125, 20, c.muted, 810, "center");
  }
  line(116, 1210, 964, 1210, c.line);
  text(zh ? `收藏记录 · ${data.date}` : `ARCHIVED · ${data.date}`, 116, 1246, 17, c.muted, 345);
  text(data.host, 964, 1246, 16, c.muted, 480, "right");
  // Crescent seal, matching the lower edge of the specimen cards.
  context.beginPath(); context.arc(540, 1340, 23, .2 * Math.PI, 1.8 * Math.PI);
  context.bezierCurveTo(528, 1327, 528, 1353, 559, 1354);
  context.fillStyle = metal; context.fill();
  line(246, 1340, 474, 1340); line(606, 1340, 834, 1340);
  sparkle(489, 1340, 7); sparkle(591, 1340, 7);
  text("FIELD NOTES  /  PERSONAL ARCHIVE", 540, 1383, 14, c.gold, 760, "center");
  context.restore();
}

function drawExportStarfish(context: CanvasRenderingContext2D, x: number, y: number, radius: number, filled: boolean) {
  context.save(); context.translate(x, y); context.beginPath();
  for (let point = 0; point < 10; point++) {
    const angle = -Math.PI / 2 + point * Math.PI / 5;
    const r = point % 2 ? radius * .38 : radius;
    if (!point) context.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
    else context.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  context.closePath();
  const metal = context.createLinearGradient(-radius, -radius, radius, radius);
  metal.addColorStop(0, "#a86b10"); metal.addColorStop(.43, "#fff3bd"); metal.addColorStop(.7, "#b77d16"); metal.addColorStop(1, "#ffe29a");
  context.fillStyle = filled ? metal : "#e3d8c4"; context.fill();
  context.strokeStyle = filled ? "#a86b10" : "#c8b99d"; context.lineWidth = .6; context.stroke(); context.restore();
}
