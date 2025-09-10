import { useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  // Dummy data for users and stores
  const [users] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  ]);

  const [stores] = useState([
    { id: 101, name: "SuperMart", location: "New York" },
    { id: 102, name: "TechStore", location: "California" },
    { id: 103, name: "BookWorld", location: "Texas" },
  ]);

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredStores = stores.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Stores</h3>
          <p>{stores.length}</p>
        </div>
      </div>

      {/* Search Filter */}
      <div className="filter-box">
        <input
          type="text"
          placeholder="Search users or stores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="lists">
        {/* Users List */}
        <div className="list-card">
          <h2>Users</h2>
          <ul>
            {filteredUsers.map((u) => (
              <li key={u.id}>
                <strong>{u.name}</strong> – {u.email}
              </li>
            ))}
          </ul>
        </div>

        {/* Store List */}
        <div className="list-card">
          <h2>Stores</h2>
          <ul>
            {filteredStores.map((s) => (
              <li key={s.id}>
                <strong>{s.name}</strong> – {s.location}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
