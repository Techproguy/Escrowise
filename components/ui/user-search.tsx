import React, { useState, useEffect } from 'react';
import { supabase } from "@/src/supabaseClient";

interface UserProfile {
  id: string;
  full_name: string | null;
  verification_status?: string;
  role?: string;
  created_at?: string;
}

interface UserSearchProps {
  onSelect?: (user: UserProfile) => void;
  placeholder?: string;
}

export const UserSearch: React.FC<UserSearchProps> = ({ onSelect, placeholder }) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

;

  useEffect(() => {
    if (query.length < 2) {
      setUsers([]);
      return;
    }
    setLoading(true);
    setError(null);
    supabase
      .from('user_profiles')
      .select('id, full_name, verification_status, role, created_at')
      .ilike('full_name', `%${query}%`)
      .order('created_at', { ascending: false })
      .limit(10)
      .then(({ data, error }) => {
        if (error) setError(error.message);
        setUsers(data || []);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="w-full">
      <input
        type="text"
        className="w-full px-3 py-2 border rounded mb-2"
        placeholder={placeholder || 'Search users by name...'}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {loading && <div className="text-sm text-gray-500">Loading...</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}
      <ul className="border rounded bg-white max-h-60 overflow-y-auto">
        {users.map(user => (
          <li
            key={user.id}
            className="px-3 py-2 cursor-pointer hover:bg-orange-100"
            onClick={() => onSelect && onSelect(user)}
          >
            <span className="font-medium">{user.full_name || 'Unnamed User'}</span>
            {user.role && (
              <span className="ml-2 text-xs text-gray-500">({user.role})</span>
            )}
            {user.verification_status && (
              <span className="ml-2 text-xs text-green-600">{user.verification_status}</span>
            )}
          </li>
        ))}
        {!loading && users.length === 0 && query.length > 1 && (
          <li className="px-3 py-2 text-gray-400">No users found.</li>
        )}
      </ul>
    </div>
  );
};

export default UserSearch;
