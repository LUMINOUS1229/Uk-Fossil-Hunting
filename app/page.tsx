import type { Metadata } from "next";
import { headers } from "next/headers";
import { FossilMap } from "./FossilMap";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Fossil Hunters in UK — Routes from London",
    description:
      "一起去探险吧。查看八条从伦敦出发的英国化石路线、潮汐、安全、装备与采集规则。",
    openGraph: {
      title: "Fossil Hunters in UK",
      description: "一起去探险吧。八条从伦敦出发的英国化石路线。",
      images: [{ url: `${origin}/og-pixel.png`, width: 1200, height: 630, alt: "Pixel treasure map for Fossil Hunters in UK" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Fossil Hunters in UK",
      description: "一起去探险吧。八条从伦敦出发的英国化石路线。",
      images: [`${origin}/og-pixel.png`],
    },
  };
}

export default function Home() {
  return <FossilMap />;
}
