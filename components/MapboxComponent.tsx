"use client";

import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1IjoiZGhydXYtZGV2ZWxvcGVyIiwiYSI6ImNtMng3YWFjODAyM2Qya3IzNmt6ZXY2NGIifQ._7g8pdgmND51VsX6GTPGPA"; // 🔥 Replace this

interface OilSpillPoint {
  latitude: number;
  longitude: number;
  anomaly: number;
  color: string;
}

const MapboxComponent: React.FC = () => {
  const [data, setData] = useState<OilSpillPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<OilSpillPoint | null>(null);

  useEffect(() => {
    fetch("/oil_spill_pixel_data.csv")
      .then((response) => response.text())
      .then((csvText) => {
        console.log("CSV Loaded:", csvText); // 🔥 Debugging log

        const rows = csvText.split("\n").slice(1);
        const parsedData = rows.map((row) => {
          const cols = row.split(",");

          console.log("Row Data:", cols); // 🔥 Debugging log for each row

          return {
            latitude: parseFloat(cols[0]),
            longitude: parseFloat(cols[1]),
            anomaly: parseInt(cols[6]), // 1 = Oil Spill, 0 = Normal
            color: `rgb(${cols[3]},${cols[4]},${cols[5]})`, // Fix color parsing
          };
        }).filter((d) => !isNaN(d.latitude) && !isNaN(d.longitude));

        console.log("Parsed Data:", parsedData); // 🔥 Debugging log
        setData(parsedData);
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);

  return (
    <div className="h-screen w-full">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          latitude: 20.5, // 🔥 Adjusted to where points are
          longitude: 78.9,
          zoom: 6, // 🔥 Increased zoom level
        }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
      >
        {data.map((point, index) => (
          <Marker
            key={index}
            latitude={point.latitude}
            longitude={point.longitude}
            onClick={() => setSelectedPoint(point)}
          >
            <div
              className="w-6 h-6 rounded-full cursor-pointer border border-white"
              style={{
                backgroundColor: point.color,
                opacity: point.anomaly ? 1 : 0.5,
              }}
            />
          </Marker>
        ))}

        {selectedPoint && (
          <Popup
            latitude={selectedPoint.latitude}
            longitude={selectedPoint.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedPoint(null)}
            anchor="top"
          >
            <div className="p-2 text-white">
              <p><strong>Latitude:</strong> {selectedPoint.latitude}</p>
              <p><strong>Longitude:</strong> {selectedPoint.longitude}</p>
              <p><strong>Anomaly:</strong> {selectedPoint.anomaly ? "Oil Spill Detected" : "Normal Water"}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapboxComponent;
