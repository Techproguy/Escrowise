"use client"
import type React from "react"
import { useState, useEffect } from "react"

const TermsSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("introduction")

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "communications", title: "Communications" },
    { id: "purchases", title: "Purchases" },
    { id: "escrow-services", title: "Escrow Services" },
    { id: "refunds", title: "Refunds" },
    { id: "content", title: "Content" },
    { id: "prohibited-uses", title: "Prohibited Uses" },
    { id: "analytics", title: "Analytics" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "disclaimer", title: "Disclaimer" },
    { id: "governing-law", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
    { id: "contact", title: "Contact Us" },
  ]

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      const sectionElements = sections.map((section) => ({
        id: section.id,
        offset: document.getElementById(section.id)?.offsetTop || 0,
      }))

      // Sort by offset to find the current section
      sectionElements.sort((a, b) => a.offset - b.offset)

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        if (scrollPosition >= sectionElements[i].offset) {
          setActiveSection(sectionElements[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  // Scroll to section when clicked
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      setActiveSection(id)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
      <h3 className="text-lg font-bold tracking-tighter text-black mb-4">Table of Contents</h3>
      <nav>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`text-left w-full px-2 py-1 rounded-md transition-colors ${
                  activeSection === section.id
                    ? "text-orange-500 font-medium bg-orange-50"
                    : "text-gray-700 hover:text-orange-500 hover:bg-gray-50"
                }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <a href="/privacy" className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
          View Privacy Policy
        </a>
      </div>
    </div>
  )
}

export default TermsSidebar

