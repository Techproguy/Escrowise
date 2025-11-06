"use client";

import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  created_at: string;
  role?: string;
  verified?: boolean;
  profiles?: {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    role?: string;
    verified?: boolean;
  };
}

interface SearchParams {
  search?: string;
  [key: string]: string | string[] | undefined;
}

const supabase = createClientComponentClient();

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        // First, check if we have a session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        console.log('Session data:', { session, sessionError });
        
        if (sessionError || !session?.user) {
          console.log('No active session, redirecting to login');
          router.replace('/admin-login');
          return;
        }
        
        // Debug: Check user's profile directly
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        console.log('User profile:', { profile, profileError });
        
        if (profile?.role === 'admin') {
          console.log('User is admin, allowing access');
          setIsAdmin(true);
          return;
        }

        console.log('Session found, checking admin status for user:', session.user.id);
        
        // Then check if the user is an admin using RPC to bypass RLS if needed
        const { data: isAdminData, error: adminCheckError } = await supabase
          .rpc('is_admin');
          
        if (adminCheckError) {
          console.error('Error checking admin status:', adminCheckError);
          // Fallback to direct query if RPC fails
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError || !profileData || profileData.role !== 'admin') {
            console.log('User is not an admin, redirecting to home');
            router.push('/');
            return;
          }
        }
        
        console.log('User is an admin, allowing access');
        setIsAdmin(true);
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login');
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router, supabase.auth]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // First get all profiles
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*');
          
        if (profilesError) throw profilesError;
        
        // Then get all users and join with profiles
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('*');
          
        if (usersError) {
          console.error('Error fetching users:', usersError.message);
          setError('Failed to load users.');
          return;
        }
        
        if (!usersData) {
          setError('No user data found.');
          return;
        }

        console.log('Fetched users and profiles:', { usersData, profilesData });
        
        // Join the data
        const joinedData = usersData.map(user => {
          const profile = profilesData?.find(p => p.id === user.profile_id) || {};
          return {
            ...user,
            profiles: profile
          };
        });
        
        setUsers(joinedData);
        setFilteredUsers(joinedData);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [supabase]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => {
        const fullName = [
          user.profiles?.first_name || '',
          user.profiles?.last_name || ''
        ].join(' ').trim().toLowerCase();
        
        return fullName.includes(searchTerm.toLowerCase().trim());
      })
    );
  }, [searchTerm, users]);

  const handleVerificationToggle = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ verified: !currentStatus })
        .eq('id', userId);

      if (error) throw error;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, profiles: { ...user.profiles, verified: !currentStatus } } : user
        )
      );
    } catch (err) {
      console.error('Error updating verification status:', err);
      setError('Failed to update verification status.');
    }
  };

  const handleExport = () => {
    // Implement export functionality here
    console.log('Exporting data...');
  };

  const debugUserAccess = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log('Current user:', user, userError);
      
      if (!user) {
        console.error('No authenticated user found');
        return;
      }
      
      const { data: roles, error: rolesError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      console.log('User roles:', roles, rolesError);
    } catch (error) {
      console.error('Debug error:', error);
    }
  };

  useEffect(() => {
    debugUserAccess();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!isAdmin && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="mb-4">You don't have permission to access this page.</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <CardTitle className="text-lg font-bold">User Management</CardTitle>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md px-2 py-1"
          />
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Filter
          </button>
          <button
            onClick={handleExport}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Export
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">#</th>
                <th className="py-2">ID</th>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Verified</th>
                <th className="py-2">Joined</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => {
                const profile = user.profiles || {};
                return (
                  <tr key={user.id} className="text-center">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{user.id}</td>
                    <td className="py-2">
                      {`${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'N/A'}
                    </td>
                    <td className="py-2">{user.email || 'N/A'}</td>
                    <td className="py-2">
                      <Badge
                        className={profile.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      >
                        {profile.verified ? 'Verified' : 'Unverified'}
                      </Badge>
                    </td>
                    <td className="py-2">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => handleVerificationToggle(user.id, profile.verified ?? false)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                        disabled={!user.id}
                      >
                        {profile.verified ? 'Unverify' : 'Verify'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      </div>
    </CardContent>
  </Card>
);
};

export default UsersPage;
