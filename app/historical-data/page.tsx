"use client";

import { useState, useEffect } from "react";
import { Calendar, Filter, Download } from "lucide-react";

const HistoricalData: React.FC = () => {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [mapUrl, setMapUrl] = useState("https://marinecadastre.gov/accessais/");
  const [historicalData, setHistoricalData] = useState<any[]>([]); // Store fetched data

  // Function to fetch historical data
  const fetchHistoricalData = async () => {
    if (!dateRange.start || !dateRange.end) return;

    const url = `https://marinecadastre.gov/api/historical?start=${dateRange.start}&end=${dateRange.end}&region=${selectedRegion}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  // Function to update the map based on selected filters
  const updateMap = () => {
    if (dateRange.start && dateRange.end) {
      const url = `https://marinecadastre.gov/accessais/?start=${dateRange.start}&end=${dateRange.end}&region=${selectedRegion}`;
      setMapUrl(url);
    }
    fetchHistoricalData(); // Fetch data when updating map
  };

  useEffect(() => {
    updateMap();
  }, [dateRange, selectedRegion]);

  // Function to download JSON data
  const downloadJson = () => {
    if (historicalData.length === 0) {
      alert("No data available to download.");
      return;
    }

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(historicalData, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `marine_data_${dateRange.start}_${dateRange.end}.json`;
    link.click();
  };

  // Function to download CSV data
  const downloadCsv = () => {
    if (historicalData.length === 0) {
      alert("No data available to download.");
      return;
    }

    const csvHeader = Object.keys(historicalData[0]).join(",") + "\n";
    const csvRows = historicalData
      .map((row) => Object.values(row).join(","))
      .join("\n");

    const csvString = `data:text/csv;charset=utf-8,${encodeURIComponent(
      csvHeader + csvRows
    )}`;
    const link = document.createElement("a");
    link.href = csvString;
    link.download = `marine_data_${dateRange.start}_${dateRange.end}.csv`;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Historical Marine Data</h1>

      {/* Data Query Section
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Data Query</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-2">Start Date</label>
            <input
              type="date"
              className="w-full border rounded-md p-2"
              value={dateRange.start}
              onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
            />
          </div>
          <div>
            <label className="block mb-2">End Date</label>
            <input
              type="date"
              className="w-full border rounded-md p-2"
              value={dateRange.end}
              onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
            />
          </div>
          <div>
            <label className="block mb-2">Region</label>
            <select
              className="w-full border rounded-md p-2"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="all">All Regions</option>
              <option value="northAtlantic">North Atlantic</option>
              <option value="southPacific">South Pacific</option>
              <option value="indianOcean">Indian Ocean</option>
            </select>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={updateMap}
        >
          Fetch Data
        </button>
      </div> */}

      {/* Marine Cadastre AIS Map */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Marine Traffic Map</h2>
        <div className="h-96 w-full">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Data Export</h2>
        <p className="mb-4">Download historical data for further analysis:</p>
        <div className="flex space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
            onClick={downloadCsv}
          >
            <Download className="h-5 w-5 mr-2" />
            Export as CSV
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
            onClick={downloadJson}
          >
            <Download className="h-5 w-5 mr-2" />
            Export as JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoricalData;
