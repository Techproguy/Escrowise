import type React from "react"
import { Linkedin, Twitter } from "lucide-react"

interface TeamMemberProps {
  name: string
  position: string
  bio: string
  imageSrc: string
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, position, bio, imageSrc }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="h-64 overflow-hidden">
        <img
          src={imageSrc || "/placeholder.svg?height=300&width=300"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold tracking-tighter text-black mb-1">{name}</h3>
        <p className="text-sm font-medium text-orange-500 mb-3">{position}</p>
        <p className="text-base tracking-tighter text-gray-700 mb-4">{bio}</p>
        <div className="flex items-center gap-3">
          <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}

const OurTeam: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">
          Our Leadership Team
        </h2>
        <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
          Meet the dedicated professionals driving our mission forward
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <TeamMember
          name="Sarah Johnson"
          position="Chief Executive Officer"
          bio="With over 15 years in fintech, Sarah leads our company vision and growth strategy. She previously founded two successful startups in the payment security space."
          imageSrc="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
        />
        <TeamMember
          name="Michael Chen"
          position="Chief Technology Officer"
          bio="Michael brings 20+ years of expertise in cybersecurity and blockchain technology, ensuring our platform remains at the cutting edge of secure transaction technology."
          imageSrc="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        />
        <TeamMember
          name="David Rodriguez"
          position="Chief Operations Officer"
          bio="David oversees our global operations, bringing extensive experience in scaling financial services across international markets and regulatory environments."
          imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        />
        <TeamMember
          name="Aisha Patel"
          position="Chief Financial Officer"
          bio="With a background in investment banking and fintech, Aisha manages our financial strategy and ensures sustainable growth while maintaining operational excellence."
          imageSrc="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        />
        <TeamMember
          name="Thomas Wilson"
          position="Chief Security Officer"
          bio="Thomas leads our security initiatives with his extensive background in digital forensics and information security, having previously worked for major financial institutions."
          imageSrc="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        />
        <TeamMember
          name="Elena Gonzalez"
          position="VP of Customer Experience"
          bio="Elena focuses on creating exceptional user experiences, bringing her expertise from leading customer success teams at Fortune 500 companies."
          imageSrc="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80"
        />
      </div>
    </section>
  )
}

export default OurTeam

