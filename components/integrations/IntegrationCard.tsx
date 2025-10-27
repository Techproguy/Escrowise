import type React from "react"
import type { Integration } from "./types"
import { Check, X } from "lucide-react"

interface IntegrationCardProps {
  integration: Integration
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration }) => {
  const { name, description, icon, status } = integration

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md">
              {/* Fallback icon if image fails to load */}
              <div className="text-gray-400 text-xl font-bold">{name.charAt(0)}</div>
              {icon && (
                <img
                  src={icon || "/placeholder.svg"}
                  alt={`${name} icon`}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    // Hide the image on error
                    ;(e.target as HTMLImageElement).style.display = "none"
                  }}
                />
              )}
            </div>
            <h3 className="text-lg font-bold tracking-tighter text-black">{name}</h3>
          </div>

          {status === "connected" ? (
            <div className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
              <Check className="w-3 h-3" />
              <span>Connected</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-gray-600 text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">
              <X className="w-3 h-3" />
              <span>Disconnected</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center">
          <a
            href={`/integrations/${integration.id}`}
            className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
          >
            View Details
          </a>

          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              status === "connected"
                ? "text-red-600 hover:text-red-700 border border-red-200 hover:bg-red-50"
                : "text-white bg-orange-400 hover:bg-orange-500"
            }`}
          >
            {status === "connected" ? "Disconnect" : "Connect"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default IntegrationCard

