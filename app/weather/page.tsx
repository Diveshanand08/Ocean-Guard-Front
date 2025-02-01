"use client"
import { Cloud, Wind, Droplet, Thermometer } from "lucide-react"

export default function Weather() {
  const weatherData = {
    temperature: 25,
    windSpeed: 15,
    windDirection: "NE",
    waveHeight: 2.5,
    precipitation: 20,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Weather Conditions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Current Weather</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Thermometer className="h-8 w-8 text-red-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="font-bold">{weatherData.temperature}°C</p>
              </div>
            </div>
            <div className="flex items-center">
              <Wind className="h-8 w-8 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Wind</p>
                <p className="font-bold">
                  {weatherData.windSpeed} knots {weatherData.windDirection}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Droplet className="h-8 w-8 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Wave Height</p>
                <p className="font-bold">{weatherData.waveHeight} meters</p>
              </div>
            </div>
            <div className="flex items-center">
              <Cloud className="h-8 w-8 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Precipitation</p>
                <p className="font-bold">{weatherData.precipitation}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Weather Map</h2>
          <div className="bg-gray-200 h-64 flex items-center justify-center">
            <span className="text-gray-500">Weather Map Placeholder</span>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="text-center">
              <p className="font-bold mb-2">Day {index + 1}</p>
              <Cloud className="h-8 w-8 mx-auto text-gray-500 mb-2" />
              <p className="text-sm">25°C</p>
              <p className="text-sm">15 knots</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

