"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/src/supabaseClient";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface Profile {
  first_name: string | null;
  last_name: string | null;
  email: string;
  avatar_url: string | null;
}

export default function AdminProfileSettings() {

  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch current admin profile
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, email, avatar_url")
        .eq("id", user.id)
        .single();
      if (error) {
        setError(error.message);
      } else {
        setProfile(data as Profile);
      }
      setLoading(false);
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setError("");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("Not authenticated");
      setSaving(false);
      return;
    }
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        avatar_url: profile.avatar_url,
      })
      .eq("id", user.id);
    if (error) {
      setError(error.message);
    } else {
      router.refresh();
    }
    setSaving(false);
  };

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
      </div>
    );

  if (!profile)
    return <p className="text-center text-red-600">{error || "Profile not found."}</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium">First Name</label>
          <input
            name="first_name"
            value={profile.first_name ?? ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Last Name</label>
          <input
            name="last_name"
            value={profile.last_name ?? ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Avatar URL</label>
          <input
            name="avatar_url"
            value={profile.avatar_url ?? ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            value={profile.email}
            disabled
            className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-100 text-gray-600"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
