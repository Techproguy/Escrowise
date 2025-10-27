import ForgotPasswordForm from "./ForgotPasswordForm"

export default function ForgotPasswordLayout() {
  return (
    <div className="min-h-screen bg-[#EDE9DD] flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <ForgotPasswordForm />
      </div>

      {/* Right side - Image */}
      <div
        className="hidden md:block md:w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-white mb-4">Secure Password Recovery</h2>
            <p className="text-lg text-white">
              We take your account security seriously. Follow the steps to safely recover access to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

