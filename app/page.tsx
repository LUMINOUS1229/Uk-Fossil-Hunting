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
      "We collect fossils, and memories too. 查看 21 个英国化石地点及从伦敦出发的路线、潮汐、安全、装备与采集规则。",
    openGraph: {
      title: "Fossil Hunters in UK",
      description: "We collect fossils, and memories too. 21 个英国化石地点与从伦敦出发的路线。",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Literary field-guide cover for Fossil Hunters in UK" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Fossil Hunters in UK",
      description: "We collect fossils, and memories too. 21 个英国化石地点与从伦敦出发的路线。",
      images: [`${origin}/og.png`],
    },
  };
}

export default function Home() {
  return <FossilMap />;
}
