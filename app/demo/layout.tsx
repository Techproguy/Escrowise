import type React from "react"
import DemoNavigation from "@/components/demo/DemoNavigation"

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <DemoNavigation />
    </>
  )
}

