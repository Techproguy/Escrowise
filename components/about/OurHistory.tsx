import type React from "react"

interface TimelineItemProps {
  year: string
  title: string
  description: string
  isLast?: boolean
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, isLast = false }) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4 sm:mr-8">
        <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-sm font-bold">
          {year.substring(2)}
        </div>
        {!isLast && <div className="w-1 flex-grow bg-orange-200 my-2"></div>}
      </div>
      <div className={`pb-10 ${isLast ? "" : "border-b border-gray-200"}`}>
        <h3 className="text-xl font-bold tracking-tighter text-black mb-2">{title}</h3>
        <p className="text-base tracking-tighter text-gray-700">{description}</p>
        <span className="block text-sm text-orange-500 font-medium mt-2">{year}</span>
      </div>
    </div>
  )
}

const OurHistory: React.FC = () => {
  return (
    <section className="w-full max-w-4xl mx-auto py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">Our History</h2>
        <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
          From our founding to where we are today, our journey of growth and innovation
        </p>
      </div>

      <div className="px-4 sm:px-0">
        <TimelineItem
          year="2010"
          title="Founded in San Francisco"
          description="Escrowise was established with the vision to create a secure platform for online transactions in the rapidly growing digital marketplace."
        />
        <TimelineItem
          year="2013"
          title="International Expansion"
          description="Launched services in Europe and Asia, bringing secure escrow solutions to international markets and establishing global operations."
        />
        <TimelineItem
          year="2016"
          title="Blockchain Integration"
          description="Pioneered the integration of blockchain technology into our escrow services, enhancing security and transparency for cryptocurrency transactions."
        />
        <TimelineItem
          year="2019"
          title="Enterprise Solutions"
          description="Developed specialized escrow solutions for enterprise clients, addressing the unique needs of large corporations and institutions."
        />
        <TimelineItem
          year="2022"
          title="API Platform Launch"
          description="Released our developer-friendly API platform, enabling businesses to seamlessly integrate Escrowise services into their own applications."
          isLast={true}
        />
      </div>
    </section>
  )
}

export default OurHistory

