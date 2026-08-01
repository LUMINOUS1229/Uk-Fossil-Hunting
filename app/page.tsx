import type { Metadata } from "next";
import { headers } from "next/headers";
import { FossilMap } from "./FossilMap";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "英国化石猎人 — 从伦敦出发的英国化石路线",
    description:
      "一起去探险吧。查看六条从伦敦出发的英国化石路线、潮汐、安全、装备与采集规则。",
    openGraph: {
      title: "英国化石猎人",
      description: "一起去探险吧。六条从伦敦出发的英国化石路线。",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "UK Fossil Hunting map" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "英国化石猎人",
      description: "一起去探险吧。六条从伦敦出发的英国化石路线。",
      images: [`${origin}/og.png`],
    },
  };
}

export default function Home() {
  return <FossilMap />;
}
