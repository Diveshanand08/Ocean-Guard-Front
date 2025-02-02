"use client";
import MapComponent from "@/components/Oil_check";

const oilSpillsData = [
  {
    center: { latitude: 34.0522, longitude: -118.2437 },
    timestamp: "2025-02-01T12:00:00Z",
    points: [
      { latitude: 34.0530, longitude: -118.2445, timestamp: "2025-02-01T12:01:00Z" },
      { latitude: 34.0525, longitude: -118.2435, timestamp: "2025-02-01T12:02:00Z" },
      { latitude: 34.0515, longitude: -118.2430, timestamp: "2025-02-01T12:03:00Z" }
    ],
    water_body: "Pacific Ocean"
  },
  {
    center: { latitude: 40.7128, longitude: -74.0060 },
    timestamp: "2025-02-01T13:00:00Z",
    points: [
      { latitude: 40.7135, longitude: -74.0070, timestamp: "2025-02-01T13:01:00Z" },
      { latitude: 40.7130, longitude: -74.0060, timestamp: "2025-02-01T13:02:00Z" }
    ],
    water_body: "Atlantic Ocean"
  }
];

export default function OilSpills() {
  return (
    <div>
      <h1>🌍 Oil Spill Locations</h1>
      <div>
        {oilSpillsData.map((spill, index) => (
          <div key={index} style={{ margin: "20px", padding: "10px", border: "1px solid gray", borderRadius: "8px" }}>
            <h3>Water Body: {spill.water_body}</h3>
            {/* Pass points to MapComponent */}
            <MapComponent spillPoints={spill.points || []} />
          </div>
        ))}
      </div>
    </div>
  );
}
