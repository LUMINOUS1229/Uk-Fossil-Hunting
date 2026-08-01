import type { Metadata } from "next";
import { headers } from "next/headers";
import { FossilMap } from "./FossilMap";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "UK Fossil Hunting — Field-ready routes from London",
    description:
      "Explore six practical UK fossil-hunting routes with transport, walking maps, tide advice, finds, equipment and collecting rules.",
    openGraph: {
      title: "UK Fossil Hunting",
      description: "Six field-ready fossil-hunting routes from London.",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "UK Fossil Hunting map" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "UK Fossil Hunting",
      description: "Six field-ready fossil-hunting routes from London.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function Home() {
  return <FossilMap />;
}
