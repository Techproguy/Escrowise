import type React from "react"

interface SectionHeaderProps {
  title: string
  description: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <header className="mb-10 sm:mb-16 text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black mb-2 sm:mb-3">{title}</h1>
      <p className="text-base sm:text-lg lg:text-xl tracking-tighter text-black max-w-2xl mx-auto">{description}</p>
    </header>
  )
}

export default SectionHeader

