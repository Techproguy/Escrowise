"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ShieldAlert } from "lucide-react";

import { supabase } from "@/src/supabaseClient";

export default function AdminLoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // 1. Try to sign in with the SAME supabase client and get the authenticated user
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (signInError || !signInData.user) {
        setError(signInError?.message || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }
      const user = signInData.user;

      // 2. Strictly validate admin role via profiles table using the user id
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError || !profileData || profileData.role !== "admin") {
        // User is authenticated but not an admin – immediately sign out
        await supabase.auth.signOut();
        setError("Access denied: You are not an admin.");
        setLoading(false);
        return;
      }
      // 3. Success: redirect to admin dashboard
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          required
          className="w-full px-4 py-3 rounded-lg border border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-orange-50 text-gray-800"
          placeholder="admin@example.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 rounded-lg border border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-orange-50 text-gray-800 pr-12"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-600"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <ShieldAlert className="w-5 h-5 text-red-400" /> {error}
        </div>
      )}
      <button
        type="submit"
        className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-colors disabled:opacity-60"
        disabled={loading}
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
        Sign in as Admin
      </button>
    </form>
  );
}
