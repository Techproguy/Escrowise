"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  full_name: string;
  verification_status: string;
  role: string;
  created_at: string;
  account_type?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface Transaction {
  id: string;
  title: string;
  status: string;
  buyer: { full_name: string };
  seller: { full_name: string };
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<"users" | "transactions">("users");
  const [userSearch, setUserSearch] = useState("");
  const [txnStatusFilter, setTxnStatusFilter] = useState("");
  const [txnSearch, setTxnSearch] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchTransactions();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/admin/transactions");
      if (res.ok) {
        const { data } = await res.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleEditUser = async (userId: string, updates: Partial<User>) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleEditTransaction = async (txnId: string, updates: Partial<Transaction>) => {
    try {
      const res = await fetch(`/api/admin/transactions/${txnId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        fetchTransactions();
      }
    } catch (error) {
      console.error("Error editing transaction:", error);
    }
  };

  const handleDeleteTransaction = async (txnId: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      try {
        await fetch(`/api/admin/transactions/${txnId}`, { method: "DELETE" });
        fetchTransactions();
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <a href="/logout" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Sign Out
          </a>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 mr-2 rounded ${activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 rounded ${activeTab === "transactions" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Transactions
          </button>
        </div>

        {activeTab === "users" && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Account Type</th>
                  <th className="text-left">Verification Status</th>
                  <th className="text-left">Role</th>
                  <th className="text-left">Created</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.full_name || `${user.first_name} ${user.last_name}`}</td>
                    <td>{user.email}</td>
                    <td>{user.account_type || 'N/A'}</td>
                    <td>{user.verification_status}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td>
                      {user.verification_status !== 'verified' && (
                        <button
                          onClick={() => handleEditUser(user.id, { verification_status: "verified" })}
                          className="text-blue-500 mr-2"
                        >
                          Verify
                        </button>
                      )}
                      <button
                        onClick={() => handleEditUser(user.id, { role: user.role === 'admin' ? 'user' : 'admin' })}
                        className="text-green-500 mr-2"
                      >
                        Toggle Role
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Transactions</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Title</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Buyer</th>
                  <th className="text-left">Seller</th>
                  <th className="text-left">Created</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td>{txn.title}</td>
                    <td>{txn.status}</td>
                    <td>{txn.buyer?.full_name}</td>
                    <td>{txn.seller?.full_name}</td>
                    <td>{new Date(txn.created_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleEditTransaction(txn.id, { status: "completed" })}
                        className="text-green-500 mr-2"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleEditTransaction(txn.id, { status: "cancelled" })}
                        className="text-yellow-500 mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDeleteTransaction(txn.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
