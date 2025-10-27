import type React from "react"
import { Mail, Phone, MessageSquare } from "lucide-react"

const ContactSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto mt-16 sm:mt-24">
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-2 sm:mb-3">
          Still Have Questions?
        </h2>
        <p className="text-base sm:text-lg tracking-tighter text-black max-w-2xl mx-auto">
          Our support team is here to help. Reach out to us through any of these channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ContactCard
          icon={<Mail className="w-8 h-8 text-orange-400" />}
          title="Email Support"
          description="Get a response within 24 hours"
          action="support@escrowise.com"
          actionType="email"
        />
        <ContactCard
          icon={<Phone className="w-8 h-8 text-orange-400" />}
          title="Phone Support"
          description="Available Monday-Friday, 9am-5pm EST"
          action="+1-421-831-3871"
          actionType="phone"
        />
        <ContactCard
          icon={<MessageSquare className="w-8 h-8 text-orange-400" />}
          title="Live Chat"
          description="Get immediate assistance from our team"
          action="Start Chat"
          actionType="button"
        />
      </div>
    </section>
  )
}

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  description: string
  action: string
  actionType: "email" | "phone" | "button"
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, description, action, actionType }) => {
  return (
    <div className="flex flex-col items-center p-6 sm:p-8 bg-[#EDE9DD] rounded-xl text-center h-full transition-all hover:shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl sm:text-2xl font-bold tracking-tighter text-black mb-2">{title}</h3>
      <p className="text-base tracking-tighter text-black mb-6">{description}</p>

      {actionType === "email" && (
        <a
          href="mailto:support@escrowise.com"
          className="mt-auto text-base font-bold tracking-tighter text-orange-400 hover:text-orange-500 transition-colors"
        >
          support@escrowise.com
        </a>
      )}

      {actionType === "phone" && (
        <a
          href="tel:+14218313871"
          className="mt-auto text-base font-bold tracking-tighter text-orange-400 hover:text-orange-500 transition-colors"
        >
          +1-421-831-3871
        </a>
      )}

      {actionType === "button" && (
        <button className="mt-auto px-6 py-2 text-base font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 transition-colors rounded-md">
          {action}
        </button>
      )}
    </div>
  )
}

export default ContactSection

