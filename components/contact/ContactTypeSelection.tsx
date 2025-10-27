"use client"
import RadioOption from "./RadioOption"

interface ContactTypeSelectionProps {
  selectedOption: string
  onOptionChange: (id: string) => void
}

function ContactTypeSelection({ selectedOption, onOptionChange }: ContactTypeSelectionProps) {
  return (
    <section className="mb-8">
      <header className="mb-6">
        <h2 className="text-xl font-bold tracking-tighter text-black">Contact type</h2>
        <p className="mt-1.5 text-base text-gray-700">What do you need to contact us about?</p>
      </header>
      <div className="flex flex-col gap-5">
        <RadioOption
          id="email-support"
          name="contact-type"
          label="I require email support"
          description="Get help with your escrow transaction"
          checked={selectedOption === "email-support"}
          onChange={onOptionChange}
        />
        <RadioOption
          id="feedback"
          name="contact-type"
          label="I'd like to leave some feedback"
          description="Give us feedback on your Escrowise experience"
          checked={selectedOption === "feedback"}
          onChange={onOptionChange}
        />
        <RadioOption
          id="complaint"
          name="contact-type"
          label="I'd like to make a complaint"
          description="Give us feedback on a negative experience you have had with our escrow services."
          checked={selectedOption === "complaint"}
          onChange={onOptionChange}
        />
      </div>
    </section>
  )
}

export default ContactTypeSelection

