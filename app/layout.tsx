import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OceanGuard - Oil Spill Monitoring",
  description: "Advanced oil spill monitoring and reporting system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-teal-500">
          <Navigation />
          <main className="pt-16">{children}</main>
          <footer className="bg-blue-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">About OceanGuard</h3>
                  <p className="text-sm">
                    OceanGuard is dedicated to protecting our oceans through advanced oil spill monitoring and rapid
                    response systems.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/dashboard" className="text-sm hover:underline">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/vessels" className="text-sm hover:underline">
                        Vessels
                      </Link>
                    </li>
                    <li>
                      <Link href="/spill-incidents" className="text-sm hover:underline">
                        Spill Incidents
                      </Link>
                    </li>
                    <li>
                      <Link href="/support" className="text-sm hover:underline">
                        Support
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                  <p className="text-sm">Email: info@oceanguard.com</p>
                  <p className="text-sm">Phone: +91 8826417060</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-blue-800 text-center">
                <p className="text-sm">&copy; 2025 OceanGuard. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

