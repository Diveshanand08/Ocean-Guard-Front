import { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1IjoiZGhydXYtZGV2ZWxvcGVyIiwiYSI6ImNtMng3YWFjODAyM2Qya3IzNmt6ZXY2NGIifQ._7g8pdgmND51VsX6GTPGPA"; // Replace with your key

const MapComponent = ({ spillPoints }) => {
  const [selectedSpill, setSelectedSpill] = useState(null);
  const [adjustedSpillPoints, setAdjustedSpillPoints] = useState([]);

  useEffect(() => {
    let points = [...spillPoints];

    // Ensure at least 4–8 points exist
    while (points.length < 4) {
      const lastPoint = spillPoints[spillPoints.length - 1] || { latitude: 0, longitude: 0 };
      points.push({
        latitude: lastPoint.latitude + (Math.random() * 0.5 - 0.25), // Random nearby lat
        longitude: lastPoint.longitude + (Math.random() * 0.5 - 0.25), // Random nearby long
        timestamp: new Date().toISOString()
      });
    }
    
    setAdjustedSpillPoints(points);
  }, [spillPoints]);

  return (
    <div className="map-container">
      <Map
        initialViewState={{
          longitude: adjustedSpillPoints[0]?.longitude || 0,
          latitude: adjustedSpillPoints[0]?.latitude || 0,
          zoom: 3
        }}
        style={{ width: "100%", height: "500px", borderRadius: "10px" }}
        mapStyle="mapbox://styles/mapbox/dark-v11" // Dark theme for better visibility
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {/* Markers for each oil spill point */}
        {adjustedSpillPoints.slice(0, 8).map((point, index) => (
          <Marker
            key={index}
            longitude={point.longitude}
            latitude={point.latitude}
            anchor="center"
            onClick={() => setSelectedSpill(point)}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                backgroundColor: "yellow",
                borderRadius: "50%",
                border: "2px solid black", // Black border for better visibility
                boxShadow: "0px 0px 5px rgba(255, 255, 0, 0.8)"
              }}
            />
          </Marker>
        ))}

        {/* Popup on marker click */}
        {selectedSpill && (
          <Popup
            longitude={selectedSpill.longitude}
            latitude={selectedSpill.latitude}
            closeButton={false}
            closeOnClick={true}
            onClose={() => setSelectedSpill(null)}
            anchor="top"
          >
            <div style={{ color: "black", fontSize: "14px" }}>
              <strong>Timestamp:</strong> {new Date(selectedSpill.timestamp).toLocaleString()}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
