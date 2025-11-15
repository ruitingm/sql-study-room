import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function UserPanel() {
  const [search, setSearch] = useState("");
  const users = [
    {
      id: 1,
      firstName: "alice",
      lastName: "A",
      email: "alice@gmail.com",
      role: "user",
    },
    {
      id: 2,
      firstName: "bob",
      lastName: "B",
      email: "bob@gmail.com",
      role: "user",
    },
    {
      id: 3,
      firstName: "admin",
      lastName: "C",
      email: "admin@gmail.com",
      role: "admin",
    },
    {
      id: 4,
      firstName: "alice",
      lastName: "A",
      email: "alice@gmail.com",
      role: "user",
    },
    {
      id: 5,
      firstName: "bob",
      lastName: "B",
      email: "bob@gmail.com",
      role: "user",
    },
    {
      id: 6,
      firstName: "admin",
      lastName: "C",
      email: "admin@gmail.com",
      role: "admin",
    },
    {
      id: 7,
      firstName: "alice",
      lastName: "A",
      email: "alice@gmail.com",
      role: "user",
    },
    {
      id: 8,
      firstName: "bob",
      lastName: "B",
      email: "bob@gmail.com",
      role: "user",
    },
    {
      id: 9,
      firstName: "admin",
      lastName: "C",
      email: "admin@gmail.com",
      role: "admin",
    },
    {
      id: 10,
      firstName: "alice",
      lastName: "A",
      email: "alice@gmail.com",
      role: "user",
    },
    {
      id: 11,
      firstName: "bob",
      lastName: "B",
      email: "bob@gmail.com",
      role: "user",
    },
    {
      id: 12,
      firstName: "admin",
      lastName: "C",
      email: "admin@gmail.com",
      role: "admin",
    },
  ];
  const filteredUsers = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className=" bg-stone-50 border border-stone-200 rounded-xl p-4 shadow-sm h-[600px]">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-1/3 px-3 py-2 rounded-lg bg-stone-200 text-stone-700 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col h-full">
        <table className="w-full text-center table-fixed">
          <thead className="bg-stone-200 text-stone-700">
            <tr>
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
        </table>
        <div className="flex flex-1 overflow-y-auto">
          <table className="w-full table-fixed text-center">
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-stone-200 hover:bg-stone-100"
                >
                  <td className="p-3">{user.firstName}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-center">
                      <button className="text-rose-700 hover:text-rose-800 hover:cursor-pointer">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
