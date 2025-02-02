"use client"
import { MapPin, AlertTriangle, Clock, Droplet, Wind } from "lucide-react"

export default function SpillIncidents() {
  const incidents = [
    {
      id: 1,
      location: "Gulf of Mexico",
      severity: "High",
      date: "2023-06-15",
      status: "Active",
      estimatedVolume: "500 barrels",
      affectedArea: "75 km²",
      cleanupProgress: "20%",
    },
    {
      id: 2,
      location: "North Sea",
      severity: "Medium",
      date: "2023-06-10",
      status: "Contained",
      estimatedVolume: "200 barrels",
      affectedArea: "30 km²",
      cleanupProgress: "60%",
    },
    {
      id: 3,
      location: "South China Sea",
      severity: "Low",
      date: "2023-06-05",
      status: "Cleaned",
      estimatedVolume: "50 barrels",
      affectedArea: "10 km²",
      cleanupProgress: "100%",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Spill Incidents</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Recent Incidents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incidents.map((incident) => (
            <div key={incident.id} className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                <span className="font-semibold">{incident.location}</span>
              </div>
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                <span>Severity: {incident.severity}</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 mr-2 text-gray-500" />
                <span>Date: {incident.date}</span>
              </div>
              <div className="flex items-center mb-2">
                <Droplet className="h-5 w-5 mr-2 text-blue-500" />
                <span>Estimated Volume: {incident.estimatedVolume}</span>
              </div>
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 mr-2 text-green-500" />
                <span>Affected Area: {incident.affectedArea}</span>
              </div>
              <div className="flex items-center mb-2">
                <Wind className="h-5 w-5 mr-2 text-purple-500" />
                <span>Cleanup Progress: {incident.cleanupProgress}</span>
              </div>
              <div className="mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    incident.status === "Active"
                      ? "bg-red-100 text-red-800"
                      : incident.status === "Contained"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {incident.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Incident Map</h2>
        <div className="bg-gray-200 h-96 flex items-center justify-center">
          <MapPin className="h-12 w-12 text-blue-500" />
          <span className="ml-2 text-gray-600">Incident Map Placeholder</span>
        </div>
      </div>
    </div>
  )
}

