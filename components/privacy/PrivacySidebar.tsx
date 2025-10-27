"use client"
import type React from "react"
import { useState, useEffect } from "react"

const PrivacySidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("introduction")

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "information-collection", title: "Information Collection" },
    { id: "information-use", title: "Information Use" },
    { id: "information-disclosure", title: "Information Disclosure" },
    { id: "cookies", title: "Cookies and Web Beacons" },
    { id: "third-party", title: "Third-Party Websites" },
    { id: "security", title: "Security" },
    { id: "children", title: "Children's Privacy" },
    { id: "your-rights", title: "Your Rights" },
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
        <a href="/terms" className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
          View Terms of Service
        </a>
      </div>
    </div>
  )
}

export default PrivacySidebar

