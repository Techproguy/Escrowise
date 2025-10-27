import type React from "react"

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  className?: string
  titleWidth?: string
  descriptionMarginTop?: string
  titleWithBreak?: boolean
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  className = "",
  titleWidth = "",
  descriptionMarginTop = "mt-3",
  titleWithBreak = false,
}) => {
  return (
    <div className={className}>
      <div className="flex flex-col grow py-6 sm:py-8 lg:py-11 px-4 sm:px-5 w-full text-black rounded-xl sm:rounded-3xl bg-stone-200 h-full transition-all hover:scale-[1.02] hover:shadow-md">
        <img
          src={icon || "/placeholder.svg"}
          alt={title}
          className="object-contain self-center max-w-full aspect-square w-[60px] sm:w-[80px] lg:w-[100px]"
        />
        <h3 className={`mt-2 sm:mt-3 text-xl sm:text-2xl lg:text-4xl font-bold tracking-tighter ${titleWidth}`}>
          {titleWithBreak ? (
            <>
              {title.split(" ")[0]} <br />
              {title.split(" ").slice(1).join(" ")}
            </>
          ) : (
            title
          )}
        </h3>
        <p
          className={`${descriptionMarginTop} text-sm sm:text-base lg:text-xl tracking-tighter w-full sm:w-auto lg:w-[247px]`}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

export default ServiceCard

