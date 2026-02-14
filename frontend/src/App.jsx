import { useState } from "react";
import { getUsers, addUser, deleteUser } from "./api/api";

export default function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleAdd = async () => {
    await addUser({ name });
    setName("");
    loadUsers();
  };

  const handleDelete = async (i) => {
    await deleteUser(i);
    loadUsers();
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>User Manager</h2>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={handleAdd}>Add</button>
      <button onClick={loadUsers}>Load Users</button>

      <ul>
        {users.map((u, i) => (
          <li key={i}>
            {u.name}
            <button onClick={() => handleDelete(i)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
