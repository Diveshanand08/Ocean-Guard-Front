"use client"
import { useState } from "react"
import { FileText, Download, Calendar } from "lucide-react"

export default function Reports() {
  const [reportType, setReportType] = useState("daily")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  const generateReport = () => {
    // Logic to generate report based on selected options
    console.log("Generating report:", { reportType, dateRange })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Reports</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Generate Custom Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-2">Report Type</label>
            <select
              className="w-full border rounded-md p-2"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
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
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={generateReport}>
          Generate Report
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Reports</h2>
        <ul className="space-y-4">
          {[
            { name: "Daily Report - June 15, 2023", type: "PDF" },
            { name: "Weekly Report - June 8-14, 2023", type: "Excel" },
            { name: "Monthly Report - May 2023", type: "PDF" },
          ].map((report, index) => (
            <li key={index} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-500 mr-2" />
                <span>{report.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">{report.type}</span>
                <button className="text-blue-500 hover:text-blue-600">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

