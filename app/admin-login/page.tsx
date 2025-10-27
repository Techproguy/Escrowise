import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { OptimizedImage } from "@/components/ui/optimized-image";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/90 border border-orange-200">
        <OptimizedImage
          src="/escrowise-logo.png"
          alt="Escrowise Logo"
          width={150}
          height={50}
          className="mx-auto mb-6"
        />
        <p className="text-center text-gray-500 mb-8">Sign in with your admin credentials to access the dashboard.</p>
        <AdminLoginForm />
      </div>
    </div>
  );
}
