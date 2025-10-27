import type React from "react"

interface FeatureItemProps {
  title: string
  description: string
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description }) => {
  return (
    <div className="space-y-2 mb-8">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-black">{title}</h3>
      <p className="text-lg sm:text-xl tracking-tighter text-black">{description}</p>
    </div>
  )
}

export default FeatureItem

