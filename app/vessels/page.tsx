"use client"

import { useState } from "react"
import { Search, Filter, Ship, MapPin, AlertTriangle } from "lucide-react"

export default function Vessels() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const vessels = [
    { id: 1, name: "Ocean Explorer", type: "Tanker", status: "Active", location: "Gulf of Mexico", anomaly: false },
    {
      id: 2,
      name: "Coastal Voyager",
      type: "Cargo",
      status: "Docked",
      location: "Port of Los Angeles",
      anomaly: false,
    },
    { id: 3, name: "Arctic Surveyor", type: "Research", status: "Active", location: "Bering Sea", anomaly: true },
    { id: 4, name: "Pacific Trader", type: "Container", status: "En Route", location: "Pacific Ocean", anomaly: false },
  ]

  const filteredVessels = vessels.filter(
    (vessel) =>
      vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "all" || vessel.type.toLowerCase() === filterType),
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Vessel Tracking</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search vessels..."
              className="pl-10 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex items-center">
            <Filter className="mr-2" />
            <select
              className="border rounded-md p-2"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="tanker">Tanker</option>
              <option value="cargo">Cargo</option>
              <option value="research">Research</option>
              <option value="container">Container</option>
            </select>
          </div>
        </div>

        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Vessel Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Anomaly
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVessels.map((vessel) => (
              <tr key={vessel.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="flex items-center">
                    <Ship className="h-5 w-5 text-blue-500 mr-2" />
                    <div className="text-sm leading-5 font-medium text-gray-900">{vessel.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-500">{vessel.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      vessel.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : vessel.status === "Docked"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {vessel.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    {vessel.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                  {vessel.anomaly ? (
                    <div className="flex items-center text-red-500">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Anomaly Detected
                    </div>
                  ) : (
                    <div className="flex items-center text-green-500">Normal</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

