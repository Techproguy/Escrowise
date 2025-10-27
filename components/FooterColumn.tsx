import type React from "react"

interface FooterColumnProps {
  title: string
  links: string[]
  className?: string
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links, className = "" }) => {
  return (
    <div className={className}>
      <h3 className="text-lg sm:text-xl font-bold tracking-tighter">{title}</h3>
      <nav className="mt-3 sm:mt-4">
        <ul className="space-y-1 sm:space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <a href="#" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default FooterColumn

