import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, createUser, deleteUser } from "@/api/userapi";
import { useState } from "react";

// ✅ Define User Type
type UserRole = "ADMIN" | "POSTER";

interface User {
  id:number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export default function UsersPage() {
  const queryClient = useQueryClient();
  
  // ✅ Use Type in useState
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "POSTER", // ✅ Ensure it's one of the allowed values
  });

  // Fetch users //GET
  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Create user mutation //POST
  const createUserMutation = useMutation({
    mutationFn: (user: User) => createUser(user), // ✅ Ensure it gets the correct type
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  //Clears cached users and refetches updated data after adding a new user
});

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => deleteUser(userId), //sends the request to delete a user.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }), //Refetches users to show updated data
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Users</h1>

      {/* Add User Form */}
      <div className="mt-4">
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          name="role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })} // ✅ Type assertion
        >
          <option value="ADMIN">Admin</option>
          <option value="POSTER">Poster</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={() => createUserMutation.mutate(newUser)}
        >
          Add User
        </button>
      </div>

      {/* Users List */}
      <ul className="mt-4">
        console.log("Users Data:", users);

        {users?.map((user) => (
            
          <li key={user.id} className="flex justify-between border p-2">
            <span>{user.name} - {user.role}</span>
            <button
              className="bg-red-500 text-white px-2 py-1"
              onClick={() => deleteUserMutation.mutate(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
