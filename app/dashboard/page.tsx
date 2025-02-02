"use client"

import { useState } from "react"
import { Filter, Layers } from "lucide-react"
import MapboxMap from "../../components/M2"

export default function Dashboard() {
  const [selectedFilters, setSelectedFilters] = useState({
    region: "all",
    timeFrame: "realTime",
    anomaly: "all",
    oilSpill: "all",
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Real-Time Oil Spill Monitoring Dashboard</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Interactive Map</h2>
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
              <Filter className="mr-2" /> Filters
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
              <Layers className="mr-2" /> Layers
            </button>
          </div>
        </div>
        
        {/* Map with correct size and auto-fitting */}
        <div className="h-96 relative">
          <MapboxMap filters={selectedFilters} />
          <div className="absolute top-2 right-2 bg-white p-2 rounded-md shadow">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm">Anomaly Vessel</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-black rounded-full mr-2"></div>
              <span className="text-sm">Oil Spill</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Data Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Region</label>
              <select
                className="w-full border rounded-md p-2"
                value={selectedFilters.region}
                onChange={(e) => handleFilterChange("region", e.target.value)}
              >
                <option value="all">All</option>
                <option value="northAtlantic">North Atlantic</option>
                <option value="southPacific">South Pacific</option>
                <option value="indianOcean">Indian Ocean</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Time Frame</label>
              <select
                className="w-full border rounded-md p-2"
                value={selectedFilters.timeFrame}
                onChange={(e) => handleFilterChange("timeFrame", e.target.value)}
              >
                <option value="realTime">Real-time</option>
                <option value="past24h">Past 24 Hours</option>
                <option value="past7d">Past 7 Days</option>
                <option value="past30d">Past 30 Days</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Anomaly</label>
              <select
                className="w-full border rounded-md p-2"
                value={selectedFilters.anomaly}
                onChange={(e) => handleFilterChange("anomaly", e.target.value)}
              >
                <option value="all">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Oil Spill</label>
              <select
                className="w-full border rounded-md p-2"
                value={selectedFilters.oilSpill}
                onChange={(e) => handleFilterChange("oilSpill", e.target.value)}
              >
                <option value="all">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
