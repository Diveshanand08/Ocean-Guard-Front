import Link from "next/link"
import {
  AlertTriangle,
  Anchor,
  BarChart,
  Bell,
  Brain,
  Cloud,
  Droplet,
  Fish,
  History,
  LayoutDashboard,
  Map,
  Satellite,
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      <div
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('https://media.cnn.com/api/v1/images/stellar/prod/230310124222-oil-spill-thumbnail-2-lon-orig-na-zt.jpg?c=16x9&q=w_1280,c_fill')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-4">OceanGuard</h1>
          <p className="text-xl mb-8">Protecting Our Oceans, One Spill at a Time</p>
          <div className="text-center max-w-2xl">
            <p className="mb-4">
              OceanGuard is an advanced oil spill monitoring and reporting system designed to protect marine life and
              assist authorities in mitigating ecological damage.
            </p>
            <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              View Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8 sm:px-4 lg:px-5">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Key Features</h2>
          <div className="grid grid-cols-10 md:grid-cols-10 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Map,
                title: "Real-Time Anomaly Detection",
                description: "Detect and alert on unusual vessel behavior or potential spills instantly.",
              },
              {
                icon: Satellite,
                title: "Satellite-Based Spill Verification",
                description: "Utilize satellite imagery to confirm and assess the extent of oil spills.",
              },
              {
                icon: Bell,
                title: "Automated Alerts and Reporting",
                description: "Receive instant notifications and generate comprehensive reports automatically.",
              },
              {
                icon: LayoutDashboard,
                title: "Integrated Visualization Dashboard",
                description: "View all critical data in one intuitive, interactive dashboard.",
              },
              {
                icon: Cloud,
                title: "Weather and Environmental Impact Integration",
                description:
                  "Incorporate real-time weather data to predict spill trajectories and environmental impact.",
              },
              {
                icon: Brain,
                title: "Machine Learning-Based Anomaly Detection",
                description: "Leverage AI to identify patterns and predict potential incidents before they occur.",
              },
              {
                icon: History,
                title: "Historical Data Analysis",
                description: "Analyze past incidents to improve future response strategies and prevention measures.",
              },
              {
                icon: Fish,
                title: "Endangered Species Protection",
                description: "Monitor and protect vulnerable marine life in oil spill-prone areas.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-blue-100 p-6 rounded-lg flex items-start">
                <feature.icon className="h-8 w-8 text-blue-500 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-blue-800 mb-2">{feature.title}</h3>
                  <p className="text-blue-900">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold mb-8">Emergency Alerts</h2>
          <div className="bg-red-600 p-4 rounded-lg flex items-center">
            <AlertTriangle className="h-8 w-8 mr-4" />
            <div>
              <h3 className="font-bold text-lg">Oil Spill Detected</h3>
              <p>
                A significant oil spill has been detected off the coast of Miami. Emergency response teams have been
                notified.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Latest Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Vessels", value: "1,234" },
              { label: "Detected Anomalies (24h)", value: "15" },
              { label: "Verified Oil Spills (30d)", value: "3" },
              { label: "Protected Marine Area", value: "10,000 km²" },
            ].map((stat, index) => (
              <div key={index} className="bg-blue-100 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-blue-800 mb-2">{stat.value}</div>
                <div className="text-blue-900">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-8">Endangered Species Protection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">Monitoring Vulnerable Habitats</h3>
              <p className="text-blue-900 mb-4">
                Our system integrates data on known habitats of endangered marine species, allowing us to prioritize
                protection efforts in these critical areas.
              </p>
              <h3 className="text-xl font-bold text-blue-800 mb-4">Rapid Response Protocols</h3>
              <p className="text-blue-900">
                In the event of a spill near endangered species habitats, our system triggers specialized rapid response
                protocols to minimize impact on vulnerable populations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Protected Species in Our System</h3>
              <ul className="space-y-2">
                {["Blue Whale", "Leatherback Sea Turtle", "Hawaiian Monk Seal", "Vaquita"].map((species, index) => (
                  <li key={index} className="flex items-center">
                    <Fish className="h-5 w-5 text-green-500 mr-2" />
                    <span>{species}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

