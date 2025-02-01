"use client"
import { useState } from "react"
import { Calendar, Filter, Download } from "lucide-react"

export default function HistoricalData() {
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [selectedRegion, setSelectedRegion] = useState("all")

  const fetchHistoricalData = () => {
    // Logic to fetch historical data based on selected options
    console.log("Fetching historical data:", { dateRange, selectedRegion })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Historical Data</h1>

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
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={fetchHistoricalData}>
          Fetch Data
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Historical Spill Heatmap</h2>
        <div className="bg-gray-200 h-96 flex items-center justify-center">
          <span className="text-gray-500">Heatmap Placeholder</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Data Export</h2>
        <p className="mb-4">Download historical data for further analysis:</p>
        <div className="flex space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Export as CSV
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Export as JSON
          </button>
        </div>
      </div>
    </div>
  )
}

