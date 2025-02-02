// pages/index.tsx
"use client"
// pages/index.tsx
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../../components/M2"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Oil Spill & Vessel Tracking</h1>
      <DynamicMap />
    </div>
  );
}
