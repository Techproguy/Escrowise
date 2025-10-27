import type React from "react"
import { Mail, Phone, MessageSquare } from "lucide-react"
import Link from "next/link"

const ContactSupport: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
      <h2 className="text-xl font-bold tracking-tighter text-black mb-4">Can't find what you're looking for?</h2>
      <p className="text-base text-gray-700 mb-6">
        Our support team is here to help. Reach out through any of these channels:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Mail className="w-8 h-8 text-orange-400 mb-3" />
          <h3 className="text-lg font-medium mb-1">Email Support</h3>
          <p className="text-sm text-gray-500 mb-2">Response within 24 hours</p>
          <Link href="/contact" className="text-orange-500 hover:underline">
            Contact us
          </Link>
        </div>

        <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Phone className="w-8 h-8 text-orange-400 mb-3" />
          <h3 className="text-lg font-medium mb-1">Phone Support</h3>
          <p className="text-sm text-gray-500 mb-2">Mon-Fri, 9am-5pm EST</p>
          <a href="tel:+14218313871" className="text-orange-500 hover:underline">
            +1-421-831-3871
          </a>
        </div>

        <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <MessageSquare className="w-8 h-8 text-orange-400 mb-3" />
          <h3 className="text-lg font-medium mb-1">Live Chat</h3>
          <p className="text-sm text-gray-500 mb-2">Available 24/7</p>
          <a
            href="/contact"
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 rounded-lg transition-colors"
          >
            Start Chat
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactSupport

