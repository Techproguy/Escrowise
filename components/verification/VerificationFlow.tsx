"use client"

import type React from "react"
import { useState } from "react"
import AccountTypeStep from "./steps/AccountTypeStep"
import PersonalDetailsStep from "./steps/PersonalDetailsStep"
import DocumentUploadStep from "./steps/DocumentUploadStep"
import VerificationSummary from "./steps/VerificationSummary"
import SubmittingDocuments from "./steps/SubmittingDocuments"

export type AccountType = "individual" | "company"

export interface PersonalDetails {
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phoneNumber: string
}

export interface DocumentInfo {
  file: File | null
  fileName: string
  fileSize: string
  documentType: string
}

type VerificationStep = "accountType" | "personalDetails" | "documentUpload" | "submitting" | "summary"

const VerificationFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<VerificationStep>("accountType")
  const [accountType, setAccountType] = useState<AccountType>("individual")

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    phoneNumber: "",
  })

  const [idDocument, setIdDocument] = useState<DocumentInfo>({
    file: null,
    fileName: "",
    fileSize: "",
    documentType: "Passport",
  })

  const [addressDocument, setAddressDocument] = useState<DocumentInfo>({
    file: null,
    fileName: "",
    fileSize: "",
    documentType: "Document Type",
  })

  const handleAccountTypeSubmit = (type: AccountType) => {
    setAccountType(type)
    setCurrentStep("personalDetails")
  }

  const handlePersonalDetailsSubmit = (details: PersonalDetails) => {
    setPersonalDetails(details)
    setCurrentStep("documentUpload")
  }

  const handleDocumentUploadSubmit = (idDoc: DocumentInfo, addressDoc: DocumentInfo) => {
    setIdDocument(idDoc)
    setAddressDocument(addressDoc)
    setCurrentStep("submitting")

    // Simulate document submission
    setTimeout(() => {
      setCurrentStep("summary")
    }, 2000)
  }

  const handleGoBack = () => {
    if (currentStep === "personalDetails") {
      setCurrentStep("accountType")
    } else if (currentStep === "documentUpload") {
      setCurrentStep("personalDetails")
    }
  }

  const handleEdit = () => {
    setCurrentStep("personalDetails")
  }

  return (
    <div>
      {currentStep === "accountType" && (
        <>
          <p className="text-base sm:text-lg lg:text-xl tracking-tighter text-black mb-8">
            We protect both sides of the transaction by verifying the identity of all users. Your verified identity must
            be the same as the account holder's name on any bank account used to pay or receive funds from Escrowise.
          </p>
          <AccountTypeStep selectedType={accountType} onSubmit={handleAccountTypeSubmit} />
        </>
      )}

      {currentStep === "personalDetails" && (
        <PersonalDetailsStep
          initialValues={personalDetails}
          onSubmit={handlePersonalDetailsSubmit}
          onGoBack={handleGoBack}
        />
      )}

      {currentStep === "documentUpload" && (
        <DocumentUploadStep
          idDocument={idDocument}
          addressDocument={addressDocument}
          onSubmit={handleDocumentUploadSubmit}
          onGoBack={handleGoBack}
        />
      )}

      {currentStep === "submitting" && <SubmittingDocuments />}

      {currentStep === "summary" && (
        <VerificationSummary accountType={accountType} personalDetails={personalDetails} onEdit={handleEdit} />
      )}
    </div>
  )
}

export default VerificationFlow

