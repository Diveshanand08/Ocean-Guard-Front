// components/MapboxMap.tsx
import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Papa from "papaparse";

mapboxgl.accessToken = "pk.eyJ1IjoiZGhydXYtZGV2ZWxvcGVyIiwiYSI6ImNtMng3YWFjODAyM2Qya3IzNmt6ZXY2NGIifQ._7g8pdgmND51VsX6GTPGPA";

interface Vessel {
  Latitude: number;
  Longitude: number;
  Speed: number;
  Anomaly: number;
  Type: string;
  Region: string;
}

interface OilSpill {
  Latitude: number;
  Longitude: number;
  Segmented_Spill_Area_Pixels: number;
  Oil_Spill_Detected: number;
  Region: string;
}

interface Filters {
  vesselType: string;
  region: string;
  timeFrame: string;
  anomaly: string;
  oilSpill: string;
}

export default function MapboxMap({ filters }: { filters: Filters }) {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [oilSpills, setOilSpills] = useState<OilSpill[]>([]);

  useEffect(() => {
    const initializeMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 20],
      zoom: 2,
    });

    initializeMap.on("load", () => {
      setMap(initializeMap);
    });
  }, []);

  useEffect(() => {
    fetch("/ais_data.csv")
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse<Vessel>(csvData, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setVessels(results.data);
          },
        });
      });

    fetch("/satellite_data.csv")
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse<OilSpill>(csvData, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setOilSpills(results.data.filter((d) => d.Oil_Spill_Detected === 1));
          },
        });
      });
  }, []);

  useEffect(() => {
    if (!map) return;

    // Remove existing markers
    markers.forEach(marker => marker.remove());
    setMarkers([]);

    const newMarkers: mapboxgl.Marker[] = [];

    // Filter vessels based on selection (only showing anomalies)
    const filteredVessels = vessels.filter((v) => {
      if (filters.vesselType !== "all" && v.Type !== filters.vesselType) return false;
      if (filters.region !== "all" && v.Region !== filters.region) return false;
      if (filters.anomaly === "yes" && v.Anomaly !== 1) return false;
      if (filters.anomaly === "no" && v.Anomaly === 1) return false;
      return v.Anomaly === 1; // Only plot red anomaly points
    });

    // Filter oil spills based on selection
    const filteredOilSpills = oilSpills.filter((s) => {
      if (filters.region !== "all" && s.Region !== filters.region) return false;
      if (filters.oilSpill !== "all" && (filters.oilSpill === "yes" ? s.Oil_Spill_Detected !== 1 : s.Oil_Spill_Detected === 1)) return false;
      return true;
    });

    // Plot filtered vessels (only red anomaly points)
    filteredVessels.forEach((v) => {
      const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat([v.Longitude, v.Latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<strong>Vessel</strong><br>Speed: ${v.Speed} knots<br>Anomaly: Yes`
          )
        )
        .addTo(map);
      newMarkers.push(marker);
    });

    // Plot filtered oil spills
    filteredOilSpills.forEach((s) => {
      const marker = new mapboxgl.Marker({ color: "black" })
        .setLngLat([s.Longitude, s.Latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<strong>Oil Spill Detected</strong><br>Size: ${s.Segmented_Spill_Area_Pixels} pixels`
          )
        )
        .addTo(map);
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, vessels, oilSpills, filters]);

  return <div id="map" style={{ height: "600px", width: "100%" }}></div>;
}
