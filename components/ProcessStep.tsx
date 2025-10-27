import type React from "react"

interface ProcessStepProps {
  icon: string
  title: string
  description: string
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200 h-full overflow-hidden"
    >
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 h-full"
      >
        <div className="flex flex-shrink-0 justify-center items-center p-3 bg-orange-100 h-16 w-16 rounded-full">
          <img
            src={icon || "/placeholder.svg"}
            alt={title}
            className="object-contain w-8 h-8"
          />
        </div>
        <div className="flex flex-col z-10">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h3>
          <p className="mt-2 text-base text-slate-700">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProcessStep

