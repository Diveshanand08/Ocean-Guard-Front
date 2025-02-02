"use client"

import { useState } from "react"
import { MessageSquare, Phone, Mail } from "lucide-react"

export default function Support() {
  const [contactForm, setContactForm] = useState({
    subject: "", // Changed to subject instead of name
    email: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Sending the form data to the backend
    const response = await fetch("http://0.0.0.0:8000/store-and-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        sender_email: contactForm.email,
        subject: contactForm.subject,
        message: contactForm.message,
      }),
    })

    const result = await response.json()
    console.log(result)
  }

  const faqs = [
    {
      question: "How often is the data updated?",
      answer:
        "Our data is updated in real-time, with new information being processed and displayed as soon as it's received from our various sources.",
    },
    {
      question: "Can I integrate OceanGuard data into my own systems?",
      answer:
        "Yes, we offer API access for integrating our data into your systems. Please contact our sales team for more information.",
    },
    {
      question: "How accurate is the oil spill detection?",
      answer:
        "Our oil spill detection algorithm has an accuracy rate of over 95%, utilizing advanced satellite imagery and machine learning techniques.",
    },
    {
      question: "What types of vessels does OceanGuard track?",
      answer:
        "OceanGuard tracks a wide range of vessels, including oil tankers, cargo ships, passenger vessels, and fishing boats. Our system can monitor any vessel equipped with AIS (Automatic Identification System) technology.",
    },
    {
      question: "How does OceanGuard handle data privacy and security?",
      answer:
        "We take data privacy and security very seriously. All data is encrypted both in transit and at rest. We comply with GDPR and other relevant data protection regulations. Our systems undergo regular security audits to ensure the highest level of protection.",
    },
    {
      question: "Can OceanGuard predict potential oil spills before they happen?",
      answer:
        "While we can't predict oil spills with 100% certainty, our advanced AI algorithms can identify patterns and anomalies that may indicate a higher risk of a spill. This allows for proactive monitoring and preventive measures.",
    },
    {
      question: "How does weather data integration work in OceanGuard?",
      answer:
        "OceanGuard incorporates real-time weather data from multiple sources. This information is used to predict the potential spread and impact of oil spills, as well as to assist in planning cleanup operations.",
    },
    {
      question: "What kind of support does OceanGuard offer?",
      answer:
        "We offer 24/7 technical support for all our clients. This includes assistance with system integration, troubleshooting, and ongoing maintenance. We also provide regular training sessions and webinars to help users get the most out of our platform.",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Support</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={contactForm.subject}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Message</label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                rows={4}
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">FAQs</h2>
          <ul className="space-y-4">
            {faqs.map((faq, index) => (
              <li key={index}>
                <h3 className="font-bold">{faq.question}</h3>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Phone className="h-8 w-8 text-blue-500 mr-2" />
            <div>
              <p className="font-bold">Phone</p>
              <p className="text-sm text-gray-600">+91 8826417060</p>
            </div>
          </div>
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-blue-500 mr-2" />
            <div>
              <p className="font-bold">Email</p>
              <p className="text-sm text-gray-600">support@oceanguard.com</p>
            </div>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-blue-500 mr-2" />
            <div>
              <p className="font-bold">Live Chat</p>
              <p className="text-sm text-gray-600">Available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
