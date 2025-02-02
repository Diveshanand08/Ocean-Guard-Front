"use client";
import MapComponent from "@/components/Oil_check";

// Aggregate all oil spill points into a single array
const oilSpillsData = [
  {
    center: { latitude: 34.0522, longitude: -118.2437 },
    timestamp: "2025-02-01T12:00:00Z",
    points: [
      { latitude: 34.0530, longitude: -118.2445, timestamp: "2025-02-01T12:01:00Z" },
      { latitude: 34.0525, longitude: -118.2435, timestamp: "2025-02-01T12:02:00Z" },
      { latitude: 34.0515, longitude: -118.2430, timestamp: "2025-02-01T12:03:00Z" },
      { latitude: 34.0505, longitude: -118.2435, timestamp: "2025-02-01T12:04:00Z" },
      { latitude: 34.0500, longitude: -118.2445, timestamp: "2025-02-01T12:05:00Z" }
    ],
    water_body: "Pacific Ocean"
  },
  {
    center: { latitude: 40.7128, longitude: -74.0060 },
    timestamp: "2025-02-01T13:00:00Z",
    points: [
      { latitude: 40.7135, longitude: -74.0070, timestamp: "2025-02-01T13:01:00Z" },
      { latitude: 40.7130, longitude: -74.0060, timestamp: "2025-02-01T13:02:00Z" },
      { latitude: 40.7125, longitude: -74.0050, timestamp: "2025-02-01T13:03:00Z" },
      { latitude: 40.7115, longitude: -74.0055, timestamp: "2025-02-01T13:04:00Z" },
      { latitude: 40.7110, longitude: -74.0065, timestamp: "2025-02-01T13:05:00Z" }
    ],
    water_body: "Atlantic Ocean"
  },
  {
    center: { latitude: 51.5074, longitude: -0.1278 },
    timestamp: "2025-02-01T14:00:00Z",
    points: [
      { latitude: 51.5078, longitude: -0.1280, timestamp: "2025-02-01T14:01:00Z" },
      { latitude: 51.5068, longitude: -0.1260, timestamp: "2025-02-01T14:02:00Z" },
      { latitude: 51.5060, longitude: -0.1250, timestamp: "2025-02-01T14:03:00Z" }
    ],
    water_body: "Thames River"
  }
];

// Flatten all spill points into a single array
const allSpillPoints = oilSpillsData.flatMap(spill => spill.points);

export default function OilSpills() {
  return (
    <div>
      <h1>🌍 Oil Spill Clusters</h1>
      <div>
        {/* Pass all points to a single map */}
        <MapComponent spillPoints={allSpillPoints} />
      </div>
      <style jsx>{`
        h1 {
          text-align: center;
          font-size: 2rem;
          margin-top: 20px;
          color: white;
        }
        body {
          background-color: black;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
