"use client"

import type React from "react"
import { useState, useRef } from "react"
import { ArrowLeft, Upload } from "lucide-react"
import type { DocumentInfo } from "../VerificationFlow"

interface DocumentUploadStepProps {
  idDocument: DocumentInfo
  addressDocument: DocumentInfo
  onSubmit: (idDoc: DocumentInfo, addressDoc: DocumentInfo) => void
  onGoBack: () => void
}

const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({
  idDocument: initialIdDocument,
  addressDocument: initialAddressDocument,
  onSubmit,
  onGoBack,
}) => {
  const [idDocument, setIdDocument] = useState<DocumentInfo>(initialIdDocument)
  const [addressDocument, setAddressDocument] = useState<DocumentInfo>(initialAddressDocument)

  const idInputRef = useRef<HTMLInputElement>(null)
  const addressInputRef = useRef<HTMLInputElement>(null)

  const handleIdDocumentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIdDocument((prev) => ({
      ...prev,
      documentType: e.target.value,
    }))
  }

  const handleAddressDocumentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddressDocument((prev) => ({
      ...prev,
      documentType: e.target.value,
    }))
  }

  const handleIdFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2)
      setIdDocument({
        file,
        fileName: file.name,
        fileSize: `${fileSizeInMB}mb`,
        documentType: idDocument.documentType,
      })
    }
  }

  const handleAddressFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2)
      setAddressDocument({
        file,
        fileName: file.name,
        fileSize: `${fileSizeInMB}mb`,
        documentType: addressDocument.documentType,
      })
    }
  }

  const handleIdUploadClick = () => {
    idInputRef.current?.click()
  }

  const handleAddressUploadClick = () => {
    addressInputRef.current?.click()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(idDocument, addressDocument)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-tighter text-black mb-4">Proof of Identity</h2>

        <p className="mb-4 text-base tracking-tighter text-black">
          Important guidelines for your ID. Please ensure it has the following:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-1">
          <li className="text-base tracking-tighter text-black">
            Your photo and details are visible and free of any blurs or image glare
          </li>
          <li className="text-base tracking-tighter text-black">The expiry date must be visible</li>
          <li className="text-base tracking-tighter text-black">
            Your name, date of birth, and address must be readable
          </li>
        </ul>

        <div className="relative mb-6">
          <select
            value={idDocument.documentType}
            onChange={handleIdDocumentTypeChange}
            className="w-full h-12 rounded-xl border border-gray-300 bg-gray-200 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="Passport">Passport</option>
            <option value="Driver's License">Driver's License</option>
            <option value="National ID Card">National ID Card</option>
            <option value="Residence Permit">Residence Permit</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <h3 className="text-base font-medium tracking-tighter text-black mb-3">Upload the front of your ID</h3>

        <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center">
          {idDocument.fileName ? (
            <div className="flex flex-col items-center">
              <p className="text-base tracking-tighter text-black mb-1">{idDocument.fileName}</p>
              <p className="text-sm text-gray-500 mb-4">File size: {idDocument.fileSize}</p>
              <button
                type="button"
                onClick={handleIdUploadClick}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                Change Uploaded File
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-lg font-medium tracking-tighter text-black mb-2">Drag and Drop</p>
              <p className="text-sm text-gray-500 mb-2">Accepted format: .jpg, .png, .gif, .tiff, .bmp, .pdf</p>
              <p className="text-sm text-gray-500 mb-4">Maximum file size: 100mb</p>
              <button
                type="button"
                onClick={handleIdUploadClick}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload File
              </button>
            </div>
          )}

          <input
            ref={idInputRef}
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.gif,.tiff,.bmp,.pdf"
            onChange={handleIdFileChange}
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-tighter text-black mb-4">Proof of Address</h2>

        <p className="mb-6 text-base tracking-tighter text-black">
          Your proof of address should show the same address in your personal details.
        </p>

        <div className="relative mb-6">
          <select
            value={addressDocument.documentType}
            onChange={handleAddressDocumentTypeChange}
            className="w-full h-12 rounded-xl border border-gray-300 bg-gray-200 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="Document Type">Document Type</option>
            <option value="Utility Bill">Utility Bill</option>
            <option value="Bank Statement">Bank Statement</option>
            <option value="Tax Document">Tax Document</option>
            <option value="Rental Agreement">Rental Agreement</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <h3 className="text-base font-medium tracking-tighter text-black mb-3">Upload Document</h3>

        <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center">
          {addressDocument.fileName ? (
            <div className="flex flex-col items-center">
              <p className="text-base tracking-tighter text-black mb-1">{addressDocument.fileName}</p>
              <p className="text-sm text-gray-500 mb-4">File size: {addressDocument.fileSize}</p>
              <button
                type="button"
                onClick={handleAddressUploadClick}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                Change Uploaded File
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-lg font-medium tracking-tighter text-black mb-2">Drag and Drop</p>
              <p className="text-sm text-gray-500 mb-2">Accepted format: .jpg, .png, .gif, .tiff, .bmp, .pdf</p>
              <p className="text-sm text-gray-500 mb-4">Maximum file size: 100mb</p>
              <button
                type="button"
                onClick={handleAddressUploadClick}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                Change Uploaded File
              </button>
            </div>
          )}

          <input
            ref={addressInputRef}
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.gif,.tiff,.bmp,.pdf"
            onChange={handleAddressFileChange}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 mt-8">
        <button
          type="button"
          onClick={onGoBack}
          className="flex items-center justify-center gap-2 px-6 py-3 text-base font-medium tracking-tighter text-gray-700 rounded-xl border border-gray-300 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button
          type="submit"
          className="flex items-center justify-center px-8 py-3 text-base font-bold tracking-tighter text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-sm hover:shadow-md transition-colors"
          disabled={!idDocument.file || !addressDocument.file || addressDocument.documentType === "Document Type"}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default DocumentUploadStep

