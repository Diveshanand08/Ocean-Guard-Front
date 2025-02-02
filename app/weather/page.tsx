"use client"
import { Cloud, Wind, Droplet, Thermometer } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import mapboxgl from 'mapbox-gl'

// Set your Mapbox Access Token here
mapboxgl.accessToken = 'pk.eyJ1IjoiZGhydXYtZGV2ZWxvcGVyIiwiYSI6ImNtMng3YWFjODAyM2Qya3IzNmt6ZXY2NGIifQ._7g8pdgmND51VsX6GTPGPA'

const weatherApiKey = 'b87c5497e1dd79e792ba37df5c2c2211'

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [coords, setCoords] = useState({ lat: 37.7749, lng: -122.4194 })  // Default to San Francisco
  const [locationInput, setLocationInput] = useState('')  // For user input
  const [map, setMap] = useState(null)
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v11') // Default to street view
  const [updating, setUpdating] = useState(false)

  // Fetch weather and forecast data when coordinates change
  useEffect(() => {
    if (coords.lat && coords.lng) {
      fetchWeatherData()
      fetchForecastData()
    }
  }, [coords])

  // Fetch weather data
  const fetchWeatherData = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=${weatherApiKey}`)
      .then((response) => setWeatherData(response.data))
      .catch((error) => console.error("Error fetching weather data", error))
  }

  // Fetch 5-day weather forecast data
  const fetchForecastData = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=${weatherApiKey}`)
      .then((response) => setForecastData(response.data))
      .catch((error) => console.error("Error fetching forecast data", error))
  }

  // Function to initialize the weather map with Mapbox
  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: 'map', // Container id
      style: mapStyle, // Map style based on selected view
      center: [coords.lng, coords.lat], // Set center based on coordinates
      zoom: 8, // Zoom level
    })
    setMap(mapInstance)

    // Add a marker for the current location
    const marker = new mapboxgl.Marker()
      .setLngLat([coords.lng, coords.lat])
      .addTo(mapInstance)

    // Update the marker when coordinates change
    mapInstance.on('move', () => {
      const center = mapInstance.getCenter()
      setCoords({ lat: center.lat, lng: center.lng })
    })

    return () => {
      mapInstance.remove()
    }
  }, [coords, mapStyle])

  // Automatic updates every 10 seconds
  useEffect(() => {
    if (updating) {
      const weatherInterval = setInterval(() => {
        fetchWeatherData()
        fetchForecastData()
      }, 10000) // Update every 10 seconds

      return () => clearInterval(weatherInterval)
    }
  }, [updating, coords])

  // Handle user input to set coordinates
  const handleLocationInput = (event) => {
    event.preventDefault()
    const [lat, lng] = locationInput.split(",").map(coord => parseFloat(coord.trim()))
    if (!isNaN(lat) && !isNaN(lng)) {
      setCoords({ lat, lng })
    } else {
      alert("Invalid coordinates. Please enter valid latitude and longitude values.")
    }
  }

  // Function to toggle between Satellite and Street View
  const toggleMapView = () => {
    setMapStyle(prevStyle => prevStyle === 'mapbox://styles/mapbox/streets-v11' ? 'mapbox://styles/mapbox/satellite-v9' : 'mapbox://styles/mapbox/streets-v11')
  }

  // Start/Stop automatic updates when button is clicked
  const toggleUpdating = () => {
    setUpdating(prev => !prev)
  }

  // Function to convert wind degrees to a compass direction
  const getWindDirection = (deg) => {
    const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West']
    const index = Math.floor((deg + 22.5) / 45) % 8
    return directions[index]
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Weather Conditions</h1>

      {/* User input for coordinates */}
      <div className="mb-8">
        <h2 className="text-xl text-white mb-4">Enter Location (Latitude, Longitude)</h2>
        <form onSubmit={handleLocationInput}>
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            placeholder="e.g., 37.7749, -122.4194"
            className="px-4 py-2 rounded-lg w-full max-w-xs mb-4"
          />
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg">Submit</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Weather Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Current Weather</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Thermometer className="h-8 w-8 text-red-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="font-bold">{weatherData?.main.temp}°C</p>
              </div>
            </div>
            <div className="flex items-center">
              <Wind className="h-8 w-8 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Wind</p>
                <p className="font-bold">{weatherData?.wind.speed} knots</p>
                <p className="text-sm text-gray-600">{getWindDirection(weatherData?.wind.deg)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Droplet className="h-8 w-8 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="font-bold">{weatherData?.main.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center">
              <Cloud className="h-8 w-8 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Weather</p>
                <p className="font-bold">{weatherData?.weather[0].description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Map Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Weather Map</h2>
          <div id="map" className="bg-gray-200 h-[400px] w-full rounded-lg overflow-hidden">
            {/* Map will be rendered here */}
          </div>
          {/* Toggle map view button */}
          <button
            onClick={toggleMapView}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Toggle to {mapStyle.includes('satellite') ? 'Street View' : 'Satellite View'}
          </button>
        </div>
      </div>

      {/* 5-Day Forecast Section */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {forecastData?.list.slice(0, 5).map((forecast, index) => (
            <div key={index} className="text-center p-4 bg-gray-100 rounded-lg shadow-md">
              <p className="font-bold mb-2">{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
              <Cloud className="h-8 w-8 mx-auto text-gray-500 mb-2" />
              <p className="text-sm">{forecast.main.temp}°C</p>
              <p className="text-sm">{forecast.wind.speed} knots</p>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Update Button */}
      <button
        onClick={toggleUpdating}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg"
      >
        {updating ? 'Stop Auto Update' : 'Start Auto Update'}
      </button>
    </div>
  )
}
