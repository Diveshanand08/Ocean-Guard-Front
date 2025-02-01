"use client"
import { useState } from "react"
import { AlertTriangle, Bell, Settings } from "lucide-react"

export default function Alerts() {
  const [alertSettings, setAlertSettings] = useState({
    email: true,
    sms: false,
    pushNotifications: true,
  })

  const toggleAlertSetting = (setting) => {
    setAlertSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Alerts</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Recent Alerts</h2>
        <ul className="space-y-4">
          {[
            {
              type: "critical",
              title: "Oil Spill Detected",
              description: "Large oil spill detected 50km off the coast of Miami. Estimated size: 500 barrels.",
            },
            {
              type: "warning",
              title: "Anomalous Vessel Behavior",
              description: 'Tanker "Ocean Explorer" showing erratic movement patterns in the Gulf of Mexico.',
            },
            {
              type: "info",
              title: "Weather Alert",
              description: "High winds expected in the North Atlantic. Potential for increased spill spread.",
            },
          ].map((alert, index) => (
            <li
              key={index}
              className={`flex items-start p-4 rounded-md ${
                alert.type === "critical" ? "bg-red-100" : alert.type === "warning" ? "bg-yellow-100" : "bg-blue-100"
              }`}
            >
              <AlertTriangle
                className={`h-6 w-6 mr-2 ${
                  alert.type === "critical"
                    ? "text-red-500"
                    : alert.type === "warning"
                      ? "text-yellow-500"
                      : "text-blue-500"
                }`}
              />
              <div>
                <p className="font-semibold">{alert.title}</p>
                <p className="text-sm text-gray-600">{alert.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Alert Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              <span>Email Notifications</span>
            </div>
            <label className="switch">
              <input type="checkbox" checked={alertSettings.email} onChange={() => toggleAlertSetting("email")} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              <span>SMS Notifications</span>
            </div>
            <label className="switch">
              <input type="checkbox" checked={alertSettings.sms} onChange={() => toggleAlertSetting("sms")} />
              <span className="slider round"></span>
            </label>
          </div>
          
        </div>
      </div>
    </div>
  )
}

