"use client"

import { useState } from "react"
import { MapPin, Filter, Layers, AlertTriangle, Droplet, Wind, Ship, Activity } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [selectedFilters, setSelectedFilters] = useState({
    vesselType: "all",
    region: "all",
    timeFrame: "realTime",
  })

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterType]: value }))
  }

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
        <div className="bg-gray-200 h-96 flex items-center justify-center relative">
          <MapPin className="h-12 w-12 text-blue-500" />
          <span className="ml-2 text-gray-600">Interactive Map Placeholder</span>
          <div className="absolute top-2 right-2 bg-white p-2 rounded-md shadow">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm">Oil Spill</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm">Anomaly</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm">Vessel</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Data Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Vessel Type</label>
              <select
                className="w-full border rounded-md p-2"
                value={selectedFilters.vesselType}
                onChange={(e) => handleFilterChange("vesselType", e.target.value)}
              >
                <option value="all">All</option>
                <option value="cargo">Cargo</option>
                <option value="tanker">Oil Tanker</option>
                <option value="passenger">Passenger</option>
              </select>
            </div>
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
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Vessel Activity</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span className="flex items-center">
                <Ship className="mr-2 h-5 w-5 text-blue-500" /> Total Active Vessels:
              </span>
              <span className="font-bold">1,234</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex items-center">
                <Ship className="mr-2 h-5 w-5 text-green-500" /> Cargo Ships:
              </span>
              <span className="font-bold">567</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex items-center">
                <Ship className="mr-2 h-5 w-5 text-red-500" /> Oil Tankers:
              </span>
              <span className="font-bold">89</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex items-center">
                <Ship className="mr-2 h-5 w-5 text-yellow-500" /> Passenger Ships:
              </span>
              <span className="font-bold">78</span>
            </li>
          </ul>
          <Link
            href="/vessels"
            className="mt-4 block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            View All Vessels
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Spill Impact Analysis</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-500" /> Active Oil Spills:
              </span>
              <span className="font-bold text-red-500">2</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-blue-500" /> Affected Marine Area:
              </span>
              <span className="font-bold">150 km²</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex items-center">
                <Droplet className="mr-2 h-5 w-5 text-blue-500" /> Estimated Oil Volume:
              </span>
              <span className="font-bold">500 barrels</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex items-center">
                <Wind className="mr-2 h-5 w-5 text-blue-500" /> Cleanup Progress:
              </span>
              <span className="font-bold">35%</span>
            </li>
          </ul>
          <Link
            href="/spill-incidents"
            className="mt-4 block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            View Spill Details
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Recent Alerts</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-1" />
              <div>
                <p className="font-semibold">Oil Spill Detected</p>
                <p className="text-sm text-gray-600">
                  Large oil spill detected 50km off the coast of Miami. Estimated size: 500 barrels.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-1" />
              <div>
                <p className="font-semibold">Anomalous Vessel Behavior</p>
                <p className="text-sm text-gray-600">
                  Tanker "Ocean Explorer" showing erratic movement patterns in the Gulf of Mexico.
                </p>
              </div>
            </li>
          </ul>
          <Link
            href="/alerts"
            className="mt-4 block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            View All Alerts
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Weather Conditions</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Wind className="h-8 w-8 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Wind Speed</p>
                <p className="font-bold">15 knots</p>
              </div>
            </div>
            <div className="flex items-center">
              <Droplet className="h-8 w-8 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Wave Height</p>
                <p className="font-bold">2.5 meters</p>
              </div>
            </div>
          </div>
          <Link
            href="/weather"
            className="mt-4 block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            View Detailed Weather
          </Link>
        </div>
      </div>
    </div>
  )
}

