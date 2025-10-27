"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const PAGE_SIZE = 10;

interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  role: string;
}

type SearchParams = {
  search?: string;
  page?: string;
  [key: string]: string | string[] | undefined;
};

type AdminProfilesPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function AdminProfilesPage({ searchParams }: AdminProfilesPageProps) {
  const params = await searchParams;
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const search = params?.search || "";
  const page = parseInt(params?.page || "1", 10);
  const [searchTerm, setSearchTerm] = useState(search);

  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        router.replace("/admin-login");
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError || profileData?.role !== 'admin') {
        router.replace('/');
        return;
      }
      
      setIsAdmin(true);

      // Now fetch profiles since we are an admin
      setError(null);
      try {
        let query = supabase.from("profiles").select("*", { count: 'exact' });
        if (search) {
          query = query.or(`email.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%`);
        }
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        query = query.range(from, to);
        const { data, error: queryError, count } = await query;
        if (queryError) {
          throw queryError;
        }
        setProfiles(data || []);
        setTotalCount(count || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthAndFetch();
  }, [router, supabase, search, page]);

  const handleSearch = () => {
    router.push(`/admin/profiles?search=${searchTerm}&page=1`);
  };

  if (!isAdmin) {
    // Render nothing while checking auth and redirecting.
    // Also covers the initial loading state.
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">All User Profiles</h1>
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className="border px-3 py-2 rounded w-72"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading profiles...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          <table className="min-w-full border rounded-lg overflow-hidden mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">First Name</th>
                <th className="py-2 px-4 border">Last Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <tr key={profile.id} className="border-t">
                    <td className="py-2 px-4 border font-mono text-xs">{profile.id}</td>
                    <td className="py-2 px-4 border">{profile.first_name}</td>
                    <td className="py-2 px-4 border">{profile.last_name}</td>
                    <td className="py-2 px-4 border">{profile.email}</td>
                    <td className="py-2 px-4 border">{new Date(profile.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">No profiles found.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => router.push(`/admin/profiles?search=${search}&page=${page - 1}`)}
              disabled={page <= 1}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {page} of {Math.ceil(totalCount / PAGE_SIZE)}</span>
            <button
              onClick={() => router.push(`/admin/profiles?search=${search}&page=${page + 1}`)}
              disabled={page * PAGE_SIZE >= totalCount}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
