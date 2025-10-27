import type React from "react"

type StatusType = "awaiting-response" | "awaiting-payment" | "completed" | "cancelled"

interface StatusBadgeProps {
  type: StatusType
  text: string
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ type, text }) => {
  const getStatusStyles = () => {
    switch (type) {
      case "awaiting-response":
        return {
          container: "bg-[#CFAF41] bg-opacity-20",
          dot: "bg-[#816B22]",
          text: "text-[#816B22]",
        }
      case "awaiting-payment":
        return {
          container: "bg-[#41CF54] bg-opacity-20",
          dot: "bg-[#4B8122]",
          text: "text-[#4B8122]",
        }
      case "completed":
        return {
          container: "bg-blue-100",
          dot: "bg-blue-700",
          text: "text-blue-700",
        }
      case "cancelled":
        return {
          container: "bg-red-100",
          dot: "bg-red-700",
          text: "text-red-700",
        }
      default:
        return {
          container: "bg-gray-100",
          dot: "bg-gray-700",
          text: "text-gray-700",
        }
    }
  }

  const styles = getStatusStyles()

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full ${styles.container}`}>
      <div className={`w-2 h-2 rounded-full ${styles.dot} mr-2`}></div>
      <span className={`text-xs font-medium ${styles.text}`}>{text}</span>
    </div>
  )
}

export default StatusBadge

