import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiZGhydXYtZGV2ZWxvcGVyIiwiYSI6ImNtMng3YWFjODAyM2Qya3IzNmt6ZXY2NGIifQ._7g8pdgmND51VsX6GTPGPA";

export default function MapboxMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // ✅ HARDCODED WATER-BASED LOCATIONS
  const vessels = [
    { Latitude: 12.45, Longitude: -45.67, Anomaly: 1 }, // Atlantic Ocean
    { Latitude: -23.56, Longitude: 113.67, Anomaly: 1 }, // Indian Ocean
    { Latitude: 35.12, Longitude: 139.67, Anomaly: 1 }, // Pacific Ocean (Near Japan)
  ];

  const oilSpills = [
    { Latitude: 5.67, Longitude: -52.34 }, // Atlantic Ocean (Near South America)
    { Latitude: -18.34, Longitude: 146.78 }, // Coral Sea (Near Australia)
  ];

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 20],
      zoom: 2,
    });

    mapRef.current.on("load", () => {
      mapRef.current?.resize();
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // ✅ Remove previous markers before re-adding
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const bounds = new mapboxgl.LngLatBounds();
    let hasData = false;

    vessels.forEach((v) => {
      const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat([v.Longitude, v.Latitude])
        .addTo(map);
      markersRef.current.push(marker);
      bounds.extend([v.Longitude, v.Latitude]);
      hasData = true;
    });

    oilSpills.forEach((s) => {
      const marker = new mapboxgl.Marker({ color: "black" })
        .setLngLat([s.Longitude, s.Latitude])
        .addTo(map);
      markersRef.current.push(marker);
      bounds.extend([s.Longitude, s.Latitude]);
      hasData = true;
    });

    if (hasData) {
      map.fitBounds(bounds, { padding: 50, maxZoom: 5 });
    }
  }, []);

  return <div ref={mapContainerRef} className="h-96 w-full" />;
}
