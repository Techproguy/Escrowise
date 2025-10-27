"use client"

interface RadioOptionProps {
  id: string
  name: string
  label: string
  description: string
  checked: boolean
  onChange: (id: string) => void
}

function RadioOption({ id, name, label, description, checked, onChange }: RadioOptionProps) {
  return (
    <div className="flex gap-4 items-start">
      <div
        className={`rounded-full border-2 ${checked ? "border-amber-500" : "border-gray-300"} h-6 w-6 flex-shrink-0 flex items-center justify-center cursor-pointer mt-1`}
        onClick={() => onChange(id)}
        role="radio"
        aria-checked={checked}
      >
        {checked && <div className="rounded-full bg-amber-500 h-3 w-3"></div>}
      </div>
      <label htmlFor={id} className="cursor-pointer" onClick={() => onChange(id)}>
        <span className="text-base font-medium text-black block">{label}</span>
        <span className="text-sm text-gray-600">{description}</span>
      </label>
      <input type="radio" id={id} name={name} checked={checked} onChange={() => onChange(id)} className="sr-only" />
    </div>
  )
}

export default RadioOption

