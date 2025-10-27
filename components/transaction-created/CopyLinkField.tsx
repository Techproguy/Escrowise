"use client"
import type React from "react"
import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface CopyLinkFieldProps {
  url: string
}

const CopyLinkField: React.FC<CopyLinkFieldProps> = ({ url }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
      })
  }

  return (
    <div className="flex items-center w-full rounded-xl border border-gray-300 overflow-hidden">
      <div className="flex-1 px-4 py-3 text-sm sm:text-base tracking-tighter text-black overflow-hidden text-ellipsis whitespace-nowrap">
        {url}
      </div>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-3 text-sm sm:text-base font-medium tracking-tighter text-orange-500 hover:bg-orange-50 transition-colors border-l border-gray-300"
      >
        {copied ? (
          <>
            <Check size={16} className="text-green-500" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy size={16} />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  )
}

export default CopyLinkField

